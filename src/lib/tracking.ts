import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, getRequestHeader, getRequestIP } from "@tanstack/start-server-core";

import { notify } from "@/lib/notify";
import { flagEmoji, insertVisit } from "@/lib/visits";

/**
 * Visit tracking (server): log every pageview to MongoDB with geo + device,
 * notify Telegram at most once per visitor+path per 30 min, and answer the
 * admin dashboard's polling from the same DB (no double read).
 *
 * Identity/privacy: an HttpOnly cookie (wdh_vid) holds a random visitor id —
 * no fingerprinting, no third parties, IP stored for geo lookup only.
 */

const VID_COOKIE = "wdh_vid";
const THROTTLE_MS = 30 * 60 * 1000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
g.__wdhVisitThrottle ??= new Map<string, number>();
/** ipwho.is geolocation cache — an IP basically never changes country. */
g.__wdhGeoCache ??= new Map<string, { country: string; countryName: string; city: string }>();

type Geo = { country: string; countryName: string; city: string };

async function geoLookup(ip: string): Promise<Geo> {
  const cache: Map<string, Geo> = g.__wdhGeoCache;
  const hit = cache.get(ip);
  if (hit) return hit;
  const empty = { country: "", countryName: "", city: "" };
  try {
    const res = await fetch(`http://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(2500),
    });
    const json = (await res.json()) as {
      success?: boolean;
      country_code?: string;
      country?: string;
      city?: string;
    };
    const geo: Geo = json.success
      ? {
          country: String(json.country_code ?? "").slice(0, 2),
          countryName: String(json.country ?? "").slice(0, 60),
          city: String(json.city ?? "").slice(0, 60),
        }
      : empty;
    cache.set(ip, geo); // cache misses too — don't hammer the API per view
    return geo;
  } catch {
    return empty;
  }
}

function classifyDevice(ua: string): "Mobile" | "Tablet" | "Desktop" {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return "Mobile";
  return "Desktop";
}

function maskIp(ip: string): string {
  // Telegram-only: keep the tail so repeated visits from one IP are visible
  // without logging the full address in the chat.
  const dot = ip.lastIndexOf(".");
  return dot > 0 ? `${ip.slice(0, dot)}.x` : ip;
}

export const trackVisit = createServerFn({ method: "POST" })
  .validator((input: { path?: string; ref?: string }) => ({
    path: String(input?.path ?? "/").slice(0, 200),
    ref: input?.ref ? String(input.ref).slice(0, 200) : "",
  }))
  .handler(async ({ data }) => {
    // The admin's own visits stay out of the log.
    if (getCookie("wdh_admin_session")) return { logged: false };

    const ip = getRequestIP({ xForwardedFor: true })?.split(",")[0]?.trim() || "";
    const ua = getRequestHeader("user-agent") ?? "";
    let sid = getCookie(VID_COOKIE) ?? "";
    if (!sid) {
      sid = crypto.randomUUID().slice(0, 12);
      setCookie(VID_COOKIE, sid, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env["NODE_ENV"] === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    const geo = ip ? await geoLookup(ip) : { country: "", countryName: "", city: "" };

    await insertVisit({
      ts: new Date(),
      sid,
      path: data.path,
      ref: data.ref,
      ip,
      ...geo,
      device: classifyDevice(ua),
    });

    // Telegram ping at most once per visitor+path per 30 min (old behavior).
    const map: Map<string, number> = g.__wdhVisitThrottle;
    const key = `${sid}:${data.path}`;
    const now = Date.now();
    const last = map.get(key) ?? 0;
    if (now - last >= THROTTLE_MS) {
      map.set(key, now);
      const flag = flagEmoji(geo.country);
      const loc = [geo.city, geo.countryName].filter(Boolean).join(", ") || "Unknown location";
      notify(
        "visit",
        `📄 ${data.path}\n${flag} ${loc} · ${classifyDevice(ua)}\n🔗 من: ${data.ref || "direct"}`,
      );
    }

    return { logged: true };
  });

export const getVisitStatsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/lib/auth");
  await requireAdmin();
  const { getVisitStats } = await import("@/lib/visits");
  return getVisitStats();
});
