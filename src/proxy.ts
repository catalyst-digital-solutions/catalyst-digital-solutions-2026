import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://catalystdigitalsolutions.com";
const CANONICAL_HOST = "catalystdigitalsolutions.com";

/**
 * Backstop only. Vercel already 308s the old apex domains to the canonical host.
 * This set must never include the canonical host, or the redirect would loop.
 * www of the new domain is included so a bare www alias still lands on the apex.
 */
const APEX_ALIAS_HOSTS = new Set([
  "www.catalystdigitalsolutions.com",
  "catalyst-digital-solutions.com",
  "www.catalyst-digital-solutions.com",
  "catalyst-digital.solutions",
  "www.catalyst-digital.solutions",
]);

/** Retired Branding/Website Special host. Paths other than /privacy go home. */
const GETBRANDED_HOSTS = new Set([
  "getbranded.catalyst-digital-solutions.com",
  "getbranded.catalyst-digital.solutions",
  "www.getbranded.catalyst-digital-solutions.com",
]);

function redirectTo(pathname: string, search = ""): NextResponse {
  const dest = new URL(CANONICAL_ORIGIN);
  dest.pathname = pathname;
  dest.search = search;
  return NextResponse.redirect(dest, 308);
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (!host || host === CANONICAL_HOST) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  if (GETBRANDED_HOSTS.has(host)) {
    return redirectTo(pathname === "/privacy" ? "/privacy" : "/", "");
  }

  if (APEX_ALIAS_HOSTS.has(host)) {
    return redirectTo(pathname, search);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
