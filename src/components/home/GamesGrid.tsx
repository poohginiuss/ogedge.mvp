"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const gridRef = useRef<HTMLDivElement>(null);
  const [collapsedH, setCollapsedH] = useState<number | null>(null);
  const [fullH, setFullH] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).rowGap) || 0;
    const cols = getComputedStyle(el).gridTemplateColumns.split(" ").length;
    const rows = Math.ceil(INITIAL_COUNT / cols);
    const firstChild = el.children[0] as HTMLElement | undefined;
    if (!firstChild) return;
    const cardH = firstChild.offsetHeight;
    setCollapsedH(rows * cardH + (rows - 1) * gap);
    setFullH(el.scrollHeight);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const targetH = showAll ? fullH : collapsedH;

  return (
    <section
      id="games"
      className="noise-overlay relative z-10 -mt-[200px] w-full md:-mt-[240px]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(23,25,31,0.5) 0%, rgba(23,25,31,0.52) 8%, rgba(23,25,31,0.55) 15%, rgba(23,25,31,0.58) 20%, rgba(23,25,31,0.62) 25%, rgba(23,25,31,0.66) 30%, rgba(23,25,31,0.7) 35%, rgba(23,25,31,0.74) 40%, rgba(23,25,31,0.78) 45%, rgba(23,25,31,0.82) 50%, rgba(23,25,31,0.86) 55%, rgba(23,25,31,0.9) 60%, rgba(23,25,31,0.93) 65%, rgba(23,25,31,0.96) 72%, rgba(23,25,31,0.98) 80%, rgba(23,25,31,1) 90%, rgb(23,25,31) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12 md:px-12 lg:px-0 lg:py-16">
        <div className="relative overflow-hidden" style={{
          height: targetH ?? "auto",
          transition: targetH != null ? "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : undefined,
        }}>
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6"
          >
            {games.map((game) => (
              <Link
                key={game.slug}
                href={`/${game.slug}`}
                className="group relative flex h-[140px] items-center justify-center overflow-hidden rounded-3xl border-2 border-[#2a2a40] transition-all duration-200 hover:border-[#ffa182] hover:shadow-[0_4px_16px_rgba(255,92,0,0.32)] md:h-[180px]"
              >
                <Image
                  src={game.backing}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 transition-all duration-200 group-hover:bg-[rgba(250,70,9,0.6)]" />
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

          {/* Fade overlay when collapsed */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-full transition-opacity duration-500"
            style={{
              opacity: showAll ? 0 : 1,
              background:
                "linear-gradient(to top, rgba(23,25,31,1) 0%, rgba(23,25,31,0.98) 10%, rgba(23,25,31,0.92) 25%, rgba(23,25,31,0.8) 40%, rgba(23,25,31,0.6) 55%, rgba(23,25,31,0.35) 70%, rgba(23,25,31,0.15) 85%, transparent 100%)",
            }}
          />
        </div>

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
