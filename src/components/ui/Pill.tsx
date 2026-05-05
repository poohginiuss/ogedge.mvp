import type { HTMLAttributes, ReactNode } from "react";

type PillProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  active?: boolean;
};

export function Pill({ children, active = false, className = "", style, ...rest }: PillProps) {
  const merged = {
    background: "linear-gradient(-19deg, rgba(23,25,31,1) 0%, rgba(56,56,82,1) 100%)",
    border: active ? "2px solid #ff975d" : "1px solid #383852",
    ...(active ? { boxShadow: "0 4px 44px rgba(255,92,0,0.25)" } : {}),
    ...style,
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 ${className}`}
      style={merged}
      {...rest}
    >
      {children}
    </div>
  );
}
