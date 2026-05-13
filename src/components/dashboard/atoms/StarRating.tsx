type StarRatingSize = "sm" | "md" | "lg";

type StarRatingProps = {
  rating: number | string;
  /** Optional trailing review count line, e.g. "10k Reviews". */
  reviewCount?: string;
  /** "col" stacks score on top of count; "row" puts them side-by-side. */
  layout?: "col" | "row";
  /** Tailwind size class for the score text. Default "text-xl". */
  scoreClassName?: string;
  /** Star icon size. Defaults to "lg" (~28px) for better visibility on dashboards. */
  size?: StarRatingSize;
  className?: string;
};

const STAR_SIZE_CLASSES: Record<StarRatingSize, string> = {
  sm: "h-3.5 w-[15px]",
  md: "h-5 w-[22px]",
  lg: "h-7 w-[30px]",
};

export function StarRating({
  rating,
  reviewCount,
  layout = "col",
  scoreClassName = "text-xl",
  size = "lg",
  className = "",
}: StarRatingProps) {
  const wrapper =
    layout === "col" ? "flex flex-col items-center gap-0.5" : "flex items-center gap-2";
  return (
    <div className={`${wrapper} ${className}`}>
      <div className="flex items-center gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard/icons/star-rating.svg"
          alt=""
          className={`${STAR_SIZE_CLASSES[size]} shrink-0`}
        />
        <span
          className={`font-body font-bold ${scoreClassName}`}
          style={{ color: "#ff975d", textShadow: "0px 0px 10px rgba(255,92,0,0.4)" }}
        >
          {rating}
        </span>
      </div>
      {reviewCount && (
        <span className="font-body text-base font-medium text-white">{reviewCount}</span>
      )}
    </div>
  );
}
