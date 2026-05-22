"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ContactMethods } from "@/components/about/ContactMethods";
import { Faq } from "@/components/sections/Faq";
import { TICKET_STATUS_THEME } from "../supportData";
import type { TicketMessage, TicketViewModel } from "./supportTicketViewData";
import { sampleTicketView } from "./supportTicketViewData";

const ICON = "/images/dashboard/support-view";

function MobileMoreMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={menuRef} className="relative lg:hidden">
      <button
        type="button"
        aria-label="More actions"
        onClick={() => setOpen((p) => !p)}
        className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
        style={{ background: open ? "rgba(56,56,82,0.6)" : "rgba(56,56,82,0.3)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="4" r="1.5" fill="white" />
          <circle cx="10" cy="10" r="1.5" fill="white" />
          <circle cx="10" cy="16" r="1.5" fill="white" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-dark-border shadow-[0_4px_20px_rgba(0,0,0,0.4)]" style={{ background: "linear-gradient(-43deg, #17191f, #2a2a40)" }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 px-4 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <Image src={`${ICON}/add.svg`} alt="" width={18} height={18} aria-hidden="true" />
            New Ticket
          </button>
          <div className="mx-3 h-px bg-dark-border" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 px-4 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <Image src={`${ICON}/check.svg`} alt="" width={18} height={18} aria-hidden="true" />
            Close Ticket
          </button>
        </div>
      )}
    </div>
  );
}

