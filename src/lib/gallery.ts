import { createServerFn } from "@tanstack/react-start";

/**
 * Public gallery (route /gallery) — shows the media curated in /studio,
 * with likes and comments for visitors.
 *
 * Likes reuse the photo_likes collection, keyed by Cloudinary public_id.
 * Comments live in gallery_comments and post live (validated + length-capped);
 * every comment fires a Telegram notification via notify() so the owner sees
 * everything the moment it lands. Same no-auth convention as the admin pages
 * — add real auth before locking anything sensitive down.
 */

const ALBUM_RE = /^[\w\u0600-\u06FF][\w\u0600-\u06FF \-/&]{0,48}$/;
const PUBLIC_ID_RE = /^[\w\-/]{1,200}$/;

export type GalleryPhoto = {
  id: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  album: string;
  title: string;
  description: string;
  created_at: string;
};

export type GalleryComment = {
  id: string;
  name: string;
  text: string;
  created_at: string;
};

export const getPublicGallery = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const raw = (input as { album?: unknown })?.album;
    const album = raw === undefined || raw === null || raw === "" ? null : String(raw);
    if (album && !ALBUM_RE.test(album)) throw new Error("Invalid album name");
    return { album };
  })
  .handler(async ({ data }) => {
    const { listMedia } = await import("@/lib/media");
    const rows = await listMedia(data.album);
    return rows.map((r): GalleryPhoto => ({
      id: r.id,
      publicId: r.publicId,
      url: r.url,
      width: r.width,
      height: r.height,
      album: r.album,
      title: r.title,
      description: r.description,
      created_at: r.created_at,
    }));
  });

function parsePublicId(input: unknown): { publicId: string } {
  const publicId = String((input as { publicId?: unknown })?.publicId ?? "");
  if (!PUBLIC_ID_RE.test(publicId)) throw new Error("Invalid photo id");
  return { publicId };
}

/** Like counts for a batch of keys (photo_likes collection, keyed by `photo`). */
export const getGalleryLikes = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const raw = (input as { publicIds?: unknown })?.publicIds;
    if (!Array.isArray(raw)) throw new Error("publicIds must be an array");
    const publicIds = raw
      .map((p) => String(p))
      .filter((p) => PUBLIC_ID_RE.test(p))
      .slice(0, 200);
    return { publicIds };
  })
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_likes");
    const docs = await col.find({ photo: { $in: data.publicIds } }).toArray();
    const counts: Record<string, number> = {};
    for (const d of docs) counts[String(d.photo)] = Number(d.count ?? 0);
    return counts;
  });

export const likeGalleryPhoto = createServerFn({ method: "POST" })
  .validator(parsePublicId)
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_likes");
    await col.updateOne(
      { photo: data.publicId },
      { $inc: { count: 1 }, $set: { lastAt: new Date() } },
      { upsert: true },
    );
    const doc = await col.findOne({ photo: data.publicId });
    return { ok: true, count: doc?.count ?? 1 };
  });

function toCommentRow(doc: Record<string, unknown>): GalleryComment {
  return {
    id: String(doc["_id"]),
    name: String(doc["name"] ?? ""),
    text: String(doc["text"] ?? ""),
    created_at:
      doc["createdAt"] instanceof Date
        ? (doc["createdAt"] as Date).toISOString().slice(0, 19).replace("T", " ")
        : String(doc["createdAt"] ?? ""),
  };
}

export const listGalleryComments = createServerFn({ method: "GET" })
  .validator(parsePublicId)
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("gallery_comments");
    const docs = await col
      .find({ publicId: data.publicId })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    return docs.map(toCommentRow);
  });

export const addGalleryComment = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const publicId = String(v["publicId"] ?? "");
    if (!PUBLIC_ID_RE.test(publicId)) throw new Error("Invalid photo id");
    const name = String(v["name"] ?? "").trim();
    const text = String(v["text"] ?? "").trim();
    if (name.length < 2 || name.length > 60) throw new Error("Name must be 2-60 characters");
    if (text.length < 2 || text.length > 500) throw new Error("Comment must be 2-500 characters");
    return { publicId, name, text };
  })
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("gallery_comments");
    const doc = {
      publicId: data.publicId,
      name: data.name,
      text: data.text,
      createdAt: new Date(),
    };
    const res = await col.insertOne(doc);
    // Owner sees every comment instantly on Telegram (best-effort, never blocks the reply).
    try {
      const { notify } = await import("@/lib/notify");
      notify(
        "comment",
        `💬 ${data.name} on ${data.publicId.split("/").pop()}\n${data.text.slice(0, 140)}`,
      );
    } catch {
      /* ignore */
    }
    return toCommentRow({ _id: res.insertedId, ...doc });
  });
