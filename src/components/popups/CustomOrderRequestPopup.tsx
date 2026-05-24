"use client";

import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  AttachmentButtons,
  CancelButton,
  FormField,
  FormInput,
  PrimaryButton,
} from "./PopupShared";

interface CustomOrderRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function CustomOrderRequestPopup({
  isOpen,
  onClose,
  onSubmit,
}: CustomOrderRequestPopupProps) {
  const [email, setEmail] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [request, setRequest] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl font-semibold text-white">
            Custom Order Request
          </h2>
          <p className="font-body text-sm font-normal leading-5 text-white">
            Please describe your request with as many details as possible
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <FormField label="Email*">
            <FormInput
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Start typing..."
            />
          </FormField>

          <FormField label="Game Title*">
            <FormInput
              value={gameTitle}
              onChange={setGameTitle}
              placeholder="Start typing..."
            />
          </FormField>

          <FormField label="Request*">
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Start typing your request..."
              className="h-[80px] w-full resize-none rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-3 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
            />
            <AttachmentButtons />
          </FormField>
        </div>

        <ActionButtonsRow>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <PrimaryButton onClick={onSubmit}>Create Request</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
