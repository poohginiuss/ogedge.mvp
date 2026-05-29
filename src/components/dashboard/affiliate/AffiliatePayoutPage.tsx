"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Dropdown } from "../../ui/Dropdown";
import {
  PAGE_SIZE,
  Pagination,
  ROW_BG_DEFAULT,
  ROW_BG_HOVER,
} from "../orderTableShared";
import {
  affiliateStats,
  payoutPageStats,
  sampleConversions,
  samplePayouts,
  type Conversion,
  type ConversionStatus,
} from "./affiliateData";

const CONVERSION_STATUS: Record<ConversionStatus, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "rgba(45,194,39,0.2)", color: "#34a853", label: "CONFIRMED" },
  pending: { bg: "rgba(255,176,0,0.2)", color: "#ffb000", label: "PENDING" },
};

const PAYOUT_STATUS: Record<string, { bg: string; color: string }> = {
  paid: { bg: "rgba(45,194,39,0.2)", color: "#2dc227" },
  pending: { bg: "rgba(255,176,0,0.2)", color: "#ffb000" },
};

function StatCard({
  icon,
  label,
  value,
  horizontal,
}: {
  icon: string;
  label: string;
  value: string;
  horizontal?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-4 rounded-3xl p-4 lg:flex-1 lg:gap-8 lg:p-8 ${
        horizontal ? "flex-row" : "flex-col"
      }`}
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="h-8 w-8 lg:h-[54px] lg:w-[54px]" />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="font-body text-sm font-medium uppercase text-white">{label}</span>
        <span className="font-body text-xl font-bold text-white lg:text-2xl">{value}</span>
      </div>
    </div>
  );
}

function ConversionStatusBadge({ status }: { status: ConversionStatus }) {
  const cfg = CONVERSION_STATUS[status];
  return (
    <span
      className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

function DesktopRow({ row }: { row: Conversion }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex min-h-[100px] shrink-0 cursor-default items-center rounded-3xl py-4 transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[18%] shrink-0 pl-6">
        <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
          {row.customer}
        </span>
      </div>
      <div className="w-[28%] shrink-0 pl-4">
        <span className="font-body text-base font-semibold text-white">{row.date}</span>
      </div>
      <div className="w-[16%] shrink-0 pl-4">
        <span className="font-body text-base font-semibold text-white">{row.orderValue}</span>
      </div>
      <div className="w-[22%] shrink-0 pl-4">
        <span className="font-body text-base font-semibold text-white">
          {row.commissionEarned}
        </span>
      </div>
      <div className="flex w-[16%] items-center justify-center">
        <ConversionStatusBadge status={row.status} />
      </div>
    </div>
  );
}

function MobileConversionCard({ row }: { row: Conversion }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-dark-surface p-4">
      <div className="flex items-center justify-between">
        <span className="font-body text-lg font-bold" style={{ color: "#ff975d" }}>
          {row.customer}
        </span>
        <ConversionStatusBadge status={row.status} />
      </div>
      <div
        className="flex items-center justify-between rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="font-body text-sm text-white/80">Date</span>
        <span className="font-body text-base font-semibold text-white">{row.date}</span>
      </div>
      <div
        className="flex items-center justify-between rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="font-body text-sm text-white/80">Order Value</span>
        <span className="font-body text-base font-semibold text-white">{row.orderValue}</span>
      </div>
      <div
        className="flex items-center justify-between rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="font-body text-sm text-white/80">Commission Earned</span>
        <span className="font-body text-base font-semibold text-white">
          {row.commissionEarned}
        </span>
      </div>
    </div>
  );
}

type SortKey = "customer" | "date" | "value" | "commission" | "status";
type SortDir = "asc" | "desc";

const COLS: { label: string; cls: string; key: SortKey }[] = [
  { label: "Customer", cls: "w-[18%] pl-6 text-left", key: "customer" },
  { label: "Date", cls: "w-[28%] pl-4 text-left", key: "date" },
  { label: "Order Value", cls: "w-[16%] pl-4 text-left", key: "value" },
  { label: "Commission Earned", cls: "w-[22%] pl-4 text-left", key: "commission" },
  { label: "Status", cls: "w-[16%] text-center", key: "status" },
];

function sortConversions(data: Conversion[], key: SortKey, dir: SortDir): Conversion[] {
  const sorted = [...data].sort((a, b) => {
    switch (key) {
      case "customer": return a.customer.localeCompare(b.customer);
      case "date": return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "value": return parseFloat(a.orderValue.replace(/[^0-9.]/g, "")) - parseFloat(b.orderValue.replace(/[^0-9.]/g, ""));
      case "commission": return parseFloat(a.commissionEarned.replace(/[^0-9.]/g, "")) - parseFloat(b.commissionEarned.replace(/[^0-9.]/g, ""));
      case "status": return a.status.localeCompare(b.status);
      default: return 0;
    }
  });
  return dir === "desc" ? sorted.reverse() : sorted;
}

function ConversionsTable() {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => sortConversions(sampleConversions, sortKey, sortDir), [sortKey, sortDir]);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-body text-xl font-bold text-white">Conversions</h2>
          <p className="font-body text-base text-white/70">Lorem ipsum</p>
        </div>

        {/* Mobile sort dropdown */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="font-body text-xs text-white">Sort by</span>
          <Dropdown
            label=""
            value={sortKey}
            options={[
              { value: "date", label: "Date" },
              { value: "value", label: "Order Value" },
              { value: "commission", label: "Commission" },
            ]}
            onChange={(v) => { setSortKey(v as SortKey); setPage(1); }}
            className="w-[150px]"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden flex-col gap-4 lg:flex">
        <div className="overflow-x-auto">
          <div>
            <div className="flex items-center pb-2">
              {COLS.map((col) => (
                <button
                  type="button"
                  key={col.label}
                  onClick={() => handleSort(col.key)}
                  className={`${col.cls} cursor-pointer font-body text-sm font-bold text-white/80 transition-colors hover:text-white`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/dashboard/icons/sort-arrow-down.svg"
                      alt=""
                      className="h-4 w-4 transition-transform"
                      style={{
                        opacity: sortKey === col.key ? 1 : 0.4,
                        transform: sortKey === col.key && sortDir === "asc" ? "rotate(180deg)" : undefined,
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {visible.map((row) => (
                <DesktopRow key={row.id} row={row} />
              ))}
            </div>
          </div>
        </div>
        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {visible.map((row) => (
          <MobileConversionCard key={row.id} row={row} />
        ))}
        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
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
    <div className="flex flex-col gap-3 rounded-3xl bg-dark-surface p-4 lg:p-5">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/referral-icon.svg" alt="" className="h-5 w-5" />
            <span className="font-body text-xs font-bold uppercase text-brand-light">
              Affiliate Program
            </span>
          </div>
          <p className="font-body text-base font-bold leading-6 text-white lg:text-lg lg:tracking-[-0.4px]">
            Earn <span className="text-brand-light">10%</span> off every{" "}
            <span className="text-brand-light">conversion</span>, give them{" "}
            <span className="text-brand-light">15% off</span>
          </p>
          <p className="font-body text-xs text-white">
            Share your code. They get a discount on their first order, you get rewarded right after
            they checkout.
          </p>
        </div>

        <div className="h-[40px] w-px bg-dark-border" />

        <div className="flex flex-col items-center gap-0.5">
          <span className="font-body text-xs font-bold uppercase text-white/50">
            <span className="hidden lg:inline">Your Affiliate Code</span>
            <span className="lg:hidden">Your Code</span>
          </span>
          <span className="font-heading text-2xl font-bold uppercase text-brand-main lg:text-3xl">
            {affiliateStats.referralCode}
          </span>
          <span className="font-body text-sm text-white/50">
            <span className="hidden lg:inline">{affiliateStats.conversions} conversions</span>
            <span className="lg:hidden">{affiliateStats.friendsJoined} friends joined</span>
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 lg:gap-4 lg:px-5 lg:py-3"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="flex-1 break-all font-mono text-xs text-white lg:truncate lg:text-sm">
          {affiliateStats.referralUrl}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-brand-main px-3 py-2.5 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-all hover:shadow-[0_4px_16px_rgba(255,92,0,0.4)] hover:brightness-110 active:scale-[0.97] lg:text-base"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-6 w-6" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function PayoutInfoTip() {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="group relative">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setShowTip((v) => !v)}
        onBlur={() => setShowTip(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/info-icon.svg" alt="" className="h-6 w-6" />
      </button>
      <div
        className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-[220px] -translate-x-1/2 rounded-xl border border-[#383852] bg-[#1a1c2e] px-4 py-3 shadow-lg transition-opacity lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:opacity-100 ${showTip ? "pointer-events-auto !opacity-100" : "opacity-0"}`}
      >
        <p className="font-body text-xs leading-5 text-white/90">
          Request a payout once your confirmed balance meets the minimum threshold. Payouts are processed within 1–3 business days.
        </p>
      </div>
    </div>
  );
}

