import { useMemo, useState, type FormEvent } from "react";
import { money } from "../data/catalog";
import { useStore, type Order, type OrderStatus } from "../lib/store";
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
      toast("Welcome back", "Staff console unlocked.", "ok");
    } else {
      setErr(true);
      setShake((s) => s + 1);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-4 py-16 text-paper">
      <span className="outline-text-light pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display italic text-[18vw] leading-none opacity-60" aria-hidden>
        Staff
      </span>
      <div key={shake} className={`relative w-full max-w-md bg-paper p-8 text-ink md:p-10 ${shake ? "shake" : ""}`}>
        <div className="flex items-start justify-between">
          <Monogram className="text-3xl" />
          <Link to="/" className="link-line grow inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-smoke">
            Back to store <IconArrowR size={11} />
          </Link>
        </div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-wine">Staff console — restricted</p>
        <h1 className="mt-2 font-display text-4xl font-medium leading-tight">
          Every order,
          <br />
          <em className="text-wine">end to end.</em>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          Sign in to review each order placed on the store — confirm it, ship it, mark it delivered
          or cancel, and watch the day’s takings move.
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
              <IconClose size={12} /> Those credentials don’t match our register.
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

function Dashboard() {
  const { orders, setOrderStatus, logout, resetDemo, toast, isAdmin } = useStore();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

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

  const stats = [
    { label: "Gross revenue", value: money(revenue), sub: `${active.length} paid orders`, icon: <IconBag size={17} /> },
    { label: "Orders", value: String(orders.length), sub: `${pending} awaiting confirmation`, icon: <IconCheck size={17} /> },
    { label: "Delivered", value: String(delivered), sub: "this trailing week", icon: <IconCal size={17} /> },
    { label: "Avg. order", value: money(aov), sub: "excluding cancelled", icon: <IconSearch size={17} /> },
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b rule bg-ink text-paper">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Monogram className="text-xl text-paper" />
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-gold sm:block">
              Staff console
            </span>
            <span className="hidden items-center gap-1.5 text-[10px] text-smoke md:flex">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-moss" /> live
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
              onClick={() => { logout(); toast("Signed out", "The console is locked again.", "warn"); }}
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
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-wine">The day book</p>
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
                  {money(d.total)} · {d.count} ord.
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

        {/* filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 border rule bg-ink px-5 py-3 text-paper">
            <IconBag size={15} className="text-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
              All orders <span className="text-gold tabular-nums">{orders.length}</span>
            </span>
          </div>

          <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search id, name, city…"
              className="field py-2.5 pl-9 text-[13px]"
              aria-label="Search orders"
            />
          </div>

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
        </div>

        {/* orders table */}
        <div className="mt-5">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border rule bg-paper py-16 text-center">
              <IconSearch size={24} className="text-smoke" />
              <p className="font-display text-xl italic">No orders match that filter.</p>
            </div>
          ) : (
            <div className="border rule bg-paper">
              {/* desktop table */}
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
              {/* mobile cards */}
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
          <p className="mt-4 text-xs text-smoke">
            Orders arrive live from the storefront checkout — UPI, card and cash-on-delivery. Status
            changes are saved and sync back to the demo data on restore.
          </p>
        </div>
      </main>
    </div>
  );
}

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
                <li className="flex justify-between border-t rule pt-1.5 text-xs text-smoke">
                  <span>Shipping ({o.shippingMethod})</span><span className="tabular-nums">{o.shipping === 0 ? "Free" : money(o.shipping)}</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="flabel">Ship to</p>
              <p className="mt-1 text-sm">{o.customer.address}, {o.customer.zip} {o.customer.city}, {o.customer.country}</p>
              <p className="mt-2 text-sm text-smoke">{o.customer.email} · {o.customer.phone}</p>
              {o.customer.notes && <p className="mt-2 border-l-2 border-gold pl-3 text-xs italic text-ink/70">“{o.customer.notes}”</p>}
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
          <p className="text-[11px] text-smoke">{o.customer.city}, {o.customer.country} · {o.items.reduce((s, i) => s + i.qty, 0)} items</p>
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
          <p className="mt-2 text-xs text-smoke">{o.customer.address}, {o.customer.zip} {o.customer.city} · {o.customer.phone}</p>
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
