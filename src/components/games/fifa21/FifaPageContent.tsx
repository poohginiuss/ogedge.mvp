"use client";

import { CalculatorPageShell } from "@/components/calculator/CalculatorPageShell";
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
  extraOptions,
  fifaCategories,
  fifaDivisions,
  fifaRankCategories,
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

  const [currentCategory, setCurrentCategory] = useState("fut-champions");
  const [currentDivision, setCurrentDivision] = useState("1");
  const [desiredCategory, setDesiredCategory] = useState("fut-champions");
  const [desiredDivision, setDesiredDivision] = useState("5");

  const [platform, setPlatform] = useState("PlayStation");
  const [server, setServer] = useState("Europe");
  const [queue, setQueue] = useState("FUT Champions");

  const platformLabel = platformOptions.find((p) => p.id === platform)?.label ?? platform;

  const summaryRows = [
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

  const finalRows = [
    { label: "Discount", value: "-15%" },
    { label: "Promo Code", value: "-5%" },
    { label: "Total Amount", value: "€249.00" },
  ];

  const form = (
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

  const summary = (
    <OrderSummary
      title="Rank Boost"
      estimatedTime="~2 days, 6h"
      startInLabel="4h"
      rows={summaryRows}
      extras={extraOptions}
      finalRows={finalRows}
      totalAmount="€249.00"
      discountMessage="15% discount applied to your order"
      maxDiscountReached
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
