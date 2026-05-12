"use client";

import { CategoryTabs } from "@/components/configurator/CategoryTabs";
import { OrderSummary } from "@/components/configurator/OrderSummary";
import { SeasonBanner } from "@/components/configurator/SeasonBanner";
import { TrustBadges } from "@/components/configurator/TrustBadges";
import { WeeklyEventBanner } from "@/components/configurator/WeeklyEventBanner";
import { useState } from "react";

import { BoostPerWinCalculator } from "@/components/calculator/BoostPerWinCalculator";
import { RankBoostingStandard } from "@/components/calculator/rank-boosting/RankBoostingStandard";
import {
  type RankBoostKey,
  type RankKey,
  categories,
  divisions,
  extraOptions,
  platformOptions,
  rankBoostDivisions,
  rankBoostRanks,
  ranks,
} from "./valorantData";

export function ValorantConfigurator() {
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

  return (
    <section className="relative z-20 -mt-[60px] md:-mt-[80px] lg:-mt-[80px]">
      <div className="mx-auto w-full max-w-[1410px] px-4 md:px-6">
        {/* Top banner row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[241px_1fr]">
          <SeasonBanner
            title="Season 2026: Act 1"
            daysLeftLabel="6 days left"
            progressPercent={88}
          />
          <WeeklyEventBanner
            title="Valorant Weekly Event"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            characterImage="/images/characters/weekly-event.png"
          />
        </div>

        {/* Trust badges */}
        <div className="mt-6">
          <TrustBadges />
        </div>

        {/* Category tabs */}
        <div className="mt-6">
          <CategoryTabs options={categories} value={category} onChange={setCategory} />
        </div>

        {/* Main content row */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_490px]">
          {isRankBoost ? (
            <RankBoostingStandard
              currentRank={currentRank}
              setCurrentRank={setCurrentRank}
              currentDivision={currentDivision}
              setCurrentDivision={setCurrentDivision}
              desiredRank={desiredRank}
              setDesiredRank={setDesiredRank}
              desiredLP={desiredLP}
              setDesiredLP={setDesiredLP}
              server={server}
              setServer={setServer}
              queue={queue}
              setQueue={setQueue}
              platform={platform}
              setPlatform={setPlatform}
            />
          ) : (
            <BoostPerWinCalculator
              selectedRank={selectedRank}
              setSelectedRank={setSelectedRank}
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
            />
          )}
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
        </div>
      </div>
    </section>
  );
}
