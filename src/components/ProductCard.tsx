import { money, type Product } from "../data/catalog";
import { useStore } from "../lib/store";
import { Stars } from "./ui";
import { IconHeart } from "./icons";

const BADGE_STYLE: Record<string, string> = {
  New: "bg-moss text-paper",
  Bestseller: "bg-ink text-paper",
  "Low stock": "bg-wine text-paper",
  "Festive pick": "bg-gold text-ink",
};

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const { openQuickView, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-bone">
        <button
          onClick={() => openQuickView(product.id)}
          className="block w-full"
          aria-label={`Quick view ${product.name} in ${product.colorway}`}
        >
          <div className={`relative overflow-hidden ${compact ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
            <img
              src={product.img}
              alt={`${product.name} in ${product.colorway}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.19,0.7,0.22,1)] group-hover:scale-[1.06]"
              style={product.filter ? { filter: product.filter } : undefined}
            />
            <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
          </div>
        </button>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${BADGE_STYLE[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 grid h-8 w-8 place-items-center border transition-all duration-200 ${
            saved
              ? "border-wine bg-paper text-wine"
              : "border-transparent bg-paper/85 text-ink hover:text-wine"
          }`}
          aria-pressed={saved}
          aria-label={saved ? `Unsave ${product.name}` : `Save ${product.name}`}
        >
          <IconHeart size={15} filled={saved} />
        </button>

        <button
          onClick={() => openQuickView(product.id)}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 py-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-paper transition-transform duration-400 ease-out group-hover:translate-y-0 focus-visible:translate-y-0"
        >
          Quick view — {product.colorway}
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 pt-3.5">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-smoke">
            {product.colorway}
          </p>
          <button
            onClick={() => openQuickView(product.id)}
            className="link-line grow mt-0.5 text-left font-display text-[17px] leading-snug font-medium"
          >
            {product.name}
          </button>
          <div className="mt-1 flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-[10px] text-smoke tabular-nums">({product.reviews})</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-semibold tabular-nums">{money(product.price)}</p>
          {product.compareAt && (
            <p className="text-[11px] text-smoke line-through tabular-nums">{money(product.compareAt)}</p>
          )}
        </div>
      </div>
    </article>
  );
}
