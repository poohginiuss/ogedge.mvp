"use client";

import Image from "next/image";
import { useState } from "react";

import { PopupOverlay } from "./PopupOverlay";

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewPopup({ isOpen, onClose }: ReviewPopupProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose} paddingClassName="px-5 py-6 lg:p-6" maxWidth="max-w-[460px] lg:max-w-[560px]">
      <div className="flex flex-col items-center gap-5">
        {/* Character Illustration */}
        <div className="relative flex items-center justify-center">
          <Image
            src="/images/popups/review-glow.svg"
            alt=""
            width={200}
            height={200}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
          />
          <Image
            src="/images/popups/review-characters.png"
            alt="Review Characters"
            width={382}
            height={255}
            className="relative h-auto w-[200px] object-contain lg:w-[380px]"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-1.5 lg:gap-2">
          <h2 className="max-w-[282px] text-center font-body text-xl font-bold text-white lg:max-w-[380px] lg:font-heading lg:text-2xl lg:font-semibold">
            How was your experience with Booster?
          </h2>
          <p className="text-center font-body text-base text-white lg:text-base">
            Your feedback helps us improve and rewards your booster. It only
            takes a second!
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <Image
                src={
                  star <= rating
                    ? "/images/popups/star-orange.svg"
                    : "/images/popups/star-gray.svg"
                }
                alt={`${star} star`}
                width={39}
                height={37}
                className={`h-[28px] w-[30px] lg:h-[32px] lg:w-[34px] ${
                  star <= rating ? "drop-shadow-[0px_0px_8px_rgba(255,92,0,0.2)]" : ""
                }`}
              />
            </button>
          ))}
        </div>

        {/* Review Textarea */}
        <div className="flex w-full flex-col gap-1.5">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="How did booster Mockup do?"
            className="h-[112px] w-full resize-none rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-3.5 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
          />
          <p className="text-right font-body text-sm font-medium text-white/50">
            Review will be anonymous
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex w-full items-center lg:justify-center">
          <button
            type="button"
            disabled={rating === 0}
            className="w-full cursor-pointer rounded-xl border border-[#ff975d] px-6 py-3 font-body text-base font-bold uppercase tracking-wider text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto lg:rounded-2xl lg:py-3.5"
          >
            Submit Review
          </button>
        </div>
      </div>
    </PopupOverlay>
  );
}
