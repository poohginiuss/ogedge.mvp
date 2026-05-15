"use client";

import { useState } from "react";
import type { TableOrder } from "../activeOrdersData";
import { CopyButton } from "../atoms";
import {
  DetailTags,
  MobileCardShell,
  MobileDetailRow,
  PAGE_SIZE,
  Pagination,
  RowShell,
  StatusPill,
  TablePageHeader,
  ViewLink,
} from "../orderTableShared";

// ─── Column config ────────────────────────────────────────────────────────────
// No Employee or Chat columns. Details grows to fill available width (flex-1).

const FIXED_COLS = [
  { label: "ID", cls: "w-[120px] shrink-0", align: "" },
  { label: "Game", cls: "w-[250px] shrink-0", align: "" },
  { label: "Service", cls: "w-[250px] shrink-0", align: "" },
  // Details is flex-grow so it fills the gap left by removed Employee/Chat
  { label: "Details", cls: "min-w-[300px] flex-1", align: "" },
  { label: "Status", cls: "w-[230px] shrink-0", align: "text-center" },
  { label: "Actions", cls: "w-[170px] shrink-0", align: "text-center" },
] as const;

// ─── Desktop row ──────────────────────────────────────────────────────────────

function DesktopRow({ order }: { order: TableOrder }) {
  return (
    <RowShell>
      {/* ID */}
      <div className="w-[120px] shrink-0 pl-6">
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
      <div className="w-[250px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold text-white">{order.game}</span>
      </div>

      {/* Service */}
      <div className="w-[250px] shrink-0 pl-6">
        <p className="font-body text-base font-semibold text-white">{order.service}</p>
        <p className="font-body text-sm font-bold text-white">{order.rangeLabel}</p>
      </div>

      {/* Details — grows to fill remaining space */}
      <div className="min-w-[300px] flex-1 pl-6">
        <DetailTags tags={order.details} />
      </div>

      {/* Status */}
      <div className="flex w-[230px] shrink-0 items-center justify-center">
        <StatusPill status={order.tableStatus} />
      </div>

      {/* Actions */}
      <div className="flex w-[170px] shrink-0 items-center justify-center px-8">
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
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
        <div className="flex min-w-[1020px] w-full flex-col gap-0">
          {/* Header */}
          <div className="flex w-full items-center">
            {FIXED_COLS.map((col) => (
              <div key={col.label} className={`${col.cls} py-1 pl-6 ${col.align}`}>
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
