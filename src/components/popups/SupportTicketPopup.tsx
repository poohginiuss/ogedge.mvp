"use client";

import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  AttachmentButtons,
  CancelButton,
  FormField,
  FormInput,
  FormSelect,
  PrimaryButton,
} from "./PopupShared";

interface SupportTicketPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function SupportTicketPopup({
  isOpen,
  onClose,
  onSubmit,
}: SupportTicketPopupProps) {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [description, setDescription] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl font-semibold text-white">
            Create Support Ticket
          </h2>
          <p className="font-body text-sm font-normal leading-5 text-white">
            Please describe your issue below, we will assist you shortly
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <FormField label="Title*">
            <FormInput
              value={title}
              onChange={setTitle}
              placeholder="Start typing..."
            />
          </FormField>

          <FormField label="Order*">
            <FormSelect
              value={order}
              onChange={setOrder}
              placeholder="Select Order"
              options={[
                { value: "123456", label: "Order #123456" },
                { value: "123457", label: "Order #123457" },
              ]}
            />
          </FormField>

          <FormField label="Describe issue*">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your issue in detail, so we can assist you as soon as possible."
              className="h-[80px] w-full resize-none rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-3 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
            />
            <AttachmentButtons />
          </FormField>
        </div>

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton onClick={onSubmit}>Create Ticket</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
