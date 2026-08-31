import { useStore } from "../lib/store";
import { IconCheck, IconClose, IconSpark } from "./icons";

export function Toasts() {
  const { toasts, dismissToast } = useStore();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[95] flex flex-col gap-2 w-[min(22rem,calc(100vw-2rem))]">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pop relative overflow-hidden bg-ink text-paper shadow-[0_18px_40px_-12px_rgba(28,23,18,0.55)] border border-paper/10"
        >
          <div className="flex items-start gap-3 p-3.5 pr-9">
            <span
              className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center ${
                t.tone === "ok" ? "bg-moss/30 text-paper" : t.tone === "err" ? "bg-wine/50 text-paper" : "bg-gold/30 text-paper"
              }`}
            >
              {t.tone === "ok" ? <IconCheck size={13} /> : t.tone === "err" ? <IconClose size={13} /> : <IconSpark size={13} />}
            </span>
            <div className="min-w-0">
              <p className="font-display text-[15px] leading-tight">{t.title}</p>
              {t.msg && <p className="mt-0.5 text-xs text-fog truncate">{t.msg}</p>}
            </div>
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            className="absolute top-2.5 right-2.5 text-fog hover:text-paper transition-colors"
            aria-label="Dismiss notification"
          >
            <IconClose size={14} />
          </button>
          <span
            className={`toast-bar absolute bottom-0 left-0 h-[2px] ${
              t.tone === "ok" ? "bg-moss" : t.tone === "err" ? "bg-rouge" : "bg-gold"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
