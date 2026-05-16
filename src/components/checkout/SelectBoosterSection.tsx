"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Booster, MOCK_BOOSTERS } from "./checkoutData";

type SelectBoosterSectionProps = {
  selectedBooster: Booster | null;
  onBoosterChange: (b: Booster | null) => void;
};

export function SelectBoosterSection({
  selectedBooster,
  onBoosterChange,
}: SelectBoosterSectionProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = MOCK_BOOSTERS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (booster: Booster) => {
    onBoosterChange(booster);
    setQuery("");
    setOpen(false);
  };

  const handleClear = () => {
    onBoosterChange(null);
    setQuery("");
  };

  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
      <p className="mb-6 font-body text-base font-normal leading-6 text-white">Select Booster</p>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Search input with dropdown */}
        <div ref={wrapperRef} className="relative w-full lg:w-[400px]">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => {
                if (query) setOpen(true);
              }}
              placeholder="Search booster"
              className="h-14 w-full rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.5)] px-4 pr-10 font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:border-[#ff5c00]/50 focus:outline-none"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <Image src="/images/icons/checkout/search.svg" alt="" width={16} height={16} />
            </span>
          </div>

          {/* Dropdown */}
          {open && query.length > 0 && filtered.length > 0 && (
            <div
              className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-2xl border border-[#383852] shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              style={{
                backgroundImage: "linear-gradient(-44deg, #17191f, #383852)",
              }}
            >
              {filtered.map((booster, i) => (
                <button
                  key={booster.id}
                  type="button"
                  onClick={() => handleSelect(booster)}
                  className="flex h-[53px] w-full items-center justify-between px-4 font-body text-base font-medium text-white transition-colors hover:bg-[rgba(0,0,0,0.2)]"
                >
                  <span>
                    <span className="text-white">{booster.name.slice(0, query.length)}</span>
                    <span className="text-white/30">{booster.name.slice(query.length)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/images/icons/checkout/star.svg" alt="" width={35} height={35} />
                    <span className="-ml-3 font-body text-base font-bold text-[#ff975d]">
                      {booster.rating}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status / Selected */}
        <div className="flex flex-col items-start gap-1 lg:items-end">
          <div className="flex items-center gap-4 font-body text-base font-normal text-white">
            <span>{selectedBooster ? "Booster selected" : "No specific booster selected"}</span>
            <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} />
          </div>

          {selectedBooster && (
            <div className="mt-1 flex h-[50px] items-center gap-2 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.2)] px-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
              <span className="font-body text-base font-medium text-white">
                {selectedBooster.name}
              </span>
              <Image src="/images/icons/checkout/star.svg" alt="" width={35} height={35} />
              <span className="-ml-4 font-body text-base font-bold text-[#ff975d]">
                {selectedBooster.rating}
              </span>
              <button
                type="button"
                onClick={handleClear}
                className="ml-1 transition-opacity hover:opacity-70"
              >
                <Image src="/images/icons/checkout/close.svg" alt="Remove" width={24} height={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
