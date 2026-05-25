"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PAGE_SIZE,
  Pagination,
  ROW_BG_DEFAULT,
  ROW_BG_HOVER,
  MOBILE_CARD_BG,
} from "./orderTableShared";
import {
  type SupportTicket,
  type ChatStatus,
  type TicketStatus,
  TICKET_STATUS_THEME,
  CHAT_STATUS_THEME,
  MOCK_SUPPORT_TICKETS,
} from "./supportData";

function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const t = TICKET_STATUS_THEME[status];
  return (
    <span
      className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
      style={{ background: t.bg, color: t.color }}
    >
      {t.label}
    </span>
  );
}

function ChatBadge({ status }: { status: ChatStatus }) {
  const theme = CHAT_STATUS_THEME[status];
  if (!theme) return null;
  return (
    <span
      className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase text-white"
      style={{ background: theme.bg }}
    >
      {theme.label}
    </span>
  );
}

const COLS = [
  { label: "ID", width: "w-[8%]", cls: "pl-6" },
  { label: "Title", width: "w-[20%]", cls: "pl-6" },
  { label: "Status", width: "w-[10%]", cls: "pl-6" },
  { label: "Last Updated", width: "w-[18%]", cls: "pl-6" },
  { label: "Date Created", width: "w-[16%]", cls: "text-center" },
  { label: "Chat", width: "w-[8%]", cls: "text-center" },
  { label: "Actions", width: "flex-1", cls: "text-center" },
];

