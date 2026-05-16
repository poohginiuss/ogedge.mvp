import Image from "next/image";
import { FIXED_OPTIONS, PERCENT_OPTIONS } from "./checkoutData";

type BoosterTipSectionProps = {
  selectedPercentTip: string | null;
  selectedFixedTip: string | null;
  customAmount: string;
  onCustomAmountChange: (v: string) => void;
  onSelectPercentTip: (value: string) => void;
  onSelectFixedTip: (value: string) => void;
};

function TipChip({
  label,
  isSelected,
  isCustom,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  isCustom?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[50px] flex-1 items-center justify-center rounded-2xl border p-4 font-body text-lg font-medium leading-7 text-white transition-all"
      style={{
        borderColor: isSelected ? "#ff975d" : "#383852",
        background: isSelected
          ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852, #383852)"
          : "rgba(0,0,0,0.2)",
        boxShadow: isSelected ? "0 4px 7px rgba(255,92,0,0.3)" : "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      {/* Desktop: show "Custom" text, Mobile: show edit icon */}
      {isCustom ? (
        <>
          <span className="hidden lg:inline">{label}</span>
          <Image
            src="/images/icons/checkout/edit.svg"
            alt="Custom"
            width={24}
            height={24}
            className="lg:hidden"
          />
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function BoosterTipSection({
  selectedPercentTip,
  selectedFixedTip,
  customAmount,
  onCustomAmountChange,
  onSelectPercentTip,
  onSelectFixedTip,
}: BoosterTipSectionProps) {
  const isPercentCustom = selectedPercentTip === "Custom";
  const isFixedCustom = selectedFixedTip === "Custom";
  const showCustomInput = isPercentCustom || isFixedCustom;

  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-4 lg:p-6">
      <p className="mb-4 font-body text-base font-normal leading-6 text-white lg:mb-6">
        Booster Tip
      </p>

      <div className="flex flex-col gap-2">
        {/* Percentage row */}
        <div className="flex gap-2">
          {PERCENT_OPTIONS.map((opt) => (
            <TipChip
              key={`pct-${opt}`}
              label={opt}
              isSelected={selectedPercentTip === opt}
              isCustom={opt === "Custom"}
              onClick={() => onSelectPercentTip(opt)}
            />
          ))}
          {/* Desktop: custom input appears inline when percent Custom is selected */}
          {isPercentCustom && (
            <div className="hidden h-[50px] flex-1 items-center gap-2 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.5)] px-4 lg:flex">
              <Image src="/images/icons/checkout/percent.svg" alt="" width={16} height={16} />
              <input
                type="text"
                value={customAmount}
                onChange={(e) => onCustomAmountChange(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full bg-transparent font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Fixed amount row */}
        <div className="flex gap-2">
          {FIXED_OPTIONS.map((opt) => (
            <TipChip
              key={`fix-${opt}`}
              label={opt}
              isSelected={selectedFixedTip === opt}
              isCustom={opt === "Custom"}
              onClick={() => onSelectFixedTip(opt)}
            />
          ))}
          {/* Desktop: custom input appears inline when fixed Custom is selected */}
          {isFixedCustom && (
            <div className="hidden h-[50px] flex-1 items-center gap-2 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.5)] px-4 lg:flex">
              <span className="font-body text-sm text-[#FA4609]">€</span>
              <input
                type="text"
                value={customAmount}
                onChange={(e) => onCustomAmountChange(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full bg-transparent font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Mobile: custom input below rows, with correct icon based on which Custom is selected */}
        {showCustomInput && (
          <div className="flex h-[50px] items-center gap-2 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.5)] px-4 lg:hidden">
            {isPercentCustom ? (
              <Image src="/images/icons/checkout/percent.svg" alt="" width={16} height={16} />
            ) : (
              <span className="font-body text-sm text-[#FA4609]">€</span>
            )}
            <input
              type="text"
              value={customAmount}
              onChange={(e) => onCustomAmountChange(e.target.value)}
              placeholder="Enter custom amount"
              className="w-full bg-transparent font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
