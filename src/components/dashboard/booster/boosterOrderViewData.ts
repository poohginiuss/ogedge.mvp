import type { OrderViewModel } from "../order-view/orderViewData";

export type BoosterOrderStatus = "not-started" | "started" | "paused" | "completed";

export type BoosterOrderViewModel = OrderViewModel & {
  completionTime: string;
  payout: string;
  boosterStatus: BoosterOrderStatus;
};

export const sampleBoosterOrderView: BoosterOrderViewModel = {
  orderId: "123456",
  showBoosterPoachingWarning: true,
  boosterName: "Sub-Zero",
  boosterAvatar: "/images/dashboard/orderview/chat/booster-avatar.png",
  boosterOnline: true,
  boosterRating: 4.9,
  boosterReviewCount: 85,
  chatContextLabel: "#123456",
  chatContextDate: "Date Start:  March 18, 12:24",
  chatContextArtwork: "/images/dashboard/orderview/games/valorant-thumb.svg",
  completionTime: "36 hours",
  payout: "$125.00",
  boosterStatus: "not-started",
  hero: {
    game: "valorant",
    gameTitle: "Valorant",
    serviceTitle: "Rank Boosting",
    rangeLabel: "Silver II — Platinum III",
    artworkSrc: "/images/dashboard/orderview/games/hero-artwork.png",
    fromRank: {
      src: "/images/dashboard/orderview/ranks/valorant-silver-rank.png",
      label: "Silver II",
    },
    toRank: {
      src: "/images/dashboard/orderview/ranks/valorant-diamond-rank.png",
      label: "Diamond I",
    },
    status: "not-started",
  },
  orderDetails: [
    { label: "ID", value: "123456", copyable: true },
    { label: "Game", value: "Valorant" },
    { label: "Service", value: "Rank Boosting: Silver II - Platinum III" },
    { label: "Payout", value: "$125.00", valueColor: "#ff975d" },
  ],
  accountDetails: [
    { label: "In-Game Name", value: "CouchPotato1234" },
    { label: "Server", value: "EUW" },
    { label: "Login Name", value: "CouchPotato" },
    { label: "Login Password", value: "supersecret", masked: true },
  ],
  accountDetailChips: [
    { label: "EUW", bg: "rgba(255,176,0,0.2)", color: "#ffb000" },
    { label: "OFFLINE MODE", bg: "rgba(45,194,39,0.2)", color: "#2dc227" },
    { label: "STREAMING", bg: "rgba(194,39,45,0.2)", color: "#ff543e" },
    { label: "PRIORITY", bg: "rgba(255,92,0,0.2)", color: "#ff5c00" },
    { label: "RUSH COMPLETION", bg: "rgba(38,86,151,0.2)", color: "#4285f4" },
  ],
  description: {
    title: "Descriere importanta",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ut felis in congue. Nunc sed tellus rhoncus, vehic",
  },
  messages: [
    {
      id: "m2",
      role: "admin",
      title: "Join the Valorant Community",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ut felis in congue. Nunc sed tellus rhoncus, vehic",
    },
    {
      id: "m3",
      role: "admin",
      title: "Valorant Rank Boosting Instructions",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ut felis in congue. Nunc sed tellus rhoncus, vehic",
    },
    {
      id: "m4",
      role: "admin",
      title: "Welcome",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ut felis in congue. Nunc sed tellus rhoncus, vehic",
    },
    {
      id: "m5",
      role: "user",
      body: "Hello!",
    },
    {
      id: "m6",
      role: "booster",
      body: "Hello!",
    },
  ],
};
