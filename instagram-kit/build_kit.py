"""
Build the full White Desert Horizons Instagram kit.

Outputs (all in this folder):
  avatar.png                — profile picture (1000x1000)
  cover_1500x500.jpg        — profile cover / facebook-style banner
  posts/post-1..6.png       — 1080x1080 feed posts
  stories/story-1..3.png    — 1080x1920 stories
  highlights/01..05.png     — highlight covers (1080x1920, circle-safe)
  preview.jpg               — contact sheet

Every itinerary line, title and value below is taken verbatim from
src/config/site.ts and src/components/travel/{LandingPage,ProgramPage}.tsx.
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw

from wdh_design import (
    ACCENT, CARD, GOLD, GOLD_SOFT, INK, INK_DEEP, INK_SOFT, IVORY, LINE, MUTED,
    WARM, ar, arabic, arabic_sans, fit_cover, full_shade, gold_rule, paste_shade, sans,
    serif, serif_italic, shade_mask, vgradient,
)

KIT = os.path.dirname(os.path.abspath(__file__))
POSTS = os.path.join(KIT, "posts")
STORIES = os.path.join(KIT, "stories")
HIGHLIGHTS = os.path.join(KIT, "highlights")
ASSETS = os.path.join(os.path.dirname(KIT), "src", "assets")

IMG_CAMP = os.path.join(ASSETS, "white-desert-camp.jpg")
IMG_CONTRAST = os.path.join(ASSETS, "black-white-desert.jpg")
IMG_FORMS = os.path.join(ASSETS, "white-desert-forms.jpg")
IMG_HERO = os.path.join(ASSETS, "white-desert-hero.jpg")

WHATSAPP = "+20 150 873 1922"  # from site.ts (real number)

PX = 72  # standard post padding


def draw_tracked(d, xy, text, f, fill, tracking=0.0, anchor="la"):
    """Letter-spaced text. anchor: ('l'|'m'|'r') + Pillow vertical spec."""
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


def wrap(d, text, f, max_w):
    lines, cur = [], ""
    for word in text.split():
        cand = f"{cur} {word}".strip()
        if d.textlength(cand, font=f) <= max_w or not cur:
            cur = cand
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def pill(d, cx, cy, text, f, fill, text_fill, outline=None, pad_x=34, h=64, tracking=2.0, align="center"):
    w = d.textlength(text, font=f) + pad_x * 2 + tracking * len(text)
    if align == "left":
        cx = cx + w / 2
    box = [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2]
    d.rounded_rectangle(box, radius=h / 2, fill=fill, outline=outline, width=2)
    draw_tracked(d, (cx, cy - 11), text, f, text_fill, tracking=tracking, anchor="ma")
    return w


BRAND_TEXT = "WHITE DESERT HORIZONS"


def brand_width(d) -> float:
    return d.textlength(BRAND_TEXT, font=sans(21, 760)) + 6 * len(BRAND_TEXT)


def fit_meta(d, y, text, max_w, fill):
    """Draw tracked meta text, shrinking until it fits max_w."""
    for size, tracking in [(20, 4), (19, 4), (18, 3), (17, 3), (16, 2), (15, 2)]:
        f = sans(size, 700)
        w = sum(d.textlength(c, font=f) for c in text) + tracking * (len(text) - 1)
        if w <= max_w or size == 15:
            draw_tracked(d, (PX, y), text, f, fill, tracking=tracking)
            return


# ================================================================ avatar ===

def make_avatar():
    S = 1000
    img = vgradient((S, S), INK_DEEP, INK)
    d = ImageDraw.Draw(img)
    d.ellipse([S / 2 - 396, S / 2 - 396, S / 2 + 396, S / 2 + 396], outline=GOLD_SOFT, width=2)
    d.ellipse([S / 2 - 366, S / 2 - 366, S / 2 + 366, S / 2 + 366], outline=GOLD, width=9)
    draw_tracked(d, (S / 2, 358), "WDH", serif(248, 560), IVORY, tracking=26, anchor="ma")
    gold_rule(d, S / 2 - 120, 662, S / 2 + 120, width=3)
    draw_tracked(d, (S / 2, 700), "HORIZONS", sans(52, 740), GOLD, tracking=24, anchor="ma")
    img.save(os.path.join(KIT, "avatar.png"))
    print("avatar.png")


# ================================================================== cover ==

def make_cover():
    W, H = 1500, 500
    img = fit_cover(IMG_HERO, (W, H))
    overlay = Image.new("L", (W, 1))
    for x in range(W):
        t = x / (W - 1)
        overlay.putpixel((x, 0), int(210 * (1 - t) ** 1.5) + 30)
    paste_shade(img, overlay.resize((W, H)), INK_DEEP)
    d = ImageDraw.Draw(img)
    draw_tracked(d, (88, 128), "PRIVATE JOURNEYS · WHITE DESERT · EGYPT", sans(25, 740), GOLD, tracking=8)
    d.text((86, 180), "White Desert", font=serif(118, 540), fill=IVORY)
    d.text((88, 312), "Horizons", font=serif_italic(74, 420), fill=IVORY)
    gold_rule(d, 372, 352, 372 + 150, width=3)
    draw_tracked(d, (390, 382), "BEYOND THE HORIZON", sans(25, 740), IVORY, tracking=9)
    img.save(os.path.join(KIT, "cover_1500x500.jpg"), quality=92)
    print("cover_1500x500.jpg")


# ================================================================== posts ==

def photo_post_base(number: str, kicker: str, featured: bool, image: str, caption: str):
    """Common chrome: photo top, brand footer. Returns (img, d) — content starts at y=652."""
    W = 1080
    photo_h = 600
    img = Image.new("RGB", (W, W), CARD)
    photo = fit_cover(image, (W, photo_h))
    paste_shade(photo, shade_mask((W, photo_h), strength=235, start=0.30), INK_DEEP)
    img.paste(photo, (0, 0))
    d = ImageDraw.Draw(img)
    # kicker on photo — dark scrim behind for legibility on bright skies
    kw = d.textlength(kicker, font=sans(25, 760)) + 7 * len(kicker)
    d.rounded_rectangle([PX - 22, 44, PX + kw + 30, 96], radius=26, fill=(16, 13, 8))
    draw_tracked(d, (PX, 56), kicker, sans(25, 760), GOLD, tracking=7)
    if featured:
        pill(d, W - PX - 118, 78, "SIGNATURE", sans(20, 760), GOLD, INK_DEEP, tracking=4)
    # number + caption block, vertically separated (number above, caption below)
    draw_tracked(d, (PX, photo_h - 148), number, serif(58, 480), IVORY, tracking=6)
    d.text((PX, photo_h - 52), caption, font=serif_italic(32, 420), fill=(255, 255, 255))
    # footer brand row
    gold_rule(d, PX, 986, PX + 66, width=4)
    draw_tracked(d, (W - PX, 998), "WHITE DESERT HORIZONS", sans(21, 760), GOLD, tracking=6, anchor="ra")
    return img, d


def finish_photo_post(img, d, title_en, title_ar, desc, meta):
    y = 642
    d.text((PX, y), title_en, font=serif(74, 560), fill=INK)
    y += 92
    d.text((PX, y), ar(title_ar), font=arabic(44, bold=True), fill=GOLD, anchor="ls")
    y += 62
    dd = ImageDraw.Draw(img)
    for line in wrap(dd, desc, sans(31, 520), 1080 - 2 * PX)[:3]:
        d.text((PX, y), line, font=sans(31, 520), fill=MUTED)
        y += 44
    d.line([(PX, 950), (1080 - PX, 950)], fill=(206, 196, 176), width=2)
    fit_meta(d, 998, meta, 1080 - 2 * PX - brand_width(d) - 44, MUTED)


def make_posts():
    # ---- 01 Overnight (camp photo)
    img, d = photo_post_base("01", "PROGRAM 01 · OVERNIGHT", True, IMG_CAMP,
                             "Night camp beneath the stars")
    finish_photo_post(
        img, d,
        "White Desert Overnight",
        "الصحراء البيضاء — ليلة واحدة",
        "Cross the chalk wilderness at golden hour, dine by firelight, and sleep beneath an unbroken sky.",
        "PRIVATE · 2 DAYS · 1 NIGHT · FROM CAIRO",
    )
    img.save(os.path.join(POSTS, "post-1-overnight.png"))

    # ---- 02 Expedition (contrast photo)
    img, d = photo_post_base("02", "PROGRAM 02 · EXPEDITION", False, IMG_CONTRAST,
                             "Black Desert edge")
    finish_photo_post(
        img, d,
        "Bahariya & White Desert",
        "البهارية والصحراء البيضاء — ليلتين",
        "Three days from volcanic ridges to luminous chalk — with Kahf El-Gara cave, or the Magic Spring and sandboarding.",
        "PRIVATE · 3 DAYS · 2 NIGHTS · TWO VERSIONS",
    )
    img.save(os.path.join(POSTS, "post-2-expedition.png"))

    # ---- 03 Siwa — editorial ink card (no photo)
    W = 1080
    img = vgradient((W, W), INK_DEEP, INK)
    d = ImageDraw.Draw(img)
    d.rectangle([54, 54, W - 54, W - 54], outline=GOLD_SOFT, width=2)
    draw_tracked(d, (PX, 120), "PROGRAM 03 · OASIS", sans(25, 760), GOLD, tracking=7)
    draw_tracked(d, (PX, 210), "03", serif(120, 460), GOLD, tracking=6)
    d.text((PX, 360), "Siwa Oasis", font=serif(104, 540), fill=IVORY)
    d.text((PX, 486), ar("واحة سيوة"), font=arabic(60, bold=True), fill=IVORY, anchor="ls")
    gold_rule(d, PX, 606, PX + 84, width=4)
    d.text((PX, 668), "Salt lakes, ancient temples and the Great Sand Sea —\nEgypt's far western oasis.",
           font=sans(33, 500), fill=(196, 188, 168), anchor="la")
    rows = [("Mountain of the Dead", "جبل الموتى"),
            ("Temple of Alexander & Amun", "معبد الإسكندر وآمون"),
            ("Salt lakes · Cleopatra's Spring", "بحيرات الملح · عين كليوباترا"),
            ("Great Sand Sea safari", "سفاري بحر الرمال الأعظم")]
    y = 772
    for i, (en, a) in enumerate(rows, 1):
        draw_tracked(d, (PX, y), f"0{i}", serif(36, 520), GOLD)
        d.text((PX + 76, y - 8), en, font=sans(28, 520), fill=IVORY)
        d.text((W - PX, y - 12), ar(a), font=arabic(32), fill=(219, 210, 188), anchor="rs")
        y += 60
    d.line([(PX, 950), (W - PX, 950)], fill=(70, 64, 52), width=2)
    fit_meta(d, 998, "PRIVATE · 2–3 DAYS · FROM CAIRO", 1080 - 2 * PX - brand_width(d) - 44, (168, 158, 136))
    draw_tracked(d, (W - PX, 998), "WHITE DESERT HORIZONS", sans(21, 760), GOLD, tracking=6, anchor="ra")
    img.save(os.path.join(POSTS, "post-3-siwa.png"))

    # ---- 04 Fayoum (hero photo)
    img, d = photo_post_base("04", "PROGRAM 04 · DAY SAFARI", False, IMG_HERO,
                             "Last light · desert horizon")
    finish_photo_post(
        img, d,
        "Fayoum Desert Safari",
        "الفيوم — سفاري يوم واحد",
        "A full day by 4×4: Wadi El Hitan, the Rayan waterfalls, the Enchanted Lake and a Bedouin gathering.",
        "PRIVATE · FULL DAY · CAIRO ROUND TRIP",
    )
    img.save(os.path.join(POSTS, "post-4-fayoum.png"))

    # ---- 05 Why us (forms photo) — values
    img, d = photo_post_base("WHY US", "OUR APPROACH", False, IMG_FORMS,
                             "Dawn · White Desert")
    d.text((PX, 640), "Space to travel", font=serif(84, 540), fill=INK)
    d.text((PX, 730), "differently.", font=serif_italic(84, 480), fill=INK)
    d.text((PX, 842), ar("رحلات خاصة على مقاسك — بهدوء الصحراء وكرم الضيافة المصرية."),
           font=arabic(36), fill=MUTED, anchor="ls")
    chips = ["PRIVATE & CURATED", "LOCAL EXPERTISE", "FLEXIBLE ITINERARIES", "AUTHENTIC EXPERIENCES"]
    row1 = chips[:2]
    row2 = chips[2:]
    for row, cy in [(row1, 916), (row2, 984)]:
        widths = [d.textlength(c, font=sans(19, 720)) + 3 * len(c) + 40 for c in row]
        total = sum(widths) + 20
        x = (1080 - total) / 2
        for chip, w in zip(row, widths):
            d.rounded_rectangle([x, cy - 26, x + w, cy + 26], radius=26, outline=GOLD, width=2)
            draw_tracked(d, (x + w / 2, cy - 11), chip, sans(19, 720), GOLD, tracking=3, anchor="ma")
            x += w + 20
    draw_tracked(d, (PX, 1048), "EVERY JOURNEY IS PRIVATE", sans(20, 700), MUTED, tracking=4)
    img.save(os.path.join(POSTS, "post-5-why-us.png"))

    # ---- 06 CTA (hero photo)
    img = fit_cover(IMG_HERO, (1080, 1080))
    paste_shade(img, full_shade((1080, 1080), base_strength=130), INK_DEEP)
    d = ImageDraw.Draw(img)
    draw_tracked(d, (1080 / 2, 150), "WHITE DESERT · EGYPT", sans(26, 760), GOLD, tracking=9, anchor="ma")
    d.text((1080 / 2, 235), "Plan your journey.", font=serif(108, 540), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 386), ar("خطّط رحلتك معنا"), font=arabic(58, bold=True), fill=IVORY, anchor="ma")
    gold_rule(d, 1080 / 2 - 60, 500, 1080 / 2 + 60, width=4)
    steps = [("01", "Choose your program", "اختار البرنامج"),
             ("02", "Message us on WhatsApp", "كلّمنا واتساب"),
             ("03", "We handle everything — private, door to door", "واحنا منظمين كل حاجة")]
    y = 570
    for num, en, a in steps:
        draw_tracked(d, (1080 / 2 - 430, y), num, serif(44, 520), GOLD)
        d.text((1080 / 2 - 340, y - 6), en, font=sans(30, 640), fill=IVORY)
        d.text((1080 / 2 + 430, y - 4), ar(a), font=arabic(30), fill=(219, 210, 188), anchor="rs")
        y += 84
    d.rounded_rectangle([1080 / 2 - 380, 900, 1080 / 2 + 380, 996], radius=48, fill=GOLD)
    draw_tracked(d, (1080 / 2, 930), f"WHATSAPP  {WHATSAPP}", sans(28, 760), INK_DEEP, tracking=3, anchor="ma")
    d.text((1080 / 2, 1030), "All tours are private · السعر حسب عدد الأفراد",
           font=sans(24, 560), fill=(226, 218, 198), anchor="ma")
    img.save(os.path.join(POSTS, "post-6-booking.png"))
    print("posts: 6 done")


# ================================================================ stories ==

def story_base(image: str) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    W, H = 1080, 1920
    img = fit_cover(image, (W, H))
    paste_shade(img, full_shade((W, H), base_strength=95), INK_DEEP)
    d = ImageDraw.Draw(img)
    draw_tracked(d, (W / 2, 150), "WHITE DESERT", serif(58, 540), IVORY, tracking=16, anchor="ma")
    draw_tracked(d, (W / 2, 240), "HORIZONS", sans(30, 760), GOLD, tracking=26, anchor="ma")
    d.line([(W / 2 - 60, 316), (W / 2 + 60, 316)], fill=GOLD, width=3)
    return img, d


def story_cta(d, ar_label: str = "احجز الآن"):
    W = 1080
    gold_rule(d, W / 2 - 70, 1560, W / 2 + 70, width=4)
    d.rounded_rectangle([W / 2 - 330, 1620, W / 2 + 330, 1716], radius=48, outline=GOLD, width=3)
    draw_tracked(d, (W / 2, 1650), "BOOK VIA WHATSAPP", sans(27, 760), IVORY, tracking=5, anchor="ma")
    d.text((W / 2, 1746), ar(ar_label), font=arabic(36), fill=(226, 218, 198), anchor="ma")


def make_stories():
    # S1 — Overnight
    img, d = story_base(IMG_CAMP)
    draw_tracked(d, (1080 / 2, 700), "PROGRAM 01 · 2 DAYS · 1 NIGHT", sans(26, 740), GOLD, tracking=6, anchor="ma")
    d.text((1080 / 2, 780), "White Desert", font=serif(120, 540), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 912), "Overnight", font=serif_italic(110, 440), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 1090), ar("ليلة تحت نجوم الصحراء البيضاء"), font=arabic(50), fill=(228, 220, 200), anchor="ma")
    d.text((1080 / 2, 1220), "Chalk formations · sunset · firelight", font=sans(30, 560), fill=(210, 202, 182), anchor="ma")
    story_cta(d)
    img.save(os.path.join(STORIES, "story-1-overnight.png"))

    # S2 — Expedition with versions
    img, d = story_base(IMG_CONTRAST)
    draw_tracked(d, (1080 / 2, 660), "PROGRAM 02 · 3 DAYS · 2 NIGHTS", sans(26, 740), GOLD, tracking=6, anchor="ma")
    d.text((1080 / 2, 740), "Bahariya &", font=serif(110, 540), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 866), "White Desert", font=serif(110, 540), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 1030), ar("اختار نسختك"), font=arabic(44), fill=(228, 220, 200), anchor="ma")
    for i, (v, en, a) in enumerate([
        ("A", "Kahf El-Gara cave", "كهف الجارة"),
        ("B", "Magic Spring & sandboarding", "النبع السحري والتزحلق"),
    ]):
        y = 1150 + i * 100
        d.rounded_rectangle([120, y, 960, y + 84], radius=42, outline=GOLD_SOFT, width=2)
        d.text((170, y + 10), v, font=serif(44, 520), fill=GOLD)
        d.text((240, y + 30), en, font=sans(26, 620), fill=IVORY, anchor="lm")
        d.text((900, y + 34), ar(a), font=arabic_sans(28), fill=(219, 210, 188), anchor="rm")
    story_cta(d)
    img.save(os.path.join(STORIES, "story-2-expedition.png"))

    # S3 — Booking CTA
    img, d = story_base(IMG_HERO)
    d.text((1080 / 2, 800), "Plan your", font=serif(120, 540), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 932), "journey.", font=serif_italic(116, 440), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 1110), ar("خطّط رحلتك معنا"), font=arabic(52, bold=True), fill=IVORY, anchor="ma")
    d.text((1080 / 2, 1230), f"WhatsApp {WHATSAPP}", font=sans(32, 700), fill=GOLD, anchor="ma")
    story_cta(d, "السعر حسب عدد الأفراد · كل الرحلات خاصة")
    img.save(os.path.join(STORIES, "story-3-booking.png"))
    print("stories: 3 done")


# ============================================================= highlights ==

def icon_gallery(d, cx, cy, r, color):
    d.rounded_rectangle([cx - r, cy - r * 0.75, cx + r * 0.25, cy + r * 0.55], radius=r * 0.12, outline=color, width=6)
    d.rounded_rectangle([cx - r * 0.25, cy - r * 0.55, cx + r, cy + r * 0.75], radius=r * 0.12, outline=color, width=6)


def icon_chat(d, cx, cy, r, color):
    d.rounded_rectangle([cx - r, cy - r * 0.7, cx + r, cy + r * 0.6], radius=r * 0.3, outline=color, width=6)
    d.polygon([(cx - r * 0.35, cy + r * 0.55), (cx - r * 0.05, cy + r * 0.95), (cx + r * 0.15, cy + r * 0.55)], outline=color, width=6)
    for i in (-1, 0, 1):
        d.ellipse([cx + i * r * 0.38 - 6, cy - 6, cx + i * r * 0.38 + 6, cy + 6], fill=color)


def icon_faq(d, cx, cy, r, color):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=6)
    d.text((cx, cy - r * 0.52), "?", font=serif(int(r * 1.5), 560), fill=color, anchor="ma")


def icon_star(d, cx, cy, r, color):
    import math
    pts = []
    for i in range(8):
        rad = r if i % 2 == 0 else r * 0.4
        a = math.pi / 2 + i * math.pi / 4
        pts.append((cx + rad * math.cos(a), cy - rad * math.sin(a)))
    d.polygon(pts, outline=color, width=6)


def icon_compass(d, cx, cy, r, color):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=6)
    d.polygon([(cx, cy - r * 0.55), (cx + r * 0.16, cy), (cx, cy + r * 0.55), (cx - r * 0.16, cy)], outline=color, width=5)
    for ang in (0, 90, 180, 270):
        import math
        a = math.radians(ang)
        x0, y0 = cx + r * 0.8 * math.cos(a), cy + r * 0.8 * math.sin(a)
        x1, y1 = cx + r * 1.02 * math.cos(a), cy + r * 1.02 * math.sin(a)
        d.line([(x0, y0), (x1, y1)], fill=color, width=5)


def make_highlights():
    items = [
        ("01", icon_gallery, "البرامج", "PROGRAMS"),
        ("02", icon_chat, "تواصل", "CONTACT"),
        ("03", icon_faq, "أسئلة شائعة", "FAQ"),
        ("04", icon_star, "آراء ضيوفنا", "REVIEWS"),
        ("05", icon_compass, "من نحن", "ABOUT"),
    ]
    W, H = 1080, 1920
    cy = H // 2
    for name, icon, ar_label, en_label in items:
        img = vgradient((W, H), INK_DEEP, INK)
        d = ImageDraw.Draw(img)
        d.ellipse([W / 2 - 356, cy - 356, W / 2 + 356, cy + 356], outline=GOLD, width=6)
        icon(d, W / 2, cy - 60, 118, GOLD)
        d.text((W / 2, cy + 168), ar(ar_label), font=arabic(64, bold=True), fill=IVORY, anchor="ma")
        draw_tracked(d, (W / 2, cy + 272), en_label, sans(30, 740), GOLD, tracking=10, anchor="ma")
        img.save(os.path.join(HIGHLIGHTS, f"{name}-{en_label.lower()}.png"))
    print("highlights: 5 done")


# ================================================================ preview ==

def make_preview():
    files = [
        ("avatar.png", "posts/post-1-overnight.png", "posts/post-2-expedition.png"),
        ("posts/post-3-siwa.png", "posts/post-4-fayoum.png", "posts/post-5-why-us.png"),
        ("stories/story-1-overnight.png", "stories/story-2-expedition.png", "stories/story-3-booking.png"),
    ]
    cell = 360
    pad = 16
    cols, rows = 3, 3
    W = cols * cell + (cols + 1) * pad
    H = rows * cell + (rows + 1) * pad
    board = Image.new("RGB", (W, H), (240, 236, 226))
    for r, row in enumerate(files):
        for c, f in enumerate(row):
            img = Image.open(os.path.join(KIT, f))
            side = min(img.size)
            img = img.crop(((img.width - side) // 2, (img.height - side) // 2,
                            (img.width + side) // 2, (img.height + side) // 2)).resize((cell, cell))
            board.paste(img, (pad + c * (cell + pad), pad + r * (cell + pad)))
    # cover strip
    cover = Image.open(os.path.join(KIT, "cover_1500x500.jpg")).resize((W - 2 * pad, int((W - 2 * pad) * 500 / 1500)))
    H2 = H + cover.height + pad
    board = board.crop((0, 0, W, H2))
    board.paste(cover, (pad, H))
    board.save(os.path.join(KIT, "preview.jpg"), quality=88)
    print("preview.jpg")


if __name__ == "__main__":
    os.makedirs(POSTS, exist_ok=True)
    os.makedirs(STORIES, exist_ok=True)
    os.makedirs(HIGHLIGHTS, exist_ok=True)
    make_avatar()
    make_cover()
    make_posts()
    make_stories()
    make_highlights()
    make_preview()
    print("ALL DONE")
