import { byId, money } from "../data/catalog";
import { FREE_SHIP_AT, useStore } from "../lib/store";
import { Link } from "../lib/router";
import { Stepper } from "./ui";
import { IconArrowR, IconClose, IconHanger, IconTrash, IconCheck } from "./icons";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeLine, cartSubtotal, cartCount } = useStore();

  const remaining = FREE_SHIP_AT - cartSubtotal;
  const progress = Math.min(100, Math.round((cartSubtotal / FREE_SHIP_AT) * 100));

  return (
    <div
      className={`fixed inset-0 z-[85] transition-opacity duration-300 ${
        cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!cartOpen}
    >
      <button
        className="absolute inset-0 bg-ink/55"
        onClick={() => setCartOpen(false)}
        aria-label="Close bag"
        tabIndex={cartOpen ? 0 : -1}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-[min(26rem,100vw)] flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,0.7,0.22,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b rule px-5 py-4">
          <h2 className="font-display text-xl font-medium">
            Your Bag{" "}
            <span className="text-smoke text-base tabular-nums">({cartCount})</span>
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="grid h-9 w-9 place-items-center border rule hover:bg-ink hover:text-paper transition-colors"
            aria-label="Close bag"
          >
            <IconClose size={15} />
          </button>
        </div>

        {/* shipping meter */}
        <div className="border-b rule px-5 py-3.5 bg-bone/40">
          {remaining > 0 ? (
            <p className="text-xs text-ink/80">
              <span className="font-semibold">{money(remaining)}</span> away from complimentary
              shipping
            </p>
          ) : (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-moss">
              <IconCheck size={13} /> Complimentary shipping unlocked
            </p>
          )}
          <div className="mt-2 h-[3px] w-full bg-ink/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${remaining > 0 ? "bg-gold" : "bg-moss"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-bar px-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="grid h-16 w-16 place-items-center border rule text-smoke">
                <IconHanger size={28} />
              </span>
              <div>
                <p className="font-display text-xl italic">Nothing on the rail yet</p>
                <p className="mt-1 text-sm text-smoke">Pieces you add will wait for you here.</p>
              </div>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="btn-fill mt-2 inline-flex items-center gap-2 bg-ink px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-paper"
              >
                Browse the shop <IconArrowR size={14} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {cart.map((l) => {
                const p = byId.get(l.productId);
                if (!p) return null;
                return (
                  <li key={`${l.productId}-${l.size}`} className="flex gap-4 py-5">
                    <div className="h-24 w-[76px] shrink-0 overflow-hidden bg-bone">
                      <img
                        src={p.img}
                        alt={`${p.name} in ${p.colorway}`}
                        className="h-full w-full object-cover"
                        style={p.filter ? { filter: p.filter } : undefined}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-display text-[15px] leading-tight truncate">{p.name}</p>
                          <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-smoke">
                            {p.colorway} · {p.category === "Footwear" ? `EU ${l.size}` : l.size}
                          </p>
                        </div>
                        <p className="text-sm font-semibold tabular-nums whitespace-nowrap">
                          {money(p.price * l.qty)}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <Stepper small value={l.qty} onChange={(v) => setQty(l.productId, l.size, v)} />
                        <button
                          onClick={() => removeLine(l.productId, l.size)}
                          className="grid h-8 w-8 place-items-center text-smoke hover:text-wine hover:bg-wine/10 transition-colors"
                          aria-label={`Remove ${p.name}`}
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t rule px-5 py-5 space-y-4 bg-paper">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke">
                Subtotal
              </span>
              <span className="font-display text-2xl font-semibold tabular-nums">
                {money(cartSubtotal)}
              </span>
            </div>
            <p className="text-[11px] text-smoke -mt-2">
              Duties and shipping settled at checkout.
            </p>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="btn-fill flex w-full items-center justify-center gap-3 bg-ink py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-paper"
            >
              Proceed to checkout <IconArrowR size={15} />
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="link-line grow w-full text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-smoke"
            >
              Continue browsing
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
