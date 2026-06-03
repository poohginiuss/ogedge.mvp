"use client";

import Link from "next/link";
import { useState } from "react";
import type { TableOrder } from "../activeOrdersData";
import { CopyButton } from "../atoms";
import {
  DetailTags,
  MobileCardShell,
  MobileDetailRow,
  Pagination,
  RowShell,
  StatusPill,
  TablePageHeader,
  ViewLink,
  usePageSize,
  MOBILE_CARD_BG,
} from "../orderTableShared";

// ─── Column config ────────────────────────────────────────────────────────────
// No Employee or Chat columns. Details grows to fill available width (flex-1).

const FIXED_COLS = [
  { label: "ID", cls: "w-[8%] pl-6" },
  { label: "Game", cls: "w-[12%] pl-6" },
  { label: "Service", cls: "w-[14%] pl-6" },
  { label: "Details", cls: "min-w-[200px] flex-1 pl-6" },
  { label: "Status", cls: "w-[15%] text-center" },
  { label: "Actions", cls: "w-[8%] text-center" },
] as const;

// ─── Desktop row ──────────────────────────────────────────────────────────────

function DesktopRow({ order }: { order: TableOrder }) {
  return (
    <RowShell>
      {/* ID */}
      <div className="w-[8%] pl-6">
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

      {/* Game */}
      <div className="w-[12%] pl-6">
        <span className="font-body text-base font-semibold text-white">{order.game}</span>
      </div>

      {/* Service */}
      <div className="w-[14%] pl-6">
        <p className="font-body text-base font-semibold text-white">{order.service}</p>
        <p className="font-body text-sm font-bold text-white">{order.rangeLabel}</p>
      </div>

      {/* Details — grows to fill remaining space */}
      <div className="min-w-[200px] flex-1 pl-6">
        <DetailTags tags={order.details} />
      </div>

      {/* Status */}
      <div className="flex w-[15%] items-center justify-center">
        <StatusPill status={order.tableStatus} />
      </div>

      {/* Actions */}
      <div className="flex w-[8%] items-center justify-center px-8">
        <ViewLink orderId={order.orderId} />
      </div>
    </RowShell>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ order }: { order: TableOrder }) {
  return (
    <MobileCardShell order={order} showChat={false}>
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
        <StatusPill status={order.tableStatus} />
      </div>

      <div className="flex flex-col">
        <span className="font-heading text-xl font-bold text-white">{order.game}</span>
        <span className="font-body text-base text-white">{order.service}</span>
        <span className="font-body text-sm text-white/70">{order.rangeLabel}</span>
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

export function CompletedOrdersTable({ orders, onPurchaseBoost, onSupport }: Props) {
  const pageSize = usePageSize();
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const visible = orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-8">
      <TablePageHeader
        title="Completed Orders"
        onPurchaseBoost={onPurchaseBoost}
        onSupport={onSupport}
      />

      {/* Desktop table (1500px+) */}
      <div className="hidden min-[1500px]:block">
        <div className="flex w-full flex-col gap-0">
          {/* Header */}
          <div className="flex w-full items-center">
            {FIXED_COLS.map((col) => (
              <div key={col.label} className={`${col.cls} py-1`}>
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

      {/* Small laptop compact cards (lg to 1500px) */}
      <div className="hidden lg:flex lg:flex-col lg:gap-4 min-[1500px]:hidden">
        {visible.map((order) => (
          <CompactCard key={order.id} order={order} />
        ))}
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {visible.map((order) => (
          <MobileCard key={order.id} order={order} />
        ))}
      </div>

      <Pagination page={page} total={totalPages} onPage={setPage} />
    </div>
  );
}
