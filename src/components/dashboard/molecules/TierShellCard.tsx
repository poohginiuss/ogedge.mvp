import type { ReactNode } from "react";

type TierShellCardProps = {
  children: ReactNode;
  /** Highlights the card with brand-light border when true. */
  active?: boolean;
  className?: string;
};

export function TierShellCard({
  children,
  active = false,
  className = "flex flex-col gap-4 rounded-2xl p-4",
}: TierShellCardProps) {
  return (
    <div
      className={className}
      style={{
        background: "#17191f",
        border: active ? "1px solid var(--brand-light)" : "1px solid transparent",
      }}
    >
      {children}
    </div>
  );
}
