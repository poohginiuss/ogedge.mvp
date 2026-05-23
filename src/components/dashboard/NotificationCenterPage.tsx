"use client";

import Link from "next/link";
import { useState } from "react";

import { userProfile } from "./dashboardData";

type NotifType = "booster-assigned" | "order-paused" | "new-message" | "order-completed" | "order-started" | "order-suspended";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  subtitle: string;
  orderInfo?: string;
  action?: { label: string };
  time: string;
  unread: boolean;
};

const NOTIF_ICON: Record<NotifType, { icon: string; bg: string }> = {
  "booster-assigned": { icon: "/images/dashboard/icons/notif-person-check.svg", bg: "rgba(255,92,0,0.2)" },
  "order-paused": { icon: "/images/dashboard/icons/notif-paused.svg", bg: "rgba(255,176,0,0.2)" },
  "new-message": { icon: "/images/dashboard/icons/notif-message.svg", bg: "#383852" },
  "order-completed": { icon: "/images/dashboard/icons/notif-order-complete.svg", bg: "rgba(52,168,83,0.2)" },
  "order-started": { icon: "/images/dashboard/icons/notif-order-started.svg", bg: "rgba(66,133,244,0.2)" },
  "order-suspended": { icon: "/images/dashboard/icons/notif-order-suspended.svg", bg: "rgba(108,31,209,0.2)" },
};

const todayNotifs: Notification[] = [
  {
    id: "t1",
    type: "booster-assigned",
    title: "Booster Assigned",
    subtitle: "Booster @AmazingBooster was assigned to your order:",
    orderInfo: "Valorant • Rank Boosting • Silver II — Platinum III",
    action: { label: "TRACK ORDER" },
    time: "3m ago",
    unread: true,
  },
  {
    id: "t2",
    type: "order-paused",
    title: "Order Paused",
    subtitle: "Booster @AmazingBooster has paused your order:",
    orderInfo: "Valorant • Rank Boosting • Silver II — Platinum III",
    action: { label: "TRACK ORDER" },
    time: "30m ago",
    unread: true,
  },
  {
    id: "t3",
    type: "new-message",
    title: "New Message",
    subtitle: "Booster @AmazingBooster has sent you a message.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "t4",
    type: "order-completed",
    title: "Order Completed",
    subtitle: "Booster @AmazingBooster has completed your order:",
    orderInfo: "Valorant • Rank Boosting • Silver II — Platinum III",
    action: { label: "VIEW ORDER" },
    time: "4h ago",
    unread: true,
  },
];

const olderNotifs: Notification[] = [
  {
    id: "o1",
    type: "new-message",
    title: "New Message",
    subtitle: "Booster @epicBooster has sent you a message.",
    time: "1d ago",
    unread: false,
  },
  {
    id: "o2",
    type: "order-started",
    title: "Order Started",
    subtitle: "Booster @AmazingBooster has started your order:",
    orderInfo: "Valorant • Rank Boosting • Silver II — Platinum III",
    action: { label: "TRACK PROGRESS" },
    time: "1d ago",
    unread: false,
  },
  {
    id: "o3",
    type: "order-suspended",
    title: "Order Suspended",
    subtitle: "Booster @AmazingBooster has started your order:",
    orderInfo: "Valorant • Rank Boosting • Silver II — Platinum III",
    action: { label: "TRACK PROGRESS" },
    time: "1d ago",
    unread: false,
  },
  {
    id: "o4",
    type: "new-message",
    title: "New Message",
    subtitle: "Booster @epicBooster has sent you a message.",
    time: "2d ago",
    unread: false,
  },
  {
    id: "o5",
    type: "new-message",
    title: "New Message",
    subtitle: "Booster @AmazingBooster has sent you a message.",
    time: "2d ago",
    unread: false,
  },
];

