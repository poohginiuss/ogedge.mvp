"use client";

import { PlatformSelector } from "@/components/ui/PlatformSelector";
import { BulletList } from "../shared/BulletList";
import { CamoScrollPanel } from "../shared/CamoScrollPanel";
import { CollapsibleList } from "../shared/CollapsibleList";
import { SelectableCardButton } from "../shared/SelectableCardButton";

export type CodWeaponSelection = {
  id: string;
  name: string;
  price: number;
};

export type CamoTierOption = { id: string; label: string };
export type WeaponTypeOption = { id: string; label: string };
export type CodWeapon = { id: string; name: string; price: number };
export type SingularityItem = { id: string; name: string; description: string; price: number };
export type SeasonalBundle = { id: string; name: string; price: number; image: string };

export type CamoBoostCalculatorProps = {
  gameMode: string;
  setGameMode: (m: string) => void;
  camoTier: string;
  setCamoTier: (t: string) => void;
  selectedWeaponTypes: string[];
  onToggleWeaponType: (typeId: string) => void;
  selectedWeapons: CodWeaponSelection[];
  onToggleWeapon: (weapon: CodWeaponSelection, typeId: string) => void;
  onToggleAllBase: (typeId: string) => void;
  allBaseSelected: Record<string, boolean>;
  onRemoveWeapon: (id: string) => void;
  onRemoveAll: () => void;
  selectedSingularityItem: string | null;
  setSelectedSingularityItem: (id: string | null) => void;
  selectedBundle: string | null;
  setSelectedBundle: (id: string | null) => void;
  platform: string;
  setPlatform: (p: string) => void;
  gameModes: readonly string[];
  camoTierOptions: CamoTierOption[];
  weaponTypes: WeaponTypeOption[];
  weaponsByType: Record<string, CodWeapon[]>;
  requirementTexts: Record<string, string>;
  singularityItems: SingularityItem[];
  seasonalBundles: SeasonalBundle[];
  platformOptions: { id: string; label: string; icon: string }[];
  requirements: string[];
  benefits: string[];
};

const CALC_CARD_BORDER = "2px solid #6d6d96";
const CALC_BG =
  "linear-gradient(111deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)";

const PILL_ACTIVE = {
  border: "1px solid #ff975d",
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
  boxShadow: "0px 4px 7px rgba(255,92,0,0.3)",
  color: "#ff975d",
} as const;

const PILL_INACTIVE = {
  backdropFilter: "blur(3px)",
  background: "rgba(23,25,31,0.5)",
  border: "1px solid #383852",
  boxShadow: "0px 4px 16px rgba(0,0,0,0.45)",
  color: "#ffffff",
} as const;

const WEAPON_TYPE_ACTIVE_BG = "rgba(255,92,0,0.2)";

const WEAPON_ROW_SELECTED_BG = "rgba(255,92,0,0.2)";

function allBaseId(typeId: string): string {
  return `all-base-${typeId}`;
}

function sumWeapons(wbt: Record<string, CodWeapon[]>, typeId: string): number {
  const list = wbt[typeId] ?? [];
  return list.reduce((s, w) => s + w.price, 0);
}

function CircleCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-md"
      style={{ background: "#feece6", border: "1px solid #fa4609" }}
    >
      {checked && (
        <span
          className="block h-3 w-3 rounded-[3px]"
          style={{
            backgroundImage: "linear-gradient(135deg, #ff975d 2.08%, #a32d05 102.08%)",
          }}
        />
      )}
    </span>
  );
}

