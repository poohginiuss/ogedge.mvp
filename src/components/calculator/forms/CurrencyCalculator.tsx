"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { CurrencyCard, type CurrencyCardData } from "../shared/CurrencyCard";
import { CurrencyRangeSlider } from "../shared/CurrencyRangeSlider";

export type CurrencyCalculatorProps = {
  title: string;
  subtitle: string;
  packs: CurrencyCardData[];
  /** Actual currency amount selected (not an index). */
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  platform: string;
  setPlatform: (p: string) => void;
  requirements: string[];
  benefits: string[];
};

const CALC_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

/** Highest pack whose amount <= selectedAmount (for pricing / discount tier). */
function getActivePack(packs: CurrencyCardData[], amount: number): CurrencyCardData {
  let active = packs[0];
  for (const pack of packs) {
    if (pack.amount <= amount) active = pack;
  }
  return active as CurrencyCardData;
}

/** Format a raw number as a compact currency label: 1 500 000 → "1.5M", 300 000 → "300K". */
function formatAmountLabel(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${Math.round(n / 1_000)}K`;
  }
  return String(n);
}

export function CurrencyCalculator({
  title,
  subtitle,
  packs,
  selectedAmount,
  onAmountChange,
  platformOptions,
  platform,
  setPlatform,
  requirements,
  benefits,
}: CurrencyCalculatorProps) {
  if (!packs.length) return null;

  const minAmount = packs[0]?.amount ?? 0;
  const maxAmount = packs[packs.length - 1]?.amount ?? 0;
  const packAmounts = packs.map((p) => p.amount);

  const activePack = getActivePack(packs, selectedAmount);
  const pricePerUnit = activePack.price / activePack.amount;
  const totalPrice = selectedAmount * pricePerUnit;

  const savingsDisplay =
    activePack.discount != null
      ? `$${((totalPrice * activePack.discount) / (100 - activePack.discount)).toFixed(0)}`
      : "$0";

  const amountLabel = formatAmountLabel(selectedAmount);

  // The card that is "selected" = the pack at the exact amount, or the tier card
  // if dragged to an intermediate amount (highlight the tier's card).
  const activePackIndex = packs.indexOf(activePack);

  const snapPoints = packs.map((p) => ({ label: p.discountLabel }));

  return (
    <div
      className="min-w-0 rounded-3xl p-6 md:p-10 lg:px-[60px] lg:py-[50px]"
      style={{ border: CALC_BORDER, background: CALC_BG, backdropFilter: "blur(7px)" }}
    >
      <div className="flex min-w-0 flex-col gap-6 font-body md:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium leading-7 text-white md:text-2xl md:leading-8">
            {title}
          </h3>
          <p className="text-xs font-normal leading-[18px] text-white/50 md:text-base md:font-medium md:leading-6">
            {subtitle}
          </p>
        </div>

        {/* Info block */}
        <div
          className="relative flex flex-col items-center gap-1 overflow-hidden rounded-3xl border border-[#ff975d] p-6 shadow-[0_4px_14px_0_rgba(255,92,0,0.3)] md:flex-row md:items-center md:justify-between"
          style={{
            backgroundImage:
              "linear-gradient(170deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
          }}
        >
          {/* Left: coin image + selected label */}
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
            <div className="relative h-[49px] w-[80px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePack.image}
                alt=""
                className="pointer-events-none absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-1 md:items-start">
              <div className="flex items-center gap-1 text-xl leading-[30px] md:text-2xl">
                <span className="font-heading font-black text-[#ff975d]">{amountLabel}</span>
                <span className="font-medium text-white">Selected</span>
              </div>
              {/* Savings + price on mobile */}
              <div className="flex items-center justify-between gap-6 md:hidden">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-normal text-white/80">Total Savings:</span>
                  <span className="text-lg font-bold leading-7 text-[#ff975d]">
                    {savingsDisplay}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-normal text-white/80">Total Price:</span>
                  <span className="text-lg font-bold leading-7 text-[#ff975d]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Savings on desktop */}
              <div className="hidden items-center gap-2 text-sm text-white/80 md:flex">
                <span className="font-normal">Total Savings:</span>
                <span className="font-bold">{savingsDisplay}</span>
              </div>
            </div>
          </div>

          {/* Right: discount + price (desktop) */}
          <div className="hidden flex-col items-end gap-1 md:flex">
            {activePack.discount != null && (
              <div className="flex items-center justify-center rounded-2xl bg-[#10a83c] px-4 py-1.5">
                <span className="font-body text-sm font-bold leading-5 text-white">
                  {activePack.discount}% OFF
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 leading-normal">
              <span className="text-sm font-normal text-white/80">Total Price:</span>
              <span className="font-heading text-xl font-semibold text-[#ff975d]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Discount badge on mobile */}
          {activePack.discount != null && (
            <div className="absolute right-6 top-3 md:hidden">
              <div className="flex items-center justify-center rounded-2xl bg-[#10a83c] px-4 py-1.5">
                <span className="font-body text-sm font-bold leading-5 text-white">
                  {activePack.discount}% OFF
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Currency cards row */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-2">
          {packs.map((pack, i) => (
            <CurrencyCard
              key={pack.id}
              pack={pack}
              selected={i === activePackIndex && selectedAmount === pack.amount}
              onClick={() => onAmountChange(pack.amount)}
            />
          ))}
        </div>

        {/* Continuous currency range slider */}
        <CurrencyRangeSlider
          snapPoints={snapPoints}
          value={selectedAmount}
          onChange={onAmountChange}
          continuousMin={minAmount}
          continuousMax={maxAmount}
          packAmounts={packAmounts}
        />

        {/* "Choose your Currency Pack" label */}
        <div>
          <p className="font-body text-base font-normal text-white">Choose your Currency Pack</p>
        </div>

        {/* Game Configuration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl font-medium leading-8 text-white">Game Configuration</h3>
            <p className="text-base font-medium leading-6 text-white/50">Enter game details</p>
          </div>
          <div>
            <p className="text-base font-normal text-white">
              Platform <span className="text-[#ff5c00]">*</span>
            </p>
            <PlatformSelector
              options={platformOptions}
              value={platform}
              onChange={setPlatform}
              className="mt-2"
            />
          </div>
        </div>

        {/* Requirements & Benefits */}
        <div className="hidden grid-cols-2 gap-6 md:grid">
          <BulletList title="Requirements" items={requirements} />
          <BulletList title="What Do I Get" items={benefits} />
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          <CollapsibleList title="Requirements" items={requirements} />
          <CollapsibleList title="What Do I Get" items={benefits} />
        </div>
      </div>
    </div>
  );
}
