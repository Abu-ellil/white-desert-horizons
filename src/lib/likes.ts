import { createServerFn } from "@tanstack/react-start";
import { notify } from "@/lib/notify";

/**
 * Landing-page photo likes — persisted in Mongo + Telegram notification.
 * No accounts: one like per photo per browser (localStorage guard client-side).
 * The same photo_likes collection backs /gallery likes (keyed by public_id);
 * landing photos are hand-picked from the studio, so the key here is the
 * photo's Cloudinary public_id — identical to the gallery's key. A like on
 * either surface counts toward the same total.
 */

/** Landing keys are Cloudinary public_ids (letters/digits/slash/dash/underscore). */
const KEY_RE = /^[\w\-/]{1,200}$/;

export const likePhoto = createServerFn({ method: "POST" })
  .validator((input: { photo?: string }) => {
    const photo = String(input?.photo ?? "");
    if (!KEY_RE.test(photo)) throw new Error("Unknown photo");
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

/** Current like counts for every photo that has any (batched, read-only). */
export const getLandingLikes = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_likes");
    const docs = await col.find({}).toArray();
    const counts: Record<string, number> = {};
    for (const d of docs) counts[String(d.photo)] = Number(d.count ?? 0);
    return counts;
  } catch {
    return {}; // likes are decorative — the page works without them
  }
});
