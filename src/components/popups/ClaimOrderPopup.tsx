"use client";

import { PopupOverlay } from "./PopupOverlay";
import { ActionButtonsRow, CancelButton, PrimaryButton } from "./PopupShared";

interface ClaimOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim?: () => void;
}

export function ClaimOrderPopup({ isOpen, onClose, onClaim }: ClaimOrderPopupProps) {
  return (
    <PopupOverlay
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[693px]"
      paddingClassName="p-[60px]"
    >
      <div className="flex flex-col items-center gap-8">
        <h2 className="max-w-[489px] text-center font-heading text-4xl font-medium text-white">
          Are you sure you want to claim this order?
        </h2>

        <p className="text-center font-body text-lg text-white">
          <span className="text-[#ff975d]">Before claiming:</span> Please ensure
          you can start immediately, have reviewed all extra options, and are able
          to finish within the completion time.
        </p>

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton onClick={onClaim}>Claim Order</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
