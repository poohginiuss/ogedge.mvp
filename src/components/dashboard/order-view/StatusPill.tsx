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
        <g fill="currentColor">
          <rect x="10" y="9" width="3" height="10" rx="1" />
          <rect x="15" y="9" width="3" height="10" rx="1" />
        </g>
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
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="8" y="6" width="4" height="16" rx="1.5" fill="white" fillOpacity="0.9" />
              <rect x="16" y="6" width="4" height="16" rx="1.5" fill="white" fillOpacity="0.9" />
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
