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
  dark: "group transition-colors",
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
      className={`shrink-0 ${tintOnHover ? "transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]" : ""} ${iconClassName}`}
    />
  );
  const hoverTextCls = tintOnHover ? "group-hover:text-[#ff975d]" : "";
  return (
    <button
      type="button"
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 active:scale-[0.97] ${VARIANT_CLASSES[variant]} ${className}`}
      style={variantStyle}
      {...rest}
    >
      {iconPosition === "leading" && iconEl}
      <span className={`${textClassName} transition-colors ${hoverTextCls}`}>{children}</span>
      {iconPosition === "trailing" && iconEl}
    </button>
  );
}
