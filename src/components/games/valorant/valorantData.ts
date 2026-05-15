import type { SelectableCard } from "@/components/calculator/forms/CardSelectorCalculator";
import type { MmrQuickSelect } from "@/components/calculator/forms/MmrBoostCalculator";
import type { CategoryOption } from "@/components/calculator/shared/CategoryTabs";
import type { CurrencyCardData } from "@/components/calculator/shared/CurrencyCard";
import type { ExtraOption } from "@/components/calculator/shared/OrderSummary";

export type RankKey =
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "ascendant"
  | "immortal"
  | "radiant";

export type Rank = { key: RankKey; label: string; glow: string; color: string };

export const ranks: Rank[] = [
  { key: "iron", label: "Iron", glow: "rgba(140,140,140,0.6)", color: "#8c8c8c" },
  { key: "bronze", label: "Bronze", glow: "rgba(205,127,50,0.7)", color: "#cd7f32" },
  { key: "silver", label: "Silver", glow: "rgba(192,192,192,0.7)", color: "#c0c0c0" },
  { key: "gold", label: "Gold", glow: "rgba(255,215,0,0.7)", color: "#ffd700" },
  { key: "platinum", label: "Platinum", glow: "rgba(0,200,200,0.6)", color: "#00c8c8" },
  { key: "diamond", label: "Diamond", glow: "rgba(180,140,255,0.7)", color: "#b48cff" },
  { key: "ascendant", label: "Ascendant", glow: "rgba(0,255,150,0.6)", color: "#00ff96" },
  { key: "immortal", label: "Immortal", glow: "rgba(255,80,80,0.7)", color: "#ff5050" },
  { key: "radiant", label: "Radiant", glow: "rgba(255,230,160,0.8)", color: "#ffe6a0" },
];

export const divisions = ["I", "II", "III"] as const;
export type Division = (typeof divisions)[number];

/* ── Rank Boost data ─────────────────────────────────────────── */

export type RankBoostKey =
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "emerald"
  | "diamond"
  | "master"
  | "grandmaster"
  | "challenger";

export type RankBoostRank = {
  key: RankBoostKey;
  label: string;
  glow: string;
  color: string;
};

export const rankBoostRanks: RankBoostRank[] = [
  { key: "iron", label: "Iron", glow: "rgba(73,60,57,0.4)", color: "#8c8c8c" },
  { key: "bronze", label: "Bronze", glow: "rgba(120,75,61,0.4)", color: "#cd7f32" },
  { key: "silver", label: "Silver", glow: "rgba(107,134,195,0.4)", color: "#6b86c3" },
  { key: "gold", label: "Gold", glow: "rgba(255,176,0,0.4)", color: "#ffb000" },
  { key: "platinum", label: "Platinum", glow: "rgba(18,105,109,0.4)", color: "#12696d" },
  { key: "emerald", label: "Emerald", glow: "rgba(16,168,60,0.4)", color: "#10a83c" },
  { key: "diamond", label: "Diamond", glow: "rgba(81,145,191,0.4)", color: "#5191bf" },
  { key: "master", label: "Master", glow: "rgba(196,82,242,0.4)", color: "#c452f2" },
  { key: "grandmaster", label: "Grandmaster", glow: "rgba(253,181,81,0.4)", color: "#fdb551" },
  { key: "challenger", label: "Challenger", glow: "rgba(83,147,175,0.4)", color: "#5393af" },
];

export const rankBoostDivisions = ["I", "II", "III", "IV"] as const;
export type RankBoostDivision = (typeof rankBoostDivisions)[number];

export const rankBoostRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const rankBoostBenefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];

export const categories: CategoryOption[] = [
  { id: "rank", icon: "/images/icons/services/safety-outlined.svg", label: "Rank Boost" },
  { id: "placement", icon: "/images/icons/services/rocket.svg", label: "Placement Boost" },
  { id: "win", icon: "/images/icons/services/crown.svg", label: "Boost per Win" },
  { id: "currency", icon: "/images/icons/services/cash.svg", label: "Currency" },
  { id: "camo", icon: "/images/icons/services/safety-outlined.svg", label: "Camo Boost" },
  { id: "boosting", icon: "/images/icons/services/crown.svg", label: "Boosting" },
  { id: "mmr", icon: "/images/icons/services/tap.svg", label: "MMR Boost" },
  { id: "leveling", icon: "/images/icons/services/rocket.svg", label: "Leveling" },
];

