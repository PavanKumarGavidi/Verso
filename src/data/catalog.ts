/* ==================== VASANA — Men's Indian Clothing ==================== */

/* ---------- imagery ---------- */
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&q=80&w=1100&auto=format&fit=crop`;

/* Generated in-studio (men's) */
export const GEN_KURTA =
  "https://image.qwenlm.ai/generated-images/f51e6392-02a6-4521-8472-b7ca4c3b1746/_result.png";
export const GEN_BLAZER =
  "https://image.qwenlm.ai/generated-images/a9c67a5b-3242-41e3-9f57-1f8cb7d83f22/_result.png";

/* Men's Indian wear — Unsplash */
export const MEN_KURTA_GREEN = U("1727835523545-70ee992b5763");
export const MEN_KURTA_YELLOW = U("1768807478320-fcfd3929acb2");
export const MEN_KURTA_BLUE = U("1767775498862-d4740ce574ce");
export const MEN_KURTA_PURPLE = U("1774267230662-575d1f4ec1bd");
export const MEN_FORMAL_WHITE = U("1647689662423-7948c8523256");
export const MEN_CASUAL_RED = U("1628250521470-28c1fc54616c");
export const MEN_TRAD_TWO = U("1774438028955-657a8aaea934");
export const MEN_TRAD_COLOR = U("1774438027294-3399070a2dbe");
export const MEN_POOL = U("1710242350089-65eef7e49364");
export const MEN_SLEEVES = U("1744551358303-46edae8b374b");
export const MEN_BLACK = U("1711044871601-301f9b0ecf91");
export const MEN_FLOWERS = U("1727835523550-18478cacefa2");

/* ---------- types ---------- */
export type Category =
  | "Sherwanis"
  | "Kurtas & Sets"
  | "Nehru Jackets"
  | "Formal Wear"
  | "Casual Wear"
  | "Jodhpuri Suits";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  colorway: string;
  img: string;
  filter?: string;
  badge?: "New" | "Bestseller" | "Low stock" | "Festive pick" | "Wedding";
  fabric: string;
  details: string;
  sizes: string[];
  featured?: boolean;
  isNew?: boolean;
  rating: number;
  reviews: number;
};

const S = ["S", "M", "L", "XL", "XXL"];
const COAT = ["38", "40", "42", "44", "46"];
const WAIST = ["30", "32", "34", "36", "38"];

export const DEFAULT_PRODUCTS: Product[] = [
  /* ---- SHERWANIS ---- */
  {
    id: "sher-ivory-gold",
    name: "Royal Ivory Sherwani",
    category: "Sherwanis",
    price: 24999,
    colorway: "Ivory & Gold",
    img: GEN_KURTA,
    filter: "brightness(1.25) saturate(0.7) sepia(0.15)",
    badge: "Wedding",
    fabric: "Raw silk with real zari embroidery, fully lined.",
    details: "The groom's sherwani. Hand-embroidered zari across the yoke and cuffs, silk-lined throughout. Includes matching churidar and dupatta.",
    sizes: COAT,
    featured: true,
    rating: 4.9,
    reviews: 87,
  },
  {
    id: "sher-maroon",
    name: "Maroon Velvet Sherwani",
    category: "Sherwanis",
    price: 21999,
    colorway: "Maroon",
    img: MEN_TRAD_TWO,
    badge: "Bestseller",
    fabric: "Crushed velvet with dabka work, satin lining.",
    details: "Rich maroon velvet with antique-gold dabka embroidery. A statement piece for receptions and sangeet nights.",
    sizes: COAT,
    featured: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "sher-navy",
    name: "Navy Bandhgala Sherwani",
    category: "Sherwanis",
    price: 19999,
    compareAt: 24999,
    colorway: "Navy",
    img: MEN_TRAD_COLOR,
    filter: "hue-rotate(200deg) saturate(0.8) brightness(0.85)",
    badge: "Low stock",
    fabric: "Silk-blend bandhgala silhouette with tonal embroidery.",
    details: "A modern bandhgala cut — Mandarin collar, concealed placket, tonal silk embroidery. For the groom who wants understated grandeur.",
    sizes: COAT,
    rating: 4.7,
    reviews: 56,
  },

  /* ---- KURTAS & SETS ---- */
  {
    id: "kurta-ivory-chikan",
    name: "Chikankari Kurta Set",
    category: "Kurtas & Sets",
    price: 3499,
    colorway: "Ivory",
    img: GEN_KURTA,
    badge: "Bestseller",
    fabric: "Hand-embroidered Lucknowi chikankari on cotton, with pyjama.",
    details: "Shadow-work chikankari done by hand in Lucknow — 18+ hours of embroidery per kurta. Relaxed straight cut with side pockets.",
    sizes: S,
    featured: true,
    rating: 4.9,
    reviews: 342,
  },
  {
    id: "kurta-haldi",
    name: "Haldi Yellow Kurta Set",
    category: "Kurtas & Sets",
    price: 2999,
    colorway: "Haldi Yellow",
    img: MEN_KURTA_YELLOW,
    badge: "New",
    fabric: "Cotton silk with gota patti border, churidar included.",
    details: "The haldi-morning kurta. Gota patti on the yoke, relaxed A-line cut, matching churidar. Photographs beautifully in daylight.",
    sizes: S,
    isNew: true,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "kurta-indigo",
    name: "Indigo Block-Print Kurta",
    category: "Kurtas & Sets",
    price: 2499,
    colorway: "Indigo",
    img: MEN_KURTA_BLUE,
    badge: "Festive pick",
    fabric: "Hand block-printed cotton, natural indigo dye from Bagru.",
    details: "Dabu mud-resist block printing from Bagru, Rajasthan. Each kurta is unique — no two prints repeat exactly.",
    sizes: S,
    featured: true,
    rating: 4.8,
    reviews: 167,
  },
  {
    id: "kurta-emerald",
    name: "Emerald Silk Kurta",
    category: "Kurtas & Sets",
    price: 4999,
    colorway: "Emerald",
    img: MEN_KURTA_GREEN,
    badge: "New",
    fabric: "Pure tussar silk, tonal embroidery, straight cut.",
    details: "Tussar silk from Bhagalpur in a deep emerald. Tonal silk embroidery at the placket and cuffs. For Diwali, Eid, and every evening that calls for it.",
    sizes: S,
    isNew: true,
    rating: 4.8,
    reviews: 73,
  },

  /* ---- NEHRU JACKETS ---- */
  {
    id: "nehru-indigo",
    name: "Kurta & Nehru Jacket",
    category: "Nehru Jackets",
    price: 5999,
    colorway: "Indigo",
    img: GEN_KURTA,
    filter: "hue-rotate(12deg) saturate(1.2) brightness(0.94)",
    badge: "Bestseller",
    fabric: "Hand-dyed indigo Nehru jacket over ivory chikankari kurta.",
    details: "The wedding-guest uniform. Hand-dyed indigo Nehru jacket layered over an ivory chikankari kurta — formal enough for the mandap, easy enough for the after-party.",
    sizes: COAT,
    featured: true,
    rating: 4.9,
    reviews: 187,
  },
  {
    id: "nehru-noir",
    name: "Noir Bandhgala Jacket",
    category: "Nehru Jackets",
    price: 6499,
    colorway: "Noir",
    img: MEN_BLACK,
    filter: "grayscale(0.3) brightness(0.85)",
    badge: "Low stock",
    fabric: "Jet-black wool-blend bandhgala, satin lapel-less collar.",
    details: "The noir bandhgala — sharp enough for the boardroom, traditional enough for the baraat. Slim cut with functioning sleeve buttons.",
    sizes: COAT,
    rating: 4.8,
    reviews: 91,
  },
  {
    id: "nehru-olive",
    name: "Olive Linen Nehru Jacket",
    category: "Nehru Jackets",
    price: 3999,
    colorway: "Olive",
    img: MEN_KURTA_GREEN,
    filter: "sepia(0.2) saturate(0.8) brightness(0.95)",
    badge: "New",
    fabric: "Washed linen, half-lined, horn buttons.",
    details: "Summer-weight linen in olive — the daytime layering piece. Half-lined for breathability, horn buttons for authenticity.",
    sizes: COAT,
    isNew: true,
    rating: 4.6,
    reviews: 54,
  },

  /* ---- FORMAL WEAR ---- */
  {
    id: "blazer-navy",
    name: "Tailored Navy Blazer",
    category: "Formal Wear",
    price: 8999,
    colorway: "Navy",
    img: GEN_BLAZER,
    badge: "Bestseller",
    fabric: "Half-canvassed tropical wool, corozo buttons.",
    details: "Half-canvassed in tropical-weight wool — built for Indian summers and air-conditioned meetings. Slim lapel, double vent, working cuffs.",
    sizes: COAT,
    featured: true,
    rating: 4.9,
    reviews: 118,
  },
  {
    id: "shirt-ivory",
    name: "Formal Ivory Shirt",
    category: "Formal Wear",
    price: 2299,
    colorway: "Ivory",
    img: MEN_FORMAL_WHITE,
    fabric: "Two-ply Giza cotton, cutaway collar, MOP buttons.",
    details: "The interview shirt. Two-ply Egyptian cotton with a cutaway collar that sits right with or without a tie. Wrinkle-resistant finish.",
    sizes: S,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "trouser-charcoal",
    name: "Pleated Formal Trouser",
    category: "Formal Wear",
    price: 2999,
    colorway: "Charcoal",
    img: GEN_BLAZER,
    filter: "grayscale(0.55) brightness(0.82) sepia(0.12)",
    fabric: "High-twist wool-blend, single pleat, half-lined.",
    details: "Single-pleat in high-twist wool that keeps its crease from the local train to the late meeting. Half-lined for breathability.",
    sizes: WAIST,
    rating: 4.8,
    reviews: 94,
  },

  /* ---- CASUAL WEAR ---- */
  {
    id: "casual-linen-kurta",
    name: "Everyday Linen Kurta",
    category: "Casual Wear",
    price: 1999,
    colorway: "Natural",
    img: MEN_POOL,
    badge: "New",
    fabric: "Washed Belgian linen, relaxed fit, side slits.",
    details: "The Sunday kurta. Washed Belgian linen that gets softer with every wash. Relaxed fit, side slits, mother-of-pearl buttons.",
    sizes: S,
    isNew: true,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "casual-cotton-shirt",
    name: "Cotton Casual Shirt",
    category: "Casual Wear",
    price: 1499,
    colorway: "Rust",
    img: MEN_CASUAL_RED,
    filter: "sepia(0.15) saturate(1.1)",
    fabric: "Slub cotton, camp collar, relaxed fit.",
    details: "A camp-collar shirt in textured slub cotton — pairs with denim, chinos, or lungis depending on the afternoon.",
    sizes: S,
    rating: 4.5,
    reviews: 178,
  },
  {
    id: "casual-denim",
    name: "Slim Denim",
    category: "Casual Wear",
    price: 2499,
    colorway: "Indigo Wash",
    img: MEN_SLEEVES,
    filter: "saturate(0.8) brightness(0.95)",
    fabric: "13.5oz stretch denim, mid-rise slim taper.",
    details: "Mid-rise slim taper in 13.5oz denim with 2% stretch. Sanforized so the fit you buy is the fit you keep.",
    sizes: WAIST,
    rating: 4.7,
    reviews: 231,
  },

  /* ---- JODHPURI SUITS ---- */
  {
    id: "jodhpuri-cream",
    name: "Cream Jodhpuri Suit",
    category: "Jodhpuri Suits",
    price: 14999,
    colorway: "Cream",
    img: MEN_KURTA_PURPLE,
    filter: "brightness(1.3) saturate(0.3) sepia(0.2)",
    badge: "Wedding",
    fabric: "Silk-blend Jodhpuri suit with embroidered jacket.",
    details: "The complete Jodhpuri — jacket with tonal silk embroidery, matching trouser, and silk pocket square. For receptions, engagements, and the kind of evening that deserves dressing up.",
    sizes: COAT,
    featured: true,
    rating: 4.9,
    reviews: 62,
  },
  {
    id: "jodhpuri-black",
    name: "Black Jodhpuri Suit",
    category: "Jodhpuri Suits",
    price: 12999,
    colorway: "Black",
    img: MEN_TRAD_TWO,
    filter: "brightness(0.7) grayscale(0.4)",
    badge: "Festive pick",
    fabric: "Wool-blend Jodhpuri with satin piping.",
    details: "The evening Jodhpuri in black wool-blend with satin piping. Mandarin collar, concealed buttons, trouser with a clean break.",
    sizes: COAT,
    rating: 4.8,
    reviews: 89,
  },
];

export const CATEGORIES: { name: Category; img: string; note: string }[] = [
  { name: "Sherwanis", img: MEN_TRAD_TWO, note: "Wedding & festive" },
  { name: "Kurtas & Sets", img: GEN_KURTA, note: "Everyday ethnic" },
  { name: "Nehru Jackets", img: MEN_KURTA_BLUE, note: "Layering pieces" },
  { name: "Formal Wear", img: GEN_BLAZER, note: "Blazers & shirts" },
  { name: "Casual Wear", img: MEN_POOL, note: "Linen & cotton" },
  { name: "Jodhpuri Suits", img: MEN_KURTA_PURPLE, note: "Indian formal" },
];

export const OCCASIONS: { title: string; note: string; cat: Category; img: string }[] = [
  { title: "Wedding season", note: "Sherwanis & Jodhpuri", cat: "Sherwanis", img: MEN_TRAD_TWO },
  { title: "Festive nights", note: "Silk kurtas & Nehru jackets", cat: "Kurtas & Sets", img: GEN_KURTA },
  { title: "Office hours", note: "Blazers & formal shirts", cat: "Formal Wear", img: GEN_BLAZER },
  { title: "Casual days", note: "Linen kurtas & cotton", cat: "Casual Wear", img: MEN_POOL },
  { title: "Receptions", note: "Bandhgalas & Nehru jackets", cat: "Nehru Jackets", img: MEN_BLACK },
];

export const PRESS = [
  {
    quote: "The menswear label making Indian occasion-wear feel inevitable — sherwanis to boardroom blazers, one cart.",
    source: "GQ India",
    issue: "Festive Issue",
  },
  {
    quote: "Finally — kurtas, Nehru jackets and office formals with the same level of craft and the same 48-hour dispatch.",
    source: "Men's Health India",
    issue: "Style Desk",
  },
  {
    quote: "Vasana's size-exchange promise quietly fixed Indian menswear e-commerce's worst habit.",
    source: "Femina",
    issue: "AW'25 Edit",
  },
];

export const DEFAULT_TICKER = [
  "Men's Festive Edit '25 is live",
  "Free delivery on orders over ₹1,999",
  "Cash on Delivery across India",
  "Easy 7-day returns & free size exchange",
  "Handloom, direct from the weaver",
  "Ships in 48 hours from Jaipur",
];

export const POLICIES: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping & Delivery",
    body: [
      "Orders placed before 14:00 IST leave our Jaipur warehouse the same day. Delivery is free above ₹1,999; below that, standard shipping is ₹99 (2–5 working days) and express is ₹249 (1–2 working days, metros).",
      "We deliver to all 27 states and 8 union territories through Delhivery and India Post. Every parcel ships in plastic-free, curbside-recyclable packaging.",
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    body: [
      "Changed your mind? Return any unworn piece with tags within 7 days — we schedule a doorstep pickup and refund to source within 3–5 working days of the reverse scan.",
      "Size not right? Exchanges are always free: pick the new size at pickup and we ship the replacement the same day the return is scanned.",
    ],
  },
  sizes: {
    title: "Size Guide",
    body: [
      "Kurtas and shirts are cut to a relaxed Indian block — when between sizes, size down for kurtas and up for blazers. Waist sizes are in inches and true to measure.",
      "Sherwanis and Jodhpuri suits run true with a 2-inch alteration allowance built in. Jacket sizes are chest measurements in inches.",
    ],
  },
  care: {
    title: "Care Guide",
    body: [
      "Silk sherwanis and embroidered pieces: dry clean only, wrap in muslin, air once a season away from direct sun.",
      "Cotton and linen kurtas: cold machine wash inside-out, line dry in shade. Chikankari is best hand-washed gently — the embroidery repays it.",
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "We store only what an order needs — name, contact, address and size preferences. No data is sold or shared with third-party advertisers.",
      "UPI IDs used at checkout are processed by the payment gateway and never touch our servers. Write to care@vasana.in for export or deletion within two working days.",
    ],
  },
};

export const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "atelier25";

/* Helper to create byId map from products array */
export const createById = (products: Product[]) => new Map(products.map((p) => [p.id, p]));
