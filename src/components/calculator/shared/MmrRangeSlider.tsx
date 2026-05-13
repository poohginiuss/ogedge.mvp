"use client";

import { useEffect, useRef, useState } from "react";

type MmrRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  current: number;
  desired: number;
  onCurrentChange: (v: number) => void;
  onDesiredChange: (v: number) => void;
  formatValue?: (v: number) => string;
  className?: string;
  /** Hide the value labels rendered beneath the thumbs (used by Leveling slider). */
  hideThumbLabels?: boolean;
};

type Thumb = "current" | "desired";

export function MmrRangeSlider({
  min,
  max,
  step = 100,
  current,
  desired,
  onCurrentChange,
  onDesiredChange,
  formatValue = (v) => String(v),
  className = "",
  hideThumbLabels = false,
}: MmrRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<Thumb | null>(null);

  const clampToStep = (raw: number) => {
    const clamped = Math.min(max, Math.max(min, raw));
    return Math.round((clamped - min) / step) * step + min;
  };

  const valueFromX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return min;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clampToStep(min + ratio * (max - min));
  };

  const setForThumb = (thumb: Thumb, raw: number) => {
    const v = clampToStep(raw);
    if (thumb === "current") {
      onCurrentChange(Math.min(v, desired));
    } else {
      onDesiredChange(Math.max(v, current));
    }
  };

  const handleTrackPointerDown = (clientX: number) => {
    const v = valueFromX(clientX);
    const distToCurrent = Math.abs(v - current);
    const distToDesired = Math.abs(v - desired);
    const target: Thumb = distToCurrent <= distToDesired ? "current" : "desired";
    setDragging(target);
    setForThumb(target, v);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => setForThumb(dragging, valueFromX(e.clientX));
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) setForThumb(dragging, valueFromX(e.touches[0].clientX));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  });

  const range = max - min;
  const currentPct = range > 0 ? ((current - min) / range) * 100 : 0;
  const desiredPct = range > 0 ? ((desired - min) / range) * 100 : 0;
  const fillStart = Math.min(currentPct, desiredPct);
  const fillWidth = Math.max(0, desiredPct - currentPct);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="relative h-6 select-none"
        onMouseDown={(e) => handleTrackPointerDown(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches[0]) handleTrackPointerDown(e.touches[0].clientX);
        }}
        style={{ cursor: dragging ? "grabbing" : "pointer" }}
      >
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-[20px] bg-[#383852]"
        />
        <div
          aria-hidden
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-[20px]"
          style={{
            left: `${fillStart}%`,
            width: `${fillWidth}%`,
            background: "#ff5c00",
            boxShadow: "0 0 8px rgba(255,92,0,0.2), 0 0 10px rgba(255,92,0,0.4)",
          }}
        />

        {/* Current thumb */}
        <div
          role="slider"
          aria-label="Current MMR"
          aria-valuemin={min}
          aria-valuemax={desired}
          aria-valuenow={current}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              onCurrentChange(Math.min(desired, clampToStep(current + step)));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              onCurrentChange(Math.max(min, clampToStep(current - step)));
            }
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging("current");
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging("current");
          }}
          className="absolute top-1/2 flex items-center justify-center"
          style={{
            left: `${currentPct}%`,
            transform: "translate(-50%, -50%)",
            width: 32,
            height: 24,
            borderRadius: 8,
            background: "#ff5c00",
            boxShadow: "0 0 16px rgba(255,92,0,0.5)",
            cursor: dragging === "current" ? "grabbing" : "grab",
            zIndex: dragging === "current" ? 3 : 2,
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

        {/* Desired thumb */}
        <div
          role="slider"
          aria-label="Desired MMR"
          aria-valuemin={current}
          aria-valuemax={max}
          aria-valuenow={desired}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              onDesiredChange(Math.min(max, clampToStep(desired + step)));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              onDesiredChange(Math.max(current, clampToStep(desired - step)));
            }
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging("desired");
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging("desired");
          }}
          className="absolute top-1/2 flex items-center justify-center"
          style={{
            left: `${desiredPct}%`,
            transform: "translate(-50%, -50%)",
            width: 32,
            height: 24,
            borderRadius: 8,
            background: "#ff5c00",
            boxShadow: "0 0 16px rgba(255,92,0,0.5)",
            cursor: dragging === "desired" ? "grabbing" : "grab",
            zIndex: dragging === "desired" ? 3 : 2,
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

      {/* Value labels under thumbs */}
      {!hideThumbLabels && (
        <div className="relative mt-1 h-5">
          <div
            className="absolute top-0 -translate-x-1/2 rounded-md bg-[#151621] px-1.5 py-0.5 font-body text-[11px] font-semibold leading-none text-white whitespace-nowrap"
            style={{ left: `${currentPct}%` }}
          >
            {formatValue(current)}
          </div>
          <div
            className="absolute top-0 -translate-x-1/2 rounded-md bg-[#151621] px-1.5 py-0.5 font-body text-[11px] font-semibold leading-none text-white whitespace-nowrap"
            style={{ left: `${desiredPct}%` }}
          >
            {formatValue(desired)}
          </div>
        </div>
      )}
    </div>
  );
}