export function CamoBoostCalculator({
  gameMode,
  setGameMode,
  camoTier,
  setCamoTier,
  selectedWeaponTypes,
  onToggleWeaponType,
  selectedWeapons,
  onToggleWeapon,
  onToggleAllBase,
  allBaseSelected,
  onRemoveWeapon,
  onRemoveAll,
  selectedSingularityItem,
  setSelectedSingularityItem,
  selectedBundle,
  setSelectedBundle,
  platform,
  setPlatform,
  gameModes,
  camoTierOptions,
  weaponTypes,
  weaponsByType,
  requirementTexts,
  singularityItems,
  seasonalBundles,
  platformOptions,
  requirements,
  benefits,
}: CamoBoostCalculatorProps) {
  const weaponTierIds = ["shattered-gold", "arclight", "tempest"];
  const isWeaponTier = weaponTierIds.includes(camoTier);
  const requirementCopy =
    requirementTexts[camoTier] ??
    "If you purchase individual guns, they must already be unlocked. If you purchase the All Guns bundle, we will unlock all required weapons for you as well.";

  const singularity = singularityItems[0];

  const visibleTypes = weaponTypes.filter((t) => t.id !== "all-guns");

  return (
    <div
      className="min-w-0 rounded-3xl p-6 md:p-10 lg:px-[60px] lg:py-[50px]"
      style={{ border: CALC_CARD_BORDER, background: CALC_BG, backdropFilter: "blur(7px)" }}
    >
      <div className="flex min-w-0 flex-col gap-8 font-body">
        {/* Game Mode */}
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-medium leading-8 text-white">Game Mode</h3>
            <p className="text-base font-medium leading-6 text-white/50">Select the game mode</p>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {gameModes.map((mode) => {
              const active = gameMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setGameMode(mode)}
                  className="flex h-[50px] items-center justify-center rounded-2xl px-2 font-semibold text-sm uppercase tracking-[0.28px] transition-all"
                  style={active ? PILL_ACTIVE : PILL_INACTIVE}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Camo Tier */}
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-medium leading-8 text-white">Camo Tier</h3>
            <p className="text-base font-medium leading-6 text-white/50">Select camo tier</p>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
            {camoTierOptions.map((tier) => {
              const active = camoTier === tier.id;
              const ownRow = tier.id === "seasonal-bundles";
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setCamoTier(tier.id)}
                  className={`flex h-[50px] items-center justify-center rounded-2xl px-2 font-semibold text-sm uppercase tracking-[0.28px] transition-all lg:col-span-1 ${ownRow ? "col-span-2 lg:col-span-1" : ""}`}
                  style={active ? PILL_ACTIVE : PILL_INACTIVE}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Requirement */}
        <div
          className="rounded-2xl p-4 md:p-5"
          style={{ border: "1px solid #383852", background: "rgba(0,0,0,0.2)" }}
        >
          <div className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/services/info.svg"
              alt=""
              loading="lazy"
              className="mt-0.5 h-5 w-5 shrink-0 opacity-90"
            />
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-white">Requirement</p>
              <p className="text-sm leading-relaxed text-white/85">{requirementCopy}</p>
            </div>
          </div>
        </div>

        {/* Weapon tiers — two-column: type list (scrollable) + weapon list (scrollable) */}
        {isWeaponTier && (
          <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-6">
            {/* Left: Weapon Type Selection (multi-select, scrollable) */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h4 className="text-xl font-medium text-white">Weapon Type Selection</h4>
              <div
                className="overflow-hidden rounded-[24px] border border-[#383852] bg-[rgba(23,25,31,0.5)] py-2"
                style={{ height: "360px" }}
              >
                <CamoScrollPanel>
                  {weaponTypes.map((t) => {
                    const active = selectedWeaponTypes.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => onToggleWeaponType(t.id)}
                        className="flex w-full items-center gap-2 px-6 py-3 text-left transition-all"
                        style={{
                          background: active ? WEAPON_TYPE_ACTIVE_BG : "transparent",
                        }}
                      >
                        <CircleCheckbox checked={active} />
                        <span
                          className={`flex-1 text-base leading-6 ${active ? "font-bold text-[#ff5c00]" : "font-normal text-white"}`}
                        >
                          {t.label}
                        </span>
                        {active && (
                          <span
                            className="inline-flex shrink-0 items-center gap-1 rounded-2xl py-0.5 pl-1 pr-2"
                            style={{ background: "#34a853" }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/images/icons/services/check-raw.svg"
                              alt=""
                              className="h-3 w-3 pl-0.5"
                            />
                            <span className="text-xs font-medium leading-[20px] text-white">
                              Selected
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </CamoScrollPanel>
              </div>
            </div>

            {/* Right: Weapon Selection — all selected types with category dividers */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h4 className="text-xl font-medium text-white">Weapon Selection</h4>
              <div
                className="overflow-hidden rounded-[24px] border border-[#383852] bg-[rgba(23,25,31,0.5)] py-2"
                style={{ height: "360px" }}
              >
                <CamoScrollPanel>
                  {visibleTypes.map((type) => {
                    const weapons = weaponsByType[type.id] ?? [];
                    const baseOn = !!allBaseSelected[type.id];
                    const baseRowId = allBaseId(type.id);
                    const baseRowSel = selectedWeapons.some((w) => w.id === baseRowId);
                    const agg = sumWeapons(weaponsByType, type.id);

                    return (
                      <div key={type.id} className="flex flex-col">
                        {/* Category divider */}
                        <div className="px-6 py-1" style={{ background: "#383852" }}>
                          <span className="text-xs font-bold leading-[18px] text-white">
                            {type.label}
                          </span>
                        </div>

                        {/* All Base row */}
                        <button
                          type="button"
                          onClick={() => onToggleAllBase(type.id)}
                          className="flex w-full items-center gap-2 px-6 py-3 text-left transition-all"
                          style={{
                            background: baseRowSel ? WEAPON_ROW_SELECTED_BG : "transparent",
                          }}
                        >
                          <CircleCheckbox checked={baseRowSel} />
                          <span className="flex flex-1 items-center justify-between gap-2">
                            <span
                              className={`text-base leading-6 ${baseRowSel ? "font-bold text-[#ff5c00]" : "font-normal text-white"}`}
                            >
                              All Base {type.label}
                            </span>
                            <span
                              className="inline-flex items-center justify-center rounded-lg px-1 py-0.5 text-sm font-normal leading-5 text-white"
                              style={{ background: "#ff5c00" }}
                            >
                              ${agg}
                            </span>
                          </span>
                        </button>

                        {/* Individual weapons */}
                        {weapons.map((w) => {
                          const sel = selectedWeapons.some((x) => x.id === w.id);
                          const disabled = baseOn;
                          return (
                            <button
                              key={w.id}
                              type="button"
                              disabled={disabled}
                              onClick={() => onToggleWeapon(w, type.id)}
                              className={`flex w-full items-center gap-2 px-6 py-3 text-left transition-all ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                              style={{
                                background: sel ? WEAPON_ROW_SELECTED_BG : "transparent",
                              }}
                            >
                              <CircleCheckbox checked={sel || disabled} />
                              <span className="flex flex-1 items-center justify-between gap-2">
                                <span
                                  className={`text-base leading-6 ${sel ? "font-bold text-[#ff5c00]" : "font-normal text-white"}`}
                                >
                                  {w.name}
                                </span>
                                <span
                                  className="inline-flex items-center justify-center rounded-lg px-1 py-0.5 text-sm font-normal leading-5 text-white"
                                  style={{ background: "#ff5c00" }}
                                >
                                  ${w.price}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </CamoScrollPanel>
              </div>
            </div>
          </div>
        )}

        {/* Singularity */}
        {camoTier === "singularity" && singularity && (
          <button
            type="button"
            onClick={() =>
              setSelectedSingularityItem(
                selectedSingularityItem === singularity.id ? null : singularity.id,
              )
            }
            className="relative rounded-2xl p-5 text-left transition-all"
            style={{
              border:
                selectedSingularityItem === singularity.id
                  ? "1px solid #ff975d"
                  : "1px solid #383852",
              background: "rgba(0,0,0,0.2)",
              boxShadow:
                selectedSingularityItem === singularity.id
                  ? "0 4px 24px rgba(255,151,93,0.35)"
                  : undefined,
            }}
          >
            {selectedSingularityItem === singularity.id && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/images/icons/services/platform-check.svg"
                alt=""
                className="absolute right-4 top-4 h-4 w-4"
              />
            )}
            <p className="pr-10 text-xl font-semibold text-white">{singularity.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{singularity.description}</p>
            <p className="mt-4 text-lg font-bold text-[#ff975d]">${singularity.price.toFixed(2)}</p>
          </button>
        )}

        {/* Seasonal bundles */}
        {camoTier === "seasonal-bundles" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {seasonalBundles.map((b) => (
              <SelectableCardButton
                key={b.id}
                card={b}
                selected={selectedBundle === b.id}
                locked={false}
                onClick={() => setSelectedBundle(selectedBundle === b.id ? null : b.id)}
              />
            ))}
          </div>
        )}

        {/* Your Selection — weapon tiers only */}
        {isWeaponTier && selectedWeapons.length > 0 && (
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xl font-medium text-white">Your Selection</h4>
              <button
                type="button"
                onClick={onRemoveAll}
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2 font-body text-sm font-semibold text-[#ff5c00] transition-colors hover:opacity-80"
                style={{ background: "rgba(113,50,32,0.78)" }}
              >
                <span>Remove all</span>
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div className="flex min-w-0 flex-wrap gap-2">
              {selectedWeapons.map((w) => (
                <div
                  key={w.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#383852] bg-[rgba(23,25,31,0.85)] px-3 py-2 transition-colors hover:border-[#ff975d]/50"
                >
                  <span className="text-sm text-white">{w.name}</span>
                  <span className="shrink-0 rounded-md bg-[rgba(56,56,82,0.8)] px-2 py-0.5 text-xs font-semibold text-white/90">
                    ${w.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveWeapon(w.id)}
                    className="shrink-0 text-white/70 transition-colors hover:text-white"
                    aria-label={`Remove ${w.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Configuration */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl font-medium leading-8 text-white">Game Configuration</h3>
            <p className="text-base font-medium leading-6 text-white/50">Enter game details</p>
          </div>
          <div>
            <p className="text-base font-normal text-white">
              Platform <span className="text-[#ff5c00]">*</span>
            </p>
            <PlatformSelector
              options={platformOptions}
              value={platform}
              onChange={setPlatform}
              className="mt-2"
            />
          </div>
        </div>

        {/* Requirements & Benefits */}
        <div className="hidden grid-cols-2 gap-6 md:grid">
          <BulletList title="Requirements" items={requirements} />
          <BulletList title="What Do I Get" items={benefits} />
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          <CollapsibleList title="Requirements" items={requirements} />
          <CollapsibleList title="What Do I Get" items={benefits} />
        </div>
      </div>
    </div>
  );
}