function PayoutSidebar() {
  const latestPayout = samplePayouts[0];
  const latestCfg = PAYOUT_STATUS[latestPayout.status];

  return (
    <div className="flex flex-col gap-4">
      {/* Payout header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-body text-xl font-bold text-white">Payout</h2>
          <PayoutInfoTip />
        </div>
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-3 rounded-3xl border border-transparent px-5 py-4 font-body text-base font-bold text-white transition-all hover:border-[#ff975d] hover:text-[#ff975d] hover:shadow-[0_4px_34px_rgba(255,92,0,0.3)] active:scale-[0.97]"
          style={{ background: "rgba(56,56,82,0.4)", backdropFilter: "blur(3px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/add-icon.svg" alt="" className="h-5 w-5 transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]" />
          Request Payout
        </button>
      </div>

      {/* Current confirmed balance */}
      <div
        className="flex items-center justify-between rounded-3xl px-8 py-6"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <span className="font-body text-xs font-bold uppercase text-white">
          Current Confirmed Balance
        </span>
        <span className="font-body text-2xl font-bold uppercase text-brand-light">$19.00</span>
      </div>

      {/* Payment method */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/payment-icon.svg" alt="" className="h-6 w-6" />
          <span className="font-body text-base font-medium text-white">Payment Method</span>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-dark-surface px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-body text-base text-white">PayPal</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/paypal-logo.png" alt="PayPal" className="h-4 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-white">4gamers@ogedge.com</span>
            <button type="button" className="cursor-pointer transition-opacity hover:opacity-70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/edit-pencil-icon.svg"
                alt="Edit"
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Latest payout */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/money-icon.svg" alt="" className="h-6 w-6" />
            <span className="font-body text-base font-medium text-white">Latest Payout</span>
          </div>
          <Link
            href="/app/affiliate/payouts"
            className="group inline-flex cursor-pointer items-center gap-2 font-body text-sm text-[#ff975d] transition-colors active:scale-[0.97]"
          >
            See all
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/arrow-right-duotone.svg"
              alt=""
              className="h-4 w-4 rotate-90 [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]"
            />
          </Link>
        </div>
        <div className="flex flex-col rounded-3xl bg-dark-surface px-8 py-4">
          <div className="flex items-center justify-between">
            <span className="font-body text-xl font-bold text-brand-light">
              {latestPayout.amount}
            </span>
            <span
              className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
              style={{ background: latestCfg.bg, color: latestCfg.color }}
            >
              {latestPayout.status}
            </span>
          </div>
          <span className="font-body text-base text-white">{latestPayout.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function AffiliatePayoutPage() {
  return (
    <>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-body text-xl font-bold text-white lg:font-heading lg:text-[32px] lg:font-semibold">
            Affiliate Payout
          </h1>
          <p className="font-body text-base text-white lg:hidden">Lorem ipsum</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Mobile: first card full width + horizontal, second row 2 cols vertical */}
        <div className="lg:hidden">
          <StatCard {...payoutPageStats[0]} horizontal />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          <StatCard {...payoutPageStats[1]} />
          <StatCard {...payoutPageStats[2]} />
        </div>
        {/* Desktop: 3 equal columns */}
        {payoutPageStats.map((card) => (
          <div key={card.label} className="hidden flex-1 lg:block">
            <StatCard {...card} horizontal />
          </div>
        ))}
      </div>

      {/* Main content: Table + Sidebar */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch xl:gap-6">
        {/* Left: Conversions table (desktop only at first) */}
        <div className="hidden min-w-0 flex-1 xl:block">
          <ConversionsTable />
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-2 xl:w-[440px] xl:shrink-0">
          <AffiliateReferralCard />
          <PayoutSidebar />
        </div>

        {/* Mobile: Conversions table below sidebar */}
        <div className="xl:hidden">
          <ConversionsTable />
        </div>
      </div>
    </>
  );
}
