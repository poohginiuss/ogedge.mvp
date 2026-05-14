"use client";

import Image from "next/image";
import { useState } from "react";

type Step = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: "choose",
    icon: "/images/home/steps/shopping-cart.svg",
    title: "Choose Your Game & Target Rank",
    description:
      "Select your game — Valorant, League of Legends, Overwatch 2, or EA FC — and customize your rank, leveling, or coaching service. Our real-time calculator shows your exact price instantly. No surprises.",
  },
  {
    id: "checkout",
    icon: "/images/home/steps/secure-payment.svg",
    title: "Checkout Securely in Seconds",
    description:
      "We safely support Visa, Mastercard, PayPal, Crypto, and more. Every transaction is SSL-encrypted and your payment data is never stored on our servers. The price you see is the price you pay — no hidden fees, ever.",
  },
  {
    id: "watch",
    icon: "/images/home/steps/steps-icon.svg",
    title: "Watch Your Rank Climb Live",
    description:
      "Access your private dashboard immediately after checkout. Track your boost in real-time, chat directly with your assigned Pro, and get notified the moment your target rank is reached.",
  },
];

export function HomeSteps() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/steps/steps-bg.png"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Mobile layout: centered, stacked */}
      <div className="relative z-10 flex flex-col items-center px-6 py-16 lg:hidden">
        <h2 className="text-center font-heading text-2xl font-bold text-white md:text-3xl">
          Get your service now in
          <br />3 simple steps!
        </h2>

        <div className="mt-10 flex flex-col gap-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.icon} alt="" className="h-9 w-9" loading="lazy" />
              <h3 className="mt-4 font-body text-lg font-bold leading-7 text-brand-light">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[380px] font-body text-sm leading-6 text-white">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-12 flex items-center gap-6"
          aria-label="Watch the video"
          onClick={() => setVideoOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/steps/play-icon.svg"
            alt=""
            className="h-[100px] w-[100px]"
            loading="lazy"
          />
          <span className="font-body text-xl font-semibold leading-none text-white">
            WATCH
            <br />
            THE VIDEO
          </span>
        </button>
      </div>

      {/* Desktop layout: side-by-side */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1280px] items-center justify-between gap-12 px-6 py-24 md:px-12 lg:flex lg:px-0">
        <div className="flex w-[716px] flex-col gap-12">
          <h2 className="font-heading text-4xl font-bold text-white">
            Get your service now in 3 simple steps!
          </h2>

          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-10">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.icon}
                    alt=""
                    className="h-[40px] w-[40px] object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-body text-lg font-bold leading-7 text-brand-light">
                    {step.title}
                  </h3>
                  <p className="font-body text-lg leading-7 text-white">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-8"
          aria-label="Watch the video"
          onClick={() => setVideoOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/steps/play-icon.svg"
            alt=""
            className="h-[150px] w-[150px] transition-transform hover:scale-105"
            loading="lazy"
          />
          <span className="font-body text-2xl font-semibold leading-none text-white">
            WATCH
            <br />
            THE VIDEO
          </span>
        </button>
      </div>
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setVideoOpen(false)}
        >
          <div
            className="relative w-[90vw] max-w-[900px] rounded-2xl bg-dark-surface p-4"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
          >
            <button
              type="button"
              className="absolute -top-10 right-0 font-body text-sm font-bold uppercase text-white/80 hover:text-white"
              onClick={() => setVideoOpen(false)}
            >
              Close
            </button>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-black">
              <p className="font-body text-lg text-white/60">Video coming soon</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
