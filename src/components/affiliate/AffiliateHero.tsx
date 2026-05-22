"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

const badges = [
  { icon: "/images/affiliate/icon-payment.svg", label: "Weekly payouts" },
  {
    icon: "/images/affiliate/icon-trust.svg",
    label: "Trusted by 1234+ affiliates",
  },
  { icon: "/images/affiliate/icon-approval.svg", label: "Instant approval" },
];

export function AffiliateHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[rgba(0,0,0,0.2)]">
      {/* Desktop character — absolutely positioned, fills full section height */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[55%] lg:block">
        <div className="gpu-blur absolute left-[35%] top-[30%] h-[526px] w-[307px] rounded-[221px] bg-brand-main opacity-60 blur-[232px]" />
        <Image
          src="/images/affiliate/hero-character.png"
          alt="OGEdge Affiliate Character"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Mobile character — at the top on mobile */}
      <div className="relative mx-auto h-[260px] w-full max-w-[360px] lg:hidden">
        <div className="gpu-blur absolute left-1/2 top-1/2 h-[200px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-main opacity-40 blur-[120px]" />
        <Image
          src="/images/affiliate/hero-character.png"
          alt="OGEdge Affiliate Character"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-10 md:px-12 lg:min-h-[760px] lg:px-0 lg:py-[200px]">
        {/* Left: Text + CTA + Badges */}
        <div className="flex flex-col items-start gap-10 lg:gap-12 lg:max-w-[704px]">
          <div className="flex flex-col gap-1 text-white">
            <h1 className="font-heading text-[30px] font-bold leading-[38px] md:text-5xl lg:text-[64px] lg:leading-[1.1]">
              Share. Refer. <span className="text-brand-main">Earn</span>.
            </h1>
            <p className="mt-2 max-w-[637px] font-body text-lg leading-[22px] text-white/80 lg:text-base lg:leading-[30px]">
              Earn up to 20% commission on every order your audience places —
              plus custom discount codes up to 15% to give your followers a
              reason to click. OGEdge has been running affiliate partnerships
              since 2006. No gimmicks, no delayed payouts, no fine print.
            </p>
          </div>

          {/* Mobile button */}
          <div className="lg:hidden">
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
          <div className="hidden lg:block">
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

          <div className="flex flex-wrap gap-3 lg:gap-4">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-3xl px-3 py-2 lg:px-4 lg:py-3"
                style={{
                  backgroundImage:
                    "linear-gradient(-30deg, rgb(23,25,31) 0%, rgb(56,56,82) 100%)",
                }}
              >
                <Image
                  src={badge.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="whitespace-nowrap font-body text-xs font-medium text-white lg:text-sm">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
