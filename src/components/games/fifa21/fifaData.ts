import type { CurrencyTier } from "@/components/calculator/forms/CurrencySliderCalculator";
import type { CategoryOption } from "@/components/calculator/shared/CategoryTabs";
import type { ExtraOption } from "@/components/calculator/shared/OrderSummary";
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
  { id: "coins", icon: "/images/icons/services/cash.svg", label: "Coins Boost" },
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

/* ── Coins Boost (Currency Slider) data ──────────────────────── */

export const coinsTiers: CurrencyTier[] = [
  {
    id: "100k",
    amount: 100_000,
    amountLabel: "100K",
    quickLabel: "Base",
    tierName: "Standard",
    price: 1.0,
    discountLabel: "Base",
  },
  {
    id: "500k",
    amount: 500_000,
    amountLabel: "500K",
    quickLabel: "Popular",
    tierName: "Regular",
    discount: 5,
    price: 4.75,
    discountLabel: "-5%",
    savingsAmount: "$25",
  },
  {
    id: "1m",
    amount: 1_000_000,
    amountLabel: "1M",
    quickLabel: "-10% OFF",
    tierName: "Bulk",
    discount: 10,
    price: 9.0,
    discountLabel: "-10%",
    savingsAmount: "$50",
  },
  {
    id: "1.5m",
    amount: 1_500_000,
    amountLabel: "1.5M",
    quickLabel: "-15% OFF",
    tierName: "Premium",
    discount: 15,
    price: 12.75,
    discountLabel: "-15%",
    savingsAmount: "$75",
  },
  {
    id: "2m",
    amount: 2_000_000,
    amountLabel: "2M",
    quickLabel: "-20% OFF",
    tierName: "VIP",
    discount: 20,
    price: 16.0,
    discountLabel: "-20%",
    savingsAmount: "$100",
  },
];

export const coinsRequirements = [
  "An eligible account (e.g., Level 30 with placement matches available).",
  "Accurate regional server (EUW, NA, etc.).",
  "Correct account credentials (provided at checkout).",
  "Account free of active penalties or restrictions.",
];

export const coinsBenefits = [
  "3 Placement Wins on your account.",
  "Progression towards your final placement division.",
  "A detailed match history with performance overview.",
  "Optional match replays upon request.",
];
