import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { companyName, contactName, role, email, phone, projectType, volume, message } = await req.json();

  if (!companyName || !contactName || !role || !phone || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Express Fence Solutions <onboarding@resend.dev>",
    to: "Info@expressfencesolutions.com",
    replyTo: email || undefined,
    subject: `[PARTNER LEAD] New Trade Inquiry — ${companyName} (${role})`,
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a;">New Partner / Trade Inquiry</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:520px;">
        <tr><td style="padding:8px 0;color:#666;width:150px;">Company</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${companyName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Contact Name</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${contactName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Role</td><td style="padding:8px 0;color:#1a1a1a;">${role}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${phone}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;color:#1a1a1a;">${email}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Project Type</td><td style="padding:8px 0;color:#1a1a1a;">${projectType || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Est. Volume / # Projects</td><td style="padding:8px 0;color:#1a1a1a;">${volume || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;color:#1a1a1a;">${message || "—"}</td></tr>
      </table>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
