"use client";

import Image from "next/image";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Order Comes In",
    description:
      "A customer places their order on the site. It appears instantly in your dashboard with all the details: game, current rank, target rank, and any special requests.",
  },
  {
    number: "02",
    title: "Payout Is Visible Upfront",
    description:
      "Every order shows exactly what you'll earn before you accept it. No hidden fees, no surprises. Tips from customers are added on top.",
  },
  {
    number: "03",
    title: "Track Your Progress",
    description:
      "Each order moves through live statuses — Pending, In Progress, Paused, Completed — so both you and the customer always know where things stand.",
  },
  {
    number: "04",
    title: "Stay in the Loop Automatically",
    description:
      "You get notified the moment a new order is available, when a customer sends a message, or when anything changes. No need to keep checking.",
  },
  {
    number: "05",
    title: "Complete, Verify, Get Paid",
    description:
      "Once you finish the order, it goes through verification. The customer leaves a review, and your earnings are added to your balance ready for withdrawal.",
  },
];

function DesktopStep({ step, index }: { step: ProcessStep; index: number }) {
  const isEven = index % 2 !== 0;

  if (isEven) {
    return (
      <div className="flex w-full items-start justify-end gap-6">
        <div className="flex max-w-[387px] flex-col gap-4 pt-3">
          <h3 className="font-heading text-[36px] font-bold leading-[45px] text-[#ff5c00]">
            {step.title}
          </h3>
          <p className="font-body text-[16px] font-normal leading-[24px] text-[#d9d9d9]">
            {step.description}
          </p>
        </div>
        <p className="font-heading text-[164px] font-bold leading-none text-[#ff5c00]">
          {step.number}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-6">
      <p className="font-heading text-[164px] font-bold leading-none text-[#ff5c00]">
        {step.number}
      </p>
      <div className="flex max-w-[374px] flex-col gap-4 pt-9">
        <h3 className="font-heading text-[36px] font-bold leading-[45px] text-[#ff5c00]">
          {step.title}
        </h3>
        <p className="font-body text-[16px] font-normal leading-[24px] text-[#d9d9d9]">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function OrderProcess() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-12 lg:px-0 lg:py-[120px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-[36px] font-bold leading-[60px] text-white md:text-[48px]">
            Order Process
          </h2>
          <p className="mx-auto mt-4 max-w-[765px] font-body text-[16px] font-normal leading-[30px] text-[#d9d9d9] md:text-[18px]">
            We offer a variety of ways for customers to purchase services from this site &amp;
            others. When a new order is available we make it available on Discord or it may be
            automatically assigned to you.
          </p>
        </div>

        {/* Desktop zigzag with dashed curve */}
        <div className="relative hidden lg:block">
          {/* Dashed curve SVG behind the steps */}
          <div className="absolute left-[25%] top-[60px] h-full w-[50%]">
            <Image
              src="/images/jobs/dashed-curve.svg"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>

          <div className="relative flex flex-col gap-6">
            {processSteps.map((step, i) => (
              <DesktopStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile: alternating zigzag */}
        <div className="flex flex-col gap-10 lg:hidden">
          {processSteps.map((step, i) => {
            const isEven = i % 2 !== 0;
            return (
              <div key={step.number} className={`flex items-center gap-4 ${isEven ? "flex-row-reverse" : ""}`}>
                <p className="shrink-0 font-heading text-[80px] font-bold leading-none text-[#ff5c00] md:text-[100px]">
                  {step.number}
                </p>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-[24px] font-bold leading-[32px] text-[#ff5c00] md:text-[30px]">
                    {step.title}
                  </h3>
                  <p className="font-body text-[14px] font-normal leading-[22px] text-[#d9d9d9] md:text-[16px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
