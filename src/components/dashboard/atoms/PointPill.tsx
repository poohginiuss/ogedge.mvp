import type { ReactNode } from "react";

type PointPillProps = {
  /** Optional icon URL (typically the OG point coin). */
  icon?: string;
  /**
   * Tailwind size classes for the icon. Default sizing matches the natural
   * aspect-ratio of the OG coin glyph (~1.5:1, wider than tall) so the
   * logo renders intact instead of being letter-boxed into a narrow strip.
   */
  iconClassName?: string;
  children: ReactNode;
  /** Inner text size. Default "base". */
  textSize?: "sm" | "base";
  className?: string;
};

export function PointPill({
  icon,
  iconClassName = "h-4 w-6",
  children,
  textSize = "base",
  className = "",
}: PointPillProps) {
  const textCls = textSize === "sm" ? "text-sm" : "text-base";
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-lg border border-dark-border px-2 py-1 ${className}`}
      style={{ background: "#13151e" }}
    >
      <span
        className={`font-body font-bold text-white ${textCls}`}
        style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
      >
        {children}
      </span>
      {icon && (
        // `object-contain` so the wide OG glyph isn't cropped down into a
        // sliver (the previous `object-cover` + narrow w-[18px] box made
        // the logo render as a thin diagonal that looked like an "X").
        // Icon is rendered *after* the number to match the spec showing
        // "12 OG" / "24 OG" rather than "OG 12" / "OG 24".
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" className={`shrink-0 object-contain ${iconClassName}`} />
      )}
    </div>
  );
}
