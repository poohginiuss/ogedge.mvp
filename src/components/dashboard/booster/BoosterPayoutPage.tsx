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

const EARNING_GAMES = ["Valorant", "League of Legends", "CS2", "Overwatch 2", "Apex Legends"];
const EARNING_SERVICES = ["Rank Boosting", "Win Boosting", "Placement Matches", "Coaching", "Duo Queue"];
const EARNING_RANGES = [
  "Silver II — Platinum III",
  "Gold I — Diamond II",
  "Bronze III — Silver I",
  "Platinum I — Ascendant II",
  "Diamond III — Immortal I",
];
const EARNING_AMOUNTS = ["$24.00", "$37.50", "$52.75", "$74.50", "$89.00", "$115.25", "$142.00", "$198.50", "$210.00", "$325.00"];
const EARNING_DATES = [
  "Jan 5, 2026, 3:20 PM",
  "Jan 18, 2026, 9:45 AM",
  "Feb 2, 2026, 7:12 PM",
  "Feb 14, 2026, 11:30 AM",
  "Feb 28, 2026, 5:00 PM",
  "Mar 7, 2026, 1:15 PM",
  "Mar 15, 2026, 8:40 AM",
  "Mar 20, 2026, 11:57 PM",
  "Apr 3, 2026, 10:22 AM",
  "Apr 12, 2026, 6:55 PM",
];

const sampleEarnings: Earning[] = Array.from({ length: 60 }, (_, i) => ({
  id: `e-${i}`,
  orderId: `${4269000 + i * 7}`,
  game: EARNING_GAMES[i % EARNING_GAMES.length],
  service: EARNING_SERVICES[i % EARNING_SERVICES.length],
  serviceRange: EARNING_RANGES[i % EARNING_RANGES.length],
  earned: EARNING_AMOUNTS[i % EARNING_AMOUNTS.length],
  date: EARNING_DATES[i % EARNING_DATES.length],
  status: i % 3 === 1 ? ("unpaid" as const) : ("paid" as const),
}));

const PAYOUT_AMOUNTS = ["$31.50", "$56.80", "$81.95", "$120.00", "$175.40", "$210.75", "$298.00", "$350.25", "$425.00", "$510.90"];
const PAYOUT_METHODS = ["CRYPTO", "PAYPAL", "CRYPTO", "PAYPAL", "CRYPTO"];
const PAYOUT_NOTES = [
  "Bi-weekly payout for completed rank boosting orders. Thank you for your service.",
  "Monthly bonus payout for top performer in Valorant boosting category.",
  "Standard payout for completed coaching sessions and duo queue orders.",
  "Payout for win boosting and placement match orders. Keep up the great work.",
  "Bi-weekly payout including overtime bonus for rush order completions.",
];
const PAYOUT_DATES = [
  "Jan 10, 2026, 12:00 PM",
  "Jan 24, 2026, 12:00 PM",
  "Feb 7, 2026, 12:00 PM",
  "Feb 21, 2026, 12:00 PM",
  "Mar 7, 2026, 12:00 PM",
  "Mar 20, 2026, 11:57 PM",
  "Apr 4, 2026, 12:00 PM",
  "Apr 18, 2026, 12:00 PM",
  "May 2, 2026, 12:00 PM",
  "May 16, 2026, 12:00 PM",
];

