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
    description:
      "Choose your favourite game and service by adding it to the cart.",
  },
  {
    icon: "/images/icons/order/checklist.svg",
    title: "Extra option",
    description:
      "Select your extra option (streaming, order priority).",
  },
  {
    icon: "/images/icons/order/secure-payment.svg",
    title: "Select your payment method",
    description:
      "We support VISA, Mastercard, PayPal, Skrill and more — all SSL secured.",
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
    <section
      id="how-it-works"
      className="relative isolate w-full overflow-hidden"
    >
      <Image
        src="/images/order-process-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 lg:px-20 lg:py-[120px]">
        <div className="max-w-[775px] flex flex-col gap-8">
          <h2 className="font-lexend text-3xl md:text-4xl font-bold text-white">
            Order Process
          </h2>

          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.title} className="flex items-start gap-6 lg:gap-10">
                <div className="flex h-12 w-12 lg:h-[50px] lg:w-[50px] shrink-0 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.icon}
                    alt=""
                    loading="lazy"
                    className="h-12 w-12"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-urbanist text-base lg:text-lg font-bold leading-7 text-brand-light">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-urbanist text-base lg:text-lg leading-7 text-white">
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
