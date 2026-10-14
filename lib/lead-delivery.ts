import type { describePackageLead } from "@/lib/forms/package";
import { BOOKING_SOURCE, BOOKING_STEPS } from "@/lib/get-a-quote/booking";
import { LEAD_FORMS, type LeadFormDefinition, type LeadKind } from "@/lib/forms/registry";
import { displayValue, type FormValues } from "@/lib/forms/schema";
import { deliveryAttempt, type DeliveryAttempt } from "@/lib/lead-store";
import { detailsEmailHtml, sendMail } from "@/lib/mailer";
import { SITE } from "@/lib/site-config";

// Delivers a lead to the business: the CRM webhook and/or the company inbox. Shared by the
// API routes (first attempt) and the retry job (app/api/cron/retry-leads), so a retried
// lead arrives looking exactly like the original — plus "[RETRY]" and when it was submitted.

const WEBHOOK_TIMEOUT_MS = 8000;

/** A submission to /api/lead, as saved in leads/. */
export interface Lead {
  id: string;
  kind: LeadKind;
  funnel: LeadFormDefinition["funnel"];
  route: string | null;
  values: FormValues;
  hidden: Record<string, string>;
  attribution: Record<string, string>;
  pageUrl: string;
  submittedAt: string;
  /** Private Blob URL of the customer's photo (it's emailed as an attachment, never linked). */
  photoUrl?: string;
  photoNote?: string;
  /** Package leads: the full selection as structured data (values.package holds the raw JSON). */
  package?: ReturnType<typeof describePackageLead>;
  /** "get-a-quote-booking" for /get-a-quote's appointment requests; absent for every other form. */
  source?: string;
  /** Booking requests: the preferred times as structured data (values.slots holds the raw slots). */
  booking?: { slots: { date: string; window: string; label: string }[] };
}

/** A request from /api/book-consultation, as saved in leads/. */
export interface ConsultationLead {
  id: string;
  kind: "consultation";
  projectTypes: string[];
  /** Display label, e.g. "Single-Family Home". */
  propertyType: string;
  address: string;
  zip: string;
  start: string;
  end: string;
  /** e.g. "Monday, October 12, 2026 at 10:00 AM" (Eastern). */
  when: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  submittedAt: string;
}

/**
 * /get-a-quote's appointment requests post as kind "home_quote" (so CRM filters and the
 * Lead_Home event keep working) with source "get-a-quote-booking", and are checked against
 * the booking form's own fields. Every other submission uses its registry form.
 */
export const BOOKING_FORM: LeadFormDefinition = { funnel: "home", label: "Home quote request", steps: BOOKING_STEPS, hiddenKeys: [] };

export function formFor(lead: Pick<Lead, "kind" | "source">): LeadFormDefinition {
  return lead.kind === "home_quote" && lead.source === BOOKING_SOURCE ? BOOKING_FORM : LEAD_FORMS[lead.kind];
}

function submittedEastern(iso: string): string {
  return `${new Date(iso).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })} ET`;
}

