"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SummaryRow = { label: string; value: string };
type PriceRow = { label: string; value: string; color?: "orange" | "green" | "white" };
type AddonTag = { label: string };

export type FastCheckoutProps = {
  isOpen: boolean;
  onClose: () => void;
  gameName?: string;
  estimatedTime?: string;
  startIn?: string;
  summaryRows?: SummaryRow[];
  addons?: AddonTag[];
  priceRows?: PriceRow[];
  totalAmount?: string;
};

const PAYMENT_METHODS = [
  {
    id: "gpay",
    label: "G Pay",
    logoSrc: "/images/icons/checkout/fast-gpay.svg",
    logoW: 53,
    logoH: 21,
    tag: "FASTEST",
    badges: [],
    featured: true,
  },
  {
    id: "card",
    label: "Card",
    stripeSrc: "/images/icons/checkout/fast-stripe.svg",
    stripeW: 38,
    stripeH: 16,
    badges: ["/images/icons/checkout/fast-visa.svg", "/images/icons/checkout/fast-mc.svg"],
    featured: false,
  },
  {
    id: "paypal",
    label: "PayPal",
    stripeSrc: "/images/icons/checkout/fast-paypal-logo.png",
    stripeW: 44,
    stripeH: 16,
    badges: ["/images/icons/checkout/fast-paypal-badge.svg"],
    featured: false,
  },
  {
    id: "crypto",
    label: "Crypto",
    stripeSrc: "/images/icons/checkout/fast-coinbase.png",
    stripeW: 56,
    stripeH: 10,
    badges: ["/images/icons/checkout/fast-paypal-badge.svg"],
    featured: false,
  },
];

