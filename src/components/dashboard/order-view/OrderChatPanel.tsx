"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage, OrderViewModel } from "./orderViewData";

/**
 * Right-column chat surface for the order view. Mirrors Figma 1491:7440
 * (desktop) and 1619:6676 (mobile). Comprises five vertical regions:
 *   1. Booster header — avatar + identity + Notify / Profile buttons.
 *   2. Booster-poaching warning + Report button.
 *   3. Order context cards (confirmation + #ID/date with game badge).
 *   4. Scrollable conversation: admin preloaded messages, user bubbles
 *      and booster bubbles, each with their own avatar treatment.
 *   5. Input footer: emoji + image attach + text + orange send button.
 */
type Props = {
  view: OrderViewModel;
  /** Strip outer chrome when embedded inside a MobileDrawer. */
  inDrawer?: boolean;
  onNotify?: () => void;
  onProfile?: () => void;
  onReport?: () => void;
};

function AdminAvatar() {
  return (
    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5c00]">
      <Image
        src="/images/dashboard/orderview/chat/brand-watermark.png"
        alt="OGEdge"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
    </div>
  );
}

function PreloadedBubble({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex w-full items-end gap-2">
      <AdminAvatar />
      <div
        className="flex min-w-0 flex-1 flex-col justify-center gap-1 bg-[#383852] p-3"
        style={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <p className="font-body text-sm font-medium leading-tight text-white">{title}</p>
        {body && <p className="font-body text-xs leading-tight text-white/80">{body}</p>}
      </div>
    </div>
  );
}

function ConfirmationBubble({ view }: { view: OrderViewModel }) {
  return (
    <div className="flex w-full items-end gap-2">
      <AdminAvatar />
      <div
        className="flex min-w-0 flex-1 flex-col justify-center gap-2 bg-[#383852] p-3"
        style={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <p className="font-body text-sm font-medium leading-tight text-white">
          Your order is confirmed. Feel free to use this chat for chatting with your booster
        </p>
        <div className="flex items-center gap-2 rounded-lg bg-[#232330] p-2">
          <div className="relative h-8 w-12 shrink-0 overflow-hidden rounded-lg bg-[#17191f]">
            <Image
              src={view.chatContextArtwork}
              alt=""
              width={48}
              height={32}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 rounded-lg bg-black/60" />
          </div>
          <div className="min-w-0 flex-1 font-body text-sm leading-tight text-white/80">
            <p className="font-bold text-white">{view.chatContextLabel}</p>
            <p className="truncate">
              <span>Date Start: </span>
              <span className="font-bold">
                {view.chatContextDate.replace(/^Date Start:\s*/, "")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserBubble({ body }: { body: string }) {
  return (
    <div className="flex w-full items-end justify-end gap-2">
      <div
        className="flex items-center bg-[#ff975d] p-3"
        style={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: "16px",
        }}
      >
        <p className="font-body text-base font-medium leading-none text-[#17191f]">{body}</p>
      </div>
      <Image
        src="/images/dashboard/orderview/chat/user-bubble-avatar.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 shrink-0 rounded-full"
      />
    </div>
  );
}

function BoosterBubble({ body }: { body: string }) {
  return (
    <div className="flex w-full items-end gap-2">
      <Image
        src="/images/dashboard/orderview/chat/booster-bubble-avatar.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 shrink-0 rounded-full"
      />
      <div
        className="flex items-center bg-black/50 p-3"
        style={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <p className="font-body text-base font-medium leading-none text-white/80">{body}</p>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.role === "admin") return <PreloadedBubble title={msg.title ?? ""} body={msg.body} />;
  if (msg.role === "user") return <UserBubble body={msg.body} />;
  return <BoosterBubble body={msg.body} />;
}

export function OrderChatPanel({ view, inDrawer = false, onNotify, onProfile, onReport }: Props) {
  const [draft, setDraft] = useState("I want to talk about my order");
  const [messages, setMessages] = useState<ChatMessage[]>(view.messages);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pin the message list to the bottom whenever a new message arrives so
  // the user always sees their freshly-sent bubble without having to
  // scroll manually. We use `behavior: "auto"` (not smooth) for the
  // initial mount and "smooth" thereafter to avoid a flash on load.
  // Depend on `messages.length` (not `messages`) so we don't re-scroll
  // on unrelated re-renders that hand us the same array reference.
  const isFirstRender = useRef(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: length is the trigger; the effect body intentionally reads only refs.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: isFirstRender.current ? "auto" : "smooth",
    });
    isFirstRender.current = false;
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length + 1}`, role: "user", body: trimmed },
    ]);
    setDraft("");
  };

  // Outer must use `h-full` (no min-height) so the parent's fixed height
  // wins; the scrollable message list below uses `min-h-0` so it can
  // actually overflow inside this flex column instead of pushing the
  // panel taller as new messages arrive.
  const outerClasses = inDrawer
    ? "flex h-full flex-col bg-[#232330]"
    : "flex h-full flex-col overflow-hidden rounded-3xl bg-[#232330]";

  return (
    <div className={outerClasses} style={inDrawer ? undefined : { border: "1px solid #ff975d" }}>
      {/* ─── 1. Booster header ───────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Orange ring around the avatar (Figma uses a 2px solid ring) */}
            <span
              aria-hidden
              className="absolute inset-0 -m-[2px] rounded-full"
              style={{ border: "2px solid #ff5c00" }}
            />
            <Image
              src={view.boosterAvatar}
              alt={view.boosterName}
              width={36}
              height={36}
              className="relative h-9 w-9 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-body text-sm font-semibold text-white">{view.boosterName}</span>
            <div className="flex items-center gap-2 text-xs text-white/70">
              {view.boosterOnline && (
                <span className="flex items-center gap-1 text-[#1aad19]">
                  <span className="h-[4.75px] w-[4.75px] rounded-full bg-[#1aad19]" />
                  Online
                </span>
              )}
              <span className="flex items-center gap-1 text-[#ff975d]">
                <Image
                  src="/images/dashboard/orderview/icons/rating-star-sm.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="-mr-2 h-[30px] w-[30px]"
                />
                {view.boosterRating}
              </span>
              <span className="flex items-center gap-1 text-[#ff975d]">
                <Image
                  src="/images/dashboard/orderview/icons/review-bubble.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="-mr-2 h-[30px] w-[30px]"
                />
                {view.boosterReviewCount}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNotify}
            className="flex h-10 items-center gap-2 rounded-xl px-3 font-body text-sm font-semibold uppercase text-white transition-colors hover:bg-white/5"
          >
            <Image
              src="/images/dashboard/orderview/icons/bell-notify.svg"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            Notify
          </button>
          <button
            type="button"
            onClick={onProfile}
            className="flex h-10 items-center gap-2 rounded-xl px-3 font-body text-sm font-semibold uppercase text-white transition-colors hover:bg-white/5"
          >
            <Image
              src="/images/dashboard/orderview/icons/profile-circle.svg"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            Profile
          </button>
        </div>
      </div>

      {/* ─── 2. Booster-poaching warning ─────────────────────────────── */}
      {view.showBoosterPoachingWarning && (
        <div
          className="flex items-center justify-between gap-4 px-6 py-2"
          style={{
            background:
              "linear-gradient(97deg, rgba(255,151,93,0.2) 0%, rgba(255,92,0,0.2) 50%, rgba(163,45,5,0.2) 100%)",
          }}
        >
          <p className="font-body text-[11px] leading-snug text-white/85">
            Has a booster contacted you after your order? This violates our terms. Report it to earn
            a <span className="font-semibold text-white">$75–$150</span> reward and help keep the
            platform safe.
          </p>
          <button
            type="button"
            onClick={() => {
              setReportSubmitted(true);
              onReport?.();
            }}
            className="flex h-10 shrink-0 items-center gap-2 rounded-2xl bg-[#17191f]/50 px-6 font-body text-sm font-medium uppercase text-white transition-colors hover:bg-[#17191f]/70"
          >
            <Image
              src="/images/dashboard/orderview/icons/report-flag.svg"
              alt=""
              width={16}
              height={16}
            />
            {reportSubmitted ? "Reported" : "Report"}
          </button>
        </div>
      )}

      {/* ─── 3 + 4. Scrollable conversation (context + messages) ─────── */}
      <div className="relative min-h-0 flex-1">
        {/* Centered logo watermark — stays fixed while messages scroll */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <Image
            src="/images/dashboard/orderview/chat/brand-watermark.png"
            alt=""
            width={180}
            height={60}
            className="h-auto w-[180px] opacity-[0.04]"
          />
        </div>
        <div
          ref={scrollRef}
          className="relative z-10 flex h-full flex-col gap-4 overflow-y-auto px-6 py-6"
        >
          <ConfirmationBubble view={view} />
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </div>
      </div>

      {/* ─── 5. Input footer ─────────────────────────────────────────── */}
      <div className="border-t border-[#383852] px-5 pt-4 pb-5">
        <div className="flex h-[56px] items-center justify-between gap-2 rounded-2xl bg-[#17191f] px-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Add emoji"
              className="grid h-8 w-8 place-items-center rounded-lg bg-[#383852] transition-colors hover:bg-[#444466]"
            >
              <Image
                src="/images/dashboard/orderview/icons/emoji.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
            <button
              type="button"
              aria-label="Attach image"
              className="grid h-8 w-8 place-items-center rounded-lg bg-[#383852] transition-colors hover:bg-[#444466]"
            >
              <Image
                src="/images/dashboard/orderview/icons/image-attach.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write a message…"
            className="min-w-0 flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Send"
            onClick={handleSend}
            className="grid h-9 w-9 place-items-center rounded-lg bg-[#ff5c00] transition-opacity hover:opacity-90"
          >
            <Image src="/images/dashboard/orderview/icons/send.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
