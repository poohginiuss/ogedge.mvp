"use client";

import type { DropdownOption } from "@/components/ui/Dropdown";
import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";

const SELECTED_BG =
  "linear-gradient(132deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)";

function getIcon(options: DropdownOption[], value: string): string | undefined {
  const opt = options.find((o) => (typeof o === "string" ? o === value : o.value === value));
  return opt && typeof opt !== "string" ? opt.icon : undefined;
}

type RankBoostingImageProps = {
  currentCategory: string;
  setCurrentCategory: (v: string) => void;
  currentDivision: string;
  setCurrentDivision: (v: string) => void;
  desiredCategory: string;
  setDesiredCategory: (v: string) => void;
  desiredDivision: string;
  setDesiredDivision: (v: string) => void;
  categoryOptions: DropdownOption[];
  divisionOptions: DropdownOption[];
  serverOptions: string[];
  queueOptions: string[];
  server: string;
  setServer: (s: string) => void;
  queue: string;
  setQueue: (q: string) => void;
  platform: string;
  setPlatform: (p: string) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  requirements: string[];
  benefits: string[];
};

function RankPreview({
  currentIcon,
  desiredIcon,
}: {
  currentIcon?: string;
  desiredIcon?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Current rank preview */}
      <div
        className="flex h-[95px] w-[100px] items-center justify-center rounded-2xl p-4"
        style={{
          background: "rgba(0,0,0,0.2)",
          border: "1px solid #383852",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        {currentIcon && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={currentIcon}
            alt="Current rank"
            className="h-[72px] w-[72px] rounded-lg object-cover"
          />
        )}
      </div>

      {/* Arrow */}
      <div className="flex shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/arrow-right-sm.svg"
          alt=""
          className="h-5 w-5 opacity-60"
        />
      </div>

      {/* Desired rank preview (highlighted) */}
      <div
        className="flex h-[95px] w-[100px] items-center justify-center rounded-2xl p-4"
        style={{
          background: SELECTED_BG,
          border: "1px solid #ff975d",
          boxShadow: "0 4px 7px rgba(255,92,0,0.3)",
        }}
      >
        {desiredIcon && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={desiredIcon}
            alt="Desired rank"
            className="h-[72px] w-[72px] rounded-lg object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function RankBoostingImage({
  currentCategory,
  setCurrentCategory,
  currentDivision,
  setCurrentDivision,
  desiredCategory,
  setDesiredCategory,
  desiredDivision,
  setDesiredDivision,
  categoryOptions,
  divisionOptions,
  serverOptions,
  queueOptions,
  server,
  setServer,
  queue,
  setQueue,
  platform,
  setPlatform,
  platformOptions,
  requirements,
  benefits,
}: RankBoostingImageProps) {
  const currentIcon = getIcon(divisionOptions, currentDivision);
  const desiredIcon = getIcon(divisionOptions, desiredDivision);

  return (
    <div
      className="rounded-3xl p-6 md:p-10 lg:px-[60px] lg:py-[50px]"
      style={{
        border: "2px solid #6d6d96",
        background:
          "linear-gradient(113deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        backdropFilter: "blur(7px)",
      }}
    >
      <div className="flex flex-col gap-8">
        {/* Rank selectors */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
            {/* Current Rank */}
            <div className="flex flex-1 flex-col gap-6">
              <div>
                <h3 className="font-body text-lg font-medium leading-7 text-white md:text-2xl md:leading-8">
                  Current Rank
                </h3>
                <p className="font-body text-xs font-normal text-white/50 md:text-base md:font-medium">
                  Select your current rank and division
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Dropdown
                  label=""
                  value={currentCategory}
                  options={categoryOptions}
                  onChange={setCurrentCategory}
                />
                <Dropdown
                  label=""
                  value={currentDivision}
                  options={divisionOptions}
                  onChange={setCurrentDivision}
                />
              </div>
            </div>

            {/* Desired Rank */}
            <div className="flex flex-1 flex-col gap-6">
              <div>
                <h3 className="font-body text-lg font-medium leading-7 text-white md:text-2xl md:leading-8">
                  Desired Rank
                </h3>
                <p className="font-body text-xs font-normal text-white/50 md:text-base md:font-medium">
                  Select your desired rank and division
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Dropdown
                  label=""
                  value={desiredCategory}
                  options={categoryOptions}
                  onChange={setDesiredCategory}
                />
                <Dropdown
                  label=""
                  value={desiredDivision}
                  options={divisionOptions}
                  onChange={setDesiredDivision}
                />
              </div>
            </div>
          </div>

          {/* Rank preview */}
          <RankPreview currentIcon={currentIcon} desiredIcon={desiredIcon} />
        </div>

        {/* Game Configuration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-body text-lg font-medium leading-7 text-white md:text-2xl md:leading-8">
              Game Configuration
            </h3>
            <p className="font-body text-xs font-normal text-white/50 md:text-base md:font-medium">
              Enter game details
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            <Dropdown label="Server" value={server} options={serverOptions} onChange={setServer} />
            <Dropdown label="Queue" value={queue} options={queueOptions} onChange={setQueue} />
          </div>

          <div>
            <p className="font-body text-sm font-normal text-white md:text-base">
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