export function FastCheckoutPanel({
  isOpen,
  onClose,
  gameName = "Valorant",
  estimatedTime = "~1day, 12h",
  startIn = "2h",
  summaryRows = [
    { label: "Service", value: "Boost per Win" },
    { label: "Current Rank", value: "Bronze II" },
    { label: "Number of Wins", value: "3" },
    { label: "Server", value: "Europe" },
    { label: "Queue", value: "Lorem Ipsum" },
    { label: "Platform", value: "PlayStation" },
  ],
  addons = [{ label: "Offline Mode" }, { label: "Priority" }],
  priceRows = [
    { label: "Discount", value: "-15%", color: "orange" },
    { label: "Promo Code", value: "-5%", color: "orange" },
    { label: "Offline Mode", value: "FREE", color: "green" },
    { label: "Priority", value: "+20%", color: "white" },
  ],
  totalAmount = "€327.00",
}: FastCheckoutProps) {
  const [coupon, setCoupon] = useState("SALE5");
  const [couponApplied, setCouponApplied] = useState(true);
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        onKeyDown={() => {}}
      />

      {/* Panel: bottom sheet on mobile, side panel on desktop */}
      <div
        className={`fixed z-[10000] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0 lg:translate-x-0 lg:translate-y-0" : "translate-y-full lg:translate-x-full lg:translate-y-0"} bottom-0 left-0 right-0 h-[90dvh] rounded-t-2xl lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-full lg:max-w-[440px] lg:rounded-none lg:rounded-tl-2xl`}
        style={{
          backgroundImage:
            "linear-gradient(125deg, rgb(56,56,82) 0%, rgb(43,45,77) 50%, rgb(13,15,21) 100%)",
        }}
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 pt-8">
          {/* Header: Order Summary + Valorant */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(26,173,25,0.2)]">
                <Image src="/images/icons/checkout/fast-secure.svg" alt="" width={20} height={23} />
              </div>
              <div>
                <p className="font-body text-sm font-normal text-white/80">Order Summary</p>
                <p className="font-heading text-2xl font-semibold text-white">{gameName}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="font-body text-lg font-bold text-[#ff975d] [text-shadow:0_0_10px_#fa4609]">
                  {estimatedTime}
                </span>
                <Image src="/images/icons/checkout/fast-info.svg" alt="" width={16} height={16} />
              </div>
              <p className="font-body text-sm text-white/80">
                <span className="font-extrabold text-white">{startIn}</span> until start time
              </p>
            </div>
          </div>

          {/* Summary rows */}
          <div className="mt-4 flex flex-col gap-2">
            {summaryRows.map((row, i) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg px-2 py-1"
                style={{
                  background: i % 2 === 1 ? "rgba(0,0,0,0.2)" : "transparent",
                }}
              >
                <span className="font-body text-sm font-normal text-white/80">{row.label}</span>
                <span className="font-body text-base font-semibold text-white">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Addons */}
          {addons.length > 0 && (
            <div className="mt-2 flex items-center gap-4 rounded-lg px-2 py-1">
              {addons.map((addon) => (
                <div key={addon.label} className="flex items-center gap-2">
                  <Image
                    src="/images/icons/checkout/fast-addon.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <span className="font-body text-base font-normal text-white/90">
                    {addon.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="my-4 h-px w-full bg-[#383852]" />

          {/* Coupon */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.2)] px-6 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full bg-transparent font-body text-xl font-medium text-white/50 outline-none placeholder:text-white/30"
                  placeholder="Promo code"
                />
              </div>
              <div className="flex h-full items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCouponApplied(!couponApplied)}
                  className="flex h-full items-center justify-center rounded-2xl border border-[#383852] px-8 py-3 font-body text-sm font-semibold tracking-wide text-white opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-47deg, #17191f 0%, #383852 100%)",
                  }}
                >
                  APPLIED
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-2xl bg-[rgba(250,70,9,0.2)] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                >
                  <Image
                    src="/images/icons/checkout/fast-delete.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            {couponApplied && (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-[#34a853] bg-[rgba(52,168,83,0.2)] p-2">
                <Image
                  src="/images/icons/checkout/fast-discount-check.svg"
                  alt=""
                  width={12}
                  height={12}
                />
                <span className="font-body text-sm font-bold text-[#34a853]">
                  5% discount successfully applied!
                </span>
              </div>
            )}
          </div>

          <div className="my-4 h-px w-full bg-[#383852]" />

          {/* Payment Currency */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/icons/checkout/fast-currency.svg" alt="" width={24} height={24} />
              <span className="font-body text-base font-semibold text-white">Payment Currency</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrency("EUR")}
                className="flex h-[50px] items-center gap-2 rounded-2xl border px-4"
                style={{
                  borderColor: currency === "EUR" ? "#ff975d" : "#383852",
                  background: "rgba(0,0,0,0.2)",
                  boxShadow:
                    currency === "EUR"
                      ? "0 4px 14px rgba(255,92,0,0.3)"
                      : "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                <Image src="/images/icons/checkout/fast-euro.svg" alt="" width={16} height={16} />
                <span
                  className="font-body text-base font-medium"
                  style={{
                    color: currency === "EUR" ? "#ff5c00" : "white",
                  }}
                >
                  EUR
                </span>
                {currency === "EUR" && (
                  <Image
                    src="/images/icons/checkout/fast-check-mark.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className="flex h-[50px] items-center gap-2 rounded-2xl border px-4"
                style={{
                  borderColor: currency === "USD" ? "#ff975d" : "#383852",
                  background: "rgba(0,0,0,0.2)",
                  boxShadow:
                    currency === "USD"
                      ? "0 4px 14px rgba(255,92,0,0.3)"
                      : "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                <Image src="/images/icons/checkout/fast-usd.svg" alt="" width={9} height={16} />
                <span
                  className="font-body text-base font-medium"
                  style={{
                    color: currency === "USD" ? "#ff5c00" : "white",
                  }}
                >
                  USD
                </span>
                {currency === "USD" && (
                  <Image
                    src="/images/icons/checkout/fast-check-mark.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/icons/checkout/fast-payment.svg" alt="" width={24} height={24} />
              <span className="font-body text-base font-semibold text-white">Payment Method</span>
            </div>

            {/* GPay featured */}
            <button
              type="button"
              onClick={() => setSelectedMethod("gpay")}
              className="flex items-center justify-between rounded-2xl border bg-[rgba(0,0,0,0.6)] px-6 py-4"
              style={{
                borderColor: selectedMethod === "gpay" ? "#ff975d" : "#383852",
              }}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={
                    selectedMethod === "gpay"
                      ? "/images/icons/checkout/fast-radio-selected.svg"
                      : "/images/icons/checkout/fast-radio.svg"
                  }
                  alt=""
                  width={24}
                  height={24}
                />
                <Image
                  src="/images/icons/checkout/fast-gpay.svg"
                  alt="Google Pay"
                  width={53}
                  height={21}
                />
              </div>
              <span className="rounded-lg bg-[#ff5c00] px-2 py-1.5 font-body text-xs font-bold uppercase text-white">
                FASTEST
              </span>
            </button>

            {/* Divider: OR CONTINUE WITH */}
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-[#383852]" />
              <span className="font-body text-xs font-medium uppercase text-white/50">
                or continue with
              </span>
              <div className="h-px flex-1 bg-[#383852]" />
            </div>

            {/* Other methods */}
            <div className="flex flex-col gap-2">
              {PAYMENT_METHODS.filter((m) => !m.featured).map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className="flex items-center justify-between rounded-2xl border bg-[rgba(0,0,0,0.2)] p-6"
                    style={{
                      borderColor: isSelected ? "#ff975d" : "#383852",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          isSelected
                            ? "/images/icons/checkout/fast-radio-selected.svg"
                            : "/images/icons/checkout/fast-radio.svg"
                        }
                        alt=""
                        width={24}
                        height={24}
                      />
                      <span className="font-body text-base font-medium text-white">
                        {method.label}
                      </span>
                      {method.stripeSrc && (
                        <Image
                          src={method.stripeSrc}
                          alt=""
                          width={method.stripeW ?? 38}
                          height={method.stripeH ?? 16}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {method.badges.slice(0, 8).map((b, idx) => (
                        <Image
                          key={`${method.id}-badge-${idx}`}
                          src={b}
                          alt=""
                          width={22}
                          height={14}
                          className="h-3.5 w-[22px] object-contain"
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-4 flex flex-col gap-6">
            <button
              type="button"
              onClick={() => setPriceOpen(!priceOpen)}
              className="flex items-center justify-between"
            >
              <span className="font-body text-base font-semibold text-white">Price Breakdown</span>
              <Image
                src="/images/icons/checkout/fast-arrow.svg"
                alt=""
                width={20}
                height={20}
                className={`transition-transform ${priceOpen ? "" : "rotate-180"}`}
              />
            </button>

            {priceOpen && (
              <div className="flex flex-col gap-2">
                {priceRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg bg-[rgba(0,0,0,0.2)] px-2 py-1"
                  >
                    <span className="font-body text-sm font-normal text-white/80">{row.label}</span>
                    <span
                      className="font-body text-base font-semibold"
                      style={{
                        color:
                          row.color === "orange"
                            ? "#ff975d"
                            : row.color === "green"
                              ? "#34a853"
                              : "white",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between rounded-2xl bg-[rgba(0,0,0,0.2)] p-6">
              <span className="font-body text-sm font-normal text-white/80">Total Amount</span>
              <span className="font-body text-[23px] font-semibold text-[#ff975d]">
                {totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Fixed bottom section */}
        <div className="border-t border-[#383852] bg-[#151724] px-6 py-6">
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fast-checkout-email"
                className="font-body text-sm font-normal text-white"
              >
                Email Address*
              </label>
              <input
                id="fast-checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="h-14 w-full rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-4 font-body text-base font-normal text-white outline-none placeholder:text-white/50 focus:border-[#ff5c00]/50"
              />
            </div>

            {/* Terms */}
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
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
              <p className="font-body text-xs font-normal leading-[18px] text-white">
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

            {/* Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="flex flex-1 items-center justify-center rounded-3xl bg-[#232330] px-6 py-4 font-body text-sm font-bold uppercase tracking-wider text-white backdrop-blur-[3px]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center rounded-3xl border-2 border-[#ff975d] px-6 py-3 shadow-[0_4px_12px_rgba(255,92,0,0.3)]"
                style={{
                  backgroundImage: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Image src="/images/icons/checkout/fast-lock.svg" alt="" width={14} height={16} />
                  <span className="font-body text-sm font-bold uppercase tracking-wider text-white">
                    Pay Now
                  </span>
                </div>
                <span className="font-body text-xs font-normal text-white">({totalAmount})</span>
              </button>
            </div>

            {/* Footer text */}
            <p className="text-center font-body text-sm font-normal text-white/80">
              {"By placing an order at "}
              <span className="font-bold">ogedge.com</span>
              {" you're agreeing to our "}
              <Link href="/terms" className="font-bold underline">
                Terms of Use
              </Link>
              {" and "}
              <Link href="/privacy" className="font-bold underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
