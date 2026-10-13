import { useMemo, useState, type FormEvent } from "react";
import { CATEGORIES, money, type Category, type Product } from "../data/catalog";
import { useStore, type Order, type OrderStatus, type SiteContent } from "../lib/store";
import { Link } from "../lib/router";
import { Monogram } from "../components/ui";
import {
  IconArrowR,
  IconBag,
  IconCal,
  IconCheck,
  IconChevron,
  IconClose,
  IconKey,
  IconSearch,
  IconPlus,
  IconTrash,
} from "../components/icons";

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const pillCls: Record<string, string> = {
  Pending: "bg-gold/20 text-[#7d5c1c] border-gold/50",
  Confirmed: "bg-moss/15 text-moss border-moss/50",
  Shipped: "bg-ink/10 text-ink border-ink/30",
  Delivered: "bg-moss text-paper border-moss",
  Cancelled: "bg-rouge/15 text-wine border-rouge/50",
};

const fmtDate = (isoStr: string) =>
  new Date(isoStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
  " · " +
  new Date(isoStr).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

/* ============================ LOGIN ============================ */

function Login() {
  const { login, toast } = useStore();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(0);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (login(u, p)) {
      toast("Welcome back", "Admin console unlocked.", "ok");
    } else {
      setErr(true);
      setShake((s) => s + 1);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-4 py-16 text-paper">
      <span className="outline-text-light pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display italic text-[18vw] leading-none opacity-60" aria-hidden>
        Admin
      </span>
      <div key={shake} className={`relative w-full max-w-md bg-paper p-8 text-ink md:p-10 ${shake ? "shake" : ""}`}>
        <div className="flex items-start justify-between">
          <Monogram className="text-3xl" />
          <Link to="/" className="link-line grow inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-smoke">
            Back to store <IconArrowR size={11} />
          </Link>
        </div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-wine">Admin console — restricted</p>
        <h1 className="mt-2 font-display text-4xl font-medium leading-tight">
          Manage your
          <br />
          <em className="text-wine">entire store.</em>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          Add &amp; edit products, update site content, manage orders — everything in one place.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
          <div>
            <label className="flabel" htmlFor="a-user">Username</label>
            <input
              id="a-user"
              className={`field ${err ? "err" : ""}`}
              value={u}
              onChange={(e) => { setU(e.target.value); setErr(false); }}
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="flabel" htmlFor="a-pass">Password</label>
            <input
              id="a-pass"
              type="password"
              className={`field ${err ? "err" : ""}`}
              value={p}
              onChange={(e) => { setP(e.target.value); setErr(false); }}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {err && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-wine">
              <IconClose size={12} /> Those credentials don't match.
            </p>
          )}
          <button type="submit" className="btn-fill flex w-full items-center justify-center gap-2.5 bg-ink py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-paper">
            <IconKey size={14} /> Unlock console
          </button>
        </form>

        <button
          onClick={() => { setU("admin"); setP("atelier25"); setErr(false); }}
          className="mt-5 w-full border border-dashed border-gold/60 bg-gold/10 px-4 py-3 text-left transition-colors hover:bg-gold/20"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7d5c1c]">Demo access</span>
          <span className="mt-0.5 block font-mono text-xs text-ink/80">
            user <strong>admin</strong> · pass <strong>atelier25</strong> — tap to fill
          </span>
        </button>
      </div>
    </div>
  );
}

/* ============================ DASHBOARD ============================ */

type Tab = "orders" | "products" | "content";

