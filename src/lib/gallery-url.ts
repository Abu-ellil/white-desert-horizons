/**
 * Cloudinary delivery URL builders for the public gallery.
 *
 * All visitor-facing images get the brand watermark overlaid at render time —
 * the stored originals stay clean, and changing/removing the watermark later
 * is a one-line change here that applies to every photo at once.
 *
 * The watermark mirrors the site wordmark (serif "WHITE DESERT" over spaced
 * "HORIZONS") plus the domain, stacked in the bottom-right corner. It is
 * composed of Cloudinary text overlays, so it needs no uploaded logo asset
 * and it is baked into the delivered pixels of every size — thumbnails and
 * the fullscreen lightbox alike.
 */

export const WATERMARK_TEXT = "whitedeserthorizons.com";
export const WATERMARK_LINE_1 = "WHITE DESERT";
export const WATERMARK_LINE_2 = "HORIZONS";

/** URL-safe encoding for Cloudinary text-overlay strings (no / ? # & = %). */
function wmText(text: string): string {
  return encodeURIComponent(text).replace(/%20/g, " ");
}

/**
 * Public gallery image with automatic format/quality and the wordmark
 * watermark anchored bottom-right.
 *
 * The stack is a single text overlay with `\n` line breaks — Cloudinary
 * renders the lines stacked from one anchor point. Two constraints this
 * encodes, both learned the hard way against the live CDN:
 *   - Colors must be 6-digit hex; named colors like `red` return 400.
 *   - Multi-layer chains (one l_text per fl_layer_apply) do NOT stack: only
 *     the last layer survives, so a single multi-line overlay is the only
 *     reliable way to get more than one line of text.
 */
export function galleryUrl(cloudinaryUrl: string, width: number): string {
  // Wordmark ~3% of delivered width, clamped 12–40px. The size must be small
  // enough that the full three-line block fits inside narrow grid tiles (320px
  // on mobile) without clipping — the block is right-anchored and extends
  // leftward, so a too-large font pushes "whitedeserthorizons.com" off the
  // left edge.
  const mainSize = Math.max(12, Math.min(40, Math.round(width * 0.03)));
  const text = [WATERMARK_LINE_1, WATERMARK_LINE_2, WATERMARK_TEXT].join("\n");

  const layers = [
    `l_text:Arial_${mainSize}_bold:${wmText(text)}`,
    "co_rgb:ffffff",
    "o_90",
    "g_south_east",
    "x_8",
    "y_10",
  ].join(",");

  return cloudinaryUrl.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/${layers}/`);
}
