"use client";

import Image from "next/image";
import { useRef } from "react";

type Review = {
  name: string;
  rankPath: string;
  date: string;
  comment: string;
  game: string;
  category: string;
};

const reviews: Review[] = [
  {
    name: "Robert Johnson",
    rankPath: "Platinum III to Diamond III",
    date: "2026-12-08",
    comment:
      "Amazing experience! The booster was professional and finished the order ahead of schedule. Will definitely use OGEdge again.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    name: "Sarah Mitchell",
    rankPath: "Gold I to Platinum II",
    date: "2026-11-22",
    comment:
      "Smooth experience from start to finish. Super clear communication and a really skilled booster.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    name: "Michael Chen",
    rankPath: "Diamond II to Ascendant",
    date: "2026-11-10",
    comment:
      "Very professional service. Got my desired rank in less than the estimated time. 10/10.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    name: "Emily Rodriguez",
    rankPath: "Silver II to Gold III",
    date: "2026-10-28",
    comment:
      "Booster played carefully and respected my preferred agents. Hit my goal rank in two evenings without any drama.",
    game: "Valorant",
    category: "Placement Boost",
  },
  {
    name: "Daniel Park",
    rankPath: "Ascendant I to Immortal II",
    date: "2026-10-14",
    comment:
      "Genuinely impressed. The boosting was clean, no toxicity, and they kept me updated through every match. Worth the price.",
    game: "Valorant",
    category: "Boost per Win",
  },
  {
    name: "Jessica Nakamura",
    rankPath: "Bronze III to Silver I",
    date: "2026-09-30",
    comment:
      "First time using a boosting service and OGEdge made it stress free. Account felt safe and I learned a few tricks watching the replays.",
    game: "Valorant",
    category: "Rank Boost",
  },
];

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => {
    isDown.current = false;
  };
  const handleMouseUp = () => {
    isDown.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByCard = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-review-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 446;
    scrollRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-dark-main overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
        {/* Desktop layout: image left, text right */}
        <div className="hidden lg:grid grid-cols-[525px_1fr] gap-10 items-center">
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[317px] w-[317px] rounded-full pointer-events-none"
              style={{
                background: "rgba(255,92,0,0.5)",
                filter: "blur(107px)",
              }}
            />
            <Image
              src="/images/characters/reviewer.png"
              alt="Reviewer"
              width={610}
              height={810}
              unoptimized
              className="relative h-auto w-full max-w-[525px] object-contain"
            />
          </div>

          <div className="-mt-40 flex flex-col gap-8">
            <h2 className="font-heading text-4xl font-bold text-white">
              What our players are saying
            </h2>

            <div
              className="inline-flex flex-wrap items-center gap-3 rounded-3xl px-8 py-6 self-start"
              style={{
                background: "rgba(23,25,31,0.5)",
                border: "2px solid #ff975d",
                backdropFilter: "blur(3px)",
                boxShadow: "0 4px 44px rgba(255,92,0,0.3)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/reviews/star.svg" alt="" loading="lazy" className="h-7 w-7" />
              <span
                className="font-body text-xl font-bold text-brand-light"
                style={{ textShadow: "0 0 12px rgba(255,151,93,0.6)" }}
              >
                4.9 Star Rating
              </span>
              <span className="font-body text-lg text-white">10k Reviews</span>
              <span className="text-white/50">|</span>
              <button
                type="button"
                className="inline-flex items-center gap-2 font-body text-lg font-bold uppercase tracking-[0.4px] text-white"
              >
                See all
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/reviews/arrow-up-duotone.svg"
                  alt=""
                  loading="lazy"
                  className="h-5 w-5 rotate-90"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile layout: title → rating → image with overlapping cards */}
        <div className="flex flex-col items-center lg:hidden">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white text-center">
            What our players are saying
          </h2>

          <div
            className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 rounded-3xl px-5 py-4"
            style={{
              background: "rgba(23,25,31,0.5)",
              border: "2px solid #ff975d",
              backdropFilter: "blur(3px)",
              boxShadow: "0 4px 44px rgba(255,92,0,0.3)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/reviews/star.svg" alt="" loading="lazy" className="h-6 w-6" />
            <span
              className="font-body text-base font-bold text-brand-light"
              style={{ textShadow: "0 0 12px rgba(255,151,93,0.6)" }}
            >
              4.9 Star Rating
            </span>
            <span className="font-body text-sm text-white">10k Reviews</span>
            <span className="text-white/50">|</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.4px] text-white"
            >
              See all
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/reviews/arrow-up-duotone.svg"
                alt=""
                loading="lazy"
                className="h-5 w-5 rotate-90"
              />
            </button>
          </div>

          {/* Character image */}
          <div className="relative mt-6 w-full flex justify-center">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full pointer-events-none"
              style={{
                background: "rgba(255, 81, 0, 0.99)",
                filter: "blur(107px)",
              }}
            />
            <Image
              src="/images/characters/reviewer.png"
              alt="Reviewer"
              width={610}
              height={810}
              unoptimized
              className="relative h-auto w-[320px] object-contain"
            />
          </div>
        </div>

        <div className="-mt-38 lg:-mt-60 grid grid-cols-1 lg:grid-cols-[64px_1fr_64px] gap-4 lg:gap-8 items-center relative z-10">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollByCard(-1)}
            className="hidden lg:flex h-16 w-16 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:backdrop-blur-[3px] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/reviews/arrow-outlined.svg"
              alt=""
              loading="lazy"
              className="h-12 w-6 -scale-x-100"
            />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {reviews.map((review) => (
              <div
                key={review.name}
                data-review-card
                className="snap-start shrink-0 w-[280px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col gap-4 rounded-3xl p-5 md:p-8"
                style={{
                  background:
                    "linear-gradient(117deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
                  border: "1px solid #6d6d96",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full font-body text-xs font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #ff5c00 0%, #a32d05 100%)",
                    }}
                  >
                    {review.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body text-base font-medium text-white">
                      {review.name}
                    </span>
                    <span className="font-body text-sm text-brand-light">{review.rankPath}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={id}
                        src="/images/icons/reviews/star.svg"
                        alt=""
                        loading="lazy"
                        // Mobile stars bumped from 24 → 40px (~1.7x) per
                        // designer feedback that the rating was hard to
                        // read on phones (msg #35). Desktop unchanged.
                        className="h-7 w-7 md:h-6 md:w-6"
                      />
                    ))}
                  </div>
                  <span className="font-body text-sm text-text-secondary">{review.date}</span>
                </div>

                <p className="font-body text-base text-white leading-6">{review.comment}</p>

                <p className="font-body text-sm">
                  <span className="text-white/70">Purchased: </span>
                  <span className="text-white">{review.game}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 font-body text-xs font-medium"
                    style={{
                      background: "rgba(26,173,25,0.2)",
                      color: "var(--success-main)",
                    }}
                  >
                    Verified Purchase
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-body text-xs font-medium text-white">
                    {review.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollByCard(1)}
            className="hidden lg:flex h-16 w-16 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-[#ffa384] hover:bg-[rgba(255,255,255,0.1)] hover:backdrop-blur-[3px] hover:shadow-[0_4px_8px_rgba(250,70,9,0.32)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/reviews/arrow-outlined.svg"
              alt=""
              loading="lazy"
              className="h-12 w-6"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
