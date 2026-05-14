/**
 * Sample data + types for the customer "View Order" page. Kept in its
 * own module so the page route can stay thin and the components below
 * can pull strongly-typed props.
 *
 * The shapes here intentionally model what a real API would return so
 * the wiring barely changes once the backend is in place.
 */

export type GameSlug =
  | "valorant"
  | "league-of-legends"
  | "dota2"
  | "cs2"
  | "overwatch"
  | "apex-legends"
  | "rocket-league"
  | "wild-rift"
  | "teamfight-tactics";

export type RankBadge = {
  /** Path to the rank badge artwork (e.g. Valorant Silver II diamond). */
  src: string;
  /** Accessibility label (read by AT, also used as image alt). */
  label: string;
};

/**
 * Status pill variants that appear on the right of the hero card. Each
 * variant has its own colour + icon vocabulary in the Figma — see
 * `STATUS_PILL_THEME` in `StatusPill.tsx`.
 */
export type OrderHeroStatus =
  | "not-started"
  | "waiting-for-booster"
  | "in-progress"
  | "paused"
  | "review-order"
  | "confirm-delivery"
  | "complete"
  | "cancelled";

export type GameServiceHero = {
  game: GameSlug;
  /** First line ("Valorant"). */
  gameTitle: string;
  /** Second line ("Rank Boosting"). */
  serviceTitle: string;
  /** Subtitle ("Silver II — Platinum III"). */
  rangeLabel: string;
  /** Background artwork shown faded at ~30% opacity behind the title. */
  artworkSrc?: string;
  /** Current rank (left badge) and target rank (right badge). */
  fromRank: RankBadge;
  toRank: RankBadge;
  status: OrderHeroStatus;
  /** Optional booster-back timer shown under "PAUSED" / similar states. */
  countdown?: string;
};

export type OrderDetailRow = {
  label: string;
  value: string;
  /** Render a copy-to-clipboard affordance next to the value. */
  copyable?: boolean;
};

export type AccountDetailRow = {
  label: string;
  value: string;
  copyable?: boolean;
  /** Show an edit (basil:edit-outline) icon instead of the copy icon. */
  editable?: boolean;
  /** Hide the actual value behind a `••••••••` mask (used for passwords). */
  masked?: boolean;
};

/** Coloured chip tokens that appear in the Account Details "Details" row. */
export type AccountDetailChip = {
  label: string;
  bg: string;
  color: string;
};

export type ChatRole = "admin" | "user" | "booster";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  /** Bubble title (only used for admin "preloaded" messages). */
  title?: string;
  body: string;
  /** Avatar path. Admin messages reuse a brand mark. */
  avatar?: string;
};

export type OrderViewModel = {
  orderId: string;
  /** Used to drive the "Has a booster contacted you…" warning banner. */
  showBoosterPoachingWarning: boolean;
  boosterName: string;
  boosterAvatar: string;
  boosterOnline: boolean;
  boosterRating: number;
  boosterReviewCount: number;
  /** Order id + start date card surfaced at the top of the chat. */
  chatContextLabel: string;
  chatContextDate: string;
  chatContextArtwork: string;
  hero: GameServiceHero;
  orderDetails: OrderDetailRow[];
  accountDetails: AccountDetailRow[];
  accountDetailChips: AccountDetailChip[];
  description: { title: string; body: string };
  /** Pre-loaded admin messages + sample conversation history. */
  messages: ChatMessage[];
};

/**
 * Single sample order used until the real API lands. Mirrors the Figma
 * design 1:1 (Valorant Rank Boosting, Silver II → Platinum III, paused
 * because the booster will be back in 03:21:12).
 */
export const sampleOrderView: OrderViewModel = {
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
    status: "paused",
    countdown: "03:21:12",
  },
  orderDetails: [
    { label: "ID", value: "123456", copyable: true },
    { label: "Game", value: "Valorant" },
    { label: "Service", value: "Rank Boosting: Silver II - Platinum III" },
    { label: "Estimated Completion Time", value: "36 hours" },
    { label: "Your Country", value: "EUW" },
  ],
  accountDetails: [
    { label: "In-Game Name", value: "CouchPotato1234" },
    { label: "Server", value: "EUW" },
    { label: "Login Name", value: "CouchPotato", copyable: true },
    { label: "Login Password", value: "supersecret", editable: true, masked: true },
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
    // NOTE: the "Your order is confirmed…" line lives on the chat header
    // context card (not in `messages`) so it never duplicates when the
    // booster sends a real message.
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
