import type { CategoryOption } from "@/components/configurator/CategoryTabs";
import type { ExtraOption } from "@/components/configurator/OrderSummary";

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
  { id: "unrated", icon: "/images/icons/services/order-light.svg", label: "Unrated Matches" },
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
