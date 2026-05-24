"use client";

import { ChevronDownIcon } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";

const ICON = "/images/custom-order";

const GAMES = [
  "Valorant",
  "League of Legends",
  "Apex Legends",
  "Call of Duty",
  "Destiny 2",
  "FIFA",
  "Other",
];

export function CustomOrderForm() {
  const [game, setGame] = useState("");
  const [gameOpen, setGameOpen] = useState(false);
  const [amount, setAmount] = useState(20);
  const [currency, setCurrency] = useState<"USD" | "EUR">("EUR");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "crypto"
  >("card");
  const [instructions, setInstructions] = useState("");

  const currencySymbol = currency === "USD" ? "$" : "€";

  return (
    <div
      className="flex flex-col gap-6 rounded-3xl border border-[#383852] p-6"
      style={{
        backgroundImage:
          "linear-gradient(145deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-body text-2xl font-medium text-white">
          Custom Order
        </span>
        <div className="rounded-2xl bg-[#232330] px-6 py-2">
          <span className="font-body text-2xl font-bold leading-8 text-[#ff975d]">
            {currencySymbol}
            {amount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Game Selector */}
      <div className="flex flex-col gap-2">
        <label className="font-body text-base font-medium leading-5 text-white">
          Game*
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setGameOpen(!gameOpen)}
            className="flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] py-2.5 pl-4 pr-2 text-left transition-colors hover:border-[#ff975d]/40"
          >
            <span className="font-body text-sm font-normal leading-5 text-white/80">
              {game || "Select Game"}
            </span>
            <Image
              src={`${ICON}/arrow-down.svg`}
              alt=""
              width={20}
              height={20}
              className={`transition-transform ${gameOpen ? "" : "rotate-180"}`}
            />
          </button>
          {gameOpen && (
            <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-2xl border border-[#383852] bg-[#1a1a2e] py-2 shadow-xl">
              {GAMES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGame(g);
                    setGameOpen(false);
                  }}
                  className="w-full cursor-pointer px-4 py-2.5 text-left font-body text-sm text-white transition-colors hover:bg-white/5"
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Amount to be paid */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Image
            src={`${ICON}/money-bag.svg`}
            alt=""
            width={24}
            height={24}
          />
          <span className="font-body text-base font-semibold text-white">
            Amount to be paid
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAmount((a) => Math.max(1, a - 1))}
            className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[#383852] shadow-[0px_4px_8px_rgba(0,0,0,0.15)] transition-colors hover:border-[#ff975d]/40"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-67deg, #17191f 0%, #383852 100%)",
            }}
          >
            <Image src={`${ICON}/minus.svg`} alt="Decrease" width={24} height={24} />
          </button>
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.2)] py-3 shadow-[0px_4px_16px_rgba(0,0,0,0.15)]">
            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(Math.max(1, Number.parseInt(e.target.value) || 1))
              }
              className="w-20 appearance-none bg-transparent text-center font-body text-xl font-bold leading-[30px] text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
          </div>
          <button
            type="button"
            onClick={() => setAmount((a) => a + 1)}
            className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[#383852] shadow-[0px_4px_8px_rgba(0,0,0,0.15)] transition-colors hover:border-[#ff975d]/40"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(-67deg, #17191f 0%, #383852 100%)",
            }}
          >
            <Image src={`${ICON}/plus.svg`} alt="Increase" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${ICON}/payment.svg`}
            alt=""
            width={24}
            height={24}
          />
          <span className="font-body text-base font-semibold text-white">
            Payment Method
          </span>
        </div>

        {/* Currency Selection */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`flex h-[50px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border bg-[rgba(0,0,0,0.2)] px-4 transition-all ${
              currency === "USD"
                ? "border-[#ff975d] shadow-[0px_4px_14px_rgba(255,92,0,0.3)]"
                : "border-[#383852] shadow-[0px_4px_16px_rgba(0,0,0,0.15)] hover:border-[#ff975d]/40"
            }`}
          >
            <Image src={`${ICON}/usd.svg`} alt="" width={9} height={16} />
            <span
              className={`font-body text-base font-medium ${currency === "USD" ? "text-[#ff5c00]" : "text-white"}`}
            >
              USD
            </span>
            {currency === "USD" && (
              <Image
                src={`${ICON}/check-active.svg`}
                alt=""
                width={12}
                height={12}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setCurrency("EUR")}
            className={`flex h-[50px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border bg-[rgba(0,0,0,0.2)] px-4 transition-all ${
              currency === "EUR"
                ? "border-[#ff975d] shadow-[0px_4px_14px_rgba(255,92,0,0.3)]"
                : "border-[#383852] shadow-[0px_4px_16px_rgba(0,0,0,0.15)] hover:border-[#ff975d]/40"
            }`}
          >
            <Image src={`${ICON}/euro.svg`} alt="" width={16} height={16} />
            <span
              className={`font-body text-base font-medium ${currency === "EUR" ? "text-[#ff5c00]" : "text-white"}`}
            >
              EUR
            </span>
            {currency === "EUR" && (
              <Image
                src={`${ICON}/check-active.svg`}
                alt=""
                width={12}
                height={12}
              />
            )}
          </button>
        </div>
      </div>

      {/* Payment Methods (Card / PayPal / Crypto) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-2.5">
        {/* Card */}
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border bg-[rgba(0,0,0,0.2)] px-4 py-6 transition-all ${
            paymentMethod === "card"
              ? "border-[#ff975d]"
              : "border-[#383852] hover:border-[#ff975d]/40"
          }`}
        >
          <Image
            src={
              paymentMethod === "card"
                ? `${ICON}/radio-active.svg`
                : `${ICON}/radio-inactive.svg`
            }
            alt=""
            width={24}
            height={24}
          />
          <div className="flex flex-col gap-2">
            <span className="font-body text-base font-medium text-white">
              Card
            </span>
            <Image
              src={`${ICON}/stripe.svg`}
              alt="Stripe"
              width={38}
              height={16}
            />
          </div>
        </button>

        {/* PayPal */}
        <button
          type="button"
          onClick={() => setPaymentMethod("paypal")}
          className={`flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border bg-[rgba(0,0,0,0.2)] px-4 py-6 transition-all ${
            paymentMethod === "paypal"
              ? "border-[#ff975d]"
              : "border-[#383852] hover:border-[#ff975d]/40"
          }`}
        >
          <Image
            src={
              paymentMethod === "paypal"
                ? `${ICON}/radio-active.svg`
                : `${ICON}/radio-inactive.svg`
            }
            alt=""
            width={24}
            height={24}
          />
          <div className="flex flex-col gap-2">
            <span className="font-body text-base font-medium text-white">
              PayPal
            </span>
            <Image
              src={`${ICON}/paypal-logo.png`}
              alt="PayPal"
              width={44}
              height={16}
            />
          </div>
        </button>

        {/* Crypto */}
        <button
          type="button"
          onClick={() => setPaymentMethod("crypto")}
          className={`flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border bg-[rgba(0,0,0,0.2)] px-4 py-6 transition-all ${
            paymentMethod === "crypto"
              ? "border-[#ff975d]"
              : "border-[#383852] hover:border-[#ff975d]/40"
          }`}
        >
          <Image
            src={
              paymentMethod === "crypto"
                ? `${ICON}/radio-active.svg`
                : `${ICON}/radio-inactive.svg`
            }
            alt=""
            width={24}
            height={24}
          />
          <div className="flex flex-col gap-2">
            <span className="font-body text-base font-medium text-white">
              Crypto
            </span>
            <Image
              src={`${ICON}/coinbase-logo.png`}
              alt="Coinbase"
              width={56}
              height={10}
            />
          </div>
        </button>
      </div>

      {/* Service Instructions */}
      <div className="flex flex-col gap-2">
        <label className="font-body text-base font-medium leading-5 text-white">
          Service Instructions
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Start typing..."
          rows={4}
          className="h-[100px] resize-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-[18px] py-4 font-body text-sm font-normal leading-5 text-white placeholder:text-white/80 focus:border-[#ff975d]/60 focus:outline-none"
        />
      </div>

      {/* Total Amount */}
      <div className="flex items-center justify-between rounded-2xl bg-[rgba(0,0,0,0.2)] p-6">
        <span className="font-body text-sm font-normal text-white/80">
          Total Amount
        </span>
        <div className="flex items-center gap-0.5">
          <Image
            src={`${ICON}/euro-orange.svg`}
            alt=""
            width={16}
            height={16}
          />
          <span className="font-body text-[23px] font-semibold text-[#ff975d]">
            {amount}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-3xl border border-[#ff975d] px-8 py-6 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-all hover:bg-[#ff975d]/10"
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-3xl border border-[#ff975d] bg-gradient-to-r from-[#ff5c00] to-[#a32d05] px-8 py-6 font-body text-base font-bold uppercase tracking-[0.32px] text-white shadow-[0px_4px_12px_rgba(255,92,0,0.4)] transition-opacity hover:opacity-90"
        >
          Pay ({currencySymbol}
          {amount})
        </button>
      </div>
    </div>
  );
}
