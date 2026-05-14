import Image from "next/image";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: "/images/icons/order/shopping-cart.svg",
    title: "Choose your Service",
    description: "Choose your favourite game and service by adding it to the cart.",
  },
  {
    icon: "/images/icons/order/checklist.svg",
    title: "Extra option",
    description: "Select your extra option (streaming, order priority).",
  },
  {
    icon: "/images/icons/order/secure-payment.svg",
    title: "Select your payment method",
    description: "We support VISA, Mastercard, PayPal, Skrill and more — all SSL secured.",
  },
  {
    icon: "/images/icons/order/steps.svg",
    title: "Track your order",
    description:
      "After payment, you are redirected to your dashboard where you can track your active order and speak to your booster/Pro.",
  },
];

export function OrderProcess() {
  return (
    <section id="how-it-works" className="relative isolate w-full overflow-hidden">
      <Image
        src="/images/order-process-bg.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-20 lg:py-[120px]">
        <div className="flex max-w-[775px] flex-col gap-8 max-md:mx-auto max-md:items-center max-md:text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Order Process</h2>

          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center md:h-[50px] md:w-[50px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.icon}
                    alt=""
                    loading="lazy"
                    className="h-10 w-10 object-contain md:h-[50px] md:w-[50px]"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-body text-base font-bold leading-7 text-brand-light lg:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-body text-sm leading-6 text-white md:text-base lg:text-lg lg:leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
