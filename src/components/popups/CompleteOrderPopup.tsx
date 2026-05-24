"use client";

import { PopupOverlay } from "./PopupOverlay";
import { ActionButtonsRow, CancelButton, PrimaryButton } from "./PopupShared";

interface CompleteOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function CompleteOrderPopup({
  isOpen,
  onClose,
  onComplete,
}: CompleteOrderPopupProps) {
  return (
    <PopupOverlay
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[693px]"
      paddingClassName="p-[60px]"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center font-heading text-4xl font-medium text-white">
            Complete order
          </h2>
          <p className="text-center font-body text-lg text-white">
            Please make sure that you have checked all mandatory
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#ff975d]" />
            <span className="font-body text-base text-white">
              Ensure all{" "}
              <span className="text-[#ff975d]">goals and extra options</span> are
              fully completed
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#ff975d]" />
            <span className="font-body text-base text-white">
              Upload{" "}
              <span className="text-[#ff975d]">final screenshots</span> and notify
              the customer in chat
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#ff975d]" />
            <span className="font-body text-base text-white">
              Say goodbye and invite the customer to leave a{" "}
              <span className="text-[#ff975d]">review</span>.
            </span>
          </li>
        </ul>

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton onClick={onComplete}>Complete Order</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
