/* Editorial imagery (hosted campaign photography) */
export const HERO_IMG =
  "https://image.qwenlm.ai/generated-images/77142b98-b536-4efe-9c34-d466b1468d63/_result.png";
export const LOOK_1 =
  "https://image.qwenlm.ai/generated-images/03557c79-4718-49a9-b0b7-3c30fdf2b7e9/_result.png";
export const LOOK_2 =
  "https://image.qwenlm.ai/generated-images/68b0b835-8ab8-48e9-8abf-9278f16f88f1/_result.png";

const P_COAT =
  "https://image.qwenlm.ai/generated-images/367f8270-e39d-4af5-8993-628ff995143a/_result.png";
const P_KNIT =
  "https://image.qwenlm.ai/generated-images/59a4f946-0d8f-40c3-aac1-ef8e717db0c6/_result.png";
const P_TROUSER =
  "https://image.qwenlm.ai/generated-images/89d0a3ad-39d7-4abe-a3d0-fe4bb7847e90/_result.png";
const P_SHIRT =
  "https://image.qwenlm.ai/generated-images/695fbc08-b61f-4495-95a7-4b27caf67b3a/_result.png";
const P_JACKET =
  "https://image.qwenlm.ai/generated-images/97bac3c0-b22e-4e6c-b37d-bfa66599417e/_result.png";
const P_DRESS =
  "https://image.qwenlm.ai/generated-images/4286ef0a-e38b-4e04-a5bb-3d30c917e022/_result.png";
const P_BOOT =
  "https://image.qwenlm.ai/generated-images/f135f647-0173-48dc-86f9-7e14d14eb69d/_result.png";

export type Category =
  | "Outerwear"
  | "Knitwear"
  | "Tailoring"
  | "Shirts"
  | "Dresses"
  | "Footwear";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  colorway: string;
  img: string;
  filter?: string;
  badge?: "New" | "Bestseller" | "Low stock" | "Final sale";
  fabric: string;
  details: string;
  sizes: string[];
  featured?: boolean;
  isNew?: boolean;
  rating: number;
  reviews: number;
};

const APPAREL = ["XS", "S", "M", "L", "XL"];
const SHOES = ["40", "41", "42", "43", "44", "45"];