function NotifCard({ notif }: { notif: Notification }) {
  const cfg = NOTIF_ICON[notif.type];
  return (
    <div
      className="relative flex cursor-pointer gap-4 overflow-hidden rounded-3xl px-6 py-6 transition-colors hover:bg-[rgba(56,56,82,0.7)] lg:gap-6 lg:px-8"
      style={{ background: "rgba(56,56,82,0.5)" }}
    >
      {notif.unread && (
        <div className="absolute left-0 top-0 h-full w-2" style={{ background: "#34a853" }} />
      )}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full lg:h-16 lg:w-16"
        style={{ background: cfg.bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cfg.icon} alt="" className="h-6 w-6 lg:h-8 lg:w-8" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 lg:gap-4">
        <div className="flex flex-col gap-1 lg:gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="font-body text-base font-bold text-white lg:text-xl lg:leading-[30px]">
              {notif.title}
            </span>
            <span className="shrink-0 font-body text-sm text-brand-light lg:text-base">
              {notif.time}
            </span>
          </div>
          <p className="font-body text-sm text-white lg:text-base">{notif.subtitle}</p>
          {notif.orderInfo && (
            <span className="font-body text-sm font-medium text-brand-light lg:text-base">
              {notif.orderInfo}
            </span>
          )}
        </div>
        {notif.action && (
          <button
            type="button"
            className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-70 lg:text-base"
          >
            {notif.action.label}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/notif-action-arrow.svg"
              alt=""
              className="h-5 w-5 rotate-90 lg:h-6 lg:w-6"
            />
          </button>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dashboard/icons/notif-arrow-right.svg"
        alt=""
        className="hidden h-6 w-3 shrink-0 self-center lg:block"
      />
    </div>
  );
}

function RightSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://ogedge.com/en/login?referral=I28H0T");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Profile + Actions card */}
      <div
        className="flex flex-col gap-12 overflow-hidden rounded-3xl px-8 py-6"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        {/* User info */}
        <div className="flex items-center gap-4">
          <div className="h-[90px] w-[90px] shrink-0 overflow-hidden rounded-full bg-dark-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={userProfile.avatarUrl} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col text-white">
              <span className="font-body text-xl">Welcome,</span>
              <span className="font-heading text-[32px] font-semibold">{userProfile.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase"
                style={{ background: "rgba(255,92,0,0.2)", color: "#ff5c00" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/medal-star-orange.svg" alt="" className="h-4 w-4" />
                {userProfile.tierName}
              </span>
              <span
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
                style={{ background: "rgba(52,168,83,0.2)", color: "#34a853" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/wallet-green.svg" alt="" className="h-4 w-4" />
                {userProfile.walletBalance}
              </span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/custom-order"
            className="flex items-center justify-center gap-4 rounded-2xl p-8 transition-colors hover:bg-[rgba(0,0,0,0.35)]"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/new-order-pen.svg" alt="" className="h-[54px] w-[54px] shrink-0" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-body text-2xl font-bold uppercase text-white">New Order</span>
              <span className="font-body text-sm text-white">Get Started</span>
            </div>
          </Link>
          <Link
            href="/app/customer/support"
            className="flex items-center justify-center gap-4 rounded-2xl p-8 transition-colors hover:bg-[rgba(0,0,0,0.35)]"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/support-icon.svg" alt="" className="h-[54px] w-[54px] shrink-0" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-body text-2xl font-bold uppercase text-white">
                Customer Support
              </span>
              <span className="font-body text-sm text-white">Create Ticket</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Affiliate Program card */}
      <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/referral-icon.svg" alt="" className="h-6 w-6" />
              <span className="font-body text-xs font-bold uppercase text-brand-light">
                Affiliate Program
              </span>
            </div>
            <p className="font-body text-xl font-bold leading-7 tracking-[-0.4px] text-white">
              Earn <span className="text-brand-light">10%</span> off every{" "}
              <span className="text-brand-light">conversion</span>, give them{" "}
              <span className="text-brand-light">15% off</span>
            </p>
            <p className="font-body text-sm text-white">
              Share your code. They get a discount on their first order, you get rewarded right
              after they checkout.
            </p>
          </div>

          <div className="h-[50px] w-px bg-dark-border" />

          <div className="flex flex-col items-center gap-1">
            <span className="font-body text-xs font-bold uppercase text-white/50">
              Your Affiliate Code
            </span>
            <span className="font-heading text-[30px] font-bold uppercase leading-[38px] text-brand-main">
              GAMER
            </span>
            <span className="font-body text-sm text-white/50">1522 conversions</span>
          </div>
        </div>

        <div
          className="flex items-center gap-6 rounded-2xl px-6 py-4"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span className="flex-1 truncate font-mono text-sm text-white">
            https://ogedge.com/en/login?referral=I28H0T
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-2.5 rounded-lg bg-brand-main px-4 py-3 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-85"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-6 w-6" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}

export default function NotificationCenterPage() {
  const [filter, setFilter] = useState<"all" | "messages" | "orders">("all");

  const filterToday =
    filter === "all"
      ? todayNotifs
      : filter === "messages"
        ? todayNotifs.filter((n) => n.type === "new-message")
        : todayNotifs.filter((n) => n.type !== "new-message");

  const filterOlder =
    filter === "all"
      ? olderNotifs
      : filter === "messages"
        ? olderNotifs.filter((n) => n.type === "new-message")
        : olderNotifs.filter((n) => n.type !== "new-message");

  const tabs: { key: typeof filter; label: string; icon: string }[] = [
    { key: "all", label: "All", icon: "/images/dashboard/icons/notif-filter-all.svg" },
    { key: "messages", label: "Messages", icon: "/images/dashboard/icons/notif-filter-unread.svg" },
    { key: "orders", label: "Orders", icon: "/images/dashboard/icons/notif-orders-tab.svg" },
  ];

  return (
    <>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="font-body text-xl font-bold text-white lg:font-heading lg:text-[30px] lg:font-bold lg:leading-[38px]">
          Notification Center
        </h1>
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl bg-dark-surface px-4 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-70 lg:px-6 lg:py-4 lg:text-base"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/notif-check-all.svg" alt="" className="h-3.5 w-3.5" />
          Mark all as read
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        {/* Left: notifications */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`flex h-[50px] items-center justify-center gap-2 rounded-2xl border px-4 font-body text-base font-medium transition-all lg:px-6 ${
                    active
                      ? "border-brand-light bg-[rgba(0,0,0,0.2)] text-brand-main shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
                      : "border-dark-border bg-[rgba(0,0,0,0.2)] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tab.icon} alt="" className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Today */}
          {filterToday.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="font-body text-sm font-bold uppercase text-white">Today</span>
              <div className="flex flex-col gap-4">
                {filterToday.map((n) => (
                  <NotifCard key={n.id} notif={n} />
                ))}
              </div>
            </div>
          )}

          {/* Older */}
          {filterOlder.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="font-body text-sm font-bold uppercase text-white">Older</span>
              <div className="flex flex-col gap-4">
                {filterOlder.map((n) => (
                  <NotifCard key={n.id} notif={n} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar — desktop only */}
        <div className="hidden xl:flex xl:w-[490px] xl:shrink-0 xl:flex-col xl:gap-6">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
