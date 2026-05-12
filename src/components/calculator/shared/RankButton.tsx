"use client";

import Image from "next/image";
import { useState } from "react";

const SELECTED_BG =
  "linear-gradient(132deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)";

const HOVER_BG =
  "linear-gradient(90deg, rgba(255,92,0,0.1) 0%, rgba(255,92,0,0.1) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)";

const NORMAL_BG = "rgba(0,0,0,0.2)";

type RankButtonProps = {
  label: string;
  imageSrc: string;
  glow: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export function RankButton({
  label,
  imageSrc,
  glow,
  active,
  disabled = false,
  onClick,
  className = "",
}: RankButtonProps) {
  const [hovered, setHovered] = useState(false);

  const isHoveredOnly = hovered && !active && !disabled;

  const background = active ? SELECTED_BG : isHoveredOnly ? HOVER_BG : NORMAL_BG;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      className={`relative flex items-center justify-center rounded-2xl p-4 transition-all ${
        disabled ? "cursor-not-allowed opacity-40" : ""
      } ${className}`}
      style={{
        border: active ? "1px solid #ff975d" : "1px solid #383852",
        background,
        boxShadow: active ? "0 4px 7px rgba(255,92,0,0.3)" : "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      {isHoveredOnly && (
        <span
          className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg px-4 py-2 font-body text-xs font-normal tracking-[0.24px] text-white"
          style={{
            background: "#232330",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {label}
        </span>
      )}
      <Image
        src={imageSrc}
        alt={label}
        width={52}
        height={46}
        unoptimized
        className="pointer-events-none h-[44px] w-auto max-w-[52px] object-contain"
        style={{ filter: `drop-shadow(0 4px 24px ${glow})` }}
      />
    </button>
  );
}
