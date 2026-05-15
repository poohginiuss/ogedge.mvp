import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ActionMenuButton } from "../orderTableShared";

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
      className="flex h-[72px] flex-1 items-center justify-center gap-3 rounded-2xl bg-dark-surface px-6 transition-colors hover:bg-[#2d2d40]"
    >
      <Image src={icon} alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
      <span className="whitespace-nowrap font-body text-xl font-semibold text-white">{label}</span>
    </button>
  );
}

export function OrderActionToolbar({
  onAdditionalPayment,
  onSupport,
  onReviewBooster,
  onPurchaseBoost,
}: ToolbarHandlers) {
  const mobileMenuItems = [
    ...(onAdditionalPayment
      ? [
          {
            label: "Additional Payment",
            icon: "/images/dashboard/orderview/icons/toolbar-payment.svg",
            onClick: onAdditionalPayment,
          },
        ]
      : []),
    ...(onSupport
      ? [
          {
            label: "Support",
            icon: "/images/dashboard/orderview/icons/toolbar-support.svg",
            onClick: onSupport,
          },
        ]
      : []),
    ...(onReviewBooster
      ? [
          {
            label: "Review Booster",
            icon: "/images/dashboard/orderview/icons/toolbar-review.svg",
            onClick: onReviewBooster,
          },
        ]
      : []),
  ];

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
        <Button
          variant="primary"
          size="xs"
          onClick={onPurchaseBoost}
          className="flex-1"
          style={{
            display: "flex",
            height: 72,
            padding: "0 24px",
            borderRadius: 16,
            whiteSpace: "nowrap",
            fontSize: 20,
          }}
        >
          Purchase Boost
        </Button>
      </div>

      {/* Mobile: Purchase Boost + 3-dot dropdown (per Figma 1619:6728) */}
      <div className="flex items-center justify-between gap-2 lg:hidden">
        <span className="shrink-0 font-body text-sm font-medium text-white">Order Details</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPurchaseBoost}
            className="flex h-[44px] items-center justify-center whitespace-nowrap rounded-2xl border border-[#ff975d] px-5 font-body text-sm font-bold uppercase text-white"
            style={{ background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)" }}
          >
            Purchase Boost
          </button>
          {mobileMenuItems.length > 0 && <ActionMenuButton items={mobileMenuItems} />}
        </div>
      </div>
    </>
  );
}
