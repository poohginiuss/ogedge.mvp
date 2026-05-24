"use client";

import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { GameSelector } from "@/components/layout/GameSelector";
import { LoginPopup } from "@/components/popups/LoginPopup";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

const aboutUsLinks: NavLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Safety", href: "/safety" },
];

const rightNav: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" },
];

function AboutUsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
      >
        About Us
        <ChevronDownIcon
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+12px)] z-50 w-[180px] overflow-hidden rounded-2xl py-1"
          style={{
            backgroundImage: "linear-gradient(-54deg, #17191f 0%, #383852 100%)",
            border: "1px solid #383852",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {aboutUsLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-[48px] w-full items-center px-4 font-body text-base font-medium text-white transition-colors hover:bg-black/20"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

type Currency = { code: string; symbol: string; label: string };

const currencies: Currency[] = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "KRW", symbol: "₩", label: "Korean Won" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
];

type CurrencyDropdownProps = {
  selected: Currency;
  onSelect: (c: Currency) => void;
  /** "desktop" = rounded-border pill in header. "mobile" = full-width row inside the drawer. */
  variant?: "desktop" | "mobile";
};

function CurrencyDropdown({ selected, onSelect, variant = "desktop" }: CurrencyDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isMobile = variant === "mobile";
  const triggerClass = isMobile
    ? "flex w-full items-center gap-3 px-6 py-4 text-left"
    : "inline-flex h-[53px] items-center gap-2 rounded-2xl border border-dark-border px-4";
  const popoverClass = isMobile
    ? "absolute bottom-[calc(100%+8px)] left-6 right-6 z-50 overflow-hidden rounded-2xl py-1"
    : "absolute right-0 top-[calc(100%+8px)] z-50 w-[200px] overflow-hidden rounded-2xl py-1";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
        aria-label="Change currency"
        aria-expanded={open}
      >
        {isMobile ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/dollar.svg" alt="" className="h-4 w-[9px]" />
            <span className="font-body text-sm text-white/80">{selected.code}</span>
            <ChevronDownIcon
              size={12}
              className={`text-white/60 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        ) : (
          <>
            <span className="font-body text-base font-normal text-white">{selected.symbol}</span>
            <span className="font-body text-base font-normal text-white">{selected.code}</span>
            <ChevronDownIcon
              size={13}
              className={`text-white transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>
      {open && (
        <div
          className={popoverClass}
          style={{
            backgroundImage: "linear-gradient(-54deg, #17191f 0%, #383852 100%)",
            border: "1px solid #383852",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          {currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onSelect(c);
                setOpen(false);
              }}
              className={`flex h-[44px] w-full items-center gap-3 px-4 text-left transition-colors hover:bg-black/20 ${
                selected.code === c.code ? "text-brand-light" : "text-white"
              }`}
            >
              <span className="w-6 font-body text-sm">{c.symbol}</span>
              <span className="font-body text-sm font-medium">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Notification items ──────────────────────────────────────────────────────

type NotifItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  unread: boolean;
};

const sampleNotifications: NotifItem[] = [
  {
    id: "n1",
    title: "Booster Assigned",
    subtitle: "Booster @AmazingBooster was assigned to your order",
    icon: "/images/dashboard/icons/notif-person-check.svg",
    iconBg: "rgba(255,92,0,0.2)",
    unread: true,
  },
  {
    id: "n2",
    title: "Order Paused",
    subtitle: "Booster @AmazingBooster has paused your order:",
    icon: "/images/dashboard/icons/notif-paused.svg",
    iconBg: "rgba(255,176,0,0.2)",
    unread: true,
  },
  {
    id: "n3",
    title: "New Message",
    subtitle: "Booster @epicBooster has sent you a message.",
    icon: "/images/dashboard/icons/notif-message.svg",
    iconBg: "#383852",
    unread: false,
  },
];

function NotificationsDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const items =
    filter === "all"
      ? sampleNotifications
      : sampleNotifications.filter((n) => n.unread);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-[390px] flex-col gap-4 rounded-3xl pb-4 pt-8 px-6"
      style={{
        background: "#17191f",
        border: "1px solid #383852",
        boxShadow: "0 4px 2px rgba(0,0,0,0.25)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-body text-base font-medium text-white">Notifications</span>
        <button
          type="button"
          className="flex items-center gap-2 font-body text-sm font-medium text-white transition-opacity hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/notif-check-all.svg" alt="" className="h-3.5 w-3.5" />
          Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`flex h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl border p-4 font-body text-base font-medium transition-all ${
            filter === "all"
              ? "border-brand-light bg-[rgba(0,0,0,0.2)] text-brand-main shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
              : "border-dark-border bg-[rgba(0,0,0,0.2)] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/notif-filter-all.svg" alt="" className="h-5 w-5" />
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter("unread")}
          className={`flex h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl border p-4 font-body text-base font-medium transition-all ${
            filter === "unread"
              ? "border-brand-light bg-[rgba(0,0,0,0.2)] text-brand-main shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
              : "border-dark-border bg-[rgba(0,0,0,0.2)] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/notif-filter-unread.svg" alt="" className="h-5 w-5" />
          Unread
        </button>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="relative flex items-center gap-2 overflow-hidden rounded-2xl p-4 transition-colors hover:bg-[rgba(56,56,82,0.7)]"
            style={{ background: "rgba(56,56,82,0.5)" }}
          >
            {item.unread && (
              <div
                className="absolute left-0 top-0 h-full w-1"
                style={{ background: "#34a853" }}
              />
            )}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: item.iconBg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt="" className="h-6 w-6" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <span className="font-body text-sm font-bold text-white">{item.title}</span>
              <span className="w-full truncate text-left font-body text-xs text-white">
                {item.subtitle}
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/notif-arrow-right.svg"
              alt=""
              className="h-6 w-3 shrink-0"
            />
          </button>
        ))}
      </div>

      {/* Divider + See all */}
      <div className="border-t border-[rgba(109,109,150,0.5)]" />
      <Link
        href="/app/customer/notification"
        onClick={onClose}
        className="block w-full text-center font-body text-base text-white transition-opacity hover:opacity-70"
      >
        See all
      </Link>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
  <>
    <header
      className="sticky top-0 z-50 w-full bg-dark-surface/80 backdrop-blur-md"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="relative mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 xl:px-18 xl:py-5 2xl:px-22">
        {/* Left side */}
        <div className="flex items-center gap-3 min-[1440px]:gap-18">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setGameMenuOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            <span className="hidden min-[1440px]:inline">Select your game</span>
            <span className="min-[1440px]:hidden">Games</span>
          </Button>
          <nav className="hidden items-center gap-10 min-[1440px]:flex">
            <AboutUsDropdown />
            <Link
              href="/reviews"
              className="text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
            >
              Reviews
            </Link>
          </nav>
        </div>

        {/* Center logo */}
        <Link href="/" className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logos/logo-white.png"
            alt="OGEdge"
            width={188}
            height={58}
            unoptimized
            priority
            className="h-8 w-auto sm:h-9 md:h-10 min-[1440px]:h-[50px]"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3 min-[1440px]:gap-8">
          <nav className="hidden items-center gap-10 min-[1440px]:flex">
            {rightNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Currency selector (desktop) */}
          <div className="hidden min-[1440px]:block">
            <CurrencyDropdown
              selected={selectedCurrency}
              onSelect={setSelectedCurrency}
              variant="desktop"
            />
          </div>

          {/* Cart — visible on all sizes */}
          <Link
            href="/checkout"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-dark-border min-[1440px]:h-[53px] min-[1440px]:w-[53px] min-[1440px]:rounded-2xl"
            aria-label="Cart"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/cart.svg" alt="" className="h-5 w-5 min-[1440px]:h-6 min-[1440px]:w-6" />
            <span
              className="absolute flex items-center justify-center rounded-full border-2 border-dark-surface bg-brand-main font-bold leading-none text-white"
              style={{ width: 18, height: 18, fontSize: 11, top: 2, right: 2 }}
            >
              2
            </span>
          </Link>

          {/* Notification bell — desktop only */}
          <div className="relative hidden min-[1440px]:block">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative inline-flex h-[53px] w-[53px] items-center justify-center rounded-2xl border border-dark-border"
              aria-label="Notifications"
              aria-expanded={notifOpen}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/notification-bell.svg"
                alt=""
                className="h-6 w-6"
              />
              <span
                className="absolute rounded-full border-2 border-dark-surface bg-brand-main"
                style={{ width: 12, height: 12, top: 6, right: 8 }}
              />
            </button>
            <NotificationsDropdown open={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>

          {/* Login button */}
          <div className="hidden min-[1440px]:block">
            <Button onClick={() => setLoginOpen(true)} variant="primary" size="sm">
              Login
            </Button>
          </div>

          {/* Hamburger for < 1440px */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-dark-border p-2 text-white min-[1440px]:hidden"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <GameSelector isOpen={gameMenuOpen} onClose={() => setGameMenuOpen(false)} />

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className="border-t border-dark-border min-[1440px]:hidden"
          style={{
            background: "linear-gradient(180deg, rgba(17,17,17,0.98) 0%, rgba(23,25,31,0.98) 100%)",
            backdropFilter: "blur(16px)",
          }}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {[...aboutUsLinks, ...rightNav].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center rounded-2xl px-4 py-3 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:bg-white/5 hover:text-brand-light"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/app/customer/notification"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:bg-white/5 hover:text-brand-light"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/notification-bell.svg"
                alt=""
                className="h-5 w-5"
              />
              Notifications
            </Link>
            <Button onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }} variant="primary" size="sm" className="mt-2 w-full">
              Login
            </Button>
          </nav>
          {/* Currency selector (mobile) — sits inside the drawer so users
              can actually switch currency from a phone (msg #32). */}
          <div className="border-t border-dark-border">
            <CurrencyDropdown
              selected={selectedCurrency}
              onSelect={setSelectedCurrency}
              variant="mobile"
            />
          </div>
        </div>
      )}
    </header>
    <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
  </>
  );
}
