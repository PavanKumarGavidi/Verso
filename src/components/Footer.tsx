import { useState } from "react";
import { CATEGORIES, POLICIES } from "../data/catalog";
import { Link } from "../lib/router";
import { Marquee, Monogram, TickerItem } from "./ui";
import { IconArrowUR, IconClose, IconKey, IconMail, IconPhone, IconPin } from "./icons";

export function Footer() {
  const [policy, setPolicy] = useState<string | null>(null);
  const active = policy ? POLICIES[policy] : null;

  return (
    <footer className="bg-ink text-paper">
      {/* oversized marquee */}
      <div className="border-b rule-light py-6">
        <Marquee slow>
          {["Vasana", "Indian wear · online only", "Est. 2016 · Jaipur", "Loom — Stitch — Deliver"].map((t) => (
            <span key={t} className="pr-8 md:pr-14">
              <TickerItem>
                <span className="font-display italic text-2xl font-medium normal-case tracking-tight text-paper/90 md:text-4xl">
                  {t}
                </span>
              </TickerItem>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Monogram className="text-3xl text-paper" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
            The complete Indian wardrobe, online only — Banarasi zari, chikankari kurtas, lehengas
            and office formals bought direct from the weaver and delivered pan-India.
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-fog">
            <p className="flex items-center gap-2.5">
              <IconMail size={15} className="text-gold" /> care@vasana.in
            </p>
            <p className="flex items-center gap-2.5">
              <IconPhone size={15} className="text-gold" /> +91 141 400 2016 (10–19 IST)
            </p>
            <p className="flex items-start gap-2.5">
              <IconPin size={15} className="mt-0.5 text-gold" /> Fulfilment centre — Sitapura Industrial
              Area, Jaipur 302022
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {["UPI", "VISA", "Mastercard", "RuPay", "COD"].map((p) => (
              <span key={p} className="border border-paper/25 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-fog">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Departments</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link to={`/shop?cat=${c.name}`} className="link-line grow text-fog hover:text-paper">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/shop?cat=Lehengas" className="link-line grow text-fog hover:text-paper">The Festive Edit</Link></li>
            <li><Link to="/shop" className="link-line grow text-fog hover:text-paper">New Arrivals</Link></li>
            <li><Link to="/?s=lookbook" className="link-line grow text-fog hover:text-paper">Lookbook</Link></li>
            <li><Link to="/?s=story" className="link-line grow text-fog hover:text-paper">Loom to Doorstep</Link></li>
            <li>
              <Link to="/admin" className="link-line grow inline-flex items-center gap-1.5 text-fog hover:text-paper">
                <IconKey size={12} /> Staff console
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Client Care</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {Object.entries(POLICIES).map(([key, p]) => (
              <li key={key}>
                <button onClick={() => setPolicy(key)} className="link-line grow text-fog hover:text-paper">
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">The Promise</h3>
          <ul className="mt-4 space-y-3 text-sm text-fog">
            <li className="border-l border-gold/60 pl-3 text-xs leading-relaxed">Free delivery over ₹1,999, to all 27 states &amp; UTs.</li>
            <li className="border-l border-gold/60 pl-3 text-xs leading-relaxed">7-day doorstep returns, size exchange always free.</li>
            <li className="border-l border-gold/60 pl-3 text-xs leading-relaxed">Every handloom bought direct — weaver named on the fall.</li>
          </ul>
        </div>
      </div>

      <div className="border-t rule-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-[11px] text-smoke md:flex-row md:px-8">
          <p>© 2026 Vasana Retail Pvt. Ltd. — Jaipur, India. All fabrics traceable to the loom.</p>
          <div className="flex items-center gap-5">
            {["Instagram", "Pinterest", "Journal"].map((s) => (
              <a
                key={s}
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="link-line grow inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-fog hover:text-paper"
              >
                {s} <IconArrowUR size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* policy modal */}
      {active && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button className="absolute inset-0 bg-ink/60" onClick={() => setPolicy(null)} aria-label="Close policy" />
          <div className="pop relative max-h-[80vh] w-full max-w-lg overflow-y-auto bg-paper p-7 text-ink sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-wine">Vasana client care</p>
                <h3 className="mt-1.5 font-display text-3xl font-medium">{active.title}</h3>
              </div>
              <button
                onClick={() => setPolicy(null)}
                className="grid h-9 w-9 shrink-0 place-items-center border rule hover:bg-ink hover:text-paper transition-colors"
                aria-label="Close"
              >
                <IconClose size={15} />
              </button>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/75">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
