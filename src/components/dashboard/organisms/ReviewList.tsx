import { Avatar, IconChip } from "../atoms";
import { boosterReviews } from "../boosterData";

export function ReviewList() {
  return (
    <div className="flex flex-col gap-6 px-4 pb-6 pt-6 lg:px-6">
      {boosterReviews.map((review, idx) => (
        <div key={review.id}>
          {idx > 0 && <div className="mb-6 h-px w-full bg-dark-border" />}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Avatar src={review.avatarUrl} size={32} />
              <div className="flex flex-col">
                <span className="font-body text-base font-semibold text-white">
                  {review.username}
                </span>
                <span className="font-body text-sm" style={{ color: "#ff975d" }}>
                  {review.service}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Native viewBox is 137.57 × 36.36 (~3.78:1). The previous
                  `h-4 w-[118px]` forced a 7.4:1 ratio which visibly
                  squashed the stars (Slack msg #73). Use the matching
                  height (~31px) to render them upright. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/star-rating-frame.svg"
                alt="5 stars"
                className="h-[31px] w-[118px]"
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
                <IconChip
                  key={tag.label}
                  background={tag.bg}
                  color={tag.color}
                  weight="medium"
                  uppercase={false}
                  className="p-2"
                >
                  {tag.label}
                </IconChip>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
