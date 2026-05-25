"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    label: "Apply",
    image: "/images/affiliate/how-it-works-step1.png",
    glowColor: "#ff5c00",
    details: [
      {
        icon: "/images/affiliate/icon-form-sparkle.svg",
        title: "Fill Application",
        description:
          "Fill out the affiliate application with your details and channels.",
      },
      {
        icon: "/images/affiliate/icon-user-talk.svg",
        title: "Configure",
        description:
          "Tell us how you plan to promote \u2014 content, community, social, or direct referrals.",
      },
      {
        icon: "/images/affiliate/icon-preview.svg",
        title: "Review Process",
        description:
          "Every application is reviewed personally by our team.",
      },
    ],
  },
  {
    label: "Get approved",
    image: "/images/affiliate/how-it-works-step2.png",
    glowColor: "#79bf70",
    details: [
      {
        icon: "/images/affiliate/icon-review.svg",
        title: "Application Review",
        description:
          "Our team reviews your application and evaluates your reach and audience fit.",
      },
      {
        icon: "/images/affiliate/icon-dashboard.svg",
        title: "Get Access",
        description:
          "Once approved, you get instant access to your affiliate dashboard.",
      },
      {
        icon: "/images/affiliate/icon-link.svg",
        title: "Immediate Access",
        description:
          "No waiting period \u2014 your referral link and discount codes are ready immediately.",
      },
    ],
  },
  {
    label: "Start promoting",
    image: "/images/affiliate/how-it-works-step3.png",
    glowColor: "#d68547",
    details: [
      {
        icon: "/images/affiliate/icon-share.svg",
        title: "Share Referral Link",
        description:
          "Share your unique referral link across your channels, content, or community.",
      },
      {
        icon: "/images/affiliate/icon-discount.svg",
        title: "Give Discount Codes",
        description:
          "Give your audience custom discount codes worth up to 15% off their order.",
      },
      {
        icon: "/images/affiliate/icon-click.svg",
        title: "Click Tracking",
        description:
          "Every click is tracked with a 90-day cookie \u2014 if they buy within 90 days, you get paid.",
      },
    ],
  },
  {
    label: "Get paid",
    image: "/images/affiliate/how-it-works-step4.png",
    glowColor: "#eccf72",
    details: [
      {
        icon: "/images/affiliate/icon-money-bag.svg",
        title: "Earn Commission",
        description:
          "Earn between 5% and 20% commission on every referred order.",
      },
      {
        icon: "/images/affiliate/icon-wallet.svg",
        title: "Withdraw",
        description:
          "No minimum payout threshold \u2014 withdraw any amount, anytime.",
      },
      {
        icon: "/images/affiliate/icon-money-settings.svg",
        title: "Payouts",
        description:
          "Payouts via PayPal, crypto, or a custom method that works for you.",
      },
    ],
  },
];

function DetailCards({
  details,
  compact,
}: {
  details: (typeof steps)[0]["details"];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex flex-col gap-4 pb-2 pt-4" : "flex flex-col gap-6"}>
      {details.map((d) => (
        <div key={d.title} className={compact ? "flex flex-col gap-2" : "flex flex-col gap-4"}>
          <div
            className={`flex items-center justify-center rounded-full bg-brand-main/20 ${
              compact ? "h-10 w-10" : "h-16 w-16"
            }`}
          >
            <Image
              src={d.icon}
              alt=""
              width={compact ? 20 : 32}
              height={compact ? 20 : 32}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3
              className={`font-body font-bold text-brand-main ${
                compact ? "text-base leading-7" : "text-2xl leading-8"
              }`}
            >
              {d.title}
            </h3>
            <p
              className={`font-body text-white ${
                compact ? "text-sm leading-5" : "text-lg leading-7"
              }`}
            >
              {d.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AffiliateHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 lg:px-0 lg:py-[120px]">
        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:flex lg:items-center lg:gap-16">
          {/* Left: Character illustration */}
          <div className="relative h-[660px] w-[500px] shrink-0">
            <div
              className="gpu-blur absolute left-[32%] top-[38%] h-[256px] w-[290px] rounded-[128px] opacity-60 blur-[107px] transition-colors duration-500"
              style={{ backgroundColor: current.glowColor }}
            />
            <div className="absolute bottom-[25px] left-[32%] h-[100px] w-[320px] bg-black blur-[32px]" />
            <Image
              src={current.image}
              alt="How it works"
              fill
              className="object-contain object-bottom"
            />
          </div>

          {/* Right: Title + Steps + Details */}
          <div className="flex flex-1 flex-col gap-20">
            <h2 className="font-heading text-[36px] font-bold text-white">
              How it Works
            </h2>

            <div className="flex gap-20">
              {/* Step list */}
              <div className="flex flex-col gap-6">
                {steps.map((step, i) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`flex w-[280px] cursor-pointer items-center gap-2 rounded-[32px] p-6 text-left backdrop-blur-[7px] transition-all duration-300 hover:border-dark-light/50 active:scale-[0.98] ${
                      i === activeStep
                        ? "border border-dark-light"
                        : "border border-transparent"
                    }`}
                    style={
                      i === activeStep
                        ? {
                            backgroundImage:
                              "linear-gradient(-37deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                          }
                        : undefined
                    }
                  >
                    {i === activeStep && (
                      <Image
                        src="/images/affiliate/icon-step-arrow.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="-rotate-90 -scale-y-100"
                      />
                    )}
                    <span
                      className={`whitespace-nowrap font-body text-2xl ${
                        i === activeStep
                          ? "font-bold text-brand-main"
                          : "font-medium text-white"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Detail cards for active step */}
              <div className="flex-1">
                <DetailCards details={current.details} />
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT (accordion) ── */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* Character image */}
          <div className="relative mx-auto h-[280px] w-full max-w-[340px]">
            <div
              className="gpu-blur absolute left-[28%] top-[40%] h-[160px] w-[180px] rounded-[90px] opacity-50 blur-[70px] transition-colors duration-500"
              style={{ backgroundColor: current.glowColor }}
            />
            <Image
              src={current.image}
              alt="How it works"
              fill
              className="object-contain object-bottom"
            />
          </div>

          <h2 className="font-heading text-[28px] font-bold leading-[36px] text-white">
            How it Works
          </h2>

          {/* Accordion steps */}
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <div key={step.label}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`flex w-[70%] cursor-pointer items-center gap-3 rounded-[24px] p-4 text-left backdrop-blur-[7px] transition-all duration-300 hover:border-dark-light/50 active:scale-[0.98] ${
                      isActive
                        ? "border border-dark-light"
                        : "border border-transparent"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundImage:
                              "linear-gradient(-37deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                          }
                        : undefined
                    }
                  >
                    <Image
                      src="/images/affiliate/icon-step-arrow.svg"
                      alt=""
                      width={16}
                      height={16}
                      className={`-rotate-90 -scale-y-100 ${
                        isActive ? "" : "opacity-40"
                      }`}
                    />
                    <span
                      className={`font-body text-lg ${
                        isActive
                          ? "font-bold text-brand-main"
                          : "font-medium text-white"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>

                  {isActive && (
                    <div className="pl-4">
                      <DetailCards details={step.details} compact />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