export const PRODUCTS: Product[] = [
  {
    id: "marlow-charcoal",
    name: "Marlow Overcoat",
    category: "Outerwear",
    price: 420,
    colorway: "Charcoal",
    img: P_COAT,
    badge: "Bestseller",
    fabric: "Double-faced virgin wool, horn buttons, cupro lining.",
    details:
      "Cut from 640gsm double-faced wool woven in Biella. Fully canvassed, hand-finished lapel, single back vent. Dry clean only.",
    sizes: APPAREL,
    featured: true,
    rating: 4.9,
    reviews: 132,
  },
  {
    id: "belmont-camel",
    name: "Belmont Overcoat",
    category: "Outerwear",
    price: 390,
    colorway: "Camel",
    img: P_COAT,
    filter: "sepia(0.42) hue-rotate(-12deg) saturate(1.1) brightness(1.09)",
    badge: "New",
    fabric: "Brushed camel wool-cashmere, corozo buttons.",
    details:
      "A softer shoulder, patch pockets and a 9% cashmere hand for warmth without weight. Arrives from the loom undyed — the camel is the fibre itself.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.8,
    reviews: 41,
  },
  {
    id: "hollis-brun",
    name: "Hollis Leather Jacket",
    category: "Outerwear",
    price: 560,
    colorway: "Brun",
    img: P_JACKET,
    badge: "Low stock",
    fabric: "Full-grain Tuscan leather, vegetable tanned, cotton twill lining.",
    details:
      "Racer silhouette with a two-way zip and storm cuffs. Tanned with chestnut extract — it darkens and softens with a decade of wear.",
    sizes: APPAREL,
    featured: true,
    rating: 4.9,
    reviews: 87,
  },
  {
    id: "ashford-oat",
    name: "Ashford Rib Knit",
    category: "Knitwear",
    price: 180,
    colorway: "Oat",
    img: P_KNIT,
    badge: "New",
    fabric: "3-ply extrafine merino, fully-fashioned, hand-linked collar.",
    details:
      "Knitted whole on 12-gauge frames in Guimarães, then washed in soft water for a broken-in feel from day one.",
    sizes: APPAREL,
    featured: true,
    isNew: true,
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "ashford-espresso",
    name: "Ashford Rib Knit",
    category: "Knitwear",
    price: 180,
    colorway: "Espresso",
    img: P_KNIT,
    filter: "brightness(0.66) sepia(0.22) saturate(0.95)",
    fabric: "3-ply extrafine merino, walnut-husk dyed.",
    details:
      "The same fully-fashioned rib, dyed with walnut husk for a deep, living espresso that shifts in low light.",
    sizes: APPAREL,
    rating: 4.8,
    reviews: 52,
  },
  {
    id: "kent-ink",
    name: "Kent Pleated Trouser",
    category: "Tailoring",
    price: 165,
    colorway: "Ink",
    img: P_TROUSER,
    featured: true,
    fabric: "High-twist wool flannel, single pleat, side adjusters.",
    details:
      "A fuller leg that breaks once. High-twist yarn keeps the crease sharp through travel — our most reordered trouser three seasons running.",
    sizes: APPAREL,
    rating: 4.8,
    reviews: 98,
  },
  {
    id: "kent-stone",
    name: "Kent Pleated Trouser",
    category: "Tailoring",
    price: 165,
    colorway: "Stone",
    img: P_TROUSER,
    filter: "brightness(1.38) saturate(0.32)",
    badge: "New",
    fabric: "High-twist wool flannel in undyed stone.",
    details:
      "Woven from undyed Saxony fleece — the grey-warm stone tone comes from blending natural fibre shades, no dye bath involved.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.6,
    reviews: 23,
  },
  {
    id: "rowan-blanc",
    name: "Rowan Poplin Shirt",
    category: "Shirts",
    price: 140,
    colorway: "Blanc",
    img: P_SHIRT,
    badge: "New",
    fabric: "120s two-ply Egyptian poplin, mother-of-pearl buttons.",
    details:
      "Sewn with 22 stitches per inch and a single-needle yoke. Cut generous through the body to be worn tucked or open.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.7,
    reviews: 45,
  },
  {
    id: "vesper-choc",
    name: "Vesper Bias Dress",
    category: "Dresses",
    price: 310,
    colorway: "Chocolate",
    img: P_DRESS,
    featured: true,
    isNew: true,
    fabric: "Sandwashed silk crepe, cut on the true bias.",
    details:
      "Cut on the bias so the dress follows rather than fits. French seams throughout; adjustable straps; falls to mid-calf.",
    sizes: APPAREL,
    rating: 4.9,
    reviews: 71,
  },
  {
    id: "vesper-noir",
    name: "Vesper Bias Dress",
    category: "Dresses",
    price: 248,
    compareAt: 310,
    colorway: "Noir",
    img: P_DRESS,
    filter: "brightness(0.55) saturate(0.65) hue-rotate(-8deg)",
    badge: "Final sale",
    fabric: "Sandwashed silk crepe, cut on the true bias.",
    details:
      "The evening colourway of the Vesper, in the last of the noir crepe. Final sale — all sales fund next season's deadstock buy-back.",
    sizes: APPAREL,
    rating: 4.8,
    reviews: 39,
  },
  {
    id: "lennox-tan",
    name: "Lennox Chelsea Boot",
    category: "Footwear",
    price: 290,
    colorway: "Tan",
    img: P_BOOT,
    featured: true,
    fabric: "Waxy commando calf, Goodyear welted, natural crepe sole.",
    details:
      "Welted in Northampton on our house last — a rounded toe with room for real feet. Resoleable for life at any of our ateliers.",
    sizes: SHOES,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "lennox-noir",
    name: "Lennox Chelsea Boot",
    category: "Footwear",
    price: 290,
    colorway: "Noir",
    img: P_BOOT,
    filter: "brightness(0.52) saturate(0.5)",
    fabric: "Jet-dyed waxy calf, Goodyear welted, crepe sole.",
    details:
      "The Lennox in a deep, inked noir — dyed through the crust so scuffs buff back to black, never to grey.",
    sizes: SHOES,
    rating: 4.8,
    reviews: 118,
  },
];

