import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { baseUrl, isProductionDeploy, sessionDays, supabaseEnv } from "./env";
import type { Backend } from "./backend";
import type { InstanceRow, TokenRow } from "./store/types";

/**
 * Access model (no passwords):
 *  1. Catalyst mints a random 256-bit token tied to the client's email.
 *     Only its SHA-256 hash is stored. Links expire (default 30 days) and can
 *     be revoked.
 *  2. Opening /{slug}/onboarding/access?t=… verifies the token, sets an
 *     httpOnly, signed session cookie, and redirects to the clean URL so the
 *     token never stays in the address bar/history.
 *  3. Every API call re-checks the cookie signature, the token row (not
 *     revoked/expired) and the instance — the browser never chooses which
 *     onboarding instance it is editing.
 */

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

function sessionSecret(): string {
  const explicit = process.env.ONBOARDING_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 32) return explicit;
  const sb = supabaseEnv();
  if (sb) return createHmac("sha256", sb.key).update("catalyst-onboarding-session-v1").digest("hex");
  if (isProductionDeploy()) throw new Error("ONBOARDING_SESSION_SECRET is required");
  return "local-dev-only-onboarding-session-secret-000000";
}

export const cookieName = (slug: string) => `cds_onb_${slug.replace(/[^a-z0-9_-]/gi, "")}`;

interface SessionPayload {
  i: string; // instance id
  t: string; // token id
  e: number; // expiry (ms)
}

function signPayload(p: SessionPayload) {
  const body = Buffer.from(JSON.stringify(p)).toString("base64url");
  const sig = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyPayload(raw: string | undefined): SessionPayload | null {
  if (!raw || raw.length > 600) return null;
  const [body, sig] = raw.split(".");
  if (!body || !sig) return null;
  const want = Buffer.from(createHmac("sha256", sessionSecret()).update(body).digest("base64url"));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (typeof p.i !== "string" || typeof p.t !== "string" || typeof p.e !== "number") return null;
    if (p.e < Date.now()) return null;
    return p;
  } catch {
    return null;
  }
}

export async function mintAccessLink(
  backend: Backend,
  instance: InstanceRow,
  opts: { days?: number } = {},
): Promise<{ url: string; token: TokenRow }> {
  const raw = randomBytes(32).toString("base64url");
  const days = opts.days ?? sessionDays();
  const token = await backend.store.createToken({
    instance_id: instance.id,
    token_hash: hashToken(raw),
    email: instance.contact_email,
    expires_at: new Date(Date.now() + days * 86400_000).toISOString(),
  });
  return { url: `${baseUrl()}/${instance.client_slug}/onboarding/access?t=${raw}`, token };
}

export type TokenCheck =
  | { ok: true; token: TokenRow; instance: InstanceRow }
  | { ok: false; reason: "invalid" | "expired" | "revoked" };

export async function checkRawToken(backend: Backend, slug: string, raw: string): Promise<TokenCheck> {
  if (!raw || raw.length < 20 || raw.length > 100 || !/^[A-Za-z0-9_-]+$/.test(raw)) return { ok: false, reason: "invalid" };
  const token = await backend.store.findTokenByHash(hashToken(raw));
  if (!token) return { ok: false, reason: "invalid" };
  if (token.revoked_at) return { ok: false, reason: "revoked" };
  if (new Date(token.expires_at).getTime() < Date.now()) return { ok: false, reason: "expired" };
  const instance = await backend.store.getInstance(token.instance_id);
  if (!instance || instance.client_slug !== slug || instance.status === "archived") return { ok: false, reason: "invalid" };
  return { ok: true, token, instance };
}

/** Cookie spec for a token — attach to a NextResponse (route handlers that redirect). */
export function sessionCookie(slug: string, token: TokenRow) {
  const exp = new Date(token.expires_at).getTime();
  return {
    name: cookieName(slug),
    value: signPayload({ i: token.instance_id, t: token.id, e: exp }),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      expires: new Date(exp),
    },
  };
}

export async function clearSessionCookie(slug: string) {
  (await cookies()).delete(cookieName(slug));
}

export type Session = { instance: InstanceRow; token: TokenRow };
export type SessionCheck = { ok: true; session: Session } | { ok: false; reason: "none" | "expired" | "invalid" };

export async function readSession(backend: Backend, slug: string): Promise<SessionCheck> {
  const raw = (await cookies()).get(cookieName(slug))?.value;
  if (!raw) return { ok: false, reason: "none" };
  const p = verifyPayload(raw);
  if (!p) return { ok: false, reason: "expired" };
  const token = await backend.store.getToken(p.t);
  if (!token || token.instance_id !== p.i) return { ok: false, reason: "invalid" };
  if (token.revoked_at || new Date(token.expires_at).getTime() < Date.now()) return { ok: false, reason: "expired" };
  const instance = await backend.store.getInstance(p.i);
  if (!instance || instance.client_slug !== slug || instance.status === "archived") return { ok: false, reason: "invalid" };
  return { ok: true, session: { instance, token } };
}

export function hashIp(ip: string) {
  return createHmac("sha256", sessionSecret()).update("ip:" + ip).digest("hex").slice(0, 16);
}
