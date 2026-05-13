import { CategoryIcon } from "./CategoryIcon";
import type { CategoryId } from "./faqData";

/**
 * Pill-shaped category selector used by both the dedicated `/faq` page
 * and the marketing FAQ section on the home page. Centralising the chip
 * here means a single source of truth for icon + label + count badge
 * styling, so designer tweaks to the active border/shadow / count badge
 * automatically propagate everywhere.
 *
 * Visual rules baked in:
 *   - Inactive: dark transparent fill, `--dark-border` outline, white text.
 *   - Active: brand-orange border + orange glow, brand-orange text, count
 *     badge background flips to brand-orange.
 *   - The icon uses `currentColor`, so it inherits the chip's text color
 *     automatically (no extra prop wiring needed).
 */
export function FaqCategoryChip({
  id,
  label,
  count,
  active,
  onClick,
}: {
  id: CategoryId;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="flex h-[50px] shrink-0 items-center gap-2 rounded-2xl px-4 transition-colors"
      style={{
        background: "rgba(0,0,0,0.2)",
        border: active ? "1px solid #ff975d" : "1px solid var(--dark-border)",
        boxShadow: active
          ? "0 4px 14px rgba(255,92,0,0.3)"
          : "0 4px 16px rgba(0,0,0,0.15)",
        color: active ? "var(--brand-main)" : "white",
      }}
    >
      <CategoryIcon id={id} label={label} className="h-5 w-5" />
      <span className="whitespace-nowrap font-body text-base font-medium leading-6">{label}</span>
      <span
        className="rounded-md px-1 py-0.5 font-body text-xs font-medium text-white"
        style={{
          background: active ? "var(--brand-main)" : "var(--dark-border)",
        }}
      >
        {count}
      </span>
    </button>
  );
}
