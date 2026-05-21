"use client";

import Image from "next/image";
import type { Booster } from "./checkoutData";
import { BoosterSearchInput } from "./BoosterSearchInput";

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
          <div className="group/info relative flex cursor-pointer items-center gap-4 rounded-2xl border border-transparent px-3 py-2 font-body text-base font-normal text-white transition-all duration-200 hover:border-brand-light/30 hover:shadow-[0_0_12px_rgba(255,92,0,0.15)]">
            <span>{selectedBooster ? "Booster selected" : "No specific booster selected"}</span>
            <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} className="transition-transform duration-200 group-hover/info:scale-110" />
            <div className="pointer-events-none absolute right-0 top-full z-50 mt-1 w-[240px] rounded-2xl border border-dark-border p-4 opacity-0 transition-opacity duration-200 group-hover/info:pointer-events-auto group-hover/info:opacity-100" style={{ background: "linear-gradient(-43deg, #17191f, #383852)" }}>
              <p className="font-body text-sm leading-5 text-white/90">You can optionally choose a specific booster, or one will be automatically assigned.</p>
            </div>
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
                onClick={() => onBoosterChange(null)}
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
