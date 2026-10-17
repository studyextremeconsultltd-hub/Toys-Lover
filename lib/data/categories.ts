import type { AgeRange, Category } from "@/lib/types";
import { categoryCovers } from "@/lib/data/category-covers";

export const categories: Category[] = [
  {
    slug: "squishies",
    name: "Squishies",
    shortName: "Squishies",
    description: "Slow-rise squishies, squeezes, Needoh, dumplings, butter and cheese.",
    longDescription:
      "Every squishy in the shop lives here: fruit, food, jumbo, crunchy, butter bricks, cheese, dumplings, Needoh and seasonal squeezes. One aisle, one photo per toy.",
    image: categoryCovers.squishies,
    accent: "coral",
    ageLabel: "Ages 3+",
  },
  {
    slug: "cars-vehicles",
    name: "Cars & Vehicles",
    shortName: "Cars & Vehicles",
    description: "Die-cast cars, trucks, aircraft and remote-control vehicles.",
    longDescription:
      "Metal model cars, fire trucks, stunt racers, aircraft and other vehicles with a clear photo and a UK price on every card.",
    image: categoryCovers["cars-vehicles"],
    accent: "sky",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "dolls",
    name: "Dolls",
    shortName: "Dolls",
    description: "Fashion dolls, baby dolls and princess dolls for pretend play.",
    longDescription:
      "Dolls you can dress, care for and take on a day out — fashion dolls, baby dolls and princess dolls, each with its own photo.",
    image: categoryCovers.dolls,
    accent: "coral",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "dolls-plush",
    name: "Plush & Soft Toys",
    shortName: "Plush & Soft Toys",
    description: "Teddies, character plush and hug-size soft toys.",
    longDescription:
      "Soft toys and plush characters — teddies, Stitch, Bluey and other hug-size friends. Labubu has its own aisle.",
    image: categoryCovers["dolls-plush"],
    accent: "coral",
    ageLabel: "Ages 0–8",
  },
  {
    slug: "labubu",
    name: "Labubu",
    shortName: "Labubu",
    description: "Labubu plush, outfits, bags and surprise boxes.",
    longDescription:
      "The Labubu aisle: plush, outfits, bags, surprise boxes and big sizes. Squishy Labubu stays with the squishies.",
    image: categoryCovers.labubu,
    accent: "mint",
    ageLabel: "Ages 6+",
  },
  {
    slug: "action-figures",
    name: "K-Pop & Collectible Figures",
    shortName: "K-Pop & Figures",
    description: "K-Pop sets, Sonny Angels and collectible figures.",
    longDescription:
      "K-Pop dolls and figures, Sonny Angels, character figures and surprise figure packs. Keyrings stay in the keyring aisle.",
    image: categoryCovers["action-figures"],
    accent: "sun",
    ageLabel: "Ages 6+",
  },
  {
    slug: "fidget-spinners",
    name: "Fidget & Sensory",
    shortName: "Fidget & Sensory",
    description: "Spinners, slime, pop-its and stress toys.",
    longDescription:
      "Desk fidgets that are not squishies: spinners, slime, pop-its, push-pops and stress toys.",
    image: categoryCovers["fidget-spinners"],
    accent: "sky",
    ageLabel: "Ages 6+",
  },
  {
    slug: "light-up-toys",
    name: "Light-Up Toys",
    shortName: "Light-Up Toys",
    description: "LED toys, glow swords, lanterns and light-up wands.",
    longDescription:
      "Toys picked for the light: swords, wands, lanterns, glasses and other LED play. Christmas light sets sit in Seasonal.",
    image: categoryCovers["light-up-toys"],
    accent: "sun",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "novelty-keyrings",
    name: "Keyrings & Bag Charms",
    shortName: "Keyrings & Charms",
    description: "Keyrings, bag charms and clip-on characters.",
    longDescription:
      "Bag charms and keyrings, from soft critters to metal clips. One listing per style so the charm is easy to see.",
    image: categoryCovers["novelty-keyrings"],
    accent: "coral",
    ageLabel: "Ages 6+",
  },
  {
    slug: "bubble-blowers",
    name: "Bubbles & Water Toys",
    shortName: "Bubbles & Water",
    description: "Bubble guns, bubble cameras and splash water toys.",
    longDescription:
      "Garden bubbles and water play: bubble guns, animal bubble cameras and splash balls.",
    image: categoryCovers["bubble-blowers"],
    accent: "sky",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "outdoor-sports",
    name: "Outdoor & Sports",
    shortName: "Outdoor & Sports",
    description: "Balls, blasters, bikes and garden sports.",
    longDescription:
      "Outside play: balls, blasters, skateboards, bikes and other garden sports.",
    image: categoryCovers["outdoor-sports"],
    accent: "mint",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "building-sets",
    name: "Building & Construction",
    shortName: "Building",
    description: "Blocks, tracks and construction sets.",
    longDescription:
      "Building sets, block packs and track play. Slow-rise food blocks stay with the squishies.",
    image: categoryCovers["building-sets"],
    accent: "sun",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "arts-crafts",
    name: "Arts, Crafts & Stationery",
    shortName: "Arts & Stationery",
    description: "Pens, stickers, calendars and making kits.",
    longDescription:
      "Stationery and making: gel pens, stickers, calendars and craft sets.",
    image: categoryCovers["arts-crafts"],
    accent: "sun",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "role-play",
    name: "Role Play & Pretend Play",
    shortName: "Role Play",
    description: "Kitchens, salons, castles and pretend-play sets.",
    longDescription:
      "Pretend play: kitchens, salons, castles, doctor kits and other dress-up sets.",
    image: categoryCovers["role-play"],
    accent: "coral",
    ageLabel: "Ages 3–8",
  },
  {
    slug: "board-games",
    name: "Games & Cards",
    shortName: "Games & Cards",
    description: "Playing cards, table games and puzzles.",
    longDescription:
      "Cards, table games and puzzles for a kitchen-table round.",
    image: categoryCovers["board-games"],
    accent: "mint",
    ageLabel: "Ages 4–12",
  },
  {
    slug: "baby-toddler",
    name: "Baby & Toddler",
    shortName: "Baby & Toddler",
    description: "First gyms, mats and push toys for the youngest players.",
    longDescription:
      "Early play: activity gyms, musical mats and first ride-ons sized for toddlers.",
    image: categoryCovers["baby-toddler"],
    accent: "sky",
    ageLabel: "Ages 0–2",
  },
  {
    slug: "bags-accessories",
    name: "Bags & Accessories",
    shortName: "Bags & Accessories",
    description: "Character bags, purses and small accessories.",
    longDescription:
      "Bags, purses, trolleys and character accessories, listed one style at a time.",
    image: categoryCovers["bags-accessories"],
    accent: "coral",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "party-spotlight",
    name: "Party, Hats & Dress-Up",
    shortName: "Party & Hats",
    description: "Party hats, masks, flags and dress-up.",
    longDescription:
      "Hats, masks, flags and dress-up for parties. Halloween and Christmas pieces also appear under Seasonal.",
    image: categoryCovers["party-spotlight"],
    accent: "sun",
    ageLabel: "Ages 3–12",
  },
  {
    slug: "seasonal",
    name: "Seasonal (Halloween & Christmas)",
    shortName: "Seasonal",
    description: "Halloween and Christmas toys, lights and advent calendars.",
    longDescription:
      "Halloween and Christmas: masks, advent calendars, Santa toys and festive lights. Seasonal squishies stay in Squishies.",
    image: categoryCovers.seasonal,
    accent: "coral",
    ageLabel: "Ages 3+",
  },
  {
    slug: "home-gifts",
    name: "Home & Gifts",
    shortName: "Home & Gifts",
    description: "Blankets, fans, cups, bottles, frames and gift-home bits.",
    longDescription:
      "Home and gift lines: bedding, blankets, towels, cups, bottles, fans, cushion covers, umbrellas and frames.",
    image: categoryCovers["home-gifts"],
    accent: "mint",
    ageLabel: "All ages",
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
    slugs: ["dolls", "dolls-plush", "role-play", "bubble-blowers"],
  },
  {
    id: "6-8",
    label: "Ages 6–8",
    slugs: ["squishies", "building-sets", "board-games", "seasonal", "party-spotlight", "light-up-toys", "labubu"],
  },
  {
    id: "9-12",
    label: "Ages 9–12",
    slugs: ["outdoor-sports", "bags-accessories", "novelty-keyrings", "home-gifts", "arts-crafts", "action-figures"],
  },
  { id: "13+", label: "Ages 13+", slugs: ["cars-vehicles", "fidget-spinners"] },
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
