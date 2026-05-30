import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonVariant = "ghost" | "filled";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Icon URL. */
  icon: string;
  /** Tailwind size classes for the icon (e.g. "h-4 w-4", "h-6 w-6"). */
  iconClassName?: string;
  /**
   * - "ghost"  : transparent bg, p-3, used for desktop notification button.
   * - "filled" : dark fill, h-8 w-8 p-2, used for mobile order action buttons.
   */
  variant?: IconButtonVariant;
  /** Optional overlay (e.g. NotificationDot). The button is always `relative`. */
  overlay?: ReactNode;
};

export function IconButton({
  icon,
  iconClassName = "h-4 w-4",
  variant = "filled",
  overlay,
  className = "",
  children,
  ...rest
}: IconButtonProps) {
  const variantClasses = variant === "filled" ? "h-8 w-8 p-2" : "p-3";
  const variantStyle = variant === "filled" ? { background: "rgba(56,56,82,0.6)" } : undefined;
  return (
    <button
      type="button"
      className={`group relative flex shrink-0 cursor-pointer items-center justify-center rounded-lg transition-all active:scale-95 ${variantClasses} ${className}`}
      style={variantStyle}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className={`${iconClassName} transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]`} />
      {overlay}
      {children}
    </button>
  );
}
