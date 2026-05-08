import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

type ReviewData = {
  id: string;
  initials: string;
  name: string;
  rankPath: string;
  stars: number;
  date: string;
  comment: string;
  game: string;
  category: string;
};

const reviews: ReviewData[] = [
  {
    id: "sr1",
    initials: "RJ",
    name: "Robert Johnson",
    rankPath: "Platinum III to Diamond III",
    stars: 5,
    date: "2020-12-08",
    comment:
      "Amazing experience, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    game: "Game",
    category: "Rank Boost",
  },
  {
    id: "sr2",
    initials: "RJ",
    name: "Robert Johnson",
    rankPath: "Platinum III to Diamond III",
    stars: 5,
    date: "2020-12-08",
    comment:
      "Amazing experience, consectetur adipiscing elit. Sed sed felis vel eros eleifend fermentum. Nulla id iaculis dui. Morbi maximus placerat augue, in euismod felis facilisis sit amet. Quisque efficitur egestas magna nec posuere.",
    game: "Game",
    category: "Rank Boost",
  },
];

const starKeys = ["s1", "s2", "s3", "s4", "s5"];

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-3xl p-6 md:p-8"
      style={{
        background:
          "linear-gradient(153deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
        border: "1px solid #6d6d96",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-body text-xs font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #ff5c00 0%, #a32d05 100%)",
          }}
        >
          {review.initials}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="font-body text-base font-medium leading-6 text-white">
            {review.name}
          </span>
          <span className="font-body text-sm leading-5 text-brand-light">{review.rankPath}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {starKeys.slice(0, review.stars).map((id) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${review.id}-${id}`}
              src="/images/icons/reviews/star.svg"
              alt=""
              className="h-4 w-4"
            />
          ))}
        </div>
        <span className="font-body text-sm text-text-secondary">{review.date}</span>
      </div>

      <p className="font-body text-base leading-6 text-white">{review.comment}</p>

      <p className="font-body text-sm">
        <span className="text-text-secondary">Purchased: </span>
        <span className="text-white">{review.game}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-lg px-2 py-1 font-body text-xs font-medium"
          style={{
            background: "rgba(26,173,25,0.2)",
            color: "var(--success-main)",
          }}
        >
          Verified Purchase
        </span>
        <span
          className="rounded-lg px-2 py-1 font-body text-xs font-medium text-text-secondary"
          style={{ background: "rgba(81,79,79,0.2)" }}
        >
          {review.category}
        </span>
      </div>
    </div>
  );
}

export function PlayerReviews() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-medium text-white">Player Reviews</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <Link
        href="/reviews"
        className="mt-2 inline-flex items-center justify-center gap-2 self-start font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
      >
        See all reviews
        <ArrowRightIcon size={18} />
      </Link>
    </div>
  );
}
