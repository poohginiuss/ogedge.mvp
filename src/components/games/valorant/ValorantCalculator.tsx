"use client";

import { BulletList } from "@/components/games/shared/BulletList";
import { CollapsibleList } from "@/components/games/shared/CollapsibleList";
import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { Slider } from "@/components/ui/Slider";
import Image from "next/image";

import {
  type RankKey,
  benefits,
  divisions,
  platformOptions,
  queueOptions,
  ranks,
  requirements,
  serverOptions,
} from "./valorantData";

type ValorantCalculatorProps = {
  selectedRank: RankKey;
  setSelectedRank: (rank: RankKey) => void;
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
};

export function ValorantCalculator({
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
}: ValorantCalculatorProps) {
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
            <h3 className="font-body text-2xl font-semibold text-white">Current Rank</h3>
            <p className="font-body text-base font-semibold text-white/50">
              Select your current rank
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
            {ranks.map((rank) => {
              const active = selectedRank === rank.key;
              return (
                <button
                  key={rank.key}
                  type="button"
                  onClick={() => setSelectedRank(rank.key)}
                  className="group flex h-[76px] flex-col items-center justify-center rounded-2xl p-2 transition-all"
                  style={{
                    background: active ? "rgba(255,92,0,0.15)" : "rgba(0,0,0,0.2)",
                    border: active ? "2px solid #ff975d" : "1px solid #383852",
                    ...(active ? { boxShadow: "0 0 24px rgba(255,92,0,0.35)" } : {}),
                  }}
                >
                  <Image
                    src={`/images/ranks/${rank.key}.png`}
                    alt={rank.label}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-10 w-10 object-contain"
                    style={{ filter: `drop-shadow(0 0 10px ${rank.glow})` }}
                  />
                  <span className="mt-1 font-body text-[10px] text-white/80">{rank.label}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {divisions.map((div, i) => {
              const active = selectedDivision === i;
              return (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(i)}
                  className="relative flex h-[50px] items-center justify-center gap-[10px] rounded-2xl px-4 transition-all"
                  style={{
                    border: active ? "1px solid #ff975d" : "1px solid #383852",
                    backgroundImage: active
                      ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)"
                      : "none",
                    background: active ? undefined : "rgba(0,0,0,0.2)",
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
          <div>
            <h3 className="font-body text-2xl font-semibold text-white">Number of Wins</h3>
            <p className="font-body text-base font-semibold text-white/50">
              Select desired number of wins
            </p>
          </div>
          <div className="mt-2 flex items-center gap-8">
            <div className="flex flex-1 items-center gap-4">
              <span className="font-body text-xl font-medium text-white">1</span>
              <Slider min={1} max={5} value={wins} onChange={setWins} className="flex-1" />
              <span className="font-body text-xl font-medium text-white">5</span>
            </div>
            <div
              className="flex h-11 w-[75px] shrink-0 items-center justify-center rounded-2xl"
              style={{
                border: "1px solid #ff975d",
                backgroundImage:
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
