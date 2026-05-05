"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { Dropdown } from "@/components/ui/Dropdown";
import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { Button } from "@/components/ui/Button";

type RankKey =
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "ascendant"
  | "immortal"
  | "radiant";

const ranks: { key: RankKey; label: string; glow: string }[] = [
  { key: "iron", label: "Iron", glow: "rgba(140,140,140,0.6)" },
  { key: "bronze", label: "Bronze", glow: "rgba(205,127,50,0.7)" },
  { key: "silver", label: "Silver", glow: "rgba(192,192,192,0.7)" },
  { key: "gold", label: "Gold", glow: "rgba(255,215,0,0.7)" },
  { key: "platinum", label: "Platinum", glow: "rgba(0,200,200,0.6)" },
  { key: "diamond", label: "Diamond", glow: "rgba(180,140,255,0.7)" },
  { key: "ascendant", label: "Ascendant", glow: "rgba(0,255,150,0.6)" },
  { key: "immortal", label: "Immortal", glow: "rgba(255,80,80,0.7)" },
  { key: "radiant", label: "Radiant", glow: "rgba(255,230,160,0.8)" },
];

const divisions = ["I", "II", "III"] as const;

const trustBadges: { icon: string; label: string }[] = [
  { icon: "/images/icons/services/lock.svg", label: "SSL Secure" },
  { icon: "/images/icons/services/vpn.svg", label: "VPN" },
  { icon: "/images/icons/services/safe-lock.svg", label: "Safest Service" },
  { icon: "/images/icons/services/support.svg", label: "24/7 Support" },
  { icon: "/images/icons/services/refund.svg", label: "Refund Guarantee" },
  { icon: "/images/icons/services/cash.svg", label: "Loyalty Rewards" },
];

const categories: { id: string; icon: string; label: string }[] = [
  { id: "rank", icon: "/images/icons/services/safety-outlined.svg", label: "Rank Boost" },
  { id: "placement", icon: "/images/icons/services/rocket.svg", label: "Placement Boost" },
  { id: "win", icon: "/images/icons/services/crown.svg", label: "Boost per Win" },
  { id: "unrated", icon: "/images/icons/services/order-light.svg", label: "Unrated Matches" },
];

const platformOptions = [
  { id: "PC", label: "PC", icon: "/images/icons/services/windows.svg" },
  { id: "Xbox", label: "Xbox", icon: "/images/icons/services/xbox.svg" },
  { id: "PlayStation", label: "PlayStation", icon: "/images/icons/services/playstation.svg" },
  { id: "Switch", label: "Nintendo Switch", icon: "/images/icons/services/nintendo.svg" },
];

const serverOptions = ["Europe", "America", "Oceania/Asia", "Middle East"];
const queueOptions = ["Competitive", "Unrated", "Spike Rush", "Deathmatch"];

type ExtraOption = {
  id: string;
  label: string;
  cost: string;
  defaultOn?: boolean;
};

const extraOptions: ExtraOption[] = [
  { id: "offline", label: "Offline Mode", cost: "FREE", defaultOn: true },
  { id: "streaming", label: "Streaming", cost: "+25% cost" },
  { id: "priority", label: "Priority", cost: "+20% cost", defaultOn: true },
  { id: "rush", label: "Rush Completion", cost: "+25% cost" },
];

const requirements = [
  "Valorant account credentials",
  "Active VP for Ranked queue",
  "Region/Server availability",
  "Compatible platform setup",
];

const benefits = [
  "Guaranteed 5/4 wins minimum",
  "Account safety & privacy",
  "Real-time order tracking",
  "24/7 customer support",
];

const summaryRows = (
  rank: string,
  division: string,
  wins: number,
  server: string,
  queue: string,
  platform: string,
) => [
  { label: "Current Rank", value: `${rank} ${division}` },
  { label: "Number of Wins", value: String(wins) },
  { label: "Server", value: server },
  { label: "Queue", value: queue },
  { label: "Platform", value: platform },
];

const finalRows = [
  { label: "Discount", value: "-15%" },
  { label: "Promo Code", value: "-5%" },
  { label: "Total Amount", value: "€327.00" },
];

const summaryPayments = [
  "visa",
  "mastercard",
  "paypal",
  "applepay",
  "gpay",
  "crypto",
  "venmo",
  "zelle",
];

