"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { type ImageTopCard, ImageTopCardButton } from "../shared/ImageTopCardButton";

export type { ImageTopCard } from "../shared/ImageTopCardButton";

export type ImageTopCardCalculatorProps = {
  title: string;
  subtitle: string;
  cards: ImageTopCard[];
  selectedCardIds: string[];
  onToggleCard: (id: string) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  platform: string;
  setPlatform: (p: string) => void;
  requirements: string[];
  benefits: string[];
};

const CALC_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

export function ImageTopCardCalculator({
  title,
  subtitle,
  cards,
  selectedCardIds,
  onToggleCard,
  platformOptions,
  platform,
  setPlatform,
  requirements,
  benefits,
}: ImageTopCardCalculatorProps) {
  const selectedSet = new Set(selectedCardIds);

  const lockedIds = new Set<string>();
  for (const card of cards) {
    if (selectedSet.has(card.id) && card.locks) {
      for (const lockedId of card.locks) {
        lockedIds.add(lockedId);
      }
    }
  }

  return (
    <div
      className="min-w-0 rounded-3xl p-6 md:p-10 lg:px-[60px] lg:py-[50px]"
      style={{ border: CALC_BORDER, background: CALC_BG, backdropFilter: "blur(7px)" }}
    >
      <div className="flex min-w-0 flex-col gap-8 font-body">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-medium leading-7 text-white md:text-2xl md:leading-8">
            {title}
          </h3>
          <p className="text-xs font-normal text-white/50 md:text-base md:font-medium">
            {subtitle}
          </p>
        </div>

        {/* Card grid — 2-col mobile, 4-col desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {cards.map((card) => (
            <ImageTopCardButton
              key={card.id}
              card={card}
              selected={selectedSet.has(card.id)}
              locked={lockedIds.has(card.id)}
              onClick={() => onToggleCard(card.id)}
            />
          ))}
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
