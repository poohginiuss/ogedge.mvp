"use client";

import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
import { CurrencySliderCalculator } from "@/components/calculator/forms/CurrencySliderCalculator";
import { RankBoostingImage } from "@/components/calculator/forms/RankBoostingImage";
import { OrderSummary } from "@/components/calculator/shared/OrderSummary";
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
  benefits,
  coinsBenefits,
  coinsRequirements,
  coinsTiers,
  extraOptions,
  fifaCategories,
  fifaDivisions,
  fifaRankCategories,
  fifaVolumeDiscountTiers,
  platformOptions,
  queueOptions,
  requirements,
  serverOptions,
} from "./fifaData";

function getLabel(options: (string | { value: string; label: string })[], value: string): string {
  const opt = options.find((o) => (typeof o === "string" ? o === value : o.value === value));
  return opt && typeof opt !== "string" ? opt.label : value;
}

export function FifaPageContent() {
  const [category, setCategory] = useState("rank");

  /* ── Rank Boost state ── */
  const [currentCategory, setCurrentCategory] = useState("fut-champions");
  const [currentDivision, setCurrentDivision] = useState("1");
  const [desiredCategory, setDesiredCategory] = useState("fut-champions");
  const [desiredDivision, setDesiredDivision] = useState("5");

  /* ── Coins Boost state ── */
  const [selectedCoinsAmount, setSelectedCoinsAmount] = useState(coinsTiers[0]?.amount ?? 0);

  /* ── Shared state ── */
  const [platform, setPlatform] = useState("PlayStation");
  const [server, setServer] = useState("Europe");
  const [queue, setQueue] = useState("FUT Champions");

  const platformLabel = platformOptions.find((p) => p.id === platform)?.label ?? platform;
  const isCoins = category === "coins";

  /* ── Summary rows ── */
  let summaryTitle = "Rank Boost";
  let summaryRows: { label: string; value: string }[];
  let totalAmount = "€249.00";
  let numericSubtotal = 249;

  if (isCoins) {
    summaryTitle = "Coins Boost";
    let activeCoinsTier = coinsTiers[0];
    for (const tier of coinsTiers) {
      if (tier.amount <= selectedCoinsAmount) activeCoinsTier = tier;
    }
    if (activeCoinsTier) {
      const pricePerUnit = activeCoinsTier.price / activeCoinsTier.amount;
      const calculatedPrice = selectedCoinsAmount * pricePerUnit;
      numericSubtotal = calculatedPrice;
      totalAmount = `$${calculatedPrice.toFixed(2)}`;
      const amtLabel =
        selectedCoinsAmount >= 1_000_000
          ? `${(selectedCoinsAmount / 1_000_000).toFixed(selectedCoinsAmount % 1_000_000 === 0 ? 0 : 1)}M`
          : `${Math.round(selectedCoinsAmount / 1_000)}K`;
      summaryRows = [
        { label: "Amount", value: amtLabel },
        {
          label: "Discount",
          value: activeCoinsTier.discount != null ? `${activeCoinsTier.discount}% OFF` : "—",
        },
        { label: "Platform", value: platformLabel },
      ];
    } else {
      summaryRows = [{ label: "Pack", value: "—" }];
    }
  } else {
    summaryRows = [
      {
        label: "Current Rank",
        value: `${getLabel(fifaRankCategories, currentCategory)} ${currentDivision}`,
      },
      {
        label: "Desired Rank",
        value: `${getLabel(fifaRankCategories, desiredCategory)} ${desiredDivision}`,
      },
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

  let form: React.ReactNode;
  if (isCoins) {
    form = (
      <CurrencySliderCalculator
        title="Currency"
        subtitle="Select your desired currency"
        tiers={coinsTiers}
        selectedAmount={selectedCoinsAmount}
        onAmountChange={setSelectedCoinsAmount}
        platformOptions={platformOptions}
        platform={platform}
        setPlatform={setPlatform}
        requirements={coinsRequirements}
        benefits={coinsBenefits}
      />
    );
  } else {
    form = (
      <RankBoostingImage
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        currentDivision={currentDivision}
        setCurrentDivision={setCurrentDivision}
        desiredCategory={desiredCategory}
        setDesiredCategory={setDesiredCategory}
        desiredDivision={desiredDivision}
        setDesiredDivision={setDesiredDivision}
        categoryOptions={fifaRankCategories}
        divisionOptions={fifaDivisions}
        serverOptions={serverOptions}
        queueOptions={queueOptions}
        server={server}
        setServer={setServer}
        queue={queue}
        setQueue={setQueue}
        platform={platform}
        setPlatform={setPlatform}
        platformOptions={platformOptions}
        requirements={requirements}
        benefits={benefits}
      />
    );
  }

  const summary = (
    <OrderSummary
      title={summaryTitle}
      estimatedTime="~2 days, 6h"
      startInLabel="4h"
      rows={summaryRows}
      extras={extraOptions}
      finalRows={finalRows}
      totalAmount={totalAmount}
      orderSubtotal={numericSubtotal}
      volumeDiscountTiers={fifaVolumeDiscountTiers}
      defaultCoupon="SALE5"
    />
  );

  return (
    <div className="bg-dark-main">
      <Hero
        title="FIFA 21 Boosting"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        backgroundImage="/images/hero-fifa21-bg.png"
      />
      <CalculatorPageShell
        categoryOptions={fifaCategories}
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
