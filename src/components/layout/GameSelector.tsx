"use client";

import { CloseIcon } from "@/components/icons";
import {
  ServiceCardDesktop,
  ServiceCardMobile,
  getServicesForGame,
} from "@/components/ui/ServiceCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
    slug: "lol-wild-rift",
    name: "LoL: Wild Rift",
    backing: "/images/home/games/lol-backing.png",
    logo: "/images/home/games/lol-logo.png",
  },
  {
    slug: "overwatch-2",
    name: "Overwatch",
    backing: "/images/home/games/overwatch-backing.png",
    logo: "/images/home/games/overwatch-logo.png",
  },
  {
    slug: "teamfight-tactics",
    name: "Teamfight Tactics",
    backing: "/images/home/games/teamfight-backing.png",
    logo: "/images/home/games/teamfight-logo.png",
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

type GameSelectorProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function GameSelector({ isOpen, onClose }: GameSelectorProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleGameClick = (slug: string) => {
    setSelectedGame(slug === selectedGame ? null : slug);
    setHoveredService(null);
  };

  const services = selectedGame ? getServicesForGame(selectedGame) : [];

  return createPortal(
    <div className="fixed inset-0 z-[60] flex">
      {/* Desktop layout */}
      <div className="hidden h-full w-full lg:flex">
        {/* Left panel: game grid */}
        <div
          className="flex h-full w-[620px] shrink-0 flex-col overflow-y-auto border-r border-dark-border xl:w-[700px]"
          style={{
            background: "linear-gradient(180deg, rgba(17,17,17,0.98) 0%, rgba(23,25,31,0.98) 100%)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center gap-4 px-10 py-5">
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center text-white transition-colors hover:text-brand-light"
              aria-label="Close games menu"
            >
              <CloseIcon size={24} />
            </button>
            <span className="font-body text-lg font-bold uppercase tracking-wider text-white">
              Games
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 px-10 pb-8">
            {games.map((game) => (
              <button
                type="button"
                key={game.slug}
                onClick={() => handleGameClick(game.slug)}
                onMouseEnter={() => setSelectedGame(game.slug)}
                className={`group relative flex h-[100px] items-center justify-center overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                  selectedGame === game.slug
                    ? "border-[#ffa182] shadow-[0_4px_16px_rgba(255,92,0,0.32)]"
                    : "border-transparent hover:border-[#ffa182]/50"
                }`}
              >
                <Image src={game.backing} alt="" fill sizes="200px" className="object-cover" />
                <div
                  className={`absolute inset-0 transition-all duration-200 ${
                    selectedGame === game.slug
                      ? "bg-[rgba(250,70,9,0.5)]"
                      : "bg-black/60 group-hover:bg-[rgba(250,70,9,0.3)]"
                  }`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={game.logo}
                  alt={game.name}
                  className="relative z-10 h-[45%] w-[55%] object-contain"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right panel: service cards or dimmed overlay */}
        {selectedGame ? (
          <div
            className="flex flex-1 flex-col overflow-y-auto"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.95) 0%, rgba(23,25,31,0.95) 100%)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="w-full px-8 py-10">
              <div className="grid grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCardDesktop
                    key={service.id}
                    service={service}
                    isHovered={hoveredService === service.id}
                    onHover={() => setHoveredService(service.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="flex-1 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close games menu"
          />
        )}
      </div>

      {/* Mobile layout: fullscreen overlay */}
      <div
        className="flex h-full w-full flex-col overflow-y-auto lg:hidden"
        style={{
          background: "linear-gradient(180deg, rgba(17,17,17,0.98) 0%, rgba(23,25,31,0.98) 100%)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-4 px-4 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-brand-light"
            aria-label="Close games menu"
          >
            <CloseIcon size={24} />
          </button>
          <span className="font-body text-xl font-bold uppercase tracking-wider text-white">
            Games
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 px-4 pb-6">
          {games.map((game) => (
            <button
              type="button"
              key={game.slug}
              onClick={() => handleGameClick(game.slug)}
              className={`group relative flex aspect-[7/4] items-center justify-center overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                selectedGame === game.slug
                  ? "border-[#ffa182] shadow-[0_4px_12px_rgba(255,92,0,0.3)]"
                  : "border-transparent"
              }`}
            >
              <Image src={game.backing} alt="" fill sizes="25vw" className="object-cover" />
              <div
                className={`absolute inset-0 transition-all duration-200 ${
                  selectedGame === game.slug ? "bg-[rgba(250,70,9,0.5)]" : "bg-black/60"
                }`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={game.logo}
                alt={game.name}
                className="relative z-10 h-[50%] w-[60%] object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {selectedGame && (
          <div className="flex flex-col gap-3 px-4 pb-6">
            {services.map((service) => (
              <ServiceCardMobile key={service.id} service={service} gameSlug={selectedGame} />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
