import Link from "next/link";

export function RatingCards() {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: 4.94|1328 first, then Rated+Top side by side */}
      {/* Desktop: Rated Excellent, Top Rated, then 4.94|1328 stacked */}

      {/* OGEdge rating — shown first on mobile, last on desktop */}
      <div
        className="relative flex items-center justify-center gap-6 overflow-hidden rounded-3xl px-6 py-6 lg:order-3"
        style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
      >
        <div className="flex flex-col items-start gap-px">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/reviews/star.svg" alt="" className="h-6 w-6" />
            <span className="font-heading text-[32px] font-semibold leading-none text-brand-light">
              4.94
            </span>
          </div>
          <span className="font-body text-xs text-white/80">Average Rating</span>
        </div>

        <span className="font-heading text-[32px] font-thin leading-none text-brand-light">|</span>

        <div className="flex flex-col items-start gap-px">
          <span className="font-heading text-[32px] font-semibold leading-none text-brand-light">
            1328
          </span>
          <span className="font-body text-xs text-white/80">Total Reviews</span>
        </div>

        <div
          className="pointer-events-none absolute bottom-[-130px] right-[-45px] h-[250px] w-[250px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,92,0,0.5) 0%, transparent 70%)",
            filter: "blur(15px)",
          }}
        />
      </div>

      {/* Rated Excellent + Top Rated: side by side on mobile, stacked on desktop */}
      <div className="grid grid-cols-2 gap-4 lg:order-1 lg:grid-cols-1">
        <div
          className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl p-6"
          style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
        >
          <span className="font-body text-lg font-medium leading-7 text-white lg:text-2xl lg:leading-8">
            Rated Excellent
          </span>
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/reviews/star.svg" alt="" className="h-[14px] w-[15px]" />
            <span className="font-body text-sm font-bold text-[#48a589]">4.9 Star Rating</span>
          </div>
          <div
            className="pointer-events-none absolute bottom-[-130px] right-[-45px] h-[250px] w-[250px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(72,165,137,0.5) 0%, transparent 70%)",
              filter: "blur(15px)",
            }}
          />
        </div>

        <div
          className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl p-6"
          style={{ background: "rgba(35,35,48,0.5)", backdropFilter: "blur(5px)" }}
        >
          <span className="font-body text-lg font-medium leading-7 text-white lg:text-2xl lg:leading-8">
            Top Rated
          </span>
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/reviews/star.svg" alt="" className="h-[14px] w-[15px]" />
            <span className="font-body text-sm font-bold text-[#f5e583]">4.9 Star Rating</span>
          </div>
          <div
            className="pointer-events-none absolute bottom-[-130px] right-[-45px] h-[250px] w-[250px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245,229,131,0.5) 0%, transparent 70%)",
              filter: "blur(15px)",
            }}
          />
        </div>
      </div>

      {/* See All Reviews link */}
      <Link
        href="/reviews"
        className="mt-4 inline-flex items-center justify-center gap-2 self-center font-body text-base font-bold uppercase tracking-[0.32px] text-white hover:text-brand-light lg:order-4"
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
    </div>
  );
}
