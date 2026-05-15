"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { Slider } from "@/components/ui/Slider";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { RankButton } from "../shared/RankButton";

export type BoostPerWinRank = {
  key: string;
  label: string;
  glow: string;
  color?: string;
};

export type BoostPerWinCalculatorProps = {
  selectedRank: string;
  setSelectedRank: (rank: string) => void;
  selectedDivision: number;
  setSelectedDivision: (idx: number) => void;
  wins: number;
  setWins: (wins: number) => void;
  server: string;
  setServer: (s: string) => void;
  queue: string;
  setQueue: (q: string) => void;
  platform: string;
  setPlatform: (p: string) => void;
  ranks: BoostPerWinRank[];
  divisions: string[];
  serverOptions: string[];
  queueOptions: string[];
  platformOptions: { id: string; label: string; icon: string }[];
  requirements: string[];
  benefits: string[];
};

export function BoostPerWinCalculator({
  selectedRank,
  setSelectedRank,
  selectedDivision,
  setSelectedDivision,
  wins,
  setWins,
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
}: BoostPerWinCalculatorProps) {
  const rankData = ranks.find((r) => r.key === selectedRank);
  const subtitle = `${rankData?.label ?? ""} ${divisions[selectedDivision]}`;
  const subtitleColor = rankData?.color ?? "#fff";

  return (
    <div
      className="rounded-3xl p-6 md:p-10 lg:p-[60px_50px]"
      style={{
        border: "2px solid #6d6d96",
        background:
          "linear-gradient(109deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        backdropFilter: "blur(7px)",
      }}
    >
      <div className="flex flex-col gap-8">
        {/* Current Rank */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-body text-2xl font-medium text-white">Current Rank</h3>
            <p className="font-body text-base font-medium" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-9">
            {ranks.map((rank) => (
              <RankButton
                key={rank.key}
                label={rank.label}
                imageSrc={`/images/ranks/${rank.key}.png`}
                glow={rank.glow}
                active={selectedRank === rank.key}
                onClick={() => setSelectedRank(rank.key)}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {divisions.map((div, i) => {
              const active = selectedDivision === i;
              return (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(i)}
                  className="relative flex h-14 items-center justify-center gap-[10px] rounded-2xl px-4 transition-all"
                  style={{
                    border: active ? "1px solid #ff975d" : "1px solid #383852",
                    background: active
                      ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)"
                      : "rgba(0,0,0,0.2)",
                    boxShadow: active
                      ? "0 4px 8px rgba(0,0,0,0.15), 0 4px 7px rgba(255,92,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <span
                    className={`font-body text-base font-medium leading-6 ${
                      active ? "text-[#ff5c00]" : "text-white"
                    }`}
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

        {/* Number of Wins */}
        <div className="flex flex-col gap-2">
          {/* Title row — value box sits top-right on mobile, hidden on md+ */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-body text-2xl font-medium text-white">Number of Wins</h3>
              <p className="font-body text-base font-medium text-white/50">
                Select the number of desired wins
              </p>
            </div>
            <div
              className="flex h-14 w-[80px] shrink-0 items-center justify-center rounded-2xl md:hidden"
              style={{
                border: "1px solid #ff975d",
                background:
                  "linear-gradient(145deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
                boxShadow: "0 4px 7px rgba(255,92,0,0.3)",
              }}
            >
              <span className="font-heading text-[34px] font-bold leading-none text-brand-light">
                {wins}
              </span>
            </div>
          </div>

          {/* Mobile: full-width slider + min/max labels below */}
          <div className="mt-1 flex flex-col gap-1 md:hidden">
            <Slider min={1} max={5} value={wins} onChange={setWins} />
            <div className="flex justify-between px-1">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md font-body text-xs font-semibold text-white"
                style={{ background: "rgba(56,56,82,0.8)" }}
              >
                1
              </span>
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md font-body text-xs font-semibold text-white"
                style={{ background: "rgba(56,56,82,0.8)" }}
              >
                5
              </span>
            </div>
          </div>

          {/* Desktop: inline slider with min/max + value box to the right */}
          <div className="mt-2 hidden items-center gap-8 md:flex">
            <div className="flex flex-1 items-center gap-4">
              <span className="font-body text-xl font-semibold text-white">1</span>
              <Slider min={1} max={5} value={wins} onChange={setWins} className="flex-1" />
              <span className="font-body text-xl font-semibold text-white">5</span>
            </div>
            <div
              className="flex h-11 w-[75px] shrink-0 items-center justify-center rounded-2xl"
              style={{
                border: "1px solid #ff975d",
                background:
                  "linear-gradient(145deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
                boxShadow: "0 4px 7px rgba(255,92,0,0.3)",
              }}
            >
              <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-light">
                {wins}
              </span>
            </div>
          </div>
        </div>

        {/* Game Configuration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-body text-2xl font-medium text-white">Game Configuration</h3>
            <p className="font-body text-base font-medium text-white/50">Enter game details</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Dropdown label="Server" value={server} options={serverOptions} onChange={setServer} />
            <Dropdown label="Queue" value={queue} options={queueOptions} onChange={setQueue} />
          </div>

          <div>
            <p className="font-body text-base font-medium text-white">
              Platform <span className="text-brand-main">*</span>
            </p>
            <PlatformSelector
              options={platformOptions}
              value={platform}
              onChange={setPlatform}
              className="mt-2"
            />
          </div>

          <div
            className="flex items-start gap-3 rounded-2xl p-4"
            style={{ background: "var(--dark-deep)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/services/info.svg"
              alt=""
              loading="lazy"
              className="mt-0.5 h-5 w-5 shrink-0"
            />
            <div>
              <p className="font-body text-base font-medium text-white">
                We guarantee 5/4 wins in your placements
              </p>
              <p className="mt-1 font-body text-sm text-white/90">
                If the booster loses more than 1 game, we will refund the cost of the additional
                games until you reach the guaranteed wins.
              </p>
            </div>
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
