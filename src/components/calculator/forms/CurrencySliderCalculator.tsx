"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { CurrencyRangeSlider } from "../shared/CurrencyRangeSlider";
import { QuickSelectButton } from "../shared/QuickSelectButton";

export type CurrencyTier = {
  id: string;
  amountLabel: string;
  quickLabel: string;
  tierName: string;
  discount?: number;
  discountLabel: string;
  price: number;
  savingsAmount?: string;
  image?: string;
};

export type CurrencySliderCalculatorProps = {
  title: string;
  subtitle: string;
  tiers: CurrencyTier[];
  selectedIndex: number;
  onSelectTier: (index: number) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  platform: string;
  setPlatform: (p: string) => void;
  requirements: string[];
  benefits: string[];
};

const CALC_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

export function CurrencySliderCalculator({
  title,
  subtitle,
  tiers,
  selectedIndex,
  onSelectTier,
  platformOptions,
  platform,
  setPlatform,
  requirements,
  benefits,
}: CurrencySliderCalculatorProps) {
  const selected = tiers[selectedIndex];
  if (!selected) return null;

  const snapPoints = tiers.map((t) => ({ label: t.discountLabel }));

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
          className="flex items-center justify-between overflow-hidden rounded-3xl border border-[#ff975d] p-6 shadow-[0_4px_14px_0_rgba(255,92,0,0.3)]"
          style={{
            backgroundImage:
              "linear-gradient(170deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            {/* Placeholder image */}
            {selected.image ? (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.image}
                  alt=""
                  className="pointer-events-none size-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d9d9d9]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#666]"
                  aria-hidden="true"
                >
                  <title>Image placeholder</title>
                  <path
                    d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM5 17L8.5 12.5L11 15.51L14.5 11L19 17H5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black leading-normal text-[#ff975d]">
                {selected.amountLabel}
              </span>
              <span className="text-sm font-normal text-white/80">Selected Currency</span>
            </div>
          </div>
          {selected.discount != null && (
            <div className="flex items-center justify-center rounded-lg bg-[#10a83c] px-4 py-2">
              <span className="font-body text-sm font-bold text-white">
                -{selected.discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Currency range slider */}
        <CurrencyRangeSlider
          snapPoints={snapPoints}
          value={selectedIndex}
          onChange={onSelectTier}
          savingsLabel={selected.savingsAmount}
          labelVariant="orange"
        />

        {/* Volume Discounts */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-base font-normal text-white">Volume Discounts</p>
          <div className="flex gap-2">
            {tiers.map((tier, i) => (
              <QuickSelectButton
                key={tier.id}
                topLabel={tier.tierName}
                bottomLabel={tier.discount != null ? `-${tier.discount}%` : "Base"}
                selected={i === selectedIndex}
                onClick={() => onSelectTier(i)}
              />
            ))}
          </div>
        </div>

        {/* Quick Order */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-base font-normal text-white">Quick Order</p>
          <div className="flex gap-2">
            {tiers.map((tier, i) => (
              <QuickSelectButton
                key={tier.id}
                topLabel={tier.quickLabel}
                bottomLabel={tier.amountLabel}
                selected={i === selectedIndex}
                onClick={() => onSelectTier(i)}
              />
            ))}
          </div>
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
