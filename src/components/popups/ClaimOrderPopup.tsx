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
      maxWidth="max-w-[420px] lg:max-w-[670px]"
      paddingClassName="px-5 py-10 lg:px-12 lg:py-[60px]"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <h2 className="max-w-[489px] text-center font-heading text-2xl font-medium text-white lg:text-[32px] lg:leading-[40px]">
          Are you sure you want to claim this order?
        </h2>

        <p className="text-center font-body text-sm text-white lg:text-lg">
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
