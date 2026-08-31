import { useState } from "react";
import { CATEGORIES, POLICIES, STORES } from "../data/catalog";
import { Link } from "../lib/router";
import { Monogram, Marquee, TickerItem } from "./ui";
import { IconArrowUR, IconClose, IconMail, IconPhone, IconPin, IconKey } from "./icons";

export function Footer() {
  const [policy, setPolicy] = useState<string | null>(null);
  const active = policy ? POLICIES[policy] : null;

  return (
    <footer className="bg-ink text-paper">
      {/* oversized marquee */}
      <div className="border-b rule-light py-6">
        <Marquee slow>
          {["Verso Atelier", "Porto · Paris · Copenhagen", "Est. 1987", "Cut — Sewn — Worn"].map((t) => (
            <span key={t} className="pr-8 md:pr-14">
              <TickerItem>
                <span className="font-display italic text-2xl md:text-4xl font-medium normal-case tracking-tight text-paper/90">
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
            Considered ready-to-wear, cut in small series and made to be altered, repaired and worn
            for decades — not seasons.
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-fog">
            <p className="flex items-center gap-2.5">
              <IconMail size={15} className="text-gold" /> atelier@verso.example
            </p>
            <p className="flex items-center gap-2.5">
              <IconPhone size={15} className="text-gold" /> +351 22 018 44 90
            </p>
            <p className="flex items-start gap-2.5">
              <IconPin size={15} className="mt-0.5 text-gold" /> Rua do Almada 114, 4050-032 Porto
            </p>
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
          <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Maison</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/?s=lookbook" className="link-line grow text-fog hover:text-paper">Lookbook</Link></li>
            <li><Link to="/?s=atelier" className="link-line grow text-fog hover:text-paper">The Atelier</Link></li>
            <li><Link to="/?s=fittings" className="link-line grow text-fog hover:text-paper">Private Fittings</Link></li>
            <li><Link to="/shop" className="link-line grow text-fog hover:text-paper">New Arrivals</Link></li>
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
                <button
                  onClick={() => setPolicy(key)}
                  className="link-line grow text-fog hover:text-paper"
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Ateliers</h3>
          <ul className="mt-4 space-y-4 text-sm">
            {STORES.map((s) => (
              <li key={s.city}>
                <p className="font-display italic text-base text-paper">
                  {s.city}
                  {s.flag && <span className="ml-2 text-[9px] not-italic font-body font-bold uppercase tracking-[0.18em] text-gold">Flagship</span>}
                </p>
                <p className="mt-0.5 text-xs text-fog">{s.addr}</p>
                <p className="text-xs text-smoke">{s.hours}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t rule-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-[11px] text-smoke md:flex-row md:px-8">
          <p>© 2025 Verso Atelier — Cut &amp; sewn in Porto. All fibres traceable.</p>
          <div className="flex items-center gap-5">
            {["Instagram", "Pinterest", "Journal"].map((s) => (
              <a
                key={s}
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="link-line grow inline-flex items-center gap-1 font-semibold uppercase tracking-[0.16em] text-fog hover:text-paper"
              >
                {s} <IconArrowUR size={11} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* policy modal */}
      {active && (
        <div className="fixed inset-0 z-[92] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="absolute inset-0 bg-ink/70" onClick={() => setPolicy(null)} aria-label="Close" />
          <div className="pop relative w-full max-w-lg bg-paper p-7 md:p-9 max-h-[85vh] overflow-y-auto no-bar">
            <button
              onClick={() => setPolicy(null)}
              className="absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center border rule hover:bg-ink hover:text-paper transition-colors"
              aria-label="Close"
            >
              <IconClose size={14} />
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-wine">Client care</p>
            <h3 className="mt-2 font-display text-3xl font-medium">{active.title}</h3>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/80">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 border-t rule pt-4 text-xs text-smoke">
              Questions? Write to <span className="font-semibold text-ink">atelier@verso.example</span> — a person answers within two working days.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
