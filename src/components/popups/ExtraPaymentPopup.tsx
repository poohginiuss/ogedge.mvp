"use client";

import { PopupOverlay } from "./PopupOverlay";
import { ActionButtonsRow, OutlineButton } from "./PopupShared";

interface ExtraPaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOnPayment?: () => void;
  onSendTip?: () => void;
}

export function ExtraPaymentPopup({
  isOpen,
  onClose,
  onAddOnPayment,
  onSendTip,
}: ExtraPaymentPopupProps) {
  return (
    <PopupOverlay
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[693px]"
      paddingClassName="p-[60px]"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center font-heading text-4xl font-semibold text-white">
            Extra Payment
          </h2>
          <p className="text-center font-body text-lg text-white">
            Send additional payment on the order (e.g., wrong LP/LP Gain, extra
            wins/divisions, extra options) or send tip/gift for your booster.
          </p>
        </div>

        <ActionButtonsRow>
          <OutlineButton onClick={onAddOnPayment}>Add-on Payment</OutlineButton>
          <OutlineButton onClick={onSendTip}>Send Tip for Booster</OutlineButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
