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
      maxWidth="max-w-[420px] lg:max-w-[670px]"
      paddingClassName="px-5 py-10 lg:px-12 lg:py-[60px]"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <h2 className="text-center font-heading text-2xl font-semibold text-white lg:text-[32px] lg:leading-[40px]">
          Contact Admin
        </h2>

        <p className="text-center font-body text-sm text-white lg:text-lg">
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
