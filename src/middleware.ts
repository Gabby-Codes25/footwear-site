import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "admin_session";

/**
 * Lightweight check only — no crypto here, since middleware runs on the
 * Edge Runtime which doesn't support Node's `crypto` module. This just
 * confirms a token exists and isn't expired; it does NOT verify the
 * signature. Real cryptographic verification happens server-side in the
 * API routes (login/publish/logout), which run on the Node.js runtime.
 * This is a UX redirect, not the security boundary.
 */
function looksLikeValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expiry = Number(payload);
  if (Number.isNaN(expiry)) return false;
  if (Date.now() > expiry) return false;

  return true;
}

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!looksLikeValidToken(sessionToken)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/new", "/admin/manage"],
};
