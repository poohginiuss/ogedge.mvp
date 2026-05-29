"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const badges = [
  { icon: "/images/affiliate/icon-payment.svg", label: "Weekly payouts", tooltip: "Commissions are paid out every week with no minimum threshold." },
  { icon: "/images/affiliate/icon-trust.svg", label: "Trusted by 1234+ affiliates", tooltip: "Join a network of over 1,200 active affiliates earning with OGEdge." },
  { icon: "/images/affiliate/icon-approval.svg", label: "Instant approval", tooltip: "Get approved instantly and start promoting right away." },
];

function AffiliateBadge({ badge }: { badge: (typeof badges)[number] }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="group/badge relative">
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-3xl border border-transparent px-3 py-2 font-body text-xs font-medium text-white transition-all duration-200 hover:border-brand-light/40 hover:shadow-[0_0_16px_rgba(255,92,0,0.25)] xl:px-4 xl:py-3 xl:text-sm"
        style={{
          backgroundImage: "linear-gradient(-30deg, rgb(23,25,31) 0%, rgb(56,56,82) 100%)",
        }}
        onClick={() => setShowTip((v) => !v)}
        onBlur={() => setShowTip(false)}
      >
        <Image src={badge.icon} alt="" width={20} height={20} className="shrink-0" />
        <span className="whitespace-nowrap">{badge.label}</span>
      </button>
      <div
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-[220px] -translate-x-1/2 rounded-2xl border border-dark-border p-4 transition-opacity duration-200 xl:opacity-0 xl:group-hover/badge:pointer-events-auto xl:group-hover/badge:opacity-100 ${showTip ? "pointer-events-auto !opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(-43deg, #17191f, #383852)" }}
      >
        <p className="font-body text-sm leading-5 text-white/90">{badge.tooltip}</p>
      </div>
    </div>
  );
}

export function AffiliateHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[rgba(0,0,0,0.2)]">
      {/* Desktop character — absolutely positioned, fills full section height */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[55%] xl:block">
        <div className="absolute left-[35%] top-[30%] h-[526px] w-[307px] rounded-full" style={{ background: "var(--brand-main, #ff5c00)", filter: "blur(232px)", opacity: 0.6 }} />
        <Image
          src="/images/affiliate/hero-character.png"
          alt="OGEdge Affiliate Character"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Mobile character — at the top on mobile */}
      <div className="relative mx-auto h-[260px] w-full max-w-[360px] xl:hidden">
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "var(--brand-main, #ff5c00)", filter: "blur(120px)", opacity: 0.4 }} />
        <Image
          src="/images/affiliate/hero-character.png"
          alt="OGEdge Affiliate Character"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-10 md:px-12 xl:min-h-[760px] xl:px-0 xl:py-[200px]">
        {/* Left: Text + CTA + Badges */}
        <div className="flex flex-col items-start gap-10 xl:gap-12 xl:max-w-[704px]">
          <div className="flex flex-col gap-1 text-white">
            <h1 className="font-heading text-[30px] font-bold leading-[38px] md:text-5xl xl:text-[64px] xl:leading-[1.1]">
              Share. Refer. <span className="text-brand-main">Earn</span>.
            </h1>
            <p className="mt-2 max-w-[637px] font-body text-lg leading-[22px] text-white/80 xl:text-base xl:leading-[30px]">
              Earn up to 20% commission on every order your audience places —
              plus custom discount codes up to 15% to give your followers a
              reason to click. OGEdge has been running affiliate partnerships
              since 2006. No gimmicks, no delayed payouts, no fine print.
            </p>
          </div>

          {/* Mobile button */}
          <div className="xl:hidden">
            <Button
              href="#apply"
              variant="primary"
              size="sm"
              icon={
                <Image
                  src="/images/affiliate/icon-arrow.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="rotate-90"
                />
              }
            >
              Apply to the Affiliate Program
            </Button>
          </div>
          {/* Desktop button */}
          <div className="hidden xl:block">
            <Button
              href="#apply"
              variant="primary"
              size="lg"
              icon={
                <Image
                  src="/images/affiliate/icon-arrow.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="rotate-90"
                />
              }
            >
              Apply to the Affiliate Program
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 xl:gap-4">
            {badges.map((badge) => (
              <AffiliateBadge key={badge.label} badge={badge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
