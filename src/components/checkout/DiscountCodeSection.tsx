import Image from "next/image";

type DiscountCodeSectionProps = {
  code: string;
  onCodeChange: (v: string) => void;
  isApplied: boolean;
  onApply: () => void;
  onRemove: () => void;
};

export function DiscountCodeSection({
  code,
  onCodeChange,
  isApplied,
  onApply,
  onRemove,
}: DiscountCodeSectionProps) {
  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
      <p className="mb-6 font-body text-base font-normal leading-6 text-white">Discount Code</p>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Input + Apply/Applied + Delete */}
        <div className="flex flex-1 items-center gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
            placeholder="Enter code"
            disabled={isApplied}
            className="h-12 min-w-0 flex-1 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.2)] px-6 font-body text-xl font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] placeholder:text-white/30 focus:border-[#ff5c00]/50 focus:outline-none disabled:text-white/50 lg:w-[300px] lg:flex-none"
          />
          <button
            type="button"
            onClick={isApplied ? undefined : onApply}
            disabled={!code.trim() && !isApplied}
            className="flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[#383852] px-6 font-body text-sm font-semibold uppercase tracking-wider text-white shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-all hover:border-[#ff975d] active:scale-95 disabled:opacity-40 lg:w-[106px] lg:px-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-47deg, #17191f, #383852)",
              opacity: isApplied ? 0.5 : undefined,
            }}
          >
            {isApplied ? "Applied" : "Apply"}
          </button>
          {isApplied && (
            <button
              type="button"
              onClick={onRemove}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-[rgba(250,70,9,0.2)] shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all hover:bg-[rgba(250,70,9,0.3)] active:scale-95"
            >
              <Image src="/images/icons/checkout/delete.svg" alt="Remove" width={24} height={24} />
            </button>
          )}
        </div>

        {/* Status */}
        {isApplied ? (
          <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#34a853] bg-[rgba(52,168,83,0.2)] p-2 lg:w-[300px]">
            <Image src="/images/icons/checkout/check-green.svg" alt="" width={12} height={12} />
            <span className="font-body text-sm font-bold leading-5 text-[#34a853]">
              5% discount successfully applied!
            </span>
          </div>
        ) : (
          <p className="font-body text-base font-normal leading-6 text-white">
            No discount code applied
          </p>
        )}
      </div>
    </div>
  );
}
