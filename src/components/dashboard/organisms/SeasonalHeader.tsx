import { CountdownBadge } from "../atoms";
import { userProfile } from "../dashboardData";
import { PanelHeader } from "../molecules";

export function SeasonalHeader() {
  return (
    <PanelHeader
      title="Seasonal Rewards"
      subtitle="Spend money to earn rewards!"
      trailing={
        <div className="flex flex-col items-end whitespace-nowrap">
          <span className="font-body text-sm uppercase text-white">Season ends in</span>
          <CountdownBadge value={userProfile.seasonEndsIn} />
        </div>
      }
    />
  );
}
