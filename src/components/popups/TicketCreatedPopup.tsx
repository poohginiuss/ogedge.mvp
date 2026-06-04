"use client";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  CancelButton,
  PrimaryButton,
  ResponseTimeRow,
  SuccessBadge,
} from "./PopupShared";

interface TicketCreatedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId?: string;
  onSeeTicket?: () => void;
}

export function TicketCreatedPopup({
  isOpen,
  onClose,
  ticketId = "12345",
  onSeeTicket,
}: TicketCreatedPopupProps) {
  return (
    <PopupOverlay
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[420px] lg:max-w-[632px]"
      paddingClassName="px-5 py-10 lg:px-12 lg:py-[60px]"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <SuccessBadge />

        <h2 className="text-center font-heading text-2xl font-semibold text-white lg:text-[32px] lg:leading-[40px]">
          Ticket #{ticketId} created
        </h2>

        <p className="text-center font-body text-sm text-white lg:text-lg">
          Your request has been received. A support agent will be with you
          shortly. Check your email or dashboard for updates.
        </p>

        <ResponseTimeRow label="Average response time" value="2 hours" />

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Close</CancelButton>
          <PrimaryButton onClick={onSeeTicket}>See Ticket</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
