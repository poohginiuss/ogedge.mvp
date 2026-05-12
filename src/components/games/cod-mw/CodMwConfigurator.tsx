"use client";

import { CamoBoostCalculator } from "@/components/calculator/camo-boost/CamoBoostCalculator";
import type { CodWeaponSelection } from "@/components/calculator/camo-boost/CamoBoostCalculator";
import { CategoryTabs } from "@/components/configurator/CategoryTabs";
import { OrderSummary } from "@/components/configurator/OrderSummary";
import { TrustBadges } from "@/components/configurator/TrustBadges";
import { useState } from "react";

import {
  codCategories,
  extraOptions,
  formatUsd,
  getCamoTierLabel,
  platformOptions,
  seasonalBundles,
  singularityItems,
  weaponTypes,
  weaponsByType,
} from "./codMwData";

const WEAPON_TIER_IDS = new Set(["shattered-gold", "arclight", "tempest"]);

function parseAllBaseTypeId(weaponId: string): string | null {
  if (!weaponId.startsWith("all-base-")) return null;
  return weaponId.slice("all-base-".length);
}

function getWeaponTypeId(weaponId: string): string | null {
  const baseTypeId = parseAllBaseTypeId(weaponId);
  if (baseTypeId) return baseTypeId;

  for (const [typeId, weapons] of Object.entries(weaponsByType)) {
    if (weapons.some((weapon) => weapon.id === weaponId)) return typeId;
  }

  return null;
}

function hasSelectionForType(rows: CodWeaponSelection[], typeId: string): boolean {
  const baseRowId = `all-base-${typeId}`;
  const weaponIds = new Set((weaponsByType[typeId] ?? []).map((weapon) => weapon.id));
  return rows.some((row) => row.id === baseRowId || weaponIds.has(row.id));
}

