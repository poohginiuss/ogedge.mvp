"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";

import {
  type RankBoostKey,
  platformOptions,
  queueOptions,
  rankBoostBenefits,
  rankBoostDivisions,
  rankBoostRanks,
  rankBoostRequirements,
  serverOptions,
} from "@/components/games/valorant/valorantData";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { RankButton } from "../shared/RankButton";

type RankBoostingStandardProps = {
  currentRank: RankBoostKey;
  setCurrentRank: (rank: RankBoostKey) => void;
  currentDivision: number;
  setCurrentDivision: (idx: number) => void;
  desiredRank: RankBoostKey;
  setDesiredRank: (rank: RankBoostKey) => void;
  desiredLP: number;
  setDesiredLP: (lp: number) => void;
  server: string;
  setServer: (s: string) => void;
  queue: string;
  setQueue: (q: string) => void;
  platform: string;
  setPlatform: (p: string) => void;
};

const SELECTED_BG =
  "linear-gradient(132deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)";

const LP_MIN = 0;
const LP_MAX = 500;
const LP_STEP = 100;

function RankGrid({
  selected,
  onSelect,
  minIndex = 0,
}: {
  selected: RankBoostKey;
  onSelect: (key: RankBoostKey) => void;
  minIndex?: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {rankBoostRanks.map((rank, idx) => (
        <RankButton
          key={rank.key}
          label={rank.label}
          imageSrc={`/images/ranks/emblems/${rank.key}.png`}
          glow={rank.glow}
          active={selected === rank.key}
          disabled={idx < minIndex}
          onClick={() => onSelect(rank.key)}
          className="h-[76px]"
        />
      ))}
    </div>
  );
}

export function RankBoostingStandard({
  currentRank,
  setCurrentRank,
  currentDivision,
  setCurrentDivision,
  desiredRank,
  setDesiredRank,
  desiredLP,
  setDesiredLP,
  server,
  setServer,
  queue,
  setQueue,
  platform,
  setPlatform,
}: RankBoostingStandardProps) {
  const currentRankIdx = rankBoostRanks.findIndex((r) => r.key === currentRank);
  const desiredRankIdx = rankBoostRanks.findIndex((r) => r.key === desiredRank);
  const currentRankData = rankBoostRanks[currentRankIdx];
  const desiredRankData = rankBoostRanks[desiredRankIdx];

  const currentLabel = `${currentRankData?.label ?? ""} ${rankBoostDivisions[currentDivision]}`;
  const desiredLabel = `${desiredRankData?.label ?? ""} ${desiredLP} LP`;

  const minDesiredIdx = Math.min(currentRankIdx + 1, rankBoostRanks.length - 1);

  const handleSetCurrentRank = (key: RankBoostKey) => {
    setCurrentRank(key);
    const newIdx = rankBoostRanks.findIndex((r) => r.key === key);
    const minIdx = Math.min(newIdx + 1, rankBoostRanks.length - 1);
    if (desiredRankIdx <= newIdx) {
      setDesiredRank(rankBoostRanks[minIdx].key);
    }
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
        {/* Current Rank + Desired Rank — side by side on desktop */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          {/* Current Rank */}
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
              <RankGrid selected={currentRank} onSelect={handleSetCurrentRank} />

              {/* Division selector */}
              <div className="grid grid-cols-4 gap-2">
                {rankBoostDivisions.map((div, i) => {
                  const active = currentDivision === i;
                  return (
                    <button
                      key={div}
                      type="button"
                      onClick={() => setCurrentDivision(i)}
                      className="relative flex h-14 items-center justify-center rounded-2xl px-4 transition-all"
                      style={{
                        border: active ? "1px solid #ff975d" : "1px solid #383852",
                        background: active ? SELECTED_BG : "rgba(0,0,0,0.2)",
                        boxShadow: active
                          ? "0 4px 7px rgba(255,92,0,0.3)"
                          : "0 4px 16px rgba(0,0,0,0.15)",
                      }}
                    >
                      <span
                        className={`font-body text-base font-medium leading-6 ${active ? "text-[#ff5c00]" : "text-white"}`}
                      >
                        {div}
                      </span>
                      {active && (
                        /* eslint-disable-next-line @next/next/no-img-element */
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
            </div>
          </div>

          {/* Desired Rank */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-body text-2xl font-medium leading-8 text-white">Desired Rank</h3>
              <p className="font-body text-base font-medium leading-6 text-[#ff8a45]">
                {desiredLabel}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <RankGrid selected={desiredRank} onSelect={setDesiredRank} minIndex={minDesiredIdx} />

              {/* LP stepper */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDesiredLP(Math.max(LP_MIN, desiredLP - LP_STEP))}
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
                  <span className="font-body text-xl font-bold leading-[30px] text-white">
                    {desiredLP} LP
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDesiredLP(Math.min(LP_MAX, desiredLP + LP_STEP))}
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
            <Dropdown label="Server" value={server} options={serverOptions} onChange={setServer} />
            <Dropdown label="Queue" value={queue} options={queueOptions} onChange={setQueue} />
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
          <BulletList title="Requirements" items={rankBoostRequirements} />
          <BulletList title="What Do I Get" items={rankBoostBenefits} />
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          <CollapsibleList title="Requirements" items={rankBoostRequirements} />
          <CollapsibleList title="What Do I Get" items={rankBoostBenefits} />
        </div>
      </div>
    </div>
  );
}
