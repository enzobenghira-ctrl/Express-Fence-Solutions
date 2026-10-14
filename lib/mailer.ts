import nodemailer from "nodemailer";

// Sends mail through the company's own Locaweb mailbox over SMTP — no third-party mail
// service. Configured with SMTP_HOST, SMTP_PORT, SMTP_USER (the full address, which is also
// the From address) and SMTP_PASS.
//
// Failures are logged under one of four labels so a Locaweb-side problem can be told apart
// from a code bug at a glance in the Vercel logs:
//   SMTP NOT CONFIGURED · SMTP AUTH PROBLEM · SMTP CONNECTION PROBLEM · SMTP REJECTED MESSAGE
// Anything else is logged as "MAIL SEND FAILED (not an SMTP auth/connection problem)".

const FROM_NAME = "Express Fence Solutions";

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
  /** Shown in log lines, e.g. "lead 1234". */
  context: string;
}

export type MailResult = { ok: true } | { ok: false; error: string };

// Node socket/DNS codes plus nodemailer's own connection-phase codes.
const CONNECTION_CODES = new Set([
  "ECONNECTION",
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "ESOCKET",
  "ETLS",
  "EDNS",
  "ENOTFOUND",
  "EAI_AGAIN",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "EGREETING",
]);
const AUTH_RESPONSE_CODES = new Set([530, 534, 535, 538]);

interface SmtpError {
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
  message?: string;
}

function smtpConfig() {
  const { SMTP_HOST: host, SMTP_PORT: port, SMTP_USER: user, SMTP_PASS: pass } = process.env;
  const missing = Object.entries({ SMTP_HOST: host, SMTP_PORT: port, SMTP_USER: user, SMTP_PASS: pass })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  return { host: host ?? "", port: Number(port), user: user ?? "", pass: pass ?? "", missing };
}

export async function sendMail(msg: MailMessage): Promise<MailResult> {
  const cfg = smtpConfig();
  if (cfg.missing.length) {
    console.error(`[mail] SMTP NOT CONFIGURED (${msg.context}) — missing ${cfg.missing.join(", ")} in the Vercel environment variables.`);
    return { ok: false, error: `smtp_not_configured: missing ${cfg.missing.join(", ")}` };
  }

  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465, // 465 = TLS from the start; 587 upgrades with STARTTLS
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transport.sendMail({
      from: { name: FROM_NAME, address: cfg.user },
      to: msg.to,
      replyTo: msg.replyTo,
      subject: msg.subject,
      html: msg.html,
      attachments: msg.attachments,
    });
    return { ok: true };
  } catch (raw) {
    const err = (raw ?? {}) as SmtpError;
    // `response` is the server's own line (it starts with the SMTP code), e.g. "535 5.7.8 Authentication failed".
    const detail = [err.code, err.response || err.message].filter(Boolean).join(" ");
    if (err.code === "EAUTH" || (err.responseCode && AUTH_RESPONSE_CODES.has(err.responseCode))) {
      console.error(
        `[mail] SMTP AUTH PROBLEM (${msg.context}) — ${cfg.host} rejected the login for ${cfg.user}: ${detail}. ` +
          "Check SMTP_USER / SMTP_PASS and that SMTP sending is enabled for this mailbox in Locaweb. Not a code bug."
      );
      return { ok: false, error: `smtp_auth: ${detail}` };
    }
    if ((err.code && CONNECTION_CODES.has(err.code)) || err.command === "CONN") {
      console.error(
        `[mail] SMTP CONNECTION PROBLEM (${msg.context}) — couldn't connect to ${cfg.host}:${cfg.port}: ${detail}. ` +
          "Check SMTP_HOST / SMTP_PORT, or Locaweb may be blocking connections from Vercel. Not a code bug."
      );
      return { ok: false, error: `smtp_connection: ${detail}` };
    }
    if (err.responseCode) {
      console.error(
        `[mail] SMTP REJECTED MESSAGE (${msg.context}) — ${cfg.host} logged in fine but refused the message: ${detail}. ` +
          "Usually a Locaweb sending limit or policy, not a code bug."
      );
      return { ok: false, error: `smtp_rejected: ${detail}` };
    }
    console.error(`[mail] MAIL SEND FAILED (${msg.context}) (not an SMTP auth/connection problem):`, raw);
    return { ok: false, error: `mail_error: ${detail || String(raw)}` };
  } finally {
    transport.close();
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** The notification layout every lead email uses: a heading and a label/value table. */
export function detailsEmailHtml(heading: string, rows: [label: string, value: string][]): string {
  const row = ([label, value]: [string, string]) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1a1a1a;">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`;
  return `<h2 style="font-family:sans-serif;color:#1a1a1a;">${escapeHtml(heading)}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">${rows.map(row).join("")}</table>`;
}
