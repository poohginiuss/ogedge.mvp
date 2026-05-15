"use client";

import { DashboardProfileCard } from "./DashboardProfileCard";

export default function SupportPage() {
  return (
    <>
      <DashboardProfileCard />
      <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6 lg:p-8">
        <h2 className="font-heading text-2xl font-semibold text-white lg:text-[32px]">
          Customer Support
        </h2>
        <p className="font-body text-sm text-white/80 lg:text-base">
          Need help with an order, payment or account? Open a ticket and our team will get back to
          you within a few hours.
        </p>
        <a
          href="mailto:support@ogedge.com"
          className="inline-flex w-fit items-center gap-2 rounded-2xl bg-brand-main px-6 py-3 font-body text-base font-bold uppercase text-white transition-opacity hover:opacity-90"
        >
          support@ogedge.com
        </a>
      </div>
    </>
  );
}
