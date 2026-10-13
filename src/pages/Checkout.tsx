import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { STATES, money } from "../data/catalog";
import { FREE_SHIP_AT, useStore, type Order } from "../lib/store";
import { Link, navigate } from "../lib/router";
import { Stepper } from "../components/ui";
import {
  IconArrowR,
  IconBag,
  IconCal,
  IconCheck,
  IconKey,
  IconLeaf,
  IconPhone,
} from "../components/icons";

type Form = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  cardNo: string;
  cardExp: string;
  cardCvc: string;
  upiId: string;
};

const initial: Form = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  notes: "",
  cardNo: "",
  cardExp: "",
  cardCvc: "",
  upiId: "",
};

type Pay = "UPI" | "Card" | "Cash on delivery";
type ShipMethod = "Standard" | "Express";

export function Checkout() {
  const { cart, cartSubtotal, setQty, placeOrder, toast, byId } = useStore();
  const [form, setForm] = useState<Form>(initial);
  const [pay, setPay] = useState<Pay>("UPI");
  const [ship, setShip] = useState<ShipMethod>("Standard");
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<Order | null>(null);

  const shipping = cartSubtotal >= FREE_SHIP_AT || cart.length === 0 ? 0 : ship === "Express" ? 249 : 99;
  const expressFee = ship === "Express" && cartSubtotal >= FREE_SHIP_AT ? 249 : ship === "Express" ? 0 : 0;
  const shipCost = cartSubtotal >= FREE_SHIP_AT && ship === "Standard" ? 0 : ship === "Express" ? 249 : cartSubtotal > 0 ? 99 : 0;
  void shipping;
  void expressFee;

  const set = (k: keyof Form) => (e: { target: { value: string } }) => {
    let v = e.target.value;
    if (k === "phone") v = v.replace(/[^\d ]/g, "").slice(0, 12);
    if (k === "zip") v = v.replace(/\D/g, "").slice(0, 6);
    if (k === "cardNo")
      v = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "cardExp") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2);
    }
    if (k === "cardCvc") v = v.replace(/\D/g, "").slice(0, 3);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const er: Partial<Record<keyof Form, string>> = {};
    if (form.name.trim().length < 2) er.name = "Your full name, please";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) er.phone = "Enter a valid 10-digit Indian mobile";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email";
    if (form.address.trim().length < 6) er.address = "House / flat, street, locality";
    if (!form.city.trim()) er.city = "City is required";
    if (!form.state) er.state = "Pick your state";
    if (!/^\d{6}$/.test(form.zip)) er.zip = "6-digit PIN code";
    if (pay === "Card") {
      if (form.cardNo.replace(/\s/g, "").length !== 16) er.cardNo = "16-digit card number";
      if (!/^(0[1-9]|1[0-2]) \/ \d{2}$/.test(form.cardExp)) er.cardExp = "MM / YY";
      if (form.cardCvc.length !== 3) er.cardCvc = "3 digits";
    }
    if (pay === "UPI" && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(form.upiId))
      er.upiId = "e.g. name@okhdfc";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!validate()) {
      toast("Almost there", "A few fields need attention before we pack your order.", "err");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPlacing(true);
    window.setTimeout(() => {
      const order = placeOrder(
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: `+91 ${form.phone.replace(/\s/g, "")}`,
          address: form.address.trim(),
          city: form.city.trim(),
          zip: form.zip,
          country: `${form.state}, India`,
          notes: form.notes.trim() || undefined,
        },
        pay,
        ship,
        shipCost
      );
      setPlaced(order);
      setPlacing(false);
      toast(`Order ${order.id} placed`, "Confirmation sent to your email & phone.", "ok");
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 1400);
  };

  /* ---------- success ---------- */
  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
        <div className="rise text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center bg-moss text-paper">
            <IconCheck size={28} />
          </span>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.26em] text-wine">
            Order {placed.id} · {new Date(placed.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-6xl">
            Dhanyavaad, <em className="italic text-wine">{placed.customer.name.split(" ")[0]}.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/70">
            Your parcel leaves our Jaipur warehouse within 48 hours on{" "}
            <strong>{placed.shippingMethod}</strong> delivery
            {placed.payment === "Cash on delivery" && (
              <> — keep <strong>{money(placed.total)}</strong> ready for the delivery partner</>
            )}
            {placed.payment === "UPI" && <> — payment received via UPI</>}
            {placed.payment === "Card" && <> — your card has been charged</>}
            . Track updates will arrive by SMS &amp; email.
          </p>
        </div>

        <div className="pop mt-10 border rule bg-paper" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center justify-between border-b rule px-5 py-3.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Delivery to</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-moss">
              <IconCal size={13} /> {placed.shippingMethod === "Express" ? "1–2 days" : "2–5 days"}
            </span>
          </div>
          <div className="px-5 py-4 text-sm">
            <p className="font-semibold">{placed.customer.name}</p>
            <p className="mt-0.5 text-ink/70">{placed.customer.address}</p>
            <p className="text-ink/70">
              {placed.customer.city}, {placed.customer.country} — {placed.customer.zip}
            </p>
          </div>
          <ul className="divide-y divide-ink/10 border-t rule">
            {placed.items.map((i) => (
              <li key={`${i.productId}-${i.size}`} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                <span>
                  {i.qty} × {i.name} <span className="text-smoke">— {i.colorway}, {i.size}</span>
                </span>
                <span className="tabular-nums">{money(i.price * i.qty)}</span>
              </li>
            ))}
            <li className="flex items-center justify-between px-5 py-3 text-sm text-smoke">
              <span>Shipping ({placed.shippingMethod})</span>
              <span className="tabular-nums">{placed.shipping === 0 ? "Free" : money(placed.shipping)}</span>
            </li>
            <li className="flex items-center justify-between bg-bone/50 px-5 py-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Total paid</span>
              <span className="font-display text-2xl font-semibold tabular-nums">{money(placed.total)}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="btn-fill inline-flex items-center gap-2.5 bg-ink px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-paper"
          >
            Continue shopping <IconArrowR size={14} />
          </Link>
          <Link
            to="/"
            className="link-line grow inline-flex items-center gap-2 px-2 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-smoke"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- empty ---------- */
  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center md:py-32">
        <span className="grid h-16 w-16 place-items-center border rule text-smoke">
          <IconBag size={28} />
        </span>
        <h1 className="font-display text-3xl font-medium italic md:text-4xl">Your bag is empty</h1>
        <p className="max-w-sm text-sm leading-relaxed text-ink/60">
          Nothing to check out yet — the rails, however, are full. Sarees, kurtas, blazers and
          everything between.
        </p>
        <Link
          to="/shop"
          className="btn-fill mt-2 inline-flex items-center gap-2.5 bg-ink px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-paper"
        >
          Browse the shop <IconArrowR size={14} />
        </Link>
      </div>
    );
  }

  /* ---------- form ---------- */
  const field = (k: keyof Form, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label className="flabel" htmlFor={`f-${k}`}>{label}</label>
      <input
        id={`f-${k}`}
        className={`field ${errors[k] ? "err" : ""}`}
        value={form[k]}
        onChange={set(k)}
        {...props}
      />
      {errors[k] && <p className="mt-1 text-[11px] font-semibold text-wine">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b rule pb-8">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-wine">
            <span className="h-px w-8 bg-wine" /> Secure checkout
          </p>
          <h1 className="mt-3 font-display text-5xl font-medium tracking-tight md:text-6xl">
            Almost <em className="italic text-wine">yours.</em>
          </h1>
        </div>
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-smoke">
          <IconKey size={14} className="text-moss" /> 256-bit encrypted · PCI-DSS
        </p>
      </div>

      <form onSubmit={submit} className="mt-10 grid gap-12 lg:grid-cols-12" noValidate>
        {/* left: details */}
        <div className="space-y-12 lg:col-span-7">
          {/* contact & delivery */}
          <section>
            <h2 className="flex items-center gap-3 font-display text-2xl font-medium">
              <span className="font-display italic text-wine text-base">01</span> Contact &amp; delivery
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field("name", "Full name", { placeholder: "Priya Sharma", autoComplete: "name" })}
              <div>
                <label className="flabel" htmlFor="f-phone">Mobile number</label>
                <div className="flex">
                  <span className="flex items-center gap-1.5 border border-r-0 border-ink/15 bg-bone/60 px-3 text-sm text-ink/70">
                    <IconPhone size={13} /> +91
                  </span>
                  <input
                    id="f-phone"
                    className={`field rounded-none ${errors.phone ? "err" : ""}`}
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="98XXXXXXXX"
                    inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">{field("email", "Email", { type: "email", placeholder: "you@example.in", autoComplete: "email" })}</div>
              <div className="sm:col-span-2">{field("address", "Address", { placeholder: "Flat / house no., building, street, locality" })}</div>
              {field("city", "City", { placeholder: "Jaipur" })}
              <div>
                <label className="flabel" htmlFor="f-state">State</label>
                <select id="f-state" className={`field ${errors.state ? "err" : ""}`} value={form.state} onChange={(e) => { setForm((f) => ({ ...f, state: e.target.value })); setErrors((er) => ({ ...er, state: undefined })); }}>
                  <option value="">Select state…</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.state}</p>}
              </div>
              {field("zip", "PIN code", { placeholder: "302001", inputMode: "numeric" })}
              {field("notes", "Delivery notes (optional)", { placeholder: "Leave with security, call on arrival…" })}
            </div>
          </section>

          {/* shipping method */}
          <section>
            <h2 className="flex items-center gap-3 font-display text-2xl font-medium">
              <span className="font-display italic text-wine text-base">02</span> Delivery speed
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "Standard", title: "Standard", eta: "2–5 working days", price: cartSubtotal >= FREE_SHIP_AT ? 0 : 99 },
                  { id: "Express", title: "Express", eta: "1–2 days · metros", price: 249 },
                ] as { id: ShipMethod; title: string; eta: string; price: number }[]
              ).map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setShip(m.id)}
                  className={`border p-4 text-left transition-all duration-200 ${
                    ship === m.id ? "border-ink bg-ink text-paper shadow-[0_16px_35px_-18px_rgba(28,23,18,0.6)]" : "border-ink/20 hover:border-ink"
                  }`}
                  aria-pressed={ship === m.id}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{m.title}</span>
                    <span className={`text-sm font-semibold tabular-nums ${ship === m.id ? "text-gold" : ""}`}>
                      {m.price === 0 ? "Free" : money(m.price)}
                    </span>
                  </span>
                  <span className={`mt-1.5 block text-xs ${ship === m.id ? "text-fog" : "text-smoke"}`}>{m.eta}</span>
                </button>
              ))}
            </div>
            {cartSubtotal >= FREE_SHIP_AT && ship === "Standard" && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-moss">
                <IconCheck size={13} /> Complimentary standard shipping unlocked
              </p>
            )}
          </section>

          {/* payment */}
          <section>
            <h2 className="flex items-center gap-3 font-display text-2xl font-medium">
              <span className="font-display italic text-wine text-base">03</span> Payment
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {(["UPI", "Card", "Cash on delivery"] as Pay[]).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPay(p)}
                  className={`border px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                    pay === p ? "border-wine bg-wine text-paper" : "border-ink/20 hover:border-wine hover:text-wine"
                  }`}
                  aria-pressed={pay === p}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-4 border rule bg-bone/40 p-5">
              {pay === "UPI" && (
                <div className="pop max-w-sm">
                  {field("upiId", "UPI ID", { placeholder: "name@okhdfc" })}
                  <p className="mt-3 text-xs leading-relaxed text-smoke">
                    A collect request will be sent to your UPI app — approve within 5 minutes to confirm.
                  </p>
                </div>
              )}
              {pay === "Card" && (
                <div className="pop grid gap-4">
                  <div className="max-w-md">{field("cardNo", "Card number", { placeholder: "4242 4242 4242 4242", inputMode: "numeric", autoComplete: "cc-number" })}</div>
                  <div className="grid max-w-md grid-cols-2 gap-4">
                    {field("cardExp", "Expiry", { placeholder: "MM / YY", inputMode: "numeric" })}
                    {field("cardCvc", "CVC", { placeholder: "123", inputMode: "numeric", autoComplete: "cc-csc" })}
                  </div>
                </div>
              )}
              {pay === "Cash on delivery" && (
                <div className="pop flex items-start gap-3 text-sm text-ink/75">
                  <IconBag size={17} className="mt-0.5 shrink-0 text-wine" />
                  <p className="leading-relaxed">
                    Pay the delivery partner in cash or UPI at your door. A ₹50 handling fee is
                    waived this festive season. Available on orders up to ₹50,000.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* right: summary */}
        <aside className="lg:col-span-5">
          <div className="border rule bg-paper lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b rule px-5 py-4">
              <h2 className="font-display text-xl font-medium">Order summary</h2>
              <Link to="/shop" className="link-line grow text-[10px] font-bold uppercase tracking-[0.18em] text-smoke hover:text-wine">
                Edit bag
              </Link>
            </div>
            <ul className="max-h-72 divide-y divide-ink/10 overflow-y-auto no-bar px-5">
              {cart.map((l) => {
                const p = byId.get(l.productId);
                if (!p) return null;
                return (
                  <li key={`${l.productId}-${l.size}`} className="flex items-center gap-3.5 py-4">
                    <div className="relative h-16 w-[52px] shrink-0 overflow-hidden bg-bone">
                      <img src={p.img} alt="" className="h-full w-full object-cover" style={p.filter ? { filter: p.filter } : undefined} />
                      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center bg-ink text-[10px] font-bold text-paper">
                        {l.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[15px] leading-tight">{p.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-smoke">{p.colorway} · {l.size}</p>
                      <div className="mt-1.5">
                        <Stepper small value={l.qty} onChange={(v) => setQty(l.productId, l.size, v)} />
                      </div>
                    </div>
                    <p className="text-sm font-semibold tabular-nums">{money(p.price * l.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-2.5 border-t rule px-5 py-5 text-sm">
              <div className="flex justify-between text-ink/75">
                <span>Subtotal</span>
                <span className="tabular-nums">{money(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/75">
                <span>Shipping — {ship}</span>
                <span className="tabular-nums">{shipCost === 0 ? <span className="font-semibold text-moss">Free</span> : money(shipCost)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t rule pt-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Total</span>
                <span className="font-display text-3xl font-semibold tabular-nums">{money(cartSubtotal + shipCost)}</span>
              </div>
              <p className="text-[11px] text-smoke">Inclusive of all taxes · GST invoice emailed</p>
              <button
                type="submit"
                disabled={placing}
                className="btn-fill mt-3 flex w-full items-center justify-center gap-3 bg-ink py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-paper disabled:cursor-wait disabled:opacity-70"
              >
                {placing ? (
                  <>
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
                    Placing order…
                  </>
                ) : (
                  <>
                    Place order <IconArrowR size={15} />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-4 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-smoke">
                <span className="flex items-center gap-1"><IconKey size={11} /> Secure</span>
                <span className="flex items-center gap-1"><IconLeaf size={11} /> Plastic-free</span>
                <span className="flex items-center gap-1"><IconCal size={11} /> 7-day returns</span>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