function Dashboard() {
  const { orders, products, content, setOrderStatus, addProduct, updateProduct, deleteProduct, updateContent, logout, resetDemo, toast, isAdmin } = useStore();
  const [tab, setTab] = useState<Tab>("orders");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const active = orders.filter((o) => o.status !== "Cancelled");
  const revenue = active.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "Pending").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const aov = active.length ? Math.round(revenue / active.length) : 0;

  const week = useMemo(() => {
    const days: { label: string; total: number; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().slice(0, 10);
      const dayOrders = orders.filter((o) => o.status !== "Cancelled" && o.createdAt.slice(0, 10) === key);
      days.push({
        label: d.toLocaleDateString("en-IN", { weekday: "short" }),
        total: dayOrders.reduce((s, o) => s + o.total, 0),
        count: dayOrders.length,
      });
    }
    return days;
  }, [orders]);
  const maxDay = Math.max(1, ...week.map((d) => d.total));

  const filteredOrders = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        o.id.toLowerCase().includes(needle) ||
        o.customer.name.toLowerCase().includes(needle) ||
        o.customer.city.toLowerCase().includes(needle) ||
        o.customer.email.toLowerCase().includes(needle)
      );
    });
  }, [orders, q, statusFilter]);

  const filteredProducts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(needle) ||
      p.category.toLowerCase().includes(needle) ||
      p.colorway.toLowerCase().includes(needle)
    );
  }, [products, q]);

  const stats = [
    { label: "Revenue", value: money(revenue), sub: `${active.length} paid orders`, icon: <IconBag size={17} /> },
    { label: "Orders", value: String(orders.length), sub: `${pending} pending`, icon: <IconCheck size={17} /> },
    { label: "Products", value: String(products.length), sub: `${delivered} delivered`, icon: <IconCal size={17} /> },
    { label: "Avg. order", value: money(aov), sub: "excl. cancelled", icon: <IconSearch size={17} /> },
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b rule bg-ink text-paper">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Monogram className="text-xl text-paper" />
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-gold sm:block">
              Admin console
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="link-line grow mr-2 hidden text-[10px] font-bold uppercase tracking-[0.18em] text-fog hover:text-paper sm:block">
              View store
            </Link>
            <span className="hidden border border-paper/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-fog md:block">
              {isAdmin ? "admin" : "staff"}
            </span>
            <button
              onClick={() => { logout(); toast("Signed out", "Console locked.", "warn"); }}
              className="flex items-center gap-1.5 bg-wine px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-rouge"
            >
              <IconKey size={12} /> Lock
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        {/* heading */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-wine">Dashboard</p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </h1>
          </div>
          <button
            onClick={() => {
              if (!confirmReset) { setConfirmReset(true); window.setTimeout(() => setConfirmReset(false), 2600); return; }
              resetDemo();
              setConfirmReset(false);
            }}
            className={`border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all ${
              confirmReset ? "border-wine bg-wine text-paper" : "border-ink/25 text-smoke hover:border-ink hover:text-ink"
            }`}
          >
            {confirmReset ? "Tap again to confirm" : "Restore demo data"}
          </button>
        </div>

        {/* stats */}
        <div className="mt-8 grid grid-cols-2 gap-px border rule bg-ink/10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper p-5 transition-colors hover:bg-bone/50 md:p-6">
              <div className="flex items-center justify-between text-smoke">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{s.label}</span>
                <span className="text-gold">{s.icon}</span>
              </div>
              <p className="mt-3 font-display text-3xl font-semibold tabular-nums md:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-[11px] text-smoke">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* revenue chart */}
        <div className="mt-6 border rule bg-paper p-5 md:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-medium">Revenue — last 7 days</h2>
            <p className="text-[11px] text-smoke">cancelled orders excluded</p>
          </div>
          <div className="mt-5 flex h-36 items-end gap-2 md:gap-3">
            {week.map((d, i) => (
              <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
                <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-ink/15 bg-ink px-2 py-1 text-[10px] font-bold text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100 tabular-nums">
                  {money(d.total)} · {d.count}
                </span>
                <div
                  className={`w-full transition-all duration-500 ${d.total > 0 ? "bg-wine group-hover:bg-ink" : "bg-ink/10"}`}
                  style={{ height: d.total > 0 ? `${Math.max(6, (d.total / maxDay) * 100)}%` : "4px" }}
                />
                <span className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-smoke">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex border rule">
            {(["orders", "products", "content"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setQ(""); setStatusFilter("All"); setExpanded(null); }}
                className={`flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  tab === t ? "bg-ink text-paper" : "text-smoke hover:text-ink"
                }`}
                aria-pressed={tab === t}
              >
                {t === "orders" && <><IconBag size={14} /> Orders <span className={`tabular-nums ${tab === t ? "text-gold" : "text-wine"}`}>{orders.length}</span></>}
                {t === "products" && <><IconSearch size={14} /> Products <span className={`tabular-nums ${tab === t ? "text-gold" : "text-wine"}`}>{products.length}</span></>}
                {t === "content" && <><IconKey size={14} /> Site content</>}
              </button>
            ))}
          </div>

          {tab !== "content" && (
            <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
              <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tab === "orders" ? "Search id, name, city…" : "Search name, category…"}
                className="field py-2.5 pl-9 text-[13px]"
                aria-label="Search"
              />
            </div>
          )}

          {tab === "orders" && (
            <div className="no-bar flex items-center gap-1.5 overflow-x-auto">
              {["All", ...ORDER_STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-all ${
                    statusFilter === s ? "border-ink bg-ink text-paper" : "border-ink/20 text-smoke hover:border-ink hover:text-ink"
                  }`}
                  aria-pressed={statusFilter === s}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {tab === "products" && (
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center gap-2 bg-wine px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-rouge"
            >
              <IconPlus size={13} /> Add product
            </button>
          )}
        </div>

        {/* ---- ORDERS TAB ---- */}
        {tab === "orders" && (
          <div className="mt-5">
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center gap-3 border rule bg-paper py-16 text-center">
                <IconSearch size={24} className="text-smoke" />
                <p className="font-display text-xl italic">No orders match that filter.</p>
              </div>
            ) : (
              <div className="border rule bg-paper">
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b rule bg-bone/50 text-left text-[10px] uppercase tracking-[0.18em] text-smoke">
                        <th className="px-4 py-3 font-bold">Order</th>
                        <th className="px-4 py-3 font-bold">Placed</th>
                        <th className="px-4 py-3 font-bold">Customer</th>
                        <th className="px-4 py-3 font-bold">Pieces</th>
                        <th className="px-4 py-3 text-right font-bold">Total</th>
                        <th className="px-4 py-3 font-bold">Payment</th>
                        <th className="px-4 py-3 font-bold">Status</th>
                        <th className="w-10" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <OrderRows
                          key={o.id}
                          o={o}
                          expanded={expanded === o.id}
                          onToggle={() => setExpanded(expanded === o.id ? null : o.id)}
                          onStatus={(s) => { setOrderStatus(o.id, s); toast(`${o.id} → ${s}`, undefined, s === "Cancelled" ? "warn" : "ok"); }}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="divide-y divide-ink/10 md:hidden">
                  {filteredOrders.map((o) => (
                    <OrderCard
                      key={o.id}
                      o={o}
                      expanded={expanded === o.id}
                      onToggle={() => setExpanded(expanded === o.id ? null : o.id)}
                      onStatus={(s) => { setOrderStatus(o.id, s); toast(`${o.id} → ${s}`, undefined, s === "Cancelled" ? "warn" : "ok"); }}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ---- PRODUCTS TAB ---- */}
        {tab === "products" && (
          <div className="mt-5">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 border rule bg-paper py-16 text-center">
                <IconSearch size={24} className="text-smoke" />
                <p className="font-display text-xl italic">No products found.</p>
              </div>
            ) : (
              <div className="border rule bg-paper">
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b rule bg-bone/50 text-left text-[10px] uppercase tracking-[0.18em] text-smoke">
                        <th className="px-4 py-3 font-bold">Product</th>
                        <th className="px-4 py-3 font-bold">Category</th>
                        <th className="px-4 py-3 font-bold">Colorway</th>
                        <th className="px-4 py-3 text-right font-bold">Price</th>
                        <th className="px-4 py-3 font-bold">Rating</th>
                        <th className="px-4 py-3 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="border-b rule transition-colors hover:bg-bone/40">
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-10 shrink-0 overflow-hidden bg-bone">
                                <img src={p.img} alt="" className="h-full w-full object-cover" style={p.filter ? { filter: p.filter } : undefined} />
                              </div>
                              <div>
                                <p className="font-semibold">{p.name}</p>
                                {p.badge && <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-wine">{p.badge}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-xs">{p.category}</td>
                          <td className="px-4 py-3.5 text-xs text-smoke">{p.colorway}</td>
                          <td className="px-4 py-3.5 text-right font-semibold tabular-nums">{money(p.price)}</td>
                          <td className="px-4 py-3.5 text-xs tabular-nums">{p.rating.toFixed(1)} ({p.reviews})</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="border rule px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${p.name}"?`)) {
                                    deleteProduct(p.id);
                                    toast("Product deleted", p.name, "warn");
                                  }
                                }}
                                className="grid h-7 w-7 place-items-center border rule text-smoke hover:bg-wine hover:text-paper hover:border-wine transition-colors"
                                aria-label={`Delete ${p.name}`}
                              >
                                <IconTrash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- CONTENT TAB ---- */}
        {tab === "content" && (
          <ContentEditor content={content} updateContent={updateContent} toast={toast} />
        )}
      </main>

      {/* Product edit modal */}
      {editingProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updates) => {
            updateProduct(editingProduct.id, updates);
            toast("Product updated", editingProduct.name, "ok");
            setEditingProduct(null);
          }}
        />
      )}

      {/* Add product modal */}
      {showAddProduct && (
        <ProductModal
          product={null}
          onClose={() => setShowAddProduct(false)}
          onSave={(data) => {
            const p = addProduct(data);
            toast("Product added", p.name, "ok");
            setShowAddProduct(false);
          }}
        />
      )}
    </div>
  );
}

