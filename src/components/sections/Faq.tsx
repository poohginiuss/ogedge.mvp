"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  { id: "getting-started", label: "Getting Started" },
  { id: "boosting", label: "Boosting Related Questions" },
  { id: "payment", label: "Payment Related Questions" },
];

type Question = {
  question: string;
  answer: string;
};

const questions: Question[] = [
  {
    question: "How does boosting work?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Can I play with my booster?",
    answer:
      "Yes, we offer duo queue options where you can play alongside your booster. This way, you can learn from their gameplay while ranking up together.",
  },
  {
    question:
      "How much do I have to wait for my order to start after buying?",
    answer:
      "Most orders start within 2 hours of purchase. Priority orders begin even faster, often within 30 minutes.",
  },
  {
    question: "How do you ensure the safety of my account?",
    answer:
      "We use VPN protection matched to your region, offline mode, and strict privacy protocols. Our boosters are vetted professionals who follow security guidelines at all times.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After purchasing, you will be redirected to your personal dashboard where you can track real-time progress, chat with your booster, and view order updates.",
  },
  {
    question:
      "Can I choose a specific booster and the roles or heroes which I want him to play?",
    answer:
      "Absolutely. You can specify preferred roles, agents, and even request a specific booster from our roster if they are available.",
  },
];

export function Faq() {
  const [activeTab, setActiveTab] = useState("boosting");
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full bg-bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
        <h2 className="text-center font-lexend text-3xl md:text-4xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:gap-8">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`font-urbanist text-base lg:text-xl uppercase tracking-[0.4px] transition-all ${
                  active
                    ? "rounded-3xl px-6 py-4 lg:px-8 lg:py-6 font-bold text-white"
                    : "px-2 py-2 font-semibold text-white/70 hover:text-white"
                }`}
                style={
                  active
                    ? {
                        background: "rgba(23,25,31,0.5)",
                        border: "2px solid #ff975d",
                        backdropFilter: "blur(3px)",
                        boxShadow: "0 4px 44px rgba(255,92,0,0.25)",
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {questions.map((q, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={q.question}
                className="rounded-2xl"
                style={{
                  border: "1px solid #6d6d96",
                  background:
                    "linear-gradient(170deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 lg:px-8 lg:py-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-urbanist text-base lg:text-xl font-medium leading-7 text-white pr-4">
                    {q.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={22} className="shrink-0 text-white/70" />
                  ) : (
                    <ChevronDown size={22} className="shrink-0 text-white/70" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 lg:px-8 lg:pb-6">
                    <p className="font-urbanist text-sm lg:text-base leading-6 text-white/90">
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 font-urbanist text-base font-bold uppercase tracking-[0.32px] text-white hover:text-brand-light transition-colors"
          >
            Explore all questions
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
