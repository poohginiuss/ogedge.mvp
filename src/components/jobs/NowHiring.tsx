"use client";

import Image from "next/image";
import { useState } from "react";

const ICON = "/images/jobs/icons";

type SkillBadge = {
  icon: string;
  text: string;
  position: string;
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
      },
      {
        icon: `${ICON}/book.svg`,
        text: "Deep game knowledge & fast adaptability",
        position: "right-[18%] top-[12%]",
      },
      {
        icon: `${ICON}/speed.svg`,
        text: "Consistent performance under pressure",
        position: "left-[20%] bottom-[40%]",
      },
      {
        icon: `${ICON}/focus.svg`,
        text: "Reliable, disciplined, and deadline-focused",
        position: "right-[6%] top-[36%]",
      },
      {
        icon: `${ICON}/achievement.svg`,
        text: "Quiet professionalism — lets results speak",
        position: "right-[12%] bottom-[30%]",
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
      },
      {
        icon: `${ICON}/book.svg`,
        text: "Deep game knowledge & fast adaptability",
        position: "right-[16%] top-[14%]",
      },
      {
        icon: `${ICON}/speed.svg`,
        text: "Consistent performance under pressure",
        position: "left-[12%] top-[44%]",
      },
      {
        icon: `${ICON}/focus.svg`,
        text: "Reliable, disciplined, and deadline-focused",
        position: "right-[6%] top-[32%]",
      },
      {
        icon: `${ICON}/achievement.svg`,
        text: "Quiet professionalism — lets results speak",
        position: "right-[10%] bottom-[24%]",
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
      },
      {
        icon: `${ICON}/book.svg`,
        text: "Fast responder with strong attention to detail",
        position: "right-[16%] top-[14%]",
      },
      {
        icon: `${ICON}/speed.svg`,
        text: "Calm under pressure & solution-oriented",
        position: "left-[14%] bottom-[40%]",
      },
      {
        icon: `${ICON}/focus.svg`,
        text: "Empathetic — understands player frustrations",
        position: "right-[6%] top-[36%]",
      },
      {
        icon: `${ICON}/achievement.svg`,
        text: "Organized and reliable in a fast-paced environment",
        position: "right-[10%] bottom-[26%]",
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
      className="flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-[3px] transition-all duration-200"
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
        className={direction === "prev" ? "rotate-180" : ""}
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
      <div className="relative mx-auto flex h-[700px] w-full max-w-[1920px] items-center justify-center lg:h-[985px]">
        {/* Orange glow behind character */}
        <div
          className="absolute left-1/2  h-[400px] w-[300px] -translate-x-1/2 rounded-full bg-[#ff5c00] opacity-60 blur-[107px] lg:h-[703px] lg:w-[291px]"
          aria-hidden="true"
        />

        {/* Character image */}
        <div className="relative h-[500px] w-[300px] lg:h-[912px] lg:w-[514px]">
          <Image
            src={slide.character}
            alt="Character"
            fill
            className="object-contain"
          />
          <div
            className="absolute bottom-0 left-0 h-[229px] w-full"
            style={{
              background: "linear-gradient(to top, #17191f, transparent)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Title text at bottom */}
        <div className="absolute bottom-[60px] left-1/2 w-[80%] max-w-[1280px] -translate-x-1/2 lg:bottom-[80px]">
          <Image
            src={slide.titleImage}
            alt=""
            width={slide.titleWidth}
            height={slide.titleHeight}
            className="w-full"
          />
        </div>

        {/* "Now hiring" label */}
        <p className="absolute bottom-[100px] left-1/2 -translate-x-1/2 font-heading text-[28px] font-bold text-white lg:bottom-[140px] lg:text-[36px]">
          Now hiring
        </p>

        {/* Floating skill badges — desktop only */}
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
        <div className="absolute left-4 top-1/2 -translate-y-1/2 lg:left-16">
          <NavArrow direction="prev" onClick={goPrev} />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 lg:right-16">
          <NavArrow direction="next" onClick={goNext} />
        </div>

        {/* Corner glow orbs */}
        <div
          className="absolute -left-[203px] -top-[201px] h-[446px] w-[446px] rounded-full bg-[#ff5c00] opacity-20 blur-[382px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 h-[446px] w-[446px] rounded-full bg-[#ff5c00] opacity-20 blur-[382px]"
          aria-hidden="true"
        />
      </div>

      {/* Mobile badges (stacked) */}
      <div className="mx-auto mt-8 flex max-w-[600px] flex-col gap-3 px-6 lg:hidden">
        {slide.badges.map((badge) => (
          <div
            key={badge.text}
            className="flex items-center gap-2 rounded-[24px] border border-[#7e7eb8] p-4 backdrop-blur-[7px]"
            style={{
              backgroundImage:
                "linear-gradient(-21deg, rgba(23, 25, 31, 0.5) 0.2%, rgba(56, 56, 82, 0.5) 100%)",
            }}
          >
            <Image src={badge.icon} alt="" width={20} height={20} aria-hidden="true" />
            <p className="font-body text-[16px] font-medium leading-[24px] text-white">
              {badge.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
