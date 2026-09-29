import fs from "node:fs";
import path from "node:path";

/**
 * WhatsApp group notifications via Green-API (https://green-api.com).
 *
 * Why Green-API: WhatsApp has no official way for a normal number to send to
 * a group programmatically. Green-API links your own WhatsApp (QR scan, like
 * WhatsApp Web) and exposes a simple REST call that CAN post to a group chat.
 * The free Developer plan covers 3 chats/month with unlimited messages —
 * one booking-alert group fits comfortably.
 *
 * Config (env or local .env, same fallback parser as notify.ts):
 *   GREENAPI_ID_INSTANCE  — instance id from console.green-api.com
 *   GREENAPI_API_TOKEN    — instance token
 *   WHATSAPP_GROUP_ID     — target group chat id, ends in "@g.us"
 *
 * Missing config = silent no-op, exactly like the Telegram notifier.
 * Fire-and-forget: never throws, never blocks the booking handoff.
 */

function loadEnvFallback(): void {
  if (process.env["GREENAPI_ID_INSTANCE"]) return;
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

/** Sends text to the configured WhatsApp group. Safe to call without await. */
export function notifyWhatsAppGroup(text: string): void {
  try {
    const idInstance = process.env["GREENAPI_ID_INSTANCE"];
    const apiToken = process.env["GREENAPI_API_TOKEN"];
    const groupId = process.env["WHATSAPP_GROUP_ID"];
    if (!idInstance || !apiToken || !groupId) return; // not configured — no-op

    const url = `https://api.green-api.com/waInstance${encodeURIComponent(idInstance)}/sendMessage/${encodeURIComponent(apiToken)}`;
    const body = JSON.stringify({ chatId: groupId, message: text });
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(8000),
    })
      .then((r) => {
        if (!r.ok)
          console.warn(`[wa-notify] green-api responded ${r.status} (check quota/credentials)`);
      })
      .catch((e) => console.warn("[wa-notify] failed:", e instanceof Error ? e.message : e));
  } catch (e) {
    console.warn("[wa-notify] unexpected:", e instanceof Error ? e.message : e);
  }
}
