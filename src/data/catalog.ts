/* ---------------- imagery ---------------- */

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&q=80&w=1100&auto=format&fit=crop`;

/* generated in-studio */
export const GEN_KURTA =
  "https://image.qwenlm.ai/generated-images/f51e6392-02a6-4521-8472-b7ca4c3b1746/_result.png";
export const GEN_BLAZER =
  "https://image.qwenlm.ai/generated-images/a9c67a5b-3242-41e3-9f57-1f8cb7d83f22/_result.png";

/* Unsplash photography */
export const LEH_MAROON = U("1756483488645-5973a1a92e33");
export const LEH_GREEN = U("1756483510809-122c56fbb035");
export const LEH_ROSE = U("1756483510859-c0ab4c45782c");
export const LEH_BRIDAL = U("1762708595603-3b06c63dce9c");
export const SONA_TRAD = U("1767955694884-d4bf352c23c2");
export const SAREE_GREEN = U("1679006831648-7c9ea12e5807");
export const SAREE_PURPLE = U("1641699862936-be9f49b1c38d");
export const SAREE_RED = U("1610030469983-98e550d6193c");
export const SAREE_PINK = U("1617627143750-d86bc21e42bb");
export const KURTA_HALDI = U("1759720883040-af9be070929e");
export const KURTA_LAL = U("1716655359683-791d415c3f4c");
export const KURTA_VAN = U("1760162693478-4c96b6c99d55");
export const GOWN_MIDNIGHT = U("1640745690845-4d6aa890811d");
export const CASUAL_KURTI = U("1715090826982-a93a7c74e880");
export const CASUAL_DENIM = U("1542272604-787c3835535d");
export const CASUAL_TEE = U("1710440189404-e95fabead2a3");
export const FORMAL_TIE = U("1507679799987-c73779587ccf");
export const LOOK_FIELD = U("1645856049235-8464376187fa");
export const LOOK_GRASS = U("1645856048803-51971c462707");

/* ---------------- types ---------------- */

export type Category =
  | "Sarees"
  | "Lehengas"
  | "Kurtas & Sets"
  | "Indo-Western"
  | "Casual"
  | "Official";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  colorway: string;
  img: string;
  filter?: string;
  badge?: "New" | "Bestseller" | "Low stock" | "Festive pick";
  fabric: string;
  details: string;
  sizes: string[];
  featured?: boolean;
  isNew?: boolean;
  rating: number;
  reviews: number;
};

const APPAREL = ["XS", "S", "M", "L", "XL"];
const WAIST = ["28", "30", "32", "34", "36"];
const COAT = ["38", "40", "42", "44"];

export const PRODUCTS: Product[] = [
  /* ---- SAREES ---- */
  {
    id: "banarasi-rani",
    name: "Banarasi Silk Saree",
    category: "Sarees",
    price: 6999,
    colorway: "Rani Pink",
    img: SAREE_RED,
    badge: "Bestseller",
    fabric: "Pure Katan silk, real zari border, handwoven in Varanasi.",
    details:
      "Woven over 21 days on a handloom in Varanasi. Kadiyal border with real silver-zari dipped in gold. Ships with a running blouse piece and the weaver's name on the fall.",
    sizes: ["Free size"],
    featured: true,
    rating: 4.9,
    reviews: 214,
  },
  {
    id: "banarasi-sona",
    name: "Banarasi Silk Saree",
    category: "Sarees",
    price: 7499,
    colorway: "Sona Gold",
    img: SONA_TRAD,
    badge: "New",
    fabric: "Katan silk, meenakari butta, sona-ranga dhaaga.",
    details:
      "The festive colourway of our Banarasi — sun-gold body with maroon meenakari bootis. A saree that photographs the way it feels: heavy, warm, heirloom.",
    sizes: ["Free size"],
    isNew: true,
    rating: 4.8,
    reviews: 63,
  },
  {
    id: "kanchi-mehrun",
    name: "Kanchipuram Saree",
    category: "Sarees",
    price: 5999,
    colorway: "Mehrun Purple",
    img: SAREE_PURPLE,
    fabric: "Mulberry silk, korvai border, gold-checked pallu.",
    details:
      "Classic korvai technique where the border is woven separately and interlocked — it will never peel away. Blouse piece included.",
    sizes: ["Free size"],
    rating: 4.8,
    reviews: 128,
  },
  {
    id: "chanderi-hara",
    name: "Chanderi Cotton Saree",
    category: "Sarees",
    price: 3499,
    colorway: "Hara Green",
    img: SAREE_GREEN,
    badge: "New",
    fabric: "Cotton-silk Chanderi, ashrafi butta, feather-light drape.",
    details:
      "The office-to-occasion saree. Sheer, weightless Chanderi from Madhya Pradesh that drapes in five minutes and breathes all day.",
    sizes: ["Free size"],
    isNew: true,
    rating: 4.7,
    reviews: 87,
  },

  /* ---- LEHENGAS ---- */
  {
    id: "meera-maroon",
    name: "Zardozi Lehenga",
    category: "Lehengas",
    price: 12999,
    colorway: "Maroon",
    img: LEH_MAROON,
    badge: "Bestseller",
    fabric: "Raw silk, hand-worked zardozi, cancan-lined flare.",
    details:
      "Six metres of flare with 400 hours of zardozi across the hem. Dupatta with a hand-rolled edge included; choli stitched to your measurements on request.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    rating: 4.9,
    reviews: 176,
  },
  {
    id: "meera-emerald",
    name: "Zardozi Lehenga",
    category: "Lehengas",
    price: 13999,
    colorway: "Emerald",
    img: LEH_GREEN,
    badge: "New",
    fabric: "Raw silk in emerald, antique-gold zardozi.",
    details:
      "The sangeet colourway — emerald that reads green under warm light and teal under white. Mirror-work buttis catch every phera of the dance floor.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    rating: 4.8,
    reviews: 54,
  },
  {
    id: "aisha-gulabi",
    name: "Cape Lehenga Set",
    category: "Lehengas",
    price: 11499,
    colorway: "Gulabi",
    img: LEH_ROSE,
    fabric: "Georgette lehenga with a sheer embroidered cape.",
    details:
      "For the bride who skips the dupatta. A fluid georgette lehenga with a full embroidered cape — grand entrances, free hands.",
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviews: 92,
  },
  {
    id: "noor-scarlet",
    name: "Bridal Lehenga",
    category: "Lehengas",
    price: 18999,
    compareAt: 24999,
    colorway: "Scarlet",
    img: LEH_BRIDAL,
    badge: "Low stock",
    fabric: "Velvet bridal lehenga, dabka & kundan work, double dupatta.",
    details:
      "Our atelier bridal piece in scarlet velvet with dabka, kundan and pearl work. Two dupattas — one heavy, one soft. Only a few sizes remain this season.",
    sizes: ["S", "M", "L"],
    rating: 5.0,
    reviews: 41,
  },

  /* ---- KURTAS & SETS ---- */
  {
    id: "chikankari-ivory",
    name: "Chikankari Kurta Set",
    category: "Kurtas & Sets",
    price: 2499,
    colorway: "Ivory",
    img: GEN_KURTA,
    badge: "Festive pick",
    fabric: "Hand-embroidered Lucknowi chikankari on cotton, straight-cut pyjama.",
    details:
      "Shadow-work chikankari done by hand in Lucknow — each kurta carries roughly 18 hours of embroidery. Relaxed straight cut, side pockets, breathable cotton.",
    sizes: APPAREL,
    featured: true,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: "anarkali-haldi",
    name: "Anarkali Kurta Set",
    category: "Kurtas & Sets",
    price: 3999,
    colorway: "Haldi",
    img: KURTA_HALDI,
    badge: "New",
    fabric: "Flared anarkali in haldi yellow with gota patti, churidar included.",
    details:
      "The haldi-morning anarkali. Gota patti on the yoke, a 24-kali flare that moves when you do, and a matching churidar.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "festive-lal",
    name: "Festive Kurta Set",
    category: "Kurtas & Sets",
    price: 4499,
    colorway: "Lal Red",
    img: KURTA_LAL,
    fabric: "Silk-blend kurta with mirror-work dupatta.",
    details:
      "Garba-ready and Diwali-proof — a lal-red silk blend with a mirror-work dupatta that does the lighting for you.",
    sizes: APPAREL,
    rating: 4.6,
    reviews: 76,
  },
  {
    id: "heritage-van",
    name: "Heritage Kurta Set",
    category: "Kurtas & Sets",
    price: 3299,
    colorway: "Van Green",
    img: KURTA_VAN,
    badge: "New",
    fabric: "Block-printed cotton kurta, dabu mud-resist print from Bagru.",
    details:
      "Dabu mud-resist block printing from Bagru, Rajasthan — every print is stamped by hand, so no two kurtas repeat exactly.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.8,
    reviews: 59,
  },

  /* ---- INDO-WESTERN ---- */
  {
    id: "nehru-indigo",
    name: "Kurta & Nehru Jacket",
    category: "Indo-Western",
    price: 5499,
    colorway: "Indigo",
    img: GEN_KURTA,
    filter: "hue-rotate(12deg) saturate(1.2) brightness(0.94)",
    badge: "Bestseller",
    fabric: "Indigo-dyed Nehru jacket over an ivory chikankari kurta.",
    details:
      "The wedding-guest uniform. A hand-dyed indigo Nehru jacket that layers over the ivory kurta — formal enough for the mandap, easy enough for the after-party.",
    sizes: COAT,
    featured: true,
    rating: 4.9,
    reviews: 187,
  },
  {
    id: "midnight-gown",
    name: "Fusion Gown",
    category: "Indo-Western",
    price: 7999,
    colorway: "Midnight",
    img: GOWN_MIDNIGHT,
    fabric: "Crepe gown with hand-embroidered bodice, palazzo drape.",
    details:
      "An indo-western silhouette with a lehenga's drama — fitted embroidered bodice, fluid midnight crepe, trailing palazzo drape.",
    sizes: APPAREL,
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "nehru-noir",
    name: "Nehru Jacket",
    category: "Indo-Western",
    price: 4999,
    compareAt: 5999,
    colorway: "Noir",
    img: GEN_KURTA,
    filter: "grayscale(0.92) brightness(0.78) contrast(1.05)",
    badge: "Low stock",
    fabric: "Jet-black bandhgala jacket, satin lapel-less collar.",
    details:
      "The noir bandhgala — sharp enough for the boardroom, traditional enough for the baraat. Slim cut with functioning sleeve buttons.",
    sizes: COAT,
    rating: 4.8,
    reviews: 71,
  },

  /* ---- CASUAL ---- */
  {
    id: "dilli-kurti",
    name: "Casual Kurti",
    category: "Casual",
    price: 1499,
    colorway: "Dilli Street",
    img: CASUAL_KURTI,
    badge: "New",
    fabric: "Slub cotton kurti, scooter-proof length, front pockets.",
    details:
      "The everyday kurti — slub cotton that survives Delhi summers, a length that works on a scooter, and pockets that actually fit a phone.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.6,
    reviews: 143,
  },
  {
    id: "indigo-denim",
    name: "Slim Denim",
    category: "Casual",
    price: 2199,
    colorway: "Indigo Wash",
    img: CASUAL_DENIM,
    fabric: "13.5oz stretch denim, mid-rise slim taper.",
    details:
      "A mid-rise slim taper in 13.5oz denim with 2% stretch — pairs with tees and kurtas alike. Sanforized so the fit you buy is the fit you keep.",
    sizes: WAIST,
    rating: 4.7,
    reviews: 231,
  },
  {
    id: "ecru-tee",
    name: "Everyday Tee (Pack of 2)",
    category: "Casual",
    price: 999,
    colorway: "Ecru & Indigo",
    img: CASUAL_TEE,
    badge: "New",
    fabric: "220gsm combed cotton, pre-shrunk, ribbed collar.",
    details:
      "Two heavyweight combed-cotton tees — one ecru, one indigo. Pre-shrunk, double-stitched, and thick enough to skip the vest.",
    sizes: APPAREL,
    isNew: true,
    rating: 4.5,
    reviews: 189,
  },

  /* ---- OFFICIAL ---- */
  {
    id: "navy-blazer",
    name: "Tailored Blazer",
    category: "Official",
    price: 6499,
    colorway: "Navy",
    img: GEN_BLAZER,
    badge: "Bestseller",
    fabric: "Half-canvassed tropical wool blazer, corozo buttons.",
    details:
      "A half-canvassed blazer in tropical-weight wool — built for Indian summers and air-conditioned meetings. Slim lapel, double vent, working cuffs.",
    sizes: COAT,
    featured: true,
    rating: 4.9,
    reviews: 118,
  },
  {
    id: "ivory-shirt",
    name: "Formal Shirt",
    category: "Official",
    price: 1799,
    colorway: "Ivory",
    img: FORMAL_TIE,
    fabric: "Two-ply Giza cotton, cutaway collar, mother-of-pearl buttons.",
    details:
      "The interview shirt. Two-ply Egyptian cotton with a cutaway collar that sits right with or without a tie. Wrinkle-resistant finish.",
    sizes: APPAREL,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "charcoal-trouser",
    name: "Pleated Trouser",
    category: "Official",
    price: 2299,
    colorway: "Charcoal",
    img: GEN_BLAZER,
    filter: "grayscale(0.55) brightness(0.82) sepia(0.12)",
    fabric: "High-twist wool-blend, single pleat, half-lined.",
    details:
      "A single-pleat office trouser in high-twist wool that keeps its crease from the local train to the late meeting. Half-lined for breathability.",
    sizes: WAIST,
    rating: 4.8,
    reviews: 94,
  },
];

export const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

export const CATEGORIES: { name: Category; img: string; note: string }[] = [
  { name: "Sarees", img: SAREE_PINK, note: "Handloom & Banarasi" },
  { name: "Lehengas", img: LEH_MAROON, note: "Festive & bridal" },
  { name: "Kurtas & Sets", img: GEN_KURTA, note: "Chikankari to anarkali" },
  { name: "Indo-Western", img: GOWN_MIDNIGHT, note: "Fusion dressing" },
  { name: "Casual", img: CASUAL_KURTI, note: "Kurtis, tees & denim" },
  { name: "Official", img: GEN_BLAZER, note: "Office & occasions" },
];

export const OCCASIONS: { title: string; note: string; cat: Category; img: string }[] = [
  { title: "Casual days", note: "Kurtis, tees & denim", cat: "Casual", img: CASUAL_KURTI },
  { title: "Office hours", note: "Blazers & formal shirts", cat: "Official", img: GEN_BLAZER },
  { title: "Wedding season", note: "Lehengas that turn rooms", cat: "Lehengas", img: LEH_BRIDAL },
  { title: "Festive nights", note: "Zari, silk & sparkle", cat: "Sarees", img: SAREE_PINK },
  { title: "Evening events", note: "Indo-western drama", cat: "Indo-Western", img: GOWN_MIDNIGHT },
];

export const PRESS = [
  {
    quote: "The online store making handloom feel inevitable again — Banarasi zari to boardroom blazers, one cart.",
    source: "Vogue India",
    issue: "Festive Issue",
  },
  {
    quote: "Vasana's size-exchange promise quietly fixed Indian e-commerce's worst habit.",
    source: "Femina",
    issue: "Style Desk",
  },
  {
    quote: "Finally — lehengas, kurtas and office formals with the same level of craft and the same 48-hour dispatch.",
    source: "ELLE India",
    issue: "AW'25 Edit",
  },
];

export const TICKER = [
  "Festive Edit '25 is live",
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
      "Sarees are free size (5.5 m with running blouse piece). Lehengas run true with a 2-inch alteration allowance built in; cholis can be custom-stitched at checkout.",
      "Kurtas and shirts are cut to a relaxed Indian block — when between sizes, size down for kurtas and up for blazers. Waist sizes are in inches and true to measure.",
    ],
  },
  care: {
    title: "Care Guide",
    body: [
      "Silk sarees and zardozi lehengas: dry clean only, wrap in muslin, air once a season away from direct sun. Refold along different lines to protect the weave.",
      "Cotton kurtas and denims: cold machine wash inside-out, line dry in shade. Chikankari is best hand-washed gently — the embroidery repays it.",
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
