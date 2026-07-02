import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const expectedEmail = process.env.ADMIN_EMAIL;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  if (!expectedEmail || email.toLowerCase().trim() !== expectedEmail.toLowerCase().trim()) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  let passwordValid = false;
  try {
    passwordValid = verifyPassword(password);
  } catch {
    return NextResponse.json(
      { error: "Server is not configured correctly. Check ADMIN_PASSWORD_HASH." },
      { status: 500 }
    );
  }

  if (!passwordValid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
