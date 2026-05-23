"use client";

import Image from "next/image";
import { useState } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { Button } from "@/components/ui/Button";

/* ─── Hero feature pills ──────────────────────────────────────────────── */

const heroFeatures = [
  { icon: "/images/rewards/icon-discount.svg", label: "Lifetime Discounts" },
  { icon: "/images/rewards/icon-cashback.svg", label: "Seasonal Cashback" },
  { icon: "/images/rewards/icon-lock.svg", label: "Exclusive Drops" },
  { icon: "/images/rewards/icon-support.svg", label: "Faster Support" },
  { icon: "/images/rewards/icon-money.svg", label: "Referral Bonuses" },
  { icon: "/images/rewards/icon-ranking.svg", label: "Rank Never Resets" },
];

/* ─── How it Works steps ──────────────────────────────────────────────── */

const howItWorksSteps = [
  { num: "01", title: "Spend", desc: "Every purchase earns permanent progress toward higher ranks." },
  { num: "02", title: "Rank Up", desc: "Higher tiers unlock bigger discounts, cashback, and exclusive access." },
  { num: "03", title: "Earn", desc: "Rewards stack automatically on every eligible purchase." },
];

/* ─── Rank tiers data ─────────────────────────────────────────────────── */

type Tier = {
  tier: number;
  name: string;
  tagline: string;
  badge: string;
  discount: string;
  color: string;
  bgColor: string;
  requirement: string;
  perks: string[];
};

const tiers: Tier[] = [
  {
    tier: 1, name: "Recruit", tagline: "\u201cEvery legend starts somewhere\u201d",
    badge: "/images/rewards/tier1-badge.png", discount: "2",
    color: "#ff5c00", bgColor: "rgba(255,92,0,0.1)",
    requirement: "Start here",
    perks: ["2% lifetime discount", "Email + ticket support", "Standard order queue"],
  },
  {
    tier: 2, name: "Contender", tagline: "\u201cFast rank climbed. Respect earned.\u201d",
    badge: "/images/rewards/tier2-badge.png", discount: "4",
    color: "#cd6357", bgColor: "rgba(205,99,87,0.1)",
    requirement: "Spend $250 lifetime",
    perks: ["4% lifetime discount", "Priority live chat", "Exclusive seasonal profile tier"],
  },
  {
    tier: 3, name: "Challenger", tagline: "\u201cYou play with intent.\u201d",
    badge: "/images/rewards/tier3-badge.png", discount: "6",
    color: "#658dda", bgColor: "rgba(101,141,218,0.1)",
    requirement: "Spend $750 lifetime",
    perks: ["6% lifetime discount", "Booster preference saved", "+5 OG points on every order", "Early access to new games/services"],
  },
  {
    tier: 4, name: "Elite", tagline: "\u201cRare air. Verified operator.\u201d",
    badge: "/images/rewards/tier4-badge.png", discount: "8",
    color: "#9e5bdb", bgColor: "rgba(158,91,219,0.1)",
    requirement: "Spend $1,500 lifetime",
    perks: ["8% lifetime discount", "Priority booster queue", "Exclusive Discord channel access", "Free order rushing (1 per month)"],
  },
  {
    tier: 5, name: "Pro", tagline: "\u201cYou made it to the show.\u201d",
    badge: "/images/rewards/tier5-badge.png", discount: "10",
    color: "#cba15b", bgColor: "rgba(203,161,91,0.1)",
    requirement: "Spend $2,500 lifetime",
    perks: ["10% lifetime discount", "Dedicated account manager", "Unlimited free order rushing", "2x seasonal cashback multiplier", "Birthday 25 OG drop", "Custom tier badge in chat"],
  },
  {
    tier: 6, name: "Legend", tagline: "\u201cThe name is whispered\u201d",
    badge: "/images/rewards/tier6-badge.png", discount: "12",
    color: "#76ba6b", bgColor: "rgba(118,186,107,0.1)",
    requirement: "Spend $5,000 lifetime",
    perks: ["12% lifetime discount", "White-glove concierge support", "Invite-only VIP Discord + IRL events", "Free service trials on launch", "3x seasonal cashback multiplier", "Annual merch drop"],
  },
];

/* ─── Seasonal tier progress data ─────────────────────────────────────── */

