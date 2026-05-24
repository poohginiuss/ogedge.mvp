"use client";

import { FaqCategoryChip } from "@/components/faq/FaqCategoryChip";
import { type CategoryId, faqCategories, faqItems } from "@/components/faq/faqData";
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { affiliateStats, samplePayouts } from "./affiliateData";
import { EarningsChart } from "./EarningsChart";

const statCards = [
  {
    icon: "/images/dashboard/icons/stat-earnings.svg",
    label: "Total Earnings",
    value: affiliateStats.totalEarnings,
  },
  {
    icon: "/images/dashboard/icons/stat-referrals.svg",
    label: "Total Referrals",
    value: affiliateStats.totalReferrals,
  },
  {
    icon: "/images/dashboard/icons/stat-clicks.svg",
    label: "Clicks",
    value: affiliateStats.clicks,
  },
  {
    icon: "/images/dashboard/icons/stat-wallet.svg",
    label: "Current Balance",
    value: affiliateStats.currentBalance,
    highlight: true,
  },
];

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-3xl p-4 lg:flex-row lg:flex-1 lg:justify-center lg:gap-8 lg:p-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="h-8 w-8 lg:h-[54px] lg:w-[54px]" />
      </div>
      <div className="flex flex-col items-center">
        <span className="font-body text-sm font-medium uppercase text-white">{label}</span>
        <span className="font-body text-xl font-bold text-white lg:text-2xl">{value}</span>
      </div>
    </div>
  );
}

function AffiliateReferralCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateStats.referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6 lg:p-8">
      <div className="flex items-center gap-6">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/referral-icon.svg"
              alt=""
              className="h-6 w-6"
            />
            <span className="font-body text-xs font-bold uppercase text-brand-light">
              Affiliate Program
            </span>
          </div>
          <p className="font-body text-lg font-bold leading-7 text-white lg:text-xl lg:tracking-[-0.4px]">
            Earn <span className="text-brand-light">10%</span> off every{" "}
            <span className="text-brand-light">conversion</span>, give them{" "}
            <span className="text-brand-light">15% off</span>
          </p>
          <p className="font-body text-xs text-white">
            Share your code. They get a discount on their first order, you get rewarded right
            after they checkout.
          </p>
        </div>

        <div className="hidden h-[50px] w-px bg-dark-border lg:block" />

        <div className="hidden flex-col items-center gap-1 lg:flex">
          <span className="font-body text-xs font-bold uppercase text-white/50">
            Your Affiliate Code
          </span>
          <span className="font-heading text-3xl font-bold uppercase text-brand-main">
            {affiliateStats.referralCode}
          </span>
          <span className="font-body text-sm text-white/50">
            {affiliateStats.conversions} conversions
          </span>
        </div>
      </div>

      {/* Mobile code display */}
      <div className="flex flex-col items-center gap-1 lg:hidden">
        <span className="font-body text-xs font-bold uppercase text-white/50">Your Code</span>
        <span className="font-heading text-3xl font-bold uppercase text-brand-main">
          {affiliateStats.referralCode}
        </span>
        <span className="font-body text-sm text-white/50">
          {affiliateStats.friendsJoined} friends joined
        </span>
      </div>

      {/* Copy URL bar */}
      <div
        className="flex items-center gap-4 rounded-2xl px-4 py-3 lg:gap-6 lg:px-6 lg:py-4"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="flex-1 truncate font-mono text-xs text-white lg:text-sm">
          {affiliateStats.referralUrl}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-2.5 rounded-lg bg-brand-main px-4 py-3 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-85 lg:text-base"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-6 w-6" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

const payoutStatusConfig: Record<string, { bg: string; color: string }> = {
  paid: { bg: "rgba(45,194,39,0.2)", color: "#2dc227" },
  pending: { bg: "rgba(255,176,0,0.2)", color: "#ffb000" },
};

function PayoutHistory() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-body text-xl font-bold tracking-[-0.4px] text-white">
          Payout History
        </h2>
        <Link
          href="/app/affiliate/payouts"
          className="group inline-flex cursor-pointer items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-main"
        >
          See all
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/arrow-right-duotone.svg"
            alt=""
            className="h-5 w-5 rotate-90 transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(42%)_sepia(97%)_saturate(2668%)_hue-rotate(3deg)_brightness(104%)_contrast(106%)]"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {samplePayouts.map((payout) => {
          const cfg = payoutStatusConfig[payout.status];
          return (
            <div
              key={payout.id}
              className="flex flex-col gap-0.5 rounded-3xl bg-dark-surface px-6 py-4 lg:px-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-xl font-semibold text-white">
                  {payout.amount}
                </span>
                <span
                  className="rounded-lg px-2 py-1 font-body text-xs font-semibold uppercase lg:text-sm"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {payout.status}
                </span>
              </div>
              <span className="font-body text-base text-white">{payout.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MAX_FAQ = 6;

function InlineFaq() {
  const [activeTab, setActiveTab] = useState<CategoryId>("general");
  const [openIndex, setOpenIndex] = useState(0);

  const questions = useMemo(
    () => faqItems.filter((item) => item.categoryId === activeTab).slice(0, MAX_FAQ),
    [activeTab],
  );

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-center font-heading text-2xl font-bold text-white lg:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0">
        {faqCategories.map((tab) => (
          <FaqCategoryChip
            key={tab.id}
            id={tab.id}
            label={tab.label}
            count={tab.count}
            active={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setOpenIndex(0);
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={q.id}
              className="rounded-2xl"
              style={{
                border: "1px solid #6d6d96",
                background:
                  "linear-gradient(170deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
              }}
            >
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5 lg:px-8 lg:py-6"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="pr-4 font-body text-sm font-medium leading-6 text-white sm:text-base sm:leading-7 lg:text-xl">
                  {q.question}
                </span>
                {isOpen ? (
                  <ChevronUpIcon size={22} className="shrink-0 text-white/70" />
                ) : (
                  <ChevronDownIcon size={22} className="shrink-0 text-white/70" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-6 sm:pb-5 lg:px-8 lg:pb-6">
                  <p className="font-body text-sm leading-6 text-white/90 lg:text-base">
                    {q.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
        >
          Explore all questions
          <ArrowRightIcon size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function AffiliateDashboardPage() {
  return (
    <>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-body text-xl font-bold text-white lg:font-heading lg:text-[32px] lg:font-semibold">
            Affiliate Dashboard
          </h1>
          <p className="font-body text-base text-white lg:hidden">Lorem ipsum</p>
        </div>
        <button
          type="button"
          className="group hidden cursor-pointer items-center gap-4 rounded-3xl px-8 py-6 font-body text-xl font-bold text-white transition-colors hover:text-brand-main lg:flex"
          style={{ background: "rgba(56,56,82,0.3)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/add-icon.svg" alt="" className="h-6 w-6 transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(42%)_sepia(97%)_saturate(2668%)_hue-rotate(3deg)_brightness(104%)_contrast(106%)]" />
          Request Payout
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Main content: Chart + Sidebar */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
        <div className="flex flex-1 flex-col gap-20">
          <EarningsChart />
          {/* Desktop: FAQ sits under the chart, same width */}
          <div className="hidden xl:block">
            <InlineFaq />
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:w-[420px] xl:shrink-0">
          <AffiliateReferralCard />
          <PayoutHistory />
        </div>
      </div>

      {/* Mobile: FAQ at the very bottom */}
      <div className="xl:hidden">
        <InlineFaq />
      </div>
    </>
  );
}
