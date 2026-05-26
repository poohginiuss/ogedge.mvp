"use client";

import Image from "next/image";
import { useState } from "react";
import type { CartItem } from "./checkoutData";

type CartItemCardProps = {
  item: CartItem;
  onEdit: () => void;
  onRemove: () => void;
};

const ALL_ADDONS = ["Offline Mode", "Streaming", "Priority", "Rush Completion"];

function AddonToggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80 active:scale-[0.97]"
    >
      <div
        className="relative h-4 w-7 rounded-full transition-colors"
        style={{ background: enabled ? "#ff5c00" : "#383852" }}
      >
        <div
          className="absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all"
          style={{ left: enabled ? 12 : 2 }}
        />
      </div>
      <span
        className="font-body text-sm font-normal"
        style={{ color: enabled ? "#ff975d" : "white" }}
      >
        {label}
      </span>
    </button>
  );
}

export function CartItemCard({ item, onEdit, onRemove }: CartItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [addonStates, setAddonStates] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ALL_ADDONS.map((a) => [a, item.addons.some((ad) => ad.label === a)])),
  );

  const handleToggleAddon = (label: string) => {
    setAddonStates((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      onEdit();
    }
    setIsEditing(!isEditing);
  };

  const activeAddons = ALL_ADDONS.filter((a) => addonStates[a]);

  return (
    <div className="mb-4 rounded-3xl bg-[rgba(56,56,82,0.3)] p-6">
      {/* Desktop Layout */}
      <div className="hidden items-center justify-between lg:flex">
        <div className="flex items-center gap-6">
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
            <div className="flex items-center gap-2 text-base leading-6 text-white">
              <span className="font-body font-medium">{item.service}</span>
              {item.serviceRange && (
                <>
                  <span className="text-[6px]">●</span>
                  <span className="font-body font-normal">{item.serviceRange}</span>
                </>
              )}
            </div>

            {isEditing ? (
              <div className="flex flex-wrap items-center gap-4">
                {ALL_ADDONS.map((addon) => (
                  <AddonToggle
                    key={addon}
                    label={addon}
                    enabled={!!addonStates[addon]}
                    onToggle={() => handleToggleAddon(addon)}
                  />
                ))}
              </div>
            ) : (
              activeAddons.length > 0 && (
                <div className="flex flex-wrap items-center gap-4">
                  {activeAddons.map((addon) => (
                    <span
                      key={addon}
                      className="flex items-center gap-2 font-body text-sm font-normal leading-5 text-white/90"
                    >
                      <Image
                        src="/images/icons/checkout/addon-dot.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                      {addon}
                    </span>
                  ))}
                </div>
              )
            )}

            <div className="flex items-center gap-1 font-body text-sm font-normal leading-5 text-white/60">
              <Image src="/images/icons/checkout/clock.svg" alt="" width={16} height={16} />
              <span>Estimated Completion Time:</span>
              <span>{item.estimatedTime}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-5">
          <span className="font-body text-2xl font-medium text-[#ff975d]">
            €{item.price.toFixed(2)}
          </span>
          {!isEditing && item.discountCode && (
            <div className="flex items-center gap-1 uppercase tracking-wider">
              <span className="font-body text-lg font-bold text-white">{item.discountCode}</span>
              <span className="font-body text-base font-normal text-white/80">applied</span>
            </div>
          )}
          <div className="flex items-center gap-4 font-body text-base font-normal uppercase tracking-wider text-white/80">
            <button
              type="button"
              onClick={handleEditClick}
              className="cursor-pointer transition-colors hover:text-[#ff975d]"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
            <button type="button" onClick={onRemove} className="cursor-pointer transition-colors hover:text-[#ff975d]">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-2 lg:hidden">
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
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <button
              type="button"
              onClick={handleEditClick}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[rgba(56,56,82,0.6)] transition-colors hover:bg-[rgba(255,151,93,0.3)] active:scale-95"
            >
              <Image
                src={isEditing ? "/images/icons/checkout/check-green.svg" : "/images/icons/checkout/edit.svg"}
                alt={isEditing ? "Save" : "Edit"}
                width={20}
                height={20}
              />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[rgba(56,56,82,0.6)] transition-colors hover:bg-[rgba(255,151,93,0.3)] active:scale-95"
            >
              <Image src="/images/icons/checkout/delete.svg" alt="Remove" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-medium text-white">{item.game}</span>
            <Image
              src="/images/icons/checkout/windows.svg"
              alt={item.platform}
              width={16}
              height={16}
            />
          </div>
          <span className="font-body text-xl font-medium text-[#ff975d]">
            €{item.price.toFixed(2)}
          </span>
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

        {isEditing ? (
          <div className="flex flex-wrap items-center gap-3">
            {ALL_ADDONS.map((addon) => (
              <AddonToggle
                key={addon}
                label={addon}
                enabled={!!addonStates[addon]}
                onToggle={() => handleToggleAddon(addon)}
              />
            ))}
          </div>
        ) : (
          activeAddons.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {activeAddons.map((addon) => (
                <span
                  key={addon}
                  className="flex items-center gap-2 font-body text-xs text-white/90"
                >
                  <Image src="/images/icons/checkout/addon-dot.svg" alt="" width={12} height={12} />
                  {addon}
                </span>
              ))}
            </div>
          )
        )}

        <div className="flex items-center gap-1 font-body text-xs text-white/60">
          <Image src="/images/icons/checkout/clock.svg" alt="" width={16} height={16} />
          <span>Estimated Completion Time:</span>
          <span>{item.estimatedTime}</span>
        </div>

        {!isEditing && item.discountCode && (
          <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#34a853] bg-[rgba(52,168,83,0.2)] p-2">
            <Image src="/images/icons/checkout/check-green.svg" alt="" width={12} height={12} />
            <p className="font-body text-sm leading-5 text-[#34a853]">
              <span className="font-bold">{item.discountCode.toUpperCase()}</span>{" "}
              <span className="font-normal">Discount Code Successfully Applied!</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
