/**
 * Four-button row shown above the hero card on the customer order view.
 * Three secondary "card" buttons (Additional Payment / Support / Review
 * Booster) plus the primary orange CTA (Purchase Boost), which uses the
 * shared `Button` component but is height-locked to 58px so it lines up
 * with the rest of the row.
 *
 * On mobile we collapse to: `Order Details` label + `PURCHASE BOOST`
 * button + a 3-dot menu that opens the rest (per Figma node 1619:6676).
 */

import { Button } from "@/components/ui/Button";
import Image from "next/image";

type ToolbarHandlers = {
  onAdditionalPayment?: () => void;
  onSupport?: () => void;
  onReviewBooster?: () => void;
  onPurchaseBoost?: () => void;
  onMore?: () => void;
};

function ToolbarButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[58px] flex-1 items-center justify-center gap-2 rounded-2xl bg-dark-surface px-4 transition-colors hover:bg-[#2d2d40]"
    >
      <Image src={icon} alt="" width={20} height={20} className="shrink-0" />
      <span className="whitespace-nowrap font-body text-base font-medium text-white">{label}</span>
    </button>
  );
}

export function OrderActionToolbar({
  onAdditionalPayment,
  onSupport,
  onReviewBooster,
  onPurchaseBoost,
  onMore,
}: ToolbarHandlers) {
  return (
    <>
      {/* Desktop / tablet: full 4-button row */}
      <div className="hidden items-stretch gap-4 lg:flex">
        <ToolbarButton
          icon="/images/dashboard/orderview/icons/toolbar-payment.svg"
          label="Additional Payment"
          onClick={onAdditionalPayment}
        />
        <ToolbarButton
          icon="/images/dashboard/orderview/icons/toolbar-support.svg"
          label="Support"
          onClick={onSupport}
        />
        <ToolbarButton
          icon="/images/dashboard/orderview/icons/toolbar-review.svg"
          label="Review Booster"
          onClick={onReviewBooster}
        />
        {/* Shared Button component, but height-locked + display:flex
            overridden so it grows like the rest of the row. */}
        <Button
          variant="primary"
          size="xs"
          onClick={onPurchaseBoost}
          className="flex-1"
          style={{
            display: "flex",
            height: 58,
            padding: "0 24px",
            borderRadius: 16,
            whiteSpace: "nowrap",
          }}
        >
          Purchase Boost
        </Button>
      </div>

      {/* Mobile: collapsed row with the primary CTA + 3-dot overflow */}
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <span className="font-body text-base font-semibold text-white/70">Order Details</span>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="xs"
            onClick={onPurchaseBoost}
            style={{
              display: "flex",
              height: 44,
              padding: "0 20px",
              borderRadius: 12,
              whiteSpace: "nowrap",
            }}
          >
            Purchase Boost
          </Button>
          <button
            type="button"
            onClick={onMore}
            aria-label="More actions"
            className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-dark-surface"
          >
            <span className="text-xl leading-none text-white">⋮</span>
          </button>
        </div>
      </div>
    </>
  );
}
