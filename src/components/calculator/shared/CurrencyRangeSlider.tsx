"use client";

import { type MouseEvent, type TouchEvent, useEffect, useRef, useState } from "react";

type SnapPoint = {
  label: string;
};

/** Index-snap mode: value/onChange are pack indexes (original behaviour). */
type IndexModeProps = {
  snapPoints: SnapPoint[];
  value: number;
  onChange: (index: number) => void;
  continuousMin?: undefined;
  continuousMax?: undefined;
  packAmounts?: undefined;
};

/**
 * Continuous mode: value/onChange are raw amounts. The slider moves freely
 * between continuousMin and continuousMax. Tick marks are placed at packAmounts
 * positions and their labels come from snapPoints.
 */
type ContinuousModeProps = {
  snapPoints: SnapPoint[];
  value: number;
  onChange: (amount: number) => void;
  continuousMin: number;
  continuousMax: number;
  /** Must be the same length as snapPoints */
  packAmounts: number[];
};

type CurrencyRangeSliderProps = (IndexModeProps | ContinuousModeProps) & {
  savingsLabel?: string;
  labelVariant?: "dark" | "orange";
  className?: string;
};

export function CurrencyRangeSlider({
  snapPoints,
  value,
  onChange,
  savingsLabel,
  labelVariant = "dark",
  className = "",
  ...rest
}: CurrencyRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const isContinuous = rest.continuousMin !== undefined;
  const minAmt = isContinuous ? (rest as ContinuousModeProps).continuousMin : 0;
  const maxAmt = isContinuous ? (rest as ContinuousModeProps).continuousMax : snapPoints.length - 1;
  const packAmounts = isContinuous ? (rest as ContinuousModeProps).packAmounts : null;

  // Normalised position 0-100 for the thumb
  const percent = maxAmt > minAmt ? ((value - minAmt) / (maxAmt - minAmt)) * 100 : 0;

  const valueFromX = (clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return value;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (isContinuous) {
      return Math.round(minAmt + ratio * (maxAmt - minAmt));
    }
    return Math.round(ratio * (snapPoints.length - 1));
  };

  const handlePointerDown = (clientX: number) => {
    setDragging(true);
    (onChange as (v: number) => void)(valueFromX(clientX));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: globalThis.MouseEvent) =>
      (onChange as (v: number) => void)(valueFromX(e.clientX));
    const onUp = () => setDragging(false);
    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (e.touches[0]) (onChange as (v: number) => void)(valueFromX(e.touches[0].clientX));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  });

  // In continuous mode: which snap-label pill is "active" = the highest pack
  // whose amount is <= the current value.
  const activeLabelIndex = isContinuous
    ? (packAmounts ?? []).reduce<number>((best, amt, i) => (amt <= value ? i : best), 0)
    : (value as number);

  return (
    <div
      className={`flex flex-col gap-4 rounded-3xl border border-[#383852] p-4 md:p-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-semibold uppercase leading-normal text-white/80">
          Currency range
        </p>
        {savingsLabel && (
          <div className="flex flex-col items-end">
            <span className="font-body text-[10px] font-semibold uppercase text-[#6d6d96]">
              you are saving
            </span>
            <span className="font-body text-sm font-extrabold text-[#1aad19]">{savingsLabel}</span>
          </div>
        )}
      </div>

      {/* Slider track */}
      <div className="relative">
        <div
          ref={trackRef}
          role="slider"
          aria-valuemin={minAmt}
          aria-valuemax={maxAmt}
          aria-valuenow={value}
          tabIndex={0}
          className="relative h-6 select-none"
          onMouseDown={(e: MouseEvent) => handlePointerDown(e.clientX)}
          onTouchStart={(e: TouchEvent) => {
            if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
          }}
          onKeyDown={(e) => {
            const step = isContinuous ? Math.round((maxAmt - minAmt) / 20) : 1;
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              (onChange as (v: number) => void)(Math.min(maxAmt, value + step));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              (onChange as (v: number) => void)(Math.max(minAmt, value - step));
            }
          }}
          style={{ cursor: dragging ? "grabbing" : "pointer" }}
        >
          {/* Tick marks — positioned at pack percentages in continuous mode */}
          {isContinuous && packAmounts ? (
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2">
              {packAmounts.map((amt, i) => {
                const pct = ((amt - minAmt) / (maxAmt - minAmt)) * 100;
                return (
                  <div
                    key={snapPoints[i]?.label ?? i}
                    className="absolute h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-[#383852]"
                    style={{ left: `${pct}%` }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center justify-between">
              {snapPoints.map((point) => (
                <div
                  key={`tick-${point.label}`}
                  className="h-3 w-0.5 rounded-[10px] bg-[#383852]"
                />
              ))}
            </div>
          )}

          {/* Track background */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-[20px] bg-[#383852]"
          />

          {/* Active fill */}
          <div
            aria-hidden
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-[20px]"
            style={{
              width: `${percent}%`,
              background: "#ff5c00",
              boxShadow: "0 0 8px rgba(255,92,0,0.2), 0 0 10px rgba(255,92,0,0.4)",
            }}
          />

          {/* Thumb — narrower on mobile */}
          <div
            aria-hidden
            className="absolute top-1/2 flex items-center justify-center"
            style={{
              left: `${percent}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: 8,
              background: "#ff5c00",
              boxShadow: "0 0 16px rgba(255,92,0,0.5)",
              width: 24,
              height: 18,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/services/slider-plus.svg"
              alt=""
              className="pointer-events-none h-1.5 w-2"
              draggable={false}
            />
          </div>
        </div>

        {/* Discount / snap labels below the track */}
        {isContinuous && packAmounts ? (
          <div className="relative mt-3 h-7">
            {packAmounts.map((amt, i) => {
              const pct = ((amt - minAmt) / (maxAmt - minAmt)) * 100;
              const isActive = i === activeLabelIndex;
              return (
                <button
                  key={`label-${snapPoints[i]?.label ?? i}`}
                  type="button"
                  onClick={() => (onChange as (v: number) => void)(amt)}
                  className={`absolute -translate-x-1/2 cursor-pointer rounded-lg px-2 py-1 font-body text-xs font-medium leading-normal text-white transition-colors ${
                    isActive ? "bg-[#10a83c] font-bold" : "border border-[#383852] bg-[#13151e]"
                  }`}
                  style={{ left: `${pct}%` }}
                >
                  {snapPoints[i]?.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-between">
            {snapPoints.map((point, i) => {
              const isActive = i === activeLabelIndex;
              return (
                <button
                  key={`label-${point.label}`}
                  type="button"
                  onClick={() => (onChange as (v: number) => void)(i)}
                  className={`cursor-pointer rounded-lg px-2 py-1 font-body text-xs font-medium leading-normal text-white transition-colors ${
                    isActive
                      ? "bg-[#10a83c] font-bold"
                      : labelVariant === "orange"
                        ? "bg-[rgba(250,70,9,0.4)]"
                        : "border border-[#383852] bg-[#13151e]"
                  }`}
                >
                  {point.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
