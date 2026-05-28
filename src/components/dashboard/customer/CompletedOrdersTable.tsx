"use client";

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

      {/* Desktop table — full width, scrolls horizontally only when very narrow */}
      <div className="hidden overflow-x-auto lg:block">
        {/* min-w keeps columns from crushing on edge-case narrow viewports */}
        <div className="flex min-w-[1280px] w-full flex-col gap-0">
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
