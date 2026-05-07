"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { useState } from "react";

type GameFilter = {
  id: string;
  label: string;
  count: number;
};

const gameFilters: GameFilter[] = [
  { id: "all", label: "All Games", count: 1234 },
  { id: "valorant", label: "Valorant", count: 324 },
  { id: "lol", label: "League of Legends", count: 150 },
  { id: "cod", label: "Call of Duty", count: 100 },
  { id: "apex", label: "Apex Legends", count: 78 },
  { id: "dota2", label: "Dota 2", count: 51 },
  { id: "fortnite", label: "Fortnite", count: 45 },
  { id: "tarkov", label: "Escape from Tarkov", count: 24 },
  { id: "wow", label: "World of Warcraft", count: 15 },
  { id: "everquest", label: "EverQuest", count: 1 },
];

type ReviewData = {
  id: string;
  name: string;
  initials: string;
  rankPath: string;
  stars: number;
  date: string;
  comment: string;
  game: string;
  category: string;
};

const allReviews: ReviewData[] = [
  {
    id: "r1",
    name: "Robert Johnson",
    initials: "RJ",
    rankPath: "Platinum III to Diamond III",
    stars: 5,
    date: "2026-12-08",
    comment:
      "Amazing experience! The booster was professional and finished the order ahead of schedule. Will definitely use OGEdge again.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    id: "r2",
    name: "Sarah Mitchell",
    initials: "SM",
    rankPath: "Gold I to Platinum II",
    stars: 5,
    date: "2026-11-22",
    comment:
      "Smooth experience from start to finish. Super clear communication and a really skilled booster.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    id: "r3",
    name: "Michael Chen",
    initials: "MC",
    rankPath: "Diamond II to Ascendant",
    stars: 5,
    date: "2026-11-10",
    comment:
      "Very professional service. Got my desired rank in less than the estimated time. 10/10.",
    game: "League of Legends",
    category: "Division Boost",
  },
  {
    id: "r4",
    name: "Emily Rodriguez",
    initials: "ER",
    rankPath: "Silver II to Gold III",
    stars: 5,
    date: "2026-10-28",
    comment:
      "Booster played carefully and respected my preferred agents. Hit my goal rank in two evenings without any drama.",
    game: "Valorant",
    category: "Placement Boost",
  },
  {
    id: "r5",
    name: "Daniel Park",
    initials: "DP",
    rankPath: "Ascendant I to Immortal II",
    stars: 5,
    date: "2026-10-14",
    comment:
      "Genuinely impressed. The boosting was clean, no toxicity, and they kept me updated through every match. Worth the price.",
    game: "Call of Duty",
    category: "Ranked Wins",
  },
  {
    id: "r6",
    name: "Jessica Nakamura",
    initials: "JN",
    rankPath: "Bronze III to Silver I",
    stars: 5,
    date: "2026-09-30",
    comment:
      "First time using a boosting service and OGEdge made it stress free. Account felt safe and I learned a few tricks watching the replays.",
    game: "Apex Legends",
    category: "Rank Boost",
  },
  {
    id: "r7",
    name: "Alex Thompson",
    initials: "AT",
    rankPath: "Iron to Bronze III",
    stars: 4,
    date: "2026-09-15",
    comment:
      "Good service overall. Took a bit longer than expected but the booster was communicative and got the job done.",
    game: "Dota 2",
    category: "MMR Boost",
  },
  {
    id: "r8",
    name: "Lisa Wang",
    initials: "LW",
    rankPath: "Gold to Diamond",
    stars: 5,
    date: "2026-09-01",
    comment:
      "Excellent boosting service. My account was handled with care and I reached my target rank faster than anticipated.",
    game: "Fortnite",
    category: "Arena Points",
  },
  {
    id: "r9",
    name: "Marcus Rivera",
    initials: "MR",
    rankPath: "Platinum to Masters",
    stars: 5,
    date: "2026-08-20",
    comment:
      "Outstanding experience. The duo queue option was perfect - learned so much from watching the booster play alongside me.",
    game: "League of Legends",
    category: "Ranked Wins",
  },
  {
    id: "r10",
    name: "Nina Patel",
    initials: "NP",
    rankPath: "Silver to Gold",
    stars: 5,
    date: "2026-08-05",
    comment:
      "Fast, reliable, and professional. The VPN protection gave me peace of mind. Will recommend to friends.",
    game: "Escape from Tarkov",
    category: "Raid Carry",
  },
  {
    id: "r11",
    name: "Chris Anderson",
    initials: "CA",
    rankPath: "Diamond to Master",
    stars: 5,
    date: "2026-07-22",
    comment:
      "Top-notch service. The booster was incredibly skilled and completed the order well within the timeframe.",
    game: "Valorant",
    category: "Boost per Win",
  },
  {
    id: "r12",
    name: "Priya Sharma",
    initials: "PS",
    rankPath: "Bronze to Silver",
    stars: 5,
    date: "2026-07-10",
    comment:
      "Very satisfied with the results. Customer support was responsive and helpful throughout the entire process.",
    game: "World of Warcraft",
    category: "Mythic+ Boost",
  },
  {
    id: "r13",
    name: "Tommy Lee",
    initials: "TL",
    rankPath: "Gold II to Platinum I",
    stars: 5,
    date: "2026-06-28",
    comment:
      "Quick turnaround and excellent communication. The booster even gave me tips on how to maintain my new rank.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    id: "r14",
    name: "Amanda Foster",
    initials: "AF",
    rankPath: "Silver IV to Gold II",
    stars: 5,
    date: "2026-06-15",
    comment:
      "Second time ordering from OGEdge and they never disappoint. Consistent quality and great customer service every time.",
    game: "League of Legends",
    category: "Division Boost",
  },
  {
    id: "r15",
    name: "Jake Williams",
    initials: "JW",
    rankPath: "Bronze to Silver III",
    stars: 4,
    date: "2026-06-02",
    comment:
      "Service was good, rank achieved as promised. Only minor delay in getting started but the end result was worth it.",
    game: "Call of Duty",
    category: "Rank Boost",
  },
  {
    id: "r16",
    name: "Sophia Martinez",
    initials: "SM",
    rankPath: "Platinum to Diamond",
    stars: 5,
    date: "2026-05-20",
    comment:
      "Incredible service! The booster was so skilled and finished way ahead of the estimated time. Super impressed.",
    game: "Apex Legends",
    category: "Ranked Wins",
  },
  {
    id: "r17",
    name: "Ryan O'Connor",
    initials: "RO",
    rankPath: "Gold to Platinum III",
    stars: 5,
    date: "2026-05-08",
    comment:
      "Used the duo queue feature and had a blast. Learned so much about positioning and game sense from my booster.",
    game: "Valorant",
    category: "Duo Boost",
  },
  {
    id: "r18",
    name: "Yuki Tanaka",
    initials: "YT",
    rankPath: "Silver to Gold II",
    stars: 5,
    date: "2026-04-25",
    comment:
      "Very safe and secure process. The VPN was already set up and my account was treated with utmost care.",
    game: "Dota 2",
    category: "MMR Boost",
  },
  {
    id: "r19",
    name: "David Kim",
    initials: "DK",
    rankPath: "Diamond to Master",
    stars: 5,
    date: "2026-04-12",
    comment:
      "OGEdge delivered exactly what they promised. Fast, efficient, and the booster was professional throughout.",
    game: "Fortnite",
    category: "Arena Points",
  },
  {
    id: "r20",
    name: "Hannah Brown",
    initials: "HB",
    rankPath: "Iron to Silver",
    stars: 5,
    date: "2026-03-30",
    comment:
      "Best boosting service I have ever used. The progress updates were helpful and the final result exceeded my expectations.",
    game: "League of Legends",
    category: "Placement Boost",
  },
  {
    id: "r21",
    name: "Kevin Zhang",
    initials: "KZ",
    rankPath: "Platinum II to Diamond I",
    stars: 5,
    date: "2026-03-18",
    comment:
      "Smooth and hassle-free. Submitted my order and within hours they were already making progress. Very reliable.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    id: "r22",
    name: "Isabella Garcia",
    initials: "IG",
    rankPath: "Gold to Platinum",
    stars: 4,
    date: "2026-03-05",
    comment:
      "Great experience overall. The tracker was useful to see real-time progress. Would use again for sure.",
    game: "Call of Duty",
    category: "Ranked Wins",
  },
  {
    id: "r23",
    name: "Noah Wilson",
    initials: "NW",
    rankPath: "Bronze to Gold",
    stars: 5,
    date: "2026-02-20",
    comment:
      "Massive rank jump and it was all done within 3 days. The booster was a beast. Absolutely worth every penny.",
    game: "Apex Legends",
    category: "Rank Boost",
  },
  {
    id: "r24",
    name: "Olivia Davis",
    initials: "OD",
    rankPath: "Silver to Platinum",
    stars: 5,
    date: "2026-02-08",
    comment:
      "Customer support answered all my questions quickly. The boosting itself was flawless. Highly recommend OGEdge.",
    game: "Escape from Tarkov",
    category: "Raid Carry",
  },
  {
    id: "r25",
    name: "Ethan Moore",
    initials: "EM",
    rankPath: "Gold III to Diamond",
    stars: 5,
    date: "2026-01-25",
    comment:
      "Third time using OGEdge across different games. They are consistently good no matter the game. Trust them completely.",
    game: "World of Warcraft",
    category: "Mythic+ Boost",
  },
  {
    id: "r26",
    name: "Mia Taylor",
    initials: "MT",
    rankPath: "Bronze to Silver II",
    stars: 5,
    date: "2026-01-12",
    comment:
      "Was nervous about using a boosting service but OGEdge made the entire process transparent and comfortable. Great job!",
    game: "Valorant",
    category: "Placement Boost",
  },
  {
    id: "r27",
    name: "Lucas Hernandez",
    initials: "LH",
    rankPath: "Ascendant to Immortal",
    stars: 5,
    date: "2025-12-30",
    comment:
      "High-elo boosting done right. The booster clearly knew the meta inside out. Reached Immortal without a single hiccup.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    id: "r28",
    name: "Chloe Jackson",
    initials: "CJ",
    rankPath: "Silver to Gold",
    stars: 5,
    date: "2025-12-18",
    comment:
      "Fast delivery and the booster played very well. My account stats actually improved too which was a nice bonus.",
    game: "League of Legends",
    category: "Division Boost",
  },
  {
    id: "r29",
    name: "Benjamin White",
    initials: "BW",
    rankPath: "Platinum to Diamond",
    stars: 5,
    date: "2025-12-05",
    comment:
      "Ordered at night and woke up to find significant progress already made. Efficient and reliable beyond expectations.",
    game: "Dota 2",
    category: "MMR Boost",
  },
  {
    id: "r30",
    name: "Ava Robinson",
    initials: "AR",
    rankPath: "Gold to Platinum II",
    stars: 4,
    date: "2025-11-22",
    comment:
      "Solid service. Reached my target rank within the promised timeframe. The communication could be slightly better but overall happy.",
    game: "Fortnite",
    category: "Arena Points",
  },
  {
    id: "r31",
    name: "James Clark",
    initials: "JC",
    rankPath: "Diamond III to Ascendant",
    stars: 5,
    date: "2025-11-10",
    comment:
      "OGEdge is the real deal. Professional boosters, secure process, and incredible results. Cannot recommend enough.",
    game: "Valorant",
    category: "Rank Boost",
  },
  {
    id: "r32",
    name: "Grace Lewis",
    initials: "GL",
    rankPath: "Iron to Bronze",
    stars: 5,
    date: "2025-10-28",
    comment:
      "Even for a small rank boost, they treated my order with the same care. Friendly support and quick completion.",
    game: "Call of Duty",
    category: "Rank Boost",
  },
  {
    id: "r33",
    name: "William Harris",
    initials: "WH",
    rankPath: "Silver to Platinum",
    stars: 5,
    date: "2025-10-15",
    comment:
      "Tried other services before but OGEdge is on another level. Clean gameplay, no bans, and great aftercare support.",
    game: "Apex Legends",
    category: "Rank Boost",
  },
  {
    id: "r34",
    name: "Emma Scott",
    initials: "ES",
    rankPath: "Gold IV to Gold I",
    stars: 5,
    date: "2025-10-02",
    comment:
      "Quick and painless. The whole process from payment to completion was seamless. Will be ordering again next season.",
    game: "League of Legends",
    category: "Ranked Wins",
  },
  {
    id: "r35",
    name: "Henry Adams",
    initials: "HA",
    rankPath: "Platinum to Diamond III",
    stars: 5,
    date: "2025-09-20",
    comment:
      "Reached my dream rank thanks to OGEdge. The booster was patient and skilled. Worth every dollar spent.",
    game: "Valorant",
    category: "Duo Boost",
  },
  {
    id: "r36",
    name: "Zara Okonkwo",
    initials: "ZO",
    rankPath: "Bronze to Silver",
    stars: 5,
    date: "2025-09-08",
    comment:
      "Really appreciate the level of security they provide. Account was completely safe throughout the entire boosting process.",
    game: "Dota 2",
    category: "MMR Boost",
  },
];

