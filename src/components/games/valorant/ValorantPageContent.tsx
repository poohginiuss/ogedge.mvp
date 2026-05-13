"use client";

import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { BoostPerWinCalculator } from "@/components/calculator/forms/BoostPerWinCalculator";
import { CardSelectorCalculator } from "@/components/calculator/forms/CardSelectorCalculator";
import { CurrencyCalculator } from "@/components/calculator/forms/CurrencyCalculator";
import { LevelingBoostCalculator } from "@/components/calculator/forms/LevelingBoostCalculator";
import { MmrBoostCalculator } from "@/components/calculator/forms/MmrBoostCalculator";
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
  LEVELING_MAX,
  LEVELING_MIN,
  LEVELING_PRICE_PER_LEVEL,
  LEVELING_STEP,
  MMR_MAX,
  MMR_MIN,
  MMR_PRICE_PER_POINT,
  MMR_STEP,
  type RankBoostKey,
  type RankKey,
  benefits,
  camoBenefits,
  camoCards,
  camoRequirements,
  categories,
  currencyBenefits,
  currencyPacks,
  currencyRequirements,
  divisions,
  extraOptions,
  formatMmrShort,
  levelingBenefits,
  levelingRequirements,
  mmrBenefits,
  mmrQuickSelects,
  mmrRequirements,
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

  /* ── Camo Boost state ── */
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  /* ── Currency state ── */
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);

  /* ── MMR Boost state ── */
  const [currentMmr, setCurrentMmr] = useState<number>(1000);
  const [desiredMmr, setDesiredMmr] = useState<number>(2000);

  /* ── Leveling Boost state ── */
  const [currentLevel, setCurrentLevel] = useState<number>(8);
  const [desiredLevel, setDesiredLevel] = useState<number>(34);

  /* ── Shared state ── */
  const [category, setCategory] = useState<string>("rank");
  const [platform, setPlatform] = useState<string>("PC");
  const [server, setServer] = useState("Europe");
  const [queue, setQueue] = useState("Competitive");

  const platformLabel = platformOptions.find((p) => p.id === platform)?.label ?? platform;
  const isCurrency = category === "currency";
  const isCamo = category === "camo";
  const isRankBoost = category === "rank";
  const isMmr = category === "mmr";
  const isLeveling = category === "leveling";

  const onToggleCard = (id: string) => {
    setSelectedCardIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  /* ── Summary rows ── */
  let summaryTitle = "Boost Per Win";
  let summaryRows: { label: string; value: string }[];
  let totalAmount = "€327.00";

  if (isCurrency) {
    summaryTitle = "Currency";
    const pack = currencyPacks[selectedCurrencyIndex];
    if (pack) {
      totalAmount = `$${pack.price.toFixed(2)}`;
      summaryRows = [
        { label: "Pack", value: `${pack.amountLabel} — ${pack.packName}` },
        { label: "Discount", value: pack.discount != null ? `${pack.discount}% OFF` : "—" },
        { label: "Platform", value: platformLabel },
      ];
    } else {
      summaryRows = [{ label: "Pack", value: "—" }];
    }
  } else if (isCamo) {
    summaryTitle = "Camo Boost";
    const selectedCards = camoCards.filter((c) => selectedCardIds.includes(c.id));
    const subtotal = selectedCards.reduce((sum, c) => sum + c.price, 0);
    totalAmount = `$${subtotal.toFixed(2)}`;

    summaryRows = [];
    if (selectedCards.length === 0) {
      summaryRows.push({ label: "Selected", value: "—" });
    } else {
      const preview = selectedCards
        .slice(0, 3)
        .map((c) => c.name)
        .join(", ");
      const suffix = selectedCards.length > 3 ? ` +${selectedCards.length - 3} more` : "";
      summaryRows.push({ label: "Selected", value: `${preview}${suffix}` });
    }
    summaryRows.push({ label: "Platform", value: platformLabel });
  } else if (isRankBoost) {
    summaryTitle = "Rank Boost";
    summaryRows = [
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
    ];
  } else if (isMmr) {
    summaryTitle = "MMR Boost";
    const delta = Math.max(0, desiredMmr - currentMmr);
    totalAmount = `$${(delta * MMR_PRICE_PER_POINT).toFixed(2)}`;
    summaryRows = [
      {
        label: "Current MMR",
        value: currentMmr > 0 ? formatMmrShort(currentMmr) : "—",
      },
      {
        label: "Desired MMR",
        value: desiredMmr > 0 ? formatMmrShort(desiredMmr) : "—",
      },
      {
        label: "MMR Gain",
        value: delta > 0 ? `+${formatMmrShort(delta)}` : "—",
      },
      { label: "Platform", value: platformLabel },
    ];
  } else if (isLeveling) {
    summaryTitle = "Leveling";
    const delta = Math.max(0, desiredLevel - currentLevel);
    totalAmount = `$${(delta * LEVELING_PRICE_PER_LEVEL).toFixed(2)}`;
    summaryRows = [
      { label: "Current Level", value: String(currentLevel) },
      { label: "Desired Level", value: String(desiredLevel) },
      { label: "Levels Gained", value: delta > 0 ? `+${delta}` : "—" },
      { label: "Platform", value: platformLabel },
    ];
  } else {
    summaryRows = [
      {
        label: "Current Rank",
        value: `${ranks.find((r) => r.key === selectedRank)?.label ?? "Bronze"} ${divisions[selectedDivision]}`,
      },
      { label: "Number of Wins", value: String(wins) },
      { label: "Server", value: server },
      { label: "Queue", value: queue },
      { label: "Platform", value: platformLabel },
    ];
  }

  const finalRows = [
    { label: "Discount", value: "-15%" },
    { label: "Promo Code", value: "-5%" },
    { label: "Total Amount", value: totalAmount },
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

  let form: React.ReactNode;
  if (isLeveling) {
    form = (
      <LevelingBoostCalculator
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
        desiredLevel={desiredLevel}
        setDesiredLevel={setDesiredLevel}
        platform={platform}
        setPlatform={setPlatform}
        platformOptions={platformOptions}
        requirements={levelingRequirements}
        benefits={levelingBenefits}
        min={LEVELING_MIN}
        max={LEVELING_MAX}
        step={LEVELING_STEP}
      />
    );
  } else if (isMmr) {
    form = (
      <MmrBoostCalculator
        currentMmr={currentMmr}
        setCurrentMmr={setCurrentMmr}
        desiredMmr={desiredMmr}
        setDesiredMmr={setDesiredMmr}
        platform={platform}
        setPlatform={setPlatform}
        platformOptions={platformOptions}
        quickSelects={mmrQuickSelects}
        requirements={mmrRequirements}
        benefits={mmrBenefits}
        min={MMR_MIN}
        max={MMR_MAX}
        step={MMR_STEP}
      />
    );
  } else if (isCurrency) {
    form = (
      <CurrencyCalculator
        title="Currency"
        subtitle="Select your desired currency"
        packs={currencyPacks}
        selectedIndex={selectedCurrencyIndex}
        onSelectPack={setSelectedCurrencyIndex}
        platformOptions={platformOptions}
        platform={platform}
        setPlatform={setPlatform}
        requirements={currencyRequirements}
        benefits={currencyBenefits}
      />
    );
  } else if (isCamo) {
    form = (
      <CardSelectorCalculator
        title="Weapon Camo Variants"
        subtitle="Click cards to select"
        cards={camoCards}
        selectedCardIds={selectedCardIds}
        onToggleCard={onToggleCard}
        platformOptions={platformOptions}
        platform={platform}
        setPlatform={setPlatform}
        requirements={camoRequirements}
        benefits={camoBenefits}
      />
    );
  } else if (isRankBoost) {
    form = (
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
    );
  } else {
    form = (
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
  }

  const summary = (
    <OrderSummary
      title={summaryTitle}
      estimatedTime="~1day, 12h"
      startInLabel="2h"
      rows={summaryRows}
      extras={extraOptions}
      finalRows={finalRows}
      totalAmount={totalAmount}
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
