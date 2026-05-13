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
          <div className="flex items-center gap-2">
            <span
              className="font-heading text-2xl font-black text-white"
              style={{ textShadow: "0px 0px 14px rgba(255,255,255,0.4)" }}
            >
              {userProfile.ogPoints}
            </span>
            {/* OG coin is roughly 1.5:1 wide. Previously sized at
                `h-6 w-[18px]` with `object-cover`, which cropped the wide
                glyph down to a vertical sliver that read as an "X" on
                screen (see design vs. current screenshots). Sizing now
                matches the natural aspect ratio and uses object-contain
                so the full "OG" logo renders. Also placed *after* the
                number to match the "12 OG" pattern in the spec. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dashboard/icons/og-point-coin.png"
              alt="OG"
              className="h-7 w-[30px] shrink-0 object-contain"
            />
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
