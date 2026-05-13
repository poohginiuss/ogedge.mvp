"use client";

import { type MouseEvent, type TouchEvent, useEffect, useRef, useState } from "react";

type SnapPoint = {
  label: string;
};

type CurrencyRangeSliderProps = {
  snapPoints: SnapPoint[];
  value: number;
  onChange: (index: number) => void;
  /** Optional "you are saving $X" text shown in the header row */
  savingsLabel?: string;
  /** "dark" = dark bg inactive labels (default), "orange" = orange-tint inactive labels */
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
}: CurrencyRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const maxIndex = snapPoints.length - 1;
  const percent = maxIndex > 0 ? (value / maxIndex) * 100 : 0;

  const indexFromX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return value;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(ratio * maxIndex);
  };

  const handlePointerDown = (clientX: number) => {
    setDragging(true);
    onChange(indexFromX(clientX));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: globalThis.MouseEvent) => onChange(indexFromX(e.clientX));
    const onUp = () => setDragging(false);
    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (e.touches[0]) onChange(indexFromX(e.touches[0].clientX));
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

      {/* Slider track area */}
      <div className="relative">
        {/* Tick marks + track + thumb */}
        <div
          ref={trackRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={maxIndex}
          aria-valuenow={value}
          tabIndex={0}
          className="relative h-6 select-none"
          onMouseDown={(e: MouseEvent) => handlePointerDown(e.clientX)}
          onTouchStart={(e: TouchEvent) => {
            if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              onChange(Math.min(maxIndex, value + 1));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              onChange(Math.max(0, value - 1));
            }
          }}
          style={{ cursor: dragging ? "grabbing" : "pointer" }}
        >
          {/* Tick marks */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center justify-between">
            {snapPoints.map((point) => (
              <div key={`tick-${point.label}`} className="h-3 w-0.5 rounded-[10px] bg-[#383852]" />
            ))}
          </div>

          {/* Background track */}
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

          {/* Thumb */}
          <div
            aria-hidden
            className="absolute top-1/2 flex items-center justify-center"
            style={{
              left: `${percent}%`,
              transform: "translate(-50%, -50%)",
              width: 32,
              height: 24,
              borderRadius: 8,
              background: "#ff5c00",
              boxShadow: "0 0 16px rgba(255,92,0,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/services/slider-plus.svg"
              alt=""
              className="pointer-events-none h-2 w-[9px]"
              draggable={false}
            />
          </div>
        </div>

        {/* Discount labels below */}
        <div className="mt-3 flex items-center justify-between">
          {snapPoints.map((point, i) => {
            const isActive = i === value;
            return (
              <button
                key={`label-${point.label}`}
                type="button"
                onClick={() => onChange(i)}
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
      </div>
    </div>
  );
}
