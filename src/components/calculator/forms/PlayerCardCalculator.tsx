"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";

export type PlayerCardTab = {
  id: string;
  label: string;
  cards: {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
  }[];
};

export type PlayerCardCalculatorProps = {
  title: string;
  subtitle: string;
  tabs: PlayerCardTab[];
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
  "linear-gradient(106deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

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

function PlayerCard({
  card,
  selected,
  onClick,
}: {
  card: PlayerCardTab["cards"][number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-stretch overflow-hidden rounded-2xl p-2 text-left transition-all ${selected ? "" : "cursor-pointer hover:border-[#ff975d]"} active:scale-[0.97]`}
      style={{
        background: "rgba(0,0,0,0.2)",
        border: selected ? "1px solid #ffa384" : "1px solid #383852",
        boxShadow: selected
          ? "0 4px 16px rgba(250,70,9,0.32)"
          : "0px 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      {/* Left-side player card image */}
      {card.image && (
        <div className="relative h-[100px] w-[78px] shrink-0 overflow-hidden rounded-lg xl:h-[120px] xl:w-[94px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      )}

      {/* Text content — right side */}
      <div className="flex flex-1 flex-col justify-between px-3 pt-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-body text-base font-medium text-white">{card.name}</span>
          {card.description && (
            <span className="font-body text-xs font-normal text-white/90">
              {card.description}
            </span>
          )}
        </div>
        <p
          className="font-heading text-base font-medium"
          style={{ color: selected ? "#fa4609" : "#1aad19" }}
        >
          ${card.price.toFixed(2)}
        </p>
      </div>

      {/* Orange checkmark — selected */}
      {selected && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/icons/services/platform-check.svg"
          alt=""
          className="absolute right-[11px] top-[11px] h-4 w-4"
        />
      )}
    </button>
  );
}

export function PlayerCardCalculator({
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
}: PlayerCardCalculatorProps) {
  const selectedSet = new Set(selectedCardIds);
  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const cards = currentTab?.cards ?? [];
  const allCards = tabs.flatMap((t) => t.cards);
  const selectedCards = allCards.filter((c) => selectedSet.has(c.id));

  return (
    <div
      className="min-w-0 overflow-hidden rounded-3xl p-6 md:p-10 xl:px-[60px] xl:py-[50px]"
      style={{ border: CALC_BORDER, background: CALC_BG }}
    >
      <div className="flex min-w-0 flex-col gap-10 font-body xl:gap-[67px]">
        {/* ── Header + Tabs ── */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-2xl font-medium leading-8 text-white">
              {title}
            </h3>
            <p className="text-base font-medium leading-6 text-white/50">
              {subtitle}
            </p>
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

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
          {cards.map((card) => (
            <PlayerCard
              key={card.id}
              card={card}
              selected={selectedSet.has(card.id)}
              onClick={() => onToggleCard(card.id)}
            />
          ))}
        </div>

        {/* ── Your Selection ── */}
        {selectedCards.length > 0 && (
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-normal text-white">Your Selection</p>
              <button
                type="button"
                onClick={onRemoveAll}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-2xl bg-[rgba(250,70,9,0.2)] py-2 pl-4 pr-2 font-body text-sm font-normal text-[#ff5c00] transition-colors hover:opacity-80"
              >
                <span>Remove all</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex min-w-0 flex-wrap gap-2">
              {selectedCards.map((card) => (
                <div
                  key={card.id}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.2)] px-4 py-3 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
                >
                  <span className="font-medium text-white">{card.name}</span>
                  <span className="shrink-0 rounded-md bg-[#383852] px-1 py-0.5 text-xs font-medium text-white">
                    ${card.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveCard(card.id)}
                    className="shrink-0 cursor-pointer text-white/50 transition-colors hover:text-white"
                    aria-label={`Remove ${card.name}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Game Configuration ── */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-heading text-2xl font-medium leading-8 text-white">
              Game Configuration
            </h3>
            <p className="text-base font-medium leading-6 text-white/50">
              Enter game details
            </p>
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

        {/* ── Requirements & Benefits ── */}
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
