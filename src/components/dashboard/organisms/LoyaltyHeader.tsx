import { IconChip } from "../atoms";
import { userProfile } from "../dashboardData";
import { PanelHeader } from "../molecules";

export function LoyaltyHeader() {
  return (
    <PanelHeader
      title="Loyalty Program"
      subtitle="Earn OG points and receive discounts forever."
      trailing={
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/og-point-coin.png"
              alt=""
              className="h-6 w-[18px] object-cover"
            />
            <span
              className="font-heading text-2xl font-black text-white"
              style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
            >
              {userProfile.ogPoints}
            </span>
          </div>
          <IconChip
            background="rgba(255,92,0,0.2)"
            color="#ff5c00"
            icon="/images/dashboard/icons/medal-star-orange.svg"
          >
            {userProfile.tierName}
          </IconChip>
        </div>
      }
    />
  );
}
