/**
 * Admin login: one password (ADMIN_PASSWORD). On success we set an httpOnly cookie
 * "<expiry>.<signature>", signed with SESSION_SECRET using HMAC-SHA256.
 * Uses Web Crypto, so it works both in middleware (edge) and in server actions.
 */
export const COOKIE = "admin_session";
const DAYS = 7;

const enc = new TextEncoder();

async function hmac(value: string): Promise<string> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) throw new Error("SESSION_SECRET must be set (16+ characters).");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time comparison so timing doesn't leak how much of a value matched. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession(): Promise<{ value: string; maxAge: number }> {
  const maxAge = DAYS * 24 * 60 * 60;
  const exp = String(Date.now() + maxAge * 1000);
  return { value: `${exp}.${await hmac(exp)}`, maxAge };
}

export async function verifySession(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  try {
    return safeEqual(sig, await hmac(exp));
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}
