import { google } from "googleapis";

// Required environment variables (set in Vercel):
// GOOGLE_CALENDAR_ID — the target calendar's ID
// GOOGLE_SERVICE_ACCOUNT_EMAIL — service account email
// GOOGLE_PRIVATE_KEY — service account private key (handle \n escaping)

export const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

/** Pulls the meaningful message out of a Google API error without leaking secrets. */
export function describeGoogleError(err: unknown): string {
  const anyErr = err as { response?: { data?: { error?: { message?: string } } }; message?: string };
  return anyErr?.response?.data?.error?.message || anyErr?.message || String(err);
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    console.error(
      "[google-calendar] Missing credentials — GOOGLE_SERVICE_ACCOUNT_EMAIL set:",
      Boolean(email),
      "GOOGLE_PRIVATE_KEY set:",
      Boolean(privateKey),
      "GOOGLE_CALENDAR_ID set:",
      Boolean(process.env.GOOGLE_CALENDAR_ID)
    );
    throw new Error("Google Calendar credentials are not configured");
  }

  return new google.auth.JWT(email, undefined, privateKey, ["https://www.googleapis.com/auth/calendar"]);
}

export function getCalendarClient() {
  return google.calendar({ version: "v3", auth: getAuth() });
}
