import type { CategoryOption } from "@/components/games/shared/CategoryTabs";
import type { ExtraOption } from "@/components/games/shared/OrderSummary";

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

export type Rank = { key: RankKey; label: string; glow: string };

export const ranks: Rank[] = [
  { key: "iron", label: "Iron", glow: "rgba(140,140,140,0.6)" },
  { key: "bronze", label: "Bronze", glow: "rgba(205,127,50,0.7)" },
  { key: "silver", label: "Silver", glow: "rgba(192,192,192,0.7)" },
  { key: "gold", label: "Gold", glow: "rgba(255,215,0,0.7)" },
  { key: "platinum", label: "Platinum", glow: "rgba(0,200,200,0.6)" },
  { key: "diamond", label: "Diamond", glow: "rgba(180,140,255,0.7)" },
  { key: "ascendant", label: "Ascendant", glow: "rgba(0,255,150,0.6)" },
  { key: "immortal", label: "Immortal", glow: "rgba(255,80,80,0.7)" },
  { key: "radiant", label: "Radiant", glow: "rgba(255,230,160,0.8)" },
];

export const divisions = ["I", "II", "III"] as const;
export type Division = (typeof divisions)[number];

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
