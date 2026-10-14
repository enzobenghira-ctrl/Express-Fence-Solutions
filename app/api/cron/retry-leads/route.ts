import { NextResponse } from "next/server";
import { deliverLead, emailConsultation, emailTradeCall, type ConsultationLead, type Lead, type TradeCallLead } from "@/lib/lead-delivery";
import { clearFailedMarker, listFailedLeads, loadLead, readPrivate, recordDelivery } from "@/lib/lead-store";

// Vercel Cron (vercel.json) re-sends every lead whose delivery failed, with "[RETRY]" in the
// subject, and updates its record. Vercel calls it with "Authorization: Bearer $CRON_SECRET";
// without CRON_SECRET set, the job refuses to run so nobody else can trigger the emails.

export const dynamic = "force-dynamic";
export const maxDuration = 300;

type StoredLead = Lead | ConsultationLead | TradeCallLead;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    if (!secret) console.error("[lead-retry] CRON_SECRET is not set — the retry job can't run.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = { checked: 0, delivered: 0, stillFailed: 0, unreadable: 0 };
  for (const marker of await listFailedLeads()) {
    summary.checked++;
    const saved = await loadLead<StoredLead>(marker.recordUrl);
    if (!saved) {
      summary.unreadable++;
      continue; // leave the marker: the record may just be unreachable right now
    }
    if (saved.record.delivery.status !== "failed") {
      await clearFailedMarker(marker.markerUrl); // already delivered some other way
      continue;
    }

    const { lead } = saved.record;
    const previous = saved.record.delivery.attempts;
    const onCalendar = previous.some((a) => a.channel === "calendar" && a.ok);
    let attempts;
    if (lead.kind === "consultation") {
      attempts = [await emailConsultation(lead, onCalendar, true)];
    } else if (lead.kind === "trade_call") {
      attempts = [await emailTradeCall(lead, onCalendar, true)];
    } else {
      const photo = lead.photoUrl ? await readPrivate(lead.photoUrl) : null;
      const crmAccepted = previous.some((a) => a.channel === "crm" && a.ok);
      attempts = await deliverLead(lead, photo, true, crmAccepted);
    }

    // Only the inbox email counts: a lead the CRM or calendar accepted is retried until it is emailed too.
    const delivered = attempts.some((a) => a.channel === "email" && a.ok);
    saved.record.delivery.retries++;
    await recordDelivery(saved, delivered ? "delivered" : "failed", [...previous, ...attempts]);
    if (delivered) {
      await clearFailedMarker(marker.markerUrl);
      summary.delivered++;
      console.log(`[lead-retry] Delivered lead ${lead.id} on retry ${saved.record.delivery.retries}.`);
    } else {
      summary.stillFailed++;
      console.error(`[lead-retry] UNDELIVERED LEAD ${lead.id} — retry ${saved.record.delivery.retries} failed too (${saved.path}).`);
    }
  }

  console.log("[lead-retry] Done:", JSON.stringify(summary));
  return NextResponse.json(summary);
}
