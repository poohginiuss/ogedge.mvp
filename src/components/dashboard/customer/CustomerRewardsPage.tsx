"use client";

import { Faq } from "@/components/sections/Faq";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

/* ─── Tier data ────────────────────────────────────────────────────────── */

type RankTier = {
  tier: number;
  name: string;
  tagline: string;
  discount: string;
  color: string;
  bgColor: string;
  requirement: string;
  perks: string[];
  icon: string;
  current?: boolean;
};

const rankTiers: RankTier[] = [
  {
    tier: 1,
    name: "Recruit",
    tagline: "\u201cEvery legend starts somewhere\u201d",
    discount: "2",
    color: "#ff5c00",
    bgColor: "rgba(255,92,0,0.15)",
    requirement: "Start here",
    perks: ["2% lifetime discount", "Email + ticket support", "Standard order queue"],
    icon: "/images/rewards/tier-shield.svg",
    current: true,
  },
  {
    tier: 2,
    name: "Contender",
    tagline: "\u201cFast rank climbed. Respect earned.\u201d",
    discount: "4",
    color: "#cd6357",
    bgColor: "rgba(205,99,87,0.15)",
    requirement: "Spend $250 lifetime or Earn x Points",
    perks: ["4% lifetime discount", "Priority live chat", "Exclusive seasonal profile tier"],
    icon: "/images/rewards/tier-shield.svg",
  },
  {
    tier: 3,
    name: "Challenger",
    tagline: "\u201cYou play with intent.\u201d",
    discount: "6",
    color: "#658dda",
    bgColor: "rgba(101,141,218,0.15)",
    requirement: "Spend $750 lifetime",
    perks: [
      "6% lifetime discount",
      "Booster preference saved",
      "+5 OG points on every order",
      "Early access to new games/services",
    ],
    icon: "/images/rewards/tier-bolt.svg",
  },
  {
    tier: 4,
    name: "Elite",
    tagline: "\u201cRare air. Verified operator.\u201d",
    discount: "8",
    color: "#9e5bdb",
    bgColor: "rgba(158,91,219,0.15)",
    requirement: "Spend $1,500 lifetime",
    perks: [
      "8% lifetime discount",
      "Priority booster queue",
      "Exclusive Discord channel access",
      "Free order rushing (1 per month)",
    ],
    icon: "/images/rewards/tier-star.svg",
  },
  {
    tier: 5,
    name: "Pro",
    tagline: "\u201cYou made it to the show.\u201d",
    discount: "10",
    color: "#cba15b",
    bgColor: "rgba(203,161,91,0.15)",
    requirement: "Spend $2,500 lifetime",
    perks: [
      "10% lifetime discount",
      "Dedicated account manager",
      "Unlimited free order rushing",
      "2x seasonal cashback multiplier",
      "Birthday 25 OG drop",
      "Custom tier badge in chat",
    ],
    icon: "/images/rewards/tier-crown.svg",
  },
  {
    tier: 6,
    name: "Legend",
    tagline: "\u201cThe name is whispered\u201d",
    discount: "12",
    color: "#76ba6b",
    bgColor: "rgba(118,186,107,0.15)",
    requirement: "Spend $5,000 lifetime",
    perks: [
      "12% lifetime discount",
      "White-glove concierge support",
      "Invite-only VIP Discord + IRL events",
      "Free service trials on launch",
      "3x seasonal cashback multiplier",
      "Annual merch drop",
    ],
    icon: "/images/rewards/tier-trophy.svg",
  },
];

/* ─── Seasonal cashback data ───────────────────────────────────────────── */

type SeasonCashbackTier = {
  tier: number;
  spend: string;
  goal: string;
  cashback: string;
  status: "claimed" | "active" | "locked";
  progress: number;
  current: number;
};

