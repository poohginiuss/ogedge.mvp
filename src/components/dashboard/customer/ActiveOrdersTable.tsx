"use client";

import { useState } from "react";
import type { TableOrder } from "../activeOrdersData";
import { CopyButton } from "../atoms";
import {
  ChatIcon,
  DetailTags,
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

      {/* Desktop table — scrolls horizontally when narrower than column total */}
      <div className="hidden overflow-x-auto lg:block">
        <div className="flex min-w-[1280px] w-full flex-col gap-0">
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
