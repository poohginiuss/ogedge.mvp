"use client";

import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { useState } from "react";
import { InfoTooltip } from "./InfoTooltip";

export type SummaryRow = {
  label: string;
  value: string;
};

export type ExtraOption = {
  id: string;
  label: string;
  cost: string;
  defaultOn?: boolean;
};

export type FinalRow = {
  label: string;
  value: string;
};

export type VolumeDiscountTier = {
  /** Order subtotal must be >= this to qualify */
  minAmount: number;
  /** Total discount % awarded at this tier */
  discountPercent: number;
};

type OrderSummaryProps = {
  /** Header (small label above the title) */
  eyebrow?: string;
  title: string;
  estimatedTime: string;
  startInLabel: string;
  rows: SummaryRow[];
  extras?: ExtraOption[];
  finalRows: FinalRow[];
  totalAmount: string;
  /** Numeric subtotal used to evaluate volume discount tiers */
  orderSubtotal?: number;
  /** Admin-defined volume discount tiers (sorted ascending by minAmount) */
  volumeDiscountTiers?: VolumeDiscountTier[];
  /** Banner messages above the final rows */
  discountMessage?: string;
  maxDiscountReached?: boolean;
  /** Default coupon code shown in the input */
  defaultCoupon?: string;
  paymentMethods?: string[];
};

const defaultPayments = [
  "visa",
  "mastercard",
  "paypal",
  "applepay",
  "gpay",
  "crypto",
  "venmo",
  "zelle",
];

/**
 * Color a price-row value according to its meaning (Slack msg #55):
 *   - "FREE"            → success green
 *   - starts with "-"   → brand orange (discount)
 *   - everything else   → white (regular extras / surcharges)
 */
function valueColorClass(value: string): string {
  const trimmed = value.trim();
  if (/free/i.test(trimmed)) return "text-[#1aad19]";
  if (trimmed.startsWith("-")) return "text-brand-light";
  return "text-white";
}

function getVolumeDiscountState(
  tiers: VolumeDiscountTier[],
  subtotal: number,
) {
  const sorted = [...tiers].sort((a, b) => a.minAmount - b.minAmount);

  let activeTier: VolumeDiscountTier | null = null;
  let nextTier: VolumeDiscountTier | null = null;

  for (let i = 0; i < sorted.length; i++) {
    if (subtotal >= sorted[i].minAmount) {
      activeTier = sorted[i];
      nextTier = sorted[i + 1] ?? null;
    } else {
      if (!activeTier) nextTier = sorted[i];
      break;
    }
  }

  const prevThreshold = activeTier?.minAmount ?? 0;
  const nextThreshold = nextTier?.minAmount ?? prevThreshold;
  const range = nextThreshold - prevThreshold;
  const progressPercent =
    range > 0
      ? Math.min(100, Math.max(0, ((subtotal - prevThreshold) / range) * 100))
      : 100;

  return {
    activeTier,
    nextTier,
    isMax: activeTier !== null && nextTier === null,
    amountToNext: nextTier ? nextTier.minAmount - subtotal : 0,
    extraPercent: nextTier
      ? nextTier.discountPercent - (activeTier?.discountPercent ?? 0)
      : 0,
    progressPercent,
  };
}

/** Pick a fill color for the progress bar based on how far through the tiers we are */
function tierColor(activeTier: VolumeDiscountTier | null, isMax: boolean, allTiers: VolumeDiscountTier[]) {
  if (isMax) return { fill: "#1aad19", glow: "rgba(26,173,25,0.5)" };
  if (!activeTier) return { fill: "#ff5c00", glow: "rgba(255,92,0,0.4)" };
  const sorted = [...allTiers].sort((a, b) => a.minAmount - b.minAmount);
  const idx = sorted.findIndex((t) => t.minAmount === activeTier.minAmount);
  const colors = [
    { fill: "#ff5c00", glow: "rgba(255,92,0,0.4)" },
    { fill: "#ff8c00", glow: "rgba(255,140,0,0.4)" },
    { fill: "#f5a623", glow: "rgba(245,166,35,0.4)" },
    { fill: "#1aad19", glow: "rgba(26,173,25,0.5)" },
  ];
  return colors[Math.min(idx + 1, colors.length - 1)];
}

