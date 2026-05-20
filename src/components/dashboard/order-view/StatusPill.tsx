import type { CSSProperties } from "react";
import type { OrderHeroStatus } from "./orderViewData";

/**
 * Visual theme + glyph for each hero-card status pill. The eight
 * variants come straight from Figma node 1491:7440 and its sister
 * status frames (1491:9232, 1491:9260, 1491:9290, …). Each pill has a
 * gradient fill, a left-aligned label stack and a right-aligned
 * decorative circle.
 */
type PillTheme = {
  label: string;
  background: string;
  glyph: PillGlyph;
};

type PillGlyph = "ring" | "clock" | "play" | "pause" | "check" | "cross" | "star" | "ship";

/**
 * Pill backgrounds fade from transparent (left, blending into the hero
 * card) to the saturated brand colour (right). The 90° gradient is what
 * the Figma uses for every status variant — it makes the pill feel like
 * it grows out of the card.
 */
const STATUS_PILL_THEME: Record<OrderHeroStatus, PillTheme> = {
  "not-started": {
    label: "NOT STARTED",
    background:
      "linear-gradient(90deg, rgba(66,133,244,0) 0%, rgba(66,133,244,0.45) 30%, #4285f4 100%)",
    glyph: "ring",
  },
  "waiting-for-booster": {
    label: "WAITING FOR BOOSTER",
    background:
      "linear-gradient(90deg, rgba(194,39,45,0) 0%, rgba(194,39,45,0.45) 30%, #c2272d 100%)",
    glyph: "clock",
  },
  "in-progress": {
    label: "IN PROGRESS",
    background:
      "linear-gradient(90deg, rgba(66,133,244,0) 0%, rgba(66,133,244,0.45) 30%, #4285f4 100%)",
    glyph: "play",
  },
  paused: {
    label: "PAUSED",
    background: "linear-gradient(90deg, #21222f 0%, #906918 20%, #ffb000 100%)",
    glyph: "pause",
  },
  "review-order": {
    label: "REVIEW ORDER",
    background:
      "linear-gradient(90deg, rgba(109,30,212,0) 0%, rgba(109,30,212,0.45) 30%, #6d1ed4 100%)",
    glyph: "star",
  },
  "confirm-delivery": {
    label: "CONFIRM DELIVERY",
    background:
      "linear-gradient(90deg, rgba(52,168,83,0) 0%, rgba(52,168,83,0.45) 30%, #34a853 100%)",
    glyph: "ship",
  },
  complete: {
    label: "COMPLETE",
    background:
      "linear-gradient(90deg, rgba(52,168,83,0) 0%, rgba(52,168,83,0.45) 30%, #34a853 100%)",
    glyph: "check",
  },
  cancelled: {
    label: "CANCELLED",
    background: "linear-gradient(90deg, rgba(56,56,82,0) 0%, rgba(56,56,82,0.6) 30%, #383852 100%)",
    glyph: "cross",
  },
};

/**
 * Inline SVG glyphs. We keep them inline (vs. shipping eight files)
 * because each is a tiny single-colour shape and inlining avoids a
 * runtime fetch + a flash of empty space.
 */
function Glyph({ kind }: { kind: PillGlyph }) {
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    fill: "none" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "ring":
      return <circle cx="14" cy="14" r="6" {...stroke} strokeDasharray="2 3" />;
    case "clock":
      return (
        <g {...stroke}>
          <circle cx="14" cy="14" r="7" />
          <path d="M14 10v4l3 2" />
        </g>
      );
    case "play":
      return <path d="M11 9l8 5-8 5z" fill="currentColor" />;
    case "pause":
      return (
        <svg viewBox="0 0 49 49" width="28" height="28" x="0" y="0">
          <path d="M17.15 34.3H22.05V14.7H17.15V34.3ZM26.95 34.3H31.85V14.7H26.95V34.3ZM24.5 49C21.1108 49 17.9258 48.3569 14.945 47.0706C11.9642 45.7844 9.37125 44.0388 7.16625 41.8338C4.96125 39.6288 3.21563 37.0358 1.92938 34.055C0.643125 31.0742 0 27.8892 0 24.5C0 21.1108 0.643125 17.9258 1.92938 14.945C3.21563 11.9642 4.96125 9.37125 7.16625 7.16625C9.37125 4.96125 11.9642 3.21563 14.945 1.92938C17.9258 0.643125 21.1108 0 24.5 0C27.8892 0 31.0742 0.643125 34.055 1.92938C37.0358 3.21563 39.6288 4.96125 41.8338 7.16625C44.0388 9.37125 45.7844 11.9642 47.0706 14.945C48.3569 17.9258 49 21.1108 49 24.5C49 27.8892 48.3569 31.0742 47.0706 34.055C45.7844 37.0358 44.0388 39.6288 41.8338 41.8338C39.6288 44.0388 37.0358 45.7844 34.055 47.0706C31.0742 48.3569 27.8892 49 24.5 49ZM24.5 44.1C29.9717 44.1 34.6063 42.2013 38.4038 38.4038C42.2013 34.6063 44.1 29.9717 44.1 24.5C44.1 19.0283 42.2013 14.3937 38.4038 10.5962C34.6063 6.79875 29.9717 4.9 24.5 4.9C19.0283 4.9 14.3937 6.79875 10.5962 10.5962C6.79875 14.3937 4.9 19.0283 4.9 24.5C4.9 29.9717 6.79875 34.6063 10.5962 38.4038C14.3937 42.2013 19.0283 44.1 24.5 44.1Z" fill="currentColor"/>
        </svg>
      );
    case "check":
      return <path d="M9 14l4 4 7-8" {...stroke} />;
    case "cross":
      return <path d="M9 9l10 10M19 9L9 19" {...stroke} />;
    case "star":
      return (
        <path
          d="M14 8l1.8 3.7 4 .6-2.9 2.9.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.9 4-.6z"
          fill="currentColor"
        />
      );
    case "ship":
      return (
        <g {...stroke}>
          <path d="M6 16h16l-2-5H8z" />
          <path d="M9 16v3M19 16v3" />
        </g>
      );
  }
}

