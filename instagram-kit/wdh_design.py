"""
White Desert Horizons — Instagram kit design system.

Derives the exact brand palette from the site's styles.css (oklch tokens),
loads the same typefaces (Cormorant Garamond / Manrope) plus Amiri + Cairo
for Arabic, and provides drawing primitives shared by every generator.
"""

from __future__ import annotations

import math
import os
import re

from PIL import Image, ImageDraw, ImageFont, ImageOps

try:
    from PIL import features
    HAVE_RAQM = features.check("raqm")
except Exception:  # pragma: no cover
    HAVE_RAQM = False

KIT_DIR = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(KIT_DIR, "fonts")
ASSETS = os.path.join(os.path.dirname(KIT_DIR), "src", "assets")

INK_TOKEN = "oklch(0.195 0.01 98)"       # --surface-dark / --foreground
INK_DEEP_TOKEN = "oklch(0.16 0.012 85)"  # --hero-background
IVORY_TOKEN = "oklch(0.955 0.015 86)"    # --background / --surface-dark-foreground
CARD_TOKEN = "oklch(0.978 0.009 84)"     # --card
GOLD_TOKEN = "oklch(0.704 0.081 78)"     # --primary / --gold-muted
WARM_TOKEN = "oklch(0.925 0.027 79)"     # --surface-warm
MUTED_TOKEN = "oklch(0.46 0.018 80)"     # --muted-foreground
ACCENT_TOKEN = "oklch(0.878 0.032 79)"   # --accent
LINE_TOKEN = "oklch(0.38 0.012 92)"      # --line-dark


def oklch_to_rgb(L: float, C: float, H: float) -> tuple[int, int, int]:
    """Convert OKLCH to sRGB (0-255) with gamut clamping."""
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    def gamma(u: float) -> float:
        u = min(1.0, max(0.0, u))
        return 12.92 * u if u <= 0.0031308 else 1.055 * (u ** (1 / 2.4)) - 0.055

    return tuple(int(round(gamma(v) * 255)) for v in (r, g, bb))


def token_rgb(token: str) -> tuple[int, int, int]:
    m = re.match(r"oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)", token)
    return oklch_to_rgb(*(float(x) for x in m.groups()))


def hexify(rgb: tuple[int, int, int]) -> str:
    return "#{:02X}{:02X}{:02X}".format(*rgb)


INK = token_rgb(INK_TOKEN)
INK_DEEP = token_rgb(INK_DEEP_TOKEN)
IVORY = token_rgb(IVORY_TOKEN)
CARD = token_rgb(CARD_TOKEN)
GOLD = token_rgb(GOLD_TOKEN)
WARM = token_rgb(WARM_TOKEN)
MUTED = token_rgb(MUTED_TOKEN)
ACCENT = token_rgb(ACCENT_TOKEN)
LINE = token_rgb(LINE_TOKEN)
GOLD_SOFT = oklch_to_rgb(0.82, 0.06, 80)   # lighter gold for hairlines on ink
INK_SOFT = oklch_to_rgb(0.30, 0.012, 95)   # lifted ink for panels

print(f"[design] raqm={'yes' if HAVE_RAQM else 'no (reshaper fallback)'}")
for name, rgb in [("ink", INK), ("ink-deep", INK_DEEP), ("ivory", IVORY),
                  ("card", CARD), ("gold", GOLD), ("warm", WARM),
                  ("muted", MUTED), ("accent", ACCENT), ("line", LINE),
                  ("gold-soft", GOLD_SOFT), ("ink-soft", INK_SOFT)]:
    print(f"[design] {name:9s} {hexify(rgb)}")

# ---------------------------------------------------------------- fonts ----

if HAVE_RAQM:
    import arabic_reshaper  # noqa: F401  (unused, keep parity)
    from bidi.algorithm import get_display  # noqa: F401

    def ar(text: str) -> str:
        """Native raqm shaping — return text unchanged."""
        return text
else:
    import arabic_reshaper
    from bidi.algorithm import get_display

    _reshaper = arabic_reshaper.ArabicReshaper({"delete_harakat": False})

    def ar(text: str) -> str:
        return get_display(_reshaper.reshape(text))


