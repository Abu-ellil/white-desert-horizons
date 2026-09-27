import { createServerFn } from "@tanstack/react-start";

export type { MediaRow } from "@/lib/media";

/**
 * Server functions for the media studio (route /studio).
 *
 * Same shape as @/lib/testimonials: DB + node-only modules are imported
 * DYNAMICALLY inside each handler so they never enter the browser bundle.
 * Cloudinary secrets stay server-side; the browser only gets a short-lived
 * upload signature.
 *
 * Like the admin page, /studio is unlisted-but-ungated in this first
 * version — add real auth before a public launch.
 */

const ALBUM_RE = /^[\w\u0600-\u06FF][\w\u0600-\u06FF \-/&]{0,48}$/;

export const getMediaLibrary = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const raw = (input as { album?: unknown })?.album;
    const album = raw === undefined || raw === null || raw === "" ? null : String(raw);
    if (album && !ALBUM_RE.test(album)) throw new Error("Invalid album name");
    return { album };
  })
  .handler(async ({ data }) => {
    const { listMedia } = await import("@/lib/media");
    return listMedia(data.album);
  });

export const getUploadSignature = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const raw = String((input as { album?: unknown })?.album ?? "").trim();
    if (!ALBUM_RE.test(raw)) throw new Error("Invalid album name");
    // Everything from the browser lands in one Cloudinary folder tree.
    return { folder: `white-desert/${raw}` };
  })
  .handler(async ({ data }) => {
    const { signUploadParams } = await import("@/lib/cloudinary");
    return signUploadParams(data.folder);
  });

export const registerUploadedMedia = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const publicId = String(v["publicId"] ?? "").trim();
    const url = String(v["url"] ?? "").trim();
    const album = String(v["album"] ?? "").trim();
    if (!publicId || publicId.length > 200) throw new Error("Missing publicId");
    if (!/^https:\/\/res\.cloudinary\.com\//.test(url)) throw new Error("Invalid url");
    if (!ALBUM_RE.test(album)) throw new Error("Invalid album");
    const tags = Array.isArray(v["tags"])
      ? v["tags"]
          .map((t) => String(t).trim().slice(0, 24))
          .filter(Boolean)
          .slice(0, 12)
      : [];
    return {
      publicId,
      url,
      width: Math.max(0, Math.round(Number(v["width"]) || 0)),
      height: Math.max(0, Math.round(Number(v["height"]) || 0)),
      format: String(v["format"] ?? "jpg").slice(0, 8),
      bytes: Math.max(0, Math.round(Number(v["bytes"]) || 0)),
      album,
      tags,
    };
  })
  .handler(async ({ data }) => {
    const { createMedia } = await import("@/lib/media");
    return createMedia(data);
  });

function parseId(input: unknown): { id: string } {
  const id = String((input as { id?: unknown })?.id ?? "");
  if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
  return { id };
}

export const moveMediaToAlbum = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const { id } = parseId(input);
    const album = String((input as { album?: unknown })?.album ?? "").trim();
    if (!ALBUM_RE.test(album)) throw new Error("Invalid album name");
    return { id, album };
  })
  .handler(async ({ data }) => {
    const { setMediaAlbum } = await import("@/lib/media");
    await setMediaAlbum(data.id, data.album);
  });

export const toggleMediaFavorite = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const { id } = parseId(input);
    const favorite = Boolean((input as { favorite?: unknown })?.favorite);
    return { id, favorite };
  })
  .handler(async ({ data }) => {
    const { setMediaFavorite } = await import("@/lib/media");
    await setMediaFavorite(data.id, data.favorite);
  });

export const removeMedia = createServerFn({ method: "POST" })
  .validator(parseId)
  .handler(async ({ data }) => {
    const { getMedia, deleteMediaRow } = await import("@/lib/media");
    const { destroyCloudinaryAsset } = await import("@/lib/cloudinary");
    const row = await getMedia(data.id);
    if (!row) return; // already gone — treat as success
    await destroyCloudinaryAsset(row.publicId); // Cloudinary first: failure keeps the row visible
    await deleteMediaRow(data.id);
  });
