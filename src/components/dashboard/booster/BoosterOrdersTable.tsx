"use client";

import Image from "next/image";
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
} from "../orderTableShared";
import type { BoosterTableOrder } from "./boosterTableData";

type BoosterTableVariant = "available" | "my-orders" | "completed";

type VariantConfig = {
  title: string;
  showClaim: boolean;
  showView: boolean;
  showChat: boolean;
  showCompletionTime: boolean;
  showEmployee: boolean;
  earningLabel: string;
};

const VARIANT_CONFIG: Record<BoosterTableVariant, VariantConfig> = {
  available: {
    title: "Available Orders",
    showClaim: true,
    showView: false,
    showChat: false,
    showCompletionTime: true,
    showEmployee: false,
    earningLabel: "Payout",
  },
  "my-orders": {
    title: "My Orders",
    showClaim: false,
    showView: true,
    showChat: true,
    showCompletionTime: false,
    showEmployee: true,
    earningLabel: "Payout",
  },
  completed: {
    title: "Completed Orders",
    showClaim: false,
    showView: false,
    showChat: false,
    showCompletionTime: false,
    showEmployee: false,
    earningLabel: "Payout",
  },
};

function getColumns(variant: BoosterTableVariant) {
  const cfg = VARIANT_CONFIG[variant];
  const cols: { label: string; cls: string }[] = [
    { label: "ID", cls: "w-[7%] pl-6" },
    { label: "Game", cls: "w-[8%] pl-2" },
    { label: "Service", cls: "w-[14%] pl-2" },
    { label: "Details", cls: "min-w-[180px] flex-1 pl-2" },
  ];
  if (cfg.showEmployee) {
    cols.push({ label: "Employee", cls: "w-[8%] text-center" });
  }
  if (cfg.showCompletionTime) {
    cols.push({ label: "Completion Time", cls: "w-[12%] text-center" });
  }
  cols.push({ label: cfg.earningLabel, cls: "w-[7%] text-center" });
  if (variant !== "available") {
    cols.push({ label: "Status", cls: "w-[13%] text-center" });
  }
  if (cfg.showChat) {
    cols.push({ label: "Chat", cls: "w-[5%] text-center" });
  }
  if (cfg.showClaim || cfg.showView) {
    cols.push({ label: "Actions", cls: "w-[7%] text-center" });
  }
  return cols;
}

function ClaimButton({ onClaim }: { onClaim: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClaim}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex cursor-pointer items-center gap-2 rounded-3xl px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 active:scale-95"
      style={{
        background: hovered
          ? "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)"
          : "rgba(23,25,31,0.5)",
        border: "1px solid #ff975d",
        backdropFilter: "blur(3px)",
        boxShadow: hovered
          ? "0 4px 22px rgba(255,92,0,0.3)"
          : "0 4px 44px rgba(255,92,0,0.2)",
      }}
    >
      <Image src="/images/dashboard/icons/check-all.svg" alt="" width={20} height={20} />
      Claim
    </button>
  );
}

