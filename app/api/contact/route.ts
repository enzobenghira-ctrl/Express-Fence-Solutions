import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, phone, email, service, location, message } = await req.json();

  if (!name || !phone || !service || !location) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Express Fence Solutions <onboarding@resend.dev>",
    to: "Info@expressfencesolutions.com",
    replyTo: email || undefined,
    subject: `New Quote Request — ${service} (${location})`,
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a;">New Free Quote Request</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:520px;">
        <tr><td style="padding:8px 0;color:#666;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${phone}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;color:#1a1a1a;">${email || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Service</td><td style="padding:8px 0;color:#1a1a1a;">${service}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Location</td><td style="padding:8px 0;color:#1a1a1a;">${location}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;color:#1a1a1a;">${message || "—"}</td></tr>
      </table>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
