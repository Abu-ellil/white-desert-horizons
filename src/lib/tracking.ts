import { createServerFn } from "@tanstack/react-start";
import { notify } from "@/lib/notify";

/**
 * Fire-and-forget visit tracking → Telegram.
 * Throttled: one notification per path per 30 min so a browsing session
 * doesn't spam the chat. State kept in globalThis (per lambda instance —
 * good enough for a low-traffic site).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
g.__wdhVisitThrottle ??= new Map<string, number>();

const THROTTLE_MS = 30 * 60 * 1000;

export const trackVisit = createServerFn({ method: "POST" })
  .validator((input: { path?: string; ref?: string }) => ({
    path: String(input?.path ?? "/").slice(0, 200),
    ref: input?.ref ? String(input.ref).slice(0, 200) : "",
  }))
  .handler(async ({ data }) => {
    const map: Map<string, number> = g.__wdhVisitThrottle;
    const now = Date.now();
    const last = map.get(data.path) ?? 0;
    if (now - last < THROTTLE_MS) return { sent: false };
    map.set(data.path, now);
    notify(
      "visit",
      `📄 ${data.path}${data.ref ? `\n🔗 من: ${data.ref}` : ""}`,
    );
    return { sent: true };
  });
