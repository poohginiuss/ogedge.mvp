"use client";

import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  CancelButton,
  FormField,
  FormInput,
  PrimaryButton,
  WarningBox,
} from "./PopupShared";

interface AccountLoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip?: () => void;
  onSave?: () => void;
}

export function AccountLoginPopup({
  isOpen,
  onClose,
  onSkip,
  onSave,
}: AccountLoginPopupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-medium leading-8 text-white">
            Account Login Information
          </h2>
          <p className="font-body text-base font-normal leading-6 text-white">
            Please add your account login information, alternatively ask for the
            booster to login with a QR code and skip this step.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <FormField label="Username">
            <FormInput
              value={username}
              onChange={setUsername}
              placeholder="Start typing..."
            />
          </FormField>

          <FormField label="Password">
            <FormInput
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Start typing..."
            />
          </FormField>
        </div>

        <WarningBox>
          Please make sure to change your account password right BEFORE and right
          AFTER a boost. This helps increase your account security.
        </WarningBox>

        <ActionButtonsRow>
          <CancelButton onClick={onSkip ?? onClose}>Skip</CancelButton>
          <PrimaryButton onClick={onSave}>Save</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
