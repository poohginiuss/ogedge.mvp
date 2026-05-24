"use client";

import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import {
  ActionButtonsRow,
  CancelButton,
  PrimaryButton,
  StarRating,
} from "./PopupShared";

interface OrderCompletedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  onSkipConfirm?: () => void;
  onReviewConfirm?: () => void;
}

export function OrderCompletedPopup({
  isOpen,
  onClose,
  orderId = "2313232",
  onSkipConfirm,
  onReviewConfirm,
}: OrderCompletedPopupProps) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <p className="font-body text-sm font-bold uppercase tracking-wider text-[#ff975d]">
          Review Us!
        </p>

        <h2 className="text-center font-heading text-4xl font-semibold text-white">
          Order #{orderId} Completed
        </h2>

        <div className="flex flex-col items-center gap-2">
          <p className="text-center font-body text-base text-white/90">
            Your feedback helps us improve and rewards your booster. It only takes a
            second!
          </p>
          <p className="text-center font-body text-base text-white/90">
            For any issues, please contact us as soon as possible!
          </p>
        </div>

        <StarRating rating={rating} onRate={setRating} filledColor="#ff975d" />

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="How was your experience? Tell us what did you enjoy."
          className="h-[120px] w-full resize-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-4 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
        />

        <ActionButtonsRow>
          <CancelButton onClick={onSkipConfirm ?? onClose}>
            Skip & Confirm
          </CancelButton>
          <PrimaryButton onClick={onReviewConfirm}>Review & Confirm</PrimaryButton>
        </ActionButtonsRow>
      </div>
    </PopupOverlay>
  );
}
