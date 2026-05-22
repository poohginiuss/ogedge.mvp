"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BoosterSearchInput } from "./BoosterSearchInput";
import { CheckoutHero } from "./CheckoutHero";
import { type Booster, type CartItem, SAMPLE_CART_ITEMS } from "./checkoutData";

function CompactCartItem({ item }: { item: CartItem }) {
  return (
    <div className="w-full rounded-2xl bg-[rgba(0,0,0,0.2)] p-4">
      <div className="flex gap-4">
        <div className="relative h-[46px] w-[80px] shrink-0 overflow-hidden rounded-lg">
          <Image src={item.gameImage} alt={item.game} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/home/games/valorant-logo.png"
              alt={item.game}
              width={40}
              height={27}
              className="h-auto w-10 object-contain"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-body text-sm font-medium text-white">{item.game}</span>
              <Image src="/images/icons/checkout/windows.svg" alt="" width={16} height={16} />
            </div>
            <span className="font-body text-base font-medium text-[#ff975d]">
              €{item.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white">
            <span className="font-body font-medium">{item.service}</span>
            {item.serviceRange && (
              <>
                <span className="text-[6px]">●</span>
                <span className="font-body font-normal">{item.serviceRange}</span>
              </>
            )}
          </div>
          {item.addons.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {item.addons.map((addon) => (
                <span
                  key={addon.label}
                  className="flex items-center gap-1 font-body text-[10px] font-normal text-white/90"
                >
                  <Image src="/images/icons/checkout/addon-dot.svg" alt="" width={8} height={8} />
                  {addon.label}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1 font-body text-[10px] font-normal text-white/60">
            <Image src="/images/icons/checkout/clock.svg" alt="" width={12} height={12} />
            <span>Estimated Completion Time:</span>
            <span>{item.estimatedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsForm({
  selectedBooster,
  onBoosterChange,
}: { selectedBooster: Booster | null; onBoosterChange: (b: Booster | null) => void }) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [comments, setComments] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h2 className="font-heading text-2xl font-bold leading-8 text-white">Your Details</h2>
        <p className="mt-1 font-body text-base font-medium leading-6 text-white/50">
          Please fill in your order details
        </p>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-6">
        {/* Row 1: Email + Confirm Email — stacked on mobile */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label className="font-body text-base font-medium leading-6 text-white">
              Email Address*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-[18px] py-4 font-body text-base font-normal leading-6 text-white placeholder:text-white/80 focus:border-[#ff5c00]/50 focus:outline-none"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="font-body text-base font-medium leading-6 text-white">
              Confirm Email Address*
            </label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="email@example.com"
              className="rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-[18px] py-4 font-body text-base font-normal leading-6 text-white placeholder:text-white/80 focus:border-[#ff5c00]/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 2: Nickname + Booster — stacked on mobile */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label className="font-body text-base font-medium leading-6 text-white">
              Nickname*
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your in-game name"
              className="rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-[18px] font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:border-[#ff5c00]/50 focus:outline-none"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="flex-1 font-body text-base font-medium leading-6 text-white">
                Booster
              </label>
              <div className="group/info relative cursor-pointer">
                <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} className="transition-transform duration-200 group-hover/info:scale-110" />
                <div className="pointer-events-none absolute right-0 top-full z-50 mt-1 w-[220px] rounded-2xl border border-dark-border p-4 opacity-0 transition-opacity duration-200 group-hover/info:pointer-events-auto group-hover/info:opacity-100" style={{ background: "linear-gradient(-43deg, #17191f, #383852)" }}>
                  <p className="font-body text-sm leading-5 text-white/90">You can optionally choose a specific booster, or one will be automatically assigned.</p>
                </div>
              </div>
            </div>
            <BoosterSearchInput
              selectedBooster={selectedBooster}
              onBoosterChange={onBoosterChange}
              inputClassName="h-14 w-full rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-4 pr-10 font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:border-[#ff5c00]/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Comments */}
        <div className="flex flex-col gap-2">
          <label className="font-body text-base font-medium leading-6 text-white">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Start typing. your message.."
            rows={5}
            className="resize-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-[18px] font-body text-sm font-normal leading-5 text-white/80 placeholder:text-white/80 focus:border-[#ff5c00]/50 focus:outline-none"
          />
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setAgreeTerms(!agreeTerms)}
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#d4d4d4] bg-[#f7f7f7] transition-colors"
            style={
              agreeTerms
                ? {
                    background: "linear-gradient(135deg, #ff975d 2%, #a32d05 102%)",
                    borderColor: "#fa4609",
                  }
                : undefined
            }
          >
            {agreeTerms && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <p className="font-body text-base font-medium leading-6 text-white">
            By clicking the button below, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and acknowledge our{" "}
            <Link href="/privacy" className="underline">
              Global Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Action buttons — side-by-side on desktop, full-width stacked on mobile */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Button
          href="/checkout"
          variant="secondary"
          size="sm"
          className="w-full whitespace-nowrap px-8 py-6 lg:w-[230px]"
        >
          Back to Cart
        </Button>
        <Button
          href="/checkout/payment"
          variant="primary"
          size="sm"
          className="w-full whitespace-nowrap px-8 py-6 lg:w-[230px]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export function CheckoutDetailsContent() {
  const [selectedBooster, setSelectedBooster] = useState<Booster | null>(null);
  const [applyCredit, setApplyCredit] = useState(true);

  const cartItems: CartItem[] = SAMPLE_CART_ITEMS;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const creditAmount = 8.29;
  const total = subtotal - (applyCredit ? creditAmount : 0);

  return (
    <div className="min-h-screen bg-dark-bg">
      <CheckoutHero activeStep={2} />

      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 lg:px-0 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Panel: plain on mobile, card on desktop */}
          <div className="flex-1">
            {/* Desktop card wrapper */}
            <div
              className="hidden rounded-3xl border border-[#383852] p-6 lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(168deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)",
              }}
            >
              <DetailsForm selectedBooster={selectedBooster} onBoosterChange={setSelectedBooster} />
            </div>
            {/* Mobile: no card */}
            <div className="lg:hidden">
              <DetailsForm selectedBooster={selectedBooster} onBoosterChange={setSelectedBooster} />
            </div>
          </div>

          {/* Right Panel: Order Summary */}
          <div
            className="w-full rounded-3xl border border-[#383852] p-6 lg:w-[490px]"
            style={{
              backgroundImage:
                "linear-gradient(151deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)",
            }}
          >
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl font-semibold text-white">Your Cart</h3>
                <Link
                  href="/checkout"
                  className="flex items-center gap-2 font-body text-base font-normal uppercase tracking-wider text-white/80 transition-colors hover:text-white"
                >
                  <Image
                    src="/images/icons/checkout/arrow-back.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  Edit
                </Link>
              </div>

              {/* Cart items (compact) */}
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CompactCartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#383852]" />

              {/* Booster status */}
              {selectedBooster ? (
                <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-base font-normal text-white">
                      Booster selected
                    </span>
                    <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} />
                  </div>
                  <div className="flex h-[50px] items-center gap-2 rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.2)] px-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                    <span className="font-body text-base font-medium text-white">
                      {selectedBooster.name}
                    </span>
                    <Image src="/images/icons/checkout/star.svg" alt="" width={35} height={35} />
                    <span className="-ml-4 font-body text-base font-bold text-[#ff975d]">
                      {selectedBooster.rating}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="font-body text-base font-normal text-white">
                    No specific booster selected
                  </span>
                  <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} />
                </div>
              )}

              {/* Divider */}
              <div className="h-px w-full bg-[#383852]" />

              {/* Discount applied badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(26,173,25,0.4)] bg-[rgba(26,173,25,0.1)] px-6 py-2.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="9" fill="#1aad19" />
                    <path
                      d="M5.5 9L8 11.5L12.5 6.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-body text-sm font-medium text-[#1aad19]">
                    5% discount successfully applied!
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#383852]" />

              {/* Apply Credit */}
              <div className="flex items-center gap-2 px-4">
                <button
                  type="button"
                  onClick={() => setApplyCredit(!applyCredit)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#fa4609]"
                  style={{
                    background: applyCredit ? "#feece6" : "rgba(0,0,0,0.2)",
                  }}
                >
                  {applyCredit && (
                    <div
                      className="h-3 w-3 rounded-[3px]"
                      style={{
                        background: "linear-gradient(135deg, #ff975d 2%, #a32d05 102%)",
                      }}
                    />
                  )}
                </button>
                <div className="flex flex-1 items-center justify-between font-body text-sm font-normal text-white">
                  <span>Apply Credit</span>
                  <span>€{creditAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#383852]" />

              {/* Summary */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
                  <span className="font-body text-sm font-normal text-white/80">Discount</span>
                  <span className="font-body text-base font-semibold text-[#ff975d]">-15%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
                  <span className="font-body text-sm font-normal text-white/80">
                    Promo Code - SALE5
                  </span>
                  <span className="font-body text-base font-semibold text-[#ff975d]">-5%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
                  <span className="font-body text-sm font-normal text-white/80">Total Amount</span>
                  <span className="font-body text-xl font-semibold text-[#ff975d]">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
