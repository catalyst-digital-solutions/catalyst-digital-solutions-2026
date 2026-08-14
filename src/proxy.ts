import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GETBRANDED_HOSTS = new Set([
  "getbranded.catalyst-digital-solutions.com",
  "getbranded.localhost",
]);

/**
 * getbranded.* serves the /trades offer at the root.
 * Other paths on that host rewrite under /trades when needed;
 * privacy/terms stay on the main site via absolute footer links.
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
