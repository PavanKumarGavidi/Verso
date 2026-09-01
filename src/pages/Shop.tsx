import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "../data/catalog";
import { useStore } from "../lib/store";
import { Link, type Route } from "../lib/router";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/ui";
import { IconArrowR, IconClose, IconHeart, IconSearch } from "../components/icons";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function Shop({ route }: { route: Route }) {
  const { wishlist } = useStore();
  const [cat, setCat] = useState<string>(route.query.get("cat") ?? "All");
  const [sort, setSort] = useState<Sort>("featured");
  const [q, setQ] = useState("");
  const [savedOnly, setSavedOnly] = useState(route.query.get("saved") === "1");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCat(route.query.get("cat") ?? "All");
    const saved = route.query.get("saved") === "1";
    setSavedOnly(saved);
    if (saved) window.setTimeout(() => searchRef.current?.focus(), 200);
  }, [route.query]);

  const items = useMemo(() => {
    let list = [...PRODUCTS];
    if (savedOnly) list = list.filter((p) => wishlist.includes(p.id));
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.colorway.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle)
      );
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default:
        list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || Number(b.isNew ?? false) - Number(a.isNew ?? false));
    }
    return list;
  }, [cat, sort, q, savedOnly, wishlist]);

  const cats: ("All" | Category)[] = ["All", ...CATEGORIES.map((c) => c.name)];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      {/* page head */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b rule pb-8">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-wine">
            <span className="h-px w-8 bg-wine" /> The Indian wardrobe — Festive ’25
          </p>
          <h1 className="mt-3 font-display text-5xl font-medium tracking-tight md:text-7xl">
            {cat === "All" ? "Everything." : cat + "."}
          </h1>
        </div>
        <p className="max-w-[260px] text-xs leading-relaxed text-smoke">
          {savedOnly
            ? "Pieces you’ve saved. They’ll wait here — quantities are not reserved."
            : "Twelve pieces, small series of three hundred. When a colourway sells through, it retires."}
        </p>
      </div>

      {/* toolbar */}
      <div className="sticky top-16 z-40 -mx-4 border-b rule bg-paper/95 px-4 py-3 backdrop-blur-sm md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              ref={searchRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pieces, colours…"
              className="field py-2 pl-9 text-[13px]"
              aria-label="Search products"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-smoke hover:text-ink" aria-label="Clear search">
                <IconClose size={13} />
              </button>
            )}
          </div>

          <div className="no-bar flex flex-1 items-center gap-1.5 overflow-x-auto">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                  cat === c
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
                }`}
                aria-pressed={cat === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSavedOnly(!savedOnly)}
              className={`flex items-center gap-1.5 border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-all ${
                savedOnly ? "border-wine bg-wine text-paper" : "border-ink/20 hover:border-wine hover:text-wine"
              }`}
              aria-pressed={savedOnly}
            >
              <IconHeart size={12} filled={savedOnly} /> Saved
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="field w-auto py-2 text-[11px] font-semibold uppercase tracking-[0.1em]"
              aria-label="Sort products"
            >
              <option value="featured">Sort — Featured</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* count + reset */}
      <div className="flex items-center justify-between py-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke tabular-nums">
          {items.length} piece{items.length === 1 ? "" : "s"}
          {savedOnly && " · saved"}
        </p>
        {(cat !== "All" || q || savedOnly) && (
          <button
            onClick={() => { setCat("All"); setQ(""); setSavedOnly(false); }}
            className="link-line grow inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-wine"
          >
            Clear filters <IconClose size={12} />
          </button>
        )}
      </div>

      {/* grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <span className="grid h-16 w-16 place-items-center border rule text-smoke">
            <IconSearch size={26} />
          </span>
          <div>
            <p className="font-display text-2xl italic">Nothing on this rail</p>
            <p className="mt-1.5 max-w-xs text-sm text-smoke">
              {savedOnly
                ? "You haven’t saved any pieces yet — tap the heart on anything you love."
                : "No pieces match that search. Try a colour, or browse a department."}
            </p>
          </div>
          <button
            onClick={() => { setCat("All"); setQ(""); setSavedOnly(false); }}
            className="btn-fill mt-2 inline-flex items-center gap-2 bg-ink px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-paper"
          >
            Show everything <IconArrowR size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}

      {/* bottom note */}
      <div className="mt-20 border-t rule pt-8 text-center">
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-smoke">
          Unsure of your size? Every order includes a{" "}
          <span className="font-semibold text-wine">free size exchange</span> — the delivery partner
          brings the new size to your door and takes the old one back. No forms, no fees.
        </p>
      </div>
    </div>
  );
}
