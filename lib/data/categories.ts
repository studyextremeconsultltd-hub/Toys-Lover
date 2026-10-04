import type { AgeRange, Category } from "@/lib/types";
import { categoryImage } from "@/lib/media";

export const categories: Category[] = [
  {
    slug: "educational-stem",
    name: "Educational & STEM Toys",
    shortName: "Educational & STEM",
    description: "Curiosity kits that make science, math, and engineering feel like play.",
    longDescription:
      "Hands-on STEM toys designed to build problem-solving skills without feeling like homework. From foam numbers and binoculars to maker kits, every pick is age-checked and classroom-friendly.",
    image: categoryImage["educational-stem"],
    accent: "sky",
    ageLabel: "Ages 6–12",
  },
  {
    slug: "action-figures",
    name: "Action Figures & Playsets",
    shortName: "Action Figures",
    description: "Heroes, worlds, and stories kids can hold in their hands.",
    longDescription:
      "Collectible figures and immersive playsets that invite storytelling, teamwork, and hours of imaginative missions — with sturdy parts built for real play, not just the shelf.",
    image: categoryImage["action-figures"],
    accent: "coral",
    ageLabel: "Ages 4–10",
  },
  {
    slug: "dolls-plush",
    name: "Dolls & Plush Toys",
    shortName: "Dolls & Plush",
    description: "Soft companions and dolls that comfort, cuddle, and care.",
    longDescription:
      "Huggable friends and dolls that help children practice empathy, bedtime routines, and gentle play. We favor hypoallergenic fills and securely stitched details.",
    image: categoryImage["dolls-plush"],
    accent: "coral",
    ageLabel: "Ages 0–8",
  },
  {
    slug: "building-sets",
    name: "Building Sets & Blocks",
    shortName: "Building Sets",
    description: "Blocks and kits that turn ideas into towers, towns, and inventions.",
    longDescription:
      "From first wooden blocks to advanced building systems, these sets grow with your child and reward patience, spatial thinking, and proud “I made this” moments.",
    image: categoryImage["building-sets"],
    accent: "sun",
    ageLabel: "Ages 2–12",
  },
  {
    slug: "board-games",
    name: "Board Games & Puzzles",
    shortName: "Board Games",
    description: "Family nights, quiet focus, and screen-free wins around the table.",
    longDescription:
      "Cooperative and classic games plus puzzles that stretch attention spans. We highlight clear age guidance so everyone at the table can actually enjoy the round.",
    image: categoryImage["board-games"],
    accent: "mint",
    ageLabel: "Ages 4–12",
  },
  {
    slug: "arts-crafts",
    name: "Arts & Crafts",
    shortName: "Arts & Crafts",
    description: "Squishies, kits, and mess-smart making — fruit fidgets sit with the craft table.",
    longDescription:
      "Our squishy fruit fidgets live here with washable art kits: peaches, strawberries, toast, and slow-rise squeezes next to beads and vanity sets. One toy per card so the squeeze is easy to see.",
    image: categoryImage.squishies,
    accent: "sun",
    ageLabel: "Ages 3–10",
  },
  {
    slug: "outdoor-sports",
    name: "Outdoor & Sports Toys",
    shortName: "Outdoor & Sports",
    description: "Get-outside gear for backyards, parks, and sunny weekends.",
    longDescription:
      "Balls, ride-ons, and backyard games that burn energy and build coordination. Chosen for durability and weather-friendly materials parents can trust.",
    image: categoryImage["outdoor-sports"],
    accent: "mint",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "baby-toddler",
    name: "Baby & Toddler Toys",
    shortName: "Baby & Toddler",
    description: "First toys that soothe, stimulate, and stay safely simple.",
    longDescription:
      "Sensory-first toys for tiny hands: chew-safe, easy to clean, and sized to reduce choking risk. We keep labels honest so new parents can shop with calm.",
    image: categoryImage["baby-toddler"],
    accent: "sky",
    ageLabel: "Ages 0–2",
  },
  {
    slug: "role-play",
    name: "Role Play & Pretend Play",
    shortName: "Role Play",
    description: "Kitchens, costumes, and little worlds that grow big imaginations.",
    longDescription:
      "Pretend-play sets that help kids try on grown-up roles — chef, doctor, shopkeeper — and practice language, sharing, and confidence along the way.",
    image: categoryImage["role-play"],
    accent: "coral",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "games-gadgets",
    name: "Games & Gadgets for Older Kids",
    shortName: "Older Kids",
    description: "RC racers, butter-brick fidgets, jelly bears, and desk gadgets.",
    longDescription:
      "Older-kid play: 2.4 GHz trucks plus the viral butter bricks, rainbow squeezes, jelly bears, and jumbo pencil fidgets. Fun enough for hangouts, clear enough that parents still say yes.",
    image: categoryImage["games-gadgets"],
    accent: "sky",
    ageLabel: "Ages 9–13+",
  },
  {
    slug: "bubble-blowers",
    name: "Bubble Cameras & Blowers",
    shortName: "Bubble Blowers",
    description: "Animal cameras and octopus blowers that send bubbles across the garden.",
    longDescription:
      "Chick, frog, panda, and bunny bubble cameras plus pink and green octopus blowers. Each listing uses the photo from the new tray, centred so the face of the toy is easy to see.",
    image: categoryImage["bubble-blowers"],
    accent: "sky",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "christmas-surprise",
    name: "Christmas Surprise Figures",
    shortName: "Surprise Figures",
    description: "Festive blind bags with a row of Christmas mini figures in front of the box.",
    longDescription:
      "Red Christmas surprise bags from the new delivery. The photo shows the figures you can find — elephant, frog, cactus, cup, monkey, and bat pal — so the aisle is clear before you tap a bag.",
    image: categoryImage["christmas-surprise"],
    accent: "coral",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "ear-buddy-plush",
    name: "Ear Buddy Plush",
    shortName: "Ear Buddy Plush",
    description: "Soft long-ear plushes in blue and pink — including a tummy-glow buddy.",
    longDescription:
      "Hug-size long-ear plushes photographed on a studio cloth. Blue, pink, and a glowing tummy version — named from the photo, not a wholesale pack label.",
    image: categoryImage["ear-buddy-plush"],
    accent: "sky",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "party-flags",
    name: "Party Flags",
    shortName: "Party Flags",
    description: "England St George and Union Jack flags from the new flag pack.",
    longDescription:
      "Two flags, two photos: the red Cross of St George and the full Union Jack, laid flat so the colours read clearly on every screen.",
    image: categoryImage["party-flags"],
    accent: "coral",
    ageLabel: "Ages 9–12",
  },
  {
    slug: "party-spotlight",
    name: "Party Spotlight",
    shortName: "Party Spotlight",
    description: "Flop hats, glow wands, figure packs, and party masks from the premium tray.",
    longDescription:
      "Flop-ear hats, neon wands, pocket figures, and dress-up masks from the new delivery. Every card keeps the photo that belongs to that toy.",
    image: categoryImage["party-spotlight"],
    accent: "sun",
    ageLabel: "Ages 6–12",
  },
  {
    slug: "kids-hats",
    name: "Kids Bucket Hats",
    shortName: "Kids Hats",
    description: "Sports-print bucket hats in candy, cool, mixed, and red colourways.",
    longDescription:
      "Lightweight bucket hats from the hats tray, grouped by colour so you can pick pink and mint, blue and mono, the mixed pile, or the red pair.",
    image: categoryImage["kids-hats"],
    accent: "mint",
    ageLabel: "Ages 9–12",
  },
  {
    slug: "novelty-keyrings",
    name: "Novelty Keyrings",
    shortName: "Novelty Keyrings",
    description: "Mini sneakers, speed crew, heroes, and cartoon charms on wrist straps.",
    longDescription:
      "Bag charms from the keyring tray, named by what is in the photo: sneakers, speed crew, alien ears, cartoon pals, hedgehog duo, yellow duo, heroes, and coffee bears.",
    image: categoryImage["novelty-keyrings"],
    accent: "coral",
    ageLabel: "Ages 6–13+",
  },
  {
    slug: "light-up-toys",
    name: "Light-Up Toys",
    shortName: "Light-Up Toys",
    description: "Christmas lanterns, snowmen, heart wands, and fibre glow sticks.",
    longDescription:
      "The light-up tray covers festive lanterns and party wands. Each photo is squared and centred so the glow — or the lace heart — is the first thing you see.",
    image: categoryImage["light-up-toys"],
    accent: "sun",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "articulated-keyrings",
    name: "3D Articulated Keyrings",
    shortName: "3D Keyrings",
    description: "Jointed rainbow sphynx cats and a teal lizard on gold clips.",
    longDescription:
      "Poseable 3D-printed charms from the new cat keyring pack. Rainbow sphynx sets, a sunset single, and the teal jointed lizard that arrived in the same tray.",
    image: categoryImage["articulated-keyrings"],
    accent: "mint",
    ageLabel: "Ages 13+",
  },
  {
    slug: "handheld-fans",
    name: "Handheld Fans",
    shortName: "Handheld Fans",
    description: "Pocket fans, desk fans, and mist spray fans for warm days.",
    longDescription:
      "Navy, lilac, mint, sage, chrome spray, and purple spray — each fan sits next to its box in the photo so you can tell a pocket fan from a mister.",
    image: categoryImage["handheld-fans"],
    accent: "sky",
    ageLabel: "Ages 9–12",
  },
  {
    slug: "bottle-plush",
    name: "Sports Bottle Plush",
    shortName: "Bottle Plush",
    description: "Bottle-shaped plushes in pink, lime, purple, white, and stripe.",
    longDescription:
      "Soft bottle pals from the plush tray, shown as a colour set so every shade is easy to pick out on a phone screen.",
    image: categoryImage["bottle-plush"],
    accent: "coral",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "christmas-glow",
    name: "Christmas Glow Decor",
    shortName: "Christmas Glow",
    description: "Santa snow train and matching glow lanterns for a window sill.",
    longDescription:
      "The promotion tray: a bronze Santa snow train and a pair of lit lanterns. Warm LEDs, snow scenes, photographed so the carriage and the lantern glass are clear.",
    image: categoryImage["christmas-glow"],
    accent: "coral",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "glitter-squeeze",
    name: "Glitter Squeeze Toys",
    shortName: "Glitter Squeeze",
    description: "Unicorns, axolotls, ducks, fruit, and glitter blobs from the squeeze boxes.",
    longDescription:
      "The putty-and-squeeze tray, listed one style at a time: glitter unicorns, happy ducks, stretching puppies, crystal fruit, grape clusters, and more — each with its own centred photo.",
    image: categoryImage["glitter-squeeze"],
    accent: "mint",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "glow-wands",
    name: "Glow Spinner Wands",
    shortName: "Glow Wands",
    description: "Princess electric glow sticks, character wands, and rainbow heart fibres.",
    longDescription:
      "Light-and-music spinner wands from the 20-piece tray. Princess ring sticks, character tops, and a bunch of rainbow heart fibres — named from the photo on the card.",
    image: categoryImage["glow-wands"],
    accent: "sun",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "play-balls",
    name: "Character Play Balls",
    shortName: "Play Balls",
    description: "Inflatable garden balls with cartoon faces in five bright colours.",
    longDescription:
      "Yellow, green, pink, blue, and red play balls from the 24-pack, photographed together so the faces stay sharp and easy to recognise.",
    image: categoryImage["play-balls"],
    accent: "sun",
    ageLabel: "Ages 3–5",
  },
  {
    slug: "halloween-squishies",
    name: "Halloween Butter Squishies",
    shortName: "Halloween Squish",
    description: "Slow-rise butter bricks in pumpkin, bat, and trick-or-treat wraps.",
    longDescription:
      "Halloween butter squishies from the 12-pack. The photo shows the brick in hand against the counter box so the wrap art is readable.",
    image: categoryImage["halloween-squishies"],
    accent: "sun",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "fidget-spinners",
    name: "Hero Fidget Spinners",
    shortName: "Fidget Spinners",
    description: "Metal hero-face spinners — shields, webs, armour, and lightning.",
    longDescription:
      "The 12-pack spinner range, shown as a colour chart so you can see shield, web, armour, and lightning faces before you pick one for a desk.",
    image: categoryImage["fidget-spinners"],
    accent: "sky",
    ageLabel: "Ages 13+",
  },
  {
    slug: "monster-buddy-bags",
    name: "Monster Buddy Bags",
    shortName: "Buddy Bags",
    description: "Plush monster-buddy bags in big, large, medium, and small — each with its own photo and UK price.",
    longDescription:
      "The new bag tray: roomy £11.50 big bags, large and standard pouches at £4.50, medium at £3.50, and small first zip bags at £2.50. One centred photo per listing.",
    image: categoryImage["monster-buddy-bags"],
    accent: "coral",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "hatch-dragons",
    name: "Hatch Dragon Eggs",
    shortName: "Hatch Dragons",
    description: "3D hatch eggs with a mini dragon inside — £2.50 from the new tray.",
    longDescription:
      "Pocket surprise eggs photographed from the new delivery. Crack the egg, find the dragon, keep the shell for the next play.",
    image: categoryImage["hatch-dragons"],
    accent: "sun",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "fashion-play-sets",
    name: "Fashion Play Sets",
    shortName: "Fashion Sets",
    description: "Pocket fashion play sets at £2.50 — bright dresser-drawer dress-up.",
    longDescription:
      "The new fashion tray, listed one set at a time so the colours stay sharp and easy to pick.",
    image: categoryImage["fashion-play-sets"],
    accent: "coral",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "monster-buddy-keyrings",
    name: "Monster Buddy Keyrings",
    shortName: "Buddy Keyrings",
    description: "Soft monster-buddy charms at 90p — bag clips from the new tray.",
    longDescription:
      "Pocket-money charms photographed one at a time. Soft faces, metal rings, ready for a school bag.",
    image: categoryImage["monster-buddy-keyrings"],
    accent: "mint",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "light-up-hats",
    name: "Light-Up Party Hats",
    shortName: "Light-Up Hats",
    description: "LED party hats at £2.50 — brim lights for photos and play.",
    longDescription:
      "The new hat tray. Each listing uses a centred photo so you can see the glow style before you pick.",
    image: categoryImage["light-up-hats"],
    accent: "sun",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "metal-keyrings",
    name: "Metal Charm Keyrings",
    shortName: "Metal Keyrings",
    description: "Solid metal charm clips at £1.25 — desk and bag ready.",
    longDescription:
      "Alloy charms from the new metal tray. One photo per listing so the finish is easy to see.",
    image: categoryImage["metal-keyrings"],
    accent: "sky",
    ageLabel: "Ages 9–12",
  },
  {
    slug: "mini-shoulder-bags",
    name: "Mini Shoulder Bags",
    shortName: "Mini Bags",
    description: "Mini cross-body bags at £1.75 from the 12-in-bag pack.",
    longDescription:
      "A first shoulder bag for days out. Photographed from the new pack so the print stays readable.",
    image: categoryImage["mini-shoulder-bags"],
    accent: "coral",
    ageLabel: "Ages 9–12",
  },
  {
    slug: "pocket-critter-keyrings",
    name: "Pocket Critter Keyrings",
    shortName: "Critter Keyrings",
    description: "Soft plush critter charms at £1.25 — hug-size bag clips.",
    longDescription:
      "Plush pocket critters from the new tray. Soft pile, metal ring, one photo per charm.",
    image: categoryImage["pocket-critter-keyrings"],
    accent: "mint",
    ageLabel: "Ages 3–5",
  },
  {
    slug: "push-pop-games",
    name: "Push Pop Games",
    shortName: "Push Pop",
    description: "Handheld push-pop speed games at £2.50 — lights, no extra screen.",
    longDescription:
      "The new push-game tray. Handheld bubbles and lights, photographed so the face of the console is clear.",
    image: categoryImage["push-pop-games"],
    accent: "sky",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "star-buddy-cups",
    name: "Star Buddy Cups",
    shortName: "Buddy Cups",
    description: "Character snack-time cups at £3.00 from the new tray.",
    longDescription:
      "Colourful character cups listed one at a time. A sipper for snack time, photographed on a clean frame.",
    image: categoryImage["star-buddy-cups"],
    accent: "sun",
    ageLabel: "Ages 3–5",
  },
  {
    slug: "star-buddy-plush",
    name: "Star Buddy Plush",
    shortName: "Buddy Plush",
    description: "Soft star-buddy plushes at £3.50 — hug-size friends from the new delivery.",
    longDescription:
      "Stitched-face plushes photographed one by one so you can see the colour and size before you pick.",
    image: categoryImage["star-buddy-plush"],
    accent: "coral",
    ageLabel: "Ages 3–5",
  },
  {
    slug: "crunchy-squishies",
    name: "Crunchy Squishies",
    shortName: "Crunchy Squish",
    description: "Pocket crunchy squishies at £2.50 — crackly fill fidgets from the extra tray.",
    longDescription:
      "Slow-rise crunchy squishies photographed one at a time on white. Crackly fill, pocket size, till-point pick.",
    image: categoryImage["crunchy-squishies"],
    accent: "mint",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "funky-frights",
    name: "Funky Frights",
    shortName: "Funky Frights",
    description: "Neon Halloween squeeze sets at £7.50 — ghosts, pumpkins, and party glow.",
    longDescription:
      "The extra Halloween mix tray. Each set is listed with a centred white-frame photo so the colours stay sharp.",
    image: categoryImage["funky-frights"],
    accent: "sun",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "festive-dumplings",
    name: "Festive Dumpling Squeezes",
    shortName: "Festive Dumplings",
    description: "Festive dumpling squeezes from £1.75 — slow-rise holiday fidgets.",
    longDescription:
      "Standard and mini festive dumpling squeezes from the extra tray. Slow-rise foam in printed holiday wrap.",
    image: categoryImage["festive-dumplings"],
    accent: "coral",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "halloween-hats",
    name: "Halloween Party Hats",
    shortName: "Halloween Hats",
    description: "Halloween dress-up hats at £2.50 from the extra pack.",
    longDescription:
      "Party hats for trick-or-treat photos. One centred listing so the print is easy to see before you pick.",
    image: categoryImage["halloween-hats"],
    accent: "sun",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "light-up-glasses",
    name: "Light-Up Shutter Glasses",
    shortName: "Glow Glasses",
    description: "LED shutter glasses at £2.50 — party colours for night play.",
    longDescription:
      "Light-up shutter glasses from the extra tray. Photographed on white so the LED frame stays clear.",
    image: categoryImage["light-up-glasses"],
    accent: "sky",
    ageLabel: "Ages 9–12",
  },
  {
    slug: "light-up-gloves",
    name: "Light-Up Party Gloves",
    shortName: "Glow Gloves",
    description: "LED fingertip gloves at £2.50 — night-play party pairs.",
    longDescription:
      "Knit party gloves with glowing tips from the extra pack. Batteries as labelled on the card.",
    image: categoryImage["light-up-gloves"],
    accent: "mint",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "cheese-squishies",
    name: "Cheese Brick Squishies",
    shortName: "Cheese Squish",
    description: "Mini £2.50 and jumbo £4.75 cheese brick squishies from the extra pack.",
    longDescription:
      "5 cm mini and 7 cm jumbo cheese bricks. Slow-rise PU foam, white-frame photos, desk and gift-bag ready.",
    image: categoryImage["cheese-squishies"],
    accent: "sun",
    ageLabel: "Ages 6–8",
  },
  {
    slug: "glow-swords",
    name: "Pixel Glow Swords",
    shortName: "Glow Swords",
    description: "Pixel glow play swords at £2.75 — batteries included as labelled.",
    longDescription:
      "Light-up pixel swords from the extra tray. Each listing uses a centred white photo so the glow style is easy to pick.",
    image: categoryImage["glow-swords"],
    accent: "sky",
    ageLabel: "Ages 6–8",
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export const CATEGORY_AGE_GROUPS = [
  { id: "0-2", label: "Ages 0–2", slugs: ["baby-toddler"] },
  {
    id: "3-5",
    label: "Ages 3–5",
    slugs: ["dolls-plush", "role-play", "arts-crafts", "bubble-blowers", "ear-buddy-plush", "glitter-squeeze", "glow-wands", "play-balls", "bottle-plush", "light-up-toys", "pocket-critter-keyrings", "star-buddy-cups", "star-buddy-plush"],
  },
  {
    id: "6-8",
    label: "Ages 6–8",
    slugs: ["building-sets", "action-figures", "board-games", "christmas-surprise", "christmas-glow", "halloween-squishies", "party-spotlight", "hatch-dragons", "fashion-play-sets", "monster-buddy-keyrings", "light-up-hats", "push-pop-games", "crunchy-squishies", "funky-frights", "festive-dumplings", "halloween-hats", "light-up-gloves", "cheese-squishies", "glow-swords"],
  },
  {
    id: "9-12",
    label: "Ages 9–12",
    slugs: ["educational-stem", "outdoor-sports", "party-flags", "kids-hats", "novelty-keyrings", "handheld-fans", "monster-buddy-bags", "metal-keyrings", "mini-shoulder-bags", "light-up-glasses"],
  },
  { id: "13+", label: "Ages 13+", slugs: ["games-gadgets", "articulated-keyrings", "fidget-spinners"] },
] as const;

export const AGE_GROUP_RANGES: Record<(typeof CATEGORY_AGE_GROUPS)[number]["id"], AgeRange> = {
  "0-2": "0-2 years",
  "3-5": "3-5 years",
  "6-8": "6-8 years",
  "9-12": "9-12 years",
  "13+": "13+ years",
};

export function getCategoriesByAge() {
  return CATEGORY_AGE_GROUPS.map((group) => ({
    ...group,
    items: group.slugs
      .map((slug) => categories.find((category) => category.slug === slug))
      .filter((category): category is Category => Boolean(category)),
  }));
}
