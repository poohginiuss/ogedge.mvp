import { StarRating } from "../atoms";
import { ProfileIdentity } from "../molecules";
import { boosterProfile } from "./boosterData";

export function BoosterProfileCard() {
  return (
    <div
      className="flex flex-col items-start gap-4 overflow-hidden rounded-3xl px-4 py-6 lg:flex-row lg:items-center lg:px-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      <ProfileIdentity
        avatarSrc={boosterProfile.avatarUrl}
        avatarAlt="Booster avatar"
        avatarClassName="h-16 w-16 lg:h-[90px] lg:w-[90px]"
        name={boosterProfile.username}
        meta={
          <StarRating
            rating={boosterProfile.starRating}
            reviewCount={`${boosterProfile.reviewCount} Reviews`}
            layout="row"
          />
        }
      />
    </div>
  );
}
