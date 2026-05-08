"use client";

import Link from "next/link";
import { useState } from "react";
import type { ButtonHTMLAttributes, CSSProperties, FocusEvent, MouseEvent, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "lg" | "sm";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type AsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type AsLinkProps = ButtonBaseProps & {
  href: string;
};

export type ButtonProps = AsButtonProps | AsLinkProps;

const sizeText: Record<ButtonSize, string> = {
  lg: "text-xl tracking-[0.4px]",
  sm: "text-base tracking-[0.32px] leading-6",
};

function getVariantClasses(variant: ButtonVariant) {
  switch (variant) {
    case "primary":
      return "disabled:opacity-40";
    case "secondary":
      return "disabled:opacity-40";
    case "link":
      return "disabled:opacity-40";
  }
}

function getVariantStyle(
  variant: ButtonVariant,
  state: "default" | "hover" | "focus",
): CSSProperties {
  const shared: CSSProperties = {
    alignItems: "center",
    borderRadius: variant === "link" && state === "focus" ? 16 : 24,
    color: state === "hover" && variant !== "primary" ? "#ff975d" : "#ffffff",
    display: "inline-flex",
    justifyContent: "center",
    opacity: 1,
    padding: variant === "link" ? undefined : "24px 32px",
  };

  if (variant === "primary") {
    return {
      ...shared,
      backgroundImage: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)",
      border: `${state === "focus" ? 4 : 2}px solid ${state === "focus" ? "#cc794a" : "#ff975d"}`,
      boxShadow:
        state === "hover"
          ? "0 4px 64px rgba(253,91,1,0.5), 0 4px 64px rgba(255,92,0,0.7)"
          : "0 4px 32px rgba(255,92,0,0.4)",
    };
  }

  if (variant === "secondary") {
    return {
      ...shared,
      background: "rgba(23,25,31,0.5)",
      backdropFilter: "blur(3px)",
      border: `${state === "focus" ? 4 : 2}px solid ${state === "focus" ? "#cc794a" : "#ff975d"}`,
      boxShadow:
        state === "hover" ? "0 4px 34px rgba(255,92,0,0.3)" : "0 4px 34px rgba(255,92,0,0.2)",
    };
  }

  return shared;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", icon, children, className = "" } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const state = isFocused ? "focus" : isHovered ? "hover" : "default";

  const base =
    "inline-flex items-center justify-center rounded-3xl font-body font-bold uppercase transition-all duration-200 focus:outline-none";

  const padding = variant === "link" ? "" : "px-8 py-6";
  const variantCls = getVariantClasses(variant);

  const combinedClassName = `${base} ${padding} ${sizeText[size]} ${variantCls} ${className}`;
  const style = getVariantStyle(variant, state);

  const content = (
    <>
      <span className="leading-6">{children}</span>
      {icon && <span className="ml-2 flex items-center justify-center">{icon}</span>}
    </>
  );

  if (props.href != null) {
    return (
      <Link
        href={props.href}
        className={combinedClassName}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {content}
      </Link>
    );
  }

  const {
    href: _,
    variant: _v,
    size: _s,
    icon: _i,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    style: buttonStyle,
    ...buttonProps
  } = props as AsButtonProps;

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <button
      {...buttonProps}
      type="button"
      className={combinedClassName}
      style={{ ...style, ...buttonStyle }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {content}
    </button>
  );
}
