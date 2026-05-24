"use client";

import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";
import { StarRating } from "./PopupShared";

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  boosterName?: string;
  onSubmit?: (rating: number, review: string) => void;
}

export function ReviewPopup({
  isOpen,
  onClose,
  boosterName = "Booster",
  onSubmit,
}: ReviewPopupProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center font-heading text-4xl font-semibold text-white">
            How was your experience with {boosterName}?
          </h2>
          <p className="text-center font-body text-lg text-white">
            Your feedback helps us improve and rewards your booster. It only takes
            a second!
          </p>
          <StarRating
            rating={rating}
            onRate={setRating}
            filledColor="#DFB300"
            emptyColor="#383852"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={`How did booster ${boosterName} do?`}
            className="h-[168px] w-full resize-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-[18px] font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
          />
          <p className="text-right font-body text-sm text-white/50">
            Review will be anonymous
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSubmit?.(rating, review)}
          disabled={rating === 0}
          className="cursor-pointer rounded-3xl border border-[#ff975d] px-8 py-6 font-body text-base font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Review
        </button>
      </div>
    </PopupOverlay>
  );
}
