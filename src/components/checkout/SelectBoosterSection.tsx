"use client";

import Image from "next/image";
import { useState } from "react";
import type { Booster } from "./checkoutData";
import { BoosterSearchInput } from "./BoosterSearchInput";

function BoosterDisclaimer({ label }: { label: string }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="flex items-center gap-4 rounded-2xl px-3 py-2 font-body text-base font-normal text-white">
      <span>{label}</span>
      <div className="group/info relative">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowTip((v) => !v)}
          onBlur={() => setShowTip(false)}
        >
          <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} className="transition-transform duration-200 group-hover/info:scale-110" />
        </button>
        <div
          className={`pointer-events-none absolute bottom-full right-0 z-50 mb-1 w-[240px] rounded-2xl border border-dark-border p-4 transition-opacity duration-200 lg:opacity-0 lg:group-hover/info:pointer-events-auto lg:group-hover/info:opacity-100 ${showTip ? "pointer-events-auto !opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(-43deg, #17191f, #383852)" }}
        >
          <p className="font-body text-sm leading-5 text-white/90">You can optionally choose a specific booster, or one will be automatically assigned.</p>
        </div>
      </div>
    </div>
  );
}

type SelectBoosterSectionProps = {
  selectedBooster: Booster | null;
  onBoosterChange: (b: Booster | null) => void;
};

export function SelectBoosterSection({
  selectedBooster,
  onBoosterChange,
}: SelectBoosterSectionProps) {
  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
      <p className="mb-6 font-body text-base font-normal leading-6 text-white">Select Booster</p>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full lg:w-[400px]">
          <BoosterSearchInput selectedBooster={null} onBoosterChange={onBoosterChange} />
        </div>

        {/* Status / Selected */}
        <div className="flex flex-col items-start gap-1 lg:items-end">
          <BoosterDisclaimer label={selectedBooster ? "Booster selected" : "No specific booster selected"} />

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
                onClick={() => onBoosterChange(null)}
                className="ml-1 cursor-pointer transition-opacity hover:opacity-70 active:scale-90"
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
