import type { NavItem, OrderStatus } from "./dashboardData";
export { orderStatusMap } from "./dashboardData";

export const boosterSidebarNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "/images/dashboard/icons/nav-dashboard.svg", active: true },
  { id: "available-orders", label: "Available Orders", icon: "/images/dashboard/icons/nav-active-orders.svg" },
  { id: "my-orders", label: "My Orders", icon: "/images/dashboard/icons/nav-active-orders.svg" },
  { id: "completed-orders", label: "My Completed Orders", icon: "/images/dashboard/icons/nav-completed-orders.svg" },
  { id: "support", label: "Customer Support", icon: "/images/dashboard/icons/nav-support.svg" },
];

export type BoosterOrder = {
  id: string;
  orderId: string;
  title: string;
  statuses: OrderStatus[];
  hasNotification?: boolean;
  earning?: string;
  totalEarning?: string;
  canClaim?: boolean;
};

export const boosterAvailableOrders: BoosterOrder[] = [
  { id: "a1", orderId: "#ORD-123456", title: "Game - Service", statuses: ["in-progress"], hasNotification: true, earning: "+$10.00", totalEarning: "$123.00", canClaim: true },
  { id: "a2", orderId: "#ORD-123456", title: "Dota2 - MMR Calculator", statuses: ["in-progress"], totalEarning: "$123.00", canClaim: true },
];

export const boosterMyOrders: BoosterOrder[] = [
  { id: "m1", orderId: "#ORD-123456", title: "Game - Service", statuses: ["in-progress"], hasNotification: true, earning: "+$10.00", totalEarning: "$123.00" },
  { id: "m2", orderId: "#ORD-123456", title: "Dota2 - MMR Calculator", statuses: ["in-progress"], totalEarning: "$123.00" },
];

export const boosterCompletedOrders: BoosterOrder[] = [
  { id: "c1", orderId: "#ORD-123456", title: "Game - Service", statuses: ["unpaid", "new-review"], hasNotification: false, earning: "+$10.00", totalEarning: "$123.00" },
  { id: "c2", orderId: "#ORD-123456", title: "Dota2 - MMR Calculator", statuses: ["complete"], totalEarning: "$123.00" },
];

export type BoosterReview = {
  id: string;
  username: string;
  avatarUrl: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  purchased: string;
  tags: { label: string; color: string; bg: string }[];
};

export const boosterReviews: BoosterReview[] = [
  {
    id: "r1",
    username: "Robert Johnson",
    avatarUrl: "/images/dashboard/icons/reviewer-avatar.png",
    service: "Platinum III to Diamond III",
    rating: 5,
    date: "2020-12-08",
    text: "Amazing experience, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    purchased: "Game",
    tags: [
      { label: "Verified Purchase", color: "#1aad19", bg: "rgba(26,173,25,0.2)" },
      { label: "Rank Boost", color: "#aaa", bg: "rgba(81,79,79,0.2)" },
    ],
  },
  {
    id: "r2",
    username: "Robert Johnson",
    avatarUrl: "/images/dashboard/icons/reviewer-avatar.png",
    service: "Platinum III to Diamond III",
    rating: 5,
    date: "2020-12-08",
    text: "Amazing experience, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    purchased: "Game",
    tags: [
      { label: "Verified Purchase", color: "#1aad19", bg: "rgba(26,173,25,0.2)" },
      { label: "Rank Boost", color: "#aaa", bg: "rgba(81,79,79,0.2)" },
    ],
  },
];

export const boosterProfile = {
  username: "@amazingbooster",
  avatarUrl: "/images/dashboard/icons/booster-avatar.png",
  starRating: 4.9,
  reviewCount: "10k",
  completionRate: 50,
  totalOrders: 4,
  activeOrders: 2,
  completedOrders: 2,
};