const seasonTiers = [
  { tier: 1, spend: "$200", goal: "$200", cashback: "$10", status: "claimed" as const, progress: 100 },
  { tier: 2, spend: "$500", goal: "$500", cashback: "$20", status: "claimed" as const, progress: 100 },
  { tier: 3, spend: "$680", goal: "$800", cashback: "$50", status: "active" as const, progress: 85 },
  { tier: 4, spend: "$680", goal: "$1,500", cashback: "$120", status: "locked" as const, progress: 45 },
  { tier: 5, spend: "$680", goal: "$3,000", cashback: "$300", status: "locked" as const, progress: 22 },
];

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Hero Section                                                          */
/* ═══════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#121419]">
      {/* Radial ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(40,30,20,0.6) 0%, rgba(23,25,31,0) 70%)",
        }}
      />

      {/* Orange blur orb — desktop right side, mobile top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2/3 top-[8%] -z-10 h-[260px] w-[190px] -translate-x-1/2 rounded-full opacity-70 xl:left-auto xl:right-[14%] xl:top-[30%] xl:h-[400px] xl:w-[250px] xl:translate-x-0 xl:opacity-100"
        style={{ background: "#ff5c00", filter: "blur(107px)" }}
      />

      {/* Character — mobile */}
      <div className="relative mx-auto h-[280px] overflow-hidden xl:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[40%] h-[180px] w-[200px] -translate-x-1/2 rounded-full opacity-60"
          style={{ background: "#ff5c00", filter: "blur(80px)" }}
        />
        <Image
          src="/images/rewards/hero-character.png"
          alt=""
          width={400}
          height={302}
          unoptimized
          className="absolute bottom-[-40px] left-1/2 h-auto w-[400px] -translate-x-1/2 object-contain"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[100px] w-full"
          style={{ background: "linear-gradient(to top, #121419 0%, transparent 100%)" }}
        />
      </div>

      {/* Character — desktop: large, moved left */}
      <Image
        src="/images/rewards/hero-character.png"
        alt=""
        width={900}
        height={860}
        unoptimized
        className="pointer-events-none absolute -z-10 hidden select-none object-contain xl:right-[-100px] xl:top-[80px] xl:block xl:h-[860px] xl:w-auto"
      />

      {/* Bottom gradient fade for desktop character */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-[280px] w-[700px] xl:block"
        style={{
          background:
            "linear-gradient(to top, #121419 0%, #121419 25%, rgba(18,20,25,0.84) 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] bg-[#121419] px-6 pb-20 pt-8 md:px-12 xl:bg-transparent xl:px-16 xl:pb-[120px] xl:pt-[230px]">
        <div className="flex flex-col gap-6 xl:gap-8">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-brand-main md:text-[48px] xl:text-[64px] xl:leading-[70px]">
              Loyalty Has its Perks
            </h1>
            <p className="max-w-[630px] font-body text-base font-medium leading-8 text-white md:text-xl xl:text-2xl xl:leading-[32px]">
              Earn cashback, unlock exclusive perks, and climb through six lifetime
              ranks. Your progress never resets.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex max-w-[608px] flex-wrap gap-4">
            {heroFeatures.map((f) => (
              <span
                key={f.label}
                className="flex h-10 items-center gap-2 rounded-3xl px-4 py-3 font-body text-sm font-medium text-white"
                style={{
                  backgroundImage: "linear-gradient(-30deg, rgb(23,25,31) 0%, rgb(56,56,82) 100%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.icon} alt="" className="h-5 w-5" />
                {f.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div>
            <Button href="/custom-order" variant="primary" size="lg">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  How It Works                                                          */
/* ═══════════════════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  return (
    <section className="bg-[#121419] px-6 py-16 md:px-12 xl:px-16 xl:py-0 xl:pb-24">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-8 font-heading text-[30px] font-bold leading-[38px] text-[#d9d9d9]">
          How it Works
        </h2>

        {/* Desktop: row with arrows */}
        <div className="hidden items-center gap-6 xl:flex">
          {howItWorksSteps.map((step, i) => (
            <div key={step.num} className="flex flex-1 items-center gap-6">
              <div
                className="flex flex-1 flex-col gap-1 rounded-[32px] p-8"
                style={{
                  border: "1px solid #7e7eb8",
                  backgroundImage: "linear-gradient(-60deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                  backdropFilter: "blur(7px)",
                }}
              >
                <span className="font-body text-2xl font-semibold leading-[30px] text-brand-main">
                  {step.title}
                </span>
                <p className="max-w-[185px] font-body text-base leading-[30px] text-white">
                  {step.desc}
                </p>
                <span className="text-right font-heading text-[64px] font-semibold text-[#383852]">
                  {step.num}
                </span>
              </div>

              {i < howItWorksSteps.length - 1 && (
                <div className="flex shrink-0 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/rewards/arrow-right.svg"
                    alt=""
                    className="h-5 w-5 -rotate-90 -scale-y-100"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: stacked with arrows between */}
        <div className="flex flex-col items-center gap-3 xl:hidden">
          {howItWorksSteps.map((step, i) => (
            <div key={step.num} className="flex w-full flex-col items-center gap-3">
              <div
                className="flex w-full items-center gap-4 rounded-3xl p-5"
                style={{
                  border: "1px solid #7e7eb8",
                  backgroundImage: "linear-gradient(-60deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                  backdropFilter: "blur(7px)",
                }}
              >
                <span className="shrink-0 font-heading text-[48px] font-semibold leading-none text-[#383852]">
                  {step.num}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-body text-lg font-semibold text-brand-main">
                    {step.title}
                  </span>
                  <p className="font-body text-sm leading-[20px] text-white">{step.desc}</p>
                </div>
              </div>
              {i < howItWorksSteps.length - 1 && (
                <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/rewards/arrow-right.svg"
                    alt=""
                    className="h-4 w-4 rotate-180"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Rank Tier Card                                                        */
/* ═══════════════════════════════════════════════════════════════════════ */

function TierCard({ t }: { t: Tier }) {
  return (
    <>
      {/* Desktop: vertical centered layout */}
      <div
        className="hidden overflow-hidden rounded-[32px] p-8 xl:flex xl:flex-col xl:items-center xl:gap-3 xl:text-center"
        style={{
          background: t.bgColor,
          border: `2px solid ${t.color}`,
        }}
      >
        {/* Badge with glow */}
        <div className="relative flex items-center justify-center">
          <div
            aria-hidden
            className="absolute h-[100px] w-[100px] rounded-full"
            style={{ background: t.color, filter: "blur(50px)", opacity: 0.5 }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.badge} alt={t.name} className="relative h-[100px] w-[100px]" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="font-body text-xs uppercase tracking-[0.48px] text-white/80">
            Tier {t.tier}
          </span>
          <span className="font-body text-xl font-bold leading-[30px] text-white">{t.name}</span>
          <span className="font-body text-xs italic text-white">{t.tagline}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-end font-heading font-bold" style={{ color: t.color }}>
            <span className="text-[48px] leading-none">{t.discount}</span>
            <span className="relative -top-1 text-[30px] leading-[38px]">%</span>
          </div>
          <div className="flex items-center gap-1 font-body text-xs uppercase tracking-[0.48px] text-white/80">
            <span>lifetime</span>
            <span className="inline-block h-0.5 w-0.5 rounded-full bg-[#fa4609]" />
            <span>auto-applied</span>
          </div>
        </div>

        <span className="font-body text-xs text-white/80">{t.requirement}</span>

        <ul className="flex w-full flex-col gap-1 text-left">
          {t.perks.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-[#fa4609]" />
              <span className="font-body text-sm text-white">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: horizontal layout — badge left, info right */}
      <div
        className="flex gap-5 overflow-hidden rounded-[24px] p-5 xl:hidden"
        style={{
          background: t.bgColor,
          border: `2px solid ${t.color}`,
        }}
      >
        {/* Left: badge + name + tagline */}
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <div
              aria-hidden
              className="absolute h-[80px] w-[80px] rounded-full"
              style={{ background: t.color, filter: "blur(40px)", opacity: 0.5 }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.badge} alt={t.name} className="relative h-[80px] w-[80px]" />
          </div>
          <span className="font-body text-xs uppercase tracking-[0.48px] text-white/80">
            Tier {t.tier}
          </span>
          <span className="font-body text-lg font-bold leading-6 text-white">{t.name}</span>
          <span className="font-body text-[11px] italic text-white">{t.tagline}</span>
        </div>

        {/* Right: discount + perks */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start gap-3">
            <div className="flex items-end font-heading font-bold" style={{ color: t.color }}>
              <span className="text-[40px] leading-none">{t.discount}</span>
              <span className="relative -top-0.5 text-[24px] leading-[30px]">%</span>
            </div>
            <div className="flex flex-col font-body text-xs uppercase tracking-[0.48px] text-white/80">
              <span>lifetime</span>
              <span>auto-applied</span>
            </div>
          </div>

          <span className="font-body text-xs text-white/80">{t.requirement}</span>

          <ul className="flex flex-col gap-1">
            {t.perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-[#fa4609]" />
                <span className="font-body text-sm text-white">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ClimbRanks() {
  return (
    <section className="px-6 py-16 md:px-12 xl:px-16 xl:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center xl:mb-[70px]">
          <h2 className="font-heading text-[32px] font-bold leading-tight text-white md:text-[40px] xl:text-[48px] xl:leading-[60px]">
            Climb Through the Ranks
          </h2>
          <p className="max-w-[765px] font-body text-base text-white/70 xl:text-xl xl:leading-[30px]">
            Your highest rank is permanent. The more you spend, the more you unlock.
          </p>
        </div>

        {/* 3 per row on desktop, 2 rows */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {tiers.map((t) => (
            <TierCard key={t.tier} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Seasonal Cashback + Invite Friends (merged for shared glow orbs)     */
/* ═══════════════════════════════════════════════════════════════════════ */

function SeasonalAndInvite() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://ogedge.com/en/login?referral=I28H0T");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-12 xl:px-16 xl:py-20">
      {/* Shared glow orbs */}
      <div
        className="pointer-events-none absolute rounded-[128px]"
        style={{ left: -112, top: 280, width: 256, height: 256, background: "rgba(255,92,0,0.2)", filter: "blur(107px)" }}
      />
      <div
        className="pointer-events-none absolute rounded-[128px]"
        style={{ right: -60, top: 180, width: 256, height: 256, background: "rgba(255,92,0,0.2)", filter: "blur(107px)" }}
      />
      <div
        className="pointer-events-none absolute rounded-[128px]"
        style={{ left: "40%", top: -71, width: 256, height: 256, background: "rgba(255,92,0,0.2)", filter: "blur(107px)" }}
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-16 xl:gap-16">

        {/* ── Seasonal Cashback ── */}
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-8">
          {/* Left: text */}
          <div className="flex shrink-0 flex-col justify-center gap-8">
            <h2 className="font-heading text-[28px] font-bold leading-tight text-white md:text-[32px] xl:text-[36px]">
              Seasonal Cashback{"\n"}Events
            </h2>
            <div className="flex flex-col gap-2">
              <p className="font-body text-base leading-7 text-white xl:w-[460px] xl:text-lg xl:leading-[28px]">
                Every season gives members a chance to unlock bonus cashback rewards based on
                total spend.
              </p>
              <p className="font-heading text-lg font-bold uppercase leading-[38px] text-[#ff975d] xl:text-2xl">
                Seasons reset every 90 days.{"\n"}Lifetime rank does not.
              </p>
            </div>
          </div>

          {/* Right: tier progress cards */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {seasonTiers.map((st) => {
              const isLocked = st.status === "locked";
              const isClaimed = st.status === "claimed";
              return (
                <div
                  key={st.tier}
                  className="flex flex-col gap-4 rounded-2xl p-4"
                  style={{
                    background: isLocked ? "#383852" : "#232330",
                    border: isLocked ? "1px solid #383852" : "1px solid #ff975d",
                    opacity: isLocked ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-xs uppercase tracking-[0.48px] text-white">
                        Tier {st.tier}
                      </span>
                      <span className="whitespace-nowrap font-body text-xl font-bold tracking-[-0.4px] text-white">
                        Spend {st.goal}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        {isClaimed && (
                          <span className="flex items-center gap-1 rounded-lg bg-[rgba(26,173,25,0.2)] px-2 py-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/rewards/check-all.svg" alt="" className="h-4 w-4" />
                            <span className="font-body text-xs font-bold uppercase text-[#1aad19]">
                              claimed
                            </span>
                          </span>
                        )}
                        {st.status === "active" && (
                          <span className="rounded-lg bg-[rgba(255,92,0,0.2)] px-2 py-1 font-body text-xs font-bold uppercase text-brand-main">
                            active
                          </span>
                        )}
                        {isLocked && (
                          <span className="rounded-lg bg-[#232330] px-2 py-1 font-body text-xs font-bold uppercase text-white">
                            locked
                          </span>
                        )}
                        <span className="font-heading text-2xl font-bold leading-8 text-brand-main">
                          {st.cashback}
                        </span>
                      </div>
                      <span className="font-body text-xs uppercase tracking-[0.48px] text-white">
                        cashback
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-4">
                    <div
                      className="shrink-0 rounded-lg px-2 py-1 font-body text-sm font-bold text-white"
                      style={{
                        background: "#13151e",
                        border: "1px solid #383852",
                        textShadow: "0px 0px 14px rgba(255,255,255,0.4)",
                      }}
                    >
                      {st.spend}
                    </div>
                    <div className="relative h-1 flex-1 overflow-hidden rounded-[10px]" style={{ background: isLocked ? "#232330" : "#383852" }}>
                      <div
                        className="absolute left-0 top-0 h-full rounded-[10px]"
                        style={{
                          width: `${st.progress}%`,
                          background: "#ff5c00",
                        }}
                      />
                    </div>
                    <div
                      className="shrink-0 rounded-lg px-2 py-1 font-body text-sm font-bold text-white"
                      style={{
                        background: "#13151e",
                        border: "1px solid #383852",
                        textShadow: "0px 0px 14px rgba(255,255,255,0.4)",
                      }}
                    >
                      {st.goal}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Invite Friends ── */}
        <div className="flex flex-col-reverse gap-6 xl:flex-row xl:items-center xl:gap-16">
          {/* Left on desktop / Bottom on mobile: referral card */}
          <div className="relative shrink-0 xl:w-[490px]">
            <div className="rounded-2xl bg-[#232330] p-6 xl:pb-28">
              <div className="flex items-center gap-6">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/icons/referral-icon.svg" alt="" className="h-6 w-6" />
                    <span className="font-body text-xs font-bold uppercase leading-[18px] text-[#ff975d]">
                      recruit your squad
                    </span>
                  </div>
                  <p className="font-body text-xl font-bold leading-normal tracking-[-0.4px] text-white">
                    Earn <span className="text-[#ff975d]">$10</span> per friend, give them{" "}
                    <span className="text-[#ff975d]">10% off</span>
                  </p>
                  <p className="font-body text-sm text-white">
                    Share your code. They get a discount on their first order, you get rewarded
                    right after they checkout.
                  </p>
                </div>

                <div className="h-[50px] w-px shrink-0 bg-[#383852]" />

                <div className="flex shrink-0 flex-col items-center gap-1">
                  <span className="font-body text-xs font-bold uppercase leading-[18px] text-white/50">
                    your code
                  </span>
                  <span className="font-heading text-[30px] font-bold uppercase leading-[38px] text-brand-main">
                    12HOT
                  </span>
                  <span className="font-body text-sm text-white/50">3 friends joined</span>
                </div>
              </div>

              {/* URL bar + COPY — inline on mobile only */}
              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#16161e] px-5 py-4 xl:hidden">
                <span className="flex-1 truncate font-mono text-sm text-white">
                  https://ogedge.com/en/login?referral=I28H0T
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-brand-main px-4 py-3 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-85"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-6 w-6" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* URL bar — desktop only, overlapping bottom-left */}
            <div
              className="absolute -left-[87px] bottom-12 hidden w-[442px] rounded-2xl px-6 py-4 xl:block"
              style={{ background: "#16161e" }}
            >
              <span className="block truncate font-mono text-sm text-white">
                https://ogedge.com/en/login?referral=I28H0T
              </span>
            </div>

            {/* COPY button — desktop only, bottom-right of URL bar */}
            <button
              type="button"
              onClick={handleCopy}
              className="absolute bottom-2 left-[270px] hidden items-center gap-2.5 rounded-lg bg-brand-main px-4 py-3 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-85 xl:flex"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-6 w-6" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Right on desktop / Top on mobile: text */}
          <div className="flex shrink-0 flex-col gap-8">
            <h2 className="font-heading text-[28px] font-bold leading-normal text-white xl:w-[297px] xl:text-[36px]">
              Invite Friends. Earn More
            </h2>
            <div className="flex flex-col gap-4">
              <p className="font-body text-base leading-7 text-white xl:max-w-[459px] xl:text-lg xl:leading-[28px]">
                Give your friends a discount on their first order and earn rewards when they
                join.
              </p>
              <a
                href="/custom-order"
                className="flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-80"
              >
                Create Account to Unlock Referrals
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Featured Benefits                                                     */
/* ═══════════════════════════════════════════════════════════════════════ */

const benefitCards = [
  { icon: "/images/rewards/benefit-discount.svg", title: "Lifetime Discounts", desc: "Permanent discounts that increase with your rank." },
  { icon: "/images/rewards/benefit-cashback.svg", title: "Seasonal Cashback", desc: "Earn cashback every season based on your activity." },
  { icon: "/images/rewards/benefit-drops.svg", title: "Exclusive Drops", desc: "Access limited offers and VIP-only opportunities." },
  { icon: "/images/rewards/benefit-support.svg", title: "Faster Support", desc: "Higher ranks receive priority response times." },
  { icon: "/images/rewards/benefit-referral.svg", title: "Referral Bonuses", desc: "Invite friends and earn extra rewards together." },
  { icon: "/images/rewards/benefit-rank.svg", title: "Rank Never Resets", desc: "Your lifetime progress is permanent." },
];

function FeaturedBenefits() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-dark-main">
      {/* Radial ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(40,30,20,0.6) 0%, rgba(23,25,31,0) 70%)",
        }}
      />

      {/* Orange blur orb — desktop right side, mobile top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[260px] w-[190px] -translate-x-1/2 rounded-full opacity-70 xl:left-auto xl:right-[4%] xl:top-[30%] xl:h-[400px] xl:w-[250px] xl:translate-x-0 xl:opacity-100"
        style={{ background: "#ff5c00", filter: "blur(107px)" }}
      />

      {/* Character — mobile: cropped top artwork */}
      <div className="relative mx-auto h-[320px] overflow-hidden xl:hidden">
        <Image
          src="/images/rewards/benefits-character.png"
          alt=""
          width={520}
          height={497}
          unoptimized
          className="absolute bottom-[-74px] left-1/2 h-[400px] w-auto -translate-x-1/2 object-contain"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[115px] w-full"
          style={{
            background:
              "linear-gradient(to top, #17191f 0%, rgba(23,25,31,0.92) 35%, transparent 100%)",
          }}
        />
      </div>

      {/* Character — desktop: pushed right */}
      <Image
        src="/images/rewards/benefits-character.png"
        alt=""
        width={745}
        height={712}
        unoptimized
        className="pointer-events-none absolute -z-10 hidden select-none object-contain xl:right-[-300px] xl:top-[60px] xl:block xl:h-[750px] xl:w-auto"
      />

      {/* Bottom gradient fade for desktop character */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-[220px] w-[600px] xl:block"
        style={{
          background:
            "linear-gradient(to top,rgb(23, 25, 31) 0%, rgb(23, 25, 31) 20%, rgba(23, 25, 31, 0.84) 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] bg-dark-main px-4 pb-10 pt-4 md:px-12 xl:bg-transparent xl:px-16 xl:py-[120px]">
        <div className="flex flex-col gap-6 xl:gap-8">
          {/* Header */}
          <div className="xl:max-w-[60%]">
            <h2 className="font-heading text-base font-bold text-white md:text-4xl xl:text-5xl">
              Featured Benefits
            </h2>
            <p className="mt-4 font-body text-xs leading-[18px] text-white/90 md:text-lg xl:text-xl xl:leading-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed felis vel eros
              eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod
              felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.
            </p>
          </div>

          {/* Mobile + tablet: single column */}
          <div className="flex flex-col gap-4 xl:hidden">
            {benefitCards.map((b) => (
              <div
                key={b.title}
                className="flex min-h-[104px] flex-col gap-2 rounded-[24px] p-4"
                style={{
                  border: "1px solid #7e7eb8",
                  background: "linear-gradient(-46deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                  backdropFilter: "blur(7px)",
                }}
              >
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.icon} alt="" className="h-5 w-5" />
                  <span className="font-body text-base font-bold leading-5 text-brand-main">
                    {b.title}
                  </span>
                </div>
                <p className="font-body text-xs leading-[18px] text-white/80 md:text-sm">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: 3-col grid */}
          <div className="hidden gap-6 xl:grid xl:grid-cols-3">
            {benefitCards.map((b) => (
              <div
                key={b.title}
                className="flex min-h-[180px] flex-col gap-2 rounded-[32px] p-8"
                style={{
                  border: "1px solid #7e7eb8",
                  background: "linear-gradient(-46deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                  backdropFilter: "blur(7px)",
                }}
              >
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.icon} alt="" className="h-6 w-6" />
                  <span className="font-body text-xl font-bold leading-6 text-brand-main">
                    {b.title}
                  </span>
                </div>
                <p className="font-body text-base leading-6 text-white/80">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Page Composition                                                      */
/* ═══════════════════════════════════════════════════════════════════════ */

export function RewardsPageContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <Hero />
        <HowItWorksSection />
        <ClimbRanks />
        <FeaturedBenefits />
        <SeasonalAndInvite />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
