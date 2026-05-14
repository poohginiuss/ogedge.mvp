import Link from "next/link";

type RatingCardsProps = {
  /**
   * Whether to show the "See All Reviews" CTA link at the bottom. Defaults to
   * true. Set to false on pages that already render their own reviews link
   * elsewhere (e.g. Safety, which renders `PlayerReviews` below).
   */
  showSeeAllLink?: boolean;
};

export function RatingCards({ showSeeAllLink = true }: RatingCardsProps = {}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: 4.94|1328 first, then Rated+Top side by side */}
      {/* Desktop: Rated Excellent, Top Rated, then 4.94|1328 stacked */}

      {/* OGEdge rating — shown first on mobile, last on desktop */}
      <div
        className="relative flex items-center justify-center gap-6 overflow-hidden rounded-3xl px-5 py-5 lg:order-3 lg:px-6 lg:py-6"
        style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
      >
        <div className="flex flex-col items-start gap-px">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/reviews/star.svg" alt="" className="h-7 w-7 lg:h-8 lg:w-8" />
            <span className="font-heading text-[28px] font-semibold leading-none text-brand-light lg:text-[32px]">
              4.94
            </span>
          </div>
          <span className="font-body text-xs text-white/80">Average Rating</span>
        </div>

        <span className="font-heading text-[28px] font-thin leading-none text-brand-light lg:text-[32px]">
          |
        </span>

        <div className="flex flex-col items-start gap-px">
          <span className="font-heading text-[28px] font-semibold leading-none text-brand-light lg:text-[32px]">
            1328
          </span>
          <span className="font-body text-xs text-white/80">Total Reviews</span>
        </div>

        <div
          className="pointer-events-none absolute bottom-[-80px] right-[-30px] h-[150px] w-[150px] rounded-full lg:bottom-[-130px] lg:right-[-45px] lg:h-[250px] lg:w-[250px]"
          style={{
            background: "radial-gradient(circle, rgba(255,92,0,0.35) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      </div>

      {/* Rated Excellent + Top Rated: side by side on mobile, stacked on desktop */}
      <div className="grid grid-cols-2 gap-3 lg:order-1 lg:grid-cols-1 lg:gap-4">
        <a
          href="https://www.trustpilot.com/review/ogedge.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-3xl border border-transparent p-4 transition-all duration-200 hover:border-[#48a589] hover:shadow-[0_0_16px_rgba(72,165,137,0.35)] lg:gap-2 lg:p-6"
          style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
        >
          <span className="font-body text-base font-medium leading-6 text-white transition-colors group-hover:text-[#48a589] lg:text-2xl lg:leading-8">
            Rated Excellent
          </span>
          <div className="flex items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/reviews/star-green.svg"
              alt=""
              className="h-7 w-7 lg:h-8 lg:w-8"
            />
            <span className="font-body text-xs font-bold text-[#48a589] lg:text-sm">
              4.9 Star Rating
            </span>
          </div>
          <div
            className="pointer-events-none absolute bottom-[-80px] right-[-30px] h-[130px] w-[130px] rounded-full transition-opacity group-hover:opacity-100 lg:bottom-[-130px] lg:right-[-45px] lg:h-[250px] lg:w-[250px]"
            style={{
              background: "radial-gradient(circle, rgba(72,165,137,0.35) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </a>

        <a
          href="https://www.reviews.io/company-reviews/store/ogedge"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-3xl border border-transparent p-4 transition-all duration-200 hover:border-[#f5e583] hover:shadow-[0_0_16px_rgba(245,229,131,0.35)] lg:gap-2 lg:p-6"
          style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
        >
          <span className="font-body text-base font-medium leading-6 text-white transition-colors group-hover:text-[#f5e583] lg:text-2xl lg:leading-8">
            Top Rated
          </span>
          <div className="flex items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/reviews/star-yellow.png"
              alt=""
              className="h-7 w-7 lg:h-8 lg:w-8"
            />
            <span className="font-body text-xs font-bold text-[#f5e583] lg:text-sm">
              4.9 Star Rating
            </span>
          </div>
          <div
            className="pointer-events-none absolute bottom-[-80px] right-[-30px] h-[130px] w-[130px] rounded-full transition-opacity group-hover:opacity-100 lg:bottom-[-130px] lg:right-[-45px] lg:h-[250px] lg:w-[250px]"
            style={{
              background: "radial-gradient(circle, rgba(245,229,131,0.35) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </a>
      </div>

      {/* See All Reviews link */}
      {showSeeAllLink && (
        <Link
          href="/reviews"
          className="mt-2 inline-flex items-center justify-center gap-2 self-center font-body text-base font-bold uppercase tracking-[0.32px] text-white hover:text-brand-light lg:order-4 lg:mt-4"
        >
          See All Reviews
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/reviews/arrow-up-duotone.svg"
            alt=""
            className="h-6 w-6 rotate-90"
            loading="lazy"
          />
        </Link>
      )}
    </div>
  );
}
