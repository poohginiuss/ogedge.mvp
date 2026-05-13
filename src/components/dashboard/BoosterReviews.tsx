import { boosterProfile, boosterReviews } from "./boosterData";

type BoosterReviewsProps = {
  contentOnly?: boolean;
};

export function BoosterReviews({ contentOnly }: BoosterReviewsProps) {
  const header = (
    <div className="flex items-center justify-between border-b border-dark-border px-4 py-4 lg:px-6">
      <div className="flex flex-col gap-1">
        <p className="font-body text-lg font-bold text-white lg:text-xl" style={{ letterSpacing: "-0.4px" }}>
          Reviews
        </p>
        <p className="font-body text-sm text-white">Latest reviews</p>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/star-rating.svg" alt="" className="h-3.5 w-[15px]" />
          <span
            className="font-body text-xl font-bold"
            style={{ color: "#ff975d", textShadow: "0px 0px 10px rgba(255,92,0,0.4)" }}
          >
            {boosterProfile.starRating}
          </span>
        </div>
        <span className="font-body text-base font-medium text-white">
          {boosterProfile.reviewCount} Reviews
        </span>
      </div>
    </div>
  );

  const reviewContent = (
    <div className="flex flex-col gap-6 px-4 pb-6 pt-6 lg:px-6">
      {boosterReviews.map((review, idx) => (
        <div key={review.id}>
          {idx > 0 && <div className="mb-6 h-px w-full bg-dark-border" />}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={review.avatarUrl} alt="" className="h-8 w-8 rounded-full" />
              <div className="flex flex-col">
                <span className="font-body text-base font-semibold text-white">{review.username}</span>
                <span className="font-body text-sm" style={{ color: "#ff975d" }}>
                  {review.service}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/star-rating-frame.svg"
                alt="5 stars"
                className="h-4 w-[118px]"
              />
              <span className="font-body text-sm" style={{ color: "#aaa" }}>
                {review.date}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-body text-sm text-white">{review.text}</p>
              <p className="font-body text-xs">
                <span style={{ color: "#aaa" }}>{"Purchased: "}</span>
                <span className="text-white">{review.purchased}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {review.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="rounded-lg p-2 font-body text-xs font-medium"
                  style={{ background: tag.bg, color: tag.color }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (contentOnly) {
    return (
      <>
        {header}
        {reviewContent}
      </>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-light bg-dark-surface">
      {header}
      {reviewContent}
    </div>
  );
}