export const platformOptions = [
  { id: "PC", label: "PC", icon: "/images/icons/services/windows.svg" },
  { id: "Xbox", label: "Xbox", icon: "/images/icons/services/xbox.svg" },
  { id: "PlayStation", label: "PlayStation", icon: "/images/icons/services/playstation.svg" },
  { id: "Switch", label: "Nintendo Switch", icon: "/images/icons/services/nintendo.svg" },
];

export const serverOptions = ["Europe", "America", "Oceania/Asia", "Middle East"];
export const queueOptions = ["Competitive", "Unrated", "Spike Rush", "Deathmatch"];

export const extraOptions: ExtraOption[] = [
  { id: "offline", label: "Offline Mode", cost: "FREE", defaultOn: true },
  { id: "streaming", label: "Streaming", cost: "+25% cost" },
  { id: "priority", label: "Priority", cost: "+20% cost", defaultOn: true },
  { id: "rush", label: "Rush Completion", cost: "+25% cost" },
];

export const requirements = [
  "Valorant account credentials",
  "Active VP for Ranked queue",
  "Region/Server availability",
  "Compatible platform setup",
];

export const benefits = [
  "Guaranteed 5/4 wins minimum",
  "Account safety & privacy",
  "Real-time order tracking",
  "24/7 customer support",
];

/* ── Camo Boost (Card Selector) data ─────────────────────────── */

export const camoCards: SelectableCard[] = [
  {
    id: "leviathan",
    name: "Leviathan",
    description: "Base camo - all standard challenges",
    price: 12.99,
    image: "/images/camo-boost/weapon.png",
    locks: ["leviathan-platinum-2"],
  },
  {
    id: "leviathan-gold",
    name: "Leviathan Gold",
    description: "Gold tier - 100 headshots required",
    price: 24.99,
    image: "/images/camo-boost/weapon.png",
  },
  {
    id: "leviathan-platinum",
    name: "Leviathan Platinum",
    description: "Platinum — Gold on all in category",
    price: 39.99,
  },
  {
    id: "leviathan-diamond",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
    image: "/images/camo-boost/weapon.png",
    locks: ["leviathan-diamond-2"],
  },
  {
    id: "leviathan-diamond-2",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
    image: "/images/camo-boost/weapon.png",
    locks: ["leviathan-diamond"],
  },
  {
    id: "leviathan-platinum-2",
    name: "Leviathan Platinum",
    description: "Platinum — Gold on all in category",
    price: 39.99,
    image: "/images/camo-boost/weapon.png",
    locks: ["leviathan"],
  },
];

export const camoRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const camoBenefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];

/* ── Currency Calculator data ────────────────────────────────── */

export const currencyPacks: CurrencyCardData[] = [
  {
    id: "100k",
    amount: 100_000,
    amountLabel: "100K",
    packName: "Standard Pack",
    price: 1.0,
    discountLabel: "Base",
    image: "/images/currency/coins-1.png",
  },
  {
    id: "500k",
    amount: 500_000,
    amountLabel: "500K",
    packName: "Value Pack",
    price: 4.75,
    discount: 5,
    discountLabel: "-5%",
    image: "/images/currency/coins-2.png",
  },
  {
    id: "1m",
    amount: 1_000_000,
    amountLabel: "1M",
    packName: "Premium Pack",
    price: 9.0,
    discount: 10,
    discountLabel: "-10%",
    image: "/images/currency/coins-3.png",
  },
  {
    id: "1.5m",
    amount: 1_500_000,
    amountLabel: "1.5M",
    packName: "Elite Pack",
    price: 12.75,
    discount: 15,
    discountLabel: "-15%",
    image: "/images/currency/coins-4.png",
  },
  {
    id: "2m",
    amount: 2_000_000,
    amountLabel: "2M",
    packName: "VIP Pack",
    price: 16.0,
    discount: 20,
    discountLabel: "-20%",
    image: "/images/currency/coins-5.png",
    isVip: true,
  },
];

