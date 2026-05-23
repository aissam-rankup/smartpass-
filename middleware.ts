import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_TOURIST = ["/dashboard", "/qr"];
const PROTECTED_PARTNER = ["/partner"];
const PROTECTED_ADMIN = ["/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth =
    PROTECTED_TOURIST.some((p) => pathname.startsWith(p)) ||
    PROTECTED_PARTNER.some((p) => pathname.startsWith(p)) ||
    PROTECTED_ADMIN.some((p) => pathname.startsWith(p));

  if (!needsAuth) return NextResponse.next();

  const sessionCookie =
    req.cookies.get("authjs.session-token") ?? req.cookies.get("__Secure-authjs.session-token");

  if (!sessionCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Role-based checks happen at the page/API layer (DB lookup) — keep middleware Edge-safe.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/qr/:path*", "/partner/:path*", "/admin/:path*"],
};
