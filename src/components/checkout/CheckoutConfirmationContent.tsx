"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

const NEXT_STEPS = [
  {
    icon: "/images/icons/checkout/confirm-booster.svg",
    iconSize: { w: 63, h: 64 },
    title: "Booster Assigned",
    description: "A booster will be assigned shortly",
  },
  {
    icon: "/images/icons/checkout/confirm-login.svg",
    iconSize: { w: 64, h: 62 },
    title: "Login",
    description: "Provide your login credentials in the order area",
  },
  {
    icon: "/images/icons/checkout/confirm-track.svg",
    iconSize: { w: 61, h: 50 },
    title: "Track Order",
    description: "Track your order progress in real-time",
  },
  {
    icon: "/images/icons/checkout/confirm-review.svg",
    iconSize: { w: 63, h: 63 },
    title: "Review",
    description: "Rate your experience",
  },
];

export function CheckoutConfirmationContent() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-16 px-4 py-16 lg:px-0 lg:py-24">
        {/* Success message */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <Image
              src="/images/icons/checkout/confirm-success.svg"
              alt="Success"
              width={160}
              height={160}
              className="h-[120px] w-[120px] lg:h-[160px] lg:w-[160px]"
            />
            <div className="mt-2 flex flex-col items-center gap-2 text-center">
              <h1 className="font-heading text-2xl font-semibold text-white lg:text-4xl">
                Order #1234 Created!
              </h1>
              <p className="max-w-[602px] font-body text-lg font-normal text-white lg:text-2xl">
                Please check your email for the confirmation link to set your password to the
                Members area
              </p>
              <p className="max-w-[467px] font-body text-sm font-normal text-white/80 lg:text-base">
                This process usually takes less a few minutes. If you don&apos;t recive a
                confirmation email please contact us for support or use our Live Support. However,
                we would like to ask you first to check your spam folder.
              </p>
            </div>
          </div>
          <Button
            href="/dashboard"
            variant="primary"
            size="sm"
            className="w-[230px] whitespace-nowrap px-8 py-6"
          >
            Follow Order
          </Button>
        </div>

        {/* What happens next */}
        <div className="flex w-full flex-col items-center gap-8">
          <h2 className="w-full font-heading text-2xl font-semibold text-white">What happens next</h2>

          {/* Desktop: horizontal cards with hover effect */}
          <div className="hidden xl:flex xl:items-stretch xl:justify-center xl:gap-0">
            {NEXT_STEPS.map((step, i) => (
              <div key={step.title} className="flex items-center">
                <div className="group/card relative flex h-full w-[269px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-transparent bg-[rgba(56,56,82,0.3)] p-8 transition-all duration-300 hover:border-[#ff975d] hover:shadow-[0_0_32px_rgba(255,151,93,0.35)]">
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, rgba(255,151,93,0.15) 0%, rgba(255,92,0,0.12) 50%, rgba(163,45,5,0.1) 100%)",
                    }}
                  />
                  <Image
                    src={step.icon}
                    alt=""
                    width={step.iconSize.w}
                    height={step.iconSize.h}
                    className="relative z-10 h-16 w-16 object-contain"
                  />
                  <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                    <span className="font-heading text-2xl font-semibold leading-[30px] text-[#ff5c00]">
                      {step.title}
                    </span>
                    <p className="text-center font-body text-base font-normal leading-6 text-white">
                      {step.description}
                    </p>
                  </div>
                </div>
                {i < NEXT_STEPS.length - 1 && (
                  <div className="flex w-[44px] shrink-0 items-center justify-center">
                    <Image
                      src="/images/icons/checkout/confirm-arrow.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="-rotate-90 -scale-y-100"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: vertical list with horizontal card layout */}
          <div className="flex flex-col gap-4 xl:hidden">
            {NEXT_STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <div className="flex w-full items-center gap-4 rounded-2xl bg-[rgba(56,56,82,0.3)] p-5">
                  <Image
                    src={step.icon}
                    alt=""
                    width={step.iconSize.w}
                    height={step.iconSize.h}
                    className="h-12 w-12 shrink-0 object-contain"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-heading text-base font-semibold text-[#ff5c00]">
                      {step.title}
                    </span>
                    <p className="font-body text-sm font-normal text-white">{step.description}</p>
                  </div>
                </div>
                {i < NEXT_STEPS.length - 1 && (
                  <Image
                    src="/images/icons/checkout/confirm-arrow.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="rotate-180"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
