"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";

type Slide = {
  number: string;
  title: ReactNode;
  body: string;
  image: string;
};

const slides: Slide[] = [
  {
    number: "01",
    title: (
      <>
        We provide <span className="text-brand-light">fast, easy</span> and{" "}
        <span className="text-brand-light">secure</span> boost
      </>
    ),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    image: "/images/highlights/highlights-01.png",
  },
  {
    number: "02",
    title: (
      <>
        Fast Checkout. <span className="text-brand-light">Secure Payments</span>
      </>
    ),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    image: "/images/highlights/highlights-02.png",
  },
  {
    number: "03",
    title: (
      <>
        Remember our Reviews? <span className="text-brand-light">They are 100% True.</span>
      </>
    ),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    image: "/images/highlights/highlights-03.png",
  },
  {
    number: "04",
    title: (
      <>
        We Always Have <span className="text-brand-light">Your Back</span>
      </>
    ),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    image: "/images/highlights/highlights-04.png",
  },
];

export function Highlights() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  const goPrev = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((s) => (s + 1) % slides.length);

  return (
    <section className="relative w-full overflow-hidden bg-dark-main">
      <div
        className="pointer-events-none absolute -left-28 top-[280px] h-64 w-64 rounded-full"
        style={{ background: "rgba(255,92,0,0.2)", filter: "blur(107px)" }}
      />
      <div
        className="pointer-events-none absolute -top-[71px] left-[520px] h-64 w-64 rounded-full"
        style={{ background: "rgba(255,92,0,0.15)", filter: "blur(107px)" }}
      />
      <div
        className="pointer-events-none absolute left-[956px] top-[179px] h-64 w-64 rounded-full"
        style={{ background: "rgba(255,92,0,0.15)", filter: "blur(107px)" }}
      />

      <button
        type="button"
        aria-label="Previous highlight"
        onClick={goPrev}
        className="absolute left-2 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)] hover:backdrop-blur-[3px] lg:left-8"
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
        className="absolute right-2 top-1/2 z-20 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)] hover:backdrop-blur-[3px] lg:right-8"
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
        {/* Mobile layout: number → title → image → body → dots */}
        <div className="flex flex-col gap-6 lg:hidden">
          <span className="font-heading text-4xl font-bold text-brand-main">{slide.number}</span>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white">
            {slide.title}
          </h2>

          <div className="relative flex items-center justify-center">
            <Image
              src={slide.image}
              alt=""
              width={900}
              height={571}
              unoptimized
              sizes="100vw"
              className="h-auto w-full object-contain"
            />
          </div>

          <p className="font-body text-base leading-7 text-white/90">{slide.body}</p>

          <div className="flex items-center gap-2">
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

        {/* Desktop layout: text left, image right */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="font-heading text-4xl font-bold text-brand-main">{slide.number}</span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-white">
              {slide.title}
            </h2>
            <p className="max-w-[400px] font-body text-lg leading-7 text-white/90">{slide.body}</p>

            <div className="mt-4 flex items-center gap-2">
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
              src={slide.image}
              alt=""
              width={900}
              height={571}
              unoptimized
              sizes="50vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
