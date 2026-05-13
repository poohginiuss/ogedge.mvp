import type { ReactNode } from "react";

type PointPillProps = {
  /** Optional icon URL (typically the OG point coin). */
  icon?: string;
  /** Tailwind size classes for the icon (e.g. "h-6 w-[18px]"). */
  iconClassName?: string;
  children: ReactNode;
  /** Inner text size. Default "base". */
  textSize?: "sm" | "base";
  className?: string;
};

export function PointPill({
  icon,
  iconClassName = "h-6 w-[18px]",
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
      {icon && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" className={`shrink-0 object-cover ${iconClassName}`} />
      )}
      <span
        className={`font-body font-bold text-white ${textCls}`}
        style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
      >
        {children}
      </span>
    </div>
  );
}
