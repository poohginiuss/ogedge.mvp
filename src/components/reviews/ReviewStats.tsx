"use client";

import { useState } from "react";

const ratingDistribution = [
  { stars: 5, count: 1234, percentage: 93 },
  { stars: 4, count: 78, percentage: 5.9 },
  { stars: 3, count: 10, percentage: 0.75 },
  { stars: 2, count: 5, percentage: 0.38 },
  { stars: 1, count: 1, percentage: 0.08 },
];

const starKeys = ["s1", "s2", "s3", "s4", "s5"];

function StarIcons({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {starKeys.map((id, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={id}
          src={
            i < count ? "/images/icons/reviews/star.svg" : "/images/icons/reviews/star-empty.svg"
          }
          alt=""
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

function StatCard({
  value,
  label,
  icon,
  prefix,
  glowColor,
}: {
  value: string;
  label: string;
  icon: string;
  prefix?: string;
  glowColor: string;
}) {
  return (
    <div
      className="relative flex flex-1 items-center justify-between overflow-hidden rounded-3xl p-4 md:p-6"
      style={{
        background: "rgba(35,35,48,0.5)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="relative z-10 flex flex-col gap-px">
        <div className="flex items-center gap-1">
          {prefix && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/icons/reviews/star.svg" alt="" className="h-7 w-7" />
          )}
          <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-light">
            {value}
          </span>
        </div>
        <span className="whitespace-nowrap font-body text-xs text-white/80">{label}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        className="absolute bottom-1 right-2 h-14 w-12 opacity-70 md:static md:bottom-auto md:right-auto md:h-18 md:w-16"
        loading="lazy"
      />
      {/* Sunshine glow from bottom-right */}
      <div
        className="pointer-events-none absolute bottom-[-130px] right-[-45px] h-[250px] w-[250px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(15px)",
        }}
      />
    </div>
  );
}

function RatingBadge({
  title,
  starColor,
  starIcon,
  glowColor,
  href,
}: {
  title: string;
  starColor: string;
  /**
   * Star asset matching the badge's brand. Each external rating provider
   * (Trustpilot / Reviews.io) has its own coloured star — the orange
   * default did not match the green / yellow palette of the badges
   * (designer note: replace orange stars with green/yellow on the
   * `/reviews` badges).
   */
  starIcon: string;
  glowColor: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl border border-transparent p-6 transition-all duration-200"
      style={{
        background: "rgba(35,35,48,0.5)",
        backdropFilter: "blur(5px)",
        ["--badge-color" as string]: starColor,
        ["--badge-glow" as string]: glowColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = starColor;
        e.currentTarget.style.boxShadow = `0 0 16px ${glowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span className="font-body text-lg font-medium leading-7 text-white transition-colors md:text-2xl md:leading-8">
        {title}
      </span>
      <div className="flex items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={starIcon} alt="" className="-mr-2 h-[25px] w-[25px]" />
        <span className="font-body text-sm font-bold" style={{ color: starColor }}>
          4.9 Star Rating
        </span>
      </div>
      <div
        className="pointer-events-none absolute bottom-[-130px] right-[-45px] h-[250px] w-[250px] rounded-full transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(15px)",
        }}
      />
    </a>
  );
}

export function ReviewStats() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-0">
        {/* Desktop layout */}
        <div className="hidden items-center gap-12 lg:flex">
          {/* Left: stat cards */}
          <div className="flex w-[268px] flex-col gap-4">
            <StatCard
              value="1328"
              label="Total Reviews"
              icon="/images/icons/reviews/people.svg"
              glowColor="rgba(255,92,0,0.5)"
            />
            <StatCard
              value="4.94"
              label="Average Rating"
              icon="/images/icons/reviews/stars-linear.svg"
              prefix="star"
              glowColor="rgba(255,92,0,0.5)"
            />
          </div>

          {/* Center: distribution bars */}
          <div className="flex flex-1 flex-col gap-4">
            {ratingDistribution.map((row) => {
              const barWidth =
                row.stars === 5
                  ? 95
                  : row.stars === 4
                    ? 13.75
                    : row.stars === 3
                      ? 4.25
                      : row.stars === 2
                        ? 2.25
                        : 1.75;
              return (
                <div
                  key={`dist-${row.stars}`}
                  className="flex items-center gap-6 rounded p-1 transition-colors"
                  style={{
                    background: hoveredRow === row.stars ? "#2a2a32" : "transparent",
                  }}
                  onMouseEnter={() => setHoveredRow(row.stars)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <StarIcons count={row.stars} />
                  <div className="relative h-2 flex-1 rounded-[30px] bg-dark-border">
                    <div
                      className="absolute left-0 top-0 h-2 rounded-[30px]"
                      style={{
                        width: `${barWidth}%`,
                        background: "linear-gradient(to bottom, #ff975d, #ff5c00 50%, #a32d05)",
                        boxShadow: "0 0 14px rgba(255,92,0,0.4)",
                      }}
                    />
                  </div>
                  <span className="w-[80px] text-right font-body text-sm text-white/80">
                    {row.count} reviews
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: rating badges */}
          <div className="flex w-[268px] flex-col gap-4">
            <RatingBadge
              title="Rated Excellent"
              starColor="#48a589"
              starIcon="/images/icons/reviews/star-green.svg"
              glowColor="rgba(72,165,137,0.5)"
              href="https://www.trustpilot.com/review/ogedge.com"
            />
            <RatingBadge
              title="Top Rated"
              starColor="#f5e583"
              starIcon="/images/icons/reviews/star-yellow.png"
              glowColor="rgba(245,229,131,0.5)"
              href="https://www.reviews.io/company-reviews/store/ogedge"
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              value="1328"
              label="Total Reviews"
              icon="/images/icons/reviews/people.svg"
              glowColor="rgba(255,92,0,0.5)"
            />
            <StatCard
              value="4.94"
              label="Average Rating"
              icon="/images/icons/reviews/stars-linear.svg"
              prefix="star"
              glowColor="rgba(255,92,0,0.5)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <RatingBadge
              title="Rated Excellent"
              starColor="#48a589"
              starIcon="/images/icons/reviews/star-green.svg"
              glowColor="rgba(72,165,137,0.5)"
              href="https://www.trustpilot.com/review/ogedge.com"
            />
            <RatingBadge
              title="Top Rated"
              starColor="#f5e583"
              starIcon="/images/icons/reviews/star-yellow.png"
              glowColor="rgba(245,229,131,0.5)"
              href="https://www.reviews.io/company-reviews/store/ogedge"
            />
          </div>

          <div className="flex flex-col gap-3">
            {ratingDistribution.map((row) => {
              const barWidth =
                row.stars === 5
                  ? 95
                  : row.stars === 4
                    ? 13.75
                    : row.stars === 3
                      ? 4.25
                      : row.stars === 2
                        ? 2.25
                        : 1.75;
              return (
                <div key={`dist-m-${row.stars}`} className="flex items-center gap-3 p-1">
                  <StarIcons count={row.stars} size={12} />
                  <div className="relative h-2 flex-1 rounded-[30px] bg-dark-border">
                    <div
                      className="absolute left-0 top-0 h-2 rounded-[30px]"
                      style={{
                        width: `${barWidth}%`,
                        background: "linear-gradient(to bottom, #ff975d, #ff5c00 50%, #a32d05)",
                        boxShadow: "0 0 14px rgba(255,92,0,0.4)",
                      }}
                    />
                  </div>
                  <span className="w-[60px] text-right font-body text-xs text-white/80">
                    {row.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
