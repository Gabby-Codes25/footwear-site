import { createHmac, timingSafeEqual, scryptSync } from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set in environment variables.");
  }
  return secret;
}

export function verifyPassword(plainPassword: string): boolean {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored || !stored.includes(":")) {
    throw new Error(
      "ADMIN_PASSWORD_HASH is not set correctly."
    );
  }
  const [salt, storedHashHex] = stored.split(":");
  const candidateHash = scryptSync(plainPassword, salt, 64);
  const storedHash = Buffer.from(storedHashHex, "hex");

  if (candidateHash.length !== storedHash.length) return false;
  return timingSafeEqual(candidateHash, storedHash);
}

function sign(value: string): string {
  const hmac = createHmac("sha256", getSecret());
  hmac.update(value);
  return hmac.digest("hex");
}

/** Builds a signed session token: "<expiryTimestamp>.<signature>" */
export function createSessionToken(): string {
  const expiry = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiry);
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

/** Validates a session token's signature and expiry. */
export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  const expiry = Number(payload);
  if (Number.isNaN(expiry) || Date.now() > expiry) return false;

  return true;
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
