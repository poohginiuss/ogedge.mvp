"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = {
  number: string;
  title: [string, string, string];
  body: string;
};

const slides: Slide[] = [
  {
    number: "01",
    title: ["fast", "easy", "secure boost"],
    body: "Our professional boosters deliver fast results with full account security. Experience the difference with OGEdge — trusted by thousands of gamers worldwide.",
  },
  {
    number: "02",
    title: ["pro", "verified", "top-tier boosters"],
    body: "Hand-picked from the highest brackets and continuously vetted. Every booster on our roster has the rank, the playstyle and the temperament to climb on your account.",
  },
  {
    number: "03",
    title: ["safe", "private", "encrypted accounts"],
    body: "Industry-grade encryption, VPN protection and offline mode keep your credentials private from start to finish. Your account is never shared or stored in plain text.",
  },
  {
    number: "04",
    title: ["fair", "guaranteed", "money-back promise"],
    body: "If we don't deliver the rank you ordered in the agreed timeframe, you get a full refund — no arguing, no fine print. That is the OGEdge promise.",
  },
];

export function Highlights() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  const goPrev = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((s) => (s + 1) % slides.length);

  return (
    <section className="relative w-full bg-dark-main overflow-hidden">
      <div
        className="absolute -left-28 top-[280px] h-64 w-64 rounded-full pointer-events-none"
        style={{
          background: "rgba(255,92,0,0.2)",
          filter: "blur(107px)",
        }}
      />
      <div
        className="absolute left-[520px] -top-[71px] h-64 w-64 rounded-full pointer-events-none"
        style={{
          background: "rgba(255,92,0,0.15)",
          filter: "blur(107px)",
        }}
      />
      <div
        className="absolute left-[956px] top-[179px] h-64 w-64 rounded-full pointer-events-none"
        style={{
          background: "rgba(255,92,0,0.15)",
          filter: "blur(107px)",
        }}
      />

      <button
        type="button"
        aria-label="Previous highlight"
        onClick={goPrev}
        className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:backdrop-blur-[3px] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/reviews/arrow-outlined.svg"
          alt=""
          loading="lazy"
          className="h-12 w-6 -scale-x-100"
        />
      </button>
      <button
        type="button"
        aria-label="Next highlight"
        onClick={goNext}
        className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:backdrop-blur-[3px] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/reviews/arrow-outlined.svg"
          alt=""
          loading="lazy"
          className="h-12 w-6"
        />
      </button>

      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="font-heading text-4xl font-bold text-[#232330]">{slide.number}</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
              We provide <span className="text-brand-light">{slide.title[0]}</span>,{" "}
              <span className="text-brand-light">{slide.title[1]}</span>
              <br className="hidden md:block" /> and{" "}
              <span className="text-brand-light">{slide.title[2]}</span>
            </h2>
            <p className="max-w-[400px] font-body text-base lg:text-lg leading-7 text-white/90">
              {slide.body}
            </p>

            <div className="flex items-center gap-2 mt-4">
              {slides.map((s, i) => {
                const active = i === currentSlide;
                return (
                  <button
                    key={s.number}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      active ? "w-20 bg-brand-light" : "w-5 bg-dark-border"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <Image
              src="/images/highlights/game-posters.png"
              alt=""
              width={900}
              height={571}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
