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
      paddingClassName="p-5 lg:p-8"
    >
      <div className="flex flex-col items-center gap-1 lg:gap-5">
        <h2 className="text-center font-heading text-2xl font-semibold text-white lg:text-[28px]">
          Contact Admin
        </h2>

        <p className="text-center font-body text-sm text-white lg:text-base">
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
