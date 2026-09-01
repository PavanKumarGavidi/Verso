import { useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, byId, money } from "../data/catalog";
import { useStore } from "../lib/store";
import { Corners, Stars, Stepper } from "./ui";
import { IconArrowR, IconClose, IconHeart, IconChevron } from "./icons";

const SIZE_ROWS: Record<string, [string, string, string][]> = {
  apparel: [
    ["XS", "34", "84–87"],
    ["S", "36", "88–91"],
    ["M", "38", "92–96"],
    ["L", "40–42", "97–102"],
    ["XL", "44", "103–109"],
  ],
  shoes: [
    ["40", "6.5", "25.1 cm"],
    ["41", "7.5", "25.9 cm"],
    ["42", "8.5", "26.7 cm"],
    ["43", "9.5", "27.5 cm"],
    ["44", "10.5", "28.3 cm"],
    ["45", "11.5", "29.1 cm"],
  ],
};

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t rule">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-ink/80 hover:text-ink transition-colors"
        aria-expanded={open}
      >
        {title}
        <IconChevron size={15} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pb-4 text-sm leading-relaxed text-ink/75">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function QuickView() {
  const { quickViewId, closeQuickView, addToCart, setCartOpen, wishlist, toggleWishlist } = useStore();
  const product = quickViewId ? byId.get(quickViewId) : undefined;

  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [guide, setGuide] = useState(false);

  useEffect(() => {
    setSize(null);
    setQty(1);
    setSizeError(false);
    setGuide(false);
  }, [quickViewId]);

  useEffect(() => {
    if (!quickViewId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeQuickView();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [quickViewId, closeQuickView]);

  if (!product) return null;

  const saved = wishlist.includes(product.id);
  const rows = SIZE_ROWS["apparel"];

  const add = () => {
    if (!size) {
      setSizeError(true);
      window.setTimeout(() => setSizeError(false), 600);
      return;
    }
    addToCart(product.id, size, qty);
    closeQuickView();
    setCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center p-3 md:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
      <button className="absolute inset-0 bg-ink/65" onClick={closeQuickView} aria-label="Close quick view" />
      <div className="pop relative grid w-full max-w-4xl max-h-[92vh] overflow-y-auto no-bar bg-paper shadow-2xl md:grid-cols-2">
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center bg-paper/90 border rule hover:bg-ink hover:text-paper transition-colors"
          aria-label="Close"
        >
          <IconClose size={15} />
        </button>

        {/* image */}
        <div className="relative h-72 md:h-auto md:min-h-[560px] overflow-hidden bg-bone">
          <img
            src={product.img}
            alt={`${product.name} in ${product.colorway}`}
            className="absolute inset-0 h-full w-full object-cover"
            style={product.filter ? { filter: product.filter } : undefined}
          />
          <Corners light />
          <span className="absolute bottom-4 left-4 bg-ink/85 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
            Piece N°{String(PRODUCTS.findIndex((x) => x.id === product.id) + 1).padStart(2, "0")} — AW'25
          </span>
        </div>

        {/* details */}
        <div className="flex flex-col p-6 md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-wine">
            {product.category} — {product.colorway}
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium leading-tight">
            {product.name}
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-smoke">
            <Stars rating={product.rating} />
            <span className="tabular-nums">
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl font-semibold tabular-nums">{money(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-smoke line-through tabular-nums">{money(product.compareAt)}</span>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink/75">{product.fabric}</p>

          {/* sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className={`flabel mb-0 ${sizeError ? "text-wine" : ""}`}>
                Select size
              </span>
              <button
                onClick={() => setGuide(!guide)}
                className="link-line grow text-[10px] font-bold uppercase tracking-[0.16em] text-smoke"
              >
                Size guide
              </button>
            </div>
            <div className={`flex flex-wrap gap-2 ${sizeError ? "shake" : ""}`}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={`h-10 min-w-11 px-2 border text-sm font-semibold transition-all duration-200 ${
                    size === s
                      ? "border-ink bg-ink text-paper"
                      : sizeError
                      ? "border-wine/60 text-ink hover:bg-wine/5"
                      : "border-ink/20 hover:border-ink hover:bg-bone/60"
                  }`}
                  aria-pressed={size === s}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs font-semibold text-wine">Choose a size to continue.</p>
            )}
            {guide && (
              <div className="rise mt-3 border rule overflow-x-auto">
                <table className="w-full text-xs tabular-nums">
                  <thead className="bg-bone/60 text-[10px] uppercase tracking-[0.14em] text-smoke">
                    <tr>
                      <th className="px-3 py-2 text-left">Size</th>
                      <th className="px-3 py-2 text-left">Std</th>
                      <th className="px-3 py-2 text-left">Chest (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r[0]} className="border-t rule">
                        {r.map((c) => (
                          <td key={c} className="px-3 py-1.5">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* qty + actions */}
          <div className="mt-6 flex items-center gap-3">
            <Stepper value={qty} onChange={(v) => setQty(Math.max(1, v))} />
            <button
              onClick={add}
              className="btn-fill flex flex-1 items-center justify-center gap-2.5 bg-ink py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-paper"
            >
              Add to bag — {money(product.price * qty)}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`grid h-12 w-12 shrink-0 place-items-center border transition-all duration-200 ${
                saved
                  ? "border-wine bg-wine/10 text-wine"
                  : "border-ink/25 hover:border-ink hover:bg-bone/60"
              }`}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save for later"}
            >
              <IconHeart size={19} filled={saved} />
            </button>
          </div>

          {/* accordions */}
          <div className="mt-7 border-t rule">
            <Accordion title="Fabric & Care">{product.details}</Accordion>
            <Accordion title="Shipping & Returns">
              Free standard delivery over {money(1999)}; dispatched within 48 hours from Jaipur to
              all 27 states. 7-day doorstep returns and free size exchange on unworn pieces.
            </Accordion>
            <Accordion title="Provenance">
              Woven and stitched with partner ateliers in Jaipur &amp; Lucknow; handloom bought
              direct from weaver co-operatives. Every fabric is traceable to the loom on the care
              label.
            </Accordion>
          </div>

          <p className="mt-5 flex items-center gap-2 text-[11px] text-smoke">
            <IconArrowR size={12} className="text-gold" />
            In stock — ships within 48 hrs from Jaipur
          </p>
        </div>
      </div>
    </div>
  );
}
