import { useEffect, useState } from "react";
import { CATEGORIES, TICKER } from "../data/catalog";
import { useStore } from "../lib/store";
import { Link, navigate } from "../lib/router";
import { Marquee, Monogram, TickerItem } from "./ui";
import { IconArrowUR, IconBag, IconHeart, IconKey, IconSearch } from "./icons";

const NAV = [
  { label: "Shop All", to: "/shop" },
  { label: "Festive", to: "/shop?cat=Lehengas" },
  { label: "Sarees", to: "/shop?cat=Sarees" },
  { label: "Our Story", to: "/?s=story" },
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
      <div className="bg-ink py-2 text-paper/90">
        <Marquee>
          {TICKER.map((t) => (
            <TickerItem key={t}>{t}</TickerItem>
          ))}
        </Marquee>
      </div>

      <header
        className={`sticky top-0 z-[60] border-b rule bg-paper/95 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(28,23,18,0.4)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          {/* left: slim burger + nav */}
          <div className="flex flex-1 items-center gap-1">
            <button
              className="group relative flex h-9 w-10 items-center justify-center lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="relative block h-[11px] w-[21px]">
                <span className="absolute left-0 top-0 h-px w-full bg-ink transition-all duration-300" />
                <span className="absolute left-0 top-[5px] h-px w-[13px] bg-ink transition-all duration-300 group-hover:w-full" />
                <span className="absolute left-0 top-[10px] h-px w-full bg-ink transition-all duration-300" />
              </span>
            </button>
            <nav className="hidden items-center gap-7 pl-1 lg:flex">
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
          <Link to="/" className="shrink-0 select-none text-center leading-none" ariaLabel="Vasana home">
            <span className="block font-display text-[26px] font-semibold italic tracking-tight">
              Vasana
            </span>
            <span className="mt-0.5 block text-[7.5px] font-bold uppercase tracking-[0.42em] text-smoke">
              Indian wear online
            </span>
          </Link>

          {/* right: icons */}
          <div className="flex flex-1 items-center justify-end gap-0.5">
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
        <div className="absolute inset-0 bg-ink text-paper">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <Monogram className="text-2xl text-paper" />
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Close menu"
            >
              <span className="relative block h-[11px] w-[21px]">
                <span className="absolute left-0 top-[5px] h-px w-full rotate-45 bg-paper" />
                <span className="absolute left-0 top-[5px] h-px w-full -rotate-45 bg-paper" />
              </span>
            </button>
          </div>

          <div className="flex h-[calc(100%-4rem)] flex-col justify-between overflow-y-auto no-bar px-6 pb-8 pt-6 md:px-12">
            <nav>
              {NAV.map((n, i) => (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  className="rise group flex items-center justify-between border-b border-paper/10 py-4"
                  // stagger via inline animation-delay
                  {...{ style: { animationDelay: `${i * 60}ms` } }}
                >
                  <span className="font-display text-3xl font-medium transition-colors group-hover:text-gold md:text-5xl">
                    {n.label}
                  </span>
                  <IconArrowUR size={20} className="text-smoke transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-smoke">Departments</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.name}
                    to={`/shop?cat=${c.name}`}
                    onClick={() => setMenuOpen(false)}
                    className="border border-paper/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-fog transition-colors hover:border-gold hover:text-gold"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6">
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 bg-wine px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-paper"
                >
                  <IconKey size={13} /> Staff console
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/shop?saved=1");
                  }}
                  className="link-line grow inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-fog"
                >
                  <IconHeart size={13} /> Saved ({wishlist.length})
                </button>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-smoke">
                Jaipur warehouse · ships to all 27 states
                <br />
                care@vasana.in · +91 141 400 2016
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
