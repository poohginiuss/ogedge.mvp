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

export function OrderSummary({
  eyebrow = "Order Summary",
  title,
  estimatedTime,
  startInLabel,
  rows,
  extras = [],
  finalRows,
  totalAmount,
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

      <div className="flex items-center gap-2">
        <div
          className="flex h-12 flex-1 items-center rounded-2xl px-4 transition-colors"
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
            className="flex-1 bg-transparent font-body text-sm text-white outline-none placeholder:text-white/40"
            aria-label="Coupon code"
          />
        </div>
        {couponApplied ? (
          <span className="flex h-12 items-center rounded-2xl px-4 font-body text-sm font-bold text-[#1aad19]">
            Applied
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (couponCode.trim()) setCouponApplied(true);
            }}
            disabled={!couponCode.trim()}
            className="h-12 rounded-2xl px-4 font-body text-sm font-bold uppercase text-white transition-all hover:border-brand-light hover:shadow-[0_0_12px_rgba(255,92,0,0.25)] disabled:opacity-40"
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
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all hover:shadow-[0_0_12px_rgba(255,92,0,0.3)]"
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
            className="h-[18px] w-[18px]"
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

      {(discountMessage || maxDiscountReached) && (
        <div className="flex flex-col gap-2">
          {discountMessage && (
            <div
              className="rounded-2xl px-4 py-3 text-center font-body text-sm"
              style={{ background: "var(--dark-border)" }}
            >
              <span
                className="font-semibold text-brand-light"
                style={{ textShadow: "0 0 10px rgba(255,151,93,0.5)" }}
              >
                {discountMessage}
              </span>
            </div>
          )}
          {maxDiscountReached && (
            <div
              className="rounded-2xl px-4 py-3 text-center font-body text-base font-semibold"
              style={{
                background: "rgba(26,173,25,0.2)",
                color: "var(--success-main)",
              }}
            >
              Maximum discount reached!
            </div>
          )}
        </div>
      )}

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
