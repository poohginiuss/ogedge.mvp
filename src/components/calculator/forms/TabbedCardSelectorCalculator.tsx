"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { SelectableCardButton } from "../shared/SelectableCardButton";

export type CardTab = {
  id: string;
  label: string;
  cards: {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    locks?: string[];
  }[];
};

export type TabbedCardSelectorCalculatorProps = {
  title: string;
  subtitle: string;
  tabs: CardTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  selectedCardIds: string[];
  onToggleCard: (id: string) => void;
  onRemoveCard: (id: string) => void;
  onRemoveAll: () => void;
  platformOptions: { id: string; label: string; icon: string }[];
  platform: string;
  setPlatform: (p: string) => void;
  requirements: string[];
  benefits: string[];
};

const CALC_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

const TAB_ACTIVE = {
  border: "1px solid #ff975d",
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
  boxShadow: "0px 4px 7px rgba(255,92,0,0.3)",
} as const;

const TAB_INACTIVE = {
  backdropFilter: "blur(3px)",
  background: "rgba(23,25,31,0.5)",
  border: "1px solid #383852",
  boxShadow: "0px 4px 16px rgba(0,0,0,0.45)",
} as const;

export function TabbedCardSelectorCalculator({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  selectedCardIds,
  onToggleCard,
  onRemoveCard,
  onRemoveAll,
  platformOptions,
  platform,
  setPlatform,
  requirements,
  benefits,
}: TabbedCardSelectorCalculatorProps) {
  const selectedSet = new Set(selectedCardIds);
  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const cards = currentTab?.cards ?? [];

  const lockedIds = new Set<string>();
  for (const tab of tabs) {
    for (const card of tab.cards) {
      if (selectedSet.has(card.id) && card.locks) {
        for (const lockedId of card.locks) {
          lockedIds.add(lockedId);
        }
      }
    }
  }

  const allCards = tabs.flatMap((t) => t.cards);
  const selectedCards = allCards.filter((c) => selectedSet.has(c.id));

  return (
    <div
      className="min-w-0 overflow-hidden rounded-3xl p-6 md:p-10 xl:px-[60px] xl:py-[50px]"
      style={{ border: CALC_BORDER, background: CALC_BG, backdropFilter: "blur(7px)" }}
    >
      <div className="flex min-w-0 flex-col gap-8 font-body">
        {/* Header + Tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-2xl font-medium leading-8 text-white">{title}</h3>
            <p className="text-base font-medium leading-6 text-white/50">{subtitle}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 xl:flex xl:gap-4">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              const count = tab.cards.filter((c) => selectedSet.has(c.id)).length;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className="flex h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2 font-semibold text-[11px] uppercase tracking-[0.2px] transition-all hover:border-[#ff975d] active:scale-[0.97] xl:h-[50px] xl:flex-1 xl:gap-2.5 xl:rounded-2xl xl:px-4 xl:text-sm xl:tracking-[0.28px]"
                  style={isActive ? TAB_ACTIVE : TAB_INACTIVE}
                >
                  <span className={isActive ? "text-[#ff975d]" : "text-white"}>
                    {tab.label}
                  </span>
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center rounded-md bg-[#ff975d] px-1 py-0.5 text-xs font-medium leading-[18px] text-[#232330]">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
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

        {/* Your Selection */}
        {selectedCards.length > 0 && (
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xl font-medium text-white">Your Selection</h4>
              <button
                type="button"
                onClick={onRemoveAll}
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2 font-body text-sm font-semibold text-[#ff5c00] transition-colors hover:opacity-80"
                style={{ background: "rgba(113,50,32,0.78)" }}
              >
                <span>Remove all</span>
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div className="flex min-w-0 flex-wrap gap-2">
              {selectedCards.map((card) => (
                <div
                  key={card.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#383852] bg-[rgba(23,25,31,0.85)] px-3 py-2 transition-colors hover:border-[#ff975d]/50"
                >
                  <span className="text-sm text-white">{card.name}</span>
                  <span className="shrink-0 rounded-md bg-[rgba(56,56,82,0.8)] px-2 py-0.5 text-xs font-semibold text-white/90">
                    ${card.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveCard(card.id)}
                    className="shrink-0 text-white/70 transition-colors hover:text-white"
                    aria-label={`Remove ${card.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
