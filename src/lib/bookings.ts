import { createServerFn } from "@tanstack/react-start";
import { notify } from "@/lib/notify";

/**
 * Booking-request tracking: persists to Mongo (durable, reviewable) and
 * pushes an instant Telegram notification. Failure never blocks the
 * WhatsApp handoff on the client.
 */

type BookingRequest = {
  name: string;
  email: string;
  whatsapp: string;
  experience: string;
  date: string;
  travelers: string;
  message: string;
};

export const recordBooking = createServerFn({ method: "POST" })
  .validator((input: Partial<BookingRequest>) => ({
    name: String(input?.name ?? "").trim().slice(0, 80),
    email: String(input?.email ?? "").trim().slice(0, 120),
    whatsapp: String(input?.whatsapp ?? "").trim().slice(0, 40),
    experience: String(input?.experience ?? "").trim().slice(0, 120),
    date: String(input?.date ?? "").trim().slice(0, 40),
    travelers: String(input?.travelers ?? "").trim().slice(0, 10),
    message: String(input?.message ?? "").trim().slice(0, 1000),
  }))
  .handler(async ({ data }) => {
    // 1. Instant notification (most important — user sees it even if DB fails)
    notify(
      "booking_request",
      `👤 ${data.name || "بدون اسم"}\n📧 ${data.email || "—"}${data.whatsapp ? `\n📱 ${data.whatsapp}` : ""}\n🧭 ${data.experience || "غير محددة"}\n📅 ${data.date || "مرن"} · 👥 ${data.travelers || "?"}${data.message ? `\n💬 ${data.message.slice(0, 150)}` : ""}`,
    );

    // 2. Durable record — best-effort
    try {
      const { getAnyCollection } = await import("@/lib/db");
      const col = await getAnyCollection("booking_requests");
      await col.insertOne({
        ...data,
        createdAt: new Date(),
      });
      return { saved: true };
    } catch (e) {
      console.warn(
        "[booking] persist failed (notification already sent):",
        e instanceof Error ? e.message : e,
      );
      return { saved: false };
    }
  });
