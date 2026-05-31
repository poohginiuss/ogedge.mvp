"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StarRating } from "../atoms";
import { ProfileIdentity } from "../molecules";
import { boosterProfile } from "./boosterData";

const generalRules = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

const gameRules = [
  { name: "Apex Legends", count: 15 },
  { name: "Call of Duty: Black Ops Cold War", count: 12 },
  { name: "Call of Duty: Modern Warfare", count: 3 },
  { name: "Destiny 2", count: 2 },
  { name: "DOTA2", count: 10 },
  { name: "Escape From Tarkov", count: 15 },
  { name: "Everquest", count: 11 },
  { name: "FIFA 21", count: 3 },
  { name: "Final Fantasy XIV", count: 15 },
  { name: "Fortnite", count: 9 },
  { name: "General Misc", count: 15 },
  { name: "Genshin Impact", count: 1 },
  { name: "Guild Wars 2", count: 15 },
  { name: "League of Legends", count: 3 },
  { name: "League of Legends: Wild Rift", count: 15 },
  { name: "Overwatch", count: 11 },
  { name: "Teamfight Tactics", count: 15 },
  { name: "Valorant", count: 2 },
  { name: "World of Warcraft Classic", count: 15 },
  { name: "World of Warcraft Retail", count: 6 },
];

const gameDropdownOptions = gameRules.map((g) => g.name);

export default function BoosterRulesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      {/* Mobile: profile + game dropdown */}
      <div className="flex flex-col gap-6 xl:hidden">
        <ProfileIdentity
          avatarSrc={boosterProfile.avatarUrl}
          avatarSize={64}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xs leading-[18px] text-white"
          name={boosterProfile.username}
          nameClassName="font-body text-base font-bold leading-6 text-white"
          meta={
            <div className="flex items-center gap-2">
              <StarRating rating={boosterProfile.starRating} />
              <span className="font-body text-sm font-medium text-white">
                {boosterProfile.reviewCount} Reviews
              </span>
            </div>
          }
          groupWelcomeName
          onAvatarClick={() => router.push("/app/booster/profile")}
        />

        <div className="flex flex-col items-start gap-1">
          <span className="font-body text-sm text-white/80">Game Rules</span>
          <Dropdown
            label=""
            value={selectedGame ?? "Select Game"}
            options={gameDropdownOptions}
            onChange={setSelectedGame}
            className="w-full"
          />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        {/* Left: Rules list */}
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <h1 className="font-heading text-xl font-bold text-white lg:text-[32px] lg:font-semibold">
            General Rules
          </h1>

          <div className="flex flex-col gap-4">
            {generalRules.map((text, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-2xl px-6 py-4 lg:flex-row lg:items-start lg:gap-4 lg:p-4"
                  style={{ background: "rgba(56,56,82,0.5)" }}
                >
                  <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-light">
                    {num}
                  </span>
                  <p className="flex-1 font-body text-base leading-6 text-white">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Desktop sidebar */}
        <div className="hidden xl:flex xl:w-[490px] xl:shrink-0 xl:flex-col xl:gap-6">
          <div
            className="overflow-hidden rounded-3xl px-8 py-6"
            style={{ background: "rgba(56,56,82,0.3)" }}
          >
            <ProfileIdentity
              avatarSrc={boosterProfile.avatarUrl}
              avatarSize={90}
              welcomeText="Welcome,"
              welcomeClassName="font-body text-xl"
              name={boosterProfile.username}
              nameClassName="font-heading text-[32px] font-semibold leading-none"
              meta={
                <div className="flex items-center gap-2">
                  <StarRating rating={boosterProfile.starRating} />
                  <span className="font-body text-base font-medium text-white">
                    {boosterProfile.reviewCount} Reviews
                  </span>
                </div>
              }
              groupWelcomeName
              onAvatarClick={() => router.push("/app/booster/profile")}
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-body text-2xl font-medium leading-8 text-white">
              Game Rules
            </h2>
            <div className="flex flex-col">
              {gameRules.map((game) => (
                <button
                  key={game.name}
                  type="button"
                  onClick={() => setSelectedGame(game.name)}
                  className={`group flex items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#383852] ${
                    selectedGame === game.name ? "bg-[#383852]" : ""
                  }`}
                >
                  <span className="flex-1 font-body text-base font-medium leading-6 text-white transition-colors group-hover:text-[#ff975d]">
                    {game.name}
                  </span>
                  <span className="rounded-md bg-[#383852] px-1 py-0.5 font-body text-xs font-medium leading-[18px] text-white transition-colors group-hover:text-[#ff975d]">
                    {game.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
