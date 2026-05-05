"use client";

import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { GameSelector } from "@/components/layout/GameSelector";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

const leftNav: NavLink[] = [
  { label: "About Us", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
];

const rightNav: NavLink[] = [
  { label: "Blog", href: "#blog" },
  { label: "Contact us", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gameMenuOpen, setGameMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-dark-surface/80 backdrop-blur-md"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="relative mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 py-5 lg:px-20 lg:py-4">
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            type="button"
            onClick={() => {
              setGameMenuOpen(true);
              setMobileMenuOpen(false);
            }}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-brand-light px-4 py-3 text-xs font-bold uppercase tracking-[0.32px] text-white transition-colors hover:bg-brand-light/10 lg:px-8 lg:py-6 lg:text-base"
            style={{ boxShadow: "0 4px 44px rgba(255,92,0,0.20)" }}
          >
            <span className="hidden sm:inline">Select your game</span>
            <span className="sm:hidden">Games</span>
            <ChevronDownIcon size={18} className="ml-2" />
          </button>
          <nav className="hidden items-center gap-8 lg:flex">
            {leftNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logos/logo-white.png"
            alt="OGEdge"
            width={188}
            height={58}
            priority
            className="h-10 w-auto md:h-12 lg:h-[58px]"
          />
        </Link>

        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden items-center gap-8 lg:flex">
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

          <button
            type="button"
            className="hidden items-center gap-2 rounded-2xl border border-dark-border px-4 py-3 lg:inline-flex"
            aria-label="Language"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/flag-us.svg"
              alt="US"
              loading="lazy"
              className="h-5 w-5 rounded-full object-cover"
            />
            <ChevronDownIcon size={16} className="text-white" />
          </button>

          <Link
            href="#login"
            className="hidden text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light lg:inline"
          >
            Login
          </Link>

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
          className="lg:hidden border-t border-dark-border"
          style={{
            background: "linear-gradient(180deg, rgba(17,17,17,0.98) 0%, rgba(23,25,31,0.98) 100%)",
            backdropFilter: "blur(16px)",
          }}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {[...leftNav, ...rightNav].map((item) => (
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
              href="#login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center rounded-2xl px-4 py-3 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:bg-white/5 hover:text-brand-light"
            >
              Login
            </Link>
          </nav>
          <div className="flex items-center gap-3 border-t border-dark-border px-6 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/flag-us.svg"
              alt="US"
              loading="lazy"
              className="h-5 w-5 rounded-full object-cover"
            />
            <span className="font-body text-sm text-white/80">English (US)</span>
          </div>
        </div>
      )}
    </header>
  );
}