/* ---- Content Editor ---- */

function ContentEditor({ content, updateContent, toast }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void; toast: (t: string, m?: string, tone?: "ok" | "warn" | "err") => void }) {
  const [form, setForm] = useState(content);
  const [tickerInput, setTickerInput] = useState(content.ticker.join("\n"));

  const save = () => {
    const ticker = tickerInput.split("\n").map((l) => l.trim()).filter(Boolean);
    updateContent({ ...form, ticker });
    toast("Content updated", "Site changes are live.", "ok");
  };

  return (
    <div className="mt-5 border rule bg-paper p-6 md:p-8">
      <h2 className="font-display text-2xl font-medium">Site content</h2>
      <p className="mt-1 text-sm text-smoke">Edit the storefront copy. Changes go live immediately.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="flabel" htmlFor="c-headline">Hero headline</label>
          <input
            id="c-headline"
            className="field"
            value={form.heroHeadline}
            onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
          />
        </div>
        <div>
          <label className="flabel" htmlFor="c-subline">Hero subline</label>
          <textarea
            id="c-subline"
            rows={3}
            className="field resize-none"
            value={form.heroSubline}
            onChange={(e) => setForm({ ...form, heroSubline: e.target.value })}
          />
        </div>
        <div>
          <label className="flabel" htmlFor="c-cta">Hero CTA text</label>
          <input
            id="c-cta"
            className="field"
            value={form.heroCta}
            onChange={(e) => setForm({ ...form, heroCta: e.target.value })}
          />
        </div>
        <div>
          <label className="flabel" htmlFor="c-ticker">Announcement ticker (one per line)</label>
          <textarea
            id="c-ticker"
            rows={5}
            className="field resize-none font-mono text-xs"
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value)}
          />
        </div>
        <div>
          <label className="flabel" htmlFor="c-tagline">Brand tagline</label>
          <input
            id="c-tagline"
            className="field"
            value={form.brandTagline}
            onChange={(e) => setForm({ ...form, brandTagline: e.target.value })}
          />
        </div>
      </div>

      <button
        onClick={save}
        className="btn-fill mt-6 flex items-center gap-2.5 bg-ink px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-paper"
      >
        <IconCheck size={14} /> Save changes
      </button>
    </div>
  );
}

