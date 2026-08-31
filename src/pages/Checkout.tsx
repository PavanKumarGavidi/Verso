import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { byId, money } from "../data/catalog";
import { FREE_SHIP_AT, useStore, type Order } from "../lib/store";
import { Link } from "../lib/router";
import { IconArrowR, IconCheck, IconHanger, IconKey } from "../components/icons";

const COUNTRIES = ["Portugal", "France", "United Kingdom", "Germany", "Spain", "Italy", "Sweden", "Denmark", "Netherlands", "United States", "Mexico", "India", "Other"];

type Form = {
  name: string; email: string; phone: string;
  address: string; city: string; zip: string; country: string; notes: string;
  cardName: string; cardNumber: string; expiry: string; cvc: string;
};

const EMPTY: Form = { name: "", email: "", phone: "", address: "", city: "", zip: "", country: "Portugal", notes: "", cardName: "", cardNumber: "", expiry: "", cvc: "" };

export function Checkout() {
  const { cart, cartSubtotal, placeOrder, toast } = useStore();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [shipMethod, setShipMethod] = useState<"Standard" | "Express">("Standard");
  const [payment, setPayment] = useState<"Card" | "Cash on delivery">("Card");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<Order | null>(null);

  const shipping = shipMethod === "Express" ? 24 : cartSubtotal >= FREE_SHIP_AT ? 0 : 12;
  const total = cartSubtotal + shipping;

  const set = (k: keyof Form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof Form, string>> = {};
    if (form.name.trim().length < 2) errs.name = "Who is this order for?";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "We need a valid email for the receipt.";
    if (form.phone.trim().replace(/\D/g, "").length < 7) errs.phone = "A reachable phone number, please.";
    if (form.address.trim().length < 5) errs.address = "Street and number.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.zip.trim()) errs.zip = "Postcode is required.";
    if (payment === "Card") {
      if (form.cardName.trim().length < 2) errs.cardName = "Name on card.";
      if (form.cardNumber.replace(/\s/g, "").length !== 16) errs.cardNumber = "16 digits.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errs.expiry = "MM/YY";
      if (!/^\d{3,4}$/.test(form.cvc)) errs.cvc = "3–4 digits";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast("Almost there", "A few fields need attention before we can place the order.", "warn");
      return;
    }

    setPlacing(true);
    window.setTimeout(() => {
      const order = placeOrder(
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          zip: form.zip.trim(),
          country: form.country,
          notes: form.notes.trim() || undefined,
        },
        payment,
        shipMethod,
        shipping
      );
      setPlacing(false);
      setPlaced(order);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast("Order placed", `${order.id} — thank you, ${order.customer.name.split(" ")[0]}.`, "ok");
    }, 900);
  };

  /* ---------- success ---------- */
  if (placed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <div className="rise border rule bg-bone/40 p-7 md:p-12">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center border-2 border-moss text-moss"><IconCheck size={26} /></span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-wine">Order confirmed</p>
              <h1 className="font-display text-3xl font-medium md:text-5xl">{placed.id}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/75">
            Thank you, {placed.customer.name.split(" ")[0]}. Your pieces are being pressed and paper-wrapped
            in Porto. A receipt is on its way to <strong>{placed.customer.email}</strong> — our team confirms
            within a few hours ({placed.status.toLowerCase()} right now).
          </p>
          <div className="mt-8 grid gap-px border rule bg-ink/10 md:grid-cols-2">
            <div className="bg-paper p-5">
              <p className="flabel">Deliver to</p>
              <p className="text-sm font-semibold">{placed.customer.name}</p>
              <p className="text-sm text-ink/70">{placed.customer.address}</p>
              <p className="text-sm text-ink/70">{placed.customer.zip} {placed.customer.city}, {placed.customer.country}</p>
            </div>
            <div className="bg-paper p-5">
              <p className="flabel">Summary</p>
              <ul className="space-y-1.5 text-sm">
                {placed.items.map((i) => (
                  <li key={`${i.productId}-${i.size}`} className="flex justify-between gap-3">
                    <span className="text-ink/80">{i.qty} × {i.name} <span className="text-smoke">({i.colorway}, {i.size})</span></span>
                    <span className="tabular-nums">{money(i.price * i.qty)}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t rule pt-1.5 text-smoke"><span>Shipping — {placed.shippingMethod}</span><span className="tabular-nums">{placed.shipping === 0 ? "Free" : money(placed.shipping)}</span></li>
                <li className="flex justify-between font-semibold"><span>Total — {placed.payment}</span><span className="tabular-nums">{money(placed.total)}</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-5">
            <Link to="/shop" className="btn-fill inline-flex items-center gap-2.5 bg-ink px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
              Continue browsing <IconArrowR size={14} />
            </Link>
            <Link to="/?s=fittings" className="link-line grow inline-flex items-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em]">
              Book a fitting for it
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- empty ---------- */
  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center md:py-36">
        <span className="grid h-16 w-16 place-items-center border rule text-smoke"><IconHanger size={28} /></span>
        <h1 className="mt-6 font-display text-4xl font-medium italic">Your bag is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-smoke">Checkout waits patiently. Add a piece or two first — the rail is twelve strong.</p>
        <Link to="/shop" className="btn-fill mt-8 inline-flex items-center gap-2.5 bg-ink px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
          Back to the shop <IconArrowR size={14} />
        </Link>
      </div>
    );
  }

  /* ---------- form ---------- */
  const input = (k: keyof Form, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className={props.className?.includes("col-span") ? props.className : ""}>
      <label className="flabel" htmlFor={`c-${k}`}>{label} *</label>
      <input
        id={`c-${k}`}
        className={`field ${errors[k] ? "err" : ""}`}
        value={form[k]}
        onChange={(e) => set(k)(e.target.value)}
        {...props}
      />
      {errors[k] && <p className="mt-1 text-[11px] font-semibold text-wine">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-wine">
        <span className="h-px w-8 bg-wine" /> Checkout
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-6xl">Almost yours.</h1>
      <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-smoke">
        <span className="text-ink">Bag</span> <span className="h-px w-6 bg-ink/30" />
        <span className="text-ink">Details</span> <span className="h-px w-6 bg-ink/30" />
        <span className="text-wine">Confirm</span>
      </div>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-10">
          {/* contact */}
          <section>
            <h2 className="mb-4 flex items-baseline gap-3 font-display text-2xl font-medium">
              <span className="text-wine italic">01</span> Contact
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {input("name", "Full name", { placeholder: "Amara Osei" })}
              {input("phone", "Phone", { placeholder: "+44 …", type: "tel" })}
              <div className="sm:col-span-2">
                <label className="flabel" htmlFor="c-email">Email *</label>
                <input id="c-email" type="email" className={`field ${errors.email ? "err" : ""}`} value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* delivery */}
          <section>
            <h2 className="mb-4 flex items-baseline gap-3 font-display text-2xl font-medium">
              <span className="text-wine italic">02</span> Delivery
            </h2>
            <div className="grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="flabel" htmlFor="c-address">Street address *</label>
                <input id="c-address" className={`field ${errors.address ? "err" : ""}`} value={form.address} onChange={(e) => set("address")(e.target.value)} placeholder="18 Chiltern Street" />
                {errors.address && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.address}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="flabel" htmlFor="c-city">City *</label>
                <input id="c-city" className={`field ${errors.city ? "err" : ""}`} value={form.city} onChange={(e) => set("city")(e.target.value)} placeholder="London" />
                {errors.city && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="flabel" htmlFor="c-zip">Postcode *</label>
                <input id="c-zip" className={`field ${errors.zip ? "err" : ""}`} value={form.zip} onChange={(e) => set("zip")(e.target.value)} placeholder="W1U 7PY" />
                {errors.zip && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.zip}</p>}
              </div>
              <div className="sm:col-span-4">
                <label className="flabel" htmlFor="c-country">Country</label>
                <select id="c-country" className="field" value={form.country} onChange={(e) => set("country")(e.target.value)}>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-6">
                <label className="flabel" htmlFor="c-notes">Delivery notes</label>
                <textarea id="c-notes" rows={2} className="field resize-none" value={form.notes} onChange={(e) => set("notes")(e.target.value)} placeholder="Concierge, safe place, gift wrap…" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {([
                { m: "Standard" as const, d: "2–4 working days", p: cartSubtotal >= FREE_SHIP_AT ? 0 : 12 },
                { m: "Express" as const, d: "1–2 working days", p: 24 },
              ]).map((o) => (
                <button
                  type="button"
                  key={o.m}
                  onClick={() => setShipMethod(o.m)}
                  className={`flex items-center justify-between border p-4 text-left transition-all duration-200 ${
                    shipMethod === o.m ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                  aria-pressed={shipMethod === o.m}
                >
                  <span>
                    <span className="block text-sm font-bold uppercase tracking-[0.14em]">{o.m}</span>
                    <span className={`mt-0.5 block text-xs ${shipMethod === o.m ? "text-fog" : "text-smoke"}`}>{o.d}</span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">{o.p === 0 ? "Free" : money(o.p)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* payment */}
          <section>
            <h2 className="mb-4 flex items-baseline gap-3 font-display text-2xl font-medium">
              <span className="text-wine italic">03</span> Payment
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["Card", "Cash on delivery"] as const).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPayment(p)}
                  className={`border p-4 text-left transition-all duration-200 ${
                    payment === p ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                  aria-pressed={payment === p}
                >
                  <span className="block text-sm font-bold uppercase tracking-[0.14em]">{p}</span>
                  <span className={`mt-0.5 block text-xs ${payment === p ? "text-fog" : "text-smoke"}`}>
                    {p === "Card" ? "Charged when the order ships" : "Pay the courier at your door"}
                  </span>
                </button>
              ))}
            </div>
            {payment === "Card" && (
              <div className="rise mt-4 grid gap-4 border rule bg-bone/40 p-4 sm:grid-cols-4 sm:p-5">
                <div className="sm:col-span-4">
                  <label className="flabel" htmlFor="c-cardName">Name on card *</label>
                  <input id="c-cardName" className={`field ${errors.cardName ? "err" : ""}`} value={form.cardName} onChange={(e) => set("cardName")(e.target.value)} placeholder="A. OSEI" autoComplete="cc-name" />
                  {errors.cardName && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.cardName}</p>}
                </div>
                <div className="sm:col-span-4">
                  <label className="flabel" htmlFor="c-cardNumber">Card number *</label>
                  <input
                    id="c-cardNumber"
                    inputMode="numeric"
                    className={`field tabular-nums ${errors.cardNumber ? "err" : ""}`}
                    value={form.cardNumber}
                    onChange={(e) =>
                      set("cardNumber")(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "))
                    }
                    placeholder="4242 4242 4242 4242"
                    autoComplete="cc-number"
                  />
                  {errors.cardNumber && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.cardNumber}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="flabel" htmlFor="c-expiry">Expiry *</label>
                  <input
                    id="c-expiry"
                    className={`field tabular-nums ${errors.expiry ? "err" : ""}`}
                    value={form.expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                      set("expiry")(v);
                    }}
                    placeholder="08/27"
                    autoComplete="cc-exp"
                  />
                  {errors.expiry && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.expiry}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="flabel" htmlFor="c-cvc">CVC *</label>
                  <input
                    id="c-cvc"
                    inputMode="numeric"
                    className={`field tabular-nums ${errors.cvc ? "err" : ""}`}
                    value={form.cvc}
                    onChange={(e) => set("cvc")(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    autoComplete="cc-csc"
                  />
                  {errors.cvc && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.cvc}</p>}
                </div>
                <p className="sm:col-span-4 text-[11px] text-smoke">Demo checkout — nothing is charged and card details never leave your browser.</p>
              </div>
            )}
          </section>
        </div>

        {/* summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 border rule bg-bone/40">
            <h2 className="border-b rule px-5 py-4 font-display text-xl font-medium">Your order</h2>
            <ul className="max-h-72 divide-y divide-ink/10 overflow-y-auto no-bar px-5">
              {cart.map((l) => {
                const p = byId.get(l.productId);
                if (!p) return null;
                return (
                  <li key={`${l.productId}-${l.size}`} className="flex items-center gap-3.5 py-3.5">
                    <div className="relative h-16 w-[52px] shrink-0 overflow-hidden bg-bone">
                      <img src={p.img} alt="" className="h-full w-full object-cover" style={p.filter ? { filter: p.filter } : undefined} />
                      <span className="absolute -right-0 -top-0 grid h-5 min-w-5 place-items-center bg-ink px-1 text-[9px] font-bold text-paper tabular-nums">{l.qty}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold leading-tight">{p.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-smoke">{p.colorway} · {p.category === "Footwear" ? `EU ${l.size}` : l.size}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">{money(p.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-2 border-t rule px-5 py-4 text-sm">
              <p className="flex justify-between text-ink/75"><span>Subtotal</span><span className="tabular-nums">{money(cartSubtotal)}</span></p>
              <p className="flex justify-between text-ink/75">
                <span>Shipping — {shipMethod}</span>
                <span className="tabular-nums">{shipping === 0 ? <span className="font-semibold text-moss">Free</span> : money(shipping)}</span>
              </p>
              {cartSubtotal < FREE_SHIP_AT && shipMethod === "Standard" && (
                <p className="text-[11px] text-smoke">Add {money(FREE_SHIP_AT - cartSubtotal)} more for complimentary shipping.</p>
              )}
              <p className="flex items-baseline justify-between border-t rule pt-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke">Total</span>
                <span className="font-display text-3xl font-semibold tabular-nums">{money(total)}</span>
              </p>
            </div>
            <div className="px-5 pb-5">
              <button
                type="submit"
                disabled={placing}
                className="btn-fill flex w-full items-center justify-center gap-3 bg-ink py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-paper disabled:opacity-70"
              >
                {placing ? (
                  <span className="flex items-center gap-2">
                    <span className="pulse-dot">Placing…</span>
                  </span>
                ) : (
                  <>Place order — {money(total)} <IconArrowR size={15} /></>
                )}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-smoke">
                <IconKey size={11} /> Encrypted demo — staff can review it in the console.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
