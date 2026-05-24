"use client";

import { PopupOverlay } from "./PopupOverlay";
import { OutlineButton } from "./PopupShared";

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
      paddingClassName="p-6"
      maxWidth="max-w-[460px] lg:max-w-[560px]"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center font-heading text-2xl font-semibold text-white">
            Extra Payment
          </h2>
          <p className="text-center font-body text-sm text-white">
            Send additional payment on the order (e.g., wrong LP/LP Gain, extra
            wins/divisions, extra options) or send tip/gift for your booster.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4">
          <OutlineButton onClick={onAddOnPayment}>Add-on Payment</OutlineButton>
          <OutlineButton onClick={onSendTip}>Send Tip for Booster</OutlineButton>
        </div>
      </div>
    </PopupOverlay>
  );
}
