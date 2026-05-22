"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type WeeklyEventBannerProps = {
  title: string;
  description: string;
  characterImage: string;
  /** Optional fixed end date; defaults to end of current week */
  endDate?: Date;
};

function calcRemaining(end: Date) {
  const now = new Date();
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}

function defaultEndOfWeek() {
  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
  endOfWeek.setHours(23, 59, 59, 0);
  return endOfWeek;
}

export function WeeklyEventBanner({
  title,
  description,
  characterImage,
  endDate,
}: WeeklyEventBannerProps) {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const end = endDate ?? defaultEndOfWeek();
    const tick = () => setCountdown(calcRemaining(end));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const days = Math.floor(countdown / 86400);
  const hrs = Math.floor((countdown % 86400) / 3600);
  const mins = Math.floor((countdown % 3600) / 60);
  const secs = countdown % 60;
  const timerStr = `${String(days).padStart(2, "0")}:${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div
      className="weekly-event-banner relative rounded-3xl"
      style={{
        border: "2px solid #ff975d",
        background: "rgba(0,0,0,0.2)",
        boxShadow: "0 4px 44px rgba(255,92,0,0.2)",
        backdropFilter: "blur(12px)",
        minHeight: "194px",
      }}
    >
      <style jsx>{`
        .weekly-event-banner {
          clip-path: inset(-40px -10px 0 -10px round 24px);
        }
        @media (min-width: 1024px) {
          .weekly-event-banner {
            clip-path: inset(-80px 0 0 0 round 24px);
          }
        }
      `}</style>
      <Image
        src={characterImage}
        alt=""
        width={300}
        height={310}
        unoptimized
        className="pointer-events-none absolute z-0 h-[220px] w-auto select-none object-contain lg:h-[280px]"
        style={{
          left: "-10px",
          bottom: "-10px",
        }}
      />
      <div className="relative z-10 p-5 pl-[140px] lg:p-8 lg:pl-[280px]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col gap-1 lg:max-w-[500px] lg:gap-0">
            <p className="font-body text-[10px] uppercase text-white lg:hidden">
              Event ends in
            </p>
            <p
              className="font-heading text-2xl font-bold leading-tight text-brand-main lg:hidden"
              style={{ textShadow: "0 0 16px rgba(255,92,0,0.4)" }}
            >
              {timerStr}
            </p>
            <h3 className="font-heading text-base font-bold leading-tight text-white lg:text-3xl">
              {title}
            </h3>
            <p className="font-body text-xs leading-relaxed text-white/90 lg:mt-3 lg:text-base">
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 text-right lg:block">
            <p className="font-body text-xs uppercase text-white">Event ends in</p>
            <p
              className="font-heading text-5xl font-bold text-brand-main"
              style={{ textShadow: "0 0 16px rgba(255,92,0,0.4)" }}
            >
              {timerStr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
