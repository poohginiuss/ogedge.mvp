"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyButton } from "../atoms";
import {
  DetailTags,
  MOBILE_CARD_BG,
  PAGE_SIZE,
  Pagination,
  RowShell,
  StatusPill,
  TablePageHeader,
  ViewLink,
} from "../orderTableShared";
import type { BoosterTableOrder } from "./boosterTableData";

type BoosterTableVariant = "available" | "my-orders" | "completed";

const VARIANT_CONFIG: Record<
  BoosterTableVariant,
  { title: string; showClaim: boolean; showChat: boolean }
> = {
  available: { title: "Available Orders", showClaim: true, showChat: false },
  "my-orders": { title: "My Orders", showClaim: false, showChat: true },
  completed: { title: "Completed Orders", showClaim: false, showChat: false },
};

const COLS = [
  { label: "ID", cls: "w-[120px] shrink-0", align: "" },
  { label: "Game", cls: "w-[250px] shrink-0", align: "" },
  { label: "Service", cls: "w-[250px] shrink-0", align: "" },
  { label: "Details", cls: "min-w-[250px] flex-1", align: "" },
  { label: "Earning", cls: "w-[120px] shrink-0", align: "text-center" },
  { label: "Status", cls: "w-[230px] shrink-0", align: "text-center" },
  { label: "Actions", cls: "w-[170px] shrink-0", align: "text-center" },
] as const;

function DesktopRow({
  order,
  variant,
}: {
  order: BoosterTableOrder;
  variant: BoosterTableVariant;
}) {
  const cfg = VARIANT_CONFIG[variant];
  return (
    <RowShell>
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

      <div className="w-[250px] shrink-0 pl-6">
        <span className="font-body text-base font-semibold text-white">{order.game}</span>
      </div>

      <div className="w-[250px] shrink-0 pl-6">
        <p className="font-body text-base font-semibold text-white">{order.service}</p>
        <p className="font-body text-sm font-bold text-white/70">{order.rangeLabel}</p>
      </div>

      <div className="min-w-[250px] flex-1 pl-6">
        <DetailTags tags={order.details} />
      </div>

      <div className="flex w-[120px] shrink-0 items-center justify-center">
        <span className="font-body text-base font-bold text-[#1aad19]">{order.earning}</span>
      </div>

      <div className="flex w-[230px] shrink-0 items-center justify-center">
        <StatusPill status={order.tableStatus} />
      </div>

      <div className="flex w-[170px] shrink-0 items-center justify-center gap-3 px-4">
        {cfg.showClaim && order.canClaim && (
          <button
            type="button"
            className="rounded-xl px-4 py-2 font-body text-sm font-bold uppercase text-white"
            style={{ background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)" }}
          >
            Claim
          </button>
        )}
        <ViewLink orderId={order.orderId} />
      </div>
    </RowShell>
  );
}

function MobileCard({
  order,
  variant,
}: {
  order: BoosterTableOrder;
  variant: BoosterTableVariant;
}) {
  const cfg = VARIANT_CONFIG[variant];
  return (
    <div className="flex flex-col rounded-3xl p-4" style={{ backgroundImage: MOBILE_CARD_BG }}>
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
          <CopyButton
            ariaLabel="Copy order ID"
            onCopy={() => navigator.clipboard.writeText(order.orderId)}
          />
        </div>

        {cfg.showChat && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={
              order.chatActive
                ? "/images/dashboard/orderview/icons/chat-refresh.svg"
                : "/images/dashboard/orderview/icons/chat-bubble.svg"
            }
            alt="Chat"
            className="h-6 w-6"
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg px-2 py-1">
        <StatusPill status={order.tableStatus} />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <DetailRow label="Game" striped={false}>
          {order.game}
        </DetailRow>
        <DetailRow label="Service" striped>
          {order.service}: {order.rangeLabel}
        </DetailRow>
        <div
          className="flex items-start justify-between gap-2 rounded-lg px-2 py-1"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span className="shrink-0 font-body text-sm text-white/80">Details</span>
          <DetailTags tags={order.details} />
        </div>
        <DetailRow label="Earning" striped>
          <span className="font-bold text-[#1aad19]">{order.earning}</span>
        </DetailRow>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {cfg.showClaim && order.canClaim && (
          <button
            type="button"
            className="flex-1 rounded-2xl py-3 text-center font-body text-base font-bold uppercase text-white"
            style={{ background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)" }}
          >
            CLAIM
          </button>
        )}
        <Link
          href={`/app/customer/orders/${order.orderId}`}
          className="flex flex-1 items-center justify-center rounded-2xl py-3 font-body text-base font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_0_12px_rgba(255,92,0,0.3)]"
          style={{
            background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
            border: "1px solid #6d6d96",
          }}
        >
          VIEW ORDER
        </Link>
      </div>
    </div>
  );
}

function DetailRow({
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

type Props = {
  variant: BoosterTableVariant;
  orders: BoosterTableOrder[];
  onSupport?: () => void;
};

export function BoosterOrdersTable({ variant, orders, onSupport }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const cfg = VARIANT_CONFIG[variant];

  return (
    <div className="flex flex-col gap-8">
      <TablePageHeader title={cfg.title} onSupport={onSupport} />

      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <div className="flex min-w-[1020px] w-full flex-col gap-0">
          <div className="flex w-full items-center">
            {COLS.map((col) => (
              <div key={col.label} className={`${col.cls} py-1 pl-6 ${col.align}`}>
                <span className="font-body text-sm font-bold text-white/80">{col.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {visible.map((order) => (
              <DesktopRow key={order.id} order={order} variant={variant} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {visible.map((order) => (
          <MobileCard key={order.id} order={order} variant={variant} />
        ))}
      </div>

      <Pagination page={page} total={totalPages} onPage={setPage} />
    </div>
  );
}
