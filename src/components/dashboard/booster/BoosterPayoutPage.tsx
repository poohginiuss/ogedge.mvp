"use client";

import { useState } from "react";
import { Dropdown } from "../../ui/Dropdown";
import {
  PAGE_SIZE,
  Pagination,
  ROW_BG_DEFAULT,
  ROW_BG_HOVER,
} from "../orderTableShared";

// ─── Types ───────────────────────────────────────────────────────────────────

type EarningStatus = "paid" | "unpaid";

type Earning = {
  id: string;
  orderId: string;
  game: string;
  service: string;
  serviceRange: string;
  earned: string;
  date: string;
  status: EarningStatus;
};

type Payout = {
  id: string;
  amount: string;
  paymentMethod: string;
  note: string;
  date: string;
};

// ─── Sample Data ─────────────────────────────────────────────────────────────

const sampleEarnings: Earning[] = Array.from({ length: 60 }, (_, i) => ({
  id: `e-${i}`,
  orderId: "4269522",
  game: "Valorant",
  service: "Rank Boosting",
  serviceRange: "Silver II — Platinum III",
  earned: "$74.50",
  date: "Mar 20, 2026, 11:57 PM",
  status: i % 3 === 1 ? ("unpaid" as const) : ("paid" as const),
}));

const PAYOUT_NOTE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur..";

const samplePayouts: Payout[] = Array.from({ length: 60 }, (_, i) => ({
  id: `p-${i}`,
  amount: "$81.95",
  paymentMethod: "CRYPTO",
  note: PAYOUT_NOTE,
  date: "Mar 20, 2026, 11:57 PM",
}));

const STATUS_CFG: Record<EarningStatus, { bg: string; color: string; label: string }> = {
  paid: { bg: "rgba(45,194,39,0.2)", color: "#34a853", label: "PAID" },
  unpaid: { bg: "rgba(255,176,0,0.2)", color: "#ffb000", label: "UNPAID" },
};

const STAT_CARDS = [
  { icon: "/images/dashboard/icons/stat-earnings.svg", label: "Available Balance", value: "$640" },
  { icon: "/images/dashboard/icons/stat-wallet.svg", label: "Total Earned", value: "$1234" },
  { icon: "/images/dashboard/icons/stat-paidout.svg", label: "Total Paid Out", value: "$900" },
];

// ─── Shared Helpers ──────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex h-[30px] items-center justify-between rounded-lg px-2 py-1"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <span className="font-body text-sm text-white/80">{label}</span>
      <span className="font-body text-base font-semibold text-white">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: EarningStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      className="flex flex-1 items-center gap-4 rounded-3xl p-4 lg:gap-8 lg:justify-center lg:p-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="h-8 w-8 lg:h-[54px] lg:w-[54px]" />
      </div>
      <div className="flex flex-col">
        <span className="font-body text-sm font-medium uppercase text-white">{label}</span>
        <span className="font-heading text-xl font-bold text-white lg:text-[30px] lg:leading-[38px]">
          {value}
        </span>
      </div>
    </div>
  );
}

function PaymentMethodSelector({
  selected,
  onSelect,
}: {
  selected: "paypal" | "crypto";
  onSelect: (v: "paypal" | "crypto") => void;
}) {
  return (
    <div className="flex gap-2.5 lg:gap-4">
      <button
        type="button"
        onClick={() => onSelect("paypal")}
        className={`flex items-center gap-3 rounded-2xl border px-4 py-6 transition-all ${
          selected === "paypal"
            ? "border-brand-light bg-[rgba(0,0,0,0.2)]"
            : "border-dark-border bg-[rgba(0,0,0,0.2)]"
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            selected === "paypal" ? "border-brand-main" : "border-dark-border"
          }`}
        >
          {selected === "paypal" && (
            <span className="h-2.5 w-2.5 rounded-full bg-brand-main" />
          )}
        </span>
        <span className="font-body text-base font-medium text-white">PayPal</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/paypal-logo.png" alt="PayPal" className="h-4 w-auto" />
      </button>
      <button
        type="button"
        onClick={() => onSelect("crypto")}
        className={`flex items-center gap-3 rounded-2xl border px-4 py-6 transition-all ${
          selected === "crypto"
            ? "border-brand-light bg-[rgba(0,0,0,0.2)]"
            : "border-dark-border bg-[rgba(0,0,0,0.2)]"
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            selected === "crypto" ? "border-brand-main" : "border-dark-border"
          }`}
        >
          {selected === "crypto" && (
            <span className="h-2.5 w-2.5 rounded-full bg-brand-main" />
          )}
        </span>
        <span className="font-body text-base font-medium text-white">Crypto</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/coinbase-logo.png" alt="Coinbase" className="h-2.5 w-auto" />
      </button>
    </div>
  );
}

