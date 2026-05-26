"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

import { PopupOverlay } from "./PopupOverlay";

interface OrderCompletedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export function OrderCompletedPopup({
  isOpen,
  onClose,
  orderId = "#2313232",
}: OrderCompletedPopupProps) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  return (
    <PopupOverlay isOpen={isOpen} onClose={onClose} paddingClassName="px-5 py-6 lg:p-10">
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
            alt="Order Completed Characters"
            width={573}
            height={302}
            className="relative h-auto w-[200px] object-contain lg:w-[380px]"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-1 lg:gap-5">
          <p className="font-body text-sm font-bold uppercase text-[#ff5c00] lg:text-base">
            Review us!
          </p>
          <h2 className="text-center font-heading text-2xl font-semibold text-white lg:text-[28px]">
            Order {orderId} Completed
          </h2>
          <p className="text-center font-body text-sm leading-5 text-white lg:text-base lg:leading-normal">
            Your feedback helps us improve and rewards your booster. It only
            takes a second!
            <span className="hidden lg:inline">
              <br />
              For any issues, please contact us as soon as possible!
            </span>
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
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="How was your experience? Tell us what did you enjoy."
          className="h-[112px] w-full resize-none rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-3.5 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
        />

        {/* Action Buttons */}
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4">
          <Button variant="secondary" size="xs" onClick={onClose} className="w-full lg:flex-1">
            <span className="lg:hidden">Skip</span>
            <span className="hidden lg:inline">Skip & Confirm</span>
          </Button>
          <Button variant="primary" size="xs" className="w-full lg:flex-1">
            <span className="lg:hidden">Confirm</span>
            <span className="hidden lg:inline">Review & Confirm</span>
          </Button>
        </div>
      </div>
    </PopupOverlay>
  );
}
