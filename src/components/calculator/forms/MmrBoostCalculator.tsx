"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";

import { BulletList } from "../shared/BulletList";
import { CollapsibleList } from "../shared/CollapsibleList";
import { MmrRangeSlider } from "../shared/MmrRangeSlider";

export type MmrQuickSelect = {
  id: string;
  label: string;
  current: number;
  desired: number;
};

export type MmrBoostCalculatorProps = {
  currentMmr: number;
  setCurrentMmr: (v: number) => void;
  desiredMmr: number;
  setDesiredMmr: (v: number) => void;
  platform: string;
  setPlatform: (p: string) => void;
  platformOptions: { id: string; label: string; icon: string }[];
  quickSelects: MmrQuickSelect[];
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

function formatMmrValue(n: number): string {
  return n.toLocaleString("de-DE");
}

type MmrStepperProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  highlighted?: boolean;
};

function MmrStepper({
  label,
  value,
  onChange,
  min,
  max,
  step,
  highlighted = false,
}: MmrStepperProps) {
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
                  onChange(0);
                  return;
                }
                const parsed = Number.parseInt(cleaned, 10);
                if (!Number.isFinite(parsed)) {
                  onChange(0);
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
        <span className="font-body text-sm font-normal leading-none text-white/80">Rank</span>
      </div>
    </div>
  );
}

type MmrQuickButtonProps = {
  current: number;
  desired: number;
  label: string;
  selected: boolean;
  onClick: () => void;
};

function MmrQuickButton({ label, selected, onClick }: MmrQuickButtonProps) {
  const [left, right] = label.split(/\s*→\s*|\s*▶\s*/);
  const display = right ? [left, right] : [label];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3 transition-all ${
        selected
          ? "border border-[#ff975d] shadow-[0_4px_7px_rgba(255,92,0,0.3)]"
          : "border border-[#383852] shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
      }`}
      style={{
        background: selected
          ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)"
          : "rgba(0,0,0,0.2)",
      }}
    >
      {display.length === 2 ? (
        <>
          <span
            className={`font-heading text-lg font-semibold leading-none ${selected ? "text-brand-light" : "text-white"}`}
          >
            {display[0]}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/services/arrow-right-sm.svg"
            alt="to"
            className={`h-3 w-3 rotate-90 ${selected ? "opacity-100" : "opacity-80"}`}
            style={
              selected
                ? {
                    filter:
                      "brightness(0) saturate(100%) invert(60%) sepia(74%) saturate(2186%) hue-rotate(346deg) brightness(101%) contrast(102%)",
                  }
                : undefined
            }
          />
          <span
            className={`font-heading text-lg font-semibold leading-none ${selected ? "text-brand-light" : "text-white"}`}
          >
            {display[1]}
          </span>
        </>
      ) : (
        <span
          className={`font-heading text-lg font-semibold leading-none ${selected ? "text-brand-light" : "text-white"}`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export function MmrBoostCalculator({
  currentMmr,
  setCurrentMmr,
  desiredMmr,
  setDesiredMmr,
  platform,
  setPlatform,
  platformOptions,
  quickSelects,
  requirements,
  benefits,
  min = 0,
  max = 6500,
  step = 100,
}: MmrBoostCalculatorProps) {
  // Keep current ≤ desired by nudging the other endpoint when the user types past it.
  const handleCurrentChange = (v: number) => {
    setCurrentMmr(v);
    if (v > desiredMmr) {
      setDesiredMmr(v);
    }
  };
  const handleDesiredChange = (v: number) => {
    setDesiredMmr(v);
    if (v < currentMmr) {
      setCurrentMmr(v);
    }
  };

  const handleQuickSelect = (qs: MmrQuickSelect) => {
    setCurrentMmr(qs.current);
    setDesiredMmr(qs.desired);
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
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h3 className="font-body text-lg font-medium leading-7 text-white lg:text-2xl lg:leading-8">
            Select MMR Range
          </h3>
          <p className="font-body text-xs font-normal leading-[18px] text-white/50 lg:text-base lg:leading-6">
            Configure your order
          </p>
        </div>

        {/* Current/Desired MMR steppers + arrow */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4">
          <MmrStepper
            label="Current MMR"
            value={currentMmr}
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
          <MmrStepper
            label="Desired MMR"
            value={desiredMmr}
            onChange={handleDesiredChange}
            min={min}
            max={max}
            step={step}
            highlighted
          />
        </div>

        {/* MMR Range slider */}
        <div
          className="flex flex-col gap-4 rounded-3xl px-6 py-5 md:px-8 md:py-6"
          style={{ border: "1px solid #383852" }}
        >
          <p className="text-center font-body text-sm font-semibold uppercase leading-none text-white/80">
            MMR Range
          </p>
          <MmrRangeSlider
            min={min}
            max={max}
            step={step}
            current={currentMmr}
            desired={desiredMmr}
            onCurrentChange={handleCurrentChange}
            onDesiredChange={handleDesiredChange}
            formatValue={formatMmrValue}
          />
        </div>

        {/* Quick Selection */}
        <div className="flex flex-col gap-3">
          <p className="font-body text-base font-medium leading-6 text-white">Quick Selection</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            {quickSelects.map((qs) => {
              const selected = qs.current === currentMmr && qs.desired === desiredMmr;
              return (
                <MmrQuickButton
                  key={qs.id}
                  current={qs.current}
                  desired={qs.desired}
                  label={qs.label}
                  selected={selected}
                  onClick={() => handleQuickSelect(qs)}
                />
              );
            })}
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