export function CodMwConfigurator() {
  const [category, setCategory] = useState("camo");

  const [gameMode, setGameMode] = useState<string>("Multiplayer");
  const [camoTier, setCamoTier] = useState("shattered-gold");
  const [selectedWeaponTypes, setSelectedWeaponTypes] = useState<string[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<CodWeaponSelection[]>([]);
  const [allBaseSelected, setAllBaseSelected] = useState<Record<string, boolean>>({});
  const [selectedSingularityItem, setSelectedSingularityItem] = useState<string | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [platform, setPlatform] = useState("PlayStation");

  const platformLabel = platformOptions.find((p) => p.id === platform)?.label ?? platform;

  const onToggleWeaponType = (typeId: string) => {
    const weaponIds = new Set((weaponsByType[typeId] ?? []).map((weapon) => weapon.id));
    const baseRowId = `all-base-${typeId}`;

    setSelectedWeaponTypes((prev) => {
      if (!prev.includes(typeId)) return [...prev, typeId];
      return prev.filter((id) => id !== typeId);
    });
    setSelectedWeapons((prev) =>
      prev.filter((row) => row.id !== baseRowId && !weaponIds.has(row.id)),
    );
    setAllBaseSelected((prev) => ({ ...prev, [typeId]: false }));
  };

  const onToggleAllBase = (typeId: string) => {
    const weapons = weaponsByType[typeId] ?? [];
    const sum = weapons.reduce((s, w) => s + w.price, 0);
    const label = weaponTypes.find((t) => t.id === typeId)?.label ?? typeId;
    const baseRowId = `all-base-${typeId}`;
    const weaponIds = new Set(weapons.map((w) => w.id));

    const on = !!allBaseSelected[typeId];
    if (!on) {
      setSelectedWeaponTypes((prev) => (prev.includes(typeId) ? prev : [...prev, typeId]));
      setAllBaseSelected((prev) => ({ ...prev, [typeId]: true }));
      setSelectedWeapons((rows) => {
        const withoutType = rows.filter((r) => r.id !== baseRowId && !weaponIds.has(r.id));
        return [...withoutType, { id: baseRowId, name: `All Base ${label}`, price: sum }];
      });
      return;
    }
    setAllBaseSelected((prev) => ({ ...prev, [typeId]: false }));
    setSelectedWeapons((rows) => rows.filter((r) => r.id !== baseRowId));
    setSelectedWeaponTypes((prev) => prev.filter((id) => id !== typeId));
  };

  const onToggleWeapon = (weapon: CodWeaponSelection, typeId: string) => {
    const baseRowId = `all-base-${typeId}`;

    setAllBaseSelected((prev) => ({ ...prev, [typeId]: false }));

    setSelectedWeapons((prev) => {
      const withoutBase = prev.filter((w) => w.id !== baseRowId);
      const has = withoutBase.some((w) => w.id === weapon.id);
      if (has) {
        const next = withoutBase.filter((w) => w.id !== weapon.id);
        if (!hasSelectionForType(next, typeId)) {
          setSelectedWeaponTypes((types) => types.filter((id) => id !== typeId));
        }
        return next;
      }
      setSelectedWeaponTypes((types) => (types.includes(typeId) ? types : [...types, typeId]));
      return [...withoutBase, weapon];
    });
  };

  const onRemoveWeapon = (id: string) => {
    const typeFromBase = parseAllBaseTypeId(id);
    const typeId = getWeaponTypeId(id);
    setSelectedWeapons((prev) => {
      const next = prev.filter((w) => w.id !== id);
      if (typeId && !hasSelectionForType(next, typeId)) {
        setSelectedWeaponTypes((types) => types.filter((selectedType) => selectedType !== typeId));
      }
      return next;
    });
    if (typeFromBase) {
      setAllBaseSelected((prev) => ({ ...prev, [typeFromBase]: false }));
    }
  };

  const onRemoveAll = () => {
    setSelectedWeapons([]);
    setAllBaseSelected({});
    setSelectedWeaponTypes([]);
  };

  let subtotal = 0;
  if (camoTier === "singularity" && selectedSingularityItem) {
    const item = singularityItems.find((s) => s.id === selectedSingularityItem);
    subtotal = item?.price ?? 0;
  } else if (camoTier === "seasonal-bundles" && selectedBundle) {
    const b = seasonalBundles.find((x) => x.id === selectedBundle);
    subtotal = b?.price ?? 0;
  } else if (WEAPON_TIER_IDS.has(camoTier)) {
    subtotal = selectedWeapons.reduce((s, w) => s + w.price, 0);
  }

  const summaryRows: { label: string; value: string }[] = [
    { label: "Game Mode", value: gameMode },
    { label: "Camo Tier", value: getCamoTierLabel(camoTier) },
  ];

  if (WEAPON_TIER_IDS.has(camoTier)) {
    if (selectedWeapons.length === 0) {
      summaryRows.push({ label: "Weapons", value: "—" });
    } else {
      const preview = selectedWeapons
        .slice(0, 3)
        .map((w) => w.name)
        .join(", ");
      const suffix = selectedWeapons.length > 3 ? ` +${selectedWeapons.length - 3} more` : "";
      summaryRows.push({ label: "Weapons", value: `${preview}${suffix}` });
    }
  } else if (camoTier === "singularity") {
    const item = singularityItems.find((s) => s.id === selectedSingularityItem);
    summaryRows.push({ label: "Service", value: item?.name ?? "—" });
  } else if (camoTier === "seasonal-bundles") {
    const b = seasonalBundles.find((x) => x.id === selectedBundle);
    summaryRows.push({ label: "Bundle", value: b?.name ?? "—" });
  }

  summaryRows.push({ label: "Platform", value: platformLabel });

  const totalFormatted = formatUsd(subtotal || 0);

  const finalRows = [
    { label: "Discount", value: "-15%" },
    { label: "Promo Code", value: "-5%" },
    { label: "Total Amount", value: totalFormatted },
  ];

  return (
    <section className="relative z-20 -mt-[60px] md:-mt-[80px] lg:-mt-[80px]">
      <div className="mx-auto w-full max-w-[1410px] px-4 md:px-6">
        <div className="mt-6">
          <TrustBadges />
        </div>

        <div className="mt-6">
          <CategoryTabs options={codCategories} value={category} onChange={setCategory} />
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_490px]">
          <CamoBoostCalculator
            gameMode={gameMode}
            setGameMode={setGameMode}
            camoTier={camoTier}
            setCamoTier={setCamoTier}
            selectedWeaponTypes={selectedWeaponTypes}
            onToggleWeaponType={onToggleWeaponType}
            selectedWeapons={selectedWeapons}
            onToggleWeapon={onToggleWeapon}
            onToggleAllBase={onToggleAllBase}
            allBaseSelected={allBaseSelected}
            onRemoveWeapon={onRemoveWeapon}
            onRemoveAll={onRemoveAll}
            selectedSingularityItem={selectedSingularityItem}
            setSelectedSingularityItem={setSelectedSingularityItem}
            selectedBundle={selectedBundle}
            setSelectedBundle={setSelectedBundle}
            platform={platform}
            setPlatform={setPlatform}
          />
          <OrderSummary
            title="Camo Boost"
            estimatedTime="~3 days, 2h"
            startInLabel="6h"
            rows={summaryRows}
            extras={extraOptions}
            finalRows={finalRows}
            totalAmount={totalFormatted}
            discountMessage="15% discount applied to your order"
            maxDiscountReached
            defaultCoupon="SALE5"
          />
        </div>
      </div>
    </section>
  );
}
