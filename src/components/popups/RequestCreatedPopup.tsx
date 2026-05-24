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
      maxWidth="max-w-[693px]"
      paddingClassName="p-[60px]"
    >
      <div className="flex flex-col items-center gap-8">
        <SuccessBadge />

        <h2 className="text-center font-heading text-4xl font-semibold text-white">
          Request #{requestId} created
        </h2>

        <p className="text-center font-body text-lg text-white">
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
