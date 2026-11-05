"""
PLACEHOLDER image generator — run with `npm run placeholders`.

Creates labelled, correctly-sized stand-ins so the layout is production-shaped
before real photos arrive. Replace each file in public/images/ with a real photo
of the SAME filename and aspect ratio (no code changes needed):

  public/images/exterior.jpg           2000×1333  (3:2)  hero — building exterior (mint roof, walk-up window)
  public/images/dishes/<id>.jpg         900×1125  (4:5)  signature dishes marquee
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"
FONT = "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf"

SEAFOAM = (62, 125, 110)
MINT = (169, 211, 197)
RED = (211, 58, 44)
SUN = (242, 194, 48)
CHARCOAL = (46, 51, 54)
PAPER = (246, 247, 245)
PAPER_DARK = (231, 236, 233)

DISHES = [
    ("hamburger-quart-livre", "Hamburger 1/4 de livre garni"),
    ("poutine-reguliere", "Poutine reguliere"),
    ("poutine-au-poivre", "Poutine au poivre"),
    ("hot-dog-garni", "Hot dog garni"),
    ("pogo", "Pogo"),
    ("frites-maison", "Frites maison"),
]


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size)


def centered(draw: ImageDraw.ImageDraw, y: int, text: str, f, fill, width: int):
    w = draw.textlength(text, font=f)
    draw.text(((width - w) / 2, y), text, font=f, fill=fill)


def dish(slug: str, label: str):
    w, h = 900, 1125
    img = Image.new("RGB", (w, h), PAPER_DARK)
    d = ImageDraw.Draw(img)
    # Plate: soft shadow, rim, well
    shadow = Image.new("L", (w, h), 0)
    ImageDraw.Draw(shadow).ellipse((150, 260, 770, 880), fill=70)
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    img.paste((205, 198, 184), (0, 0), shadow)
    d.ellipse((140, 230, 760, 850), fill=(255, 254, 250), outline=(226, 220, 208), width=4)
    d.ellipse((230, 320, 670, 760), outline=(234, 229, 218), width=3)
    # No text inside the image — the card shows the dish name below it.
    out = IMAGES / "dishes" / f"{slug}.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "JPEG", quality=82, optimize=True, progressive=True)


def exterior():
    w, h = 2000, 1333
    img = Image.new("RGB", (w, h), (120, 170, 200))
    d = ImageDraw.Draw(img)
    # Summer sky gradient
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)], fill=(int(130 - 50 * t), int(185 - 60 * t), int(220 - 60 * t)))
    # Pavement
    d.rectangle((0, 1040, w, h), fill=(92, 96, 98))
    # Building: white siding, mint roof, red sign band
    d.rectangle((300, 560, 1700, 1050), fill=(236, 238, 234))
    d.polygon([(250, 580), (1000, 330), (1750, 580)], fill=MINT)
    d.rectangle((300, 600, 1700, 700), fill=RED)
    # Walk-up window with striped awning
    for i, x in enumerate(range(520, 1040, 40)):
        d.rectangle((x, 740, x + 40, 800), fill=MINT if i % 2 == 0 else SEAFOAM)
        d.pieslice((x, 780, x + 40, 820), 0, 180, fill=MINT if i % 2 == 0 else SEAFOAM)
    d.rectangle((540, 820, 1020, 960), fill=(60, 66, 70))
    d.rectangle((520, 960, 1040, 985), fill=SEAFOAM)  # counter
    d.rectangle((1250, 760, 1400, 1050), fill=(52, 58, 62))  # door
    # Terrace tables + yellow umbrella
    for x in (180, 1600):
        d.rectangle((x, 1000, x + 180, 1020), fill=SEAFOAM)
        d.rectangle((x + 80, 1020, x + 100, 1110), fill=SEAFOAM)
    d.polygon([(1560, 900), (1690, 820), (1820, 900)], fill=SUN)
    d.rectangle((1686, 900, 1694, 1000), fill=CHARCOAL)
    centered(d, 1210, "PLACEHOLDER - PHOTO DU CASSE-CROUTE A VENIR", font(40), PAPER, w)
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    img.save(IMAGES / "exterior.jpg", "JPEG", quality=80, optimize=True, progressive=True)


if __name__ == "__main__":
    IMAGES.mkdir(parents=True, exist_ok=True)
    exterior()
    for slug, label in DISHES:
        dish(slug, label)
    print("Placeholders written to", IMAGES)
