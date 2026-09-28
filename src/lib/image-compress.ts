/**
 * Client-side image compression before upload.
 *
 * Strategy: re-encode through a canvas at a bounded long-edge resolution with
 * WebP when the browser supports it (JPEG fallback), skipping files that are
 * already small or that would not benefit (GIF/SVG/PNG with possible alpha
 * pass through untouched unless oversized).
 *
 * The returned File keeps the original extension-independent MIME so
 * Cloudinary stores it as image/webp (or jpeg) with the original name stem.
 */

export type CompressResult = {
  file: File;
  originalBytes: number;
  compressedBytes: number;
  skipped: boolean; // true when the original passed through untouched
};

const MAX_LONG_EDGE = 2560; // plenty for web + retina hero images
const SKIP_BELOW_BYTES = 350 * 1024; // already-light files go as-is
const TARGET_QUALITY = 0.82;
const MIN_SAVING_RATIO = 0.9; // keep original unless re-encode saves ≥10%

function isBrowserImage(file: File): boolean {
  return /^image\//.test(file.type) && file.type !== "image/gif" && file.type !== "image/svg+xml";
}

function drawToBlob(
  bitmap: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  mime: string,
): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, width, height);
  return new Promise((resolve) => canvas.toBlob(resolve, mime, TARGET_QUALITY));
}

function blobToFile(blob: Blob, original: File, ext: string): File {
  // Preserve the original stem; swap the extension to match the new encoding.
  const stem = original.name.replace(/\.[a-z0-9]+$/i, "");
  const type = ext === "webp" ? "image/webp" : "image/jpeg";
  return new File([blob], `${stem}.${ext}`, { type, lastModified: Date.now() });
}

export async function compressImage(file: File): Promise<CompressResult> {
  if (!isBrowserImage(file) || file.size <= SKIP_BELOW_BYTES)
    return { file, originalBytes: file.size, compressedBytes: file.size, skipped: true };

  // Pick the best output the browser can encode (WebP preferred, JPEG fallback).
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const supportsWebp = probe.toDataURL("image/webp").startsWith("data:image/webp");
  const mime = supportsWebp ? "image/webp" : "image/jpeg";
  const ext = supportsWebp ? "webp" : "jpg";

  let bitmap: ImageBitmap | HTMLImageElement;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // createImageBitmap can reject on exotic formats — fall back to <img>.
    try {
      bitmap = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("decode failed"));
        img.src = URL.createObjectURL(file);
      });
    } catch {
      return { file, originalBytes: file.size, compressedBytes: file.size, skipped: true };
    }
  }

  const longEdge = Math.max(bitmap.width, bitmap.height);
  const scale = Math.min(1, MAX_LONG_EDGE / longEdge);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const blob = await drawToBlob(bitmap, width, height, mime);
  if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();
  if (!blob || blob.size >= file.size * MIN_SAVING_RATIO)
    return { file, originalBytes: file.size, compressedBytes: file.size, skipped: true };

  return {
    file: blobToFile(blob, file, ext),
    originalBytes: file.size,
    compressedBytes: blob.size,
    skipped: false,
  };
}
