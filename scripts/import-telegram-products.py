"""Build lib/data/telegram-stock.ts from curated Telegram toys (add == true only)."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\Adeel\toybloom_work\curated_with_images.json")
OUT = ROOT / "lib" / "data" / "telegram-stock.ts"
DATA = ROOT / "lib" / "data"
PUBLIC = ROOT / "public"

SKIP_SLUG_FILES = {
    "categories.ts",
    "brands.ts",
    "blog.ts",
    "faqs.ts",
    "ages.ts",
    "about.ts",
    "reviews.ts",
    "telegram-stock.ts",
}

BLOCKED = ("perfume", "fragrance", "body spray", "air freshener", "eau de", "cologne")

SAFETY = (
    "Ages 3+. Adult supervision recommended. "
    "Not suitable for children under 36 months (small parts)."
)

SPELLING = [
    (r"\bhelloween\b", "Halloween"),
    (r"\bhaloween\b", "Halloween"),
    (r"\bdinasours\b", "dinosaurs"),
    (r"\bdinasour\b", "dinosaur"),
    (r"\btrynasour\b", "dinosaur"),
    (r"\bbluye\b", "Bluey"),
    (r"\bairobus\b", "airbus"),
    (r"\bharror\b", "horror"),
    (r"\bcalenders\b", "calendars"),
    (r"\bcalender\b", "calendar"),
    (r"\bsumer\b", "summer"),
    (r"\batich\b", "Stitch"),
    (r"\bstich\b", "Stitch"),
    (r"\bstick\b", "Stitch"),
    (r"\bpokemon\b", "Pokémon"),
    (r"\bpokémon\b", "Pokémon"),
    (r"(\d+)\s*pics\b", r"\1 pieces"),
    (r"(\d+)pics\b", r"\1 pieces"),
    (r"(\d+)\s*pic\b", r"\1 piece"),
    (r"(\d+)pic\b", r"\1 piece"),
    (r"\bpics\b", "pieces"),
    (r"\bpic\b", "piece"),
    (r"\bpices\b", "pieces"),
    (r"\bpis\b", "pieces"),
]

ACRONYMS = {
    "LED",
    "USB",
    "FIFA",
    "BMW",
    "RC",
    "XXL",
    "XL",
    "DIY",
    "TV",
    "HD",
    "UK",
    "USA",
    "3D",
    "4D",
    "2D",
}
SMALL = {"a", "an", "the", "and", "or", "of", "for", "with", "in", "on", "to", "vs", "per"}
EMOJI_RE = re.compile(
    "["
    "\U0001F1E0-\U0001F1FF"
    "\U0001F300-\U0001FAFF"
    "\U00002600-\U000027BF"
    "\U0001F900-\U0001F9FF"
    "\uFE0F"
    "\u200D"
    "]+",
    flags=re.UNICODE,
)


def fix_spelling(value: str) -> str:
    text = EMOJI_RE.sub("", value)
    for pattern, repl in SPELLING:
        text = re.sub(pattern, repl, text, flags=re.IGNORECASE)
    text = text.replace("–", "-").replace("—", "-")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def title_word(word: str, is_first: bool) -> str:
    if not word:
        return word
    match = re.match(r"^(\W*)(.*?)(\W*)$", word)
    if match and match.group(2) and match.group(2) != word:
        return f"{match.group(1)}{title_word(match.group(2), is_first)}{match.group(3)}"
    if word.upper() == "K-POP" or word.lower() == "k-pop":
        return "K-Pop"
    if word.upper() in ACRONYMS:
        return word.upper()
    if re.fullmatch(r"\d+(cm|mm|oz|ml|pcs|pc|in)", word, flags=re.IGNORECASE):
        return word.lower()
    if re.fullmatch(r"\d+\"", word):
        return word
    if "-" in word:
        parts = [title_word(part, True) for part in word.split("-")]
        return "-".join(parts)
    if re.search(r"\d", word) and re.search(r"[A-Za-z]", word) and len(word) <= 10:
        return word.upper()
    lower = word.lower()
    if lower in {"pokemon", "pokémon"}:
        return "Pokémon"
    if not is_first and lower in SMALL:
        return lower
    return lower[:1].upper() + lower[1:]


def title_case(value: str) -> str:
    bits = re.split(r"(\s+)", value.strip())
    seen = False
    out = []
    for bit in bits:
        if bit.isspace() or bit == "":
            out.append(bit)
            continue
        out.append(title_word(bit, not seen))
        seen = True
    return "".join(out).strip()


def tidy_name(name: str) -> str:
    text = fix_spelling(name)
    text = re.sub(r"\s+,", ",", text)
    text = re.sub(r"^(all new|new|all)\s+", "", text, flags=re.IGNORECASE)
    text = re.sub(r"£\s*\d[\d.,]*", "", text)
    text = re.sub(r"\b\d+[.,]\d{2}p?\b", "", text)
    text = re.sub(r"\s+", " ", text).strip(" -/,")
    tidied = title_case(text)
    return tidied or title_case(fix_spelling(name))


def clean_clause(line: str) -> str:
    line = fix_spelling(line)
    line = re.sub(r"£\s*\d[\d.,]*", "", line)
    line = re.sub(r"\b\d+[.,]\d{2}\s*p?\b", "", line)
    line = re.sub(r"\s*@+\s*", " ", line)
    line = re.sub(r"\s+\bat\s*$", "", line, flags=re.IGNORECASE)
    line = re.sub(r"\s+", " ", line).strip(" .,-/|*")
    if len(line) < 3:
        return ""
    if re.fullmatch(
        r"(available now|in stock now|back in stock( now)?|new|or|just|price|dm.*|note batteries.*|only box selling|selling just box.*|hot sellers?.*)",
        line,
        flags=re.IGNORECASE,
    ):
        return ""
    return line[0].upper() + line[1:]


def copy_from_text(text: str, name: str) -> tuple[str, str]:
    raw = text or ""
    raw = re.sub(r"stoc\s*/\s*k\b", "stock", raw, flags=re.IGNORECASE)
    chunks = re.split(r"[\n]+|(?:\s+/\s+)", raw)
    clauses: list[str] = []
    seen: set[str] = set()
    for chunk in chunks:
        clause = clean_clause(chunk)
        key = clause.lower()
        if not clause or key in seen:
            continue
        seen.add(key)
        clauses.append(clause)
    if not clauses:
        clauses = [name]
    description = ". ".join(clause.rstrip(".") for clause in clauses) + "."
    description = re.sub(r"\s+", " ", description).strip()
    short = description
    if len(short) > 170:
        short = short[:167].rsplit(" ", 1)[0].rstrip(".,; ") + "."
    return short, description


def money(value: float) -> str:
    return f"£{value:.2f}"


def features_for(price: float | None, min_qty: int, notes: list[str]) -> list[str]:
    if price is None:
        rows = [f"Minimum order: {min_qty} pcs", "Price on request"]
    else:
        rows = [f"Minimum order: {min_qty} pcs, {money(price)} each"]
    for note in notes:
        cleaned = fix_spelling(note).strip()
        if not cleaned or cleaned.lower() == "price tbc":
            continue
        cleaned = cleaned[0].upper() + cleaned[1:]
        if cleaned not in rows:
            rows.append(cleaned)
    return rows


def age_range(name: str, text: str) -> str:
    blob = f"{name} {text}".lower()
    if re.search(r"age\s*1\s*[-–to]+\s*3|ages?\s*0\b|toddler", blob):
        return "0-2 years"
    if re.search(r"ages?\s*13|13\+", blob):
        return "13+ years"
    if re.search(r"ages?\s*9\b|9-12|9\+", blob):
        return "9-12 years"
    if re.search(r"ages?\s*6\b|6-8|8\+", blob):
        return "6-8 years"
    return "3-5 years"


def category_for(blob: str, allowed: set[str]) -> str:
    b = fix_spelling(blob).lower()

    def has(*parts: str) -> bool:
        return any(part in b for part in parts)

    def word(*words: str) -> bool:
        return any(re.search(rf"\b{re.escape(item)}\b", b) for item in words)

    slug = "others"
    if word("fan", "fans"):
        slug = "handheld-fans"
    elif has("fidget spinner"):
        slug = "fidget-spinners"
    elif word("keyring", "keyrings", "keychain", "keychains"):
        if has("soft toy", "plush toy"):
            slug = "dolls-plush"
        elif has("plush"):
            slug = "pocket-critter-keyrings"
        else:
            slug = "novelty-keyrings"
    elif has("bubble"):
        slug = "bubble-blowers"
    elif word("slime", "slimes"):
        slug = "sensory-jars"
    elif has("dumpling"):
        slug = "festive-dumplings"
    elif has("vaseline") or word("cheese"):
        slug = "cheese-squishies"
    elif has("halloween") and has("squish"):
        slug = "halloween-squishies"
    elif has("squish", "needoh", "smusher", "squeeze", "puffer"):
        if has("strawberry", "peach", "cherry", "pineapple", "fruit"):
            slug = "fruit-squishies"
        elif has("butter"):
            slug = "sensory-jars"
        else:
            slug = "food-squishies"
    elif word("sword", "swords"):
        slug = "glow-swords"
    elif word("glasses"):
        slug = "light-up-glasses"
    elif word("hat", "hats"):
        if has("halloween"):
            slug = "halloween-hats"
        elif has("light"):
            slug = "light-up-hats"
        else:
            slug = "kids-hats"
    elif has(
        "cushion",
        "blanket",
        "bedding",
        "towel",
        "picture frame",
        "3d frame",
        "3d picture",
        "air horn",
        "phone",
        "laptop",
        "lunch box",
        "stationery",
        "pencil",
        "bracelet",
    ):
        slug = "arts-crafts" if has("pencil", "gel pen", "tattoo", "sticker", "stationery") else "others"
    elif has("sticker", "gel pen", "tattoo"):
        slug = "arts-crafts"
    elif word("bag", "bags", "purse", "purses", "backpack", "trolley"):
        slug = "monster-buddy-bags"
    elif word("charm", "charms"):
        slug = "novelty-keyrings"
    elif word("card", "cards"):
        slug = "board-games"
    elif has("advent", "calendar"):
        slug = "christmas-surprise"
    elif word("cup", "cups", "bottle", "bottles"):
        slug = "star-buddy-cups"
    elif has(
        "doll",
        "plush",
        "teddy",
        "labubu",
        "stitch",
        "bluey",
        "barbie",
        "panda",
        "capybara",
        "jellycat",
        "jelly cat",
        "soft toy",
        "kuromi",
        "bingo",
        "cry baby",
        "princess",
        "wakuku",
    ):
        slug = "dolls-plush"
    elif word("block", "blocks") or has(" track"):
        slug = "building-sets"
    elif has("kitchen", "make up", "makeup", "salon", "castle", "beauty", "steering", "guitar"):
        slug = "role-play"
    elif has("remote", "aircraft", "airbus", "stunt"):
        slug = "games-gadgets"
    elif word("car", "cars", "truck", "trucks") or has("mercedes", "bmw", "range rover", "transformer"):
        slug = "games-gadgets"
    elif has("basketball game", "football game", "soccer game", "water game"):
        slug = "board-games"
    elif word("ball", "balls") or has("football"):
        slug = "play-balls"
    elif has("bike", "skateboard", "dart", "gel gun", "gel blaster", "blaster", "bullet", "bow and arrow"):
        slug = "outdoor-sports"
    elif has("christmas", "santa", "grinch"):
        slug = "christmas-glow" if has("light", "led", "lantern", "train") else "christmas-surprise"
    elif has("halloween", "skull", "joker", "pumpkin"):
        slug = "funky-frights"
    elif has("light up", "light-up", " led", "lantern", "neon", "glow"):
        slug = "light-up-toys"
    elif has("figure", "figur", "avengers", "spider", "godzilla", "minecraft", "k-pop", "k pop", "surprise"):
        slug = "action-figures"
    elif has("dragon", "dinosaur"):
        slug = "action-figures"
    elif has("piano"):
        slug = "educational-stem"
    return slug if slug in allowed else "others"


def theme_for(name: str, category: str) -> str:
    blob = name.lower()
    pairs = [
        ("christmas", "Christmas"),
        ("halloween", "Halloween"),
        ("labubu", "Labubu"),
        ("stitch", "Stitch"),
        ("bluey", "Bluey"),
        ("squish", "Squishy"),
        ("dinosaur", "Dinosaur"),
        ("dragon", "Dragon"),
        ("k-pop", "K-Pop"),
        ("football", "Football"),
        ("slime", "Sensory"),
        ("bubble", "Bubbles"),
        ("plush", "Plush"),
        ("doll", "Dolls"),
        ("car", "Vehicles"),
        ("light", "Lights"),
        ("keyring", "Keyrings"),
    ]
    for needle, theme in pairs:
        if re.search(rf"\b{re.escape(needle)}\b", blob):
            return theme
    fallback = {
        "dolls-plush": "Plush",
        "food-squishies": "Squishy",
        "festive-dumplings": "Squishy",
        "sensory-jars": "Sensory",
        "cheese-squishies": "Squishy",
        "fruit-squishies": "Squishy",
        "action-figures": "Characters",
        "games-gadgets": "Vehicles",
        "outdoor-sports": "Outdoor",
        "play-balls": "Outdoor",
        "board-games": "Games",
        "role-play": "Pretend Play",
        "building-sets": "Building",
        "light-up-toys": "Lights",
        "christmas-glow": "Christmas",
        "christmas-surprise": "Christmas",
        "monster-buddy-bags": "Bags",
        "novelty-keyrings": "Keyrings",
        "handheld-fans": "Fans",
        "arts-crafts": "Crafts",
        "educational-stem": "Learning",
        "bubble-blowers": "Bubbles",
        "glow-swords": "Lights",
        "others": "Mixed",
    }
    return fallback.get(category, "Play")


def existing_slugs() -> set[str]:
    found: set[str] = set()
    for path in DATA.glob("*.ts"):
        if path.name in SKIP_SLUG_FILES:
            continue
        found.update(re.findall(r'slug:\s*"([^"]+)"', path.read_text(encoding="utf-8")))
    return found


def category_slugs() -> set[str]:
    text = (DATA / "categories.ts").read_text(encoding="utf-8")
    return set(re.findall(r'slug:\s*"([^"]+)"', text))


def blocked(item: dict) -> bool:
    blob = " ".join(
        [item.get("name") or "", item.get("text") or "", " ".join(item.get("notes") or [])]
    ).lower()
    return any(word in blob for word in BLOCKED)


def main() -> int:
    payload = json.loads(SOURCE.read_text(encoding="utf-8"))
    if "perfumes" in payload:
        pass
    toys = payload["toys"]
    allowed = category_slugs()
    taken = existing_slugs()
    products = []
    skipped = []
    missing_images = []
    renamed = []
    for item in toys:
        if not item.get("add"):
            continue
        if blocked(item):
            skipped.append(item.get("slug"))
            continue
        slug = item["slug"]
        if slug in taken:
            base = slug
            n = 2
            while slug in taken:
                slug = f"{base}-{n}"
                n += 1
            renamed.append((base, slug))
        taken.add(slug)
        price = item.get("unit_price")
        min_qty = int(item.get("min_qty") or 1)
        notes = [str(note) for note in (item.get("notes") or [])]
        name = tidy_name(item.get("name") or slug)
        text = item.get("text") or ""
        short, description = copy_from_text(text, name)
        images = [str(src) for src in (item.get("images") or [])]
        for src in images:
            if not (PUBLIC / src.lstrip("/")).exists():
                missing_images.append(src)
        category = category_for(f"{name} {text} {' '.join(notes)}", allowed)
        product = {
            "slug": slug,
            "name": name,
            "price": 0 if price is None else price,
            "rating": 4.6,
            "reviewCount": 12,
            "ageRange": age_range(name, text),
            "brand": "Toy Bloom Wholesale",
            "theme": theme_for(name, category),
            "categorySlug": category,
            "images": images,
            "shortDescription": short,
            "description": description,
            "features": features_for(None if price is None else float(price), min_qty, notes),
            "safety": SAFETY,
            "materials": "See packaging.",
            "isNew": True,
            "piecesPerBox": min_qty,
            "stock": 50,
        }
        if price is None:
            product["priceTBC"] = True
        products.append(product)

    body = json.dumps(products, ensure_ascii=False, indent=2)
    OUT.write_text(
        "import type { Product } from \"@/lib/types\";\n\n"
        "/** Generated by scripts/import-telegram-products.py. Do not edit by hand. */\n"
        f"export const telegramStock: Product[] = {body};\n",
        encoding="utf-8",
    )
    from collections import Counter

    counts = Counter(product["categorySlug"] for product in products)
    tbc = [product["name"] for product in products if product.get("priceTBC")]
    print(f"wrote {len(products)} products -> {OUT}")
    print("skipped perfume-like", skipped)
    print("renamed", renamed)
    print("missing images", len(missing_images))
    print("price on request", len(tbc))
    for name in tbc:
        print(" TBC", name)
    for slug, count in counts.most_common():
        print(f"  {count:3} {slug}")
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    raise SystemExit(main())
