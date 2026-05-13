import type { ReactNode } from "react";
import { SectionHeading } from "../molecules";

type OrderSectionProps = {
  title: string;
  onSeeAll?: () => void;
  /** Optional override for the heading text style. */
  titleClassName?: string;
  children: ReactNode;
  className?: string;
};

export function OrderSection({
  title,
  onSeeAll,
  titleClassName,
  children,
  className = "flex flex-col gap-6",
}: OrderSectionProps) {
  return (
    <div className={className}>
      <SectionHeading title={title} onSeeAll={onSeeAll} titleClassName={titleClassName} />
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
