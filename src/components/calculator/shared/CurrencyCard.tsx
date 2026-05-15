export type CurrencyCardData = {
  id: string;
  amount: number;
  amountLabel: string;
  packName: string;
  price: number;
  discount?: number;
  discountLabel: string;
  image: string;
  isVip?: boolean;
};

type CurrencyCardProps = {
  pack: CurrencyCardData;
  selected: boolean;
  onClick: () => void;
};

export function CurrencyCard({ pack, selected, onClick }: CurrencyCardProps) {
  const { amountLabel, packName, price, discount, image, isVip } = pack;

  if (isVip) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative flex h-[212px] flex-1 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-[20px] border py-3 transition-all ${
          selected
            ? "border-[#ff975d] drop-shadow-[0_4px_7px_rgba(255,92,0,0.3)]"
            : "border-[rgba(255,255,255,0.25)]"
        }`}
      >
        {/* Gold gradient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #856220 0%, #f4e683 38%, #bf923d 69%, #4e341b 104%, #f1ea82 139%)",
          }}
        />

        {/* Content area */}
        <div className="relative z-10 flex flex-col items-center gap-2 rounded-2xl bg-[rgba(153,114,50,0.5)] px-3 py-2">
          <div className="flex flex-col items-center gap-0.5">
            <p className="font-heading text-2xl font-black leading-normal text-[#17191f] md:text-[32px]">
              {amountLabel}
            </p>
            <div className="relative h-[53px] w-[80px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className="pointer-events-none absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
          {discount != null && (
            <div className="flex items-center justify-center rounded-2xl bg-[#17191f] px-4 py-1.5">
              <span className="font-body text-sm font-bold leading-5 text-white">
                {discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* VIP label */}
        <div className="relative z-10 flex items-center">
          <div className="flex flex-col items-center font-body text-sm font-black leading-normal text-[#17191f]">
            <p>VIP STATUS</p>
            <p>UNLOCKED</p>
          </div>
        </div>

        {/* Inner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ boxShadow: "inset 0 4px 6px 0 rgba(255,255,255,0.6)" }}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-[212px] flex-1 cursor-pointer flex-col items-center justify-between rounded-2xl border py-4 transition-all ${
        selected
          ? "border-[#ff975d] drop-shadow-[0_4px_7px_rgba(255,92,0,0.3)]"
          : "border-[#383852] bg-[rgba(0,0,0,0.2)] shadow-[0_4px_16px_0_rgba(0,0,0,0.15)]"
      }`}
      style={
        selected
          ? {
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
            }
          : undefined
      }
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-0.5">
          <p className="font-heading text-2xl font-semibold leading-normal text-white md:text-[32px]">
            {amountLabel}
          </p>
          <div className="relative h-[49px] w-[80px] md:h-[53px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
        {discount != null ? (
          <div className="flex items-center justify-center rounded-2xl bg-[#10a83c] px-4 py-1.5">
            <span className="font-body text-sm font-bold leading-5 text-white">
              {discount}% OFF
            </span>
          </div>
        ) : (
          <p className="font-body text-sm font-normal leading-normal text-white">{packName}</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-0.5 leading-normal text-white">
        <p className="font-body text-xs font-normal">Price</p>
        <p className="font-heading text-lg font-semibold md:text-xl">${price.toFixed(2)}</p>
      </div>
    </button>
  );
}
