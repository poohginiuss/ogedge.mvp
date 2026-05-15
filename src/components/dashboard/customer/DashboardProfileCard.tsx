import type { ReactNode } from "react";
import { IconChip } from "../atoms";
import { userProfile } from "../dashboardData";
import { CtaCard, ProfileIdentity } from "../molecules";

const TIER_CHIP_BG = "rgba(255,92,0,0.2)";
const TIER_CHIP_COLOR = "#ff5c00";
const WALLET_CHIP_BG = "rgba(52,168,83,0.2)";
const WALLET_CHIP_COLOR = "#34a853";

type DashboardProfileCardProps = {
  /** Called when the user taps the "New Order" CTA. */
  onNewOrder?: () => void;
  /** Called when the user taps the "Customer Support" CTA. */
  onSupport?: () => void;
};

function ProfileBadges(): ReactNode {
  return (
    <div className="flex items-center gap-2">
      <IconChip
        background={TIER_CHIP_BG}
        color={TIER_CHIP_COLOR}
        icon="/images/dashboard/icons/medal-star-orange.svg"
      >
        {userProfile.tierName}
      </IconChip>
      <IconChip
        background={WALLET_CHIP_BG}
        color={WALLET_CHIP_COLOR}
        icon="/images/dashboard/icons/wallet-green.svg"
        size="sm"
        weight="semibold"
      >
        {userProfile.walletBalance}
      </IconChip>
    </div>
  );
}

export function DashboardProfileCard({ onNewOrder, onSupport }: DashboardProfileCardProps = {}) {
  return (
    <div
      className="flex flex-col gap-6 overflow-hidden rounded-3xl px-4 py-6 lg:px-8"
      style={{ background: "rgba(56,56,82,0.3)" }}
    >
      {/* Desktop: single row with user info left, action buttons right */}
      <div className="hidden xl:flex xl:items-center xl:justify-between">
        <ProfileIdentity
          avatarSrc={userProfile.avatarUrl}
          avatarSize={90}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xl"
          name={userProfile.username}
          nameClassName="font-heading text-[32px] font-semibold leading-none"
          meta={<ProfileBadges />}
          groupWelcomeName
        />

        <div className="flex items-center gap-6">
          <CtaCard
            icon="/images/dashboard/icons/pen-new-order.svg"
            title="New Order"
            subtitle="Get Started"
            onClick={onNewOrder}
          />
          <CtaCard
            icon="/images/dashboard/icons/support-icon.svg"
            title="Customer Support"
            subtitle="Create Ticket"
            onClick={onSupport}
          />
        </div>
      </div>

      {/* Mobile + tablet: stacked layout */}
      <div className="flex flex-col gap-6 xl:hidden">
        <ProfileIdentity
          avatarSrc={userProfile.avatarUrl}
          avatarSize={64}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xs leading-[18px] text-white"
          name={userProfile.username}
          nameClassName="font-body text-base font-bold leading-6 text-white"
          meta={<ProfileBadges />}
          groupWelcomeName
        />

        <div className="flex items-center gap-2">
          <CtaCard
            size="sm"
            icon="/images/dashboard/icons/pen-new-order.svg"
            title="New Order"
            onClick={onNewOrder}
          />
          <CtaCard
            size="sm"
            icon="/images/dashboard/icons/support-icon.svg"
            title="Support"
            onClick={onSupport}
          />
        </div>
      </div>
    </div>
  );
}