async function forwardToCrm(url: string, lead: Lead, retry: boolean): Promise<DeliveryAttempt> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[lead] CRM webhook returned ${res.status} for lead ${lead.id}`);
    return deliveryAttempt("crm", res.ok ? null : `HTTP ${res.status}`, retry);
  } catch (err) {
    console.error(`[lead] CRM webhook failed for lead ${lead.id}:`, err);
    return deliveryAttempt("crm", err instanceof Error ? err.message : String(err), retry);
  }
}

async function emailLead(lead: Lead, photo: Buffer | null, retry: boolean): Promise<DeliveryAttempt> {
  const form = formFor(lead);
  const fields = form.steps.flatMap((s) => s.fields);
  const rows: [string, string][] = retry ? [["Originally submitted", submittedEastern(lead.submittedAt)]] : [];
  // Only fields the customer filled in (validateValues drops empty optional ones).
  rows.push(
    ...fields.filter((f) => lead.values[f.name] !== undefined).map((f): [string, string] => [f.label, displayValue(f, lead.values[f.name])]),
    ...Object.entries(lead.hidden)
  );
  if (lead.source) rows.push(["Source", lead.source]);
  if (lead.route) rows.push(["Route", lead.route]);
  if (photo) rows.push(["Photo", "Attached to this email"]);
  else if (lead.photoNote) rows.push(["Photo", lead.photoNote]);
  rows.push(...Object.entries(lead.attribution), ["Page", lead.pageUrl || "—"], ["Lead ID", lead.id]);

  const who = (lead.values.company || lead.values.contactName || lead.values.email || "New lead") as string;
  const subject = `${retry ? "[RETRY] " : ""}[${form.label.toUpperCase()}${lead.route ? ` · ${lead.route.toUpperCase()}` : ""}] ${who}`;

  const result = await sendMail({
    to: SITE.email,
    replyTo: typeof lead.values.email === "string" ? lead.values.email : undefined,
    subject,
    html: detailsEmailHtml(form.label, rows),
    attachments: photo ? [{ filename: `project-photo-${lead.id}.jpg`, content: photo }] : undefined,
    context: `${retry ? "retry of " : ""}lead ${lead.id}`,
  });
  return deliveryAttempt("email", result.ok ? null : result.error, retry);
}

/**
 * Every lead is emailed to the company inbox, and also forwarded to the CRM webhook when one
 * is configured. A retry skips the CRM when it already accepted the lead the first time.
 */
export async function deliverLead(lead: Lead, photo: Buffer | null, retry = false, skipCrm = false): Promise<DeliveryAttempt[]> {
  const attempts: DeliveryAttempt[] = [];
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook && !skipCrm) attempts.push(await forwardToCrm(webhook, lead, retry));
  attempts.push(await emailLead(lead, photo, retry));
  return attempts;
}

export function consultationUtm(utm: ConsultationLead["utm"]): string | null {
  return utm && (utm.source || utm.medium || utm.campaign)
    ? `source=${utm.source || "—"} medium=${utm.medium || "—"} campaign=${utm.campaign || "—"}`
    : null;
}

/** Notifies the company inbox — and flags it loudly when the visit didn't make it onto the calendar. */
export async function emailConsultation(lead: ConsultationLead, onCalendar: boolean, retry = false): Promise<DeliveryAttempt> {
  const rows: [string, string][] = retry ? [["Originally submitted", submittedEastern(lead.submittedAt)]] : [];
  rows.push(
    ["When", lead.when],
    ["Calendar", onCalendar ? "Added to the calendar" : "NOT on the calendar — add it manually and confirm with the customer"],
    ["Project types", lead.projectTypes.join(", ")],
    ["Property type", lead.propertyType],
    ["Address", `${lead.address}, ${lead.zip}`],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email]
  );
  if (lead.notes) rows.push(["Notes", lead.notes]);
  const utm = consultationUtm(lead.utm);
  if (utm) rows.push(["UTM", utm]);
  rows.push(["Lead ID", lead.id]);

  const result = await sendMail({
    to: SITE.email,
    replyTo: lead.email,
    subject: `${retry ? "[RETRY] " : ""}[IN-HOME CONSULTATION${onCalendar ? "" : " · NOT ON CALENDAR"}] ${lead.name}`,
    html: detailsEmailHtml("In-home consultation", rows),
    context: `${retry ? "retry of " : ""}consultation ${lead.id}`,
  });
  return deliveryAttempt("email", result.ok ? null : result.error, retry);
}

/** A request from /api/book-call (trade qualification call), as saved in leads/. */
export interface TradeCallLead {
  id: string;
  kind: "trade_call";
  start: string;
  end: string;
  /** e.g. "Monday, October 12, 2026 at 10:00 AM" (Eastern). */
  when: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  submittedAt: string;
}

/** Notifies the company inbox of a trade call — and flags it loudly when it didn't make it onto the calendar. */
export async function emailTradeCall(lead: TradeCallLead, onCalendar: boolean, retry = false): Promise<DeliveryAttempt> {
  const rows: [string, string][] = retry ? [["Originally submitted", submittedEastern(lead.submittedAt)]] : [];
  rows.push(
    ["When", lead.when],
    ["Calendar", onCalendar ? "Added to the calendar" : "NOT on the calendar — add it manually and confirm with the contractor"],
    ["Name", lead.name]
  );
  if (lead.company) rows.push(["Company", lead.company]);
  rows.push(["Phone", lead.phone], ["Email", lead.email], ["Lead ID", lead.id]);

  const result = await sendMail({
    to: SITE.email,
    replyTo: lead.email,
    subject: `${retry ? "[RETRY] " : ""}[TRADE CALL${onCalendar ? "" : " · NOT ON CALENDAR"}] ${lead.company || lead.name}`,
    html: detailsEmailHtml("Trade qualification call", rows),
    context: `${retry ? "retry of " : ""}trade call ${lead.id}`,
  });
  return deliveryAttempt("email", result.ok ? null : result.error, retry);
}
