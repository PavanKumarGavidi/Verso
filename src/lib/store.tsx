import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ADMIN_PASS,
  ADMIN_USER,
  DEFAULT_PRODUCTS,
  DEFAULT_TICKER,
  type Product,
} from "../data/catalog";

/* ---------------- types ---------------- */

export type CartLine = { productId: string; size: string; qty: number };

export type OrderItem = {
  productId: string;
  name: string;
  colorway: string;
  size: string;
  qty: number;
  price: number;
};

export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  shippingMethod: string;
  total: number;
  payment: string;
  status: OrderStatus;
};

export type SiteContent = {
  heroHeadline: string;
  heroSubline: string;
  heroCta: string;
  ticker: string[];
  brandTagline: string;
};

export type Toast = {
  id: number;
  title: string;
  msg?: string;
  tone: "ok" | "warn" | "err";
};

/* ---------------- persistence ---------------- */

const K = {
  cart: "vasana.cart",
  wishlist: "vasana.wishlist",
  orders: "vasana.orders",
  products: "vasana.products",
  content: "vasana.content",
  admin: "vasana.admin",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked */
  }
}

/* ---------------- seed data ---------------- */

const day = 24 * 60 * 60 * 1000;
const iso = (offsetDays: number, hour = 11, min = 20) => {
  const d = new Date(Date.now() - offsetDays * day);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
};

const DEFAULT_CONTENT: SiteContent = {
  heroHeadline: "Dressed in quiet intent.",
  heroSubline:
    "Sherwanis to boardroom blazers — the complete Indian menswear wardrobe, online only. Handloom from the weaver, dispatched from Jaipur, delivered to all 27 states in 48 hours.",
  heroCta: "Shop Festive",
  ticker: DEFAULT_TICKER,
  brandTagline: "Indian menswear online",
};

function seedOrders(): Order[] {
  const byId = new Map(DEFAULT_PRODUCTS.map((p) => [p.id, p]));
  const line = (id: string, size: string, qty: number) => {
    const p = byId.get(id)!;
    return { productId: id, name: p.name, colorway: p.colorway, size, qty, price: p.price };
  };
  const totals = (items: OrderItem[], shipping: number) => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const o1 = [line("kurta-ivory-chikan", "M", 1), line("nehru-indigo", "40", 1)];
  const o2 = [line("sher-maroon", "42", 1)];
  const o3 = [line("blazer-navy", "40", 1), line("shirt-ivory", "L", 2)];
  const o4 = [line("kurta-haldi", "S", 1), line("casual-linen-kurta", "M", 1)];
  const o5 = [line("jodhpuri-cream", "42", 1), line("trouser-charcoal", "34", 1)];
  const o6 = [line("kurta-indigo", "L", 1)];

  return [
    {
      id: "VS-20238",
      createdAt: iso(0, 9, 42),
      customer: { name: "Arjun Sharma", email: "arjun.sharma@gmail.com", phone: "+91 98201 14432", address: "B-1402, Oberoi Splendor, Goregaon East", city: "Mumbai", zip: "400063", country: "India" },
      items: o1, payment: "UPI", shippingMethod: "Standard", status: "Pending",
      ...totals(o1, 0),
    },
    {
      id: "VS-20237",
      createdAt: iso(1, 16, 5),
      customer: { name: "Rohan Mehta", email: "rohan.m@outlook.in", phone: "+91 99250 33871", address: "12, Vrundavan Society, Satellite", city: "Ahmedabad", zip: "380015", country: "India" },
      items: o2, payment: "Card", shippingMethod: "Express", status: "Confirmed",
      ...totals(o2, 249),
    },
    {
      id: "VS-20236",
      createdAt: iso(2, 12, 47),
      customer: { name: "Vikram Singh", email: "vikram.singh@proton.me", phone: "+91 98450 77210", address: "74, 4th Cross, Indiranagar", city: "Bengaluru", zip: "560038", country: "India" },
      items: o3, payment: "UPI", shippingMethod: "Standard", status: "Shipped",
      ...totals(o3, 0),
    },
    {
      id: "VS-20233",
      createdAt: iso(3, 10, 12),
      customer: { name: "Karan Patel", email: "karan.p@yahoo.in", phone: "+91 90000 45112", address: "Plot 21, Jubilee Hills, Road No. 10", city: "Hyderabad", zip: "500033", country: "India" },
      items: o4, payment: "Cash on delivery", shippingMethod: "Standard", status: "Confirmed",
      ...totals(o4, 0),
    },
    {
      id: "VS-20231",
      createdAt: iso(5, 14, 33),
      customer: { name: "Aditya Nair", email: "aditya.nair@gmail.com", phone: "+91 98951 20876", address: "33/1147, Panampilly Nagar", city: "Kochi", zip: "682036", country: "India" },
      items: o5, payment: "Card", shippingMethod: "Express", status: "Delivered",
      ...totals(o5, 249),
    },
    {
      id: "VS-20229",
      createdAt: iso(6, 9, 5),
      customer: { name: "Siddharth Iyer", email: "sid.iyer@gmail.com", phone: "+91 94441 89032", address: "8, Harrington Road, Chetpet", city: "Chennai", zip: "600031", country: "India" },
      items: o6, payment: "UPI", shippingMethod: "Standard", status: "Cancelled",
      ...totals(o6, 0),
    },
  ];
}

