export type NavItem = {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
};

export const sidebarNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/images/dashboard/icons/nav-dashboard.svg",
    active: true,
  },
  {
    id: "active-orders",
    label: "Active Orders",
    icon: "/images/dashboard/icons/nav-active-orders.svg",
  },
  {
    id: "completed-orders",
    label: "Completed Orders",
    icon: "/images/dashboard/icons/nav-completed-orders.svg",
  },
  { id: "support", label: "Customer Support", icon: "/images/dashboard/icons/nav-support.svg" },
];

export type OrderStatus =
  | "unpaid"
  | "provide-credentials"
  | "awaiting-booster"
  | "in-progress"
  | "booster-back-soon"
  | "booster-back-timed"
  | "review-order"
  | "confirm-delivery"
  | "new-review"
  | "complete";

export type OrderStatusConfig = {
  label: string;
  bg: string;
  textColor: string;
};

export const orderStatusMap: Record<OrderStatus, OrderStatusConfig> = {
  unpaid: { label: "Unpaid", bg: "rgba(163,45,5,0.4)", textColor: "#fff" },
  "provide-credentials": { label: "Provide Credentials", bg: "#6d6d96", textColor: "#fff" },
  "awaiting-booster": { label: "Awaiting Booster", bg: "#c2272d", textColor: "#fff" },
  "in-progress": { label: "In Progress", bg: "#4285f4", textColor: "#fff" },
  "booster-back-soon": { label: "Booster will be back soon", bg: "#ffb000", textColor: "#000" },
  "booster-back-timed": {
    label: "Booster will be back in 2 hours",
    bg: "#ffb000",
    textColor: "#000",
  },
  "review-order": { label: "Review Order", bg: "#6d1ed4", textColor: "#fff" },
  "confirm-delivery": { label: "Confirm Delivery", bg: "#34a853", textColor: "#fff" },
  "new-review": { label: "New Review", bg: "#ffb000", textColor: "#17191f" },
  complete: { label: "Complete", bg: "#34a853", textColor: "#fff" },
};

export type Order = {
  id: string;
  orderId: string;
  title: string;
  statuses: OrderStatus[];
  hasNotification?: boolean;
};

export const sampleOrders: Order[] = [
  {
    id: "1",
    orderId: "#ORD-123456",
    title: "Game - Service",
    statuses: ["unpaid"],
    hasNotification: true,
  },
  {
    id: "2",
    orderId: "#ORD-123456",
    title: "Dota2 - MMR Calculator",
    statuses: ["provide-credentials", "awaiting-booster"],
  },
  {
    id: "3",
    orderId: "#ORD-123456",
    title: "League of Legends - Rank Boost",
    statuses: ["in-progress"],
  },
  {
    id: "4",
    orderId: "#ORD-123456",
    title: "League of Legends - Rank Boost",
    statuses: ["booster-back-timed"],
  },
  {
    id: "5",
    orderId: "#ORD-123456",
    title: "League of Legends - Rank Boost",
    statuses: ["booster-back-soon"],
  },
  {
    id: "6",
    orderId: "#ORD-123456",
    title: "League of Legends - Rank Boost",
    statuses: ["review-order", "confirm-delivery"],
  },
];

export type LoyaltyTier = {
  tier: number;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
  discount: string;
  current?: boolean;
};

export const loyaltyTiers: LoyaltyTier[] = [
  {
    tier: 1,
    name: "Novice",
    color: "#ff5c00",
    bgColor: "rgba(255,92,0,0.2)",
    icon: "/images/dashboard/icons/medal-star-orange.svg",
    discount: "5%",
    current: true,
  },
  {
    tier: 2,
    name: "Advanced",
    color: "#4285f4",
    bgColor: "rgba(66,133,244,0.2)",
    icon: "/images/dashboard/icons/stars-fill-blue.svg",
    discount: "7%",
  },
  {
    tier: 3,
    name: "Veteran",
    color: "#ffb000",
    bgColor: "rgba(255,176,0,0.2)",
    // NOTE: the asset filenames are misleading — `medal-star-blue.svg` is
    // actually filled with the gold #FFB000 tone, and `medal-star-gold.svg`
    // is filled green. We assign them by *visual* colour so each tier's
    // medal icon matches its chip background/text colour as shown in the
    // design (Tier 3 = gold, Tier 4 = green).
    icon: "/images/dashboard/icons/medal-star-blue.svg",
    discount: "10%",
  },
  {
    tier: 4,
    name: "Ultimate",
    color: "#1aad19",
    bgColor: "rgba(26,173,25,0.2)",
    icon: "/images/dashboard/icons/medal-star-gold.svg",
    discount: "15%",
  },
];

export type SeasonalTier = {
  tier: number;
  rewardAmount: string;
  spendTarget: string;
  currentSpent: string;
  progress: number;
  status: "claimed" | "active";
};

export const seasonalTiers: SeasonalTier[] = [
  {
    tier: 1,
    rewardAmount: "$5",
    spendTarget: "$50",
    currentSpent: "$50",
    progress: 100,
    status: "claimed",
  },
  {
    tier: 2,
    rewardAmount: "$10",
    spendTarget: "$100",
    currentSpent: "$50",
    progress: 50,
    status: "active",
  },
  {
    tier: 3,
    rewardAmount: "$10",
    spendTarget: "$150",
    currentSpent: "$50",
    progress: 25,
    status: "active",
  },
];

export const userProfile = {
  username: "@userjohndoe",
  avatarUrl: "/images/dashboard/icons/avatar.png",
  tierName: "Novice",
  walletBalance: "$12.00",
  ogPoints: 12,
  referralCode: "12HOT",
  referralUrl: "https://ogedge.com/en/login?referral=I28H0T",
  friendsJoined: 3,
  loyaltyProgress: 34.51,
  loyaltyCurrentPoints: 12,
  loyaltyNextTierPoints: 24,
  seasonEndsIn: "00:12:45:32",
};
