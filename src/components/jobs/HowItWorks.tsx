"use client";

import Image from "next/image";
import { useState } from "react";

const ICON = "/images/jobs/icons";

type Step = {
  title: string;
  description: string;
  number: string;
};

const steps: Step[] = [
  {
    title: "Apply",
    description: "Submit your application and hear back within 24 hours.",
    number: "01",
  },
  {
    title: "Get verified",
    description: "We review your profile and activate your account.",
    number: "02",
  },
  {
    title: "Start delivering",
    description: "Chat with customers, complete orders, and build your rating.",
    number: "03",
  },
  {
    title: "Get paid",
    description: "Receive payouts securely through multiple payment methods.",
    number: "04",
  },
];

type Benefit = {
  icon: string;
  title: string;
  description: string;
};

const benefitsByStep: Benefit[][] = [
  [
    {
      icon: `${ICON}/skill-level.svg`,
      title: "Showcase Your Skills",
      description:
        "Submit your application highlighting your highest in-game ranks and achievements.",
    },
    {
      icon: `${ICON}/anonymous.svg`,
      title: "Stay Anonymous",
      description:
        "Join our elite team while maintaining 100% professional anonymity from day one.",
    },
    {
      icon: `${ICON}/person-add.svg`,
      title: "Rapid Onboarding",
      description:
        "Our recruitment team reviews all applications to provide a status update within 24 hours.",
    },
  ],
  [
    {
      icon: `${ICON}/preview-circle.svg`,
      title: "Manual Review",
      description: "Dedicated managers review every profile manually",
    },
    {
      icon: `${ICON}/user-id-verify.svg`,
      title: "KYC Verification",
      description:
        "Complete identity verification (KYC) for platform security",
    },
    {
      icon: `${ICON}/person-pin.svg`,
      title: "Professional Interview",
      description:
        "Attend a professional interview to confirm skills and standards",
    },
  ],
  [
    {
      icon: `${ICON}/person-key.svg`,
      title: "Account Access",
      description: "Receive your verified booster account access",
    },
    {
      icon: `${ICON}/claim-hand.svg`,
      title: "Claim Orders",
      description: "Claim available orders that match your expertise",
    },
    {
      icon: `${ICON}/completed-solid.svg`,
      title: "Complete Services",
      description:
        "Complete services successfully and earn customer reviews",
    },
  ],
  [
    {
      icon: `${ICON}/schedule.svg`,
      title: "Payout Schedule",
      description: "Choose weekly or biweekly payout schedules",
    },
    {
      icon: `${ICON}/performance-increase.svg`,
      title: "Increase Rates",
      description:
        "Increase your rates through performance and experience",
    },
    {
      icon: `${ICON}/wallet-money.svg`,
      title: "Earn Additional Income",
      description:
        "Earn additional income through tips and annual bonuses",
    },
  ],
];

function StepCard({
  step,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  step: Step;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const borderColor =
    isActive || isHovered ? "border-[#ff975d]" : "border-[#7e7eb8]";
  const numberColor = isActive ? "text-[#ff5c00]" : "text-[#383852]";
  const shadowStyle =
    isActive || isHovered
      ? "shadow-[0px_4px_16px_0px_rgba(255,92,0,0.15)]"
      : "";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex h-full w-full cursor-pointer flex-col justify-between gap-1 rounded-[32px] border p-8 text-left backdrop-blur-[7px] transition-all duration-200 ${borderColor} ${shadowStyle}`}
      style={{
        backgroundImage:
          "linear-gradient(-67.6deg, rgba(23, 25, 31, 0.5) 0.2%, rgba(56, 56, 82, 0.5) 100%)",
      }}
    >
      <div>
        <p className="font-body text-[24px] font-semibold leading-[30px] text-[#ff5c00]">
          {step.title}
        </p>
        <p className="mt-1 font-body text-[16px] font-normal leading-[30px] text-white">
          {step.description}
        </p>
      </div>
      <p
        className={`text-right font-heading text-[64px] font-semibold leading-none transition-colors duration-200 ${numberColor}`}
      >
        {step.number}
      </p>
    </button>
  );
}

function BenefitItem({ benefit }: { benefit: Benefit }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,92,0,0.2)]">
        <Image
          src={benefit.icon}
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="font-body text-[24px] font-bold leading-[32px] text-[#ff5c00]">
          {benefit.title}
        </p>
        <p className="max-w-[360px] font-body text-[18px] font-normal leading-[28px] text-white">
          {benefit.description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const currentBenefits = benefitsByStep[activeStep];

  return (
    <section className="relative w-full overflow-hidden bg-dark-main">
      {/* Glow orbs on left side */}
      <div
        className="absolute -left-32 top-1/4 h-[400px] w-[300px] rounded-full bg-[#ff5c00] opacity-[0.25] blur-[120px]"
        aria-hidden="true"
      />
      {/* <div
        className="absolute -left-20 top-[60%] h-[250px] w-[250px] rounded-full bg-[#ff5c00] opacity-[0.05] blur-[100px]"
        aria-hidden="true"
      /> */}

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-14 px-6 pb-16 pt-24 md:px-12 lg:px-0">
        {/* Title */}
        <h2 className="font-heading text-[30px] font-bold leading-[38px] text-[#d9d9d9]">
          How it Works
        </h2>

        {/* Step cards row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-1 items-center gap-6"
            >
              <StepCard
                step={step}
                isActive={activeStep === i}
                isHovered={hoveredStep === i}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              />
              {i < steps.length - 1 && (
                <div className="hidden shrink-0 lg:block">
                  <Image
                    src={`${ICON}/arrow-step.svg`}
                    alt=""
                    width={20}
                    height={20}
                    className="rotate-90"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits row — changes when active step changes */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {currentBenefits.map((b) => (
            <BenefitItem key={b.title} benefit={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
