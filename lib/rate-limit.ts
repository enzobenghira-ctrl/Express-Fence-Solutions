// Simple sliding-window rate limiter for form endpoints. In-memory, so each serverless
// instance counts separately — enough to blunt a bot hammering a form. If real abuse
// shows up, swap the Map for a shared store (e.g. Upstash Redis) behind the same function.

const hits = new Map<string, number[]>();
const MAX_KEYS = 5000;

/** Returns true if this request is allowed. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > MAX_KEYS) {
    // Drop the oldest key so memory stays bounded.
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return true;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}
