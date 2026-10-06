import { NextResponse, type NextRequest } from "next/server";

// Trailing-slash URLs → slashless, with a 301 (Next's built-in normalisation sends 308,
// and the launch checklist requires every redirect to be a 301). next.config.mjs sets
// skipTrailingSlashRedirect so explicit redirects like /en_US/fences/ match first.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Next treats a trailing "/" in a matcher as optional, so the check has to live here.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    // A plain URL: NextURL.clone() re-appends the slash when serialised.
    const url = new URL(pathname.replace(/\/+$/, "") + req.nextUrl.search, req.url);
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|images/).*)"],
};