/* ---------------- context ---------------- */

type Store = {
  products: Product[];
  byId: Map<string, Product>;
  content: SiteContent;
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  isAdmin: boolean;
  toasts: Toast[];
  cartOpen: boolean;
  quickViewId: string | null;
  cartCount: number;
  cartSubtotal: number;
  setCartOpen: (v: boolean) => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  addToCart: (productId: string, size: string, qty?: number, silent?: boolean) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  removeLine: (productId: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  placeOrder: (
    customer: Order["customer"],
    payment: string,
    shippingMethod: string,
    shipping: number
  ) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  toast: (title: string, msg?: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
  /* CMS actions */
  addProduct: (p: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateContent: (updates: Partial<SiteContent>) => void;
  resetDemo: () => void;
};

const Ctx = createContext<Store | null>(null);

let toastSeq = 1;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load(K.products, DEFAULT_PRODUCTS));
  const [content, setContent] = useState<SiteContent>(() => load(K.content, DEFAULT_CONTENT));
  const [cart, setCart] = useState<CartLine[]>(() => load(K.cart, []));
  const [wishlist, setWishlist] = useState<string[]>(() => load(K.wishlist, []));
  const [orders, setOrders] = useState<Order[]>(() => load(K.orders, seedOrders()));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => load(K.admin, false));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => save(K.products, products), [products]);
  useEffect(() => save(K.content, content), [content]);
  useEffect(() => save(K.cart, cart), [cart]);
  useEffect(() => save(K.wishlist, wishlist), [wishlist]);
  useEffect(() => save(K.orders, orders), [orders]);
  useEffect(() => save(K.admin, isAdmin), [isAdmin]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  const toast = useCallback((title: string, msg?: string, tone: Toast["tone"] = "ok") => {
    const id = toastSeq++;
    setToasts((t) => [...t.slice(-2), { id, title, msg, tone }]);
    const timer = window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3800);
    timers.current.push(timer);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const addToCart = useCallback(
    (productId: string, size: string, qty = 1, silent = false) => {
      setCart((c) => {
        const found = c.find((l) => l.productId === productId && l.size === size);
        if (found) return c.map((l) => (l === found ? { ...l, qty: Math.min(9, l.qty + qty) } : l));
        return [...c, { productId, size, qty: Math.min(9, qty) }];
      });
      if (!silent) {
        const p = byId.get(productId);
        toast("Added to bag", `${p?.name ?? "Item"} — ${size}`, "ok");
      }
    },
    [toast, byId]
  );

  const setQty = useCallback((productId: string, size: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => !(l.productId === productId && l.size === size))
        : c.map((l) =>
            l.productId === productId && l.size === size ? { ...l, qty: Math.min(9, qty) } : l
          )
    );
  }, []);

  const removeLine = useCallback((productId: string, size: string) => {
    setCart((c) => c.filter((l) => !(l.productId === productId && l.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const has = w.includes(id);
        const p = byId.get(id);
        toast(has ? "Removed from saved" : "Saved for later", p ? `${p.name} — ${p.colorway}` : undefined, has ? "warn" : "ok");
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [toast, byId]
  );

  const placeOrder = useCallback(
    (customer: Order["customer"], payment: string, shippingMethod: string, shipping: number): Order => {
      const items: OrderItem[] = cart
        .filter((l) => byId.has(l.productId))
        .map((l) => {
          const p = byId.get(l.productId)!;
          return { productId: p.id, name: p.name, colorway: p.colorway, size: l.size, qty: l.qty, price: p.price };
        });
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      const order: Order = {
        id: `VS-${10000 + Math.floor(Math.random() * 89999)}`,
        createdAt: new Date().toISOString(),
        customer,
        items,
        subtotal,
        shipping,
        total: subtotal + shipping,
        payment,
        shippingMethod,
        status: "Pending",
      };
      setOrders((o) => [order, ...o]);
      setCart([]);
      return order;
    },
    [cart, byId]
  );

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
  }, []);

  const login = useCallback((u: string, p: string) => {
    if (u.trim().toLowerCase() === ADMIN_USER && p === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  /* ---- CMS actions ---- */
  const addProduct = useCallback((p: Omit<Product, "id">): Product => {
    const product: Product = { ...p, id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
    setProducts((list) => [product, ...list]);
    return product;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((list) => list.filter((p) => p.id !== id));
  }, []);

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setContent((c) => ({ ...c, ...updates }));
  }, []);

  const resetDemo = useCallback(() => {
    setProducts(DEFAULT_PRODUCTS);
    setContent(DEFAULT_CONTENT);
    setOrders(seedOrders());
    toast("Demo data restored", "Products, content and orders reset.", "ok");
  }, [toast]);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((s, l) => s + (byId.get(l.productId)?.price ?? 0) * l.qty, 0),
    [cart, byId]
  );

  const value: Store = {
    products, byId, content, cart, wishlist, orders, isAdmin, toasts, cartOpen, quickViewId, cartCount, cartSubtotal,
    setCartOpen, openQuickView: setQuickViewId, closeQuickView: () => setQuickViewId(null),
    addToCart, setQty, removeLine, clearCart, toggleWishlist,
    placeOrder, setOrderStatus, login, logout, toast, dismissToast,
    addProduct, updateProduct, deleteProduct, updateContent, resetDemo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

export const FREE_SHIP_AT = 1999;
