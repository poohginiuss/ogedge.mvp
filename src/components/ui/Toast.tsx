"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ToastVariant = "orange" | "blue" | "green" | "red" | "yellow";

export interface ToastAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  icon?: ReactNode;
  duration?: number;
  action?: ToastAction;
}

type ToastInput = Omit<ToastData, "id"> & { id?: string };

/* ------------------------------------------------------------------ */
/*  Variant colour map                                                 */
/* ------------------------------------------------------------------ */

const ACCENT: Record<ToastVariant, string> = {
  orange: "#ff5c00",
  blue: "#4285f4",
  green: "#34a853",
  red: "#c2272d",
  yellow: "#ffb000",
};

function darkenHex(hex: string, amount: number) {
  const value = hex.replace("#", "");
  const r = Math.round(parseInt(value.slice(0, 2), 16) * amount);
  const g = Math.round(parseInt(value.slice(2, 4), 16) * amount);
  const b = Math.round(parseInt(value.slice(4, 6), 16) * amount);

  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

/* ------------------------------------------------------------------ */
/*  Circle-badge icon (matches Figma concentric-ring badge)            */
/* ------------------------------------------------------------------ */

function BadgeIcon({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  const ringColor = darkenHex(color, 0.32);

  return (
    <div className="relative flex size-10 shrink-0 items-center justify-center">
      {/* radial glow background */}
      <div
        className="absolute inset-[-120%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}50 0%, ${color}30 25%, ${color}15 45%, transparent 65%)`,
        }}
      />
      {/* outer border/ring - separate from the icon circle so it does not clip content */}
      <div
        className="absolute size-10 rounded-full"
        style={{
          background: ringColor,
        }}
      />
      {/* main circle */}
      <div
        className="relative z-10 flex size-7 items-center justify-center overflow-hidden rounded-full"
        style={{
          background: color,
        }}
      >
        {/* <div className="absolute left-1/2 top-0 h-3 w-4 -translate-x-1/2 rounded-full bg-white/35 blur-[5px]" /> */}
        <div className="relative z-10 flex items-center justify-center text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Default icons per variant                                          */
/* ------------------------------------------------------------------ */

function PersonCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="4.5" r="2.5" stroke="white" strokeWidth="1.4" />
      <path
        d="M1 13.5c0-2.5 2-4.5 5-4.5s5 2 5 4.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M11.5 7l1.5 1.5L15.5 5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5c-1.5 2-3 5.5-3 8l1.5 2h3l1.5-2c0-2.5-1.5-6-3-8z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="7" r="1.2" stroke="white" strokeWidth="1.2" />
      <path
        d="M5 11.5l-1.5 2M11 11.5l1.5 2"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.4" />
      <path
        d="M5.75 5.75l4.5 4.5M10.25 5.75l-4.5 4.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.4" />
      <line x1="6.5" y1="5.5" x2="6.5" y2="10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.5" y1="5.5" x2="9.5" y2="10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const DEFAULT_ICONS: Record<ToastVariant, ReactNode> = {
  orange: <PersonCheckIcon />,
  blue: <RocketIcon />,
  green: <CheckIcon />,
  red: <XCircleIcon />,
  yellow: <PauseIcon />,
};

/* ------------------------------------------------------------------ */
/*  Action link                                                        */
/* ------------------------------------------------------------------ */

function ActionLink({ action }: { action: ToastAction }) {
  const Tag = action.href ? "a" : "button";
  const props = action.href
    ? { href: action.href }
    : { type: "button" as const, onClick: action.onClick };

  return (
    <Tag
      {...props}
      className="group inline-flex cursor-pointer items-center gap-1.5 font-body text-xs font-bold uppercase tracking-[0.3px] text-white transition-colors hover:text-[#ff975d]"
    >
      {action.label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        className="transition-transform group-hover:translate-x-0.5"
      >
        <path
          d="M4 10h12M12 6l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Single toast                                                       */
/* ------------------------------------------------------------------ */

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const { variant = "orange", duration = 5000 } = toast;
  const accent = ACCENT[variant];
  const [progress, setProgress] = useState(100);
  const [exiting, setExiting] = useState(false);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        dismiss();
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, dismiss]);

  const icon = toast.icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className={`pointer-events-auto relative flex w-full max-w-[384px] items-center gap-4 overflow-hidden rounded-2xl border border-dark-border bg-black px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 sm:px-5 sm:py-4 ${
        exiting
          ? "translate-x-[120%] opacity-0"
          : "translate-x-0 opacity-100"
      }`}
      style={{ animation: exiting ? undefined : "toast-slide-in 0.35s ease-out" }}
    >
      {/* badge icon */}
      <BadgeIcon color={accent}>{icon}</BadgeIcon>

      {/* text + action */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <p
            className="font-body text-sm font-bold leading-5 sm:text-base sm:leading-6"
            style={{ color: accent }}
          >
            {toast.title}
          </p>
          {toast.description && (
            <p className="font-body text-xs leading-4 text-white/90">
              {toast.description}
            </p>
          )}
        </div>
        {toast.action && (
          <ActionLink action={toast.action} />
        )}
      </div>

      {/* close */}
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 cursor-pointer p-1 text-white/60 transition-colors hover:text-white"
        aria-label="Dismiss"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* progress track */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-dark-border">
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: accent,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Context + Provider                                                 */
/* ------------------------------------------------------------------ */

interface ToastCtx {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((input: ToastInput) => {
    const id = input.id ?? `toast-${++counter}-${Date.now()}`;
    setToasts((prev) => [...prev, { ...input, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: add, dismiss }}>
      {children}

      {/* toast container — fixed top-right */}
      <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[calc(100vw-2rem)] max-w-[384px] flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