export function ServicesConfig() {
  const [selectedRank, setSelectedRank] = useState<RankKey>("bronze");
  const [selectedDivision, setSelectedDivision] = useState<number>(2);
  const [wins, setWins] = useState<number>(3);
  const [category, setCategory] = useState<string>("win");
  const [platform, setPlatform] = useState<string>("PC");
  const [server, setServer] = useState("Europe");
  const [queue, setQueue] = useState("Competitive");
  const [extras, setExtras] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(extraOptions.map((o) => [o.id, !!o.defaultOn])),
  );

  const rankLabel = useMemo(
    () => ranks.find((r) => r.key === selectedRank)?.label ?? "Bronze",
    [selectedRank],
  );

  const divisionLabel = divisions[selectedDivision];

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const calcRemaining = () => {
      const now = new Date();
      const endOfWeek = new Date(now);
      endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
      endOfWeek.setHours(23, 59, 59, 0);
      return Math.max(0, Math.floor((endOfWeek.getTime() - now.getTime()) / 1000));
    };
    setCountdown(calcRemaining());
    const id = setInterval(() => setCountdown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const days = Math.floor(countdown / 86400);
  const hrs = Math.floor((countdown % 86400) / 3600);
  const mins = Math.floor((countdown % 3600) / 60);
  const secs = countdown % 60;
  const timerStr = `${String(days).padStart(2, "0")}:${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <section className="relative -mt-[60px] md:-mt-[80px] lg:-mt-[80px] z-20">
      <div className="mx-auto w-full max-w-[1410px] px-4 md:px-6">
        {/* A. Top banner row */}
        <div className="grid grid-cols-1 md:grid-cols-[241px_1fr] gap-6">
          {/* A1. Season pill */}
          <div
            className="relative rounded-3xl p-8"
            style={{
              border: "2px solid #ff975d",
              background: "rgba(0,0,0,0.4)",
              boxShadow: "0 4px 44px rgba(255,92,0,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <button
              type="button"
              aria-label="More info"
              className="absolute right-4 top-4 text-white/70 hover:text-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/services/info.svg"
                alt=""
                loading="lazy"
                className="h-[18px] w-[18px]"
              />
            </button>
            <h3 className="font-lexend text-2xl font-bold leading-9 text-white">
              Season 2026: Act 1
            </h3>
            <p className="mt-2 font-urbanist text-sm uppercase text-white">
              6 days left
            </p>
            <div className="mt-4 h-1 w-full rounded-full bg-bg-surface-2">
              <div
                className="h-1 rounded-full bg-brand"
                style={{ width: "88%" }}
              />
            </div>
          </div>

          {/* A2. Weekly event card */}
          <div
            className="relative rounded-3xl overflow-hidden md:overflow-visible"
            style={{
              border: "2px solid #ff975d",
              background: "rgba(0,0,0,0.35)",
              boxShadow: "0 4px 44px rgba(255,92,0,0.2)",
              backdropFilter: "blur(12px)",
              minHeight: "194px",
            }}
          >
            <Image
              src="/images/characters/weekly-event.png"
              alt="Weekly event"
              width={259}
              height={262}
              className="absolute bottom-0 left-0 h-full w-auto object-contain md:-top-[60px] md:left-2 md:bottom-auto md:h-[262px] pointer-events-none select-none z-0"
            />
            <div className="relative z-10 p-5 pl-[140px] md:p-8 md:pl-[280px]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
                <div className="flex flex-col gap-1 md:gap-0 md:max-w-[500px]">
                  <p className="font-urbanist text-[10px] md:text-xs uppercase text-white md:hidden">
                    Event ends in
                  </p>
                  <p
                    className="font-lexend text-2xl md:hidden font-bold text-brand leading-tight"
                    style={{ textShadow: "0 0 24px rgba(255,92,0,0.7)" }}
                  >
                    {timerStr}
                  </p>
                  <h3 className="font-lexend text-base md:text-3xl font-bold leading-tight text-white">
                    Valorant Weekly Event
                  </h3>
                  <p className="font-urbanist text-xs md:text-base text-white/90 md:mt-3 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                </div>
                <div className="hidden md:block text-right shrink-0">
                  <p className="font-urbanist text-xs uppercase text-white">
                    Event ends in
                  </p>
                  <p
                    className="font-lexend text-5xl font-bold text-brand"
                    style={{ textShadow: "0 0 24px rgba(255,92,0,0.7)" }}
                  >
                    {timerStr}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* B. Trust badges */}
        <div className="mt-6 flex gap-4 overflow-x-auto md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trustBadges.map(({ icon, label }) => (
            <div
              key={label}
              className="inline-flex shrink-0 items-center gap-2 rounded-3xl px-4 h-10"
              style={{
                background:
                  "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={icon}
                alt=""
                loading="lazy"
                className="h-4 w-4"
              />
              <span className="font-urbanist text-sm font-medium text-white whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* C. Category tabs - dropdown on mobile, tabs on desktop */}
        <div className="mt-6">
          {/* Mobile dropdown */}
          <div className="md:hidden">
            <p className="font-lexend text-lg font-bold text-white mb-2">
              Service Selection
            </p>
            <Dropdown
              label=""
              value={categories.find((c) => c.id === category)?.label ?? ""}
              options={categories.map((c) => c.label)}
              onChange={(label) => {
                const found = categories.find((c) => c.label === label);
                if (found) setCategory(found.id);
              }}
            />
          </div>
          {/* Desktop tabs */}
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map(({ id, icon, label }) => {
              const active = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 transition-colors ${
                    active ? "" : "hover:border-brand-light/60"
                  }`}
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: active
                      ? "2px solid #ff975d"
                      : "1px solid #383852",
                    ...(active
                      ? { boxShadow: "0 4px 44px rgba(255,92,0,0.25)" }
                      : {}),
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt=""
                    loading="lazy"
                    className="h-[18px] w-[18px]"
                  />
                  <span
                    className={`font-urbanist text-base font-medium ${
                      active ? "text-brand" : "text-white"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* D. Main content row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_490px] gap-6">
          {/* D1. Left big card */}
          <div
            className="rounded-3xl p-6 md:p-10 lg:p-[60px_50px]"
            style={{
              border: "2px solid #6d6d96",
              background:
                "linear-gradient(109deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
              backdropFilter: "blur(7px)",
            }}
          >
            <div className="flex flex-col gap-8">
              {/* Current Rank */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-urbanist text-2xl font-semibold text-white">
                    Current Rank
                  </h3>
                  <p className="font-urbanist text-base font-semibold text-white/50">
                    Select your current rank
                  </p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                  {ranks.map((rank) => {
                    const active = selectedRank === rank.key;
                    return (
                      <button
                        key={rank.key}
                        type="button"
                        onClick={() => setSelectedRank(rank.key)}
                        className="group flex h-[76px] flex-col items-center justify-center rounded-2xl p-2 transition-all"
                        style={{
                          background: active
                            ? "rgba(255,92,0,0.15)"
                            : "rgba(0,0,0,0.2)",
                          border: active
                            ? "2px solid #ff975d"
                            : "1px solid #383852",
                          ...(active
                            ? {
                                boxShadow: "0 0 24px rgba(255,92,0,0.35)",
                              }
                            : {}),
                        }}
                      >
                        <Image
                          src={`/images/ranks/${rank.key}.png`}
                          alt={rank.label}
                          width={48}
                          height={48}
                          className="h-10 w-10 object-contain"
                          style={{
                            filter: `drop-shadow(0 0 10px ${rank.glow})`,
                          }}
                        />
                        <span className="mt-1 font-urbanist text-[10px] text-white/80">
                          {rank.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {divisions.map((div, i) => {
                    const active = selectedDivision === i;
                    return (
                      <button
                        key={div}
                        type="button"
                        onClick={() => setSelectedDivision(i)}
                        className="relative flex h-[50px] items-center justify-center gap-[10px] rounded-2xl px-4 transition-all"
                        style={{
                          border: active ? "1px solid #ff975d" : "1px solid #383852",
                          backgroundImage: active
                            ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)"
                            : "none",
                          background: active ? undefined : "rgba(0,0,0,0.2)",
                          boxShadow: active
                            ? "0 4px 8px rgba(0,0,0,0.15), 0 4px 7px rgba(255,92,0,0.3)"
                            : "0 4px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        <span
                          className={`font-urbanist text-base font-medium leading-6 ${
                            active ? "text-[#ff5c00]" : "text-white"
                          }`}
                        >
                          {div}
                        </span>
                        {active && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src="/images/icons/services/platform-check.svg"
                            alt=""
                            className="absolute right-1.5 top-1.5 h-3 w-3"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Wins */}
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-urbanist text-2xl font-semibold text-white">
                    Number of Wins
                  </h3>
                  <p className="font-urbanist text-base font-semibold text-white/50">
                    Select desired number of wins
                  </p>
                </div>
                <div className="flex items-center gap-8 mt-2">
                  <div className="flex flex-1 items-center gap-4">
                    <span className="font-urbanist text-xl font-medium text-white">1</span>
                    <Slider
                      min={1}
                      max={5}
                      value={wins}
                      onChange={setWins}
                      className="flex-1"
                    />
                    <span className="font-urbanist text-xl font-medium text-white">5</span>
                  </div>
                  <div
                    className="flex h-11 w-[75px] shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      border: "1px solid #ff975d",
                      backgroundImage:
                        "linear-gradient(145deg, rgba(255,92,0,0.2) 4%, rgba(204,74,0,0.02) 52%, rgba(255,92,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
                      boxShadow: "0 4px 7px rgba(255,92,0,0.3)",
                    }}
                  >
                    <span className="font-lexend text-[30px] font-bold leading-[38px] text-brand-light">
                      {wins}
                    </span>
                  </div>
                </div>
              </div>

              {/* Game Configuration */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-urbanist text-2xl font-medium text-white">
                    Game Configuration
                  </h3>
                  <p className="font-urbanist text-base font-medium text-white/50">
                    Enter game details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Dropdown
                    label="Server"
                    value={server}
                    options={serverOptions}
                    onChange={setServer}
                  />
                  <Dropdown
                    label="Queue"
                    value={queue}
                    options={queueOptions}
                    onChange={setQueue}
                  />
                </div>

                <div>
                  <p className="font-urbanist text-base font-medium text-white">
                    Platform <span className="text-brand">*</span>
                  </p>
                  <PlatformSelector
                    options={platformOptions}
                    value={platform}
                    onChange={setPlatform}
                    className="mt-2"
                  />
                </div>

                <div
                  className="flex items-start gap-3 rounded-2xl p-4"
                  style={{ background: "var(--bg-surface-1)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/icons/services/info.svg"
                    alt=""
                    loading="lazy"
                    className="mt-0.5 h-5 w-5 shrink-0"
                  />
                  <div>
                    <p className="font-urbanist text-base font-medium text-white">
                      We guarantee 5/4 wins in your placements
                    </p>
                    <p className="mt-1 font-urbanist text-sm text-white/90">
                      If the booster loses more than 1 game, we will refund the
                      cost of the additional games until you reach the
                      guaranteed wins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements & Benefits */}
              {/* Desktop: side-by-side lists */}
              <div className="hidden md:grid grid-cols-2 gap-6">
                <BulletList title="Requirements" items={requirements} />
                <BulletList title="What Do I Get" items={benefits} />
              </div>
              {/* Mobile: collapsible accordions */}
              <div className="flex flex-col gap-3 md:hidden">
                <CollapsibleList title="Requirements" items={requirements} />
                <CollapsibleList title="What Do I Get" items={benefits} />
              </div>
            </div>
          </div>

          {/* D2. Order Summary */}
          <aside
            className="rounded-3xl p-6"
            style={{
              border: "2px solid #6d6d96",
              background:
                "linear-gradient(109deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
              backdropFilter: "blur(7px)",
              alignSelf: "flex-start",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-urbanist text-sm text-white/80">
                  Order Summary
                </p>
                <h3 className="font-urbanist text-2xl font-semibold text-white">
                  Boost Per Win
                </h3>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span
                    className="font-urbanist text-lg font-bold text-brand-light"
                    style={{ textShadow: "0 0 12px rgba(255,151,93,0.6)" }}
                  >
                    ~1day, 12h
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/icons/services/info.svg"
                    alt=""
                    loading="lazy"
                    className="h-4 w-4 opacity-70"
                  />
                </div>
                <p className="mt-1 font-urbanist text-sm text-white/80">
                  <span className="font-bold text-white">2h</span> until start
                  time
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              {summaryRows(rankLabel, divisionLabel, wins, server, queue, platformOptions.find(p => p.id === platform)?.label ?? platform).map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-4 py-3 ${
                    i % 2 === 0 ? "rounded-xl" : ""
                  }`}
                  style={
                    i % 2 === 0
                      ? { background: "rgba(0,0,0,0.2)" }
                      : undefined
                  }
                >
                  <span className="font-urbanist text-sm text-white/80">
                    {row.label}
                  </span>
                  <span className="font-urbanist text-base font-semibold text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-4 h-px w-full bg-border-subtle" />

            <div className="flex items-center gap-2">
              <div
                className="flex flex-1 items-center rounded-2xl px-4 h-12"
                style={{
                  border: "1px solid #383852",
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <input
                  type="text"
                  defaultValue="SALE5"
                  className="flex-1 bg-transparent font-urbanist text-sm text-white outline-none"
                  aria-label="Coupon code"
                />
              </div>
              <button
                type="button"
                className="rounded-2xl px-4 h-12 font-urbanist text-sm font-bold uppercase text-white"
                style={{
                  background:
                    "linear-gradient(-19deg, #17191f 0%, #383852 100%)",
                  border: "1px solid #383852",
                }}
              >
                Apply
              </button>
              <button
                type="button"
                aria-label="Remove coupon"
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(255,92,0,0.15)",
                  border: "1px solid rgba(255,92,0,0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/services/delete.svg"
                  alt=""
                  loading="lazy"
                  className="h-[18px] w-[18px]"
                />
              </button>
            </div>

            <div className="my-4 h-px w-full bg-border-subtle" />

            <p className="font-urbanist text-base font-medium text-white">
              Extra Options
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {extraOptions.map((opt, i) => {
                const on = !!extras[opt.id];
                return (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between rounded-2xl px-4 py-3"
                    style={{
                      background:
                        i % 2 === 0 ? "rgba(0,0,0,0.2)" : "transparent",
                      border: "1px solid #383852",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Toggle
                        checked={on}
                        onChange={(next) =>
                          setExtras((prev) => ({
                            ...prev,
                            [opt.id]: next,
                          }))
                        }
                        label={opt.label}
                      />
                      <span
                        className={`font-urbanist text-sm font-medium ${
                          on ? "text-brand-light" : "text-white"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <span
                      className={`font-urbanist text-sm font-semibold ${
                        opt.cost === "FREE"
                          ? "text-brand-light"
                          : "text-white/80"
                      }`}
                    >
                      {opt.cost}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="my-4 h-px w-full bg-border-subtle" />

            <div className="flex flex-col gap-2">
              <div
                className="rounded-2xl px-4 py-3 text-center font-urbanist text-sm"
                style={{ background: "var(--bg-surface-2)" }}
              >
                <span
                  className="font-semibold text-brand-light"
                  style={{ textShadow: "0 0 10px rgba(255,151,93,0.5)" }}
                >
                  15% discount applied
                </span>
                <span className="text-white/80"> to your order</span>
              </div>
              <div
                className="rounded-2xl px-4 py-3 text-center font-urbanist text-base font-semibold"
                style={{
                  background: "rgba(26,173,25,0.2)",
                  color: "var(--success)",
                }}
              >
                Maximum discount reached!
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              {finalRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-4 py-3 ${
                    i % 2 === 0 ? "rounded-xl" : ""
                  }`}
                  style={
                    i % 2 === 0
                      ? { background: "rgba(0,0,0,0.2)" }
                      : undefined
                  }
                >
                  <span className="font-urbanist text-sm text-white/80">
                    {row.label}
                  </span>
                  <span className="font-urbanist text-base font-semibold text-brand-light">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="small"
                className="h-14 w-full"
              >
                Add to cart
              </Button>
              <Button
                variant="primary"
                size="small"
                className="h-14 w-full"
              >
                Buy Now (€327.00)
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(26,173,25,0.2)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/services/secured.svg"
                  alt=""
                  loading="lazy"
                  className="h-4 w-4"
                />
              </div>
              <p className="font-urbanist text-xs text-white/80">
                Secured and trusted checkout with:
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {summaryPayments.map((p) => (
                <div
                  key={p}
                  className="flex h-5 w-8 items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/icons/services/pay-${p}.svg`}
                    alt={p}
                    loading="lazy"
                    className="h-5 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CollapsibleList({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #6d6d96",
        background:
          "linear-gradient(170deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-urbanist text-base font-medium text-white">
          {title}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/arrow-up.svg"
          alt=""
          className={`h-5 w-5 opacity-70 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-3 px-5 pb-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/services/check.svg"
                alt=""
                loading="lazy"
                className="mt-0.5 h-[18px] w-[18px] shrink-0"
              />
              <span className="font-urbanist text-sm text-white/90">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-urbanist text-base font-medium text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/services/check.svg"
              alt=""
              loading="lazy"
              className="mt-0.5 h-[18px] w-[18px] shrink-0"
            />
            <span className="font-urbanist text-sm text-white/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
