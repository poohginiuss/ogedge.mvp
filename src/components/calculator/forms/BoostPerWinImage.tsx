"use client";

import type { DropdownOption } from "@/components/ui/Dropdown";
import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { Slider } from "@/components/ui/Slider";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";

export type BoostPerWinImageProps = {
  rankOptions: DropdownOption[];
  divisionOptions: DropdownOption[];
  selectedRank: string;
  setSelectedRank: (v: string) => void;
  selectedDivision: string;
  setSelectedDivision: (v: string) => void;
  wins: number;
  setWins: (w: number) => void;
  platform: string;
  setPlatform: (p: string) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  requirements: string[];
  benefits: string[];
};

const CALC_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

export function BoostPerWinImage({
  rankOptions,
  divisionOptions,
  selectedRank,
  setSelectedRank,
  selectedDivision,
  setSelectedDivision,
  wins,
  setWins,
  platform,
  setPlatform,
  platformOptions,
  requirements,
  benefits,
}: BoostPerWinImageProps) {
  return (
    <div
      className="min-w-0 rounded-3xl p-6 md:p-10 xl:px-[60px] xl:py-[50px]"
      style={{ border: CALC_BORDER, background: CALC_BG, backdropFilter: "blur(7px)" }}
    >
      <div className="flex min-w-0 flex-col gap-8 font-body">
        {/* Rank & Division Dropdowns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-2xl font-medium leading-8 text-white">Select Rank</h3>
              <p className="text-base font-medium leading-6 text-white/50">Select your rank</p>
            </div>
            <Dropdown
              label=""
              value={selectedRank}
              options={rankOptions}
              onChange={setSelectedRank}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-2xl font-medium leading-8 text-white">Select Division</h3>
              <p className="text-base font-medium leading-6 text-white/50">Select your division</p>
            </div>
            <Dropdown
              label=""
              value={selectedDivision}
              options={divisionOptions}
              onChange={setSelectedDivision}
            />
          </div>
        </div>

        {/* Number of Wins */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-medium leading-8 text-white">Number of Wins</h3>
              <p className="text-base font-medium leading-6 text-white/50">
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

          {/* Mobile slider */}
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

          {/* Desktop slider */}
          <div className="mt-2 hidden items-center gap-8 md:flex">
            <div className="flex flex-1 items-center gap-4">
              <span className="text-xl font-semibold text-white">1</span>
              <Slider min={1} max={5} value={wins} onChange={setWins} className="flex-1" />
              <span className="text-xl font-semibold text-white">5</span>
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
