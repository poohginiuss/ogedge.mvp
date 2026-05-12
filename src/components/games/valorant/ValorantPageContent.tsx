"use client";

import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { BoostPerWinCalculator } from "@/components/calculator/forms/BoostPerWinCalculator";
import { RankBoostingStandard } from "@/components/calculator/forms/RankBoostingStandard";
import { OrderSummary } from "@/components/calculator/shared/OrderSummary";
import { SeasonBanner } from "@/components/calculator/shared/SeasonBanner";
import { WeeklyEventBanner } from "@/components/calculator/shared/WeeklyEventBanner";
import { Articles } from "@/components/sections/Articles";
import { BottomText } from "@/components/sections/BottomText";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { OrderProcess } from "@/components/sections/OrderProcess";
import { Reviews } from "@/components/sections/Reviews";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { useState } from "react";

import {
  type RankBoostKey,
  type RankKey,
  benefits,
  categories,
  divisions,
  extraOptions,
  platformOptions,
  queueOptions,
  rankBoostBenefits,
  rankBoostDivisions,
  rankBoostRanks,
  rankBoostRequirements,
  ranks,
  requirements,
  serverOptions,
} from "./valorantData";

export function ValorantPageContent() {
  /* ── Boost per Win state ── */
  const [selectedRank, setSelectedRank] = useState<RankKey>("bronze");
  const [selectedDivision, setSelectedDivision] = useState<number>(2);
  const [wins, setWins] = useState<number>(3);

  /* ── Rank Boost state ── */
  const [currentRank, setCurrentRank] = useState<RankBoostKey>("emerald");
  const [currentDivision, setCurrentDivision] = useState<number>(2);
  const [desiredRank, setDesiredRank] = useState<RankBoostKey>("grandmaster");
  const [desiredLP, setDesiredLP] = useState<number>(100);

  /* ── Shared state ── */
  const [category, setCategory] = useState<string>("rank");
  const [platform, setPlatform] = useState<string>("PC");
  const [server, setServer] = useState("Europe");
  const [queue, setQueue] = useState("Competitive");

  const platformLabel = platformOptions.find((p) => p.id === platform)?.label ?? platform;
  const isRankBoost = category === "rank";

  const summaryRows = isRankBoost
    ? [
        {
          label: "Current Rank",
          value: `${rankBoostRanks.find((r) => r.key === currentRank)?.label ?? ""} ${rankBoostDivisions[currentDivision]}`,
        },
        {
          label: "Desired Rank",
          value: `${rankBoostRanks.find((r) => r.key === desiredRank)?.label ?? ""} ${desiredLP} LP`,
        },
        { label: "Server", value: server },
        { label: "Queue", value: queue },
        { label: "Platform", value: platformLabel },
      ]
    : [
        {
          label: "Current Rank",
          value: `${ranks.find((r) => r.key === selectedRank)?.label ?? "Bronze"} ${divisions[selectedDivision]}`,
        },
        { label: "Number of Wins", value: String(wins) },
        { label: "Server", value: server },
        { label: "Queue", value: queue },
        { label: "Platform", value: platformLabel },
      ];

  const finalRows = [
    { label: "Discount", value: "-15%" },
    { label: "Promo Code", value: "-5%" },
    { label: "Total Amount", value: "€327.00" },
  ];

  const topBanner = (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[241px_1fr]">
      <SeasonBanner title="Season 2026: Act 1" daysLeftLabel="6 days left" progressPercent={88} />
      <WeeklyEventBanner
        title="Valorant Weekly Event"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        characterImage="/images/characters/weekly-event.png"
      />
    </div>
  );

  const form = isRankBoost ? (
    <RankBoostingStandard
      currentRank={currentRank}
      setCurrentRank={(r) => setCurrentRank(r as RankBoostKey)}
      currentDivision={currentDivision}
      setCurrentDivision={setCurrentDivision}
      desiredRank={desiredRank}
      setDesiredRank={(r) => setDesiredRank(r as RankBoostKey)}
      desiredLP={desiredLP}
      setDesiredLP={setDesiredLP}
      server={server}
      setServer={setServer}
      queue={queue}
      setQueue={setQueue}
      platform={platform}
      setPlatform={setPlatform}
      ranks={rankBoostRanks}
      divisions={[...rankBoostDivisions]}
      serverOptions={serverOptions}
      queueOptions={queueOptions}
      platformOptions={platformOptions}
      requirements={rankBoostRequirements}
      benefits={rankBoostBenefits}
    />
  ) : (
    <BoostPerWinCalculator
      selectedRank={selectedRank}
      setSelectedRank={(r) => setSelectedRank(r as RankKey)}
      selectedDivision={selectedDivision}
      setSelectedDivision={setSelectedDivision}
      wins={wins}
      setWins={setWins}
      server={server}
      setServer={setServer}
      queue={queue}
      setQueue={setQueue}
      platform={platform}
      setPlatform={setPlatform}
      ranks={ranks}
      divisions={[...divisions]}
      serverOptions={serverOptions}
      queueOptions={queueOptions}
      platformOptions={platformOptions}
      requirements={requirements}
      benefits={benefits}
    />
  );

  const summary = (
    <OrderSummary
      title={isRankBoost ? "Rank Boost" : "Boost Per Win"}
      estimatedTime="~1day, 12h"
      startInLabel="2h"
      rows={summaryRows}
      extras={extraOptions}
      finalRows={finalRows}
      totalAmount="€327.00"
      discountMessage="15% discount applied to your order"
      maxDiscountReached
      defaultCoupon="SALE5"
    />
  );

  return (
    <div className="bg-dark-main">
      <Hero />
      <CalculatorPageShell
        topBanner={topBanner}
        categoryOptions={categories}
        category={category}
        onCategoryChange={setCategory}
        left={form}
        right={summary}
      />
      <WhyChooseUs />
      <Reviews />
      <OrderProcess />
      <BottomText />
      <Highlights />
      <Faq />
      <Articles />
    </div>
  );
}