export const currencyRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const currencyBenefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];

/* ── MMR Boost data ──────────────────────────────────────────── */

export const MMR_MIN = 0;
export const MMR_MAX = 6500;
export const MMR_STEP = 100;
export const MMR_PRICE_PER_POINT = 0.03;

export const mmrQuickSelects: MmrQuickSelect[] = [
  { id: "1-2k", label: "1k → 2k", current: 1000, desired: 2000 },
  { id: "2-3k", label: "2k → 3k", current: 2000, desired: 3000 },
  { id: "3-4k", label: "3k → 4k", current: 3000, desired: 4000 },
  { id: "4-5k", label: "4k → 5k", current: 4000, desired: 5000 },
  { id: "5-6.5k", label: "5k → 6.5k", current: 5000, desired: 6500 },
];

export const mmrRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const mmrBenefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];

export function formatMmrShort(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
}

/* ── Boosting Cards data (ImageTopCardCalculator) ────────────── */

import type { ImageTopCard } from "@/components/calculator/forms/ImageTopCardCalculator";

/**
 * 16-card mock matching Figma node 837:10791 (4 rows × 4 columns).
 * Row 1 — mix of image & no-image; card r1c3 is locked (r1c1 selects it out).
 * Row 2 — 2 image cards + 2 no-image.
 * Row 3 — all no-image, various title/desc combos.
 * Row 4 — all no-image, title-only cards.
 */
export const boostingCards: ImageTopCard[] = [
  /* ── Row 1 ── */
  {
    id: "r1c1",
    name: "Leviathan",
    description: "Base camo - all standard challenges",
    price: 12.99,
    image: "/images/camo-boost/weapon.png",
    locks: ["r1c3"],
  },
  {
    id: "r1c2",
    name: "Leviathan Platinum",
    description: "Platinum — Gold on all in category",
    price: 39.99,
    image: "/images/camo-boost/weapon.png",
  },
  {
    id: "r1c3",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
    image: "/images/camo-boost/weapon.png",
  },
  {
    id: "r1c4",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
  },
  /* ── Row 2 ── */
  {
    id: "r2c1",
    name: "Title two lines maximum rest trunc…",
    description: "This is a description that at max. goes on two lines",
    price: 12.99,
    image: "/images/camo-boost/weapon.png",
  },
  {
    id: "r2c2",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
  },
  {
    id: "r2c3",
    name: "Title one line",
    description: "This is a description that at max. goes on two lines",
    price: 12.99,
    image: "/images/camo-boost/weapon.png",
  },
  {
    id: "r2c4",
    name: "Leviathan Platinum",
    description: "Platinum — Gold on all in category",
    price: 39.99,
  },
  /* ── Row 3 ── */
  {
    id: "r3c1",
    name: "Title two lines maximum rest is…",
    description: "Platinum — Gold on all in category",
    price: 39.99,
  },
  {
    id: "r3c2",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
  },
  {
    id: "r3c3",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
  },
  {
    id: "r3c4",
    name: "Leviathan Diamond",
    description: "Diamond — Platinum all categories",
    price: 24.99,
  },
  /* ── Row 4 ── */
  {
    id: "r4c1",
    name: "Title two lines maximum rest is…",
    price: 39.99,
  },
  {
    id: "r4c2",
    name: "Leviathan Diamond",
    price: 24.99,
  },
  {
    id: "r4c3",
    name: "Leviathan Diamond",
    price: 24.99,
  },
  {
    id: "r4c4",
    name: "Leviathan Diamond",
    price: 24.99,
  },
];

export const boostingRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const boostingBenefits = [
  "Guaranteed boost to selected tier.",
  "Account safety & privacy.",
  "Real-time order tracking.",
  "24/7 customer support.",
];

/* ── Leveling Boost data ─────────────────────────────────────── */

export const LEVELING_MIN = 1;
export const LEVELING_MAX = 100;
export const LEVELING_STEP = 1;
export const LEVELING_PRICE_PER_LEVEL = 1;

export const levelingRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const levelingBenefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];
