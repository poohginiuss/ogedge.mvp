"use client";

import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
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

  return (
    <div ref={containerRef} className={`relative flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="font-body text-base font-normal text-white leading-6">{label}</span>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 items-center justify-between rounded-2xl px-4 transition-colors"
        style={{
          backgroundImage: "linear-gradient(-20deg, #17191f 0%, #383852 100%)",
          border: "1px solid #383852",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }}
      >
        <span className="font-body text-base font-medium text-white leading-6">{value}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/arrow-up.svg"
          alt=""
          className={`h-5 w-5 opacity-80 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-2xl"
          style={{
            backgroundImage: "linear-gradient(-54deg, #17191f 0%, #383852 100%)",
            border: "1px solid #383852",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex h-[53px] w-full items-center px-4 text-left transition-colors"
              style={{
                background: hoveredIndex === i ? "rgba(0,0,0,0.2)" : "transparent",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              }}
            >
              <span className="font-body text-base font-medium text-white leading-6">{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
