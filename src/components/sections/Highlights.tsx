"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = {
  number: string;
  title: ReactNode;
  body: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
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
    imageWidth: 727,
    imageHeight: 461,
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
    imageWidth: 643,
    imageHeight: 675,
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
    imageWidth: 651,
    imageHeight: 434,
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
    imageWidth: 730,
    imageHeight: 548,
  },
];

const AUTO_SLIDE_MS = 5000;

function DotIndicators({
  current,
  onSelect,
  progress,
}: {
  current: number;
  onSelect: (i: number) => void;
  progress: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {slides.map((s, i) => {
        const active = i === current;
        return (
          <button
            key={s.number}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`relative h-0.5 overflow-hidden rounded-full transition-[width] duration-300 ${
              active ? "w-20 bg-dark-border" : "w-5 bg-dark-border"
            }`}
          >
            {active && (
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-brand-light"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Highlights() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  const stopTimer = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const triggerSlide = useCallback(
    (dir: "left" | "right", nextFn: (s: number) => number) => {
      stopTimer();
      setProgress(0);
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(nextFn);
        setIsAnimating(false);
      }, 300);
    },
    [stopTimer],
  );

  const startCycle = useCallback(() => {
    stopTimer();
    setProgress(0);
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_SLIDE_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTO_SLIDE_MS) {
        triggerSlide("right", (s) => (s + 1) % slides.length);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [stopTimer, triggerSlide]);

  useEffect(() => {
    if (!isAnimating) {
      startCycle();
    }
    return stopTimer;
  }, [currentSlide, isAnimating, startCycle, stopTimer]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return;
      triggerSlide(index > currentSlide ? "right" : "left", () => index);
    },
    [currentSlide, isAnimating, triggerSlide],
  );

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    triggerSlide("left", (s) => (s - 1 + slides.length) % slides.length);
  }, [isAnimating, triggerSlide]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    triggerSlide("right", (s) => (s + 1) % slides.length);
  }, [isAnimating, triggerSlide]);

  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext();
      else goPrev();
    }
  };

  const slide = slides[currentSlide];

  const animClass = isAnimating
    ? direction === "right"
      ? "translate-x-8 opacity-0"
      : "-translate-x-8 opacity-0"
    : "translate-x-0 opacity-100";

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
        className="absolute left-8 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)] hover:backdrop-blur-[3px] lg:flex"
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
        className="absolute right-8 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)] hover:backdrop-blur-[3px] lg:flex"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/reviews/arrow-outlined.svg"
          alt=""
          loading="lazy"
          className="h-12 w-6"
        />
      </button>

      <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-12 lg:px-20 lg:py-20">
        {/* Mobile layout — fixed height container with dots pinned at bottom */}
        <div
          className="relative flex h-[660px] flex-col sm:h-[730px] lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex flex-1 flex-col gap-6 overflow-hidden pb-8 transition-all duration-300 ease-in-out ${animClass}`}
          >
            <span className="font-heading text-3xl font-bold text-brand-light">{slide.number}</span>
            <h2 className="font-heading text-2xl font-bold leading-tight text-white">
              {slide.title}
            </h2>

            <div className="relative flex h-[320px] shrink-0 items-center justify-center sm:h-[420px]">
              <Image
                src={slide.image}
                alt=""
                width={slide.imageWidth}
                height={slide.imageHeight}
                unoptimized
                sizes="100vw"
                className="max-h-full w-auto max-w-full object-contain"
              />
            </div>

            <p className="font-body text-base leading-7 text-white/90">{slide.body}</p>
          </div>

          <div className="absolute bottom-0 left-0">
            <DotIndicators current={currentSlide} onSelect={goTo} progress={progress} />
          </div>
        </div>

        {/* Desktop layout — fixed height with dots pinned at bottom-left */}
        <div className="relative hidden h-[560px] lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="flex h-full flex-col">
            <div
              className={`flex h-full flex-col justify-center gap-6 pb-12 transition-all duration-300 ease-in-out ${animClass}`}
            >
              <span className="font-heading text-4xl font-bold text-brand-light">
                {slide.number}
              </span>
              <h2 className="font-heading text-4xl font-bold leading-tight text-white">
                {slide.title}
              </h2>
              <p className="max-w-[400px] font-body text-lg leading-7 text-white/90">
                {slide.body}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center justify-center transition-all duration-300 ease-in-out ${animClass}`}
          >
            <Image
              src={slide.image}
              alt=""
              width={slide.imageWidth}
              height={slide.imageHeight}
              unoptimized
              sizes="50vw"
              className="max-h-full w-auto max-w-full object-contain"
            />
          </div>

          <div className="absolute bottom-0 left-0 z-10">
            <DotIndicators current={currentSlide} onSelect={goTo} progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
}