function VolumeDiscountBanners({
  tiers,
  subtotal,
  discountMessage,
  maxDiscountReached,
}: {
  tiers?: VolumeDiscountTier[];
  subtotal?: number;
  discountMessage?: string;
  maxDiscountReached?: boolean;
}) {
  const hasVolumeTiers = tiers && tiers.length > 0 && subtotal != null;

  const vol = hasVolumeTiers ? getVolumeDiscountState(tiers, subtotal) : null;

  const showProgress = vol && vol.nextTier && vol.amountToNext > 0;
  const showApplied = vol ? vol.activeTier !== null : !!discountMessage;
  const showMax = vol ? vol.isMax : !!maxDiscountReached;

  const appliedText = vol?.activeTier
    ? `${vol.activeTier.discountPercent}% discount applied to your order`
    : discountMessage;

  if (!showProgress && !showApplied && !showMax) return null;

  const color = vol
    ? tierColor(vol.activeTier, vol.isMax, tiers!)
    : { fill: "#ff5c00", glow: "rgba(255,92,0,0.4)" };

  return (
    <div className="flex flex-col gap-2">
      {showProgress && vol && (
        <div
          className="relative overflow-hidden rounded-2xl font-body text-sm"
          style={{
            background: "rgba(0,0,0,0.25)",
            border: vol.activeTier
              ? `1px solid ${color.glow}`
              : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded transition-all duration-700 ease-out"
            style={{
              width: `${vol.progressPercent}%`,
              background: `linear-gradient(90deg, ${color.fill} 0%, ${color.fill}99 100%)`,
              boxShadow: `0 0 16px ${color.glow}`,
            }}
          />
          <span
            className="relative z-10 block px-4 py-3 text-center font-semibold text-white"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
          >
            Add ${vol.amountToNext.toFixed(2)} to save an extra{" "}
            {vol.extraPercent}% on your order
          </span>
        </div>
      )}

      {showApplied && appliedText && (
        <div
          className="relative overflow-hidden rounded-2xl font-body text-sm"
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${color.glow}`,
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-2xl"
            style={{
              width: "100%",
              background: `linear-gradient(90deg, ${color.fill}40 0%, ${color.fill}20 100%)`,
            }}
          />
          <span
            className="relative z-10 block px-4 py-3 text-center font-semibold"
            style={{
              color: color.fill,
              textShadow: `0 0 10px ${color.glow}`,
            }}
          >
            {appliedText}
          </span>
        </div>
      )}

      {showMax && (
        <div
          className="relative overflow-hidden rounded-2xl font-body text-base font-semibold"
          style={{
            background: "rgba(26,173,25,0.15)",
            border: "1px solid rgba(26,173,25,0.35)",
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-2xl"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, rgba(26,173,25,0.3) 0%, rgba(26,173,25,0.1) 100%)",
            }}
          />
          <span
            className="relative z-10 block px-4 py-3 text-center"
            style={{ color: "#1aad19", textShadow: "0 0 8px rgba(26,173,25,0.5)" }}
          >
            Maximum discount reached!
          </span>
        </div>
      )}
    </div>
  );
}

export function OrderSummary({
  eyebrow = "Order Summary",
  title,
  estimatedTime,
  startInLabel,
  rows,
  extras = [],
  finalRows,
  totalAmount,
  orderSubtotal,
  volumeDiscountTiers,
  discountMessage,
  maxDiscountReached = false,
  defaultCoupon = "",
  paymentMethods = defaultPayments,
}: OrderSummaryProps) {
  const [extrasState, setExtrasState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(extras.map((o) => [o.id, !!o.defaultOn])),
  );
  const [couponCode, setCouponCode] = useState(defaultCoupon);
  const [couponApplied, setCouponApplied] = useState(false);

  return (
    <aside
      className="flex flex-col rounded-3xl p-6"
      style={{
        border: "2px solid #6d6d96",
        background:
          "linear-gradient(109deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        backdropFilter: "blur(7px)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-sm text-white/80">{eyebrow}</p>
          <h3 className="font-body text-2xl font-semibold text-white">{title}</h3>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span
              className="font-body text-lg font-bold text-brand-light"
              style={{ textShadow: "0 0 12px rgba(255,151,93,0.6)" }}
            >
              {estimatedTime}
            </span>
            <InfoTooltip
              label="Estimated start time details"
              panelClassName="bottom-full right-0 mb-3 w-[220px] translate-y-2 rounded-2xl border border-[#6d6d96] bg-dark-main px-4 py-3 text-left shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            >
              <span className="block font-body text-xs font-bold text-brand-light">
                {estimatedTime}
              </span>
              <span className="mt-1 block font-body text-xs leading-5 text-white/80">
                Estimated completion time. Your order can start in{" "}
                <span className="font-bold text-white">{startInLabel}</span>, depending on queue and
                booster availability.
              </span>
            </InfoTooltip>
          </div>
          <p className="mt-1 font-body text-sm text-white/80">
            <span className="font-bold text-white">{startInLabel}</span> until start time
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-4 py-1 ${i % 2 === 0 ? "rounded-xl" : ""}`}
            style={i % 2 === 0 ? { background: "rgba(0,0,0,0.2)" } : undefined}
          >
            <span className="font-body text-sm text-white/80">{row.label}</span>
            <span className="font-body text-base font-semibold text-white">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="my-4 h-px w-full bg-border-subtle" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className="flex h-10 min-w-0 flex-1 items-center rounded-xl px-3 transition-colors sm:h-12 sm:rounded-2xl sm:px-4"
          style={{
            border: couponApplied ? "1px solid rgba(26,173,25,0.5)" : "1px solid #383852",
            background: couponApplied ? "rgba(26,173,25,0.08)" : "rgba(0,0,0,0.2)",
          }}
        >
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            readOnly={couponApplied}
            placeholder="Enter promo code"
            className="min-w-0 flex-1 bg-transparent font-body text-xs text-white outline-none placeholder:text-white/40 sm:text-sm"
            aria-label="Coupon code"
          />
        </div>
        {couponApplied ? (
          <span className="flex h-10 shrink-0 items-center rounded-xl px-3 font-body text-xs font-bold text-[#1aad19] sm:h-12 sm:rounded-2xl sm:px-4 sm:text-sm">
            Applied
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (couponCode.trim()) setCouponApplied(true);
            }}
            disabled={!couponCode.trim()}
            className="h-10 shrink-0 rounded-xl px-3 font-body text-xs font-bold uppercase text-white transition-all hover:border-brand-light hover:shadow-[0_0_12px_rgba(255,92,0,0.25)] disabled:opacity-40 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-sm"
            style={{
              background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
              border: "1px solid #383852",
            }}
          >
            Apply
          </button>
        )}
        <button
          type="button"
          aria-label="Remove coupon"
          onClick={() => {
            setCouponCode("");
            setCouponApplied(false);
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all hover:shadow-[0_0_12px_rgba(255,92,0,0.3)] sm:h-12 sm:w-12 sm:rounded-2xl"
          style={{
            background: "rgba(255,92,0,0.15)",
            border: "1px solid rgba(255,92,0,0.4)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/services/delete.svg"
            alt=""
            loading="lazy"
            className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
          />
        </button>
      </div>

      {extras.length > 0 && (
        <>
          <div className="my-4 h-px w-full bg-border-subtle" />
          <p className="font-body text-base font-medium text-white">Extra Options</p>
          <div className="mt-2 flex flex-col gap-2">
            {extras.map((opt, i) => {
              const on = !!extrasState[opt.id];
              return (
                <div
                  key={opt.id}
                  className="flex items-center justify-between rounded-2xl px-4 py-3"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,0,0,0.2)" : "transparent",
                    border: "1px solid #383852",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Toggle
                      checked={on}
                      onChange={(next) =>
                        setExtrasState((prev) => ({
                          ...prev,
                          [opt.id]: next,
                        }))
                      }
                      label={opt.label}
                    />
                    <span
                      className={`font-body text-sm font-medium ${
                        on ? "text-brand-light" : "text-white"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </div>
                  <span className={`font-body text-sm font-semibold ${valueColorClass(opt.cost)}`}>
                    {opt.cost}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="my-4 h-px w-full bg-border-subtle" />

      <VolumeDiscountBanners
        tiers={volumeDiscountTiers}
        subtotal={orderSubtotal}
        discountMessage={discountMessage}
        maxDiscountReached={maxDiscountReached}
      />

      <div className="mt-4 flex flex-col gap-1">
        {finalRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-xl px-4 py-1"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <span className="font-body text-sm text-white/80">{row.label}</span>
            {/* Value color is derived from the value text itself so the
                FREE / discount / extras palette stays consistent without
                each caller having to pass a color prop (msg #55). */}
            <span className={`font-body text-base font-semibold ${valueColorClass(row.value)}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Button variant="secondary" size="sm" className="w-full">
          Add to cart
        </Button>
        <Button variant="primary" size="sm" className="w-full">
          Buy Now ({totalAmount})
        </Button>
      </div>

      <p className="mt-4 font-body text-xs leading-relaxed text-white/60">
        By placing an order at <span className="font-bold text-white/80">ogedge.com</span> you&rsquo;re
        agreeing to our <span className="font-bold text-white/80">Terms of Use</span> and{" "}
        <span className="font-bold text-white/80">Privacy Policy</span>
      </p>

      <div className="mt-auto flex items-start gap-4 pt-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(26,173,25,0.2)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/services/secured.svg" alt="" loading="lazy" className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs leading-tight text-white/80">
            Secured and trusted checkout with:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((p) => (
              <div key={p} className="flex h-5 w-8 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/icons/services/pay-${p}.svg`}
                  alt={p}
                  loading="lazy"
                  className="h-5 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
