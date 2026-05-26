"use client";

import Image from "next/image";
import { useState } from "react";

const ICON = "/images/jobs/icons";

type SkillBadge = {
  icon: string;
  text: string;
  position: string;
  mobilePosition: string;
};

type Slide = {
  character: string;
  titleImage: string;
  titleWidth: number;
  titleHeight: number;
  badges: SkillBadge[];
};

const slides: Slide[] = [
  {
    character: "/images/jobs/now-hiring-character.png",
    titleImage: "/images/jobs/boosters-text.svg",
    titleWidth: 1356,
    titleHeight: 180,
    badges: [
      {
        icon: `${ICON}/align-top.svg`,
        text: "Top-tier player (high rank / proven skill)",
        position: "left-[16%] top-[20%]",
        mobilePosition: "left-[4%] top-[7%]",
      },
      {
        icon: `${ICON}/book.svg`,
        text: "Deep game knowledge & fast adaptability",
        position: "right-[18%] top-[12%]",
        mobilePosition: "right-[4%] top-[30%]",
      },
      {
        icon: `${ICON}/speed.svg`,
        text: "Consistent performance under pressure",
        position: "left-[20%] bottom-[40%]",
        mobilePosition: "left-[4%] top-[50%]",
      },
      {
        icon: `${ICON}/focus.svg`,
        text: "Reliable, disciplined, and deadline-focused",
        position: "right-[6%] top-[36%]",
        mobilePosition: "right-[4%] top-[65%]",
      },
      {
        icon: `${ICON}/achievement.svg`,
        text: "Quiet professionalism — lets results speak",
        position: "right-[12%] bottom-[30%]",
        mobilePosition: "left-[4%] bottom-[5%]",
      },
    ],
  },
  {
    character: "/images/jobs/content-creator-character.png",
    titleImage: "/images/jobs/content-creators-text.svg",
    titleWidth: 1333,
    titleHeight: 428,
    badges: [
      {
        icon: `${ICON}/align-top.svg`,
        text: "Top-tier player (high rank / proven skill)",
        position: "left-[16%] top-[14%]",
        mobilePosition: "left-[4%] top-[7%]",
      },
      {
        icon: `${ICON}/book.svg`,
        text: "Deep game knowledge & fast adaptability",
        position: "right-[16%] top-[14%]",
        mobilePosition: "right-[4%] top-[30%]",
      },
      {
        icon: `${ICON}/speed.svg`,
        text: "Consistent performance under pressure",
        position: "left-[12%] top-[44%]",
        mobilePosition: "left-[4%] top-[50%]",
      },
      {
        icon: `${ICON}/focus.svg`,
        text: "Reliable, disciplined, and deadline-focused",
        position: "right-[6%] top-[32%]",
        mobilePosition: "right-[4%] top-[65%]",
      },
      {
        icon: `${ICON}/achievement.svg`,
        text: "Quiet professionalism — lets results speak",
        position: "right-[10%] bottom-[24%]",
        mobilePosition: "left-[4%] bottom-[5%]",
      },
    ],
  },
  {
    character: "/images/jobs/support-character.png",
    titleImage: "/images/jobs/support-text.svg",
    titleWidth: 1195,
    titleHeight: 180,
    badges: [
      {
        icon: `${ICON}/align-top.svg`,
        text: "Clear, friendly, and professional communicator",
        position: "left-[14%] top-[20%]",
        mobilePosition: "left-[4%] top-[7%]",
      },
      {
        icon: `${ICON}/book.svg`,
        text: "Fast responder with strong attention to detail",
        position: "right-[16%] top-[14%]",
        mobilePosition: "right-[4%] top-[30%]",
      },
      {
        icon: `${ICON}/speed.svg`,
        text: "Calm under pressure & solution-oriented",
        position: "left-[14%] bottom-[40%]",
        mobilePosition: "left-[4%] top-[50%]",
      },
      {
        icon: `${ICON}/focus.svg`,
        text: "Empathetic — understands player frustrations",
        position: "right-[6%] top-[36%]",
        mobilePosition: "right-[4%] top-[65%]",
      },
      {
        icon: `${ICON}/achievement.svg`,
        text: "Organized and reliable in a fast-paced environment",
        position: "right-[10%] bottom-[26%]",
        mobilePosition: "left-[4%] bottom-[5%]",
      },
    ],
  },
];

function NavArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full backdrop-blur-[3px] transition-all duration-200 active:scale-90 lg:h-16 lg:w-16"
      style={{
        background: hovered ? "rgba(255,255,255,0.1)" : "transparent",
        border: hovered ? "1px solid #ffa384" : "1px solid transparent",
        boxShadow: hovered ? "0 4px 16px rgba(250,70,9,0.32)" : "none",
      }}
    >
      <Image
        src={`${ICON}/nav-arrow.svg`}
        alt={direction === "prev" ? "Previous" : "Next"}
        width={28}
        height={56}
        className={`h-6 w-3 lg:h-auto lg:w-auto ${direction === "prev" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export function NowHiring() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const goPrev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  const goNext = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <section className="relative w-full overflow-hidden bg-[#17191f] pb-[120px] pt-16">
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center justify-center lg:h-[985px]">
        {/* Mobile: "Now hiring" + title at top */}
        <div className="relative z-20 flex flex-col items-center gap-2 lg:hidden">
          <p className="font-heading text-[20px] font-bold text-white">
            Now hiring
          </p>
          <div className="w-[90%] max-w-[400px]">
            <Image
              src={slide.titleImage}
              alt=""
              width={slide.titleWidth}
              height={slide.titleHeight}
              className="w-full"
            />
          </div>
        </div>

        {/* Main character area */}
        <div className="relative h-[550px] w-full lg:h-full">
          {/* Orange glow behind character */}
          <div
            className="absolute left-1/2 top-[20%] h-[300px] w-[200px] -translate-x-1/2 rounded-full bg-[#ff5c00] opacity-60 blur-[107px] lg:top-[20%] lg:h-[600px] lg:w-[291px]"
            aria-hidden="true"
          />

          {/* Character image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-[300px] lg:h-[912px] lg:w-[514px]">
              <Image
                src={slide.character}
                alt="Character"
                fill
                className="object-contain object-bottom"
              />
              {/* Orb glow at bottom of character */}
              <div
                className="absolute -bottom-[35%] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full lg:h-[400px] lg:w-[900px]"
                style={{
                  background: "radial-gradient(ellipse at center, #17191f 0%, #17191f 50%, transparent 70%)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Mobile floating badges — positioned over the character */}
          {slide.badges.map((badge) => (
            <div
              key={`mobile-${badge.text}`}
              className={`absolute z-10 flex max-w-[180px] items-center gap-2 rounded-[20px] border border-[#7e7eb8] px-3 py-2.5 backdrop-blur-[7px] lg:hidden ${badge.mobilePosition}`}
              style={{
                backgroundImage:
                  "linear-gradient(-21deg, rgba(23, 25, 31, 0.7) 0.2%, rgba(56, 56, 82, 0.7) 100%)",
              }}
            >
              <Image src={badge.icon} alt="" width={16} height={16} className="shrink-0" aria-hidden="true" />
              <p className="font-body text-[12px] font-medium leading-[16px] text-white">
                {badge.text}
              </p>
            </div>
          ))}

          {/* Desktop: Title text at bottom */}
          <div className="absolute bottom-[80px] left-1/2 hidden w-[80%] max-w-[1280px] -translate-x-1/2 lg:block">
            <Image
              src={slide.titleImage}
              alt=""
              width={slide.titleWidth}
              height={slide.titleHeight}
              className="w-full"
            />
          </div>

          {/* Desktop: "Now hiring" label */}
          <p className="absolute bottom-[140px] left-1/2 hidden -translate-x-1/2 font-heading text-[36px] font-bold text-white lg:block">
            Now hiring
          </p>

          {/* Desktop floating skill badges */}
          {slide.badges.map((badge) => (
            <div
              key={badge.text}
              className={`absolute hidden items-center gap-2 rounded-[32px] border border-[#7e7eb8] p-6 backdrop-blur-[7px] lg:flex ${badge.position}`}
              style={{
                backgroundImage:
                  "linear-gradient(-21deg, rgba(23, 25, 31, 0.5) 0.2%, rgba(56, 56, 82, 0.5) 100%)",
              }}
            >
              <Image src={badge.icon} alt="" width={20} height={20} aria-hidden="true" />
              <p className="whitespace-nowrap font-body text-[24px] font-medium leading-[32px] text-white">
                {badge.text}
              </p>
            </div>
          ))}

          {/* Navigation arrows */}
          <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 lg:left-16">
            <NavArrow direction="prev" onClick={goPrev} />
          </div>
          <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 lg:right-16">
            <NavArrow direction="next" onClick={goNext} />
          </div>
        </div>
      </div>
    </section>
  );
}
