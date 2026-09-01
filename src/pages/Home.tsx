import { useState, type FormEvent } from "react";
import {
  CATEGORIES,
  GEN_KURTA,
  KURTA_VAN,
  LEH_MAROON,
  LOOK_FIELD,
  LOOK_GRASS,
  OCCASIONS,
  PRESS,
  PRODUCTS,
  TICKER,
  byId,
  money,
} from "../data/catalog";
import { useStore } from "../lib/store";
import { Link, navigate } from "../lib/router";
import { Corners, Img, Marquee, Reveal, SectionHead, TickerItem } from "../components/ui";
import { ProductCard } from "../components/ProductCard";
import {
  IconArrowR,
  IconArrowUR,
  IconBag,
  IconCal,
  IconCheck,
  IconKey,
  IconMail,
  IconSpark,
} from "../components/icons";

const hero = byId.get("meera-maroon")!;

export function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const fresh = PRODUCTS.filter((p) => p.isNew);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b rule">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <div className="relative z-10 flex flex-col justify-center lg:col-span-6">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-wine">
                <span className="h-px w-10 bg-wine" /> Festive Edit ’25 — now live
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[15vw] font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                Woven
                <br />
                in <em className="italic text-wine">India.</em>
                <br />
                <span className="outline-text">Worn everywhere.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70">
                Banarasi zari to boardroom blazers — the complete Indian wardrobe, online only.
                Handloom from the weaver, dispatched from Jaipur, delivered to all 27 states
                in 48 hours.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop?cat=Lehengas"
                  className="btn-fill inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-paper"
                >
                  Shop festive <IconArrowR size={14} />
                </Link>
                <Link
                  to="/shop?cat=Casual"
                  className="link-line grow inline-flex items-center gap-2 px-1 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink"
                >
                  Shop casual <IconArrowUR size={13} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t rule pt-6">
                {[
                  ["48 hr", "dispatch from Jaipur"],
                  ["27 states", "+ UTs delivered"],
                  ["₹1,999+", "free delivery"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-display text-2xl font-semibold leading-none">{k}</dt>
                    <dd className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-smoke">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* image */}
          <div className="relative lg:col-span-6">
            <Reveal delay={140} className="relative h-[52vh] min-h-[380px] sm:h-[62vh] lg:h-full lg:min-h-[560px]">
              <Corners />
              <Img
                src={LEH_MAROON}
                alt="Model in a maroon zardozi lehenga from the Festive Edit ’25"
                wrapClassName="absolute inset-0 h-full"
                className="kenburns"
                eager
              />
              {/* floating product card */}
              <button
                onClick={() => navigate("/shop?cat=Lehengas")}
                className="group absolute bottom-5 left-5 flex items-center gap-3 bg-paper/95 p-3 pr-5 text-left shadow-[0_20px_50px_-20px_rgba(28,23,18,0.6)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Img src={hero.img} alt="" wrapClassName="h-14 w-11 shrink-0" />
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-wine">
                    Shop the look
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-semibold leading-tight">
                    {hero.name} — {hero.colorway}
                  </span>
                  <span className="text-xs font-semibold tabular-nums">{money(hero.price)}</span>
                </span>
                <IconArrowUR size={16} className="text-smoke transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="absolute right-5 top-5 border border-paper/50 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-paper/90 backdrop-blur-sm">
                AW ’25 · Look 01
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <div className="bg-ink py-3 text-paper/90">
        <Marquee>
          {TICKER.map((t) => (
            <TickerItem key={t}>{t}</TickerItem>
          ))}
        </Marquee>
      </div>

      {/* ============ DEPARTMENTS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead
          no="01"
          kicker="Every wardrobe, six rails"
          title={
            <>
              From <em className="italic text-wine">saree</em> to
              <br />
              boardroom.
            </>
          }
          right={
            <Link
              to="/shop"
              className="link-line grow inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink"
            >
              Shop everything <IconArrowR size={14} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 90}>
              <Link to={`/shop?cat=${c.name}`} className="group relative block overflow-hidden bg-bone">
                <div className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <Img
                    src={c.img}
                    alt={`${c.name} — ${c.note}`}
                    wrapClassName="h-full"
                    className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.19,0.7,0.22,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
                  <span>
                    <span className="block font-display text-lg font-medium leading-tight text-paper md:text-2xl">
                      {c.name}
                    </span>
                    <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-paper/70 md:text-[10px]">
                      {c.note}
                    </span>
                  </span>
                  <span className="grid h-8 w-8 shrink-0 translate-y-1 place-items-center bg-paper text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:h-9 md:w-9">
                    <IconArrowUR size={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FESTIVE EDIT RAIL ============ */}
      <section className="border-y rule bg-bone/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <SectionHead
            no="02"
            kicker="Zari, silk & the good stuff"
            title="The Festive Edit"
            right={
              <Link
                to="/shop?cat=Lehengas"
                className="link-line grow inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink"
              >
                All festive <IconArrowR size={14} />
              </Link>
            }
          />
          <div className="no-bar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:-mx-8 md:gap-6 md:px-8">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="w-[240px] shrink-0 snap-start sm:w-[280px] md:w-[300px]">
                <ProductCard product={p} />
              </Reveal>
            ))}
            <Link
              to="/shop"
              className="group flex w-[240px] shrink-0 snap-start flex-col items-center justify-center gap-3 border border-dashed border-ink/25 text-center transition-colors hover:border-wine hover:bg-paper sm:w-[280px] md:w-[300px]"
            >
              <span className="grid h-12 w-12 place-items-center border rule text-smoke transition-colors group-hover:border-wine group-hover:text-wine">
                <IconSpark size={20} />
              </span>
              <span className="font-display text-xl italic">See all {PRODUCTS.length} pieces</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Browse the shop</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ OCCASIONS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead
          no="03"
          kicker="Whatever the day demands"
          title={
            <>
              Dress for <em className="italic text-wine">the moment.</em>
            </>
          }
        />
        <div className="no-bar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:-mx-8 md:gap-4 md:px-8">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 60} className="w-[210px] shrink-0 snap-start sm:w-[250px]">
              <Link
                to={`/shop?cat=${o.cat}`}
                className="group block border rule bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_50px_-30px_rgba(28,23,18,0.5)]"
              >
                <div className="h-40 overflow-hidden sm:h-44">
                  <Img
                    src={o.img}
                    alt={o.title}
                    wrapClassName="h-full"
                    className="transition-transform duration-[900ms] group-hover:scale-[1.07]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <div>
                    <p className="font-display text-lg font-medium leading-tight">{o.title}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-smoke">{o.note}</p>
                  </div>
                  <IconArrowUR size={16} className="shrink-0 text-smoke transition-all duration-300 group-hover:text-wine" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ NEW ARRIVALS ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
        <SectionHead
          no="04"
          kicker="Fresh off the loom"
          title="New arrivals"
          right={
            <Link
              to="/shop"
              className="link-line grow inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink"
            >
              View all new <IconArrowR size={14} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {fresh.slice(0, 8).map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ LOOKBOOK ============ */}
      <section id="lookbook" className="relative overflow-hidden bg-ink py-20 text-paper md:py-28">
        <span
          className="outline-text-light pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap font-display italic text-[22vw] leading-none opacity-50"
          aria-hidden
        >
          Lookbook
        </span>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-12 md:px-8">
          <div className="md:col-span-5 md:order-2">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-gold">
                <span className="h-px w-10 bg-gold/60" /> 05 — Shot on location, Udaipur
              </p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Colours that hold
                <br />
                <em className="italic text-gold">their ground.</em>
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fog">
                Rani pink against lake water, zari under marigold light — the Festive Edit was
                photographed in Udaipur without a single studio lamp. Because Indian colour
                doesn’t need help.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <Link
                to="/shop?cat=Sarees"
                className="btn-fill mt-8 inline-flex items-center gap-3 bg-paper px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-ink"
              >
                Shop the edit <IconArrowR size={14} />
              </Link>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:order-1">
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              <Reveal className="pt-10 md:pt-16">
                <div className="relative">
                  <Corners light />
                  <div className="aspect-[3/4] overflow-hidden">
                    <Img src={LOOK_FIELD} alt="Lookbook — red lehenga in an open field" wrapClassName="h-full" className="kenburns" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="relative">
                  <Corners light />
                  <div className="aspect-[3/4] overflow-hidden">
                    <Img src={LOOK_GRASS} alt="Lookbook — red and gold lehenga in tall grass" wrapClassName="h-full" />
                  </div>
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                  Look 02 — Scarlet &amp; gold · ₹12,999
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY / LOOM TO DOORSTEP ============ */}
      <section id="story" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-6">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-wine">
              <span className="h-px w-10 bg-wine" /> 06 — Why online-only
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Loom to doorstep,
              <br />
              <em className="italic text-wine">nothing in between.</em>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/70">
              No showrooms, no middlemen, no mark-ups for rent. We buy directly from weaver
              co-operatives in Varanasi, Kanchipuram and Chanderi, stitch with partner ateliers in
              Jaipur and Lucknow, and ship straight to you — which is how a ₹21-day Banarasi
              reaches you at an honest price.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <dl className="mt-10 grid grid-cols-2 gap-px border rule bg-ink/10 sm:max-w-lg">
              {[
                ["300+", "weaver families partnered"],
                ["₹0", "middlemen since 2016"],
                ["48 hr", "dispatch, pan-India"],
                ["100%", "fabrics traceable to mill"],
              ].map(([k, v]) => (
                <div key={v} className="bg-paper p-5 transition-colors hover:bg-bone/60">
                  <dt className="font-display text-3xl font-semibold text-wine">{k}</dt>
                  <dd className="mt-1 text-[11px] leading-snug text-smoke">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div className="md:col-span-6">
          <Reveal delay={140} className="relative h-[420px] md:h-full md:min-h-[540px]">
            <Corners />
            <Img src={KURTA_VAN} alt="Heritage kurta set photographed in a forest clearing" wrapClassName="absolute inset-0 h-full" className="kenburns" />
            <span className="absolute bottom-4 left-4 bg-paper/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-ink">
              Dabu block print · Bagru, Rajasthan
            </span>
          </Reveal>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="border-y rule bg-bone/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-ink/10 md:grid-cols-4 md:divide-y-0">
          {[
            { icon: <IconCheck size={19} />, k: "Free delivery", v: "On orders over ₹1,999" },
            { icon: <IconBag size={19} />, k: "COD available", v: "Across all 27 states" },
            { icon: <IconCal size={19} />, k: "7-day returns", v: "Free size exchange" },
            { icon: <IconKey size={19} />, k: "UPI & cards", v: "Secure, PCI-DSS checkout" },
          ].map((t) => (
            <div key={t.k} className="group flex items-center gap-3.5 px-5 py-6 transition-colors hover:bg-paper md:px-6 md:py-7">
              <span className="grid h-10 w-10 shrink-0 place-items-center border rule text-wine transition-colors group-hover:border-wine group-hover:bg-wine group-hover:text-paper">
                {t.icon}
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em]">{t.k}</span>
                <span className="mt-0.5 block text-[11px] text-smoke">{t.v}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PRESS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead
          no="07"
          kicker="As written about us"
          title={
            <>
              The press <em className="italic text-wine">drapes in.</em>
            </>
          }
        />
        <div className="grid gap-px border rule bg-ink/10 md:grid-cols-3">
          {PRESS.map((p, i) => (
            <figure key={p.source} className={`bg-paper p-7 transition-colors hover:bg-bone/50 md:p-9 ${i === 1 ? "md:translate-y-6" : ""}`}>
              <IconSpark size={16} className="text-gold" />
              <blockquote className="mt-4 font-display text-xl italic leading-snug md:text-2xl">
                “{p.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
                <span className="h-px w-6 bg-ink/40" /> {p.source} · {p.issue}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <Newsletter />
    </>
  );
}

/* ---------------- newsletter ---------------- */

function Newsletter() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    toast("You’re on the list", "First drop of the Diwali Edit lands in your inbox.", "ok");
  };

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <span
        className="outline-text-light pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display italic text-[16vw] leading-none opacity-40"
        aria-hidden
      >
        Vasana — Vasana — Vasana
      </span>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-6">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-gold">
              <span className="h-px w-10 bg-gold/60" /> The drop list
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              First dibs on every <em className="italic text-gold">weave.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">
              New drops sell out in days — Banarasi in hours. Join the list and get 24-hour early
              access, plus a ₹500 welcome credit.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col justify-center md:col-span-6">
          <Reveal delay={120}>
            {state === "done" ? (
              <div className="pop flex items-center gap-4 border border-moss/60 bg-moss/15 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-moss text-paper">
                  <IconCheck size={18} />
                </span>
                <div>
                  <p className="font-display text-lg font-medium">Shubh! You’re in.</p>
                  <p className="mt-0.5 text-xs text-fog">
                    ₹500 credit added — it applies automatically at your first checkout.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="w-full" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <IconMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fog" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="you@example.in"
                      aria-label="Email address"
                      className={`field field-dark bg-transparent pl-10 ${state === "error" ? "border-gold" : "border-paper/40"}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-fill flex items-center justify-center gap-2.5 bg-paper px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-ink"
                  >
                    Join the list <IconArrowR size={14} />
                  </button>
                </div>
                <p className={`mt-2.5 text-[11px] ${state === "error" ? "text-gold" : "text-smoke"}`}>
                  {state === "error"
                    ? "That email doesn’t look right — try again?"
                    : "One email a week, max. Unsubscribe in a tap."}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
