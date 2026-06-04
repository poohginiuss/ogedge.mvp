"use client";

import Link from "next/link";
import { useState } from "react";
import type { TableOrder } from "../activeOrdersData";
import { CopyButton } from "../atoms";
import {
  ChatIcon,
  DetailTags,
  MOBILE_CARD_BG,
  MobileCardShell,
  MobileDetailRow,
  Pagination,
  RowShell,
  StarRating,
  StatusPill,
  TablePageHeader,
  ViewLink,
  usePageSize,
} from "../orderTableShared";

// ─── Column config ────────────────────────────────────────────────────────────

const COLS = [
  { label: "ID", width: "w-[7%]", cls: "pl-6" },
  { label: "Game", width: "w-[10%]", cls: "pl-6" },
  { label: "Service", width: "w-[14%]", cls: "pl-6" },
  { label: "Details", width: "min-w-[200px] flex-1", cls: "pl-6" },
  { label: "Employee", width: "w-[8%]", cls: "text-center" },
  { label: "Status", width: "w-[15%]", cls: "text-center" },
  { label: "Chat", width: "w-[7%]", cls: "text-center" },
  { label: "Actions", width: "w-[7%]", cls: "text-center" },
] as const;

// ─── Desktop row ──────────────────────────────────────────────────────────────

function DesktopRow({ order }: { order: TableOrder }) {
  return (
    <RowShell>
      <div className="w-[7%] pl-6">
        <span className="flex items-center gap-1.5">
          <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
            {order.orderId}
          </span>
          <CopyButton
            ariaLabel="Copy order ID"
            onCopy={() => navigator.clipboard.writeText(order.orderId)}
          />
        </span>
      </div>

      <div className="w-[10%] pl-6">
        <span className="font-body text-base font-semibold text-white">{order.game}</span>
      </div>

      <div className="w-[14%] pl-6">
        <p className="font-body text-base font-semibold text-white">{order.service}</p>
        <p className="font-body text-sm font-bold text-white">{order.rangeLabel}</p>
      </div>

      <div className="min-w-[200px] flex-1 pl-6">
        <DetailTags tags={order.details} />
      </div>

      <div className="flex w-[8%] flex-col items-center gap-2">
        <span className="font-body text-base text-white">{order.employeeName}</span>
        <StarRating rating={order.employeeRating} />
      </div>

      <div className="flex w-[15%] items-center justify-center">
        <StatusPill status={order.tableStatus} />
      </div>

      <div className="flex w-[7%] items-center justify-center p-6">
        <ChatIcon active={order.chatActive} />
      </div>

      <div className="flex w-[7%] items-center justify-center px-8">
        <ViewLink orderId={order.orderId} />
      </div>
    </RowShell>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ order }: { order: TableOrder }) {
  return (
    <MobileCardShell order={order} showChat>
      <MobileDetailRow label="ID" striped={false}>
        {order.orderId}
      </MobileDetailRow>
      <MobileDetailRow label="Game" striped>
        {order.game}
      </MobileDetailRow>
      <MobileDetailRow label="Service" striped={false}>
        {order.service}: {order.rangeLabel}
      </MobileDetailRow>

      {/* Details tags */}
      <div
        className="flex items-start justify-between gap-2 rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="shrink-0 font-body text-sm text-white/80">Details</span>
        <DetailTags tags={order.details} />
      </div>

      <MobileDetailRow label="Employee" striped={false}>
        <span className="flex items-center gap-2">
          {order.employeeName} <StarRating rating={order.employeeRating} />
        </span>
      </MobileDetailRow>
    </MobileCardShell>
  );
}

// ─── Small laptop compact card (lg → 1500px) ─────────────────────────────────

function CompactCard({ order }: { order: TableOrder }) {
  return (
    <div
      className="flex flex-col gap-2 rounded-3xl px-6 py-5"
      style={{ backgroundImage: MOBILE_CARD_BG }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-body text-base font-semibold text-[#ff975d]">{order.orderId}</span>
          <CopyButton
            ariaLabel="Copy order ID"
            onCopy={() => navigator.clipboard.writeText(order.orderId)}
          />
        </div>
        <div className="flex items-center gap-3">
          <ChatIcon active={order.chatActive} />
          <StatusPill status={order.tableStatus} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-heading text-xl font-bold text-white">{order.game}</span>
          <span className="font-body text-base text-white">{order.service}</span>
          <span className="font-body text-sm text-white/70">{order.rangeLabel}</span>
          <div className="mt-1 flex items-center gap-1">
            <span className="font-body text-sm font-semibold text-white">{order.employeeName}</span>
            <StarRating rating={order.employeeRating} />
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <DetailTags tags={order.details} />
        <Link
          href={`/app/customer/orders/${order.orderId}`}
          className="flex shrink-0 items-center justify-center rounded-2xl px-6 py-2.5 font-body text-sm font-bold uppercase tracking-wide text-white transition-all hover:border-[#ff975d] hover:text-[#ff975d] hover:shadow-[0_0_12px_rgba(255,92,0,0.3)] active:scale-[0.97]"
          style={{
            background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
            border: "1px solid #6d6d96",
          }}
        >
          View Order
        </Link>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = { orders: TableOrder[]; onPurchaseBoost: () => void; onSupport?: () => void };

export function ActiveOrdersTable({ orders, onPurchaseBoost, onSupport }: Props) {
  const pageSize = usePageSize();
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const visible = orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-1 flex-col gap-8">
      <TablePageHeader title="My Orders" onPurchaseBoost={onPurchaseBoost} onSupport={onSupport} />

      {/* Desktop table (1500px+) */}
      <div className="hidden min-[1500px]:block">
        <div className="flex w-full flex-col gap-0">
          {/* Header */}
          <div className="flex w-full items-center">
            {COLS.map((col) => (
              <div key={col.label} className={`${col.width} py-1 ${col.cls}`}>
                <span className="font-body text-sm font-bold text-white/80">{col.label}</span>
              </div>
            ))}
          </div>
          {/* Rows */}
          <div className="flex flex-col gap-4">
            {visible.map((order) => (
              <DesktopRow key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>

      {/* Small laptop compact cards (1024px to 1500px) */}
      <div className="hidden min-[1024px]:flex min-[1024px]:flex-col min-[1024px]:gap-4 min-[1500px]:hidden">
        {visible.map((order) => (
          <CompactCard key={order.id} order={order} />
        ))}
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 min-[1024px]:hidden">
        {visible.map((order) => (
          <MobileCard key={order.id} order={order} />
        ))}
      </div>

      <Pagination page={page} total={totalPages} onPage={setPage} />
    </div>
  );
}
