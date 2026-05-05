"use client";

import { useCallback, useRef, useState, useEffect, type MouseEvent, type TouchEvent } from "react";

type SliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
};

export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className = "",
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const percent = ((value - min) / (max - min)) * 100;

  const clampToStep = useCallback(
    (raw: number) => {
      const clamped = Math.min(max, Math.max(min, raw));
      return Math.round((clamped - min) / step) * step + min;
    },
    [min, max, step],
  );

  const valueFromX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return value;
      const ratio = (clientX - rect.left) / rect.width;
      return clampToStep(min + ratio * (max - min));
    },
    [min, max, value, clampToStep],
  );

  const handlePointerDown = (clientX: number) => {
    setDragging(true);
    onChange(valueFromX(clientX));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: globalThis.MouseEvent) => onChange(valueFromX(e.clientX));
    const onUp = () => setDragging(false);
    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (e.touches[0]) onChange(valueFromX(e.touches[0].clientX));
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
  }, [dragging, onChange, valueFromX]);

  return (
    <div
      className={`relative h-6 select-none ${className}`}
      ref={trackRef}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      onMouseDown={(e: MouseEvent) => handlePointerDown(e.clientX)}
      onTouchStart={(e: TouchEvent) => {
        if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          onChange(clampToStep(value + step));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          onChange(clampToStep(value - step));
        }
      }}
      style={{ cursor: dragging ? "grabbing" : "pointer" }}
    >
      {/* Grey background track */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-[20px]"
        style={{ background: "#383852" }}
      />
      {/* Orange filled track */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-[20px]"
        style={{
          width: `${percent}%`,
          background: "#ff5c00",
          boxShadow: "0 0 8px rgba(255,92,0,0.2), 0 0 10px rgba(255,92,0,0.4)",
        }}
      />
      {/* Thumb handle */}
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
          className="h-2 w-[9px] pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