function TabSelector({
  activeTab,
  onTabChange,
}: {
  activeTab: "earnings" | "payouts";
  onTabChange: (tab: "earnings" | "payouts") => void;
}) {
  const tabs: { key: "earnings" | "payouts"; label: string; count: number }[] = [
    { key: "earnings", label: "Earnings", count: 8 },
    { key: "payouts", label: "Payouts", count: 6 },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex h-[50px] items-center justify-center gap-2 rounded-2xl border px-4 font-body text-base font-medium transition-all lg:px-6 ${
              active
                ? "border-brand-light bg-[rgba(0,0,0,0.2)] text-brand-main shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
                : "border-dark-border bg-[rgba(0,0,0,0.2)] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-md px-1 py-0.5 font-body text-xs font-medium text-white ${
                active ? "bg-brand-main" : "bg-dark-border"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Earnings Desktop Row ────────────────────────────────────────────────────

function EarningDesktopRow({ row }: { row: Earning }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex h-[100px] shrink-0 cursor-default items-center rounded-3xl transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[120px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
          {row.orderId}
        </span>
      </div>
      <div className="w-[350px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold text-white">{row.game}</span>
      </div>
      <div className="w-[350px] shrink-0 pl-6">
        <div className="flex flex-col text-white">
          <span className="font-body text-base font-semibold">{row.service}</span>
          <span className="font-body text-sm font-bold">{row.serviceRange}</span>
        </div>
      </div>
      <div className="w-[290px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold text-white">{row.earned}</span>
      </div>
      <div className="flex w-[310px] shrink-0 items-center justify-center">
        <span className="font-body text-base font-semibold text-white">{row.date}</span>
      </div>
      <div className="flex w-[200px] shrink-0 items-center justify-center">
        <StatusBadge status={row.status} />
      </div>
    </div>
  );
}

function MobileEarningCard({ row }: { row: Earning }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-dark-surface p-4">
      <div className="flex items-center justify-between">
        <span className="font-body text-lg font-bold" style={{ color: "#ff975d" }}>
          {row.orderId}
        </span>
        <StatusBadge status={row.status} />
      </div>
      <DetailRow label="Game" value={row.game} />
      <div
        className="flex items-center justify-between rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="font-body text-sm text-white/80">Service</span>
        <div className="flex flex-col items-end text-white">
          <span className="font-body text-base font-semibold">{row.service}</span>
          <span className="font-body text-sm font-bold">{row.serviceRange}</span>
        </div>
      </div>
      <DetailRow label="Earned" value={row.earned} />
      <DetailRow label="Date" value={row.date} />
    </div>
  );
}

// ─── Earnings Table ──────────────────────────────────────────────────────────

function EarningsTable({ filter }: { filter: string }) {
  const [page, setPage] = useState(1);

  const filtered =
    filter === "all" ? sampleEarnings : sampleEarnings.filter((e) => e.status === filter);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const COLS = [
    { label: "Order #", width: "w-[120px]" },
    { label: "Game", width: "w-[350px]" },
    { label: "Service", width: "w-[350px]" },
    { label: "Earned", width: "w-[290px]", sort: true },
    { label: "Date", width: "w-[310px]", sort: true, center: true },
    { label: "Status", width: "w-[200px]", center: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden flex-col gap-4 lg:flex">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="flex items-center px-6 pb-2">
              {COLS.map((col) => (
                <div
                  key={col.label}
                  className={`${col.width} ${col.center ? "text-center" : ""} shrink-0 font-body text-sm font-bold text-white/80`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sort && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/images/dashboard/icons/sort-arrow-down.svg"
                        alt=""
                        className="h-4 w-4"
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {visible.map((row) => (
                <EarningDesktopRow key={row.id} row={row} />
              ))}
            </div>
          </div>
        </div>
        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>
      <div className="flex flex-col gap-4 lg:hidden">
        {visible.map((row) => (
          <MobileEarningCard key={row.id} row={row} />
        ))}
        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>
    </div>
  );
}

// ─── Payout Desktop Row ──────────────────────────────────────────────────────

function PayoutDesktopRow({ row }: { row: Payout }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex min-h-[100px] shrink-0 cursor-default items-center rounded-3xl py-6 transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[200px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
          {row.amount}
        </span>
      </div>
      <div className="w-[250px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold text-white">
          {row.paymentMethod}
        </span>
      </div>
      <div className="min-w-0 flex-1 pl-6 pr-6">
        <p className="line-clamp-3 font-body text-base text-white">{row.note}</p>
      </div>
      <div className="w-[250px] shrink-0 pr-6 text-right">
        <span className="font-body text-base font-semibold text-white">{row.date}</span>
      </div>
    </div>
  );
}

function MobilePayoutCard({ row }: { row: Payout }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-dark-surface p-4">
      <span className="font-body text-lg font-bold" style={{ color: "#ff975d" }}>
        {row.amount}
      </span>
      <DetailRow label="Payment Method" value={row.paymentMethod} />
      <div
        className="flex flex-col gap-1.5 rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="font-body text-sm text-white/80">Note</span>
        <p className="font-body text-base text-white">{row.note}</p>
      </div>
      <DetailRow label="Date" value={row.date} />
    </div>
  );
}

// ─── Payouts Table ───────────────────────────────────────────────────────────

function PayoutsTable() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(samplePayouts.length / PAGE_SIZE);
  const visible = samplePayouts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const COLS = [
    { label: "Amount", width: "w-[200px]", sort: true },
    { label: "Payment Method", width: "w-[250px]" },
    { label: "Note", width: "flex-1" },
    { label: "Date", width: "w-[250px]", sort: true, right: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden flex-col gap-4 lg:flex">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="flex items-center px-6 pb-2">
              {COLS.map((col) => (
                <div
                  key={col.label}
                  className={`${col.width} ${col.right ? "text-right pr-6" : ""} shrink-0 font-body text-sm font-bold text-white/80`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sort && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/images/dashboard/icons/sort-arrow-down.svg"
                        alt=""
                        className="h-4 w-4"
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {visible.map((row) => (
                <PayoutDesktopRow key={row.id} row={row} />
              ))}
            </div>
          </div>
        </div>
        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>
      <div className="flex flex-col gap-4 lg:hidden">
        {visible.map((row) => (
          <MobilePayoutCard key={row.id} row={row} />
        ))}
        {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function BoosterPayoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "crypto">("paypal");
  const [activeTab, setActiveTab] = useState<"earnings" | "payouts">("earnings");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-body text-xl font-bold text-white lg:font-heading lg:text-[30px] lg:font-bold lg:leading-[38px]">
            My Earnings
          </h1>
          <p className="font-body text-base text-white">
            Track your earnings from completed orders and view payout history
          </p>
        </div>
        <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
      </div>

      {/* Stat cards */}
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
        <div
          className="flex flex-1 items-center gap-4 rounded-3xl p-4 lg:gap-4 lg:px-8"
          style={{ background: "rgba(56,56,82,0.3)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/info-icon.svg"
            alt=""
            className="h-5 w-5 shrink-0 lg:h-[54px] lg:w-[54px]"
          />
          <span className="font-body text-sm text-white lg:text-base lg:font-medium">
            Payouts are sent every two weeks, every Friday.
          </span>
        </div>
      </div>

      {/* Warning banner */}
      <div
        className="flex items-start gap-2.5 rounded-2xl p-4"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/icons/info-icon.svg"
          alt=""
          className="mt-1 h-5 w-5 shrink-0"
        />
        <span className="font-body text-sm text-white lg:text-base lg:font-medium">
          If you experience any issue with your payout, please contact an admin as soon as
          possible and include your Order ID along with a description of the problem.
        </span>
      </div>

      {/* Tabs + Filter + Table */}
      <div className="flex flex-col gap-6">
        {/* Desktop: Tabs + filter in one row */}
        <div className="hidden items-center justify-between lg:flex">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "earnings" && (
            <div className="flex items-center gap-6">
              <span className="font-body text-base font-medium text-white">Show</span>
              <Dropdown
                label=""
                value={filter}
                options={[
                  { value: "all", label: "All" },
                  { value: "unpaid", label: "Unpaid" },
                  { value: "paid", label: "Paid" },
                ]}
                onChange={setFilter}
                className="w-[180px]"
              />
            </div>
          )}
        </div>

        {/* Mobile: Tabs then filter row */}
        <div className="flex flex-col gap-4 lg:hidden">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "earnings" ? (
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <span className="font-body text-xs text-white">Show</span>
                <Dropdown
                  label=""
                  value={filter}
                  options={[
                    { value: "all", label: "All" },
                    { value: "unpaid", label: "Unpaid" },
                    { value: "paid", label: "Paid" },
                  ]}
                  onChange={setFilter}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <span className="font-body text-xs text-white">Sort by</span>
                <Dropdown
                  label=""
                  value={sortBy}
                  options={[
                    { value: "date", label: "Date" },
                    { value: "earned", label: "Earned" },
                  ]}
                  onChange={setSortBy}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="font-body text-xs text-white">Sort by</span>
              <Dropdown
                label=""
                value={sortBy}
                options={[
                  { value: "date", label: "Date" },
                  { value: "amount", label: "Amount" },
                ]}
                onChange={setSortBy}
              />
            </div>
          )}
        </div>

        {/* Table content based on active tab */}
        {activeTab === "earnings" ? (
          <EarningsTable filter={filter} />
        ) : (
          <PayoutsTable />
        )}
      </div>
    </>
  );
}
