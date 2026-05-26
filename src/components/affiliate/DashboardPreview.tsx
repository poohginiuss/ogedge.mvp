import Image from "next/image";

export function DashboardPreview() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 xl:px-0 xl:py-[120px]">
        {/* Title */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white xl:text-[36px]">
            Everything You Need in One Dashboard
          </h2>
          <p className="max-w-[611px] font-body text-base leading-6 text-white/90 tracking-[0.32px]">
            Your referral link, discount codes, click stats, conversion history,
            and payout balance — all live, all in real time. No spreadsheets, no
            guessing.
          </p>
        </div>

        {/* Desktop dashboard image */}
        <div className="relative -mx-16 hidden xl:block">
          <Image
            src="/images/affiliate/one-dashboard.png"
            alt="Affiliate Dashboard"
            width={1440}
            height={810}
            className="w-full"
            unoptimized
          />
        </div>

        {/* Mobile dashboard image */}
        <div className="xl:hidden">
          <Image
            src="/images/affiliate/one-dashboard-mobile.png"
            alt="Affiliate Dashboard"
            width={640}
            height={480}
            className="w-full"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
