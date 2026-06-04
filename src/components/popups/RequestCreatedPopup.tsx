"use client";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  CancelButton,
  PrimaryButton,
  ResponseTimeRow,
  SuccessBadge,
} from "./PopupShared";

interface RequestCreatedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  requestId?: string;
  onSeeOrder?: () => void;
}

export function RequestCreatedPopup({
  isOpen,
  onClose,
  requestId = "12345",
  onSeeOrder,
}: RequestCreatedPopupProps) {
  return (
    <PopupOverlay
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[420px] lg:max-w-[670px]"
      paddingClassName="px-5 py-10 lg:px-12 lg:py-[60px]"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <SuccessBadge />

        <h2 className="text-center font-heading text-2xl font-semibold text-white lg:text-[32px] lg:leading-[40px]">
          Request #{requestId} created
        </h2>

        <p className="text-center font-body text-sm text-white lg:text-lg">
          Your request has been received. A support agent will be with you
          shortly. Check your email or dashboard for updates.
        </p>

        <ResponseTimeRow label="Average response time" value="2 hours" />

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Close</CancelButton>
          <PrimaryButton onClick={onSeeOrder}>See Order</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
