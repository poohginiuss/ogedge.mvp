"use client";

import { ContactMethods } from "@/components/about/ContactMethods";
import { RatingCards } from "@/components/about/RatingCards";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/PageHero";
import { useEffect, useState } from "react";
// Shared category chip + question bank. Both the dedicated `/faq` page
// and the marketing FAQ section (`components/sections/Faq.tsx`) render
// the same chip styling and pull from the same dataset, so designer
// tweaks land in both places automatically.
import { FaqCategoryChip } from "./FaqCategoryChip";
import { type CategoryId, type FaqItem, faqCategories, faqItems } from "./faqData";

const ITEMS_PER_PAGE = 8;

function FaqAccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl"
      style={{
        border: "1px solid #6d6d96",
        background:
          "linear-gradient(170deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
      }}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-6 py-5 text-left lg:px-8 lg:py-6"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-body text-base font-medium leading-7 text-white lg:text-xl">
          {item.question}
        </span>
        {isOpen ? (
          <ChevronUpIcon size={22} className="shrink-0 text-white/70" />
        ) : (
          <ChevronDownIcon size={22} className="shrink-0 text-white/70" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 lg:px-8 lg:pb-6">
          <p className="font-body text-sm leading-6 text-white/90 lg:text-base">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FaqPageContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("general");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFaqs = faqItems.filter((item) => item.categoryId === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE));
  const paginatedFaqs = filteredFaqs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const firstOnPageId = paginatedFaqs[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(
    () => faqItems.find((item) => item.categoryId === "general")?.id ?? null,
  );

  useEffect(() => {
    setOpenId(firstOnPageId);
  }, [firstOnPageId]);

  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our boosting services"
          backgroundImage="/images/heroes/faq-hero.png"
        />

        <section className="w-full bg-dark-main pb-16 pt-10 md:pb-20 md:pt-12">
          <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-0">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              <div className="min-w-0 flex-1 flex-col lg:max-w-[850px]">
                {/* Category chips — wrap onto multiple rows on every breakpoint
                    (designer flagged the mobile layout as "horizontal" / not
                    matching the design where chips should stack into rows;
                    msg #38). The chip itself lives in `FaqCategoryChip` so
                    the marketing FAQ section renders the exact same pill. */}
                <div className="flex flex-wrap gap-2">
                  {faqCategories.map((cat) => (
                    <FaqCategoryChip
                      key={cat.id}
                      id={cat.id}
                      label={cat.label}
                      count={cat.count}
                      active={activeCategory === cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setCurrentPage(1);
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  {paginatedFaqs.map((item) => (
                    <FaqAccordionRow
                      key={item.id}
                      item={item}
                      isOpen={openId === item.id}
                      onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                    />
                  ))}
                </div>

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
                        key={`faq-page-${i + 1}`}
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
                      <img
                        src="/images/icons/reviews/arrow-outlined.svg"
                        alt=""
                        className="h-5 w-3"
                      />
                    </button>
                  </div>
                )}
              </div>

              <aside className="flex w-full shrink-0 flex-col gap-8 lg:w-[315px]">
                <h2 className="font-heading text-2xl font-bold text-white">Have more questions?</h2>
                <ContactMethods />
                <RatingCards />
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