function DesktopRow({ ticket }: { ticket: SupportTicket }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex h-[100px] shrink-0 cursor-default items-center rounded-3xl transition-all duration-150"
      style={{ backgroundImage: hovered ? ROW_BG_HOVER : ROW_BG_DEFAULT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-[8%] pl-6">
        <span className="font-body text-base font-semibold text-[#ff975d]">{ticket.ticketId}</span>
      </div>

      <div className="w-[20%] pl-6">
        <p className="font-body text-base font-semibold text-white">{ticket.title}</p>
        <p className="font-body text-sm font-bold text-white">{ticket.subtitle}</p>
      </div>

      <div className="w-[10%] pl-6">
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="w-[18%] pl-6">
        <span className="font-body text-base font-normal text-white">{ticket.lastUpdated}</span>
      </div>

      <div className="flex w-[16%] items-center justify-center">
        <span className="font-body text-base font-normal text-white">{ticket.dateCreated}</span>
      </div>

      <div className="flex w-[8%] items-center justify-center">
        <ChatBadge status={ticket.chatStatus} />
      </div>

      <div className="flex flex-1 items-center justify-center px-8">
        <Link
          href={`/app/customer/support/${ticket.ticketId.replace("#", "")}`}
          className="font-body text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-[#ff975d]"
        >
          VIEW
        </Link>
      </div>
    </div>
  );
}

function MobileCard({ ticket }: { ticket: SupportTicket }) {
  return (
    <div className="flex flex-col rounded-3xl p-4" style={{ backgroundImage: MOBILE_CARD_BG }}>
      {/* Header: ID + copy + VIEW */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/orderview/icons/order-details-icon.svg"
            alt=""
            className="h-6 w-6"
          />
          <span className="font-body text-base font-semibold text-[#ff975d]">
            {ticket.ticketId.replace("#", "")}
          </span>
          <button
            type="button"
            aria-label="Copy ticket ID"
            onClick={() => navigator.clipboard.writeText(ticket.ticketId)}
            className="cursor-pointer transition-opacity hover:opacity-70 active:scale-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/orderview/icons/copy-icon.svg"
              alt=""
              className="h-4 w-4 opacity-60"
            />
          </button>
        </div>
        <Link
          href={`/app/customer/support/${ticket.ticketId.replace("#", "")}`}
          className="font-body text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-[#ff975d]"
        >
          VIEW
        </Link>
      </div>

      {/* Detail rows */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-lg px-2 py-1">
          <span className="font-body text-sm text-white/80">Title</span>
          <div className="flex items-center gap-2 overflow-hidden font-body text-sm font-medium text-white">
            <span>{ticket.title}</span>
            <span className="truncate">{ticket.subtitle}</span>
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-lg px-2 py-1"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span className="font-body text-sm text-white/80">Status</span>
          <TicketStatusBadge status={ticket.status} />
        </div>

        <div className="flex items-center justify-between rounded-lg px-2 py-1">
          <span className="font-body text-sm text-white/80">Last Updated</span>
          <span className="font-body text-base text-white">{ticket.lastUpdated}</span>
        </div>

        <div
          className="flex items-center justify-between rounded-lg px-2 py-1"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <span className="font-body text-sm text-white/80">Date Created</span>
          <span className="font-body text-base text-white">{ticket.dateCreated}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg px-2 py-1">
          <span className="font-body text-sm text-white/80">Chat</span>
          <ChatBadge status={ticket.chatStatus} />
        </div>
      </div>
    </div>
  );
}

export function SupportTicketsTable({
  tickets = MOCK_SUPPORT_TICKETS,
  faqHref = "/faq",
}: {
  tickets?: SupportTicket[];
  faqHref?: string;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(tickets.length / PAGE_SIZE));
  const visible = tickets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* Desktop header */}
        <div className="hidden items-center gap-4 lg:flex">
          <h2 className="flex-1 font-heading text-[32px] font-semibold text-white">
            My Support Tickets
          </h2>
          <Link
            href={faqHref}
            className="flex items-center rounded-3xl px-8 py-6 font-body text-xl font-bold text-white"
            style={{ background: "rgba(56,56,82,0.3)" }}
          >
            Need a faster answer? <span className="ml-1 text-[#ff975d]">Read our FAQ</span>
          </Link>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-4 rounded-3xl px-8 py-6 font-body text-xl font-bold text-white transition-all hover:bg-[rgba(56,56,82,0.5)] active:scale-[0.98]"
            style={{ background: "rgba(56,56,82,0.3)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/customize-icon.svg" alt="" className="h-6 w-6" />
            Custom Order Request
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-4 rounded-3xl px-8 py-6 font-body text-xl font-bold text-white transition-all hover:bg-[rgba(56,56,82,0.5)] active:scale-[0.98]"
            style={{ background: "rgba(56,56,82,0.3)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/new-ticket-icon.svg" alt="" className="h-6 w-6" />
            New Ticket
          </button>
        </div>

        {/* Mobile header */}
        <div className="flex flex-col gap-4 lg:hidden">
          <div>
            <p className="font-body text-sm font-normal text-white">My Support Tickets</p>
            <p className="font-body text-lg font-bold text-white">
              Need a faster answer?{" "}
              <Link href={faqHref} className="text-[#ff975d]">
                Read our FAQ
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 font-body text-base font-medium text-white transition-all hover:bg-[rgba(56,56,82,0.5)] active:scale-[0.98]"
              style={{ background: "rgba(56,56,82,0.3)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/new-ticket-icon.svg" alt="" className="h-6 w-6" />
              New Ticket
            </button>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 font-body text-base font-medium text-white transition-all hover:bg-[rgba(56,56,82,0.5)] active:scale-[0.98]"
              style={{ background: "rgba(56,56,82,0.3)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/customize-icon.svg" alt="" className="h-6 w-6" />
              Custom Order Request
            </button>
          </div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <div className="flex min-w-[900px] w-full flex-col gap-0">
          {/* Column headers */}
          <div className="flex w-full items-center">
            {COLS.map((col) => (
              <div key={col.label} className={`${col.width} py-1 ${col.cls}`}>
                <span className="font-body text-sm font-bold text-white/80">{col.label}</span>
              </div>
            ))}
          </div>
          {/* Rows */}
          <div className="flex flex-col gap-4">
            {visible.map((ticket) => (
              <DesktopRow key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {visible.map((ticket) => (
          <MobileCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {totalPages > 1 && <Pagination page={page} total={totalPages} onPage={setPage} />}
    </div>
  );
}
