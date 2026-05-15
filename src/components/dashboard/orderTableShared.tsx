"use client";

import Link from "next/link";
import { useState } from "react";
import type { DetailTag, TableOrder, TableOrderStatus } from "./activeOrdersData";

// ─── Constants ────────────────────────────────────────────────────────────────

export const ROW_BG_DEFAULT =
  "linear-gradient(178.69deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)";
export const ROW_BG_HOVER =
  "linear-gradient(178.69deg, rgba(56,56,82,0.6) 0%, rgba(43,45,77,0.6) 50%, rgba(13,15,21,0.6) 100%)";
export const MOBILE_CARD_BG =
  "linear-gradient(158.03deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)";

export const PAGE_SIZE = 5;

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_THEME: Record<
  TableOrderStatus,
  { label: string; bg: string; shadow: string; textColor: string; icon: string }
> = {
  "waiting-for-booster": {
    label: "Waiting for Booster",
    bg: "#c2272d",
    shadow: "none",
    textColor: "#fff",
    icon: "waiting",
  },
  "assigned-booster": {
    label: "Booster Assigned",
    bg: "#ff5c00",
    shadow: "0 4px 7px rgba(255,92,0,0.4)",
    textColor: "#fff",
    icon: "assigned",
  },
  started: {
    label: "Started",
    bg: "#4285f4",
    shadow: "0 4px 7px rgba(66,133,244,0.4)",
    textColor: "#fff",
    icon: "started",
  },
  paused: {
    label: "Paused",
    bg: "#ffb000",
    shadow: "0 4px 7px rgba(255,176,0,0.4)",
    textColor: "#17191f",
    icon: "paused",
  },
  completed: {
    label: "Completed",
    bg: "#34a853",
    shadow: "0 4px 7px rgba(52,168,83,0.4)",
    textColor: "#fff",
    icon: "completed",
  },
};

