/**
 * Cloudinary delivery URL builders for the public gallery.
 *
 * All visitor-facing images get the site watermark overlaid at render time —
 * the stored originals stay clean, and changing/removing the watermark later
 * is a one-line change here that applies to every photo at once.
 */

export const WATERMARK_TEXT = "whitedeserthorizons.com";

/**
 * Public gallery image with automatic format/quality and the watermark
 * pinned to the bottom-right corner.
 *
 * The font size scales with the delivered width so the mark stays readable
 * on both grid thumbnails and the full-size lightbox view.
 */
export function galleryUrl(cloudinaryUrl: string, width: number): string {
  // ~2.6% of the delivered width, clamped to a readable band (28px min).
  const fontSize = Math.max(28, Math.round(width * 0.026));
  const wm = [
    `l_text:Arial_${fontSize}_bold:${WATERMARK_TEXT}`,
    "co_rgb:ffffff",
    "o_80",
    "g_south_east",
    "x_20",
    "y_20",
  ].join(",");
  return cloudinaryUrl.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/${wm}/`,
  );
}
