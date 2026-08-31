import { useEffect, useState } from "react";
import { TICKER } from "../data/catalog";
import { useStore } from "../lib/store";
import { Link, navigate } from "../lib/router";
import { Marquee, Monogram, TickerItem } from "./ui";
import { IconBag, IconClose, IconHeart, IconKey, IconSearch, IconArrowUR } from "./icons";

const NAV = [
  { label: "Shop All", to: "/shop" },
  { label: "Lookbook", to: "/?s=lookbook" },
  { label: "Atelier", to: "/?s=atelier" },
  { label: "Fittings", to: "/?s=fittings" },
];

function Badge({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 grid h-4 min-w-4 place-items-center bg-wine px-1 text-[9px] font-bold text-paper tabular-nums">
      {n > 9 ? "9+" : n}
    </span>
  );
}

export function Header() {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const iconBtn =
    "relative grid h-9 w-9 place-items-center border border-transparent transition-all duration-300 hover:border-ink/25 hover:bg-bone/60";

  return (
    <>
      {/* announcement ticker */}
      <div className="bg-ink text-paper/90 py-2">
        <Marquee>
          {TICKER.map((t) => (
            <TickerItem key={t}>{t}</TickerItem>
          ))}
        </Marquee>
      </div>

      <header
        className={`sticky top-0 z-[60] bg-paper/95 backdrop-blur-sm border-b rule transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(28,23,18,0.4)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          {/* left: burger + nav */}
          <div className="flex items-center gap-1 flex-1">
            <button
              className={`${iconBtn} lg:hidden`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M3.5 7h17M3.5 12h11M3.5 17h17" strokeLinecap="round" />
              </svg>
            </button>
            <nav className="hidden lg:flex items-center gap-7 pl-1">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className="link-line grow text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/80 hover:text-ink"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* logo */}
          <Link to="/" className="shrink-0 text-center leading-none select-none" ariaLabel="Verso Atelier home">
            <span className="block font-display text-[26px] font-semibold italic tracking-tight">
              Verso
            </span>
            <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-[0.5em] text-smoke">
              Atelier
            </span>
          </Link>

          {/* right: icons */}
          <div className="flex items-center justify-end gap-0.5 flex-1">
            <Link to="/shop" className={`${iconBtn} hidden sm:grid`} ariaLabel="Search the shop">
              <IconSearch size={18} />
            </Link>
            <Link to="/shop?saved=1" className={iconBtn} ariaLabel="Saved items">
              <IconHeart size={18} />
              <Badge n={wishlist.length} />
            </Link>
            <Link to="/admin" className={`${iconBtn} hidden sm:grid`} ariaLabel="Staff console">
              <IconKey size={18} />
            </Link>
            <button className={iconBtn} onClick={() => setCartOpen(true)} aria-label={`Open bag, ${cartCount} items`}>
              <IconBag size={18} />
              <Badge n={cartCount} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          className="absolute inset-0 bg-ink/60"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[min(21rem,88vw)] flex-col bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.19,0.7,0.22,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b rule-light p-5">
            <Monogram className="text-2xl text-paper" />
            <button
              onClick={() => setMenuOpen(false)}
              className="grid h-9 w-9 place-items-center border rule-light hover:bg-paper/10 transition-colors"
              aria-label="Close menu"
            >
              <IconClose size={16} />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {[
              { label: "Shop All", to: "/shop" },
              { label: "The Lookbook", to: "/?s=lookbook" },
              { label: "The Atelier", to: "/?s=atelier" },
              { label: "Private Fittings", to: "/?s=fittings" },
              { label: "Saved Pieces", to: "/shop?saved=1" },
            ].map((n, i) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b rule-light py-4"
              >
                <span className="font-display text-3xl font-medium italic group-hover:text-gold transition-colors">
                  {n.label}
                </span>
                <span className="text-smoke text-xs tabular-nums">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-5 border-t rule-light space-y-3">
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-fog hover:text-paper transition-colors"
            >
              <IconKey size={14} /> Staff console
            </Link>
            <p className="text-xs text-smoke leading-relaxed">
              Porto · Paris · Copenhagen
              <br />
              atelier@verso.example
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function goSection(id: string) {
  navigate(`/?s=${id}`);
}
