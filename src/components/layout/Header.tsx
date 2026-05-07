"use client";

import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { GameSelector } from "@/components/layout/GameSelector";
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
  { label: "FAQ", href: "/about-us#faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Safety", href: "/about-us#safety" },
];

const rightNav: NavLink[] = [
  { label: "Blog", href: "#blog" },
  { label: "Support", href: "#support" },
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

function CurrencyDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(currencies[0]);
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
    <div ref={ref} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-[53px] items-center gap-2 rounded-2xl border border-dark-border px-4"
      >
        <span className="font-body text-base font-normal text-white">{selected.symbol}</span>
        <span className="font-body text-base font-normal text-white">{selected.code}</span>
        <ChevronDownIcon
          size={13}
          className={`text-white transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[200px] overflow-hidden rounded-2xl py-1"
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
                setSelected(c);
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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameMenuOpen, setGameMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-dark-surface/80 backdrop-blur-md"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="relative mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 py-4 lg:px-20 lg:py-5">
        {/* Left side */}
        <div className="flex items-center gap-5 lg:gap-12">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setGameMenuOpen(true);
              setMobileMenuOpen(false);
            }}
          >
            <span className="hidden sm:inline">Select your game</span>
            <span className="sm:hidden">Games</span>
          </Button>
          <nav className="hidden items-center gap-12 lg:flex">
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
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logos/logo-white.png"
            alt="OGEdge"
            width={188}
            height={58}
            priority
            className="h-9 w-auto md:h-10 lg:h-[50px]"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4 lg:gap-12">
          <nav className="hidden items-center gap-12 lg:flex">
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

          {/* Currency selector */}
          <CurrencyDropdown />

          {/* Cart - h-[53px] w-[53px] to match Figma */}
          <Link
            href="#cart"
            className="relative hidden h-[53px] w-[53px] items-center justify-center rounded-2xl border border-dark-border lg:inline-flex"
            aria-label="Cart"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/cart.svg" alt="" className="h-6 w-6" />
            <span
              className="absolute flex items-center justify-center rounded-full border-2 border-dark-surface bg-brand-main font-bold leading-none text-white"
              style={{ width: 20, height: 20, fontSize: 12, top: 4, right: 4 }}
            >
              2
            </span>
          </Link>

          {/* Login button */}
          <div className="hidden lg:block">
            <Button href="#login" variant="primary" size="sm">
              Login
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-dark-border p-2 text-white lg:hidden"
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
          className="border-t border-dark-border lg:hidden"
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
            <Button href="#login" variant="primary" size="sm" className="mt-2 w-full">
              Login
            </Button>
          </nav>
          <div className="flex items-center gap-3 border-t border-dark-border px-6 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/dollar.svg" alt="" className="h-4 w-[9px]" />
            <span className="font-body text-sm text-white/80">USD</span>
            <ChevronDownIcon size={12} className="text-white/60" />
          </div>
        </div>
      )}
    </header>
  );
}
