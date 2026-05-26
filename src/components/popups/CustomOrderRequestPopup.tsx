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
        <div className="flex flex-col gap-1 lg:gap-5">
          <h2 className="font-heading text-xl font-semibold text-white lg:text-[28px]">
            Custom Order Request
          </h2>
          <p className="font-body text-sm font-normal leading-5 text-white lg:text-base">
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
            <div className="flex flex-col rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] focus-within:border-[#ff975d]">
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Start typing your request..."
                className="h-[80px] w-full resize-none bg-transparent p-3 font-body text-sm text-white/80 outline-none placeholder:text-white/80"
              />
              <div className="flex gap-2 px-3 pb-2">
                <AttachmentButtons />
              </div>
            </div>
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
