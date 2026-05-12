"use client";

import { ArrowRightIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/PageHero";
import { Dropdown } from "@/components/ui/Dropdown";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  type BlogArticle,
  blogGames,
  blogTopicFilters,
  getFeaturedBlogArticle,
  getListingBlogArticles,
  getMostPopularBlogArticles,
} from "./blogData";

function getCategoryStyles(category: BlogArticle["category"]) {
  switch (category) {
    case "Guides":
      return "bg-[rgba(26,173,25,0.2)] text-[#1aad19]";
    case "Support":
      return "bg-[rgba(250,70,9,0.2)] text-brand-main";
    case "News":
      return "bg-[rgba(102,84,241,0.2)] text-[#6654f1]";
  }
}

type FilterId = "All News" | BlogArticle["category"];

function FilterIcon({ label }: { label: string }) {
  if (label === "All News") {
    return <img src="/images/blog/icons/all-news.svg" alt="" className="h-5 w-5" loading="lazy" />;
  }

  if (label === "News") {
    return <img src="/images/blog/icons/news.svg" alt="" className="h-5 w-5" loading="lazy" />;
  }

  if (label === "Guides") {
    return (
      <span className="relative h-5 w-5">
        <img
          src="/images/blog/icons/guides-left.svg"
          alt=""
          className="absolute left-[1px] top-[1px] h-[18px] w-[9px]"
          loading="lazy"
        />
        <img
          src="/images/blog/icons/guides-right.svg"
          alt=""
          className="absolute left-[8px] top-[5px] h-[14px] w-[10px]"
          loading="lazy"
        />
      </span>
    );
  }

  return <img src="/images/blog/icons/support.svg" alt="" className="h-5 w-5" loading="lazy" />;
}

function FilterChip({
  label,
  count,
  accent,
  active = false,
  onClick,
}: {
  label: string;
  count: number;
  accent: "orange" | "slate" | "green";
  active?: boolean;
  onClick: () => void;
}) {
  const accentMap = {
    orange: {
      badge: active ? "bg-brand-main text-white" : "bg-[#383852] text-white",
      border: active
        ? "border-[#ff975d] shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
        : "border-[#383852]",
      text: active ? "text-brand-main" : "text-white",
    },
    slate: {
      badge: active ? "bg-brand-main text-white" : "bg-[#383852] text-white",
      border: active
        ? "border-[#ff975d] shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
        : "border-[#383852]",
      text: active ? "text-brand-main" : "text-white",
    },
    green: {
      badge: active ? "bg-brand-main text-white" : "bg-[#383852] text-white",
      border: active
        ? "border-[#ff975d] shadow-[0_4px_14px_rgba(255,92,0,0.3)]"
        : "border-[#383852]",
      text: active ? "text-brand-main" : "text-white",
    },
  } as const;

  const styles = accentMap[accent];

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-[50px] items-center gap-2 rounded-2xl border bg-black/20 px-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all hover:border-[#ff975d]/70 hover:bg-[#232330] ${styles.border}`}
    >
      <FilterIcon label={label} />
      <span className={`font-body text-sm font-medium md:text-base ${styles.text}`}>{label}</span>
      <span className={`rounded-md px-1 py-0.5 font-body text-xs font-medium ${styles.badge}`}>
        {count}
      </span>
    </button>
  );
}

function ReadMoreLink({
  href,
  highlighted = false,
  asSpan = false,
}: {
  href: string;
  highlighted?: boolean;
  asSpan?: boolean;
}) {
  const className = `inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] ${
    highlighted ? "text-[#ff975d]" : "text-white"
  } transition-colors hover:text-brand-light`;

  if (asSpan) {
    return (
      <span className={className}>
        Read More
        <ArrowRightIcon size={18} />
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      Read More
      <ArrowRightIcon size={18} />
    </Link>
  );
}

function FeaturedBlogCard({ article }: { article: BlogArticle }) {
  return (
    <article className="group flex flex-col gap-6 rounded-3xl p-0">
      <Link
        href={`/blog/${article.slug}`}
        className="relative aspect-[430/240] overflow-hidden rounded-3xl"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.01]"
        />
      </Link>
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href={`/blog/${article.slug}`}
            className="font-body text-xl font-bold leading-8 text-white transition-colors hover:text-brand-light md:max-w-[620px] md:text-2xl"
          >
            {article.title}
          </Link>
          <span
            className={`inline-flex self-start rounded-lg px-2 py-2 font-body text-xs font-medium ${getCategoryStyles(
              article.category,
            )}`}
          >
            {article.category}
          </span>
        </div>
        <p className="font-body text-sm leading-5 text-white/80 md:text-base md:leading-6">
          {article.excerpt}
        </p>
        <ReadMoreLink href={`/blog/${article.slug}`} />
      </div>
    </article>
  );
}

function BlogListCard({ article }: { article: BlogArticle }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#383852] bg-transparent p-6 transition-all hover:bg-[linear-gradient(104deg,#383852_0.33%,#232330_50.72%,#17191f_101.1%)]">
      <div className="flex flex-col gap-6 lg:flex-row">
        <Link
          href={`/blog/${article.slug}`}
          className="relative h-[202px] w-full overflow-hidden rounded-2xl lg:h-auto lg:w-[350px] lg:shrink-0"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 350px"
            className="object-cover"
          />
        </Link>
        <div className="flex flex-1 flex-col gap-4">
          <span
            className={`inline-flex self-start rounded-lg px-2 py-2 font-body text-xs font-medium ${getCategoryStyles(
              article.category,
            )}`}
          >
            {article.category}
          </span>
          <Link
            href={`/blog/${article.slug}`}
            className="font-body text-lg font-bold leading-7 text-white transition-colors hover:text-brand-light md:text-2xl md:leading-8"
          >
            {article.title}
          </Link>
          <p className="font-body text-sm leading-5 text-white/80 md:text-base md:leading-6">
            {article.excerpt}
          </p>
          <ReadMoreLink href={`/blog/${article.slug}`} highlighted />
        </div>
      </div>
    </article>
  );
}

function MostPopularCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="flex flex-col gap-4 rounded-3xl p-4 transition-colors hover:bg-white/[0.02]"
    >
      <div className="relative h-[175px] overflow-hidden rounded-3xl">
        <Image
          src={article.image}
          alt={article.title}
          fill
          unoptimized
          sizes="315px"
          className="object-cover"
        />
      </div>
      <h3 className="font-body text-base font-medium leading-6 text-white">{article.title}</h3>
    </Link>
  );
}

export function BlogPageContent() {
  const [selectedFilter, setSelectedFilter] = useState<FilterId>("All News");
  const [selectedGame, setSelectedGame] = useState("Escape From Tarkov");
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortOption, setSortOption] = useState("Most Popular");
  const featuredArticle = getFeaturedBlogArticle();
  const mostPopularArticles = getMostPopularBlogArticles();
  const sortOptions = ["Most Popular", "Newest First", "Oldest First", "A-Z"] as const;
  const listingArticles = useMemo(() => {
    const baseArticles = getListingBlogArticles();
    const filteredArticles =
      selectedFilter === "All News"
        ? baseArticles
        : baseArticles.filter((article) => article.category === selectedFilter);

    switch (sortOption) {
      case "A-Z":
        return [...filteredArticles].sort((a, b) => a.title.localeCompare(b.title));
      case "Oldest First":
        return [...filteredArticles].reverse();
      case "Newest First":
      case "Most Popular":
      default:
        return filteredArticles;
    }
  }, [selectedFilter, sortOption]);

  const paginationItems = [1, 2, 3, "...", 12] as const;

  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero
          title="Blog"
          subtitle="Featured News"
          backgroundImage="/images/blog/blog-hero.png"
        />

        <section className="w-full bg-dark-main">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 py-12 md:px-12 lg:px-0 lg:py-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {blogTopicFilters.map((filter, index) => (
                    <FilterChip
                      key={filter.label}
                      label={filter.label}
                      count={filter.count}
                      accent={filter.accent}
                      active={selectedFilter === filter.label}
                      onClick={() => {
                        setSelectedFilter(filter.label as FilterId);
                        setSelectedPage(1);
                      }}
                    />
                  ))}
                </div>

                <div className="hidden items-center gap-6 lg:flex">
                  <p className="font-body text-base font-medium text-white">Sort By</p>
                  <Dropdown
                    label=""
                    value={sortOption}
                    options={[...sortOptions]}
                    onChange={setSortOption}
                    className="w-[180px]"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 lg:hidden">
                <div>
                  <p className="font-body text-sm leading-5 text-white/80">Showing Reviews for</p>
                  <p className="font-body text-xl font-medium leading-[30px] text-[#ff975d]">
                    All Games
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-body text-sm leading-5 text-white/80">Sort By</p>
                  <Dropdown
                    label=""
                    value={sortOption}
                    options={[...sortOptions]}
                    onChange={setSortOption}
                    className="min-w-[180px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex w-full flex-col gap-6 lg:max-w-[850px]">
                <FeaturedBlogCard article={featuredArticle} />

                <div className="flex flex-col gap-4">
                  {listingArticles.map((article) => (
                    <BlogListCard key={article.slug} article={article} />
                  ))}
                </div>

                <div className="flex items-center gap-1 self-center">
                  <button
                    type="button"
                    disabled={selectedPage === 1}
                    onClick={() => setSelectedPage((page) => Math.max(1, page - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#383852] bg-black/20 text-white/50 transition-colors disabled:opacity-30"
                  >
                    <ArrowRightIcon size={16} className="rotate-180" />
                  </button>
                  {paginationItems.map((item) =>
                    typeof item === "number" ? (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedPage(item)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                          selectedPage === item
                            ? "border-brand-main bg-brand-main text-white"
                            : "border-[#383852] bg-black/20 text-white/50 hover:bg-[#232330] hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        disabled
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#383852] bg-black/20 text-white/50"
                      >
                        {item}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    disabled={selectedPage === 12}
                    onClick={() => setSelectedPage((page) => Math.min(12, page + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#383852] bg-black/20 text-white/50 transition-colors hover:bg-[#232330] hover:text-white disabled:opacity-30"
                  >
                    <ArrowRightIcon size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-6 lg:hidden">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">
                    Most Popular
                  </h2>
                  <div className="flex flex-col gap-1">
                    {mostPopularArticles.map((article) => (
                      <MostPopularCard key={article.slug} article={article} />
                    ))}
                  </div>
                </div>
              </div>

              <aside className="hidden w-[315px] shrink-0 flex-col gap-12 lg:flex">
                <div className="flex flex-col gap-6">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">Games</h2>
                  <div className="flex flex-col">
                    {blogGames.map((game) => (
                      <button
                        key={game.label}
                        type="button"
                        onClick={() => setSelectedGame(game.label)}
                        className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#383852] ${
                          selectedGame === game.label ? "bg-[#383852]" : ""
                        }`}
                      >
                        <span className="flex-1 font-body text-base font-medium leading-6 text-white">
                          {game.label}
                        </span>
                        <span className="rounded-md bg-[#383852] px-1 py-0.5 font-body text-xs font-medium text-white">
                          {game.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h2 className="font-body text-2xl font-medium leading-8 text-white">
                    Most Popular
                  </h2>
                  <div className="flex flex-col gap-1">
                    {mostPopularArticles.map((article) => (
                      <MostPopularCard key={article.slug} article={article} />
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
