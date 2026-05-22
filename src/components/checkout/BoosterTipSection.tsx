import Image from "next/image";
import { useState } from "react";
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
      className="flex h-[50px] min-w-0 flex-1 items-center justify-center rounded-2xl border px-2 py-3 font-body text-base font-medium leading-7 text-white transition-all lg:p-4 lg:text-lg"
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

function CustomTipInput({
  icon,
  customAmount,
  onCustomAmountChange,
  className,
}: {
  icon: React.ReactNode;
  customAmount: string;
  onCustomAmountChange: (v: string) => void;
  className?: string;
}) {
  const [applied, setApplied] = useState(false);
  const hasValue = customAmount.trim().length > 0;

  return (
    <div
      className={`relative flex h-[50px] items-center rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.5)] px-4 ${className ?? ""}`}
    >
      {icon}
      <input
        type="text"
        inputMode="numeric"
        value={customAmount}
        onChange={(e) => {
          const v = e.target.value.replace(/[^0-9.]/g, "");
          onCustomAmountChange(v);
          setApplied(false);
        }}
        placeholder="Enter custom amount"
        className="ml-2 w-full bg-transparent pr-[90px] font-body text-base font-normal leading-5 text-white/80 placeholder:text-white/50 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => {
          if (hasValue) setApplied(true);
        }}
        className="absolute right-2 flex items-center justify-center gap-1 rounded-xl px-3 py-1.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-all"
        style={
          applied
            ? {
                background: "linear-gradient(90deg, #1aad19 0%, #0d7a0c 100%)",
              }
            : hasValue
              ? {
                  background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)",
                }
              : {
                  background: "rgba(0,0,0,0.3)",
                  opacity: 0.5,
                }
        }
      >
        {applied && (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M11.5 4L5.5 10L2.5 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {applied ? "APPLIED" : "APPLY"}
      </button>
    </div>
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

  const customIcon = isPercentCustom ? (
    <Image src="/images/icons/checkout/percent.svg" alt="" width={16} height={16} />
  ) : (
    <span className="font-body text-sm text-[#FA4609]">€</span>
  );

  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-4 lg:p-6">
      <p className="mb-4 font-body text-base font-normal leading-6 text-white lg:mb-6">
        Booster Tip
      </p>

      <div className="flex flex-col gap-2">
        {/* Desktop: each row has chips (75%) + reserved input slot (25%) */}
        <div className="hidden lg:flex lg:flex-col lg:gap-2">
          <div className="flex gap-3">
            <div className="flex w-[75%] gap-2">
              {PERCENT_OPTIONS.map((opt) => (
                <TipChip
                  key={`pct-${opt}`}
                  label={opt}
                  isSelected={selectedPercentTip === opt}
                  isCustom={opt === "Custom"}
                  onClick={() => onSelectPercentTip(opt)}
                />
              ))}
            </div>
            <div className="w-[25%]">
              {isPercentCustom && (
                <CustomTipInput
                  icon={
                    <Image src="/images/icons/checkout/percent.svg" alt="" width={16} height={16} />
                  }
                  customAmount={customAmount}
                  onCustomAmountChange={onCustomAmountChange}
                  className="w-full"
                />
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex w-[75%] gap-2">
              {FIXED_OPTIONS.map((opt) => (
                <TipChip
                  key={`fix-${opt}`}
                  label={opt}
                  isSelected={selectedFixedTip === opt}
                  isCustom={opt === "Custom"}
                  onClick={() => onSelectFixedTip(opt)}
                />
              ))}
            </div>
            <div className="w-[25%]">
              {isFixedCustom && (
                <CustomTipInput
                  icon={<span className="font-body text-sm text-[#FA4609]">€</span>}
                  customAmount={customAmount}
                  onCustomAmountChange={onCustomAmountChange}
                  className="w-full"
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile: stacked rows */}
        <div className="flex flex-col gap-2 lg:hidden">
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
          </div>
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
          </div>
          {showCustomInput && (
            <CustomTipInput
              icon={customIcon}
              customAmount={customAmount}
              onCustomAmountChange={onCustomAmountChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