const seasonCashbackTiers: SeasonCashbackTier[] = [
  { tier: 1, spend: "$200", goal: "$200", cashback: "$10", status: "claimed", progress: 100, current: 200 },
  { tier: 2, spend: "$500", goal: "$500", cashback: "$20", status: "claimed", progress: 100, current: 500 },
  { tier: 3, spend: "$800", goal: "$800", cashback: "$50", status: "active", progress: 85, current: 680 },
  { tier: 4, spend: "$1,500", goal: "$1,500", cashback: "$120", status: "locked", progress: 45, current: 680 },
  { tier: 5, spend: "$3,000", goal: "$3,000", cashback: "$300", status: "locked", progress: 22, current: 680 },
];

/* ─── Order history data ───────────────────────────────────────────────── */

const orderHistory = [
  { id: "#ORD-123456", title: "Game - Service", status: "complete", saved: "$10.00", total: "$123.00" },
  { id: "#ORD-123456", title: "Game - Service", status: "complete", saved: "$10.00", total: "$123.00" },
];

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Stat Cards                                                            */
/* ═══════════════════════════════════════════════════════════════════════ */

function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Current Rank */}
      <div
        className="flex items-center gap-4 rounded-3xl px-8 py-6"
        style={{
          background: "rgba(255,92,0,0.1)",
          border: "1px solid #ff975d",
        }}
      >
        <div className="relative flex shrink-0 items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 92" className="relative" fill="none">
            <defs>
              <linearGradient id="hex-grad-stat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a3d" />
                <stop offset="100%" stopColor="#c24a00" />
              </linearGradient>
            </defs>
            <polygon points="40,0 77.32,20 77.32,72 40,92 2.68,72 2.68,20" fill="url(#hex-grad-stat)" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/rewards/tier-shield.svg" alt="" className="absolute h-[48px] w-[48px]" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-body text-sm font-medium uppercase text-white">Current Rank</span>
          <span className="font-heading text-[30px] font-bold leading-[38px] text-white">Recruit</span>
          <span className="font-body text-sm text-white">2% off everything, forever</span>
        </div>
      </div>

      {/* OG Points */}
      <div className="flex flex-col justify-center gap-1 rounded-3xl px-8 py-6" style={{ background: "rgba(56,56,82,0.3)" }}>
        <span className="font-body text-sm font-medium uppercase text-white">OG Points</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span
              className="font-heading text-2xl font-black text-white"
              style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
            >
              12
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/og-point-coin.png" alt="OG" className="h-[18px] w-[31px] object-contain" />
          </div>
          <span
            className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase text-brand-main"
            style={{ background: "rgba(255,92,0,0.2)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/medal-star-orange.svg" alt="" className="h-4 w-4" />
            Novice
          </span>
        </div>
        <span className="font-body text-sm text-white">Get 10 more points to reach next tier</span>
      </div>

      {/* To Next Rank */}
      <div className="flex flex-col justify-between gap-3 rounded-3xl px-8 py-6" style={{ background: "rgba(56,56,82,0.3)" }}>
        <div className="flex flex-col">
          <span className="font-body text-sm font-medium uppercase text-white">To Next Rank</span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-[30px] font-bold leading-[38px] text-white">$-390</span>
            <span className="rounded-lg px-2 py-1 font-body text-sm font-semibold uppercase" style={{ background: "rgba(194,39,45,0.2)", color: "#c2272d" }}>
              Contender
            </span>
          </div>
        </div>
        <div className="relative h-1 w-full rounded-full bg-[#383852]">
          <div className="absolute left-0 top-0 h-1 rounded-full bg-brand-main" style={{ width: "34.51%" }} />
        </div>
      </div>

      {/* Season Cashback */}
      <div className="flex flex-col justify-between gap-3 rounded-3xl px-8 py-6" style={{ background: "rgba(56,56,82,0.3)" }}>
        <div className="flex flex-col">
          <span className="font-body text-sm font-medium uppercase text-white">Season Cashback</span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-light">$40</span>
            <span className="font-body text-sm text-white">earned - $50 pending</span>
          </div>
        </div>
        <span className="font-body text-sm text-white">$640 / $3000 this quarter</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Lifetime Rank Progression                                             */
/* ═══════════════════════════════════════════════════════════════════════ */

const progressionIcons = [
  { icon: "/images/rewards/tier-shield.svg", color: "#ff5c00" },
  { icon: "/images/rewards/tier-shield.svg", color: "#cd6357" },
  { icon: "/images/rewards/tier-bolt.svg", color: "#658dda" },
  { icon: "/images/rewards/tier-star.svg", color: "#9e5bdb" },
  { icon: "/images/rewards/tier-crown.svg", color: "#cba15b" },
  { icon: "/images/rewards/tier-trophy.svg", color: "#76ba6b" },
];

const progressionLabels = [
  { tier: "Tier 1", name: "Recruit", amount: "Start" },
  { tier: "Tier 2", name: "Contender", amount: "$250" },
  { tier: "Tier 3", name: "Challenger", amount: "$750" },
  { tier: "Tier 4", name: "Elite", amount: "$1,500" },
  { tier: "Tier 5", name: "Pro", amount: "$2,500" },
  { tier: "Tier 6", name: "Legend", amount: "$5,000" },
];

function LifetimeRankProgression() {
  const currentTierIdx = 0;
  const progressToNext = 34.51;
  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-[#232330] p-8">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <h2 className="font-body text-xl font-bold text-white">Lifetime Rank Progression</h2>
          <span className="hidden font-body text-base text-white xl:block">placeholder perks - pending review</span>
        </div>
        <p className="font-body text-base text-white">Every dollar spent = permanent progress. Highest rank never drops</p>
      </div>

      {/* Desktop progress bar */}
      <div className="hidden flex-col gap-4 xl:flex">
        <div className="flex w-full items-center">
          {progressionIcons.map((p, i) => {
            const isCompleted = i < currentTierIdx;
            const isCurrent = i === currentTierIdx;
            const isActive = isCompleted || isCurrent;
            const gradId = `hex-prog-${i}`;
            const barAfter = i < 5;
            const barIsCompleted = i < currentTierIdx;
            const barIsCurrent = i === currentTierIdx;
            return (
              <div key={i} className="flex flex-1 items-center">
                <div className="relative z-10 flex h-[80px] w-[80px] shrink-0 items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 92" className="relative" fill="none">
                    {isActive && (
                      <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff8a3d" />
                          <stop offset="100%" stopColor="#c24a00" />
                        </linearGradient>
                      </defs>
                    )}
                    <polygon
                      points="40,0 77.32,20 77.32,72 40,92 2.68,72 2.68,20"
                      fill={isActive ? `url(#${gradId})` : "#4a4a6a"}
                      opacity={isActive ? 1 : 0.6}
                    />
                  </svg>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.icon} alt="" className="absolute h-[48px] w-[48px]" style={{ opacity: isActive ? 1 : 0.5 }} />
                </div>
                {barAfter && (
                  <div className="relative mx-[-8px] h-1 flex-1 overflow-hidden rounded-full bg-[#383852]">
                    {barIsCompleted && (
                      <div className="absolute inset-0 rounded-full bg-brand-main" />
                    )}
                    {barIsCurrent && (
                      <div className="absolute left-0 top-0 h-full rounded-full bg-brand-main" style={{ width: `${progressToNext}%` }} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex w-full">
          {progressionLabels.map((l, i) => (
            <div key={i} className="flex flex-1 flex-col items-center text-center">
              <span className="font-body text-xs uppercase tracking-wider text-white">{l.tier}</span>
              <span className="font-body text-xl font-bold text-white">{l.name}</span>
              <span className="font-body text-sm text-white">{l.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile progress: current tier → next tier */}
      <div className="flex flex-col gap-5 xl:hidden">
        {(() => {
          const nextIdx = Math.min(currentTierIdx + 1, progressionIcons.length - 1);
          const currentIcon = progressionIcons[currentTierIdx];
          const currentLabel = progressionLabels[currentTierIdx];
          const nextLabel = progressionLabels[nextIdx];
          const nextClusterIcons = progressionIcons.slice(nextIdx, nextIdx + 3);
          return (
            <>
              <div className="flex items-center gap-0">
                {/* Current tier - large hex */}
                <div className="relative z-10 flex shrink-0 items-center justify-center" style={{ width: 80, height: 80 }}>
                  <svg width="80" height="80" viewBox="0 0 80 92" fill="none">
                    <defs>
                      <linearGradient id="hex-mob-current" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff8a3d" />
                        <stop offset="100%" stopColor="#c24a00" />
                      </linearGradient>
                    </defs>
                    <polygon points="40,0 77.32,20 77.32,72 40,92 2.68,72 2.68,20" fill="url(#hex-mob-current)" />
                  </svg>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentIcon.icon} alt="" className="absolute h-10 w-10" />
                </div>

                {/* Progress bar */}
                <div className="relative mx-[-6px] h-1 flex-1 overflow-hidden rounded-full bg-[#383852]">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-brand-main" style={{ width: `${progressToNext}%` }} />
                </div>

                {/* Next tier - 3 clustered hexes: same size → smaller → smallest */}
                <div className="relative z-10 flex shrink-0 items-center" style={{ width: 130, height: 80 }}>
                  {nextClusterIcons.map((p, ci) => {
                    const gradId = `hex-mob-next-${ci}`;
                    const sizes = [80, 56, 44];
                    const iconSizes = [40, 28, 22];
                    const size = sizes[ci] ?? 44;
                    const iconSz = iconSizes[ci] ?? 22;
                    return (
                      <div
                        key={ci}
                        className="relative flex shrink-0 items-center justify-center"
                        style={{ width: size, height: size, marginLeft: ci > 0 ? -10 : 0, zIndex: 3 - ci }}
                      >
                        <svg width={size} height={size} viewBox="0 0 80 92" fill="none">
                          <defs>
                            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#5a5a80" />
                              <stop offset="100%" stopColor="#3a3a5a" />
                            </linearGradient>
                          </defs>
                          <polygon points="40,0 77.32,20 77.32,72 40,92 2.68,72 2.68,20" fill={`url(#${gradId})`} opacity={0.6} />
                        </svg>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.icon} alt="" className="absolute" style={{ width: iconSz, height: iconSz, opacity: 0.5 }} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Labels for current and next tier */}
              <div className="flex items-start justify-between px-2">
                <div className="flex flex-col">
                  <span className="font-body text-xs uppercase tracking-wider text-white/70">{currentLabel.tier}</span>
                  <span className="font-body text-xl font-bold text-white">{currentLabel.name}</span>
                  <span className="font-body text-sm text-white/70">{currentLabel.amount}</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="font-body text-xs uppercase tracking-wider text-white/70">{nextLabel.tier}</span>
                  <span className="font-body text-xl font-bold text-white">{nextLabel.name}</span>
                  <span className="font-body text-sm text-white/70">{nextLabel.amount}</span>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Tier Detail Cards (3x2 grid)                                          */
/* ═══════════════════════════════════════════════════════════════════════ */

function HexBadge({ icon, color, isCurrent, tier }: { icon: string; color: string; isCurrent?: boolean; tier: number }) {
  const gradId = `hex-detail-${tier}`;
  return (
    <div className="relative flex items-center justify-center">
      {/* Orb glow behind badge */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 120,
          height: 120,
          background: color,
          filter: "blur(45px)",
          opacity: isCurrent ? 0.7 : 0.35,
        }}
      />
      {/* Hexagonal polygon with gradient */}
      <svg width="80" height="80" viewBox="0 0 80 92" className="relative z-10" fill="none">
        {isCurrent ? (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8a3d" />
              <stop offset="100%" stopColor="#c24a00" />
            </linearGradient>
          </defs>
        ) : (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a5a80" />
              <stop offset="100%" stopColor="#3a3a5a" />
            </linearGradient>
          </defs>
        )}
        <polygon
          points="40,0 77.32,20 77.32,72 40,92 2.68,72 2.68,20"
          fill={`url(#${gradId})`}
          opacity={isCurrent ? 1 : 0.8}
        />
      </svg>
      {/* Icon inside hexagon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        className="absolute z-20 h-[48px] w-[48px]"
        style={{ opacity: isCurrent ? 1 : 0.6 }}
      />
    </div>
  );
}

function TierDetailGrid() {
  return (
    <>
      {/* Desktop: 3-col centered card grid */}
      <div className="hidden grid-cols-3 gap-6 xl:grid">
        {rankTiers.map((t) => (
          <div
            key={t.tier}
            className="relative flex flex-col items-center gap-4 rounded-3xl px-8 pb-8 pt-10 text-center"
            style={{
              background: "#232330",
              border: t.current ? "1px solid #ff975d" : "1px solid transparent",
            }}
          >
            <span
              className="absolute left-1/2 top-3 z-20 -translate-x-1/2 -translate-y-1/2 rounded-b-lg px-2 py-1 font-body text-xs font-bold uppercase whitespace-nowrap"
              style={
                t.current
                  ? { background: "#ff5c00", color: "#fff" }
                  : { background: "#383852", color: "rgba(255,255,255,0.6)" }
              }
            >
              {t.current ? "Current Tier" : "Locked"}
            </span>

            <HexBadge icon={t.icon} color={t.color} isCurrent={t.current} tier={t.tier} />

            <div className="flex flex-col gap-1">
              <span className="font-body text-xs uppercase tracking-wider text-white">Tier {t.tier}</span>
              <span className="font-heading text-2xl font-bold text-white">{t.name}</span>
              <span className="font-body text-sm italic text-white/70">{t.tagline}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-baseline">
                <span className="font-heading text-[48px] font-bold leading-[60px]" style={{ color: t.color }}>{t.discount}</span>
                <span className="font-heading text-[30px] font-bold leading-[38px]" style={{ color: t.color }}>%</span>
              </div>
              <span className="flex items-center gap-2 font-body text-xs font-bold uppercase text-white/60">
                <span>lifetime</span>
                <span className="h-0.5 w-0.5 rounded-full bg-brand-main" />
                <span>auto-applied</span>
              </span>
            </div>

            <span className="font-body text-sm text-white">{t.requirement}</span>

            <div className="flex w-full flex-col gap-1 text-left">
              {t.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-main" />
                  <span className="font-body text-sm text-white">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: horizontal layout cards */}
      <div className="flex flex-col gap-6 xl:hidden">
        {rankTiers.map((t) => (
          <div
            key={t.tier}
            className="relative flex flex-col gap-4 rounded-3xl px-6 pb-6 pt-8"
            style={{
              background: "#232330",
              border: t.current ? "1px solid #ff975d" : "1px solid transparent",
            }}
          >
            {/* Status tag — sticky to top border */}
            <span
              className="absolute left-1/2 top-4.5 z-20 -translate-x-1/2 -translate-y-1/2 rounded-b-xl px-5 py-2 font-body text-sm font-bold uppercase tracking-wide whitespace-nowrap"
              style={
                t.current
                  ? { background: "#ff5c00", color: "#fff" }
                  : { background: "#383852", color: "rgba(255,255,255,0.6)" }
              }
            >
              {t.current ? "Current Tier" : "Locked"}
            </span>

            {/* Top row: badge + info left, discount right */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <HexBadge icon={t.icon} color={t.color} isCurrent={t.current} tier={t.tier + 10} />
                <div className="flex flex-col gap-0.5 pt-1">
                  <span className="font-body text-xs uppercase tracking-wider text-white">Tier {t.tier}</span>
                  <span className="font-heading text-2xl font-bold text-white">{t.name}</span>
                  <span className="font-body text-sm italic text-white/70">{t.tagline}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end pt-1">
                <div className="flex items-baseline">
                  <span className="font-heading text-[36px] font-bold leading-[44px]" style={{ color: t.color }}>{t.discount}</span>
                  <span className="font-heading text-[22px] font-bold leading-[28px]" style={{ color: t.color }}>%</span>
                </div>
                <span className="font-body text-xs font-bold uppercase text-white/60">Lifetime</span>
                <span className="font-body text-xs font-bold uppercase text-white/60">Auto-Applied</span>
              </div>
            </div>

            {/* Requirement + Perks */}
            <span className="font-body text-sm text-white">{t.requirement}</span>
            <div className="flex flex-col gap-1">
              {t.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-main" />
                  <span className="font-body text-sm font-bold text-white">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Order History                                                         */
/* ═══════════════════════════════════════════════════════════════════════ */

function OrderHistory() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-[32px] font-bold leading-[45px] text-white">Order History</h2>
      <div className="flex flex-col gap-4">
        {orderHistory.map((order, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-3xl bg-[#232330] p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-body text-lg font-bold text-white">{order.title}</span>
                <span className="rounded-lg px-2 py-1 font-body text-sm font-bold uppercase" style={{ background: "rgba(52,168,83,0.2)", color: "#34a853" }}>
                  {order.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/app/customer/orders/${i + 1}`)}
                className="flex items-center gap-2 rounded-xl px-4 py-2 font-body text-sm font-bold text-white transition-colors hover:bg-white/5"
                style={{ background: "rgba(56,56,82,0.3)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/icons/external-link.svg" alt="" className="h-3.5 w-3.5 opacity-70" />
                view
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-body text-base text-white/60">{order.id}</span>
                <button type="button" className="opacity-50 transition-opacity hover:opacity-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icons/copy-icon.svg" alt="Copy" className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-body text-lg text-brand-light">Saved {order.saved}</span>
                <span className="font-body text-lg font-bold text-white">{order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Seasonal Rewards Sidebar                                              */
/* ═══════════════════════════════════════════════════════════════════════ */

function SeasonalRewardsSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Total Earned Header */}
      <div
        className="flex items-center justify-between rounded-3xl px-6 py-4"
        style={{
          background: "linear-gradient(180deg, rgba(255,151,93,0.1) 0%, rgba(255,92,0,0.1) 50%, rgba(163,45,5,0.1) 100%)",
          border: "1px solid #ff975d",
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="font-body text-xl font-bold tracking-tight text-white">Total earned</span>
          <span className="font-body text-sm text-white">Lorem ipsum</span>
        </div>
        <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-light">$39.00</span>
      </div>

      {/* Quarterly Season Card */}
      <div
        className="flex flex-col gap-4 rounded-3xl p-8"
        style={{
          background: "rgba(56,56,82,0.3)",
          border: "2px solid #ff975d",
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-end justify-between">
            <span className="font-body text-sm font-bold uppercase text-brand-light">Quarterly Season</span>
            <span
              className="font-heading text-2xl font-black text-brand-main"
              style={{ textShadow: "0px 0px 14px rgba(250,70,9,0.4)" }}
            >
              00:12:45:32
            </span>
          </div>
          <h3 className="font-heading text-[30px] font-bold leading-[38px] text-white">Season of the Ascent</h3>
          <p className="font-body text-lg leading-7 text-white">
            Earn rewards for staying loyal! Earn up to{" "}
            <span className="text-brand-main">$500</span> to spend on everything you like, no expiry date.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between font-body text-sm font-bold uppercase text-brand-light">
            <span>Season Progress</span>
            <span>$640/$3,000</span>
          </div>
          <div className="relative h-1 w-full rounded-full bg-[#383852]">
            <div className="absolute left-0 top-0 h-1 rounded-full bg-brand-main" style={{ width: "21.3%" }} />
          </div>
        </div>
      </div>

      {/* Seasonal Cashback Tiers */}
      <div className="flex flex-col gap-4">
        {seasonCashbackTiers.map((t) => {
          const isClaimed = t.status === "claimed";
          const isActive = t.status === "active";
          const isLocked = t.status === "locked";
          return (
            <div
              key={t.tier}
              className="flex flex-col gap-4 rounded-2xl p-4"
              style={{
                background: isLocked ? "#383852" : "#232330",
                border: isLocked ? "1px solid #383852" : "1px solid #ff975d",
                opacity: isLocked ? 0.5 : 1,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xs uppercase tracking-wider text-white">Tier {t.tier}</span>
                  <span className="font-body text-xl font-bold tracking-tight text-white">Spend {t.goal}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    {isClaimed && (
                      <span className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs font-bold uppercase" style={{ background: "rgba(26,173,25,0.2)", color: "#1aad19" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/dashboard/icons/check-all-green.svg" alt="" className="h-4 w-4" />
                        Claimed
                      </span>
                    )}
                    {isActive && (
                      <span className="rounded-lg px-2 py-1 font-body text-xs font-bold uppercase" style={{ background: "rgba(255,92,0,0.2)", color: "#ff5c00" }}>
                        Active
                      </span>
                    )}
                    {isLocked && (
                      <span className="rounded-lg px-2 py-1 font-body text-xs font-bold uppercase" style={{ background: "#232330", color: "white" }}>
                        Locked
                      </span>
                    )}
                    <span className="font-heading text-2xl font-bold text-brand-main">{t.cashback}</span>
                  </div>
                  <span className="font-body text-xs uppercase tracking-wider text-white">cashback</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-4">
                <span className="rounded-lg border border-[#383852] bg-[#13151e] px-2 py-1 font-body text-sm font-bold text-white" style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}>
                  ${t.current.toLocaleString()}
                </span>
                <div className="relative h-1 flex-1 rounded-full" style={{ background: isLocked ? "#232330" : "#383852" }}>
                  <div className="absolute left-0 top-0 h-1 rounded-full bg-brand-main" style={{ width: `${t.progress}%` }} />
                </div>
                <span className="rounded-lg border border-[#383852] bg-[#13151e] px-2 py-1 font-body text-sm font-bold text-white" style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}>
                  {t.goal}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Friends Card */}
      <div className="flex flex-col gap-4 rounded-2xl bg-[#232330] p-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/rewards/icon-recruit-squad.svg" alt="" className="h-6 w-6" />
              <span className="font-body text-xs font-bold uppercase text-brand-light">Recruit Your Squad</span>
            </div>
            <p className="font-body text-xl font-bold tracking-tight text-white">
              Earn <span className="text-brand-light">$10</span> per friend, give them{" "}
              <span className="text-brand-light">10% off</span>
            </p>
            <p className="font-body text-sm text-white">
              Share your code. They get a discount on their first order, you get rewarded right after they checkout.
            </p>
          </div>
          <div className="h-[50px] w-px shrink-0 bg-[#383852]" />
          <div className="flex flex-col items-center gap-1 whitespace-nowrap">
            <span className="font-body text-xs font-bold uppercase text-white/50">Your Code</span>
            <span className="font-heading text-[30px] font-bold uppercase leading-[38px] text-brand-main">12HOT</span>
            <span className="font-body text-sm text-white/50">3 friends joined</span>
          </div>
        </div>

        {/* URL + Copy */}
        <div className="flex items-center gap-6 rounded-2xl px-6 py-4" style={{ background: "rgba(0,0,0,0.2)" }}>
          <span className="flex-1 font-mono text-sm text-white" style={{ fontFamily: "'Azeret Mono', monospace" }}>
            https://ogedge.com/en/login?referral=I28H0T
          </span>
          <button
            type="button"
            className="flex shrink-0 items-center gap-2.5 rounded-lg bg-brand-main px-4 py-3.5 font-body text-base font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/copy-icon.svg" alt="" className="h-6 w-6" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  Main Page                                                             */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function CustomerRewardsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-[32px] font-bold leading-[45px] text-white">Rewards</h1>
        <Button href="/" variant="primary" size="sm" icon={<span className="text-lg leading-none">+</span>}>
          New Order
        </Button>
      </div>

      {/* Stat Cards */}
      <StatCards />

      {/* Two-column layout: left content + right sidebar */}
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        {/* Left column */}
        <div className="flex flex-1 flex-col gap-8">
          <LifetimeRankProgression />
          <TierDetailGrid />
          <OrderHistory />
          {/* FAQ — desktop only here, mobile renders below sidebar */}
          <div className="hidden xl:block">
            <Faq />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full xl:w-[490px] xl:shrink-0">
          <SeasonalRewardsSidebar />
        </div>
      </div>

      {/* FAQ — mobile only, at the very bottom */}
      <div className="xl:hidden">
        <Faq />
      </div>
    </div>
  );
}
