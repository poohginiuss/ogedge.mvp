export type TableOrderStatus =
  | "waiting-for-booster"
  | "assigned-booster"
  | "started"
  | "paused"
  | "completed";

export type DetailTag = {
  label: string;
  color: string;
  bg: string;
};

export type TableOrder = {
  id: string;
  /** Numeric order ID shown in the table (e.g. "4269522"). */
  orderId: string;
  game: string;
  service: string;
  rangeLabel: string;
  details: DetailTag[];
  employeeName: string;
  employeeRating: number;
  tableStatus: TableOrderStatus;
  /** True → chat-refresh icon (unread activity), false → plain bubble. */
  chatActive?: boolean;
};

// ─── Tag definitions ──────────────────────────────────────────────────────────

export const TAG_EUW: DetailTag = { label: "EUW", color: "#ffb000", bg: "rgba(255,176,0,0.2)" };
export const TAG_STREAMING: DetailTag = {
  label: "Streaming",
  color: "#ff543e",
  bg: "rgba(194,39,45,0.2)",
};
export const TAG_OFFLINE: DetailTag = {
  label: "Offline Mode",
  color: "#2dc227",
  bg: "rgba(45,194,39,0.2)",
};
export const TAG_PRIORITY: DetailTag = {
  label: "Priority",
  color: "#ff5c00",
  bg: "rgba(255,92,0,0.2)",
};
export const TAG_RUSH: DetailTag = {
  label: "Rush Completion",
  color: "#4285f4",
  bg: "rgba(38,86,151,0.2)",
};
export const TAG_NA: DetailTag = { label: "NA", color: "#ffb000", bg: "rgba(255,176,0,0.2)" };
export const TAG_EU: DetailTag = { label: "EU", color: "#ffb000", bg: "rgba(255,176,0,0.2)" };

// ─── Data generation helpers ──────────────────────────────────────────────────

const STATUSES: TableOrderStatus[] = [
  "waiting-for-booster",
  "assigned-booster",
  "started",
  "paused",
  "completed",
];

const GAMES = ["Valorant", "Dota 2", "League of Legends", "CS2", "Overwatch 2"];

const SERVICES = [
  { service: "Rank Boosting", range: "Silver II — Platinum III" },
  { service: "Rank Boosting", range: "Bronze I — Gold II" },
  { service: "Rank Boosting", range: "Gold III — Diamond I" },
  { service: "Win Boosting", range: "+10 Wins" },
  { service: "Placement Matches", range: "10 Games" },
];

const EMPLOYEES = [
  { name: "Booster John", rating: 4.9 },
  { name: "loremipsum", rating: 4.7 },
  { name: "ProBooster", rating: 5.0 },
  { name: "EliteCarry", rating: 4.8 },
  { name: "NightBooster", rating: 4.6 },
];

const DETAIL_SETS: DetailTag[][] = [
  [TAG_EUW, TAG_STREAMING, TAG_OFFLINE],
  [TAG_EUW, TAG_STREAMING, TAG_OFFLINE, TAG_PRIORITY, TAG_RUSH],
  [TAG_EUW, TAG_STREAMING, TAG_OFFLINE, TAG_PRIORITY],
  [TAG_NA, TAG_OFFLINE, TAG_PRIORITY],
  [TAG_EU, TAG_STREAMING, TAG_PRIORITY, TAG_RUSH],
  [TAG_EUW, TAG_OFFLINE],
  [TAG_NA, TAG_STREAMING, TAG_RUSH],
];

function makeOrder(i: number, prefix: string): TableOrder {
  const svc = SERVICES[i % SERVICES.length];
  const emp = EMPLOYEES[i % EMPLOYEES.length];
  return {
    id: `${prefix}${i + 1}`,
    orderId: String(4269522 + i),
    game: GAMES[i % GAMES.length],
    service: svc.service,
    rangeLabel: svc.range,
    details: DETAIL_SETS[i % DETAIL_SETS.length],
    employeeName: emp.name,
    employeeRating: emp.rating,
    tableStatus: STATUSES[i % STATUSES.length],
    chatActive: i % 3 === 0,
  };
}

// 60 orders → 12 pages at PAGE_SIZE=5, matching Figma pagination
export const sampleTableOrders: TableOrder[] = Array.from({ length: 60 }, (_, i) =>
  makeOrder(i, "t"),
);

// Completed orders use same generator but start from a different offset
// so statuses/games rotate differently
export const sampleCompletedTableOrders: TableOrder[] = Array.from({ length: 60 }, (_, i) =>
  makeOrder(i + 10, "c"),
);
