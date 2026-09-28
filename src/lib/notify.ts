import fs from "node:fs";
import path from "node:path";

/**
 * Telegram notifications for site events (visitor, testimonial, booking, likes).
 * Fire-and-forget: never throws, never blocks the response — a failed
 * notification must not break the user's action.
 *
 * Config: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID in the environment (or local .env,
 * same fallback parser as db.ts). Missing config = silent no-op.
 */

function loadEnvFallback(): void {
  if (process.env["TELEGRAM_BOT_TOKEN"]) return;
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] && m[2] !== undefined && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // ignore
  }
}
loadEnvFallback();

type EventKind = "visit" | "testimonial" | "booking_request" | "booking" | "like" | "comment";

const ICONS: Record<EventKind, string> = {
  visit: "👀",
  testimonial: "⭐",
  booking_request: "📝",
  booking: "🧭",
  like: "❤️",
  comment: "💬",
};

const LABELS: Record<EventKind, string> = {
  visit: "زائر جديد في الموقع",
  testimonial: "تقييم جديد في انتظار المراجعة",
  booking_request: "طلب حجز/استفسار جديد",
  booking: "حجز جديد!",
  like: "إعجاب جديد بصورة",
  comment: "تعليق جديد على صورة",
};

/** Fire-and-forget Telegram message. Safe to call without await. */
export function notify(event: EventKind, detail?: string): void {
  try {
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    const chatId = process.env["TELEGRAM_CHAT_ID"];
    if (!token || !chatId) return;

    const time = new Date().toLocaleString("en-GB", {
      timeZone: "Africa/Cairo",
      hour12: false,
    });
    const text = `${ICONS[event]} ${LABELS[event]}\n${detail ? `${detail}\n` : ""}🕒 ${time} Cairo`;

    const body = JSON.stringify({ chat_id: chatId, text });
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(8000),
    })
      .then((r) => {
        if (!r.ok) console.warn(`[notify] telegram responded ${r.status} for ${event}`);
      })
      .catch((e) =>
        console.warn(`[notify] failed (${event}):`, e instanceof Error ? e.message : e),
      );
  } catch (e) {
    console.warn("[notify] unexpected:", e instanceof Error ? e.message : e);
  }
}