_font_cache: dict[tuple, ImageFont.FreeTypeFont] = {}


def font(path: str, size: int, wght: int | None = None, axes: list[float] | None = None) -> ImageFont.FreeTypeFont:
    key = (path, size, wght, tuple(axes or []))
    if key not in _font_cache:
        f = ImageFont.truetype(os.path.join(FONT_DIR, path), size)
        try:
            if axes:
                f.set_variation_by_axes(axes)
            elif wght is not None:
                f.set_variation_by_axes([wght])
        except Exception:
            pass
        _font_cache[key] = f
    return _font_cache[key]


def serif(size: int, wght: int = 500) -> ImageFont.FreeTypeFont:
    return font("CormorantGaramond.ttf", size, wght)


def serif_italic(size: int, wght: int = 400) -> ImageFont.FreeTypeFont:
    return font("CormorantGaramond-Italic.ttf", size, wght)


def sans(size: int, wght: int = 700) -> ImageFont.FreeTypeFont:
    return font("Manrope.ttf", size, wght)


def arabic(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return font("Amiri-Bold.ttf" if bold else "Amiri-Regular.ttf", size)


def arabic_sans(size: int, wght: int = 600) -> ImageFont.FreeTypeFont:
    return font("Cairo.ttf", size, axes=[0, wght])

# ------------------------------------------------------------- drawing ----


def draw_tracked(d: ImageDraw.ImageDraw, xy: tuple[float, float], text: str,
                 f: ImageFont.FreeTypeFont, fill, tracking: float = 0.0,
                 anchor: str = "l") -> None:
    """Draw text with letter-spacing (tracking in px). Supports l/r/m anchors."""
    widths = [d.textlength(ch, font=f) for ch in text]
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x, y = xy
    if anchor[0] == "m":
        x -= total / 2
    elif anchor[0] == "r":
        x -= total
    for ch, w in zip(text, widths):
        d.text((x, y), ch, font=f, fill=fill, anchor=anchor)
        x += w + tracking


def vgradient(size: tuple[int, int], top: tuple[int, ...], bottom: tuple[int, ...]) -> Image.Image:
    """Vertical gradient image."""
    w, h = size
    base = Image.new("RGB", (1, h))
    px = base.load()
    for y in range(h):
        t = y / max(1, h - 1)
        px[0, y] = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return base.resize((w, h))


def shade_mask(size: tuple[int, int], strength: int = 235, start: float = 0.45) -> Image.Image:
    """L mask: transparent at top -> strong at bottom (for photo overlays)."""
    w, h = size
    m = Image.new("L", (1, h))
    px = m.load()
    for y in range(h):
        t = y / max(1, h - 1)
        t = max(0.0, (t - start) / (1 - start)) if start < 1 else t
        px[0, y] = int(strength * (t ** 1.6))
    return m.resize((w, h))


def full_shade(size: tuple[int, int], base_strength: int = 110) -> Image.Image:
    """Uniform + bottomCombined darkening for photo text legibility."""
    w, h = size
    m = Image.new("L", (1, h))
    px = m.load()
    for y in range(h):
        t = y / max(1, h - 1)
        v = base_strength + int((235 - base_strength) * (t ** 2))
        px[0, y] = min(255, v)
    return m.resize((w, h))


def fit_cover(src_path: str, size: tuple[int, int]) -> Image.Image:
    img = Image.open(src_path).convert("RGB")
    return ImageOps.fit(img, size, Image.Resampling.LANCZOS, centering=(0.5, 0.45))


def paste_shade(img: Image.Image, mask: Image.Image, color=INK_DEEP) -> None:
    img.paste(Image.new("RGB", img.size, color), (0, 0), mask)


def gold_rule(d: ImageDraw.ImageDraw, x0: float, y: float, x1: float, color=GOLD, width: int = 3) -> None:
    d.line([(x0, y), (x1, y)], fill=color, width=width)


def safe_logo_mark(d: ImageDraw.ImageDraw, cx: float, cy: float, r: float,
                   color=GOLD, ring_width: int | None = None) -> None:
    """Thin gold ring — used as brand device on covers/highlights."""
    w = ring_width if ring_width is not None else max(2, int(r * 0.028))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=w)
