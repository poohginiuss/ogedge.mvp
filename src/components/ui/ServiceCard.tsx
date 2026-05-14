import Link from "next/link";

type ServiceCardData = {
  id: string;
  title: string;
  badge: string;
  badgeIcon: string;
  badgeColor: string;
  badgeBg: string;
  features: string[];
  emblem: string;
};

type GameServiceMap = Record<string, ServiceCardData[]>;

const gameServices: GameServiceMap = {
  valorant: [
    {
      id: "val-rank-boost",
      title: "Rank Boost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Rank up to Radiant", "Free Agents of choice", "Available on all regions"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "val-competitive-wins",
      title: "Competitive\nWins",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Increase your Win Rate", "Free Agents of choice", "Available on all regions"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "val-placement",
      title: "Placement\nMatches",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Complete 5 placement games", "Free Agents of choice", "Available on all regions"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "league-of-legends": [
    {
      id: "lol-rank-boost",
      title: "Rank Boost",
      badge: "Special Offer: -15%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Rank up to Challenger", "Free Champion selection", "All servers supported"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "lol-normal-wins",
      title: "Normal\nWins",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Boost your normal MMR", "Play any role", "NA / EU / KR servers"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "lol-coaching",
      title: "Coaching",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["1-on-1 with Master+ coach", "VOD review included", "Flexible scheduling"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "apex-legends": [
    {
      id: "apex-rank-boost",
      title: "Ranked\nBoost",
      badge: "Special Offer: -25%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Rank up to Predator", "Legend of your choice", "PC & Console"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "apex-badge-unlock",
      title: "Badge\nUnlock",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["4K Damage / 20 Kill badges", "Stream available", "All platforms"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "apex-arena-wins",
      title: "Arena Wins",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Win streak guarantee", "Legend of your choice", "Fast completion"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "cod-cold-war": [
    {
      id: "cod-cw-camo",
      title: "Camo\nGrinding",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Dark Aether / Dark Matter", "All weapon categories", "Zombies & Multiplayer"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "cod-cw-prestige",
      title: "Prestige\nLevel",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Level up to Prestige Master", "Weapon XP included", "PC & Console"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "cod-cw-wins",
      title: "Multiplayer\nWins",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Guaranteed win ratio", "Any game mode", "Cross-platform"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "cod-modern-warfare": [
    {
      id: "cod-mw-rank",
      title: "Rank Boost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Max Prestige unlock", "Weapon XP included", "All platforms"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "cod-mw-camo",
      title: "Camo\nUnlock",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Orion / Polyatomic camos", "All weapon classes", "Fast turnaround"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "cod-mw-nukes",
      title: "Nuke\nService",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Guaranteed 25 killstreak", "Recorded gameplay", "Any game mode"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "destiny-2": [
    {
      id: "d2-raid",
      title: "Raid\nCompletion",
      badge: "Special Offer: -15%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Any raid, any difficulty", "Loot guarantee", "Sherpa available"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "d2-trials",
      title: "Trials of\nOsiris",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Flawless guaranteed", "Lighthouse access", "All platforms"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "d2-power-level",
      title: "Power Level\nBoost",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Reach max power level", "All weekly milestones", "Fast completion"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "dota-2": [
    {
      id: "dota-mmr-boost",
      title: "MMR Boost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Boost up to Immortal", "Hero of your choice", "All regions"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "dota-calibration",
      title: "Calibration\nMatches",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["10 calibration games", "High win rate", "EU / NA / SEA"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "dota-coaching",
      title: "Coaching",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Immortal-rank coaches", "Replay analysis", "Flexible hours"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "world-of-warcraft": [
    {
      id: "wow-mythic",
      title: "Mythic+\nBoost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Any keystone level", "Loot traders available", "All US / EU realms"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "wow-raid",
      title: "Raid\nBoost",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Normal / Heroic / Mythic", "Full loot run", "Selfplay option"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "wow-leveling",
      title: "Leveling",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["1–80 power leveling", "Any class / race", "24h turnaround"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "wow-classic": [
    {
      id: "wowc-leveling",
      title: "Leveling",
      badge: "Special Offer: -15%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["1–60 power leveling", "Any class / faction", "US & EU realms"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "wowc-gold",
      title: "Gold\nFarming",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Safe gold delivery", "Any amount", "All classic servers"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "wowc-dungeons",
      title: "Dungeon\nRuns",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Full clear guaranteed", "All dungeon loot", "Tank + Healer carry"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  fortnite: [
    {
      id: "fn-wins",
      title: "Victory\nRoyales",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Solo / Duo / Squad wins", "High K/D ratio", "All platforms"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "fn-ranked",
      title: "Ranked\nBoost",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Reach Unreal rank", "Consistent win ratio", "Cross-platform"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "fn-challenges",
      title: "Challenge\nCompletion",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["All weekly / seasonal quests", "Battle Pass XP", "Fast completion"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "overwatch-2": [
    {
      id: "ow-rank-boost",
      title: "Rank Boost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Rank up to Champion", "Role of your choice", "All regions"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "ow-placement",
      title: "Placement\nMatches",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["All 10 placements", "Role queue or open", "PC & Console"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "ow-coaching",
      title: "Coaching",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Top 500 coaches", "VOD review included", "Any role / hero"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "genshin-impact": [
    {
      id: "gi-spiral",
      title: "Spiral Abyss\nClear",
      badge: "Special Offer: -15%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Floor 9–12 full stars", "Account safety", "Fast turnaround"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "gi-farming",
      title: "Material\nFarming",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Artifact / Boss materials", "Resin optimization", "All servers"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "gi-ar-boost",
      title: "Adventure\nRank Boost",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Level to AR 60", "Quest completion", "Daily commissions"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "escape-from-tarkov": [
    {
      id: "eft-raid",
      title: "Raid\nCarry",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Labs / Reserve / Streets", "Loot guarantee", "Experienced sherpas"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "eft-quests",
      title: "Quest\nCompletion",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["All trader quests", "Kappa container unlock", "Safe boosting"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "eft-leveling",
      title: "Account\nLeveling",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Reach any PMC level", "Skill leveling included", "All editions"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "fifa-21": [
    {
      id: "fifa-fut",
      title: "FUT\nChampions",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Elite rank guaranteed", "Max reward points", "All platforms"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "fifa-rivals",
      title: "Division\nRivals",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Reach Division 1", "Maximum rival points", "PC & Console"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "fifa-coins",
      title: "Coin\nBoosting",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Safe coin methods", "Any amount", "Fast delivery"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  ff14: [
    {
      id: "ff14-savage",
      title: "Savage\nClears",
      badge: "Special Offer: -15%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Current tier raids", "Loot guaranteed", "All data centers"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "ff14-ultimate",
      title: "Ultimate\nClears",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["All ultimate fights", "Weapon guaranteed", "Expert static team"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "ff14-leveling",
      title: "Leveling",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["1–100 any job", "MSQ completion", "Fast turnaround"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "guild-wars-2": [
    {
      id: "gw2-fractal",
      title: "Fractal\nBoost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["T4 daily fractals", "Challenge modes", "Full loot run"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "gw2-raid",
      title: "Raid\nClears",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["All raid wings", "Legendary insights", "Experienced group"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "gw2-pvp",
      title: "PvP Rank\nBoost",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Reach Legendary rank", "Seasonal rewards", "NA & EU"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  "teamfight-tactics": [
    {
      id: "tft-rank-boost",
      title: "Rank Boost",
      badge: "Special Offer: -20%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Rank up to Challenger", "Current set meta", "All regions"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "tft-placement",
      title: "Placement\nMatches",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["All 5 placement games", "High placement finish", "Any server"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "tft-coaching",
      title: "Coaching",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Challenger-rank coaches", "Comp & econ mastery", "Flexible sessions"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
  everquest: [
    {
      id: "eq-leveling",
      title: "Power\nLeveling",
      badge: "Special Offer: -15%",
      badgeIcon: "/images/services/icon-offer.svg",
      badgeColor: "text-brand-main",
      badgeBg: "bg-[rgba(250,70,9,0.2)]",
      features: ["Any level range", "AA points included", "All servers"],
      emblem: "/images/services/rank-emblem.png",
    },
    {
      id: "eq-epic",
      title: "Epic\nQuests",
      badge: "New Feature",
      badgeIcon: "/images/services/icon-sparkle.svg",
      badgeColor: "text-[#1aad19]",
      badgeBg: "bg-[rgba(26,173,25,0.2)]",
      features: ["Epic 1.0 / 1.5 / 2.0", "All classes", "TLP & Live servers"],
      emblem: "/images/services/fut-emblem.png",
    },
    {
      id: "eq-plat",
      title: "Platinum\nFarming",
      badge: "Updated",
      badgeIcon: "/images/services/icon-update.svg",
      badgeColor: "text-[#6654f1]",
      badgeBg: "bg-[rgba(102,84,241,0.2)]",
      features: ["Safe plat delivery", "Any amount", "All servers"],
      emblem: "/images/services/star-emblem.png",
    },
  ],
};

function getServicesForGame(slug: string): ServiceCardData[] {
  return gameServices[slug] ?? gameServices.valorant;
}

export { gameServices, getServicesForGame };
export type { ServiceCardData };

function Badge({
  icon,
  label,
  color,
  bg,
}: { icon: string; label: string; color: string; bg: string }) {
  return (
    <div className={`inline-flex items-center gap-1 self-start rounded-lg px-2 py-1.5 ${bg}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="h-4 w-4" />
      <span className={`font-body text-xs font-medium ${color}`}>{label}</span>
    </div>
  );
}

export function ServiceCardDesktop({
  service,
  isHovered,
  onHover,
}: { service: ServiceCardData; isHovered: boolean; onHover: () => void }) {
  return (
    <div
      onMouseEnter={onHover}
      className={`relative flex h-[307px] flex-col gap-2 overflow-hidden rounded-3xl p-6 transition-all duration-200 ${
        isHovered
          ? "border border-brand-light shadow-[0_0_24px_rgba(255,92,0,0.4)]"
          : "border border-transparent"
      }`}
      style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
    >
      {/* Emblem with warm glow - positioned behind text */}
      <div className="pointer-events-none absolute -bottom-4 -right-4">
        <div
          className="absolute inset-0 -translate-x-2 translate-y-2 scale-[2.2] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,140,50,0.6) 0%, rgba(255,80,20,0.4) 35%, rgba(255,60,0,0.15) 60%, transparent 80%)",
            filter: "blur(20px)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.emblem}
          alt=""
          className="relative h-[150px] w-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Text content - above the emblem */}
      <div className="relative z-10 flex flex-col gap-2">
        <Badge
          icon={service.badgeIcon}
          label={service.badge}
          color={service.badgeColor}
          bg={service.badgeBg}
        />

        <h4 className="font-heading text-2xl font-semibold leading-tight text-white whitespace-pre-line">
          {service.title}
        </h4>

        <ul className="mt-1 flex flex-col gap-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 font-body text-sm text-white">
              <span className="text-white/60">›</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Hover arrow button */}
      {isHovered && (
        <div
          className="absolute bottom-5 left-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-light/60"
          style={{ background: "rgba(0,0,0,0.05)", backdropFilter: "blur(3px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/services/icon-arrow.svg" alt="" className="h-4 w-auto" />
        </div>
      )}
    </div>
  );
}

export function ServiceCardMobile({
  service,
  gameSlug,
}: { service: ServiceCardData; gameSlug: string }) {
  return (
    <Link
      href={`/${gameSlug}`}
      className="relative flex items-start justify-between overflow-hidden rounded-2xl border border-dark-border p-5 transition-colors active:border-brand-light"
      style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
    >
      <div className="relative z-10 flex flex-1 flex-col gap-2">
        <h4 className="font-heading text-lg font-bold leading-tight text-white whitespace-pre-line">
          {service.title}
        </h4>
        <ul className="flex flex-col gap-1">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 font-body text-sm text-white/80">
              <span className="text-brand-light">›</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge
          icon={service.badgeIcon}
          label={service.badge}
          color={service.badgeColor}
          bg={service.badgeBg}
        />
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 scale-[2] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,140,50,0.55) 0%, rgba(255,80,20,0.35) 35%, rgba(255,60,0,0.12) 60%, transparent 80%)",
              filter: "blur(14px)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.emblem}
            alt=""
            className="relative h-[80px] w-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
}
