import { StatusPill } from "./StatusPill";
import type { GameServiceHero } from "./orderViewData";

type GameServiceHeroCardProps = {
  hero: GameServiceHero;
  statusSubLabel?: string;
  className?: string;
};

export function GameServiceHeroCard({ hero, statusSubLabel, className }: GameServiceHeroCardProps) {
  const subLabel =
    statusSubLabel ?? (hero.status === "paused" ? "Booster will return in" : undefined);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className ?? ""}`}
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      {hero.artworkSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-[-20px] lg:left-[41px] lg:top-[-36px]"
          style={{ width: "413px", height: "478px" }}
        >
          {/* Dark red glow orbs behind character */}
          <div
            className="absolute left-1/2 top-1/3 h-[200px] w-[200px] -translate-x-1/2 rounded-full"
            style={{ background: "rgba(160, 30, 30, 0.35)", filter: "blur(80px)" }}
          />
          <div
            className="absolute left-[30%] top-[55%] h-[150px] w-[150px] rounded-full"
            style={{ background: "rgba(120, 20, 20, 0.3)", filter: "blur(60px)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.artworkSrc}
            alt=""
            className="relative h-full w-full object-cover"
            style={{ opacity: 0.3, transform: "rotate(180deg) scaleY(-1)" }}
          />
        </div>
      )}

      <div className="relative flex flex-col gap-4 px-6 py-5 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:px-7 min-[1024px]:py-7 min-[1280px]:flex-col min-[1280px]:items-stretch min-[1280px]:px-6 min-[1280px]:py-5 min-[1620px]:flex-row min-[1620px]:items-center min-[1620px]:justify-between min-[1620px]:px-7 min-[1620px]:py-7">
        <div className="flex min-w-0 flex-col leading-tight min-[1024px]:w-[250px] min-[1024px]:shrink-0 min-[1280px]:w-full min-[1620px]:w-[250px]">
          <div className="font-heading text-[28px] font-semibold leading-none text-white">
            <p>{hero.gameTitle}</p>
            <p>{hero.serviceTitle}</p>
          </div>
          <p className="mt-1 font-body text-lg text-white">{hero.rangeLabel}</p>
        </div>

        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.fromRank.src}
              alt={hero.fromRank.label}
              className="h-[85px] w-[79px] object-contain drop-shadow-[0_4px_24px_rgba(164,168,167,0.4)]"
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/orderview/icons/arrow-right-fill.svg"
            alt=""
            className="h-5 w-5 shrink-0 -rotate-90 -scale-y-100"
          />
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.toRank.src}
              alt={hero.toRank.label}
              className="h-[85px] w-[85px] object-contain drop-shadow-[0_4px_24px_rgba(196,135,245,0.4)]"
            />
          </div>
        </div>

        <div className="w-full min-[1024px]:w-[315px] min-[1024px]:shrink-0 min-[1280px]:w-full min-[1620px]:w-[315px]">
          <StatusPill
            status={hero.status}
            countdown={hero.countdown}
            subLabel={subLabel}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
