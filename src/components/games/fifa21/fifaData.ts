import type { CategoryOption } from "@/components/configurator/CategoryTabs";
import type { ExtraOption } from "@/components/configurator/OrderSummary";
import type { DropdownOption } from "@/components/ui/Dropdown";

export const fifaRankCategories: DropdownOption[] = [
  {
    value: "fut-champions",
    label: "FUT Champions Rank",
    icon: "/images/ranks/fifa/category-icon.png",
  },
  {
    value: "rivals",
    label: "Division Rivals",
    icon: "/images/ranks/fifa/category-icon.png",
  },
];

export const fifaDivisions: DropdownOption[] = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
  icon: `/images/ranks/fifa/rank-${i + 1}.png`,
}));

export const fifaCategories: CategoryOption[] = [
  { id: "rank", icon: "/images/icons/services/safety-outlined.svg", label: "Rank Boost" },
  { id: "placement", icon: "/images/icons/services/rocket.svg", label: "Placement Boost" },
  { id: "win", icon: "/images/icons/services/crown.svg", label: "Boost per Win" },
  { id: "coins", icon: "/images/icons/services/order-light.svg", label: "Coins Boost" },
];

export const platformOptions = [
  { id: "PC", label: "PC", icon: "/images/icons/services/windows.svg" },
  { id: "Xbox", label: "Xbox", icon: "/images/icons/services/xbox.svg" },
  { id: "PlayStation", label: "PlayStation", icon: "/images/icons/services/playstation.svg" },
  { id: "Switch", label: "Nintendo Switch", icon: "/images/icons/services/nintendo.svg" },
];

export const serverOptions = ["Europe", "America", "Oceania/Asia", "Middle East"];
export const queueOptions = ["FUT Champions", "Division Rivals", "Squad Battles"];

export const requirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const benefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];

export const extraOptions: ExtraOption[] = [
  { id: "offline", label: "Offline Mode", cost: "FREE", defaultOn: true },
  { id: "streaming", label: "Streaming", cost: "+25% cost" },
  { id: "priority", label: "Priority", cost: "+20% cost", defaultOn: true },
  { id: "rush", label: "Rush Completion", cost: "+25% cost" },
];