const REVIEWS_PER_PAGE = 12;

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-3xl p-6 md:p-8"
      style={{
        background:
          "linear-gradient(153deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        border: "1px solid #6d6d96",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-body text-xs font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #ff5c00 0%, #a32d05 100%)",
          }}
        >
          {review.initials}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="font-body text-base font-medium leading-6 text-white">
            {review.name}
          </span>
          <span className="font-body text-sm leading-5 text-brand-light">{review.rankPath}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {["s1", "s2", "s3", "s4", "s5"].slice(0, review.stars).map((id) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${review.id}-${id}`}
              src="/images/icons/reviews/star.svg"
              alt=""
              className="h-4 w-4"
            />
          ))}
        </div>
        <span className="font-body text-sm text-text-secondary">{review.date}</span>
      </div>

      <p className="font-body text-base leading-6 text-white">{review.comment}</p>

      <p className="font-body text-sm">
        <span className="text-text-secondary">Purchased: </span>
        <span className="text-white">{review.game}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-lg px-2 py-1 font-body text-xs font-medium"
          style={{
            background: "rgba(26,173,25,0.2)",
            color: "var(--success-main)",
          }}
        >
          Verified Purchase
        </span>
        <span
          className="rounded-lg px-2 py-1 font-body text-xs font-medium text-text-secondary"
          style={{ background: "rgba(81,79,79,0.2)" }}
        >
          {review.category}
        </span>
      </div>
    </div>
  );
}

const sortOptions = ["Highest Rating", "Lowest Rating", "Newest", "Oldest"];

export function ReviewList() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Highest Rating");

  const filteredReviews =
    activeFilter === "all"
      ? allReviews
      : allReviews.filter((r) => r.game === gameFilters.find((f) => f.id === activeFilter)?.label);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "Lowest Rating":
        return a.stars - b.stars;
      case "Newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "Oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      default:
        return b.stars - a.stars;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE));
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  const filterLabel =
    activeFilter === "all"
      ? "All Games"
      : (gameFilters.find((f) => f.id === activeFilter)?.label ?? "All Games");

  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-0">
        {/* Game filter tabs - horizontal scroll on mobile */}
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:-mx-0 md:flex-wrap md:px-0 md:pb-0">
          {gameFilters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentPage(1);
                }}
                className="flex h-[50px] shrink-0 items-center gap-2 rounded-2xl px-4"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: active ? "1px solid #ff975d" : "1px solid var(--dark-border)",
                  boxShadow: active
                    ? "0 4px 14px rgba(255,92,0,0.3)"
                    : "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                <span
                  className="whitespace-nowrap font-body text-base font-medium leading-6"
                  style={{ color: active ? "var(--brand-main)" : "white" }}
                >
                  {filter.label}
                </span>
                <span
                  className="rounded-md px-1 py-0.5 font-body text-xs font-medium text-white"
                  style={{ background: active ? "var(--brand-main)" : "var(--dark-border)" }}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort header */}
        <div className="mt-10 flex items-end justify-between gap-4">
          {/* Left: stacked on mobile, single line on desktop */}
          <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
            <span className="font-heading text-lg text-white/80 md:text-xl">
              Showing Reviews for
            </span>
            <span className="font-heading text-2xl font-medium text-brand-light">
              {filterLabel}
            </span>
          </div>
          {/* Right: stacked right-aligned on mobile, single line on desktop */}
          <div className="flex shrink-0 flex-col items-end gap-1 md:flex-row md:items-center md:gap-3">
            <span className="font-body text-sm text-white/80 md:text-base">Sort By</span>
            <div className="w-[160px] md:w-[200px]">
              <Dropdown
                label=""
                value={sortBy}
                options={sortOptions}
                onChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {paginatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-dark-border transition-colors hover:border-brand-light disabled:opacity-30"
              aria-label="Previous page"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/reviews/arrow-outlined.svg"
                alt=""
                className="h-5 w-3 -scale-x-100"
              />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`page-${i + 1}`}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg font-body text-base font-medium transition-colors"
                style={{
                  background: currentPage === i + 1 ? "var(--brand-main)" : "transparent",
                  color: "white",
                  border: currentPage === i + 1 ? "none" : "1px solid var(--dark-border)",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-dark-border transition-colors hover:border-brand-light disabled:opacity-30"
              aria-label="Next page"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/reviews/arrow-outlined.svg" alt="" className="h-5 w-3" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
