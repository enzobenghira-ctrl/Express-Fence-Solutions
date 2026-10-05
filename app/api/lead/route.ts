import { NextResponse } from "next/server";
import { Resend } from "resend";
import { UTM_KEYS } from "@/lib/attribution";
import { LEAD_FORMS, isLeadKind, type LeadFormDefinition, type LeadKind } from "@/lib/forms/registry";
import { displayValue, validateValues, type FormValues } from "@/lib/forms/schema";
import { computeRoute } from "@/lib/lead-routing";
import { SITE } from "@/lib/site-config";

// Single endpoint for every lead form. Never lose a lead: it goes to the CRM webhook when
// one is configured, otherwise (or if the webhook fails) it's emailed; if both fail the
// full lead is written to the server log before returning an error.

const MIN_FILL_MS = 2500; // faster than a human can fill the shortest form
const WEBHOOK_TIMEOUT_MS = 8000;

interface Lead {
  id: string;
  kind: LeadKind;
  funnel: LeadFormDefinition["funnel"];
  route: string | null;
  values: FormValues;
  hidden: Record<string, string>;
  attribution: Record<string, string>;
  pageUrl: string;
  submittedAt: string;
}

function cleanString(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function pickStrings(raw: unknown, keys: readonly string[], max: number): Record<string, string> {
  const src = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = cleanString(src[k], max);
    if (v) out[k] = v;
  }
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function forwardToCrm(url: string, lead: Lead): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[lead] CRM webhook returned ${res.status} for lead ${lead.id}`);
    return res.ok;
  } catch (err) {
    console.error(`[lead] CRM webhook failed for lead ${lead.id}:`, err);
    return false;
  }
}

async function emailLead(lead: Lead, form: LeadFormDefinition): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[lead] RESEND_API_KEY is not set — cannot email lead", lead.id);
    return false;
  }
  const fields = form.steps.flatMap((s) => s.fields);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1a1a1a;">${escapeHtml(value)}</td></tr>`;
  const rows = [
    ...fields.filter((f) => lead.values[f.name] !== undefined).map((f) => row(f.label, displayValue(f, lead.values[f.name]))),
    ...Object.entries(lead.hidden).map(([k, v]) => row(k, v)),
    lead.route ? row("Route", lead.route) : "",
    ...Object.entries(lead.attribution).map(([k, v]) => row(k, v)),
    row("Page", lead.pageUrl || "—"),
    row("Lead ID", lead.id),
  ].join("");

  const who = (lead.values.company || lead.values.contactName || lead.values.email || "New lead") as string;
  const subject = `[${form.label.toUpperCase()}${lead.route ? ` · ${lead.route.toUpperCase()}` : ""}] ${who}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || "Express Fence Solutions <onboarding@resend.dev>",
      to: process.env.LEAD_FALLBACK_EMAIL || SITE.email,
      replyTo: typeof lead.values.email === "string" ? lead.values.email : undefined,
      subject,
      html: `<h2 style="font-family:sans-serif;color:#1a1a1a;">${escapeHtml(form.label)}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">${rows}</table>`,
    });
    if (error) {
      console.error(`[lead] Email failed for lead ${lead.id}:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead] Email threw for lead ${lead.id}:`, err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isLeadKind(body.kind)) {
    return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  }
  const kind = body.kind;
  const form = LEAD_FORMS[kind];

  // Bots: answer "ok" so they don't retry, but drop the submission.
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (cleanString(body.hp, 200) || elapsedMs < MIN_FILL_MS) {
    console.warn(`[lead] Dropped likely spam (${kind}): honeypot=${Boolean(body.hp)} elapsedMs=${elapsedMs}`);
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = validateValues(form.steps, body.values);
  const firstError = Object.values(errors)[0];
  if (firstError) {
    return NextResponse.json({ error: firstError, fields: errors }, { status: 400 });
  }

  const lead: Lead = {
    id: cleanString(body.eventId, 100) || crypto.randomUUID(),
    kind,
    funnel: form.funnel,
    route: computeRoute(kind, values),
    values,
    hidden: pickStrings(body.hidden, form.hiddenKeys, 100),
    attribution: pickStrings(body.attribution, [...UTM_KEYS, "landing_page", "referrer"], 500),
    pageUrl: cleanString(body.pageUrl, 500),
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.CRM_WEBHOOK_URL;
  const delivered = (webhook && (await forwardToCrm(webhook, lead))) || (await emailLead(lead, form));

  if (!delivered) {
    console.error("[lead] UNDELIVERED LEAD — recover from this log line:", JSON.stringify(lead));
    return NextResponse.json(
      { error: "We couldn't send your details just now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, route: lead.route });
}
