import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GETBRANDED_HOSTS = new Set([
  "getbranded.catalyst-digital-solutions.com",
  "getbranded.localhost",
]);

/**
 * getbranded.* serves the /trades offer at the root.
 * /terms serves ToS v1.0 + Schedule A (Stripe checkout consent links here).
 * /privacy redirects to the main site. Other paths rewrite to the offer.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (!GETBRANDED_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/trades";
    return NextResponse.rewrite(url);
  }

  // ToS v1.0 (+ Schedule A) — checkout consent links point here
  if (pathname === "/terms") {
    const url = request.nextUrl.clone();
    url.pathname = "/trades/terms";
    return NextResponse.rewrite(url);
  }

  // Post-purchase redirect target for Stripe Payment Links
  if (pathname === "/thank-you") {
    const url = request.nextUrl.clone();
    url.pathname = "/trades/thank-you";
    return NextResponse.rewrite(url);
  }

  // Privacy lives on the main site
  if (pathname === "/privacy") {
    return NextResponse.redirect("https://catalyst-digital-solutions.com/privacy");
  }

  // Keep /trades URL working on the subdomain too
  if (pathname === "/trades" || pathname.startsWith("/trades/")) {
    return NextResponse.next();
  }

  // Unknown paths on getbranded → offer page
  const url = request.nextUrl.clone();
  url.pathname = "/trades";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
