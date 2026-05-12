"use client";

import { RankBoostingImage } from "@/components/calculator/rank-boosting/RankBoostingImage";
import { CategoryTabs } from "@/components/configurator/CategoryTabs";
import { OrderSummary } from "@/components/configurator/OrderSummary";
import { TrustBadges } from "@/components/configurator/TrustBadges";
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

export function FifaConfigurator() {
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

  return (
    <section className="relative z-20 -mt-[60px] md:-mt-[80px] lg:-mt-[80px]">
      <div className="mx-auto w-full max-w-[1410px] px-4 md:px-6">
        <div className="mt-6">
          <TrustBadges />
        </div>

        <div className="mt-6">
          <CategoryTabs options={fifaCategories} value={category} onChange={setCategory} />
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_490px]">
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
        </div>
      </div>
    </section>
  );
}