/* ---- Product Modal ---- */

function ProductModal({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: (data: Omit<Product, "id">) => void }) {
  const [form, setForm] = useState<Omit<Product, "id">>(
    product ?? {
      name: "",
      category: "Kurtas & Sets" as Category,
      price: 0,
      colorway: "",
      img: "",
      fabric: "",
      details: "",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.5,
      reviews: 0,
    }
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-ink/60" onClick={onClose} aria-label="Close" />
      <form onSubmit={submit} className="pop relative max-h-[85vh] w-full max-w-lg overflow-y-auto bg-paper p-6 text-ink md:p-8">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center border rule hover:bg-ink hover:text-paper transition-colors" aria-label="Close">
          <IconClose size={15} />
        </button>
        <h2 className="font-display text-2xl font-medium">{product ? "Edit product" : "Add new product"}</h2>
        <div className="mt-5 space-y-4">
          <div>
            <label className="flabel">Name</label>
            <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flabel">Category</label>
              <select className="field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="flabel">Price (₹)</label>
              <input type="number" className="field" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            </div>
          </div>
          <div>
            <label className="flabel">Colorway</label>
            <input className="field" value={form.colorway} onChange={(e) => setForm({ ...form, colorway: e.target.value })} required />
          </div>
          <div>
            <label className="flabel">Image URL</label>
            <input className="field" value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="https://..." required />
          </div>
          <div>
            <label className="flabel">Fabric</label>
            <input className="field" value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} />
          </div>
          <div>
            <label className="flabel">Details</label>
            <textarea rows={3} className="field resize-none" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flabel">Rating</label>
              <input type="number" step="0.1" min="0" max="5" className="field" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </div>
            <div>
              <label className="flabel">Reviews</label>
              <input type="number" className="field" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: Number(e.target.value) })} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn-fill mt-6 flex w-full items-center justify-center gap-2.5 bg-ink py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-paper">
          {product ? "Save changes" : "Add product"}
        </button>
      </form>
    </div>
  );
}

