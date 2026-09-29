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

// ---------------------------------------------------------------------------
// Admin surfaces — listing + cleanup (gated behind the admin session cookie)
// ---------------------------------------------------------------------------

export type BookingRow = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  experience: string;
  date: string;
  travelers: string;
  message: string;
  createdAt: string; // "YYYY-MM-DD HH:MM:SS" (UTC) — same format as testimonials
};

export const getBookingRequests = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/lib/auth");
  await requireAdmin();
  const { getAnyCollection } = await import("@/lib/db");
  const col = await getAnyCollection("booking_requests");
  const docs = await col.find({}).sort({ createdAt: -1 }).limit(300).toArray();
  return docs.map((d) => ({
    id: String(d._id),
    name: String(d.name ?? ""),
    email: String(d.email ?? ""),
    whatsapp: String(d.whatsapp ?? ""),
    experience: String(d.experience ?? ""),
    date: String(d.date ?? ""),
    travelers: String(d.travelers ?? ""),
    message: String(d.message ?? ""),
    createdAt:
      d.createdAt instanceof Date
        ? d.createdAt.toISOString().slice(0, 19).replace("T", " ")
        : String(d.createdAt ?? ""),
  })) as BookingRow[];
});

export const removeBooking = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const id = String((input as { id?: unknown })?.id ?? "");
    if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
    return { id };
  })
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { getAnyCollection } = await import("@/lib/db");
    const { ObjectId } = await import("mongodb");
    const col = await getAnyCollection("booking_requests");
    await col.deleteOne({ _id: new ObjectId(data.id) });
    return { removed: true };
  });

export const recordBooking = createServerFn({ method: "POST" })
  .validator((input: Partial<BookingRequest>) => ({
    name: String(input?.name ?? "")
      .trim()
      .slice(0, 80),
    email: String(input?.email ?? "")
      .trim()
      .slice(0, 120),
    whatsapp: String(input?.whatsapp ?? "")
      .trim()
      .slice(0, 40),
    experience: String(input?.experience ?? "")
      .trim()
      .slice(0, 120),
    date: String(input?.date ?? "")
      .trim()
      .slice(0, 40),
    travelers: String(input?.travelers ?? "")
      .trim()
      .slice(0, 10),
    message: String(input?.message ?? "")
      .trim()
      .slice(0, 1000),
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
