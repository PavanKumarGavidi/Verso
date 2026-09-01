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
  const o1i = [line("banarasi-rani", "Free size", 1), line("chikankari-ivory", "M", 1)];
  const o2i = [line("meera-maroon", "M", 1)];
  const o3i = [line("navy-blazer", "40", 1), line("ivory-shirt", "M", 2)];
  const o4i = [line("anarkali-haldi", "S", 1), line("dilli-kurti", "M", 1)];
  const o5i = [line("nehru-indigo", "40", 1), line("charcoal-trouser", "32", 1)];
  const o6i = [line("banarasi-sona", "Free size", 1)];
  return [
    {
      id: "VS-20238",
      createdAt: iso(0, 9, 42),
      customer: { name: "Ananya Sharma", email: "ananya.sharma@gmail.com", phone: "+91 98201 14432", address: "B-1402, Oberoi Splendor, Goregaon East", city: "Mumbai", zip: "400063", country: "India" },
      items: o1i, payment: "UPI", shippingMethod: "Standard", status: "Pending",
      ...totals(o1i, 0),
    },
    {
      id: "VS-20237",
      createdAt: iso(1, 16, 5),
      customer: { name: "Ishita Patel", email: "ishita.p@outlook.in", phone: "+91 99250 33871", address: "12, Vrundavan Society, Satellite", city: "Ahmedabad", zip: "380015", country: "India" },
      items: o2i, payment: "Card", shippingMethod: "Express", status: "Confirmed",
      ...totals(o2i, 249),
    },
    {
      id: "VS-20236",
      createdAt: iso(2, 12, 47),
      customer: { name: "Rohan Mehta", email: "rohan.mehta@proton.me", phone: "+91 98450 77210", address: "74, 4th Cross, Indiranagar", city: "Bengaluru", zip: "560038", country: "India" },
      items: o3i, payment: "UPI", shippingMethod: "Standard", status: "Shipped",
      ...totals(o3i, 0),
    },
    {
      id: "VS-20233",
      createdAt: iso(3, 10, 12),
      customer: { name: "Kavya Reddy", email: "kavya.reddy@yahoo.in", phone: "+91 90000 45112", address: "Plot 21, Jubilee Hills, Road No. 10", city: "Hyderabad", zip: "500033", country: "India" },
      items: o4i, payment: "Cash on delivery", shippingMethod: "Standard", status: "Confirmed",
      ...totals(o4i, 0),
    },
    {
      id: "VS-20231",
      createdAt: iso(5, 14, 33),
      customer: { name: "Arjun Nair", email: "arjun.nair@gmail.com", phone: "+91 98951 20876", address: "33/1147, Panampilly Nagar", city: "Kochi", zip: "682036", country: "India" },
      items: o5i, payment: "Card", shippingMethod: "Express", status: "Delivered",
      ...totals(o5i, 249),
    },
    {
      id: "VS-20229",
      createdAt: iso(6, 9, 5),
      customer: { name: "Meera Iyer", email: "meera.iyer@gmail.com", phone: "+91 94441 89032", address: "8, Harrington Road, Chetpet", city: "Chennai", zip: "600031", country: "India" },
      items: o6i, payment: "UPI", shippingMethod: "Standard", status: "Cancelled",
      ...totals(o6i, 0),
    },
  ];
}

export function seedAppointments(): Appointment[] {
  /* Online-only store — no in-person bookings. Kept for type compatibility. */
  return [];
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
      const items: OrderItem[] = cart.filter((l) => byId.has(l.productId)).map((l) => {
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

export const FREE_SHIP_AT = 1999;
