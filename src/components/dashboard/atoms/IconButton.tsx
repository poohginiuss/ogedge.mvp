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
      className={`relative flex shrink-0 items-center justify-center rounded-lg ${variantClasses} ${className}`}
      style={variantStyle}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className={iconClassName} />
      {overlay}
      {children}
    </button>
  );
}
