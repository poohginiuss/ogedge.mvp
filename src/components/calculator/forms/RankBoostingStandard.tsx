"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { RankButton } from "../shared/RankButton";

export type RankBoostRank = {
  key: string;
  label: string;
  glow: string;
  color?: string;
};

export type RankBoostingStandardProps = {
  currentRank: string;
  setCurrentRank: (rank: string) => void;
  currentDivision: number;
  setCurrentDivision: (idx: number) => void;
  /** Current LP — only used when currentRank === desiredRank */
  currentLP: number;
  setCurrentLP: (lp: number) => void;
  desiredRank: string;
  setDesiredRank: (rank: string) => void;
  desiredDivision: number;
  setDesiredDivision: (idx: number) => void;
  desiredLP: number;
  setDesiredLP: (lp: number) => void;
  server: string;
  setServer: (s: string) => void;
  queue: string;
  setQueue: (q: string) => void;
  platform: string;
  setPlatform: (p: string) => void;
  ranks: RankBoostRank[];
  divisions: string[];
  serverOptions: string[];
  queueOptions: string[];
  platformOptions: { id: string; label: string; icon: string }[];
  requirements: string[];
  benefits: string[];
  /**
   * Number of top ranks to exclude from the *current* rank picker.
   * E.g. 3 hides Master/Grandmaster/Challenger from "Current Rank".
   */
  currentRankExcludeTop?: number;
};

const SELECTED_BG =
  "linear-gradient(132deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)";

const LP_MIN = 0;
const LP_MAX = 500;
const LP_STEP = 20;

function RankGrid({
  ranks,
  selected,
  onSelect,
  minIndex = 0,
  maxIndex,
}: {
  ranks: RankBoostRank[];
  selected: string;
  onSelect: (key: string) => void;
  minIndex?: number;
  maxIndex?: number;
}) {
  const upper = maxIndex ?? ranks.length - 1;
  return (
    <div className="grid grid-cols-4 gap-2">
      {ranks.map((rank, idx) => (
        <RankButton
          key={rank.key}
          label={rank.label}
          imageSrc={`/images/ranks/emblems/${rank.key}.png`}
          glow={rank.glow}
          active={selected === rank.key}
          disabled={idx < minIndex || idx > upper}
          onClick={() => onSelect(rank.key)}
          className="h-[76px]"
        />
      ))}
    </div>
  );
}

