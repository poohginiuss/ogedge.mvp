import Image from "next/image";

const features = [
  {
    icon: "/images/affiliate/icon-star-square.svg",
    title: "Up to 20% Commission",
    description:
      "Earn between 5% and 20% on every order placed through your referral link. The more you refer, the higher your tier. Your earnings scale with your effort.",
  },
  {
    icon: "/images/affiliate/icon-support.svg",
    title: "Custom Discount Codes",
    description:
      "Give your audience exclusive discounts from 5% to 15% off. A real incentive that drives conversions — not a generic coupon that looks like spam.",
  },
  {
    icon: "/images/affiliate/icon-happy-face.svg",
    title: "90-Day Cookie",
    description:
      "Your referral link stays active for 90 days. If someone clicks today and buys three months from now, you still get the commission.",
  },
  {
    icon: "/images/affiliate/icon-no-minimum.svg",
    title: "No Minimum Payout",
    description:
      "Withdraw your earnings at any time — no thresholds, no holding periods. Your money is yours the moment it hits your balance.",
  },
  {
    icon: "/images/affiliate/icon-safety.svg",
    title: "Real-Time Dashboard",
    description:
      "Track every click, conversion, and payout from your affiliate dashboard. See exactly what\u2019s working, what\u2019s earning, and what\u2019s pending — all in one place.",
  },
  {
    icon: "/images/affiliate/icon-reward.svg",
    title: "A Brand Worth Promoting",
    description:
      "OGEdge has been operating since 2006 with over 20,000 completed orders and a 99% positive rating. You\u2019re not promoting a no-name startup — you\u2019re partnering with the most established platform in the space.",
  },
];

export function WhyPartner() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 xl:px-0 xl:py-[120px]">
        <div className="flex flex-col gap-8">
          <h2 className="font-heading text-3xl font-bold text-white xl:text-[36px]">
            Why Partner with{" "}
            <span className="text-brand-main">OGEdge</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex h-auto min-h-[200px] flex-col gap-2 rounded-[32px] border border-dark-light p-6 backdrop-blur-[7px] sm:p-8"
                style={{
                  backgroundImage:
                    "linear-gradient(-49deg, rgba(23,25,31,0.5) 0%, rgba(56,56,82,0.5) 100%)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="mb-1"
                  />
                  <h3 className="font-body text-lg font-medium leading-6 text-brand-main xl:text-xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="font-body text-sm leading-5 text-white/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
