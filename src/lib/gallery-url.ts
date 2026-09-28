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
 * pinned to the bottom-right corner, scaled with the image.
 */
export function galleryUrl(cloudinaryUrl: string, width: number): string {
  const wm = [
    `l_text:Arial_22:${WATERMARK_TEXT}`,
    "co_rgb:ffffff",
    "o_65",
    "g_south_east",
    "x_18",
    "y_18",
  ].join(",");
  return cloudinaryUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/${wm}/`);
}
