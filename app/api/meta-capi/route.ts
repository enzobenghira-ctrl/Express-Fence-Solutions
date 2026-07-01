import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

interface MetaCapiRequestBody {
  eventName: string;
  eventId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  value?: number;
  currency?: string;
  customData?: Record<string, unknown>;
  sourceUrl?: string;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string): string {
  return sha256(email.trim().toLowerCase());
}

function hashPhone(phone: string): string {
  return sha256(phone.replace(/\D/g, ""));
}

function hashText(text: string): string {
  return sha256(text.trim().toLowerCase());
}

export async function POST(request: NextRequest) {
  try {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
      console.error("Meta CAPI: missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN env vars");
      return NextResponse.json({ success: false, error: "Meta CAPI not configured" }, { status: 500 });
    }

    const body: MetaCapiRequestBody = await request.json();
    const { eventName, eventId } = body;

    if (!eventName || !eventId) {
      return NextResponse.json({ success: false, error: "eventName and eventId are required" }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");
    const referer = request.headers.get("referer");

    const cookieHeader = request.headers.get("cookie") ?? "";
    const fbp = cookieHeader.match(/_fbp=([^;]+)/)?.[1];
    const fbc = cookieHeader.match(/_fbc=([^;]+)/)?.[1];

    const userData: Record<string, string> = {};
    if (body.email) userData.em = hashEmail(body.email);
    if (body.phone) userData.ph = hashPhone(body.phone);
    if (body.firstName) userData.fn = hashText(body.firstName);
    if (body.lastName) userData.ln = hashText(body.lastName);
    if (body.city) userData.ct = hashText(body.city);
    if (body.state) userData.st = hashText(body.state);
    if (body.zip) userData.zp = hashText(body.zip);
    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const event = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: body.sourceUrl || referer || undefined,
      user_data: userData,
      custom_data: {
        value: body.value,
        currency: body.currency || "USD",
        ...body.customData,
      },
    };

    const payload: Record<string, unknown> = {
      data: [event],
      access_token: ACCESS_TOKEN,
    };

    // Present during setup for Meta Events Manager verification; remove META_TEST_EVENT_CODE before launch.
    if (TEST_EVENT_CODE) {
      payload.test_event_code = TEST_EVENT_CODE;
    }

    const metaResponse = await fetch(`https://graph.facebook.com/v20.0/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaResult = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error("Meta CAPI error:", metaResult);
      return NextResponse.json({ success: false, error: metaResult }, { status: metaResponse.status });
    }

    return NextResponse.json({ success: true, result: metaResult });
  } catch (error) {
    console.error("Meta CAPI request failed:", error);
    return NextResponse.json({ success: false, error: "Internal error sending Meta CAPI event" }, { status: 500 });
  }
}
