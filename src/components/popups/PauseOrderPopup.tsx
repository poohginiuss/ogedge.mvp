"use client";

import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  AmountOption,
  CancelButton,
  CustomAmountInput,
  InfoBox,
  PopupTextarea,
  PrimaryButton,
} from "./PopupShared";

interface PauseOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DURATIONS = ["1h", "2h", "3h", "6h", "8h", "12h"];

export function PauseOrderPopup({ isOpen, onClose }: PauseOrderPopupProps) {
  const [selectedDuration, setSelectedDuration] = useState("3h");
  const [isCustom, setIsCustom] = useState(false);
  const [customHours, setCustomHours] = useState("");
  const [reason, setReason] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold text-white">
            Pause Order
          </h2>
          <p className="font-body text-lg text-white">
            Choose or enter the amount of time you want to take off
          </p>
        </div>

        <InfoBox>
          It is recommended you do not take more than 12 hours of break.
        </InfoBox>

        <div className="grid grid-cols-3 gap-2">
          {DURATIONS.map((duration) => (
            <AmountOption
              key={duration}
              label={duration}
              selected={!isCustom && selectedDuration === duration}
              onClick={() => {
                setSelectedDuration(duration);
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
            type="text"
            value={customHours}
            onChange={(value) => {
              setCustomHours(value);
              setIsCustom(true);
            }}
            onFocus={() => setIsCustom(true)}
            placeholder="0 h"
          />
        </div>

        <PopupTextarea
          label="Reason for your break"
          optional
          value={reason}
          onChange={setReason}
          placeholder="Start typing..."
        />

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton>Pause Order</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
