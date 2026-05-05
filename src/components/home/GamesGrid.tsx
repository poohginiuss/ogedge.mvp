"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type GameCard = {
  slug: string;
  name: string;
  backing: string;
  logo: string;
};

const games: GameCard[] = [
  {
    slug: "apex-legends",
    name: "Apex Legends",
    backing: "/images/home/games/apex-backing.png",
    logo: "/images/home/games/apex-logo.png",
  },
  {
    slug: "cod-cold-war",
    name: "COD: Cold War",
    backing: "/images/home/games/cod-cw-backing.png",
    logo: "/images/home/games/cod-cw-logo.png",
  },
  {
    slug: "cod-modern-warfare",
    name: "COD: Modern Warfare",
    backing: "/images/home/games/cod-mw-backing.png",
    logo: "/images/home/games/cod-mw-logo.png",
  },
  {
    slug: "destiny-2",
    name: "Destiny 2",
    backing: "/images/home/games/destiny2-backing.png",
    logo: "/images/home/games/destiny2-logo.png",
  },
  {
    slug: "dota-2",
    name: "DOTA 2",
    backing: "/images/home/games/dota2-backing.png",
    logo: "/images/home/games/dota2-logo.png",
  },
  {
    slug: "escape-from-tarkov",
    name: "Escape From Tarkov",
    backing: "/images/home/games/tarkov-backing.png",
    logo: "/images/home/games/tarkov-logo.png",
  },
  {
    slug: "everquest",
    name: "EverQuest",
    backing: "/images/home/games/everquest-backing.png",
    logo: "/images/home/games/everquest-logo.png",
  },
  {
    slug: "fifa-21",
    name: "FIFA 21",
    backing: "/images/home/games/fifa21-backing.png",
    logo: "/images/home/games/fifa21-logo.png",
  },
  {
    slug: "ff14",
    name: "Final Fantasy XIV",
    backing: "/images/home/games/ff14-backing.png",
    logo: "/images/home/games/ff14-logo.png",
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    backing: "/images/home/games/fortnite-backing.png",
    logo: "/images/home/games/fortnite-logo.png",
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    backing: "/images/home/games/genshin-backing.png",
    logo: "/images/home/games/genshin-logo.png",
  },
  {
    slug: "guild-wars-2",
    name: "Guild Wars 2",
    backing: "/images/home/games/gw2-backing.png",
    logo: "/images/home/games/gw2-logo.png",
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    backing: "/images/home/games/lol-backing.png",
    logo: "/images/home/games/lol-logo.png",
  },
  {
    slug: "teamfight-tactics",
    name: "Teamfight Tactics",
    backing: "/images/home/games/teamfight-backing.png",
    logo: "/images/home/games/teamfight-logo.png",
  },
  {
    slug: "overwatch-2",
    name: "Overwatch 2",
    backing: "/images/home/games/overwatch-backing.png",
    logo: "/images/home/games/overwatch-logo.png",
  },
  {
    slug: "ea-fc",
    name: "EA FC",
    backing: "/images/home/games/eafc-backing.png",
    logo: "/images/home/games/eafc-logo.png",
  },
  {
    slug: "valorant",
    name: "Valorant",
    backing: "/images/home/games/valorant-backing.png",
    logo: "/images/home/games/valorant-logo.png",
  },
  {
    slug: "wow-classic",
    name: "WoW Classic",
    backing: "/images/home/games/wow-classic-backing.png",
    logo: "/images/home/games/wow-classic-logo.png",
  },
  {
    slug: "world-of-warcraft",
    name: "World of Warcraft",
    backing: "/images/home/games/wow-backing.png",
    logo: "/images/home/games/wow-logo.png",
  },
];

const INITIAL_COUNT = 8;

export function GamesGrid() {
  const [showAll, setShowAll] = useState(false);
  const visibleGames = showAll ? games : games.slice(0, INITIAL_COUNT);

  return (
    <section
      id="games"
      className="relative z-10 -mt-[200px] w-full border-transparent md:-mt-[240px]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(23,25,31,0.5) 0%, rgba(23,25,31,0.8) 60%, var(--dark-main) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12 md:px-12 lg:px-0 lg:py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {visibleGames.map((game) => (
            <Link
              key={game.slug}
              href={`/${game.slug}`}
              className="group relative flex h-[140px] items-center justify-center overflow-hidden rounded-3xl border-2 border-transparent transition-all duration-200 hover:border-[#ffa182] hover:shadow-[0_4px_16px_rgba(255,92,0,0.32)] md:h-[180px]"
            >
              <Image
                src={game.backing}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 transition-all duration-200 group-hover:bg-[rgba(250,70,9,0.5)]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={game.logo}
                alt={game.name}
                className="relative z-10 h-[55%] w-[55%] object-contain"
                loading="lazy"
              />
            </Link>
          ))}
        </div>

        {!showAll && games.length > INITIAL_COUNT && (
          <div
            className="pointer-events-none absolute bottom-[88px] left-0 h-[200px] w-full"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(23,25,31,0.9) 100%)",
            }}
          />
        )}

        <div className="relative z-10 mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-3xl border-2 border-brand-light px-8 py-6 font-body text-lg font-bold uppercase tracking-[0.4px] text-white transition-all hover:shadow-[0_4px_22px_rgba(255,92,0,0.3)] md:text-xl"
            style={{
              background: "rgba(23,25,31,0.5)",
              backdropFilter: "blur(3px)",
            }}
          >
            {showAll ? "Show Less" : `Show All ${games.length} Games`}
          </button>
        </div>
      </div>
    </section>
  );
}
