"use client";

import Image from "next/image";
import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  AmountOption,
  CancelButton,
  CustomAmountInput,
  InfoBox,
  PaymentMethodSection,
  PopupTextarea,
  PrimaryButton,
  TotalAmountRow,
} from "./PopupShared";

interface SendTipPopupProps {
  isOpen: boolean;
  onClose: () => void;
  boosterName?: string;
}

const AMOUNTS = [5, 10, 15, 20, 25, 50];

export function SendTipPopup({
  isOpen,
  onClose,
  boosterName = "AmazingBooster",
}: SendTipPopupProps) {
  const [selectedAmount, setSelectedAmount] = useState(15);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "crypto">(
    "card",
  );
  const [message, setMessage] = useState("");

  const displayAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Image
            src="/images/popups/booster-avatar.png"
            alt={boosterName}
            width={60}
            height={60}
            className="size-[60px] shrink-0 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-medium leading-8 text-white">
              Send a Tip to {boosterName}
            </h2>
            <p className="font-body text-base font-normal leading-6 text-white">
              Choose or enter the amount you want to send as a tip
            </p>
          </div>
        </div>

        <InfoBox>
          100% of your gift goes to the booster. Your generosity is greatly
          appreciated!
        </InfoBox>

        <div className="grid grid-cols-3 gap-2">
          {AMOUNTS.map((amount) => (
            <AmountOption
              key={amount}
              label={`$${amount}`}
              selected={!isCustom && selectedAmount === amount}
              onClick={() => {
                setSelectedAmount(amount);
                setIsCustom(false);
              }}
            />
          ))}
          <AmountOption
            label="Custom"
            selected={isCustom}
            onClick={() => setIsCustom(true)}
          />
          <CustomAmountInput
            value={customAmount}
            onChange={(value) => {
              setCustomAmount(value);
              setIsCustom(true);
            }}
            onFocus={() => setIsCustom(true)}
          />
        </div>

        <PaymentMethodSection selected={paymentMethod} onSelect={setPaymentMethod} />

        <PopupTextarea
          label="Optional message for your booster"
          value={message}
          onChange={setMessage}
          placeholder="Start typing..."
        />

        <TotalAmountRow amount={`$${displayAmount.toFixed(2)}`} />

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton>Pay (${displayAmount.toFixed(2)})</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
