import type { DetailTag, TableOrderStatus } from "../activeOrdersData";
import {
  TAG_EU,
  TAG_EUW,
  TAG_NA,
  TAG_OFFLINE,
  TAG_PRIORITY,
  TAG_RUSH,
  TAG_STREAMING,
} from "../activeOrdersData";

export type BoosterTableOrder = {
  id: string;
  orderId: string;
  game: string;
  service: string;
  rangeLabel: string;
  details: DetailTag[];
  earning: string;
  bonus?: string;
  completionTime?: string;
  employee?: string;
  employeeRating?: number;
  tableStatus: TableOrderStatus;
  chatActive?: boolean;
  canClaim?: boolean;
};

const GAMES = ["Valorant", "Dota 2", "League of Legends", "CS2", "Overwatch 2"];

const SERVICES = [
  { service: "Rank Boosting", range: "Silver II — Platinum III" },
  { service: "Rank Boosting", range: "Bronze I — Gold II" },
  { service: "Rank Boosting", range: "Gold III — Diamond I" },
  { service: "Win Boosting", range: "+10 Wins" },
  { service: "Placement Matches", range: "10 Games" },
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

const EARNINGS = ["$123.00", "$85.00", "$45.00", "$210.00", "$67.50"];
const BONUSES = ["+$20", undefined, "+$15", undefined, "+$30"];
const COMPLETION_TIMES = ["12h", "24h", "6h", "12h", "48h"];
const EMPLOYEES = ["Booster John", "loremipsum", "loremipsum", "loremipsum", "loremipsum"];

const AVAILABLE_STATUSES: TableOrderStatus[] = ["waiting-for-booster"];
const MY_STATUSES: TableOrderStatus[] = [
  "waiting-for-booster",
  "assigned-booster",
  "started",
  "paused",
  "completed",
];
const COMPLETED_STATUSES: TableOrderStatus[] = [
  "waiting-for-booster",
  "assigned-booster",
  "paused",
  "completed",
];

function makeBoosterOrder(
  i: number,
  prefix: string,
  statuses: TableOrderStatus[],
  opts?: { canClaim?: boolean; withEmployee?: boolean },
): BoosterTableOrder {
  const svc = SERVICES[i % SERVICES.length];
  return {
    id: `${prefix}${i + 1}`,
    orderId: String(4269522 + i),
    game: GAMES[i % GAMES.length],
    service: svc.service,
    rangeLabel: svc.range,
    details: DETAIL_SETS[i % DETAIL_SETS.length],
    earning: EARNINGS[i % EARNINGS.length],
    bonus: BONUSES[i % BONUSES.length],
    completionTime: COMPLETION_TIMES[i % COMPLETION_TIMES.length],
    employee: opts?.withEmployee ? EMPLOYEES[i % EMPLOYEES.length] : undefined,
    employeeRating: opts?.withEmployee ? 4.9 : undefined,
    tableStatus: statuses[i % statuses.length],
    chatActive: i % 3 === 0,
    canClaim: opts?.canClaim,
  };
}

export const boosterAvailableTableOrders: BoosterTableOrder[] = Array.from({ length: 30 }, (_, i) =>
  makeBoosterOrder(i, "ba", AVAILABLE_STATUSES, { canClaim: true }),
);

export const boosterMyTableOrders: BoosterTableOrder[] = Array.from({ length: 30 }, (_, i) =>
  makeBoosterOrder(i + 5, "bm", MY_STATUSES, { withEmployee: true }),
);

export const boosterCompletedTableOrders: BoosterTableOrder[] = Array.from({ length: 30 }, (_, i) =>
  makeBoosterOrder(i + 15, "bc", COMPLETED_STATUSES),
);
