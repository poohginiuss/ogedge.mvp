import { Button } from "@/components/ui/Button";

type CartSummaryProps = {
  subtotal: number;
  tipAmount: number;
  total: number;
};

export function CartSummary({ subtotal, tipAmount, total }: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary panels — two separate cards */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Left: line items */}
        <div className="flex-1 rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
              <span className="font-body text-sm font-normal leading-5 text-white/80">Items</span>
              <span className="font-body text-base font-bold leading-6 text-[#ff975d]">
                €{subtotal.toFixed(0)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
              <span className="font-body text-sm font-normal leading-5 text-white/80">
                Booster Tip
              </span>
              <span className="font-body text-base font-bold leading-6 text-[#ff975d]">
                €{tipAmount.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: total */}
        <div className="flex flex-1 items-center justify-between rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
          <span className="font-body text-2xl font-medium leading-8 text-white">Total</span>
          <span className="font-heading text-[30px] font-bold leading-[38px] text-[#ff975d]">
            €{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
        <Button
          href="/"
          variant="secondary"
          size="sm"
          className="w-full whitespace-nowrap px-8 py-6 lg:w-[270px]"
        >
          Continue Shopping
        </Button>
        <Button
          href="/checkout/details"
          variant="primary"
          size="sm"
          className="w-full whitespace-nowrap px-8 py-6 lg:w-[270px]"
        >
          Checkout Now (€{total.toFixed(2)})
        </Button>
      </div>
    </div>
  );
}
