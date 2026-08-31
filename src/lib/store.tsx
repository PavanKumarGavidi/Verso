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
import { ADMIN_PASS, ADMIN_USER, byId } from "../data/catalog";

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

export type ApptStatus = "Requested" | "Confirmed" | "Completed" | "Cancelled";

export type Appointment = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  store: string;
  visitDate: string;
  visitTime: string;
  notes?: string;
  status: ApptStatus;
};

export type Toast = {
  id: number;
  title: string;
  msg?: string;
  tone: "ok" | "warn" | "err";
};

/* ---------------- persistence ---------------- */

const K = {
  cart: "verso.cart",
  wishlist: "verso.wishlist",
  orders: "verso.orders",
  appts: "verso.appts",
  admin: "verso.admin",
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
    /* storage full or blocked — non-fatal */
  }
}

/* ---------------- seed data ---------------- */

const day = 24 * 60 * 60 * 1000;
const iso = (offsetDays: number, hour = 11, min = 20) => {
  const d = new Date(Date.now() - offsetDays * day);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
};

const line = (id: string, size: string, qty: number): OrderItem => {
  const p = byId.get(id)!;
  return { productId: id, name: p.name, colorway: p.colorway, size, qty, price: p.price };
};

const totals = (items: OrderItem[], shipping: number) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  return { subtotal, shipping, total: subtotal + shipping };
};

export function seedOrders(): Order[] {
  const o1i = [line("marlow-charcoal", "M", 1), line("rowan-blanc", "S", 1)];
  const o2i = [line("ashford-oat", "L", 2), line("kent-ink", "32", 1)];
  const o3i = [line("vesper-choc", "M", 1), line("lennox-tan", "39", 1)];
  const o4i = [line("hollis-brun", "M", 1)];
  const o5i = [line("ashford-espresso", "S", 1), line("kent-stone", "28", 1)];
  const o6i = [line("marlow-charcoal", "L", 1)];
  return [
    {
      id: "VS-10238",
      createdAt: iso(0, 9, 42),
      customer: { name: "Amara Osei", email: "amara.osei@post.com", phone: "+44 7911 284 501", address: "18 Chiltern Street", city: "London", zip: "W1U 7PY", country: "United Kingdom" },
      items: o3i, payment: "Card", shippingMethod: "Express", status: "Pending",
      ...totals(o3i, 24),
    },
    {
      id: "VS-10237",
      createdAt: iso(1, 16, 5),
      customer: { name: "Daniel Reyes", email: "d.reyes@correo.mx", phone: "+52 55 1180 2294", address: "Av. Álvaro Obregón 256", city: "Mexico City", zip: "06700", country: "Mexico" },
      items: o2i, payment: "Card", shippingMethod: "Standard", status: "Confirmed",
      ...totals(o2i, 0),
    },
    {
      id: "VS-10236",
      createdAt: iso(2, 12, 47),
      customer: { name: "Claire Moreau", email: "claire.moreau@orange.fr", phone: "+33 6 12 44 90 31", address: "27 Rue des Martyrs", city: "Paris", zip: "75009", country: "France" },
      items: o1i, payment: "Cash on delivery", shippingMethod: "Standard", status: "Shipped",
      ...totals(o1i, 0),
    },
    {
      id: "VS-10233",
      createdAt: iso(3, 10, 12),
      customer: { name: "Sofia Lindqvist", email: "sofia.l@telia.se", phone: "+46 70 312 55 19", address: "Kommendörsgatan 12", city: "Stockholm", zip: "114 48", country: "Sweden" },
      items: o6i, payment: "Card", shippingMethod: "Standard", status: "Confirmed",
      ...totals(o6i, 0),
    },
    {
      id: "VS-10231",
      createdAt: iso(5, 14, 33),
      customer: { name: "Jonas Weber", email: "j.weber@gmx.de", phone: "+49 151 2903 887", address: "Torstraße 101", city: "Berlin", zip: "10119", country: "Germany" },
      items: o4i, payment: "Card", shippingMethod: "Express", status: "Delivered",
      ...totals(o4i, 24),
    },
    {
      id: "VS-10229",
      createdAt: iso(6, 9, 5),
      customer: { name: "Priya Nair", email: "priya.nair@in.com", phone: "+91 98 2011 4432", address: "14 Cuffe Parade", city: "Mumbai", zip: "400005", country: "India" },
      items: o5i, payment: "Card", shippingMethod: "Standard", status: "Cancelled",
      ...totals(o5i, 0),
    },
  ];
}

