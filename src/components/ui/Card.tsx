import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type CardVariant = "panel" | "subtle" | "glass" | "feature" | "review";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  bordered?: boolean;
  highlight?: boolean;
};

const baseClass = "relative rounded-3xl";

const gradients: Record<CardVariant, string> = {
  panel:
    "linear-gradient(109deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
  subtle: "rgba(0,0,0,0.2)",
  glass: "rgba(23,25,31,0.5)",
  feature:
    "linear-gradient(-46deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
  review:
    "linear-gradient(117deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
};

export function Card({
  children,
  variant = "panel",
  bordered = true,
  highlight = false,
  className = "",
  style,
  ...rest
}: CardProps) {
  const merged: CSSProperties = {
    background: gradients[variant],
    ...(bordered
      ? {
          border: highlight ? "2px solid #ff975d" : "1px solid #6d6d96",
        }
      : {}),
    ...(highlight
      ? { boxShadow: "0 4px 44px rgba(255,92,0,0.25)" }
      : {}),
    backdropFilter: "blur(7px)",
    WebkitBackdropFilter: "blur(7px)",
    ...style,
  };

  return (
    <div className={`${baseClass} ${className}`} style={merged} {...rest}>
      {children}
    </div>
  );
}
