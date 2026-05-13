import type { ReactNode } from "react";

type IconChipProps = {
  /** Background color (any CSS color value). */
  background?: string;
  /** Text color (any CSS color value). Defaults to white. */
  color?: string;
  /** Optional leading icon URL. */
  icon?: string;
  iconClassName?: string;
  children: ReactNode;
  /** Text size: xs (12px) or sm (14px). Default "xs". */
  size?: "xs" | "sm";
  /** Font weight. Default "bold". */
  weight?: "medium" | "semibold" | "bold";
  /** Default true to match common badge style. */
  uppercase?: boolean;
  className?: string;
};

const WEIGHT_CLASSES: Record<NonNullable<IconChipProps["weight"]>, string> = {
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function IconChip({
  background,
  color = "#fff",
  icon,
  iconClassName = "h-4 w-4",
  children,
  size = "xs",
  weight = "bold",
  uppercase = true,
  className = "",
}: IconChipProps) {
  const textSize = size === "xs" ? "text-xs" : "text-sm";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 font-body ${textSize} ${WEIGHT_CLASSES[weight]} ${uppercase ? "uppercase" : ""} ${className}`}
      style={{ background, color }}
    >
      {icon && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" className={`shrink-0 ${iconClassName}`} />
      )}
      {children}
    </span>
  );
}
