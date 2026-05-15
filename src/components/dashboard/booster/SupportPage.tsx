"use client";

import { BoosterProfileCard } from "./BoosterProfileCard";

export default function SupportPage() {
  return (
    <>
      <BoosterProfileCard />
      <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6 lg:p-8">
        <h2 className="font-heading text-2xl font-semibold text-white lg:text-[32px]">
          Booster Support
        </h2>
        <p className="font-body text-sm text-white/80 lg:text-base">
          Need help with an order, payout or your account? Reach out and our booster team will get
          back to you within a few hours.
        </p>
        <a
          href="mailto:boosters@ogedge.com"
          className="inline-flex w-fit items-center gap-2 rounded-2xl bg-brand-main px-6 py-3 font-body text-base font-bold uppercase text-white transition-opacity hover:opacity-90"
        >
          boosters@ogedge.com
        </a>
      </div>
    </>
  );
}
