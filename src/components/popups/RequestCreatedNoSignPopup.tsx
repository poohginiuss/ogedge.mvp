"use client";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  CancelButton,
  PrimaryButton,
  SuccessBadge,
} from "./PopupShared";

interface RequestCreatedNoSignPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  onSignIn?: () => void;
}

export function RequestCreatedNoSignPopup({
  isOpen,
  onClose,
  email = "[email]",
  onSignIn,
}: RequestCreatedNoSignPopupProps) {
  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose} paddingClassName="px-5 py-5 lg:p-8">
      <div className="flex flex-col items-center gap-5 lg:gap-6">
        <SuccessBadge />

        <div className="flex flex-col items-center gap-1">
          <h2 className="text-center font-heading text-2xl font-bold text-white lg:text-[24px] lg:leading-[32px]">
            Your request has been received!
          </h2>
          <p className="text-center font-body text-base text-white">
            We&apos;ll get back to you at {email} within 24 hours.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="text-center font-heading text-xl font-bold text-white lg:leading-[30px]">
            Want to track it in real time?
          </h3>
          <p className="max-w-[401px] text-center font-body text-base text-white">
            Create a free account or sign in — see live updates, reply to our
            team, and manage all your requests from your dashboard.
          </p>
        </div>

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>
            <span className="flex flex-col items-center gap-0.5">
              <span className="text-base font-bold uppercase tracking-[0.32px]">
                No thanks,
              </span>
              <span className="text-xs font-normal normal-case tracking-normal text-white">
                I&apos;ll wait for the email
              </span>
            </span>
          </CancelButton>
          <PrimaryButton onClick={onSignIn}>Sign in</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
