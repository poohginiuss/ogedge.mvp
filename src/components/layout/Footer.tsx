import { ArrowRightIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "OGEdge",
    links: [
      { label: "Services", href: "#services" },
      { label: "Reviews", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "#blog" },
      { label: "About Us", href: "#about" },
      { label: "Safety", href: "#safety" },
      { label: "Jobs", href: "#jobs" },
      { label: "Affiliates", href: "#affiliates" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];

const socials = [
  { id: "facebook", icon: "/images/social/facebook.svg", href: "#" },
  { id: "twitter", icon: "/images/social/twitter.svg", href: "#" },
  { id: "tiktok", icon: "/images/social/tiktok.svg", href: "#" },
  { id: "instagram", icon: "/images/social/instagram.svg", href: "#" },
];

const payments = [
  { id: "visa", icon: "/images/payments/visa.svg", w: 24 },
  { id: "mastercard", icon: "/images/payments/mastercard.svg", w: 24 },
  { id: "paypal", icon: "/images/payments/paypal.svg", w: 42 },
  { id: "gpay", icon: "/images/payments/gpay.svg", w: 24 },
  { id: "applepay", icon: "/images/payments/applepay.svg", w: 40 },
  { id: "coinbase", icon: "/images/payments/coinbase.svg", w: 24 },
  { id: "crypto", icon: "/images/payments/crypto.svg", w: 40 },
];

type GameFooterColumn = {
  name: string;
  icon: string;
  services: string[];
  hasViewAll?: boolean;
};

const gameColumns: GameFooterColumn[] = [
  {
    name: "League of Legends",
    icon: "/images/home/games/lol-logo.png",
    services: ["Division Boost", "Ranked Wins", "Coaching", "Accounts", "Champions"],
    hasViewAll: true,
  },
  {
    name: "Valorant",
    icon: "/images/home/games/valorant-logo.png",
    services: ["Rank Boost", "Competitive Wins", "Placement Matches", "Coaching", "Accounts"],
    hasViewAll: true,
  },
  {
    name: "WoW",
    icon: "/images/home/games/wow-logo.png",
    services: ["Mythic+ Boost", "Raid Boost", "Leveling", "Gold", "Mounts"],
  },
  {
    name: "Destiny 2",
    icon: "/images/home/games/destiny2-logo.png",
    services: ["Raid Completion", "Trials of Osiris", "Power Level", "Dungeons", "Exotic Quests"],
  },
  {
    name: "Apex Legends",
    icon: "/images/home/games/apex-logo.png",
    services: ["Ranked Boost", "Badge Unlock", "Arena Wins", "Coaching", "Kill Games"],
    hasViewAll: true,
  },
  {
    name: "Fortnite",
    icon: "/images/home/games/fortnite-logo.png",
    services: ["Victory Royales", "Ranked Boost", "Challenges", "Coaching", "Accounts"],
  },
  {
    name: "Overwatch",
    icon: "/images/home/games/overwatch-logo.png",
    services: ["Rank Boost", "Placements", "Coaching", "Win Boosting", "Accounts"],
  },
  {
    name: "Dota 2",
    icon: "/images/home/games/dota2-logo.png",
    services: ["MMR Boost", "Calibration", "Coaching", "Behavior Score", "Accounts"],
  },
  {
    name: "COD",
    icon: "/images/home/games/cod-mw-logo.png",
    services: ["Camo Grinding", "Prestige Level", "Multiplayer Wins", "Warzone", "Ranked"],
  },
  {
    name: "FIFA",
    icon: "/images/home/games/fifa21-logo.png",
    services: ["FUT Champions", "Division Rivals", "Coin Boosting", "Draft Wins", "Objectives"],
  },
  {
    name: "FFXIV",
    icon: "/images/home/games/ff14-logo.png",
    services: ["Savage Clears", "Ultimate Clears", "Leveling", "Mounts", "Gil"],
  },
  {
    name: "GW2",
    icon: "/images/home/games/gw2-logo.png",
    services: ["Fractal Boost", "Raid Clears", "PvP Rank", "Crafting", "Mounts"],
  },
  {
    name: "Tarkov",
    icon: "/images/home/games/tarkov-logo.png",
    services: ["Raid Carry", "Quest Completion", "Account Leveling", "Roubles", "Items"],
  },
  {
    name: "TFT",
    icon: "/images/home/games/teamfight-logo.png",
    services: ["Rank Boost", "Placements", "Coaching", "Hyper Roll", "Double Up"],
  },
  {
    name: "Genshin",
    icon: "/images/home/games/genshin-logo.png",
    services: ["Spiral Abyss", "Material Farming", "AR Boost", "Events", "Achievements"],
  },
  {
    name: "EverQuest",
    icon: "/images/home/games/everquest-logo.png",
    services: ["Power Leveling", "Epic Quests", "Platinum", "Raiding", "AA Points"],
  },
  {
    name: "WoW Classic",
    icon: "/images/home/games/wow-classic-logo.png",
    services: ["Leveling", "Gold Farming", "Dungeon Runs", "Attunements", "PvP Rank"],
  },
  {
    name: "Wild Rift",
    icon: "/images/home/games/lol-logo.png",
    services: ["Rank Boost", "Placements", "Coaching", "Win Boosting", "Accounts"],
  },
];

const legalLinks = [
  { label: "Terms", href: "#terms" },
  { label: "Refund Policy", href: "#refund" },
  { label: "Privacy", href: "#privacy" },
  { label: "Cookie Policy", href: "#cookies" },
];

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-6 pt-10 pb-6 md:px-12 lg:px-[285px]">
        {/* Top section: Logo + Social | Columns | Payments */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Logo + social icons */}
          <div className="flex flex-col items-center gap-6 lg:w-[180px]">
            <Image
              src="/images/logos/logo-red.png"
              alt="OGEdge"
              width={180}
              height={58}
              className="h-[58px] w-auto"
            />
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  aria-label={s.id}
                  className="flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-lg border-[0.5px] border-brand-main transition-colors hover:bg-brand-main/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" className="h-8 w-8 object-contain" loading="lazy" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex gap-[100px]">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="font-body text-base font-bold leading-6 text-brand-deep">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm leading-5 text-white transition-colors hover:text-brand-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-base font-bold leading-6 text-brand-deep">
              Payment Methods
            </h3>
            <div className="flex flex-wrap items-center gap-3 max-w-[200px]">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="flex h-[25px] items-center justify-center"
                  style={{ width: p.w }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.icon}
                    alt={p.id}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[#333]" />

        {/* Game service columns */}
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {gameColumns.map((game) => (
            <div key={game.name} className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-dark-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={game.icon} alt="" className="h-6 w-6 object-contain" loading="lazy" />
                </div>
                <span className="font-body text-base font-bold leading-6 text-brand-deep">
                  {game.name}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {game.services.map((service, i) => (
                  <li key={service}>
                    <Link
                      href="#"
                      className={`font-body text-sm leading-5 transition-colors hover:text-brand-light ${
                        i < 2 ? "text-white" : "text-white/60"
                      }`}
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
              {game.hasViewAll && (
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 font-body text-sm leading-5 text-white transition-colors hover:text-brand-light"
                >
                  View All
                  <ArrowRightIcon size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[#333]" />

        {/* Bottom: Trademarks + Copyright + Legal */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[900px] font-body text-xs leading-[18px] text-white/60">
            Overwatch, Hearthstone, WoW Classic, are trademarks and/or registered trademarks of
            Blizzard Entertainment Inc. Counter-Strike and Dota are trademarks and/or registered
            trademarks of the Valve Corporation. Destiny 2 is a trademark and/or registered
            trademark of Bungie. PLAYERUNKNOWN&apos;S BATTLEGROUNDS is a registered trademark,
            trademark or service mark of Bluehole, Inc. and its affiliates.
          </p>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-body text-xs leading-[18px] text-white/60">
              &copy;2026 OGEdge all rights reserved
            </span>
            <div className="flex items-center gap-8">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-xs leading-[18px] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