function PayoutCell({ earning, bonus }: { earning: string; bonus?: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-body text-base font-semibold text-[#ff975d]">{earning}</span>
      {bonus && (
        <span className="font-body text-sm font-semibold text-[#34a853]">{bonus}</span>
      )}
    </div>
  );
}

function ClaimConfirmDialog({
  order,
  onClose,
  onConfirm,
}: {
  order: BoosterTableOrder;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-[420px] rounded-3xl p-8"
        style={{ background: "linear-gradient(180deg, #232330 0%, #17191f 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-heading text-xl font-bold text-white">Claim Order</h3>
        <p className="mt-3 font-body text-sm leading-6 text-white/80">
          Are you sure you want to claim order{" "}
          <span className="font-bold text-[#ff975d]">{order.orderId}</span>?
        </p>
        <p className="mt-1 font-body text-sm text-white/60">
          {order.game} · {order.service} · {order.rangeLabel}
        </p>
        <p className="mt-2 font-body text-base font-bold text-[#ff975d]">
          Payout: {order.earning}
          {order.bonus && <span className="ml-1 text-[#34a853]">{order.bonus}</span>}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-2xl border border-[#6d6d96] py-3 font-body text-sm font-bold uppercase text-white transition-all hover:border-white/50 active:scale-95"
            style={{ background: "rgba(23,25,31,0.5)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-2xl py-3 font-body text-sm font-bold uppercase text-white transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)",
              border: "1px solid #ff975d",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function DesktopRow({
  order,
  variant,
  onClaim,
}: {
  order: BoosterTableOrder;
  variant: BoosterTableVariant;
  onClaim: (order: BoosterTableOrder) => void;
}) {
  const cfg = VARIANT_CONFIG[variant];
  return (
    <RowShell>
      <div className="flex w-[7%] items-center pl-6">
        <span className="flex items-center gap-1.5">
          <span className="font-body text-base font-semibold text-[#ff975d]">
            {order.orderId}
          </span>
          <CopyButton
            ariaLabel="Copy order ID"
            onCopy={() => navigator.clipboard.writeText(order.orderId)}
          />
        </span>
      </div>

      <div className="flex w-[8%] items-center pl-2">
        <span className="font-body text-base font-semibold text-white">{order.game}</span>
      </div>

      <div className="flex w-[14%] flex-col justify-center pl-2">
        <p className="font-body text-base font-semibold text-white">{order.service}</p>
        <p className="font-body text-sm font-bold text-white/70">{order.rangeLabel}</p>
      </div>

      <div className="flex min-w-[180px] flex-1 items-center pl-2">
        <DetailTags tags={order.details} />
      </div>

      {cfg.showEmployee && (
        <div className="flex w-[8%] flex-col items-center justify-center text-center">
          <span className="font-body text-sm font-semibold text-white">
            {order.employee ?? "—"}
          </span>
          {order.employeeRating != null && (
            <span className="font-body text-xs text-[#ffb000]">
              ★ {order.employeeRating}
            </span>
          )}
        </div>
      )}

      {cfg.showCompletionTime && (
        <div className="flex w-[12%] items-center justify-center">
          <span className="font-body text-base font-semibold text-white">
            {order.completionTime ?? "—"}
          </span>
        </div>
      )}

      <div className="flex w-[7%] items-center justify-center">
        <PayoutCell earning={order.earning} bonus={order.bonus} />
      </div>

      {variant !== "available" && (
        <div className="flex w-[13%] items-center justify-center">
          <StatusPill status={order.tableStatus} />
        </div>
      )}

      {cfg.showChat && (
        <div className="flex w-[5%] items-center justify-center">
          <div className={`relative cursor-pointer ${order.chatActive ? "animate-chat-pulse" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                order.chatActive
                  ? "/images/dashboard/orderview/icons/chat-refresh.svg"
                  : "/images/dashboard/orderview/icons/chat-bubble.svg"
              }
              alt="Chat"
              className={`h-6 w-6 ${order.chatActive ? "[filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]" : ""}`}
            />
            {order.chatActive && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-[#ff5c00]" />
            )}
          </div>
        </div>
      )}

      {(cfg.showClaim || cfg.showView) && (
        <div className="flex w-[7%] items-center justify-center gap-3">
          {cfg.showClaim && order.canClaim && (
            <ClaimButton onClaim={() => onClaim(order)} />
          )}
          {cfg.showView && (
            <Link
              href={`/app/booster/orders/${order.orderId}`}
              className="font-body text-base font-bold uppercase tracking-wide text-white transition-all hover:text-[#ff975d] active:scale-95"
            >
              VIEW ORDER
            </Link>
          )}
        </div>
      )}
    </RowShell>
  );
}

function MobileCard({
  order,
  variant,
  onClaim,
}: {
  order: BoosterTableOrder;
  variant: BoosterTableVariant;
  onClaim: (order: BoosterTableOrder) => void;
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
          <span className="font-body text-base font-semibold text-[#ff975d]">
            {order.orderId}
          </span>
          <CopyButton
            ariaLabel="Copy order ID"
            onCopy={() => navigator.clipboard.writeText(order.orderId)}
          />
        </div>

        {cfg.showChat && (
          <div className={`relative ${order.chatActive ? "animate-chat-pulse" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                order.chatActive
                  ? "/images/dashboard/orderview/icons/chat-refresh.svg"
                  : "/images/dashboard/orderview/icons/chat-bubble.svg"
              }
              alt="Chat"
              className={`h-6 w-6 ${order.chatActive ? "[filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]" : ""}`}
            />
            {order.chatActive && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-[#ff5c00]" />
            )}
          </div>
        )}
      </div>

      {variant !== "available" && (
        <div className="mt-3 flex items-center justify-between rounded-lg px-2 py-1">
          <StatusPill status={order.tableStatus} />
        </div>
      )}

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
        {cfg.showEmployee && order.employee && (
          <DetailRow label="Employee" striped>
            {order.employee}
            {order.employeeRating != null && (
              <span className="ml-1 text-[#ffb000]">★ {order.employeeRating}</span>
            )}
          </DetailRow>
        )}
        {cfg.showCompletionTime && order.completionTime && (
          <DetailRow label="Completion Time" striped>
            {order.completionTime}
          </DetailRow>
        )}
        <DetailRow label="Payout" striped>
          <span className="font-bold text-[#ff975d]">{order.earning}</span>
          {order.bonus && (
            <span className="ml-1 font-bold text-[#34a853]">{order.bonus}</span>
          )}
        </DetailRow>
      </div>

      {(cfg.showClaim || cfg.showView) && (
        <div className="mt-4 flex items-center gap-3">
          {cfg.showClaim && order.canClaim && (
            <button
              type="button"
              onClick={() => onClaim(order)}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-3 font-body text-base font-bold uppercase text-white transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)" }}
            >
              <Image src="/images/dashboard/icons/check-all.svg" alt="" width={20} height={20} />
              CLAIM
            </button>
          )}
          {cfg.showView && (
            <Link
              href={`/app/booster/orders/${order.orderId}`}
              className="flex flex-1 items-center justify-center rounded-2xl py-3 font-body text-base font-bold uppercase tracking-wide text-white transition-all hover:text-[#ff975d] hover:border-[#ff975d] hover:shadow-[0_0_12px_rgba(255,92,0,0.3)] active:scale-[0.97]"
              style={{
                background: "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
                border: "1px solid #6d6d96",
              }}
            >
              VIEW ORDER
            </Link>
          )}
        </div>
      )}
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
  const [claimOrder, setClaimOrder] = useState<BoosterTableOrder | null>(null);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const cfg = VARIANT_CONFIG[variant];
  const cols = getColumns(variant);

  const handleClaim = (order: BoosterTableOrder) => {
    setClaimOrder(order);
  };

  const handleConfirmClaim = () => {
    setClaimOrder(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <TablePageHeader title={cfg.title} onSupport={onSupport} />

      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <div className="flex min-w-[1020px] w-full flex-col gap-0">
          <div className="flex w-full items-center">
            {cols.map((col) => (
              <div key={col.label} className={`${col.cls} py-1`}>
                <span className="font-body text-sm font-bold text-white/80">{col.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {visible.map((order) => (
              <DesktopRow key={order.id} order={order} variant={variant} onClaim={handleClaim} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {visible.map((order) => (
          <MobileCard key={order.id} order={order} variant={variant} onClaim={handleClaim} />
        ))}
      </div>

      <Pagination page={page} total={totalPages} onPage={setPage} />

      {claimOrder && (
        <ClaimConfirmDialog
          order={claimOrder}
          onClose={() => setClaimOrder(null)}
          onConfirm={handleConfirmClaim}
        />
      )}
    </div>
  );
}
