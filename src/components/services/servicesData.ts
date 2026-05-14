/**
 * Data for the public `/services` hub page. Each card represents one
 * boost service we sell and links into the game-specific calculator
 * page where that service can actually be configured.
 *
 * The Figma source (file `HnWxsTgaSJq8dqsOviG7Zx`, nodes 837:24410 /
 * 1494:19584) shows a 4×2 grid on desktop and a 1-col stack on mobile
 * with three badge variants (offer / new / updated). Pricing is
 * placeholder pending real backend rates.
 */

export type ServiceCardBadgeType = "offer" | "new" | "updated";

export type ServiceCardBadge = {
  type: ServiceCardBadgeType;
  label: string;
};

export type ServiceCard = {
  id: string;
  title: string;
  features: string[];
  startingPrice: string;
  badge?: ServiceCardBadge;
  /** Emblem image rendered in the bottom-right corner of the card. */
  image: string;
  imageWidth: number;
  imageHeight: number;
  href: string;
};

/** Visual config per badge variant — matches the Figma chip styles. */
export const SERVICE_BADGE_STYLES: Record<
  ServiceCardBadgeType,
  { background: string; color: string; icon: string }
> = {
  offer: {
    background: "rgba(250,70,9,0.2)",
    color: "#ff5c00",
    icon: "/images/services/icon-offer.svg",
  },
  new: {
    background: "rgba(26,173,25,0.2)",
    color: "#1aad19",
    icon: "/images/services/icon-sparkle.svg",
  },
  // Updated badge uses the violet `#6654f1` from the Figma chip — the
  // earlier blue was a placeholder swap before we pulled the source
  // tokens (Figma node 837:24556).
  updated: {
    background: "rgba(102,84,241,0.2)",
    color: "#6654f1",
    icon: "/images/services/icon-update.svg",
  },
};

/**
 * Three distinct emblem images used by the service cards in the Figma
 * (file `HnWxsTgaSJq8dqsOviG7Zx`). Mapping `service -> emblem` is
 * arbitrary but mirrors the design's visual rhythm: gold pentagon for
 * Rank Boost, bronze hex for Competitive Wins, golden eagle for the
 * featured/Updated Rank Boost card.
 */
export const SERVICE_EMBLEMS = {
  radiantGold: {
    src: "/images/services/emblem-radiant-gold.png",
    width: 112,
    height: 117,
  },
  bronzeHex: {
    src: "/images/services/emblem-bronze-hex.png",
    width: 112,
    height: 108,
  },
  eagleWings: {
    src: "/images/services/emblem-eagle-wings.png",
    width: 162,
    height: 124,
  },
} as const;

export type ServiceEmblemKey = keyof typeof SERVICE_EMBLEMS;

/**
 * Helper so each service entry can just declare which emblem key it
 * uses instead of repeating the emblem fields. Keeps the table-style
 * service list compact and easy to reorder.
 */
function emblem(key: ServiceEmblemKey) {
  const e = SERVICE_EMBLEMS[key];
  return { image: e.src, imageWidth: e.width, imageHeight: e.height };
}

export const services: ServiceCard[] = [
  {
    id: "valorant-rank-boost",
    title: "Rank Boost",
    features: ["Rank up to Radiant", "Free Agents of choice", "Available on all regions"],
    startingPrice: "$10",
    badge: { type: "offer", label: "Special Offer: -20%" },
    ...emblem("radiantGold"),
    href: "/valorant",
  },
  {
    id: "valorant-competitive-wins",
    title: "Competitive Wins",
    features: ["Increase your Win Rate", "Free Agents of choice", "Available on all regions"],
    startingPrice: "$10",
    badge: { type: "new", label: "New Feature" },
    ...emblem("bronzeHex"),
    href: "/valorant",
  },
  {
    id: "valorant-mmr-boost",
    title: "MMR Boost",
    features: ["Climb to your true MMR", "Optimised match selection", "Available on all regions"],
    startingPrice: "$10",
    badge: { type: "updated", label: "Updated" },
    ...emblem("eagleWings"),
    href: "/valorant",
  },
  {
    id: "valorant-leveling",
    title: "Leveling",
    features: ["Reach any account level", "Battle-pass progression", "Discreet play schedule"],
    startingPrice: "$10",
    badge: { type: "new", label: "New Feature" },
    ...emblem("bronzeHex"),
    href: "/valorant",
  },
  {
    id: "cod-mw-camo",
    title: "Camo Boost",
    features: ["Unlock weapon mastery camos", "Multiple weapon classes", "Step-by-step tracking"],
    startingPrice: "$10",
    badge: { type: "offer", label: "Special Offer: -20%" },
    ...emblem("radiantGold"),
    href: "/cod-modern-warfare",
  },
  {
    id: "fifa-coins",
    title: "FIFA Coins",
    features: ["Fast & safe delivery", "Multiple delivery methods", "Available on all platforms"],
    startingPrice: "$10",
    badge: { type: "offer", label: "Special Offer: -20%" },
    ...emblem("radiantGold"),
    href: "/fifa-21",
  },
  {
    id: "fifa-rank",
    title: "FUT Rank Boost",
    features: ["Climb the Weekend League", "Top-100 finishes", "Pro-level squad management"],
    startingPrice: "$10",
    badge: { type: "updated", label: "Updated" },
    ...emblem("radiantGold"),
    href: "/fifa-21",
  },
  {
    id: "valorant-currency",
    title: "Currency Pack",
    features: ["Buy in-game points", "Discounted bundles", "Instant top-up"],
    startingPrice: "$10",
    badge: { type: "new", label: "New Feature" },
    ...emblem("bronzeHex"),
    href: "/valorant",
  },
];

/**
 * Items rendered in the "Security and more" section.
 *
 * Each item maps to one of the three orange icons baked into the Figma
 * (shield / anonymous / vpn). Title + body copy come straight from the
 * source comp (nodes 1292:7494, 1292:7504, 1292:7516) — lorem-ipsum
 * descriptions are intentional and will be swapped once marketing copy
 * is finalised (msg #41).
 */
export type SecurityItem = {
  icon: string;
  title: string;
  body: string;
};

export const securityItems: SecurityItem[] = [
  {
    icon: "/images/services/security-shield.png",
    title: "Security and Account safety is of the utmost importance",
    body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    icon: "/images/services/security-anonymous.png",
    title: "Boosters remain anonymous and never speak to your friends",
    body: "Proin mattis dui lectus, ut vulputate lacus ullamcorper id. Maecenas scelerisque pellentesque magna at vehicula.",
  },
  {
    icon: "/images/services/security-vpn.png",
    title: "VPN used and only shared with the PRO",
    body: "Vivamus cursus fermentum nunc et vehicula. Maecenas sagittis condimentum ipsum sed faucibus.",
  },
];