type StatusPillProps = {
  status: OrderHeroStatus;
  /** Optional countdown shown below the title (e.g. "03:21:12"). */
  countdown?: string;
  /** Optional sub-label rendered above the title. */
  subLabel?: string;
  className?: string;
};

/**
 * Right-aligned status pill inside the hero card. Width is capped so
 * the label sits on two lines if needed; the decorative glyph circle
 * sits flush against the right edge.
 */
export function StatusPill({ status, countdown, subLabel, className }: StatusPillProps) {
  const theme = STATUS_PILL_THEME[status];
  const style: CSSProperties = { background: theme.background };
  const isPaused = theme.glyph === "pause";

  return (
    <div
      className={`relative flex items-center gap-4 overflow-hidden rounded-2xl px-6 py-4 text-white ${className ?? ""}`}
      style={{ ...style, minHeight: "138px" }}
    >
      {isPaused && (
        <div
          aria-hidden
          className="absolute right-6 top-1/2 z-0 flex -translate-y-1/2 items-center justify-center"
          style={{ width: "82px", height: "82px" }}
        >
          <span className="absolute inset-0 rounded-full border border-dashed border-white/30" />
          <span
            className="flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)" }}
          >
            <svg width="38" height="38" viewBox="0 0 49 49" fill="none">
              <path d="M17.15 34.3H22.05V14.7H17.15V34.3ZM26.95 34.3H31.85V14.7H26.95V34.3ZM24.5 49C21.1108 49 17.9258 48.3569 14.945 47.0706C11.9642 45.7844 9.37125 44.0388 7.16625 41.8338C4.96125 39.6288 3.21563 37.0358 1.92938 34.055C0.643125 31.0742 0 27.8892 0 24.5C0 21.1108 0.643125 17.9258 1.92938 14.945C3.21563 11.9642 4.96125 9.37125 7.16625 7.16625C9.37125 4.96125 11.9642 3.21563 14.945 1.92938C17.9258 0.643125 21.1108 0 24.5 0C27.8892 0 31.0742 0.643125 34.055 1.92938C37.0358 3.21563 39.6288 4.96125 41.8338 7.16625C44.0388 9.37125 45.7844 11.9642 47.0706 14.945C48.3569 17.9258 49 21.1108 49 24.5C49 27.8892 48.3569 31.0742 47.0706 34.055C45.7844 37.0358 44.0388 39.6288 41.8338 41.8338C39.6288 44.0388 37.0358 45.7844 34.055 47.0706C31.0742 48.3569 27.8892 49 24.5 49ZM24.5 44.1C29.9717 44.1 34.6063 42.2013 38.4038 38.4038C42.2013 34.6063 44.1 29.9717 44.1 24.5C44.1 19.0283 42.2013 14.3937 38.4038 10.5962C34.6063 6.79875 29.9717 4.9 24.5 4.9C19.0283 4.9 14.3937 6.79875 10.5962 10.5962C6.79875 14.3937 4.9 19.0283 4.9 24.5C4.9 29.9717 6.79875 34.6063 10.5962 38.4038C14.3937 42.2013 19.0283 44.1 24.5 44.1Z" fill="white"/>
            </svg>
          </span>
        </div>
      )}

      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center text-center">
        <span className="font-body text-2xl font-bold uppercase leading-tight">{theme.label}</span>
        {subLabel && (
          <div className="mt-1 flex flex-col items-center gap-0.5">
            <span className="font-body text-sm text-white">{subLabel}</span>
            {countdown && (
              <span className="font-body text-lg font-semibold uppercase tabular-nums tracking-[1.8px]">
                {countdown}
              </span>
            )}
          </div>
        )}
        {!subLabel && countdown && (
          <span className="mt-1 font-body text-lg font-semibold uppercase tabular-nums tracking-[1.8px]">
            {countdown}
          </span>
        )}
      </div>

      {!isPaused && (
        <div className="relative flex h-[48px] w-[48px] shrink-0 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-dashed border-white/40"
          />
          <span aria-hidden className="absolute inset-1 rounded-full bg-white/10" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            role="presentation"
            className="relative text-white"
          >
            <Glyph kind={theme.glyph} />
          </svg>
        </div>
      )}
    </div>
  );
}
