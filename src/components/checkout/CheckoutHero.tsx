import Image from "next/image";

const STEPS = [
  { num: 1, label: "Your Cart" },
  { num: 2, label: "Details" },
  { num: 3, label: "Payment" },
  { num: 4, label: "Confirmation" },
] as const;

const BADGES = [
  { label: "Secure", icon: "/images/icons/checkout/secure.svg" },
  { label: "Instant", icon: "/images/icons/checkout/thunder.svg" },
  { label: "Guaranteed", icon: "/images/icons/checkout/check-one.svg" },
] as const;

type CheckoutHeroProps = {
  activeStep: number;
};

export function CheckoutHero({ activeStep }: CheckoutHeroProps) {
  return (
    <section className="w-full bg-dark-bg pt-8 lg:pt-[120px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 px-6 lg:gap-12 lg:px-0">
        {/* Title + Trust Badges */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-heading text-[28px] font-bold text-white lg:text-[32px]">Checkout</h1>
          <div className="flex items-center gap-4">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-3xl px-4 py-3 font-body text-sm font-medium text-white"
                style={{
                  backgroundImage: "linear-gradient(-43deg, #17191f, #383852)",
                }}
              >
                <Image src={badge.icon} alt="" width={20} height={20} className="h-5 w-5" />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden w-full lg:flex">
          <div className="flex w-full items-center gap-6">
            {STEPS.map((step, i) => {
              const isActive = step.num === activeStep;
              const isLast = i === STEPS.length - 1;
              return (
                <div key={step.num} className="contents">
                  <div
                    className="flex flex-1 flex-col items-center gap-1 rounded-3xl px-8 py-6"
                    style={{ background: "rgba(56,56,82,0.3)" }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-2xl font-body text-sm font-bold"
                      style={{
                        background: isActive ? "#ff5c00" : "rgba(255,92,0,0.4)",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      className="whitespace-nowrap font-body text-2xl font-semibold leading-[30px]"
                      style={{
                        color: isActive ? "#ff5c00" : "rgba(255,92,0,0.4)",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {!isLast && (
                    <Image
                      src="/images/icons/checkout/arrow-right.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="shrink-0 rotate-90"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Stepper */}
        <div className="flex w-full flex-col gap-3 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full font-body text-xs font-bold text-white"
                style={{ background: "#ff5c00" }}
              >
                {activeStep}
              </span>
              <span className="font-body text-sm font-semibold text-[#ff5c00]">
                {STEPS[activeStep - 1].label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {STEPS.filter((s) => s.num !== activeStep).map((step) => (
                <span
                  key={step.num}
                  className="flex h-6 w-6 items-center justify-center rounded-full font-body text-xs font-bold"
                  style={{
                    background: "rgba(255,92,0,0.4)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {step.num}
                </span>
              ))}
            </div>
          </div>
          <div className="h-0.5 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#ff5c00] transition-all"
              style={{ width: `${(activeStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
