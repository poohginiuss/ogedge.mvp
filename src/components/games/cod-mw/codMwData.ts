import type { CategoryOption } from "@/components/calculator/shared/CategoryTabs";
import type { ExtraOption } from "@/components/calculator/shared/OrderSummary";

export type CodWeapon = {
  id: string;
  name: string;
  price: number;
};

export type WeaponTypeOption = {
  id: string;
  label: string;
};

export type CamoTierOption = {
  id: string;
  label: string;
};

export type SingularityItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type SeasonalBundle = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const gameModes = ["Multiplayer", "Zombies", "Endgame", "Warzone"] as const;

export const camoTierOptions: CamoTierOption[] = [
  { id: "shattered-gold", label: "Shattered Gold" },
  { id: "arclight", label: "Arclight" },
  { id: "tempest", label: "Tempest" },
  { id: "singularity", label: "Singularity" },
  { id: "seasonal-bundles", label: "Seasonal Bundles" },
];

export const weaponTypes: WeaponTypeOption[] = [
  { id: "all-guns", label: "All Guns" },
  { id: "assault-rifles", label: "Assault Rifles" },
  { id: "smgs", label: "SMGs" },
  { id: "shotguns", label: "Shotguns" },
  { id: "lmgs", label: "LMGs" },
  { id: "marksman-rifles", label: "Marksman Rifles" },
  { id: "sniper-rifles", label: "Sniper Rifles" },
  { id: "handguns-melee", label: "Handguns/Melee" },
];

export const weaponsByType: Record<string, CodWeapon[]> = {
  "all-guns": [
    { id: "full-multi-unlock", name: "Full Multiplayer Unlock", price: 899 },
    { id: "core-meta-pack", name: "Core Meta Pack", price: 649 },
    { id: "starter-wide-pack", name: "Starter Wide Pack", price: 449 },
  ],
  "assault-rifles": [
    { id: "m15-mod-0", name: "M15 Mod 0", price: 25 },
    { id: "ak-27", name: "AK-27", price: 12 },
    { id: "mxr-17", name: "MXR-17", price: 25 },
    { id: "x9-maverick", name: "X9 Maverick", price: 25 },
    { id: "ds20-mirage", name: "DS20 Mirage", price: 25 },
    { id: "peacekeeper-mk1", name: "Peacekeeper Mk1", price: 25 },
  ],
  smgs: [
    { id: "vex-9", name: "VEX-9", price: 22 },
    { id: "striker-lite", name: "Striker Lite", price: 18 },
    { id: "shadow-r45", name: "Shadow R45", price: 20 },
    { id: "cyclone-pdw", name: "Cyclone PDW", price: 24 },
  ],
  shotguns: [
    { id: "breacher-12", name: "Breacher 12", price: 28 },
    { id: "riot-hammer", name: "Riot Hammer", price: 26 },
    { id: "slugmaster", name: "Slugmaster", price: 30 },
  ],
  lmgs: [
    { id: "sentinel-mk3", name: "Sentinel Mk3", price: 35 },
    { id: "hydra-240", name: "Hydra 240", price: 32 },
    { id: "anchor-lmg", name: "Anchor LMG", price: 38 },
    { id: "bulwark", name: "Bulwark", price: 33 },
  ],
  "marksman-rifles": [
    { id: "recon-308", name: "Recon 308", price: 29 },
    { id: "harrier-dmr", name: "Harrier DMR", price: 27 },
    { id: "oracle-m14", name: "Oracle M14", price: 31 },
    { id: "trailblazer", name: "Trailblazer", price: 28 },
    { id: "glass-lane", name: "Glass Lane", price: 30 },
  ],
  "sniper-rifles": [
    { id: "longstrike-x", name: "Longstrike X", price: 42 },
    { id: "phantom-l96", name: "Phantom L96", price: 40 },
    { id: "apex-50", name: "APEX .50", price: 45 },
  ],
  "handguns-melee": [
    { id: "sidearm-vp9", name: "VP9 Tactical", price: 15 },
    { id: "revolver-rx", name: "RX Revolver", price: 14 },
    { id: "combat-knife-elite", name: "Combat Knife Elite", price: 18 },
    { id: "tactical-hatchet", name: "Tactical Hatchet", price: 16 },
    { id: "ceramic-pistol", name: "Ceramic Pistol", price: 12 },
  ],
};

export const singularityItems: SingularityItem[] = [
  {
    id: "dark-matter",
    name: "Dark Matter",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante ex, aliquam vitae diam at, maximus ultrices lorem.",
    price: 499.99,
  },
];

export const seasonalBundles: SeasonalBundle[] = [
  {
    id: "gold",
    name: "Gold Bundle",
    price: 449.0,
    image: "/images/camo-boost/weapon.png",
  },
  {
    id: "diamond",
    name: "Diamond Bundle",
    price: 499.0,
    image: "/images/camo-boost/weapon.png",
  },
];

export const codCategories: CategoryOption[] = [
  { id: "camo", icon: "/images/icons/services/safety-outlined.svg", label: "Camo Boost" },
];

export const platformOptions = [
  { id: "PC", label: "PC", icon: "/images/icons/services/windows.svg" },
  { id: "Xbox", label: "Xbox", icon: "/images/icons/services/xbox.svg" },
  { id: "PlayStation", label: "PlayStation", icon: "/images/icons/services/playstation.svg" },
  { id: "Switch", label: "Nintendo Switch", icon: "/images/icons/services/nintendo.svg" },
];

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

export const requirementTexts: Record<string, string> = {
  "shattered-gold":
    "If you purchase individual guns, they must already be unlocked. If you purchase the All Guns bundle, we will unlock all required weapons for you as well.",
  arclight:
    "If you purchase individual guns, they must already be unlocked. If you purchase the All Guns bundle, we will unlock all required weapons for you as well.",
  tempest:
    "If you purchase individual guns, they must already be unlocked. If you purchase the All Guns bundle, we will unlock all required weapons for you as well.",
  singularity:
    "If you purchase individual guns, they must already be unlocked. If you purchase the All Guns bundle, we will unlock all required weapons for you as well.",
  "seasonal-bundles": "You must already have Singularity on your base guns.",
};

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function getCamoTierLabel(id: string): string {
  return camoTierOptions.find((t) => t.id === id)?.label ?? id;
}
