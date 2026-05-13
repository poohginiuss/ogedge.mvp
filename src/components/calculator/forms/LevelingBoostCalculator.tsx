"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { MmrRangeSlider } from "../shared/MmrRangeSlider";

export type LevelingBoostCalculatorProps = {
  currentLevel: number;
  setCurrentLevel: (v: number) => void;
  desiredLevel: number;
  setDesiredLevel: (v: number) => void;
  platform: string;
  setPlatform: (p: string) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  requirements: string[];
  benefits: string[];
  min?: number;
  max?: number;
  step?: number;
};

const STEPPER_BG =
  "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-67deg, #17191f 0%, #383852 100%)";

const HIGHLIGHTED_BG =
  "linear-gradient(153deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)";

type LevelStepperProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  highlighted?: boolean;
};

function LevelStepper({
  label,
  value,
  onChange,
  min,
  max,
  step,
  highlighted = false,
}: LevelStepperProps) {
  return (
    <div
      className="flex flex-1 items-center overflow-hidden rounded-3xl p-5 md:p-6"
      style={{
        border: highlighted ? "1px solid #ff975d" : "1px solid #383852",
        background: highlighted ? HIGHLIGHTED_BG : undefined,
        boxShadow: highlighted ? "0 4px 14px rgba(255,92,0,0.3)" : undefined,
      }}
    >
      <div className="flex flex-1 flex-col items-center gap-2">
        <span className="font-body text-sm font-semibold uppercase leading-none text-white/80">
          {label}
        </span>
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            onClick={() => onChange(Math.max(min, value - step))}
            disabled={value <= min}
            aria-label={`Decrease ${label}`}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all disabled:opacity-40"
            style={{
              border: "1px solid #383852",
              background: STEPPER_BG,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/services/minus.svg" alt="" className="h-6 w-6" />
          </button>
          <div
            className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-[#151621] px-2"
            style={{
              border: "1px solid #383852",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              value={value === 0 ? "" : String(value)}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                if (cleaned === "") {
                  onChange(min);
                  return;
                }
                const parsed = Number.parseInt(cleaned, 10);
                if (!Number.isFinite(parsed)) {
                  onChange(min);
                  return;
                }
                onChange(Math.max(min, Math.min(max, parsed)));
              }}
              placeholder="Start typing"
              aria-label={label}
              className="w-full bg-transparent text-center font-body text-base font-medium text-white placeholder:font-heading placeholder:text-xs placeholder:font-normal placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, value + step))}
            disabled={value >= max}
            aria-label={`Increase ${label}`}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all disabled:opacity-40"
            style={{
              border: "1px solid #383852",
              background: STEPPER_BG,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/services/plus.svg" alt="" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

function RangeBoundPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-6 min-w-[28px] shrink-0 items-center justify-center rounded-md bg-[#151621] px-2 font-body text-xs font-semibold leading-none text-white">
      {children}
    </span>
  );
}

export function LevelingBoostCalculator({
  currentLevel,
  setCurrentLevel,
  desiredLevel,
  setDesiredLevel,
  platform,
  setPlatform,
  platformOptions,
  requirements,
  benefits,
  min = 1,
  max = 100,
  step = 1,
}: LevelingBoostCalculatorProps) {
  // Keep current ≤ desired by nudging the other endpoint when needed.
  const handleCurrentChange = (v: number) => {
    setCurrentLevel(v);
    if (v > desiredLevel) {
      setDesiredLevel(v);
    }
  };
  const handleDesiredChange = (v: number) => {
    setDesiredLevel(v);
    if (v < currentLevel) {
      setCurrentLevel(v);
    }
  };

  return (
    <div
      className="rounded-3xl p-6 md:p-10 lg:px-[60px] lg:py-[50px]"
      style={{
        border: "2px solid #6d6d96",
        background:
          "linear-gradient(114deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        backdropFilter: "blur(7px)",
      }}
    >
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h3 className="font-body text-lg font-medium leading-7 text-white lg:text-2xl lg:leading-8">
            Select Leveling Range
          </h3>
          <p className="font-body text-xs font-normal leading-[18px] text-white/50 lg:text-base lg:leading-6">
            Configure your order
          </p>
        </div>

        {/* Current/Desired level steppers + arrow */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4">
          <LevelStepper
            label="Current Level"
            value={currentLevel}
            onChange={handleCurrentChange}
            min={min}
            max={max}
            step={step}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/services/arrow-right-sm.svg"
            alt="to"
            className="h-5 w-5 shrink-0 rotate-180 lg:rotate-90"
          />
          <LevelStepper
            label="Desired Level"
            value={desiredLevel}
            onChange={handleDesiredChange}
            min={min}
            max={max}
            step={step}
            highlighted
          />
        </div>

        {/* Level Range slider */}
        <div
          className="flex flex-col gap-4 rounded-3xl px-6 py-5 md:px-8 md:py-6"
          style={{ border: "1px solid #383852" }}
        >
          <p className="text-center font-body text-sm font-semibold uppercase leading-none text-white/80">
            Level Range
          </p>
          <div className="flex items-center gap-3">
            <RangeBoundPill>{min}</RangeBoundPill>
            <MmrRangeSlider
              min={min}
              max={max}
              step={step}
              current={currentLevel}
              desired={desiredLevel}
              onCurrentChange={handleCurrentChange}
              onDesiredChange={handleDesiredChange}
              hideThumbLabels
              className="flex-1"
            />
            <RangeBoundPill>{max}</RangeBoundPill>
          </div>
        </div>

        {/* Game Configuration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-body text-lg font-medium leading-7 text-white lg:text-2xl lg:leading-8">
              Game Configuration
            </h3>
            <p className="font-body text-xs font-normal leading-[18px] text-white/50 lg:text-base lg:leading-6">
              Enter game details
            </p>
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
