import { createServerFn } from "@tanstack/react-start";
import { notify } from "@/lib/notify";

/**
 * Gallery photo likes — persisted in Mongo + Telegram notification.
 * No accounts: one like per photo per browser (localStorage guard client-side).
 */

const VALID_PHOTOS = new Set(["forms", "hero", "camp", "contrast"]);

export const likePhoto = createServerFn({ method: "POST" })
  .validator((input: { photo?: string }) => {
    const photo = String(input?.photo ?? "");
    if (!VALID_PHOTOS.has(photo)) throw new Error("Unknown photo");
    return { photo };
  })
  .handler(async ({ data }) => {
    notify("like", `🖼️ ${data.photo}`);
    try {
      const { getAnyCollection } = await import("@/lib/db");
      const col = await getAnyCollection("photo_likes");
      await col.updateOne(
        { photo: data.photo },
        { $inc: { count: 1 }, $set: { lastAt: new Date() } },
        { upsert: true },
      );
      const doc = await col.findOne({ photo: data.photo });
      return { ok: true, count: doc?.count ?? 1 };
    } catch (e) {
      console.warn("[like] persist failed:", e instanceof Error ? e.message : e);
      return { ok: true, count: null };
    }
  });