export const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

export const CATEGORIES: { name: Category; img: string; note: string }[] = [
  { name: "Outerwear", img: P_COAT, note: "Coats & jackets" },
  { name: "Knitwear", img: P_KNIT, note: "Hand-loomed merino" },
  { name: "Tailoring", img: P_TROUSER, note: "Pleats & flannel" },
  { name: "Shirts", img: P_SHIRT, note: "Poplin & pearl" },
  { name: "Dresses", img: P_DRESS, note: "Bias-cut silk" },
  { name: "Footwear", img: P_BOOT, note: "Welted for life" },
];

export const SERVICES = [
  {
    name: "Wardrobe consultation",
    icon: "hanger",
    dur: "75 min",
    desc: "A stylist edits, reorders and fills the gaps in what you already own.",
  },
  {
    name: "Made-to-measure",
    icon: "needle",
    dur: "2 visits",
    desc: "Coats, suits and trousers cut to your measurements in-house.",
  },
  {
    name: "Tailoring & alterations",
    icon: "scissors",
    dur: "45 min",
    desc: "Hems, suppression and restoration by our workshop bench.",
  },
  {
    name: "Occasion dressing",
    icon: "user",
    dur: "90 min",
    desc: "Weddings, premieres, interviews — the full look, fitted twice.",
  },
];

export const STORES = [
  { city: "Porto", addr: "Rua do Almada 114", hours: "Tue – Sat · 10–19h", flag: true },
  { city: "Paris", addr: "12 Rue de Sévigné", hours: "Mon – Sat · 11–19h" },
  { city: "Copenhagen", addr: "Bredgade 8", hours: "Wed – Sun · 11–18h" },
];

export const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:30"];

export const PRESS = [
  {
    quote: "The quietest coats in fashion — and the loudest argument for buying less, better.",
    source: "La Mode",
    issue: "Issue 214",
  },
  {
    quote: "Verso's made-to-measure program is the best-kept secret in European tailoring.",
    source: "The Sunday Edit",
    issue: "Style Desk",
  },
  {
    quote: "Knitwear you will hand down, priced like something you merely bought.",
    source: "FORM Magazine",
    issue: "AW'25 Annual",
  },
];

export const TICKER = [
  "AW'25 — The Quiet Tailoring is live",
  "Complimentary shipping over $250",
  "Private fittings by appointment — Porto · Paris · Copenhagen",
  "Every fibre traceable to the mill",
  "Lifetime resoling on all welted footwear",
];

export const POLICIES: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping & Returns",
    body: [
      "Orders placed before 14:00 CET leave our Porto warehouse the same day. Standard delivery is complimentary over $250 and arrives in 2–4 working days; express (1–2 days) is $24.",
      "Returns are open for 30 days in unworn condition with tags attached. Final-sale pieces are marked on the product page and are not returnable — their proceeds fund our deadstock buy-back program.",
    ],
  },
  care: {
    title: "Care Guide",
    body: [
      "Wool and knitwear: air between wears, steam rather than iron, and wash at most twice a season on a cold wool cycle inside a mesh bag.",
      "Leather: condition twice a year with an uncoloured balm. Welted footwear: rotate pairs and use cedar trees; bring them to any atelier for a complimentary polish.",
    ],
  },
  sizes: {
    title: "Size Guide",
    body: [
      "Our apparel is cut true to a relaxed European block — when between sizes, take the smaller for knitwear and the larger for outerwear worn over layers.",
      "Footwear runs true on our house last; those between sizes should size down a half. Every product page notes its own fit tendencies from verified reviews.",
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "We store only what an order or appointment needs: your name, contact details and measurements if you choose to share them. Nothing is sold, shared or used for third-party advertising.",
      "Request an export or deletion of your data at any time by writing to atelier@verso.example — we answer within two working days.",
    ],
  },
};

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "atelier25";
