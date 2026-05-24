"use client";

import { PopupOverlay } from "./PopupOverlay";
import { ActionButtonsRow, CancelButton, PrimaryButton } from "./PopupShared";

interface ContactAdminPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onContact?: () => void;
}

export function ContactAdminPopup({
  isOpen,
  onClose,
  onContact,
}: ContactAdminPopupProps) {
  return (
    <PopupOverlay
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[693px]"
      paddingClassName="p-[60px]"
    >
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center font-heading text-4xl font-semibold text-white">
          Contact Admin
        </h2>

        <p className="text-center font-body text-lg text-white">
          Contact the managers on discord: .lonelystar and OGEdge
        </p>

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton onClick={onContact}>Contact Us</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
