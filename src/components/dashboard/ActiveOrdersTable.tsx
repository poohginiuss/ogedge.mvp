"use client";

import { useState } from "react";
import type { TableOrder } from "./activeOrdersData";
import {
  ChatIcon,
  DetailTags,
  MobileCardShell,
  MobileDetailRow,
  PAGE_SIZE,
  Pagination,
  RowShell,
  StarRating,
  StatusPill,
  TablePageHeader,
  ViewLink,
} from "./orderTableShared";

// ─── Column config ────────────────────────────────────────────────────────────

const COLS = [
  { label: "ID",       width: "w-[120px]",  align: ""            },
  { label: "Game",     width: "w-[250px]",  align: ""            },
  { label: "Service",  width: "w-[250px]",  align: ""            },
  { label: "Details",  width: "w-[350px]",  align: ""            },
  { label: "Employee", width: "w-[120px]",  align: "text-center" },
  { label: "Status",   width: "w-[230px]",  align: "text-center" },
  { label: "Chat",     width: "w-[170px]",  align: "text-center" },
  { label: "Actions",  width: "w-[170px]",  align: "text-center" },
] as const;

// ─── Desktop row ──────────────────────────────────────────────────────────────

function DesktopRow({ order }: { order: TableOrder }) {
  return (
    <RowShell>
      <div className="w-[120px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold" style={{ color: "#ff975d" }}>
          {order.orderId}
        </span>
      </div>

      <div className="w-[250px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold text-white">{order.game}</span>
      </div>

      <div className="w-[250px] shrink-0 pl-6">
        <p className="font-body text-base font-semibold text-white">{order.service}</p>
        <p className="font-body text-sm font-bold text-white">{order.rangeLabel}</p>
      </div>

      <div className="w-[350px] shrink-0 pl-6">
        <DetailTags tags={order.details} />
      </div>

      <div className="flex w-[120px] shrink-0 flex-col items-center gap-2">
        <span className="font-body text-base text-white">{order.employeeName}</span>
        <StarRating rating={order.employeeRating} />
      </div>

      <div className="flex w-[230px] shrink-0 items-center justify-center">
        <StatusPill status={order.tableStatus} />
      </div>

      <div className="flex w-[170px] shrink-0 items-center justify-center p-6">
        <ChatIcon active={order.chatActive} />
      </div>

      <div className="flex w-[170px] shrink-0 items-center justify-center px-8">
        <ViewLink orderId={order.orderId} />
      </div>
    </RowShell>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ order }: { order: TableOrder }) {
  return (
    <MobileCardShell order={order} showChat>
      <MobileDetailRow label="ID" striped={false}>{order.orderId}</MobileDetailRow>
      <MobileDetailRow label="Game" striped>{order.game}</MobileDetailRow>
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

      <div
        className="flex items-center justify-between rounded-lg px-2 py-1"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <span className="font-body text-sm text-white/80">Status</span>
        <StatusPill status={order.tableStatus} />
      </div>
    </MobileCardShell>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = { orders: TableOrder[]; onPurchaseBoost: () => void };

export function ActiveOrdersTable({ orders, onPurchaseBoost }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <TablePageHeader title="My Orders" onPurchaseBoost={onPurchaseBoost} />

      {/* Desktop table — scrolls horizontally when narrower than column total */}
      <div className="hidden overflow-x-auto lg:block">
        <div className="flex w-max flex-col gap-0">
          {/* Header */}
          <div className="flex items-center">
            {COLS.map((col) => (
              <div key={col.label} className={`${col.width} shrink-0 py-1 pl-6 ${col.align}`}>
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