/* ---- Order components ---- */

function StatusPill({ s }: { s: string }) {
  return (
    <span className={`inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${pillCls[s] ?? "border-ink/30"}`}>
      {s}
    </span>
  );
}

function StatusSelect({ value, onChange }: { value: OrderStatus; onChange: (s: OrderStatus) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as OrderStatus)}
      className={`cursor-pointer border px-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${pillCls[value] ?? ""}`}
      aria-label="Change status"
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

const chevronBtn = (open: boolean) => (
  <span className={`grid h-7 w-7 place-items-center border rule text-smoke transition-transform duration-300 ${open ? "rotate-180 border-ink text-ink" : ""}`}>
    <IconChevron size={14} />
  </span>
);

function OrderRows({ o, expanded, onToggle, onStatus }: { o: Order; expanded: boolean; onToggle: () => void; onStatus: (s: OrderStatus) => void }) {
  return (
    <>
      <tr className="cursor-pointer border-b rule transition-colors hover:bg-bone/40" onClick={onToggle}>
        <td className="px-4 py-3.5 font-mono text-xs font-bold">{o.id}</td>
        <td className="whitespace-nowrap px-4 py-3.5 text-xs text-smoke">{fmtDate(o.createdAt)}</td>
        <td className="px-4 py-3.5">
          <span className="font-semibold">{o.customer.name}</span>
          <span className="block text-[11px] text-smoke">{o.customer.city}, {o.customer.country}</span>
        </td>
        <td className="px-4 py-3.5 tabular-nums">{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
        <td className="px-4 py-3.5 text-right font-semibold tabular-nums">{money(o.total)}</td>
        <td className="px-4 py-3.5 text-xs text-smoke">{o.payment}</td>
        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
          <StatusSelect value={o.status} onChange={onStatus} />
        </td>
        <td className="px-2 py-3.5">{chevronBtn(expanded)}</td>
      </tr>
      <tr className={`border-b rule bg-bone/30 transition-all ${expanded ? "" : "hidden"}`}>
        <td colSpan={8} className="px-4 py-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="flabel">Pieces</p>
              <ul className="mt-1 space-y-1.5 text-sm">
                {o.items.map((i) => (
                  <li key={`${i.productId}-${i.size}`} className="flex justify-between gap-4">
                    <span>{i.qty} × {i.name} <span className="text-smoke">— {i.colorway}, {i.size}</span></span>
                    <span className="tabular-nums">{money(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flabel">Ship to</p>
              <p className="mt-1 text-sm">{o.customer.address}, {o.customer.zip} {o.customer.city}</p>
              <p className="mt-2 text-sm text-smoke">{o.customer.email} · {o.customer.phone}</p>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

function OrderCard({ o, expanded, onToggle, onStatus }: { o: Order; expanded: boolean; onToggle: () => void; onStatus: (s: OrderStatus) => void }) {
  return (
    <li className="p-4">
      <button className="flex w-full items-center justify-between gap-3 text-left" onClick={onToggle} aria-expanded={expanded}>
        <div>
          <p className="font-mono text-xs font-bold">{o.id} <span className="ml-2 font-body font-normal text-smoke">{fmtDate(o.createdAt)}</span></p>
          <p className="mt-1 font-display text-lg leading-tight">{o.customer.name}</p>
          <p className="text-[11px] text-smoke">{o.customer.city} · {o.items.reduce((s, i) => s + i.qty, 0)} items</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-semibold tabular-nums">{money(o.total)}</span>
          <StatusPill s={o.status} />
        </div>
      </button>
      <div className={`grid transition-all duration-300 ${expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <ul className="space-y-1 text-sm">
            {o.items.map((i) => (
              <li key={`${i.productId}-${i.size}`} className="flex justify-between gap-3">
                <span>{i.qty} × {i.name} <span className="text-smoke">({i.colorway}, {i.size})</span></span>
                <span className="tabular-nums">{money(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-smoke">{o.customer.address}, {o.customer.city} · {o.customer.phone}</p>
          <div className="mt-3">
            <StatusSelect value={o.status} onChange={onStatus} />
          </div>
        </div>
      </div>
    </li>
  );
}

/* ============================ PAGE ============================ */

export function Admin() {
  const { isAdmin } = useStore();
  return isAdmin ? <Dashboard /> : <Login />;
}
