import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/start-server-core";

/**
 * Password gate for every admin surface (/admin, /admin/testimonials, /studio
 * and their server functions).
 *
 * Single shared secret from the environment (ADMIN_PASSWORD in .env or the
 * host's settings). On login the server issues a signed session token
 * (expiry + HMAC-SHA256 with a server-side session secret) stored in an
 * HttpOnly SameSite=Lax cookie. Nothing privileged ever trusts the browser —
 * every admin server function calls requireAdmin() before touching data.
 *
 * Session secret: derived from ADMIN_PASSWORD when ADMIN_SESSION_SECRET is
 * not set, so rotating the password also invalidates every live session.
 */

const COOKIE_NAME = "wdh_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // one week
const LOGIN_RATE_LIMIT = 8; // attempts per window per IP
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** Same zero-dependency .env fallback as @/lib/db. */
function loadEnvFallback(): void {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] && m[2] !== undefined && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // ignore — a missing password surfaces as a clear error on login
  }
}

export function getAdminPassword(): string {
  loadEnvFallback();
  const pwd = process.env["ADMIN_PASSWORD"];
  if (!pwd || pwd.length < 8)
    throw new Error(
      "ADMIN_PASSWORD is not set (min 8 characters) — add it to .env or your host's environment settings.",
    );
  return pwd;
}

function sessionSecret(): string {
  loadEnvFallback();
  return process.env["ADMIN_SESSION_SECRET"] || `session:${getAdminPassword()}`;
}

/** expiryMs + "." + HMAC(expiryMs, secret) — constant-time compared on read. */
function signToken(expiresAtMs: number): string {
  const mac = crypto
    .createHmac("sha256", sessionSecret())
    .update(String(expiresAtMs))
    .digest("hex");
  return `${expiresAtMs}.${mac}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const expiryPart = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  const expiry = Number(expiryPart);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = crypto.createHmac("sha256", sessionSecret()).update(expiryPart).digest("hex");
  const a = Buffer.from(mac, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Throws unless the current request carries a valid admin session cookie. */
export async function requireAdmin(): Promise<void> {
  const token = getCookie(COOKIE_NAME);
  if (!verifyToken(token)) throw new Error("Not authorized — sign in at /admin first.");
}

// ---- brute-force throttle (in-memory, per cold start — enough for a single-owner gate) ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalStore = globalThis as any;
type Attempt = { count: number; windowStart: number };

function rateLimitKey(): string {
  const attempts: Map<string, Attempt> = globalStore.__wdhLoginAttempts ?? new Map();
  globalStore.__wdhLoginAttempts = attempts;
  // All logins share one bucket: the panel has a single legitimate user.
  const key = "global";
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: now });
    return "ok";
  }
  entry.count += 1;
  if (entry.count > LOGIN_RATE_LIMIT) return "limited";
  return "ok";
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const password = String((input as { password?: unknown })?.password ?? "");
    if (password.length === 0 || password.length > 200) throw new Error("Invalid password");
    return { password };
  })
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    if (rateLimitKey() === "limited")
      return { ok: false, error: "Too many attempts — wait 10 minutes and try again." };

    const expected = getAdminPassword();
    const a = Buffer.from(data.password);
    const b = Buffer.from(expected);
    const match = a.length === b.length && crypto.timingSafeEqual(a, b);
    if (!match) return { ok: false, error: "Wrong password." };

    const token = signToken(Date.now() + SESSION_TTL_SECONDS * 1000);
    setCookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env["NODE_ENV"] === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  // No removeCookie helper in this version — expire the cookie in place.
  setCookie(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
    maxAge: 0,
  });
  return { ok: true };
});

/** Client-side session probe for showing login vs. panel. */
export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie(COOKIE_NAME);
  return { signedIn: verifyToken(token) };
});

export const changeAdminPassword = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const current = String(v["current"] ?? "");
    const next = String(v["next"] ?? "");
    if (next.length < 8 || next.length > 200)
      throw new Error("New password must be 8-200 characters");
    return { current, next };
  })
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    await requireAdmin();
    const a = Buffer.from(data.current);
    const b = Buffer.from(getAdminPassword());
    if (!(a.length === b.length && crypto.timingSafeEqual(a, b)))
      return { ok: false, error: "Current password is wrong." };

    loadEnvFallback();
    process.env["ADMIN_PASSWORD"] = data.next;
    // Note: this updates the running process only. Persisting across deploys
    // requires setting ADMIN_PASSWORD in the host environment — the panel
    // shows a reminder about that after a successful change.

    // Invalidate every existing session (token MAC is secret-derived) and
    // re-issue a fresh cookie so the current tab stays signed in.
    const token = signToken(Date.now() + SESSION_TTL_SECONDS * 1000);
    setCookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env["NODE_ENV"] === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
    return { ok: true };
  });
