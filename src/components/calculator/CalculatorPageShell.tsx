import type { ReactNode } from "react";

import type { CategoryOption } from "./shared/CategoryTabs";
import { CategoryTabs } from "./shared/CategoryTabs";
import { TrustBadges } from "./shared/TrustBadges";

type CalculatorPageShellProps = {
  /** Optional top banner row (e.g. SeasonBanner + WeeklyEventBanner) */
  topBanner?: ReactNode;
  /** Category tab options for service selection */
  categoryOptions: CategoryOption[];
  /** Currently selected category id */
  category: string;
  /** Callback when category changes */
  onCategoryChange: (id: string) => void;
  /** LEFT slot — dynamic calculator form */
  left: ReactNode;
  /** RIGHT slot — OrderSummary panel */
  right: ReactNode;
};

export function CalculatorPageShell({
  topBanner,
  categoryOptions,
  category,
  onCategoryChange,
  left,
  right,
}: CalculatorPageShellProps) {
  return (
    <section className="relative z-20 -mt-[60px] md:-mt-[80px] lg:-mt-[80px]">
      <div className="mx-auto w-full max-w-[1410px] px-4 md:px-6">
        {topBanner && <div className="mb-6">{topBanner}</div>}

        <div className="mt-6">
          <TrustBadges />
        </div>

        <div className="mt-6">
          <CategoryTabs options={categoryOptions} value={category} onChange={onCategoryChange} />
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_490px]">
          {left}
          {right}
        </div>
      </div>
    </section>
  );
}
