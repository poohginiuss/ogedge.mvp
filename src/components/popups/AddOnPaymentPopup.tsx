"use client";

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

interface AddOnPaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNTS = [5, 10, 15, 20, 25, 50];

export function AddOnPaymentPopup({ isOpen, onClose }: AddOnPaymentPopupProps) {
  const [selectedAmount, setSelectedAmount] = useState(15);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "crypto">(
    "card",
  );
  const [note, setNote] = useState("");

  const displayAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 lg:gap-5">
          <h2 className="font-heading text-xl font-medium leading-7 text-white lg:text-[28px]">
            Add-on Payment
          </h2>
          <p className="font-body text-sm font-normal leading-5 text-white lg:text-base">
            Choose or enter the amount you want to pay
          </p>
        </div>

        <InfoBox>
          Contact support before paying. We must confirm the price for your
          requested extra wins or options to ensure your order is updated correctly.
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
          label="What is this payment for:"
          value={note}
          onChange={setNote}
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
