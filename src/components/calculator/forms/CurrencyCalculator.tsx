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
  selectedIndex: number;
  onSelectPack: (index: number) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  platform: string;
  setPlatform: (p: string) => void;
  requirements: string[];
  benefits: string[];
};

const CALC_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

export function CurrencyCalculator({
  title,
  subtitle,
  packs,
  selectedIndex,
  onSelectPack,
  platformOptions,
  platform,
  setPlatform,
  requirements,
  benefits,
}: CurrencyCalculatorProps) {
  const selected = packs[selectedIndex];
  if (!selected) return null;

  const savingsDisplay =
    selected.discount != null
      ? `$${((selected.price * selected.discount) / (100 - selected.discount)).toFixed(0)}`
      : "$0";

  const snapPoints = packs.map((p) => ({
    label: p.discountLabel,
  }));

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
          className="flex flex-col items-center gap-1 overflow-hidden rounded-3xl border border-[#ff975d] p-6 shadow-[0_4px_14px_0_rgba(255,92,0,0.3)] md:flex-row md:items-center md:justify-between"
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
                src={selected.image}
                alt=""
                className="pointer-events-none absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-1 md:items-start">
              <div className="flex items-center gap-1 text-xl leading-[30px] md:text-2xl">
                <span className="font-heading font-black text-[#ff975d]">
                  {selected.amountLabel}
                </span>
                <span className="font-medium text-white">Selected</span>
              </div>
              {/* Savings + price row on mobile */}
              <div className="flex items-center justify-between gap-6 md:hidden">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-normal text-white/80">Total Savings:</span>
                  <span className="font-bold text-lg leading-7 text-[#ff975d]">
                    {savingsDisplay}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-normal text-white/80">Total Price:</span>
                  <span className="font-bold text-lg leading-7 text-[#ff975d]">
                    ${selected.price.toFixed(2)}
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

          {/* Discount badge on mobile */}
          {selected.discount != null && (
            <div className="absolute right-6 top-0 md:relative md:right-auto md:top-auto">
              {/* Keep positioned absolutely on mobile (inside relative parent) */}
            </div>
          )}

          {/* Right: discount + price (desktop) */}
          <div className="hidden flex-col items-end gap-1 md:flex">
            {selected.discount != null && (
              <div className="flex items-center justify-center rounded-2xl bg-[#10a83c] px-4 py-1.5">
                <span className="font-body text-sm font-bold leading-5 text-white">
                  {selected.discount}% OFF
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 leading-normal">
              <span className="text-sm font-normal text-white/80">Total Price:</span>
              <span className="font-heading text-xl font-semibold text-[#ff975d]">
                ${selected.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Discount badge on mobile (absolute positioned) */}
          {selected.discount != null && (
            <div className="absolute right-6 top-3 md:hidden">
              <div className="flex items-center justify-center rounded-2xl bg-[#10a83c] px-4 py-1.5">
                <span className="font-body text-sm font-bold leading-5 text-white">
                  {selected.discount}% OFF
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
              selected={i === selectedIndex}
              onClick={() => onSelectPack(i)}
            />
          ))}
        </div>

        {/* Currency range slider */}
        <CurrencyRangeSlider
          snapPoints={snapPoints}
          value={selectedIndex}
          onChange={onSelectPack}
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