function StatusIcon({ icon }: { icon: string }) {
  if (icon === "waiting") {
    return (
      <span className="relative h-4 w-4 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/orderview/icons/status-waiting-2.svg"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/orderview/icons/status-waiting-1.svg"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/dashboard/orderview/icons/status-${icon}.svg`}
      alt=""
      className="h-4 w-4 shrink-0"
    />
  );
}

export function StatusPill({ status }: { status: TableOrderStatus }) {
  const t = STATUS_THEME[status];
  return (
    <div
      className="flex w-[180px] shrink-0 items-center justify-between rounded-lg px-3 py-2"
      style={{ background: t.bg, boxShadow: t.shadow, color: t.textColor }}
    >
      <span className="font-body text-xs font-semibold uppercase leading-none">{t.label}</span>
      <StatusIcon icon={t.icon} />
    </div>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dashboard/orderview/icons/star-small.svg" alt="" className="-mr-2 h-7 w-7" />
      <span className="font-body text-xs font-bold" style={{ color: "#ff975d" }}>
        {rating}
      </span>
    </span>
  );
}

// ─── Detail tags ──────────────────────────────────────────────────────────────

export function DetailTags({ tags }: { tags: DetailTag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase leading-none"
          style={{ background: tag.bg, color: tag.color }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

// ─── Reusable row shell ───────────────────────────────────────────────────────
// Wraps children in the gradient row container with hover state

export function RowShell({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex h-[100px] shrink-0 cursor-default items-center rounded-3xl transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

// ─── View link ────────────────────────────────────────────────────────────────

export function ViewLink({ orderId }: { orderId: string }) {
  return (
    <Link
      href={`/app/customer/orders/${orderId}`}
      className="font-body text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-brand-light"
    >
      VIEW
    </Link>
  );
}

// ─── Chat icon ────────────────────────────────────────────────────────────────

export function ChatIcon({ active }: { active?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={
        active
          ? "/images/dashboard/orderview/icons/chat-refresh.svg"
          : "/images/dashboard/orderview/icons/chat-bubble.svg"
      }
      alt="Chat"
      className="h-6 w-6"
    />
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

/** Compute the list of page numbers (and "…" separators) to display. */
function buildPageItems(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  // Collect pages that must always appear
  const must = new Set<number>([1, total]);

  // Current page and its immediate neighbors
  must.add(Math.max(1, current - 1));
  must.add(current);
  must.add(Math.min(total, current + 1));

  // If near the start, anchor first few
  if (current <= 3) { must.add(2); must.add(3); }

  // If near the end, anchor last few
  if (current >= total - 2) { must.add(total - 2); must.add(total - 1); }

  const sorted = Array.from(must).sort((a, b) => a - b);

  // Insert "…" wherever there's a gap > 1
  const items: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) items.push("…");
    items.push(sorted[i]);
  }
  return items;
}

export function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const BTN =
    "flex h-10 w-10 items-center justify-center rounded-lg font-body text-base font-bold";
  const INACTIVE = "border border-dark-border bg-black/20 text-white/50";
  const ACTIVE = "bg-brand-main text-white";
  const NAV = "border border-dark-border bg-black/20";

  const items = buildPageItems(page, total);

  return (
    <div className="flex w-full items-center justify-center gap-1">
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`${BTN} ${NAV} ${page === 1 ? "opacity-20" : ""}`}
        aria-label="Previous page"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/orderview/icons/pag-arrow-left.svg"
          alt=""
          className="h-6 w-3 rotate-180 scale-y-[-1]"
        />
      </button>

      {items.map((item, idx) =>
        item === "…" ? (
          <div key={`ellipsis-${idx}`} className={`${BTN} ${INACTIVE} pointer-events-none`}>
            …
          </div>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPage(item)}
            className={`${BTN} ${page === item ? ACTIVE : INACTIVE}`}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPage(Math.min(total, page + 1))}
        disabled={page === total}
        className={`${BTN} ${NAV} ${page === total ? "opacity-20" : ""}`}
        aria-label="Next page"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/orderview/icons/pag-arrow-right.svg"
          alt=""
          className="h-6 w-3 rotate-180 scale-y-[-1]"
        />
      </button>
    </div>
  );
}

// ─── Page header (shared between both tables) ─────────────────────────────────

export function TablePageHeader({
  title,
  onPurchaseBoost,
}: {
  title: string;
  onPurchaseBoost: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="font-heading text-2xl font-semibold text-white lg:text-[32px]">{title}</h2>

      {/* Desktop */}
      <div className="hidden lg:block">
        <button
          type="button"
          onClick={onPurchaseBoost}
          className="flex items-center rounded-3xl border border-brand-light px-8 py-6 font-body text-xl font-bold uppercase tracking-wide text-white drop-shadow-[0_4px_12px_rgba(255,92,0,0.4)]"
          style={{ background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)" }}
        >
          PURCHASE BOOST
        </button>
      </div>

      {/* Mobile */}
      <div className="flex flex-1 items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onPurchaseBoost}
          className="flex flex-1 items-center justify-center rounded-2xl border border-brand-light px-8 py-3 font-body text-base font-bold uppercase text-white"
          style={{ background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)" }}
        >
          PURCHASE BOOST
        </button>
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: "rgba(56,56,82,0.3)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/orderview/icons/mobile-options.svg"
            alt="Options"
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
}

// ─── Mobile card base ─────────────────────────────────────────────────────────
// Renders the common card shell + ID header row for both table variants.

export function MobileCardShell({
  order,
  showChat,
  children,
}: {
  order: TableOrder;
  showChat?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-3xl p-4" style={{ backgroundImage: MOBILE_CARD_BG }}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/orderview/icons/order-details-icon.svg"
            alt=""
            className="h-6 w-6"
          />
          <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
            {order.orderId}
          </span>
          <button type="button" aria-label="Copy order ID">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/orderview/icons/copy-icon.svg"
              alt=""
              className="h-4 w-4 opacity-60"
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {showChat && <ChatIcon active={order.chatActive} />}
          <ViewLink orderId={order.orderId} />
        </div>
      </div>

      {/* Slot for table-specific rows */}
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}

// Helper for zebra-striped detail rows inside mobile card
export function MobileDetailRow({
  label,
  striped,
  children,
}: {
  label: string;
  striped?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-2 py-1"
      style={{ background: striped ? "rgba(0,0,0,0.2)" : undefined }}
    >
      <span className="font-body text-sm text-white/80">{label}</span>
      <span className="font-body text-sm font-semibold text-white">{children}</span>
    </div>
  );
}