function TicketHeader({ view }: { view: TicketViewModel }) {
  const theme = TICKET_STATUS_THEME[view.status];
  const [backHovered, setBackHovered] = useState(false);
  const [newHovered, setNewHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);

  return (
    <div className="flex flex-col gap-4 lg:gap-0">
      <div className="flex items-center justify-between lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/app/customer/support"
            aria-label="Back to tickets"
            className="rounded-lg p-1 transition-all duration-200"
            style={{
              background: backHovered ? "rgba(56,56,82,0.5)" : "transparent",
            }}
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
          >
            <Image
              src={`${ICON}/back.svg`}
              alt=""
              width={12}
              height={24}
              className="hidden lg:block"
              aria-hidden="true"
            />
            <Image
              src={`${ICON}/back.svg`}
              alt=""
              width={8}
              height={16}
              className="lg:hidden"
              aria-hidden="true"
            />
          </Link>

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-lg font-bold text-white lg:text-[32px] lg:font-semibold">
                Ticket {view.ticketId}
              </h1>
              <span
                className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase"
                style={{ background: theme.bg, color: theme.color }}
              >
                {theme.label}
              </span>
            </div>
            <p className="font-body text-sm text-white lg:text-base">
              Created on {view.createdAt}
            </p>
          </div>
        </div>

        {/* Mobile: three-dot menu */}
        <MobileMoreMenu />

        {/* Desktop: full buttons */}
        <div className="hidden gap-4 lg:flex">
          <button
            type="button"
            className="flex items-center gap-4 rounded-3xl px-8 py-6 font-body text-xl font-bold text-white transition-all duration-200"
            style={{
              background: newHovered ? "rgba(56,56,82,0.5)" : "rgba(56,56,82,0.3)",
              boxShadow: newHovered ? "0 2px 12px rgba(255,92,0,0.15)" : "none",
            }}
            onMouseEnter={() => setNewHovered(true)}
            onMouseLeave={() => setNewHovered(false)}
          >
            <Image src={`${ICON}/add.svg`} alt="" width={24} height={24} aria-hidden="true" />
            <span>New Ticket</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-4 rounded-3xl px-8 py-6 font-body text-xl font-bold text-white transition-all duration-200"
            style={{
              background: closeHovered ? "rgba(56,56,82,0.5)" : "rgba(56,56,82,0.3)",
              boxShadow: closeHovered ? "0 2px 12px rgba(255,92,0,0.15)" : "none",
            }}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
          >
            <Image src={`${ICON}/check.svg`} alt="" width={24} height={24} aria-hidden="true" />
            <span>Close Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageCard({ message }: { message: TicketMessage }) {
  return (
    <div className="rounded-2xl bg-[#232330] p-3 lg:rounded-3xl lg:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={message.avatar}
            alt={message.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <span className="font-body text-base font-semibold text-[#ff975d]">
              {message.name}
            </span>
            <span className="font-body text-sm text-white/80">{message.timeAgo}</span>
          </div>
        </div>

        {message.isOriginal && (
          <div className="flex flex-col gap-2">
            <span className="px-2 font-body text-sm text-white/80">Original Message</span>
            <div className="rounded-lg bg-[rgba(0,0,0,0.2)] px-4 py-3">
              <p className="font-body text-base font-medium text-white">
                {message.originalTitle}
              </p>
              <p className="mt-2 font-body text-base text-white">{message.body}</p>
            </div>
          </div>
        )}

        {!message.isOriginal && (
          <div className="px-4 py-3">
            {message.body.split("\n\n").map((paragraph, i) => (
              <p
                key={`${message.id}-p${i}`}
                className={`font-body text-base text-white ${i > 0 ? "mt-4" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {message.attachments.map((att) => (
              <div
                key={att.file}
                className="flex w-[180px] flex-col gap-1 rounded-lg bg-[rgba(0,0,0,0.2)] px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm font-semibold text-white">Attachment</span>
                  <button type="button" aria-label="Remove attachment">
                    <Image
                      src={`${ICON}/close.svg`}
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <span className="truncate font-body text-xs text-white">{att.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const [sendHovered, setSendHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="rounded-3xl bg-[#232330] p-4 lg:p-6">
      <div className="flex items-end gap-3 rounded-2xl bg-[#17191f] px-4 py-3">
        <div className="flex shrink-0 gap-1 pb-0.5">
          <button
            type="button"
            className="flex items-center rounded-lg bg-[#383852] p-2 transition-colors hover:bg-[#4a4a6a]"
            aria-label="Emoji"
          >
            <Image src={`${ICON}/emoji.svg`} alt="" width={16} height={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex items-center rounded-lg bg-[#383852] p-2 transition-colors hover:bg-[#4a4a6a]"
            aria-label="Attach image"
          >
            <Image
              src={`${ICON}/image-attach.svg`}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          placeholder="Start typing..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleInput();
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          className="min-h-[32px] max-h-[120px] flex-1 resize-none bg-transparent font-body text-sm leading-5 text-white/80 outline-none placeholder:text-white/80"
        />
        <button
          type="button"
          className="flex shrink-0 items-center rounded-lg p-2 transition-all duration-200"
          style={{
            background: sendHovered ? "#e05000" : "#ff5c00",
            boxShadow: sendHovered ? "0 2px 12px rgba(255,92,0,0.4)" : "none",
          }}
          aria-label="Send message"
          onClick={handleSend}
          onMouseEnter={() => setSendHovered(true)}
          onMouseLeave={() => setSendHovered(false)}
        >
          <Image src={`${ICON}/send.svg`} alt="" width={24} height={24} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function NeedAnswersFastCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="rounded-3xl p-8" style={{ background: "rgba(56,56,82,0.3)" }}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-xl font-semibold text-white">Need answers fast?</h3>
          <p className="font-body text-base text-white">
            Take a look at our FAQ. Many common issues are already covered.
          </p>
        </div>
        <Link
          href="/faq"
          className="flex items-center gap-2 font-body text-base font-bold uppercase tracking-wide transition-colors duration-200"
          style={{ color: hovered ? "#ff975d" : "#ffffff" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          View FAQ
          <Image
            src={`${ICON}/arrow-right.svg`}
            alt=""
            width={24}
            height={24}
            className="rotate-90"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}

function TicketSidebar() {
  return (
    <div className="flex w-[315px] shrink-0 flex-col gap-8">
      <h2 className="font-heading text-2xl font-bold text-white">Have more questions?</h2>
      <ContactMethods showEmail={false} />
      <NeedAnswersFastCard />
    </div>
  );
}

type Props = { ticketId: string };

export default function TicketViewContent({ ticketId: _ticketId }: Props) {
  const [view, setView] = useState(sampleTicketView);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    const newMessage: TicketMessage = {
      id: `m${Date.now()}`,
      role: "user",
      name: "You",
      avatar: "/images/dashboard/support-view/avatar-user.png",
      timeAgo: "Just now",
      body: text,
    };
    setView((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  };

  return (
    <div className="flex flex-col gap-8 overflow-x-clip lg:flex-row lg:items-start lg:gap-8 lg:overflow-x-visible">
      {/* Left column: fixed-height flex container — messages scroll, input stays pinned */}
      <div className="flex h-[calc(100svh-5rem)] max-h-[calc(100svh-5rem)] min-w-0 flex-col lg:min-w-0 lg:flex-1 lg:h-[calc(100vh-10rem)] lg:max-h-[calc(100vh-10rem)]">
        <div className="shrink-0">
          <TicketHeader view={view} />
        </div>

        {/* Scrollable messages */}
        <div
          ref={scrollRef}
          className="mt-6 min-h-0 flex-1 overflow-y-auto lg:mt-8"
        >
          <div className="flex flex-col gap-4">
            {view.messages.map((msg) => (
              <MessageCard key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        {/* Input pinned at bottom of the flex container */}
        <div className="shrink-0 pb-2 pt-4 lg:pt-6">
          <MessageInput onSend={handleSend} />
        </div>
      </div>

      {/* Right sidebar - desktop only */}
      <aside className="hidden lg:block">
        <div className="sticky top-6">
          <TicketSidebar />
        </div>
      </aside>

      {/* Mobile: reuse the shared FAQ section — negative margins cancel the dashboard shell's padding */}
      <div className="-mx-4 lg:hidden sm:-mx-6">
        <Faq />
      </div>
    </div>
  );
}