function DivisionGrid({
  divisions,
  selected,
  onSelect,
}: {
  divisions: string[];
  selected: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {divisions.map((div, i) => {
        const active = selected === i;
        return (
          <button
            key={div}
            type="button"
            onClick={() => onSelect(i)}
            className="relative flex h-14 items-center justify-center rounded-2xl px-4 transition-all"
            style={{
              border: active ? "1px solid #ff975d" : "1px solid #383852",
              background: active ? SELECTED_BG : "rgba(0,0,0,0.2)",
              boxShadow: active ? "0 4px 7px rgba(255,92,0,0.3)" : "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <span
              className={`font-body text-base font-medium leading-6 ${active ? "text-[#ff5c00]" : "text-white"}`}
            >
              {div}
            </span>
            {active && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/icons/services/platform-check.svg"
                alt=""
                className="absolute right-1.5 top-1.5 h-3 w-3"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function LpStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const handleInput = (raw: string) => {
    const parsed = raw === "" ? 0 : Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) return;
    onChange(Math.max(LP_MIN, Math.min(LP_MAX, parsed)));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(LP_MIN, value - LP_STEP))}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all"
        style={{
          border: "1px solid #383852",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-67deg, #17191f 0%, #383852 100%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/services/minus.svg" alt="Decrease" className="h-6 w-6" />
      </button>
      <div
        className="flex h-14 flex-1 items-center justify-center rounded-2xl"
        style={{
          background: "rgba(0,0,0,0.2)",
          border: "1px solid #383852",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        <input
          type="number"
          inputMode="numeric"
          min={LP_MIN}
          max={LP_MAX}
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          aria-label={label}
          className="w-20 bg-transparent text-center font-body text-xl font-bold leading-[30px] text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="font-body text-xl font-bold leading-[30px] text-white">LP</span>
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(LP_MAX, value + LP_STEP))}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all"
        style={{
          border: "1px solid #383852",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-67deg, #17191f 0%, #383852 100%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/services/plus.svg" alt="Increase" className="h-6 w-6" />
      </button>
    </div>
  );
}

export function RankBoostingStandard({
  currentRank,
  setCurrentRank,
  currentDivision,
  setCurrentDivision,
  currentLP,
  setCurrentLP,
  desiredRank,
  setDesiredRank,
  desiredDivision,
  setDesiredDivision,
  desiredLP,
  setDesiredLP,
  server,
  setServer,
  queue,
  setQueue,
  platform,
  setPlatform,
  ranks,
  divisions,
  serverOptions,
  queueOptions,
  platformOptions,
  requirements,
  benefits,
  currentRankExcludeTop = 0,
}: RankBoostingStandardProps) {
  const currentRankIdx = ranks.findIndex((r) => r.key === currentRank);
  const desiredRankIdx = ranks.findIndex((r) => r.key === desiredRank);
  const currentRankData = ranks[currentRankIdx];
  const desiredRankData = ranks[desiredRankIdx];

  // When the same rank tier is selected on both sides, switch to LP mode
  const sameRank = currentRank === desiredRank;

  const currentLabel = sameRank
    ? `${currentRankData?.label ?? ""} ${currentLP} LP`
    : `${currentRankData?.label ?? ""} ${divisions[currentDivision]}`;

  const desiredLabel = sameRank
    ? `${desiredRankData?.label ?? ""} ${desiredLP} LP`
    : `${desiredRankData?.label ?? ""} ${divisions[desiredDivision]}`;

  const currentMaxIdx = Math.max(0, ranks.length - 1 - currentRankExcludeTop);
  const minDesiredIdx = Math.min(currentRankIdx, ranks.length - 1);

  const handleSetCurrentRank = (key: string) => {
    setCurrentRank(key);
    const newIdx = ranks.findIndex((r) => r.key === key);
    // If desired is now strictly below current, clamp it up.
    if (desiredRankIdx < newIdx) {
      setDesiredRank(ranks[Math.min(newIdx, ranks.length - 1)].key);
    }
  };

  const handleSetDesiredRank = (key: string) => {
    // Reset LP fields when switching between rank tiers.
    if (key !== currentRank && desiredLP === currentLP) {
      setDesiredLP(0);
    }
    setDesiredRank(key);
  };

  return (
    <div
      className="rounded-3xl p-6 md:p-10 lg:px-[60px] lg:py-[50px]"
      style={{
        border: "2px solid #6d6d96",
        background:
          "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        backdropFilter: "blur(7px)",
      }}
    >
      <div className="flex flex-col gap-8">
        {/* Current Rank + Desired Rank */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          {/* ── Current Rank ── */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-body text-2xl font-medium leading-8 text-white">Current Rank</h3>
              <p
                className="font-body text-base font-medium leading-6"
                style={{ color: currentRankData?.color ?? "#fff" }}
              >
                {currentLabel}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <RankGrid
                ranks={ranks}
                selected={currentRank}
                onSelect={handleSetCurrentRank}
                maxIndex={currentMaxIdx}
              />

              {sameRank ? (
                <LpStepper value={currentLP} onChange={setCurrentLP} label="Current LP" />
              ) : (
                <DivisionGrid
                  divisions={divisions}
                  selected={currentDivision}
                  onSelect={setCurrentDivision}
                />
              )}
            </div>
          </div>

          {/* ── Desired Rank ── */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-body text-2xl font-medium leading-8 text-white">Desired Rank</h3>
              <p className="font-body text-base font-medium leading-6 text-[#ff8a45]">
                {desiredLabel}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <RankGrid
                ranks={ranks}
                selected={desiredRank}
                onSelect={handleSetDesiredRank}
                minIndex={minDesiredIdx}
              />

              {sameRank ? (
                <LpStepper value={desiredLP} onChange={setDesiredLP} label="Desired LP" />
              ) : (
                <DivisionGrid
                  divisions={divisions}
                  selected={desiredDivision}
                  onSelect={setDesiredDivision}
                />
              )}
            </div>
          </div>
        </div>

        {/* Game Configuration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-body text-2xl font-medium leading-8 text-white">
              Game Configuration
            </h3>
            <p className="font-body text-base font-medium leading-6 text-white/50">
              Enter game details
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <Dropdown
              label="Server *"
              value={server}
              options={serverOptions}
              onChange={setServer}
            />
            <Dropdown label="Queue *" value={queue} options={queueOptions} onChange={setQueue} />
          </div>

          <div>
            <p className="font-body text-base font-normal text-white">
              Platform <span className="text-brand-main">*</span>
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
