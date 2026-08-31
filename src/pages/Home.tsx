import { useMemo, useState, type FormEvent } from "react";
import {
  CATEGORIES,
  HERO_IMG,
  LOOK_1,
  LOOK_2,
  PRESS,
  PRODUCTS,
  SERVICES,
  STORES,
  TIME_SLOTS,
  TICKER,
  byId,
  money,
} from "../data/catalog";
import { useStore } from "../lib/store";
import { Link, navigate } from "../lib/router";
import { Corners, Marquee, Reveal, SectionHead, TickerItem } from "../components/ui";
import { ProductCard } from "../components/ProductCard";
import {
  IconArrowR,
  IconArrowUR,
  IconCal,
  IconCheck,
  IconLeaf,
  IconPin,
  IconSpark,
  SERVICE_ICONS,
} from "../components/icons";

/* ============================ HERO ============================ */

function Hero() {
  const { openQuickView } = useStore();
  return (
    <section className="relative overflow-hidden">
      <span className="outline-text pointer-events-none absolute -top-6 left-0 select-none font-display italic text-[26vw] leading-none opacity-70 hidden lg:block" aria-hidden>
        N°09
      </span>

      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-8">
        {/* copy */}
        <div className="relative z-10 flex flex-col justify-center lg:col-span-6">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-wine">
              <span className="h-px w-8 bg-wine" />
              Collection N°09 — Autumn / Winter ’25
            </p>
          </Reveal>
          <Reveal delay={110}>
            <h1 className="mt-6 font-display font-medium leading-[0.95] tracking-tight text-[clamp(3.1rem,9vw,6.8rem)]">
              Dressed in
              <br />
              <em className="font-light text-wine">quiet</em> intent,
              <br />
              cut to last.
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/75">
              Twelve pieces for the cold months — double-faced wools, hand-loomed knits and boots
              welted for life. Each one traceable to the mill, and made to be altered rather than
              replaced.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/shop"
                className="btn-fill inline-flex items-center gap-3 bg-ink px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-paper"
              >
                Shop the collection <IconArrowR size={15} />
              </Link>
              <Link
                to="/?s=fittings"
                className="link-line grow inline-flex items-center gap-2 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink"
              >
                Book a private fitting <IconArrowUR size={13} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">
              <span className="flex items-center gap-2"><IconLeaf size={13} className="text-moss" /> Traceable fibres</span>
              <span>Cut in Porto</span>
              <span>Est. 1987</span>
            </div>
          </Reveal>
        </div>

        {/* image */}
        <div className="relative lg:col-span-6">
          <Reveal delay={150} className="h-full">
            <div className="relative h-[420px] overflow-hidden bg-bone sm:h-[520px] lg:h-full lg:min-h-[640px]">
              <img
                src={HERO_IMG}
                alt="Model wearing the oxblood Marlow overcoat from the AW'25 collection"
                className="kenburns absolute inset-0 h-full w-full object-cover"
              />
              <Corners light />
              <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-180 text-[10px] font-bold uppercase tracking-[0.5em] text-paper/85 lg:block" style={{ writingMode: "vertical-rl" }}>
                AW — 25 · The Quiet Tailoring
              </span>
              {/* floating product card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-3 bg-ink/90 p-3 pr-4 text-paper">
                <div className="h-14 w-11 shrink-0 overflow-hidden">
                  <img src={byId.get("marlow-charcoal")!.img} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm leading-tight">The Marlow Overcoat</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-fog">Charcoal · {money(420)}</p>
                </div>
                <button
                  onClick={() => openQuickView("marlow-charcoal")}
                  className="ml-auto grid h-9 w-9 shrink-0 place-items-center border border-paper/30 hover:bg-paper hover:text-ink transition-colors"
                  aria-label="Quick view the Marlow Overcoat"
                >
                  <IconArrowUR size={14} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* mid-page ticker */}
      <div className="border-y border-ink/15 bg-wine py-3 text-paper">
        <Marquee>
          {TICKER.map((t) => (
            <TickerItem key={t}>{t}</TickerItem>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ============================ DEPARTMENTS ============================ */

function Departments() {
  const cats = CATEGORIES;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHead
        no="01"
        kicker="The departments"
        title={<>Six rooms,<br />one wardrobe.</>}
        right={
          <Link to="/shop" className="link-line grow inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
            View everything <IconArrowR size={14} />
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
        {cats.map((c, i) => {
          const span =
            i === 0 ? "col-span-2 md:col-span-7 md:row-span-2" :
            i === 1 ? "col-span-1 md:col-span-5" :
            i === 2 ? "col-span-1 md:col-span-5" :
            i === 3 ? "col-span-1 md:col-span-4" :
            i === 4 ? "col-span-1 md:col-span-4" :
            "col-span-2 md:col-span-4";
          const tall = i === 0 ? "h-80 md:h-[540px]" : "h-56 md:h-64";
          return (
            <Reveal key={c.name} delay={i * 70} className={span}>
              <Link to={`/shop?cat=${c.name}`} className={`group relative block w-full overflow-hidden bg-bone ${tall}`}>
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.19,0.7,0.22,1)] group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 md:p-5 text-paper">
                  <span>
                    <span className="block font-display text-xl md:text-3xl font-medium leading-none">{c.name}</span>
                    <span className="mt-1.5 block text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-paper/70">{c.note}</span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-paper/40 transition-all duration-300 group-hover:bg-paper group-hover:text-ink group-hover:rotate-45">
                    <IconArrowUR size={14} />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============================ THE EDIT ============================ */

function TheEdit() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="border-y rule bg-bone/45">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHead
          no="02"
          kicker="The edit — AW’25"
          title={<>The four pieces<br />we’d pack first.</>}
          right={
            <Link to="/shop" className="link-line grow inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
              Shop all twelve <IconArrowR size={14} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 md:gap-x-6">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ BANNER ============================ */

function Banner() {
  return (
    <section className="relative h-[420px] overflow-hidden md:h-[520px]">
      <div className="absolute inset-0 md:bg-fixed">
        <img src={LOOK_1} alt="Lookbook image — camel overcoat on a cobblestone lane" className="h-full w-full object-cover" />
      </div>
      <span className="absolute inset-0 bg-ink/45" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 md:px-8 md:pb-16">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Field notes — Look 04</p>
        </Reveal>
        <Reveal delay={100}>
          <blockquote className="mt-4 max-w-2xl font-display text-3xl md:text-5xl font-medium italic leading-tight text-paper">
            “The coat you stop thinking about is the one that was cut correctly.”
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-paper/70">— Beatriz Vale, head of workshop</p>
        </Reveal>
        <Reveal delay={280}>
          <Link
            to="/shop?cat=Outerwear"
            className="btn-fill mt-8 inline-flex w-fit items-center gap-3 bg-paper px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-ink hover:text-paper"
          >
            Shop outerwear <IconArrowR size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ LOOKBOOK ============================ */

const LOOKS = [
  { img: HERO_IMG, no: "01", title: "The Marlow, pressed", pid: "marlow-charcoal", note: "Oxblood overcoat · ink trouser" },
  { img: LOOK_1, no: "02", title: "Camel in transit", pid: "belmont-camel", note: "Belmont coat · Ashford knit" },
  { img: LOOK_2, no: "03", title: "The atelier hours", pid: "ashford-oat", note: "Ecru knit · bias skirt" },
];

function Lookbook() {
  const { openQuickView } = useStore();
  return (
    <section id="lookbook" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <SectionHead
        no="03"
        kicker="Lookbook"
        title={<>Three ways<br />to wear the quiet.</>}
        right={
          <p className="max-w-[220px] text-xs leading-relaxed text-smoke">
            Every look is shopable — open a piece and it goes straight to your bag.
          </p>
        }
      />
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {LOOKS.map((l, i) => (
          <Reveal key={l.no} delay={i * 100}>
            <figure className="group relative overflow-hidden bg-bone">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={l.img}
                  alt={l.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,0.7,0.22,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
              </div>
              <span className="absolute left-4 top-4 font-display italic text-5xl text-paper/90 drop-shadow">{l.no}</span>
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <span className="block bg-ink/85 p-3.5 text-paper">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg leading-tight">{l.title}</span>
                    <IconArrowUR size={14} className="shrink-0 text-gold" />
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-fog">{l.note}</span>
                  <button
                    onClick={() => openQuickView(l.pid)}
                    className="mt-3 inline-flex items-center gap-2 border-b border-gold/70 pb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-paper hover:border-paper transition-colors"
                  >
                    Shop this look <IconArrowR size={12} />
                  </button>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================ ATELIER ============================ */

function Atelier() {
  const stats = [
    { n: "1987", l: "Founded in Porto" },
    { n: "42", l: "Artisans on the bench" },
    { n: "3", l: "Ateliers, one standard" },
    { n: "92%", l: "Natural, traceable fibres" },
  ];
  return (
    <section id="atelier" className="scroll-mt-24 border-y rule bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
                <span className="h-px w-8 bg-gold" /> 04 — The atelier
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-4xl font-medium leading-[1.02] md:text-6xl">
                Slow on purpose,<br /><em className="text-gold font-light">precise</em> by habit.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fog">
                Three generations of the same families work our benches in Porto. Coats are canvassed
                by hand, knits are linked rather than serged, and every boot leaves with its resole
                record sewn into the lining.
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fog">
                We make less, on purpose — twelve pieces a season, in series of three hundred, so
                nothing is anonymous and nothing is wasted.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-px bg-paper/15 border border-paper/15">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 80} className="bg-ink">
                <div className="p-6 md:p-9 transition-colors duration-300 hover:bg-coal">
                  <p className="font-display text-5xl font-medium text-paper md:text-7xl tabular-nums">{s.n}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="relative mt-4 h-64 overflow-hidden md:h-80">
              <img src={LOOK_2} alt="A knitter at work in the Porto atelier" loading="lazy" className="kenburns absolute inset-0 h-full w-full object-cover" />
              <Corners light />
              <span className="absolute bottom-3 left-3 bg-ink/85 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
                Bench 3 — hand-linking, Porto
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ NEW ARRIVALS ============================ */

function NewArrivals() {
  const items = useMemo(() => PRODUCTS.filter((p) => p.isNew), []);
  const scroll = (dir: number) => {
    const el = document.getElementById("new-rail");
    el?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHead
        no="05"
        kicker="Just off the press"
        title={<>New<br />arrivals.</>}
        right={
          <div className="flex items-center gap-2">
            <button onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center border rule hover:bg-ink hover:text-paper transition-colors" aria-label="Scroll left">
              <IconArrowR size={16} className="rotate-180" />
            </button>
            <button onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center border rule hover:bg-ink hover:text-paper transition-colors" aria-label="Scroll right">
              <IconArrowR size={16} />
            </button>
          </div>
        }
      />
      <div id="new-rail" className="no-bar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:-mx-8 md:px-8">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 60} className="w-[240px] shrink-0 snap-start md:w-[280px]">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================ FITTINGS ============================ */

function Fittings() {
  const { addAppointment, toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: SERVICES[0].name, store: STORES[0].city, visitDate: "", visitTime: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ id: string; visitDate: string; visitTime: string; service: string; store: string } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Your name, please.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "A valid email is needed for the confirmation.";
    if (!form.visitDate) errs.visitDate = "Pick a day.";
    else if (form.visitDate < today) errs.visitDate = "That day has passed — choose an upcoming one.";
    if (!form.visitTime) errs.visitTime = "Pick a time.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const appt = addAppointment({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service,
      store: form.store,
      visitDate: form.visitDate,
      visitTime: form.visitTime,
      notes: form.notes.trim() || undefined,
    });
    setDone({ id: appt.id, visitDate: form.visitDate, visitTime: form.visitTime, service: form.service, store: form.store });
    toast("Booking requested", `${appt.id} — our atelier will confirm within a day.`, "ok");
  };

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="fittings" className="scroll-mt-24 border-y rule bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-8 bg-gold" /> 06 — Private fittings
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.02] md:text-6xl">
              An hour with<br />the <em className="text-gold font-light">bench.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-fog">
              Fittings are held after hours, one client at a time, with coffee from the roaster
              next door. Bring what you own — we’ll build around it.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px bg-paper/15 border border-paper/15 sm:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Ico = SERVICE_ICONS[s.icon];
              return (
                <Reveal key={s.name} delay={i * 70} className="bg-ink">
                  <div className="p-5 transition-colors hover:bg-coal">
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center border border-gold/50 text-gold"><Ico size={18} /></span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-smoke">{s.dur}</span>
                    </div>
                    <p className="mt-4 font-display text-lg leading-tight">{s.name}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-fog">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={150}>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {STORES.map((s) => (
                <span key={s.city} className="flex items-center gap-2 text-xs text-fog">
                  <IconPin size={13} className="text-gold" />
                  <span className="font-semibold text-paper">{s.city}</span> {s.addr}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* booking form */}
        <div className="lg:col-span-6">
          <Reveal delay={150}>
            <div className="relative bg-paper p-6 text-ink md:p-9">
              <Corners />
              {done ? (
                <div className="rise flex min-h-[430px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center border-2 border-moss text-moss"><IconCheck size={28} /></span>
                  <h3 className="mt-6 font-display text-3xl font-medium">Requested — <em className="text-wine">{done.id}</em></h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                    {done.service} at our <strong>{done.store}</strong> atelier on{" "}
                    <strong>{new Date(done.visitDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</strong> at{" "}
                    <strong>{done.visitTime}</strong>. A confirmation email is on its way.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => { setDone(null); setForm({ name: "", email: "", phone: "", service: SERVICES[0].name, store: STORES[0].city, visitDate: "", visitTime: "", notes: "" }); }}
                      className="btn-fill inline-flex items-center gap-2 bg-ink px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-paper"
                    >
                      Book another <IconArrowR size={14} />
                    </button>
                    <Link to="/shop" className="link-line grow inline-flex items-center gap-2 py-3 text-[11px] font-bold uppercase tracking-[0.2em]">
                      Browse while you wait
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-medium md:text-3xl">Request an appointment</h3>
                    <IconCal size={22} className="text-wine" />
                  </div>
                  <p className="mt-1.5 text-xs text-smoke">No payment now — we confirm by email within one working day.</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="flabel" htmlFor="f-name">Full name *</label>
                      <input id="f-name" className={`field ${errors.name ? "err" : ""}`} value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Elena Duarte" />
                      {errors.name && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="flabel" htmlFor="f-email">Email *</label>
                      <input id="f-email" type="email" className={`field ${errors.email ? "err" : ""}`} value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@example.com" />
                      {errors.email && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="flabel" htmlFor="f-phone">Phone</label>
                      <input id="f-phone" className="field" value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="+351 …" />
                    </div>
                    <div>
                      <label className="flabel" htmlFor="f-service">Service</label>
                      <select id="f-service" className="field" value={form.service} onChange={(e) => set("service")(e.target.value)}>
                        {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="flabel" htmlFor="f-store">Atelier</label>
                      <select id="f-store" className="field" value={form.store} onChange={(e) => set("store")(e.target.value)}>
                        {STORES.map((s) => <option key={s.city}>{s.city}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="flabel" htmlFor="f-date">Preferred day *</label>
                      <input id="f-date" type="date" min={today} className={`field ${errors.visitDate ? "err" : ""}`} value={form.visitDate} onChange={(e) => set("visitDate")(e.target.value)} />
                      {errors.visitDate && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.visitDate}</p>}
                    </div>
                    <div>
                      <label className="flabel" htmlFor="f-time">Time *</label>
                      <select id="f-time" className={`field ${errors.visitTime ? "err" : ""}`} value={form.visitTime} onChange={(e) => set("visitTime")(e.target.value)}>
                        <option value="">Select…</option>
                        {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      {errors.visitTime && <p className="mt-1 text-[11px] font-semibold text-wine">{errors.visitTime}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flabel" htmlFor="f-notes">Anything we should prepare?</label>
                      <textarea id="f-notes" rows={3} className="field resize-none" value={form.notes} onChange={(e) => set("notes")(e.target.value)} placeholder="Occasion, pieces you love, sizes you usually wear…" />
                    </div>
                  </div>

                  <button type="submit" className="btn-fill mt-6 flex w-full items-center justify-center gap-3 bg-ink py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-paper">
                    Request this fitting <IconArrowR size={15} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ PRESS ============================ */

function Press() {
  const spans = ["md:col-span-5", "md:col-span-4 md:mt-16", "md:col-span-3 md:mt-8"];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <SectionHead no="07" kicker="In other words" title={<>What the<br />press keeps.</>} />
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        {PRESS.map((q, i) => (
          <Reveal key={q.source} delay={i * 110} className={spans[i]}>
            <blockquote className="border-l-2 border-wine pl-5 md:pl-6">
              <span className="font-display text-6xl leading-none text-wine/30 select-none" aria-hidden>“</span>
              <p className="-mt-6 font-display text-xl italic leading-snug text-ink/90 md:text-2xl">
                {q.quote}
              </p>
              <footer className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-smoke">
                <span className="text-ink">{q.source}</span> — {q.issue}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================ NEWSLETTER ============================ */

function Newsletter() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    toast("You’re on the list", "First letter arrives with the SS’26 preview.", "ok");
  };

  return (
    <section className="bg-wine text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <Reveal>
          <div>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
              <IconSpark size={14} /> The Verso letter
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
              Six letters a year.<br /><em className="font-light">No noise between.</em>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75">
              Collection previews, workshop notes and first access to made-to-measure slots.
              Unsubscribe with one click, no questions.
            </p>
          </div>
        </Reveal>
        <Reveal delay={140}>
          {state === "done" ? (
            <div className="rise flex items-center gap-4 border border-paper/30 bg-ink/25 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-gold text-gold"><IconCheck size={20} /></span>
              <div>
                <p className="font-display text-lg leading-tight">Welcome to the list.</p>
                <p className="mt-1 text-xs text-paper/75">Your first letter arrives with the SS’26 preview — until then, silence.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label className="sr-only" htmlFor="nl-email">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                  placeholder="your@address.com"
                  className={`field field-dark bg-transparent ${state === "error" ? "border-gold" : "border-paper/40"}`}
                />
                {state === "error" && <p className="mt-1.5 text-[11px] font-semibold text-gold">That email doesn’t look right — one more try?</p>}
              </div>
              <button type="submit" className="shrink-0 bg-ink px-8 py-[0.8rem] text-[11px] font-bold uppercase tracking-[0.22em] text-paper transition-colors hover:bg-coal">
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PAGE ============================ */

export function Home() {
  return (
    <>
      <Hero />
      <Departments />
      <TheEdit />
      <Banner />
      <Lookbook />
      <Atelier />
      <NewArrivals />
      <Fittings />
      <Press />
      <Newsletter />
    </>
  );
}
