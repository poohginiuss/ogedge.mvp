"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { SelectableCardButton } from "../shared/SelectableCardButton";

export type { SelectableCard } from "../shared/SelectableCardButton";

export type CardSelectorCalculatorProps = {
  title: string;
  subtitle: string;
  cards: { id: string; name: string; description?: string; price: number; image?: string; locks?: string[] }[];
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

export function CardSelectorCalculator({
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
}: CardSelectorCalculatorProps) {
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
          <h3 className="text-2xl font-medium leading-8 text-white">{title}</h3>
          <p className="text-base font-medium leading-6 text-white/50">{subtitle}</p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {cards.map((card) => (
            <SelectableCardButton
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
