import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IconStar } from "./icons";

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rv ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- section heading ---------- */
export function SectionHead({
  no,
  kicker,
  title,
  right,
  dark,
}: {
  no: string;
  kicker: string;
  title: ReactNode;
  right?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
      <div className="max-w-2xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`font-display italic text-sm ${dark ? "text-gold" : "text-wine"}`}
            >
              {no}
            </span>
            <span className={`h-px w-10 ${dark ? "bg-gold/60" : "bg-wine/60"}`} />
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                dark ? "text-fog" : "text-smoke"
              }`}
            >
              {kicker}
            </span>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <h2
            className={`font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight ${
              dark ? "text-paper" : "text-ink"
            }`}
          >
            {title}
          </h2>
        </Reveal>
      </div>
      {right ? <Reveal delay={160}>{right}</Reveal> : null}
    </div>
  );
}

/* ---------- marquee ---------- */
export function Marquee({
  children,
  className = "",
  slow,
  style,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <div className={`mq flex w-max whitespace-nowrap ${slow ? "mq-slow" : ""}`}>
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center shrink-0" aria-hidden={i === 1}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TickerItem({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em]">
      <span>{children}</span>
      <svg width="7" height="7" viewBox="0 0 8 8" className="opacity-60" aria-hidden>
        <rect x="1.2" y="1.2" width="5.6" height="5.6" transform="rotate(45 4 4)" fill="currentColor" />
      </svg>
    </span>
  );
}

/* ---------- rating ---------- */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} size={11} filled={i <= Math.round(rating)} />
      ))}
    </span>
  );
}

/* ---------- qty stepper ---------- */
export function Stepper({
  value,
  onChange,
  small,
}: {
  value: number;
  onChange: (v: number) => void;
  small?: boolean;
}) {
  const btn = `grid place-items-center border rule transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none ${
    small ? "w-7 h-7" : "w-9 h-9"
  }`;
  return (
    <div className="inline-flex items-stretch">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        <svg width="10" height="10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg>
      </button>
      <span className={`grid place-items-center border-y rule font-semibold tabular-nums ${small ? "w-8 text-xs" : "w-11 text-sm"}`}>
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(9, value + 1))}
        disabled={value >= 9}
        aria-label="Increase quantity"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}

/* ---------- corner ticks for editorial frames ---------- */
export function Corners({ light }: { light?: boolean }) {
  const c = light ? "border-paper/70" : "border-ink/70";
  const cls = `absolute w-4 h-4 border-0 ${c} pointer-events-none`;
  return (
    <>
      <span className={`${cls} top-2 left-2 border-t border-l`} />
      <span className={`${cls} top-2 right-2 border-t border-r`} />
      <span className={`${cls} bottom-2 left-2 border-b border-l`} />
      <span className={`${cls} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

/* ---------- monogram ---------- */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display italic font-semibold ${className}`} aria-hidden>
      V<span className="not-italic font-body font-bold tracking-[0.32em] text-[0.6em] ml-1 align-middle">ASANA</span>
    </span>
  );
}

/* ---------- resilient image ---------- */
export function Img({
  src,
  alt,
  filter,
  className = "",
  wrapClassName = "",
  eager = false,
}: {
  src: string;
  alt: string;
  filter?: string;
  className?: string;
  wrapClassName?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`relative block overflow-hidden bg-bone ${wrapClassName}`}>
      <span className="absolute inset-0 grid select-none place-items-center" aria-hidden>
        <span className="font-display italic text-4xl text-ink/15">{alt.charAt(0).toUpperCase()}</span>
      </span>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${className}`}
          style={filter ? { filter } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