const samplePayouts: Payout[] = Array.from({ length: 60 }, (_, i) => ({
  id: `p-${i}`,
  amount: PAYOUT_AMOUNTS[i % PAYOUT_AMOUNTS.length],
  paymentMethod: PAYOUT_METHODS[i % PAYOUT_METHODS.length],
  note: PAYOUT_NOTES[i % PAYOUT_NOTES.length],
  date: PAYOUT_DATES[i % PAYOUT_DATES.length],
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

// ─── Sort Helpers ─────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc";

function parseDollar(v: string): number {
  return parseFloat(v.replace(/[^0-9.\-]/g, "")) || 0;
}

function parseDate(v: string): number {
  return new Date(v).getTime() || 0;
}

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
      className="flex flex-1 items-center gap-4 rounded-3xl p-4 min-[1280px]:gap-8 min-[1280px]:justify-center min-[1280px]:p-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="h-8 w-8 min-[1280px]:h-[54px] min-[1280px]:w-[54px]" />
      </div>
      <div className="flex flex-col">
        <span className="font-body text-sm font-medium uppercase text-white">{label}</span>
        <span className="font-heading text-xl font-bold text-white min-[1280px]:text-[30px] min-[1280px]:leading-[38px]">
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
    <div className="flex gap-2 min-[1280px]:gap-4">
      <button
        type="button"
        onClick={() => onSelect("paypal")}
        className={`flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-2xl border px-3 py-4 transition-all hover:border-brand-light active:scale-[0.98] sm:gap-3 sm:px-4 sm:py-6 ${
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
        <span className="font-body text-sm font-medium text-white sm:text-base">PayPal</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/paypal-logo.png" alt="PayPal" className="h-4 w-auto shrink-0" />
      </button>
      <button
        type="button"
        onClick={() => onSelect("crypto")}
        className={`flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-2xl border px-3 py-4 transition-all hover:border-brand-light active:scale-[0.98] sm:gap-3 sm:px-4 sm:py-6 ${
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
        <span className="font-body text-sm font-medium text-white sm:text-base">Crypto</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/coinbase-logo.png" alt="Coinbase" className="h-2.5 w-auto shrink-0" />
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
            className={`flex h-[50px] cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 font-body text-base font-medium transition-all hover:border-brand-light active:scale-[0.97] min-[1280px]:px-6 ${
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
      className="flex h-[100px] cursor-default items-center rounded-3xl transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[8%] pl-6">
        <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
          {row.orderId}
        </span>
      </div>
      <div className="w-[15%] pl-2">
        <span className="font-body text-base font-semibold text-white">{row.game}</span>
      </div>
      <div className="min-w-[200px] flex-1 pl-2">
        <div className="flex flex-col text-white">
          <span className="font-body text-base font-semibold">{row.service}</span>
          <span className="font-body text-sm font-bold">{row.serviceRange}</span>
        </div>
      </div>
      <div className="w-[12%] pl-2">
        <span className="font-body text-base font-semibold text-white">{row.earned}</span>
      </div>
      <div className="flex w-[18%] items-center justify-center">
        <span className="font-body text-base font-semibold text-white">{row.date}</span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
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
  const [sortKey, setSortKey] = useState<"earned" | "date" | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered =
    filter === "all" ? sampleEarnings : sampleEarnings.filter((e) => e.status === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    let cmp = 0;
    if (sortKey === "earned") cmp = parseDollar(a.earned) - parseDollar(b.earned);
    else cmp = parseDate(a.date) - parseDate(b.date);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(key: "earned" | "date") {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  }

  const COLS: { label: string; cls: string; sortField?: "earned" | "date" }[] = [
    { label: "Order #", cls: "w-[8%] pl-6" },
    { label: "Game", cls: "w-[15%] pl-2" },
    { label: "Service", cls: "min-w-[200px] flex-1 pl-2" },
    { label: "Earned", cls: "w-[12%] pl-2", sortField: "earned" },
    { label: "Date", cls: "w-[18%] text-center", sortField: "date" },
    { label: "Status", cls: "w-[10%] text-center" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden flex-col gap-4 min-[1280px]:flex">
        <div className="overflow-x-auto">
          <div className="w-full min-w-[900px]">
            <div className="flex items-center pb-2">
              {COLS.map((col) => (
                <div
                  key={col.label}
                  className={`${col.cls} font-body text-sm font-bold text-white/80`}
                >
                  <span
                    className={`inline-flex items-center gap-1 ${col.sortField ? "cursor-pointer select-none hover:text-white" : ""}`}
                    onClick={col.sortField ? () => handleSort(col.sortField!) : undefined}
                  >
                    {col.label}
                    {col.sortField && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/images/dashboard/icons/sort-arrow-down.svg"
                        alt=""
                        className={`h-4 w-4 transition-transform ${sortKey === col.sortField && sortDir === "asc" ? "rotate-180" : ""}`}
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
      <div className="flex flex-col gap-4 min-[1280px]:hidden">
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
      className="flex min-h-[100px] cursor-default items-center rounded-3xl py-6 transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[12%] pl-6">
        <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
          {row.amount}
        </span>
      </div>
      <div className="w-[15%] pl-2">
        <span className="font-body text-base font-semibold text-white">
          {row.paymentMethod}
        </span>
      </div>
      <div className="min-w-[200px] flex-1 pl-2 pr-6">
        <p className="line-clamp-3 font-body text-base text-white">{row.note}</p>
      </div>
      <div className="w-[18%] pr-6 text-right">
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
  const [sortKey, setSortKey] = useState<"amount" | "date" | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...samplePayouts].sort((a, b) => {
    if (!sortKey) return 0;
    let cmp = 0;
    if (sortKey === "amount") cmp = parseDollar(a.amount) - parseDollar(b.amount);
    else cmp = parseDate(a.date) - parseDate(b.date);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(key: "amount" | "date") {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  }

  const COLS: { label: string; cls: string; sortField?: "amount" | "date" }[] = [
    { label: "Amount", cls: "w-[12%] pl-6", sortField: "amount" },
    { label: "Payment Method", cls: "w-[15%] pl-2" },
    { label: "Note", cls: "min-w-[200px] flex-1 pl-2" },
    { label: "Date", cls: "w-[18%] pr-6 text-right", sortField: "date" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden flex-col gap-4 min-[1280px]:flex">
        <div className="overflow-x-auto">
          <div className="w-full min-w-[900px]">
            <div className="flex items-center pb-2">
              {COLS.map((col) => (
                <div
                  key={col.label}
                  className={`${col.cls} font-body text-sm font-bold text-white/80`}
                >
                  <span
                    className={`inline-flex items-center gap-1 ${col.sortField ? "cursor-pointer select-none hover:text-white" : ""}`}
                    onClick={col.sortField ? () => handleSort(col.sortField!) : undefined}
                  >
                    {col.label}
                    {col.sortField && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/images/dashboard/icons/sort-arrow-down.svg"
                        alt=""
                        className={`h-4 w-4 transition-transform ${sortKey === col.sortField && sortDir === "asc" ? "rotate-180" : ""}`}
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
      <div className="flex flex-col gap-4 min-[1280px]:hidden">
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
      <div className="flex flex-col gap-6 min-[1280px]:flex-row min-[1280px]:items-start min-[1280px]:justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-body text-xl font-bold text-white min-[1280px]:font-heading min-[1280px]:text-[30px] min-[1280px]:font-bold min-[1280px]:leading-[38px]">
            My Earnings
          </h1>
          <p className="font-body text-base text-white">
            Track your earnings from completed orders and view payout history
          </p>
        </div>
        <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
      </div>

      {/* Stat cards */}
      <div className="flex flex-col gap-2 min-[1280px]:flex-row min-[1280px]:gap-8">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
        <div
          className="flex flex-1 items-center gap-4 rounded-3xl p-4 min-[1280px]:gap-4 min-[1280px]:px-8"
          style={{ background: "rgba(56,56,82,0.3)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/info-icon.svg"
            alt=""
            className="h-5 w-5 shrink-0 min-[1280px]:h-[54px] min-[1280px]:w-[54px]"
          />
          <span className="font-body text-sm text-white min-[1280px]:text-base min-[1280px]:font-medium">
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
        <span className="font-body text-sm text-white min-[1280px]:text-base min-[1280px]:font-medium">
          If you experience any issue with your payout, please contact an admin as soon as
          possible and include your Order ID along with a description of the problem.
        </span>
      </div>

      {/* Tabs + Filter + Table */}
      <div className="flex flex-col gap-6">
        {/* Desktop: Tabs + filter in one row */}
        <div className="hidden items-center justify-between min-[1280px]:flex">
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
        <div className="flex flex-col gap-4 min-[1280px]:hidden">
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
