"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "large" | "small";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "large",
  icon,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const isLarge = size === "large";
  const textSize = isLarge ? "text-xl tracking-[0.4px]" : "text-base tracking-[0.32px]";

  const base =
    "inline-flex items-center justify-center rounded-3xl font-body font-bold uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/60 disabled:opacity-50 disabled:cursor-not-allowed";

  const padding = variant === "link" ? "" : "px-8 py-6";

  let variantClasses = "";
  let variantStyle: React.CSSProperties = {};

  switch (variant) {
    case "primary":
      variantClasses = "text-white border-2 border-[#ff975d]";
      variantStyle = {
        backgroundImage: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)",
        boxShadow: "0 4px 32px rgba(255,92,0,0.4)",
      };
      break;
    case "secondary":
      variantClasses = "text-white border-2 border-[#ff975d] backdrop-blur-[3px]";
      variantStyle = {
        background: "rgba(23,25,31,0.5)",
        boxShadow: "0 4px 22px rgba(255,92,0,0.2)",
      };
      break;
    case "link":
      variantClasses = "text-white";
      break;
  }

  if (disabled) {
    variantStyle = { ...variantStyle, opacity: 0.5 };
  }

  return (
    <button
      className={`${base} ${padding} ${textSize} ${variantClasses} ${className}`}
      style={variantStyle}
      disabled={disabled}
      {...rest}
    >
      <span className="leading-6">{children}</span>
      {icon && <span className="ml-2 flex items-center justify-center">{icon}</span>}
    </button>
  );
}
