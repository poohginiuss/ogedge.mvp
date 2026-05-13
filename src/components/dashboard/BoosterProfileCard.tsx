import { boosterProfile } from "./boosterData";

export function BoosterProfileCard() {
  return (
    <div
      className="flex flex-col items-start gap-4 overflow-hidden rounded-3xl px-4 py-6 lg:flex-row lg:items-center lg:px-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={boosterProfile.avatarUrl}
          alt="Booster avatar"
          className="h-16 w-16 rounded-full lg:h-[90px] lg:w-[90px]"
        />
        <div className="flex flex-col gap-1">
          <span className="font-body text-xs text-white lg:text-xl">Welcome,</span>
          <span className="font-heading text-base font-bold text-white lg:text-[32px]">
            {boosterProfile.username}
          </span>
          <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
}
