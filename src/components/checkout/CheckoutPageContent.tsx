"use client";

import Image from "next/image";
import { useState } from "react";
import { BoosterTipSection } from "./BoosterTipSection";
import { CartItemCard } from "./CartItemCard";
import { CartSummary } from "./CartSummary";
import { CheckoutHero } from "./CheckoutHero";
import { DiscountCodeSection } from "./DiscountCodeSection";
import { SelectBoosterSection } from "./SelectBoosterSection";
import { type Booster, type CartItem, SAMPLE_CART_ITEMS } from "./checkoutData";

function parseTipAmount(
  percentTip: string | null,
  fixedTip: string | null,
  customAmount: string,
  subtotal: number,
): number {
  if (percentTip === "Custom" && customAmount) {
    const pct = Number.parseFloat(customAmount);
    if (!Number.isNaN(pct)) return Math.round(subtotal * (pct / 100) * 100) / 100;
    return 0;
  }
  if (fixedTip === "Custom" && customAmount) {
    const val = Number.parseFloat(customAmount);
    return Number.isNaN(val) ? 0 : val;
  }
  if (percentTip && percentTip !== "Custom") {
    const pct = Number.parseFloat(percentTip);
    return Math.round(subtotal * (pct / 100) * 100) / 100;
  }
  if (fixedTip && fixedTip !== "Custom") {
    return Number.parseFloat(fixedTip.replace("€", ""));
  }
  return 0;
}

export function CheckoutPageContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(SAMPLE_CART_ITEMS);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [selectedBooster, setSelectedBooster] = useState<Booster | null>(null);
  const [selectedPercentTip, setSelectedPercentTip] = useState<string | null>(null);
  const [selectedFixedTip, setSelectedFixedTip] = useState<string | null>("€20");
  const [customTipAmount, setCustomTipAmount] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tipAmount = parseTipAmount(selectedPercentTip, selectedFixedTip, customTipAmount, subtotal);
  const total = subtotal + tipAmount;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) setDiscountApplied(true);
  };

  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setDiscountApplied(false);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const handleSelectPercentTip = (value: string) => {
    setSelectedPercentTip(value);
    setSelectedFixedTip(null);
    if (value !== "Custom") setCustomTipAmount("");
  };

  const handleSelectFixedTip = (value: string) => {
    setSelectedFixedTip(value);
    setSelectedPercentTip(null);
    if (value !== "Custom") setCustomTipAmount("");
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <CheckoutHero activeStep={1} />

      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-0 lg:py-16">
        {/* Shopping Cart Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">Shopping Cart</h2>
            <p className="mt-1 font-body text-sm text-white/50">{cartItems.length} Item(s)</p>
          </div>
          <button
            type="button"
            onClick={handleEmptyCart}
            className="flex items-center gap-1 rounded-2xl bg-[rgba(250,70,9,0.2)] py-2 pl-4 pr-2 font-body text-sm text-[#ff5c00] transition-colors hover:bg-[rgba(250,70,9,0.3)]"
          >
            Empty Cart
            <Image
              src="/images/icons/checkout/close.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onEdit={() => {}}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </div>

        {/* Discount, Booster, Tip Sections */}
        <div className="mt-2 flex flex-col">
          <DiscountCodeSection
            code={discountCode}
            onCodeChange={setDiscountCode}
            isApplied={discountApplied}
            onApply={handleApplyDiscount}
            onRemove={handleRemoveDiscount}
          />
          <SelectBoosterSection
            selectedBooster={selectedBooster}
            onBoosterChange={setSelectedBooster}
          />
          <BoosterTipSection
            selectedPercentTip={selectedPercentTip}
            selectedFixedTip={selectedFixedTip}
            customAmount={customTipAmount}
            onCustomAmountChange={setCustomTipAmount}
            onSelectPercentTip={handleSelectPercentTip}
            onSelectFixedTip={handleSelectFixedTip}
          />
        </div>

        {/* Summary + Actions */}
        <CartSummary subtotal={subtotal} tipAmount={tipAmount} total={total} />
      </div>
    </div>
  );
}
