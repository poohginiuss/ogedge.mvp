"use client";

import { useEffect, useRef, useState } from "react";

export type DropdownOption = string | { value: string; label: string; icon?: string };

function getLabel(opt: DropdownOption): string {
  return typeof opt === "string" ? opt : opt.label;
}

function getValue(opt: DropdownOption): string {
  return typeof opt === "string" ? opt : opt.value;
}

function getIcon(opt: DropdownOption): string | undefined {
  return typeof opt === "string" ? undefined : opt.icon;
}

type DropdownProps = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
};

export function Dropdown({ label, value, options, onChange, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => getValue(o) === value);
  const displayLabel = selected ? getLabel(selected) : value;
  const displayIcon = selected ? getIcon(selected) : undefined;

  return (
    <div ref={containerRef} className={`relative flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="font-body text-base font-normal leading-6 text-white">{label}</span>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 items-center justify-between rounded-2xl px-4 transition-colors"
        style={{
          background: "linear-gradient(-20deg, #17191f 0%, #383852 100%)",
          border: "1px solid #383852",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }}
      >
        <span className="flex items-center gap-2 font-body text-base font-medium leading-6 text-white">
          {displayIcon && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={displayIcon} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
          )}
          {displayLabel}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/arrow-up.svg"
          alt=""
          className={`h-5 w-5 opacity-80 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-[300px] w-full overflow-auto rounded-2xl"
          style={{
            background: "linear-gradient(-54deg, #17191f 0%, #383852 100%)",
            border: "1px solid #383852",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {options.map((opt, i) => {
            const optIcon = getIcon(opt);
            return (
              <button
                key={getValue(opt)}
                type="button"
                onClick={() => {
                  onChange(getValue(opt));
                  setOpen(false);
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex h-[53px] w-full items-center gap-2 px-4 text-left transition-colors"
                style={{
                  background: hoveredIndex === i ? "rgba(0,0,0,0.2)" : "transparent",
                }}
              >
                {optIcon && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={optIcon} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
                )}
                <span className="font-body text-base font-medium leading-6 text-white">
                  {getLabel(opt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
