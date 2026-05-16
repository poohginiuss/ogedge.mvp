import Image from "next/image";
import type { CartItem } from "./checkoutData";

type CartItemCardProps = {
  item: CartItem;
  onEdit: () => void;
  onRemove: () => void;
};

export function CartItemCard({ item, onEdit, onRemove }: CartItemCardProps) {
  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
      {/* Desktop Layout */}
      <div className="hidden items-center justify-between lg:flex">
        <div className="flex items-center gap-6">
          {/* Game artwork with overlay */}
          <div className="relative h-[103px] w-[180px] shrink-0 overflow-hidden rounded-2xl">
            <Image src={item.gameImage} alt={item.game} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/home/games/valorant-logo.png"
                alt={item.game}
                width={91}
                height={62}
                className="h-auto w-[91px] object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Game name + platform */}
            <div className="flex items-center gap-2">
              <span className="font-body text-2xl font-medium leading-8 text-white">
                {item.game}
              </span>
              <Image
                src="/images/icons/checkout/windows.svg"
                alt={item.platform}
                width={24}
                height={24}
              />
            </div>
            {/* Service + range */}
            <div className="flex items-center gap-2 text-base leading-6 text-white">
              <span className="font-body font-medium">{item.service}</span>
              {item.serviceRange && (
                <>
                  <span className="text-[6px]">●</span>
                  <span className="font-body font-normal">{item.serviceRange}</span>
                </>
              )}
            </div>
            {/* Addon tags */}
            {item.addons.length > 0 && (
              <div className="flex flex-wrap items-center gap-4">
                {item.addons.map((addon) => (
                  <span
                    key={addon.label}
                    className="flex items-center gap-2 font-body text-sm font-normal leading-5 text-white/90"
                  >
                    <Image
                      src="/images/icons/checkout/addon-dot.svg"
                      alt=""
                      width={12}
                      height={12}
                    />
                    {addon.label}
                  </span>
                ))}
              </div>
            )}
            {/* Estimated time */}
            <div className="flex items-center gap-1 font-body text-sm font-normal leading-5 text-white/60">
              <Image src="/images/icons/checkout/clock.svg" alt="" width={16} height={16} />
              <span>Estimated Completion Time:</span>
              <span>{item.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Right: Price + Actions */}
        <div className="flex shrink-0 flex-col items-end gap-5">
          <span className="font-body text-2xl font-medium text-[#ff975d]">
            €{item.price.toFixed(2)}
          </span>
          {item.discountCode && (
            <div className="flex items-center gap-1 uppercase tracking-wider">
              <span className="font-body text-lg font-bold text-white">{item.discountCode}</span>
              <span className="font-body text-base font-normal text-white/80">applied</span>
            </div>
          )}
          <div className="flex items-center gap-4 font-body text-base font-normal uppercase tracking-wider text-white/80">
            <button type="button" onClick={onEdit} className="transition-colors hover:text-white">
              Edit
            </button>
            <button type="button" onClick={onRemove} className="transition-colors hover:text-white">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="relative h-[103px] w-full overflow-hidden rounded-2xl">
          <Image src={item.gameImage} alt={item.game} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/home/games/valorant-logo.png"
              alt={item.game}
              width={91}
              height={62}
              className="h-auto w-[91px] object-contain"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-lg font-medium text-white">{item.game}</span>
          <Image
            src="/images/icons/checkout/windows.svg"
            alt={item.platform}
            width={16}
            height={16}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-white">
          <span className="font-body font-medium">{item.service}</span>
          {item.serviceRange && (
            <>
              <span className="text-[6px]">●</span>
              <span className="font-body font-normal">{item.serviceRange}</span>
            </>
          )}
        </div>
        {item.addons.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {item.addons.map((addon) => (
              <span
                key={addon.label}
                className="flex items-center gap-2 font-body text-xs text-white/90"
              >
                <Image src="/images/icons/checkout/addon-dot.svg" alt="" width={12} height={12} />
                {addon.label}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1 font-body text-xs text-white/60">
          <Image src="/images/icons/checkout/clock.svg" alt="" width={16} height={16} />
          <span>Estimated Completion Time:</span>
          <span>{item.estimatedTime}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-body text-xl font-medium text-[#ff975d]">
              €{item.price.toFixed(2)}
            </span>
            {item.discountCode && (
              <div className="flex items-center gap-1 uppercase tracking-wider">
                <span className="font-body text-sm font-bold text-white">{item.discountCode}</span>
                <span className="font-body text-xs text-white/80">applied</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 font-body text-sm uppercase tracking-wider text-white/80">
            <button type="button" onClick={onEdit} className="transition-colors hover:text-white">
              Edit
            </button>
            <button type="button" onClick={onRemove} className="transition-colors hover:text-white">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
