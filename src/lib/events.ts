import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/start-server-core";

/**
 * Conversion events — lightweight counters for the actions that matter:
 * WhatsApp clicks and booking-form submissions. One small Mongo collection
 * ("events"), no geo lookup, no Telegram ping (visits already handle that).
 *
 * The admin's own clicks are skipped via the admin session cookie, same as
 * visit tracking.
 */

export type EventKind = "whatsapp_click" | "form_submit";

export type EventRow = {
  id: string;
  ts: string;
  kind: EventKind;
  label: string; // where the action happened, e.g. "plan", "form"
};

export const trackEvent = createServerFn({ method: "POST" })
  .validator((input: { kind?: string; label?: string }) => {
    const kind = String(input?.kind ?? "");
    if (kind !== "whatsapp_click" && kind !== "form_submit") throw new Error("Invalid kind");
    return { kind, label: String(input?.label ?? "").slice(0, 40) };
  })
  .handler(async ({ data }) => {
    if (getCookie("wdh_admin_session")) return { logged: false };
    try {
      const { getAnyCollection } = await import("@/lib/db");
      const col = await getAnyCollection("events");
      await col.insertOne({
        ts: new Date(),
        kind: data.kind,
        label: data.label,
        sid: getCookie("wdh_vid") ?? "",
      });
      return { logged: true };
    } catch (e) {
      console.warn("[events] insert failed:", e instanceof Error ? e.message : e);
      return { logged: false };
    }
  });

export type ConversionStats = {
  totals: { whatsappClicks: number; formSubmits: number };
  week: { whatsappClicks: number; formSubmits: number };
  today: { whatsappClicks: number; formSubmits: number };
  recent: EventRow[];
  generatedAt: string;
};

export const getConversionStatsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/lib/auth");
  await requireAdmin();
  const { getAnyCollection } = await import("@/lib/db");
  const col = await getAnyCollection("events");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  async function countSince(kind: EventKind, since?: Date): Promise<number> {
    const q: Record<string, unknown> = { kind };
    if (since) q["ts"] = { $gte: since };
    return col.countDocuments(q);
  }

  const [waAll, formAll, waWeek, formWeek, waToday, formToday, recentDocs] = await Promise.all([
    countSince("whatsapp_click"),
    countSince("form_submit"),
    countSince("whatsapp_click", weekAgo),
    countSince("form_submit", weekAgo),
    countSince("whatsapp_click", startOfDay),
    countSince("form_submit", startOfDay),
    col.find().sort({ ts: -1 }).limit(12).toArray(),
  ]);

  return {
    totals: { whatsappClicks: waAll, formSubmits: formAll },
    week: { whatsappClicks: waWeek, formSubmits: formWeek },
    today: { whatsappClicks: waToday, formSubmits: formToday },
    recent: recentDocs.map((d) => ({
      id: String(d._id),
      ts: d.ts instanceof Date ? d.ts.toISOString() : String(d.ts ?? ""),
      kind: (d.kind === "form_submit" ? "form_submit" : "whatsapp_click") as EventKind,
      label: String(d.label ?? ""),
    })),
    generatedAt: new Date().toISOString(),
  } as ConversionStats;
});
