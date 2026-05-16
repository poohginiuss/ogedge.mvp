export type AddonTag = {
  label: string;
  color: string;
};

export type CartItem = {
  id: string;
  game: string;
  gameImage: string;
  platform: "windows" | "playstation" | "xbox" | "nintendo" | "switch";
  service: string;
  serviceRange: string;
  addons: AddonTag[];
  estimatedTime: string;
  price: number;
  discountCode?: string;
};

export type TipMode = "percent" | "fixed";

export const PERCENT_OPTIONS = ["5%", "10%", "15%", "20%", "Custom"] as const;
export const FIXED_OPTIONS = ["€5", "€10", "€20", "€50", "Custom"] as const;

export type Booster = {
  id: string;
  name: string;
  rating: number;
};

export const MOCK_BOOSTERS: Booster[] = [
  { id: "b1", name: "GamerBeast", rating: 4.7 },
  { id: "b2", name: "GamerBoy1234", rating: 4.9 },
  { id: "b3", name: "GamerBoyX", rating: 4.8 },
  { id: "b4", name: "ProBooster99", rating: 4.6 },
  { id: "b5", name: "EliteGamer", rating: 5.0 },
  { id: "b6", name: "NightOwlPro", rating: 4.5 },
  { id: "b7", name: "BoostKing", rating: 4.8 },
  { id: "b8", name: "AcePlayer", rating: 4.7 },
];

export const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    id: "ORD-001",
    game: "Valorant",
    gameImage: "/images/home/games/valorant-backing.png",
    platform: "windows",
    service: "Rank Boosting",
    serviceRange: "Silver II — Platinum III",
    addons: [
      { label: "Offline Mode", color: "#4ade80" },
      { label: "Streaming", color: "#38bdf8" },
      { label: "Priority", color: "#c084fc" },
      { label: "Rush Completion", color: "#fb923c" },
    ],
    estimatedTime: "36 hours",
    price: 327.0,
    discountCode: "sale5",
  },
  {
    id: "ORD-002",
    game: "Valorant",
    gameImage: "/images/home/games/valorant-backing.png",
    platform: "windows",
    service: "Boost per Win",
    serviceRange: "3 Wins",
    addons: [
      { label: "Offline Mode", color: "#4ade80" },
      { label: "Priority", color: "#c084fc" },
    ],
    estimatedTime: "6 hours",
    price: 127.0,
  },
  {
    id: "ORD-003",
    game: "Valorant",
    gameImage: "/images/home/games/valorant-backing.png",
    platform: "windows",
    service: "Boost per Win",
    serviceRange: "3 Wins",
    addons: [],
    estimatedTime: "6 hours",
    price: 107.0,
  },
];
