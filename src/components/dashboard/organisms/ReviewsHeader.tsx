import { StarRating } from "../atoms";
import { boosterProfile } from "../boosterData";
import { PanelHeader } from "../molecules";

export function ReviewsHeader() {
  return (
    <PanelHeader
      title="Reviews"
      subtitle="Latest reviews"
      trailing={
        <StarRating
          rating={boosterProfile.starRating}
          reviewCount={`${boosterProfile.reviewCount} Reviews`}
        />
      }
      className="flex w-full items-center justify-between px-4 py-4 lg:px-6"
    />
  );
}
