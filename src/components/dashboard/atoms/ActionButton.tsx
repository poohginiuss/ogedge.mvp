import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonVariant = "dark" | "outline" | "brand";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Optional icon URL. */
  icon?: string;
  iconClassName?: string;
  children: ReactNode;
  /** Visual variant. */
  variant?: ActionButtonVariant;
  /** Where to render the icon relative to the label. */
  iconPosition?: "leading" | "trailing";
  /** Tailwind utilities for the label text. */
  textClassName?: string;
};

const VARIANT_CLASSES: Record<ActionButtonVariant, string> = {
  dark: "group transition-colors hover:text-brand-main",
  outline: "group border border-brand-light transition-all hover:border-brand-main hover:bg-brand-main/15",
  brand: "bg-brand-main transition-opacity hover:opacity-85",
};

export function ActionButton({
  icon,
  iconClassName = "h-3.5 w-3.5",
  children,
  variant = "dark",
  iconPosition = "leading",
  textClassName = "font-body text-sm font-medium uppercase text-white",
  className = "",
  ...rest
}: ActionButtonProps) {
  const variantStyle = variant === "brand" ? undefined : { background: "rgba(0,0,0,0.2)" };
  const tintOnHover = variant !== "brand";
  const iconEl = icon && (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={icon}
      alt=""
      className={`shrink-0 ${tintOnHover ? "transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(42%)_sepia(97%)_saturate(2668%)_hue-rotate(3deg)_brightness(104%)_contrast(106%)]" : ""} ${iconClassName}`}
    />
  );
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 ${VARIANT_CLASSES[variant]} ${className}`}
      style={variantStyle}
      {...rest}
    >
      {iconPosition === "leading" && iconEl}
      <span className={textClassName}>{children}</span>
      {iconPosition === "trailing" && iconEl}
    </button>
  );
}
