"use client";

import { useState } from "react";
import type { AccountDetailChip, AccountDetailRow, OrderDetailRow } from "./orderViewData";

function PanelShell({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-full flex-1 flex-col gap-4 rounded-3xl p-6 lg:p-8"
      style={{
        background:
          "linear-gradient(167.87deg, rgba(56,56,82,0.2) 0%, rgba(43,45,77,0.2) 50%, rgba(13,15,21,0.2) 100%)",
      }}
    >
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="h-6 w-6" />
        <h3
          className="font-body text-base font-semibold leading-none"
          style={{ color: "#ff975d" }}
        >
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  striped,
  align = "center",
  children,
}: {
  label: string;
  striped?: boolean;
  align?: "center" | "start";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex justify-between gap-4 rounded-lg px-2 py-1 ${
        align === "center" ? "min-h-[30px] items-center" : "items-start py-1.5"
      } ${striped ? "bg-black/20" : ""}`}
    >
      <span className="shrink-0 font-body text-sm font-normal text-white/80">{label}</span>
      <div className="flex min-w-0 items-center gap-2 text-right">{children}</div>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : `Copy ${value}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* silent */
        }
      }}
      className="flex h-4 w-4 shrink-0 items-center justify-center transition-opacity hover:opacity-70"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 14 14" role="img" aria-label="Copied">
          <title>Copied</title>
          <path d="M3 7l3 3 5-6" stroke="#34a853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/dashboard/orderview/icons/copy-icon.svg" alt="" className="h-4 w-4" />
      )}
    </button>
  );
}

function EditButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={`Edit ${label}`}
      className="flex h-4 w-4 shrink-0 items-center justify-center transition-opacity hover:opacity-70"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dashboard/orderview/icons/edit-icon.svg" alt="" className="h-4 w-4" />
    </button>
  );
}

export function OrderDetailsPanel({ rows }: { rows: OrderDetailRow[] }) {
  return (
    <PanelShell
      icon="/images/dashboard/orderview/icons/order-details-icon.svg"
      title="Order Details"
    >
      {rows.map((row, idx) => (
        <DetailRow key={row.label} label={row.label} striped={idx % 2 === 1}>
          <span className="font-body text-base font-semibold text-white">{row.value}</span>
          {row.copyable && <CopyButton value={row.value} />}
        </DetailRow>
      ))}
    </PanelShell>
  );
}

export function AccountDetailsPanel({
  rows,
  chips,
}: {
  rows: AccountDetailRow[];
  chips: AccountDetailChip[];
}) {
  return (
    <PanelShell
      icon="/images/dashboard/orderview/icons/account-details-icon.svg"
      title="Account Details"
    >
      {rows.map((row, idx) => (
        <DetailRow key={row.label} label={row.label} striped={idx % 2 === 1}>
          {row.masked ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/dashboard/orderview/icons/password-dots.svg" alt="Password" className="h-4 w-[80px]" />
          ) : (
            <span className="font-body text-base font-semibold text-white">{row.value}</span>
          )}
          {row.copyable && <CopyButton value={row.value} />}
          {row.editable && <EditButton label={row.label} />}
        </DetailRow>
      ))}
      {chips.length > 0 && (
        <DetailRow
          label="Details"
          striped={rows.length % 2 === 1}
          align="start"
        >
          <div className="flex flex-wrap items-center justify-end gap-2">
            {chips.map((chip) => (
              <span
                key={chip.label}
                className="rounded-lg px-2 py-1 font-body text-xs font-semibold uppercase leading-none"
                style={{ background: chip.bg, color: chip.color }}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </DetailRow>
      )}
    </PanelShell>
  );
}

/**
 * Standalone "Description" card. Uses the downloaded `info-orange.svg`
 * (DuoIcons:info) — circular orange info badge with the duotone fill.
 */
export function DescriptionPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl bg-dark-surface p-6 lg:p-8">
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/orderview/icons/info-orange.svg" alt="" className="mt-1 h-5 w-5 shrink-0" />
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-base font-semibold text-white lg:text-lg">{title}</h3>
          <p className="font-body text-sm leading-6 text-white/70 lg:text-base">{body}</p>
        </div>
      </div>
    </div>
  );
}