export function seedAppointments(): Appointment[] {
  const future = (days: number) => {
    const d = new Date(Date.now() + days * day);
    return d.toISOString().slice(0, 10);
  };
  return [
    {
      id: "PF-512",
      createdAt: iso(0, 8, 15),
      name: "Elena Duarte",
      email: "elena.duarte@sapo.pt",
      phone: "+351 912 445 019",
      service: "Wardrobe consultation",
      store: "Porto",
      visitDate: future(1),
      visitTime: "11:00",
      notes: "Autumn capsule — mostly neutrals, one statement coat.",
      status: "Requested",
    },
    {
      id: "PF-511",
      createdAt: iso(1, 15, 40),
      name: "Marc Aubert",
      email: "marc.aubert@free.fr",
      phone: "+33 7 68 20 91 45",
      service: "Made-to-measure",
      store: "Paris",
      visitDate: future(3),
      visitTime: "15:00",
      notes: "Second fitting for the navy double-breasted.",
      status: "Confirmed",
    },
    {
      id: "PF-509",
      createdAt: iso(3, 11, 2),
      name: "Ingrid Holm",
      email: "ingrid.holm@post.dk",
      phone: "+45 28 71 90 34",
      service: "Occasion dressing",
      store: "Copenhagen",
      visitDate: future(-2),
      visitTime: "16:00",
      status: "Completed",
    },
  ];
}

/* ---------------- context ---------------- */

type Store = {
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  appointments: Appointment[];
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
  addAppointment: (a: Omit<Appointment, "id" | "createdAt" | "status">) => Appointment;
  setApptStatus: (id: string, status: ApptStatus) => void;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  toast: (title: string, msg?: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
  resetDemo: () => void;
};

const Ctx = createContext<Store | null>(null);

let toastSeq = 1;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load(K.cart, []));
  const [wishlist, setWishlist] = useState<string[]>(() => load(K.wishlist, []));
  const [orders, setOrders] = useState<Order[]>(() => {
    const existing = load<Order[] | null>(K.orders, null);
    return existing ?? seedOrders();
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const existing = load<Appointment[] | null>(K.appts, null);
    return existing ?? seedAppointments();
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => load(K.admin, false));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => save(K.cart, cart), [cart]);
  useEffect(() => save(K.wishlist, wishlist), [wishlist]);
  useEffect(() => save(K.orders, orders), [orders]);
  useEffect(() => save(K.appts, appointments), [appointments]);
  useEffect(() => save(K.admin, isAdmin), [isAdmin]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

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
        if (found)
          return c.map((l) =>
            l === found ? { ...l, qty: Math.min(9, l.qty + qty) } : l
          );
        return [...c, { productId, size, qty: Math.min(9, qty) }];
      });
      if (!silent) {
        const p = byId.get(productId);
        toast("Added to bag", `${p?.name ?? "Item"} — ${size}`, "ok");
      }
    },
    [toast]
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
        toast(
          has ? "Removed from saved" : "Saved for later",
          p ? `${p.name} — ${p.colorway}` : undefined,
          has ? "warn" : "ok"
        );
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [toast]
  );

  const placeOrder = useCallback(
    (customer: Order["customer"], payment: string, shippingMethod: string, shipping: number): Order => {
      const items: OrderItem[] = cart.map((l) => {
        const p = byId.get(l.productId)!;
        return {
          productId: p.id,
          name: p.name,
          colorway: p.colorway,
          size: l.size,
          qty: l.qty,
          price: p.price,
        };
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
    [cart]
  );

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
  }, []);

  const addAppointment = useCallback(
    (a: Omit<Appointment, "id" | "createdAt" | "status">): Appointment => {
      const appt: Appointment = {
        ...a,
        id: `PF-${500 + Math.floor(Math.random() * 499)}`,
        createdAt: new Date().toISOString(),
        status: "Requested",
      };
      setAppointments((list) => [appt, ...list]);
      return appt;
    },
    []
  );

  const setApptStatus = useCallback((id: string, status: ApptStatus) => {
    setAppointments((list) => list.map((x) => (x.id === id ? { ...x, status } : x)));
  }, []);

  const login = useCallback((u: string, p: string) => {
    if (u.trim().toLowerCase() === ADMIN_USER && p === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  const resetDemo = useCallback(() => {
    setOrders(seedOrders());
    setAppointments(seedAppointments());
    toast("Demo data restored", "Sample orders and bookings reloaded.", "ok");
  }, [toast]);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((s, l) => s + (byId.get(l.productId)?.price ?? 0) * l.qty, 0),
    [cart]
  );

  const value: Store = {
    cart,
    wishlist,
    orders,
    appointments,
    isAdmin,
    toasts,
    cartOpen,
    quickViewId,
    cartCount,
    cartSubtotal,
    setCartOpen,
    openQuickView: setQuickViewId,
    closeQuickView: () => setQuickViewId(null),
    addToCart,
    setQty,
    removeLine,
    clearCart,
    toggleWishlist,
    placeOrder,
    setOrderStatus,
    addAppointment,
    setApptStatus,
    login,
    logout,
    toast,
    dismissToast,
    resetDemo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

export const FREE_SHIP_AT = 250;
