"use client";

import { FaqCategoryChip } from "@/components/faq/FaqCategoryChip";
import { type CategoryId, faqCategories, faqItems } from "@/components/faq/faqData";
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * Cap on how many questions to surface inside the home/marketing teaser.
 * The full list lives on `/faq`; this section is meant to be a sampler so
 * a hard ceiling keeps the home page short on each category.
 */
const MAX_QUESTIONS_ON_HOME = 6;

export function Faq() {
  // Default to the most product-relevant category for the marketing
  // page. The previous hard-coded `"boosting"` tab still works because
  // it matches the `boosting` id from the shared `faqCategories`.
  const [activeTab, setActiveTab] = useState<CategoryId>("boosting");
  const [openIndex, setOpenIndex] = useState(0);

  const questions = useMemo(
    () => faqItems.filter((item) => item.categoryId === activeTab).slice(0, MAX_QUESTIONS_ON_HOME),
    [activeTab],
  );

  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        {/* Category chips reuse the same `FaqCategoryChip` rendered on the
            dedicated `/faq` page (icon + label + count badge, orange active
            state). The home teaser centers them; the `/faq` page
            left-aligns them — that's the only layout difference. Switching
            categories resets the open accordion so we never display a
            stale `openIndex` for a shorter list. */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0">
          {faqCategories.map((tab) => (
            <FaqCategoryChip
              key={tab.id}
              id={tab.id}
              label={tab.label}
              count={tab.count}
              active={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {questions.map((q, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={q.id}
                className="rounded-2xl"
                style={{
                  border: "1px solid #6d6d96",
                  background:
                    "linear-gradient(170deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-sm sm:text-base lg:text-xl font-medium leading-6 sm:leading-7 text-white pr-4">
                    {q.question}
                  </span>
                  {isOpen ? (
                    <ChevronUpIcon size={22} className="shrink-0 text-white/70" />
                  ) : (
                    <ChevronDownIcon size={22} className="shrink-0 text-white/70" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-5 lg:px-8 lg:pb-6">
                    <p className="font-body text-sm lg:text-base leading-6 text-white/90">
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white hover:text-brand-light transition-colors"
          >
            Explore all questions
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
