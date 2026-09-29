import type { Collection } from "mongodb";

import { getAnyCollection } from "@/lib/db";

/**
 * Media library storage — one MongoDB collection mirroring what lives on
 * Cloudinary. Cloudinary stays the source of truth for the bytes; the row
 * here carries album/tags plus a stable id for the studio UI.
 *
 * Deletion order: destroy on Cloudinary first, then drop the row — a failed
 * destroy leaves the row (and the UI reports the error) so nothing becomes
 * an orphaned ghost.
 */

export type MediaRow = {
  id: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  album: string;
  title: string;
  description: string;
  tags: string[];
  favorite: boolean;
  featured: boolean;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MediaDoc = any;

function getCollection(): Promise<Collection<MediaDoc>> {
  return getAnyCollection("media");
}

export function toMediaRow(doc: MediaDoc): MediaRow {
  return {
    id: String(doc._id),
    publicId: String(doc.publicId ?? ""),
    url: String(doc.url ?? ""),
    width: Number(doc.width ?? 0),
    height: Number(doc.height ?? 0),
    format: String(doc.format ?? "jpg"),
    bytes: Number(doc.bytes ?? 0),
    album: String(doc.album ?? "Unsorted"),
    title: String(doc.title ?? ""),
    description: String(doc.description ?? ""),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String).slice(0, 12) : [],
    favorite: Boolean(doc.favorite),
    featured: Boolean(doc.featured),
    created_at:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString().slice(0, 19).replace("T", " ")
        : String(doc.createdAt ?? ""),
  };
}

export async function listMedia(album: string | null): Promise<MediaRow[]> {
  const col = await getCollection();
  const filter = album && album !== "All" ? { album } : {};
  const docs = await col.find(filter).sort({ createdAt: -1 }).limit(500).toArray();
  return docs.map(toMediaRow);
}

/** Upsert-on-public_id: re-uploading the same asset updates metadata instead of duplicating rows. */
export async function createMedia(input: {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  album: string;
  tags: string[];
  title?: string;
  description?: string;
}): Promise<MediaRow> {
  const col = await getCollection();
  const doc = {
    publicId: input.publicId,
    url: input.url,
    width: input.width,
    height: input.height,
    format: input.format,
    bytes: input.bytes,
    album: input.album,
    tags: input.tags,
    title: input.title ?? "",
    description: input.description ?? "",
    favorite: false,
    createdAt: new Date(),
  };
  const res = await col.findOneAndUpdate(
    { publicId: input.publicId },
    { $setOnInsert: doc },
    { upsert: true, returnDocument: "after" },
  );
  return toMediaRow(res);
}

export async function setMediaAlbum(id: string, album: string): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { album } });
}

export async function setMediaFavorite(id: string, favorite: boolean): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { favorite } });
}

/**
 * Toggle whether a photo appears in the landing-page gallery. Enforces the
 * 4-slot layout: featuring a 5th photo auto-unfeatures the oldest one (FIFO).
 */
export async function setMediaFeatured(id: string, featured: boolean): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  const max = 4;
  if (featured) {
    const current = await col.find({ featured: true }).sort({ createdAt: 1 }).toArray();
    const already = current.some((d) => String(d._id) === id);
    const overflow = current.length - (already ? 1 : 0) - max + 1;
    const toUnfeature = overflow > 0 ? current.slice(0, overflow).map((d) => String(d._id)) : [];
    if (toUnfeature.length > 0)
      await col.updateMany(
        { _id: { $in: toUnfeature.map((x) => new ObjectId(x)) } },
        { $set: { featured: false } },
      );
  }
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { featured } });
}

/** Set a human caption/metadata for a photo (shown in the studio and public gallery). */
export async function setMediaCaption(
  id: string,
  title: string,
  description: string,
): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { title, description } });
}

export async function getMedia(id: string): Promise<MediaRow | null> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return doc ? toMediaRow(doc) : null;
}

export async function deleteMediaRow(id: string): Promise<void> {
  const col = await getCollection();
  const { ObjectId } = await import("mongodb");
  await col.deleteOne({ _id: new ObjectId(id) });
}
