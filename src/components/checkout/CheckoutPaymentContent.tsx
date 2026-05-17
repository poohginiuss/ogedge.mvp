"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckoutHero } from "./CheckoutHero";
import { type CartItem, SAMPLE_CART_ITEMS } from "./checkoutData";

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

const PAYMENT_METHODS = [
  {
    id: "stripe",
    name: "Stripe",
    icon: "/images/icons/checkout/pay-stripe.svg",
    recommended: true,
    badges: ["/images/icons/checkout/pay-visa.svg", "/images/icons/checkout/pay-mastercard.svg"],
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "/images/icons/checkout/pay-paypal-icon.svg",
    recommended: false,
    badges: ["/images/icons/checkout/pay-paypal-card.svg"],
  },
  {
    id: "crypto",
    name: "Crypto",
    icon: "/images/icons/checkout/pay-paypal-icon.svg",
    recommended: false,
    badges: ["/images/icons/checkout/pay-skrill.svg"],
  },
] as const;

function PaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">Payment method</h2>
          <p className="mt-1 font-body text-base font-semibold text-white/50">
            Please select your preferred payment method
          </p>
        </div>

        {/* Currency selector */}
        <div className="flex w-full items-center gap-4 lg:w-auto">
          <button
            type="button"
            onClick={() => setCurrency("EUR")}
            className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl border px-4 lg:flex-initial"
            style={{
              borderColor: currency === "EUR" ? "#ff975d" : "#383852",
              background: "rgba(0,0,0,0.2)",
              boxShadow:
                currency === "EUR"
                  ? "0 4px 14px rgba(255,92,0,0.3)"
                  : "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <Image src="/images/icons/checkout/pay-euro.svg" alt="" width={16} height={16} />
            <span
              className="font-body text-base font-medium"
              style={{ color: currency === "EUR" ? "#ff5c00" : "white" }}
            >
              EUR
            </span>
            {currency === "EUR" && (
              <Image
                src="/images/icons/checkout/pay-dropdown-check.svg"
                alt=""
                width={12}
                height={12}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl border px-4 lg:flex-initial"
            style={{
              borderColor: currency === "USD" ? "#ff975d" : "#383852",
              background: "rgba(0,0,0,0.2)",
              boxShadow:
                currency === "USD"
                  ? "0 4px 14px rgba(255,92,0,0.3)"
                  : "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <Image src="/images/icons/checkout/pay-usd.svg" alt="" width={9} height={16} />
            <span
              className="font-body text-base font-medium"
              style={{ color: currency === "USD" ? "#ff5c00" : "white" }}
            >
              USD
            </span>
            {currency === "USD" && (
              <Image
                src="/images/icons/checkout/pay-dropdown-check.svg"
                alt=""
                width={12}
                height={12}
              />
            )}
          </button>
        </div>
      </div>

      {/* Payment methods */}
      <div className="flex flex-col gap-2.5">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className="flex flex-col gap-3 rounded-2xl border p-6 transition-all lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:p-8"
              style={{
                borderColor: isSelected ? "#ff975d" : "#383852",
                boxShadow: isSelected ? "0 4px 14px rgba(255,92,0,0.3)" : undefined,
              }}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: isSelected ? "#ff5c00" : "#383852",
                      background: isSelected ? "#ff5c00" : "transparent",
                    }}
                  >
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-body text-lg font-medium text-white">{method.name}</span>
                </div>
                {/* Desktop: inline badges */}
                <div className="hidden items-center gap-6 lg:flex">
                  {method.recommended && (
                    <span className="rounded-lg bg-[#ff5c00] px-2 py-2 font-body text-xs font-medium text-white">
                      RECOMMENDED
                    </span>
                  )}
                  <div className="flex items-center gap-2.5">
                    {method.badges.map((badge) => (
                      <Image
                        key={badge}
                        src={badge}
                        alt=""
                        width={48}
                        height={30}
                        className="h-[30px] w-[48px] object-contain"
                      />
                    ))}
                  </div>
                </div>
                {/* Mobile: recommended stacked, non-recommended inline */}
                <div className="flex items-center gap-2 lg:hidden">
                  {method.recommended ? (
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="rounded-md bg-[#ff5c00] px-2 py-1 font-body text-[10px] font-medium text-white">
                        RECOMMENDED
                      </span>
                      <div className="flex items-center gap-1.5">
                        {method.badges.map((badge) => (
                          <Image
                            key={badge}
                            src={badge}
                            alt=""
                            width={40}
                            height={25}
                            className="h-[25px] w-[40px] object-contain"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {method.badges.map((badge) => (
                        <Image
                          key={badge}
                          src={badge}
                          alt=""
                          width={48}
                          height={30}
                          className="h-[30px] w-[48px] object-contain"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
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
        <p className="font-body text-base font-medium leading-5 text-white">
          I confirm that all the entered information is accurate and I agree to your{" "}
          <Link href="/terms" className="font-bold underline">
            Terms of use
          </Link>
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Button
          href="/checkout/details"
          variant="secondary"
          size="sm"
          className="w-full whitespace-nowrap px-8 py-6 lg:w-[230px]"
        >
          Back to Cart
        </Button>
        <Button
          href="/checkout/confirmation"
          variant="primary"
          size="sm"
          className="w-full whitespace-nowrap px-8 py-6 lg:w-[230px]"
        >
          Pay Now
        </Button>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[rgba(26,173,25,0.2)]">
          <Image src="/images/icons/checkout/pay-secure-green.svg" alt="" width={20} height={23} />
        </div>
        <p className="font-body text-sm font-normal leading-5 text-white/80">
          Securely processed by our payment partners. Your financial data is never stored on our
          servers—you&apos;ll be redirected to a 100% secure checkout page to finalize your
          purchase.
        </p>
      </div>
    </div>
  );
}

export function CheckoutPaymentContent() {
  const [applyCredit, setApplyCredit] = useState(true);

  const cartItems: CartItem[] = SAMPLE_CART_ITEMS;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const creditAmount = 8.29;
  const total = subtotal - (applyCredit ? creditAmount : 0);

  return (
    <div className="min-h-screen bg-dark-bg">
      <CheckoutHero activeStep={3} />

      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 lg:px-0 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Panel: plain on mobile, card on desktop */}
          <div className="flex-1">
            <div
              className="hidden rounded-3xl border border-[#383852] p-6 lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(162deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)",
              }}
            >
              <PaymentForm />
            </div>
            <div className="lg:hidden">
              <PaymentForm />
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

              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CompactCartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="h-px w-full bg-[#383852]" />

              <div className="flex items-center justify-center gap-2">
                <span className="font-body text-base font-normal text-white">
                  No specific booster selected
                </span>
                <Image src="/images/icons/checkout/info.svg" alt="" width={16} height={16} />
              </div>

              <div className="h-px w-full bg-[#383852]" />

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

              <div className="h-px w-full bg-[#383852]" />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
                  <span className="font-body text-sm font-normal text-white/80">Discount</span>
                  <span className="font-body text-base font-semibold text-[#ff975d]">-15%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1">
                  <span className="font-body text-sm font-normal text-white/80">Promo Code</span>
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
