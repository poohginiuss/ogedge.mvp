"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconChip } from "../atoms";
import { userProfile } from "../dashboardData";
import { ProfileIdentity } from "../molecules";
import {
  AccountDetailsPanel,
  DescriptionPanel,
  GameServiceHeroCard,
  OrderActionToolbar,
  OrderChatPanel,
  OrderDetailsPanel,
  sampleOrderView,
} from "../order-view";
import { MobileDrawer } from "../organisms";

const TIER_CHIP_BG = "rgba(255,92,0,0.2)";
const TIER_CHIP_COLOR = "#ff5c00";
const WALLET_CHIP_BG = "rgba(52,168,83,0.2)";
const WALLET_CHIP_COLOR = "#34a853";

type Props = { orderId: string };

export default function CustomerOrderViewContent({ orderId: _orderId }: Props) {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const view = sampleOrderView;

  const profileBadges = (
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

  const leftColumn = (
    <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
      <div
        className="flex items-center justify-between gap-4 overflow-hidden rounded-3xl px-4 py-4 lg:px-8 lg:py-6"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <ProfileIdentity
          avatarSrc={userProfile.avatarUrl}
          avatarSize={64}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xs leading-[18px] text-white lg:text-base"
          name={userProfile.username}
          nameClassName="font-body text-base font-bold leading-6 text-white lg:font-heading lg:text-2xl"
          meta={<div className="lg:hidden">{profileBadges}</div>}
          groupWelcomeName
        />
        <div className="hidden lg:block">{profileBadges}</div>
      </div>

      <OrderActionToolbar
        onAdditionalPayment={() => {}}
        onSupport={() => {}}
        onReviewBooster={() => {}}
        onPurchaseBoost={() => router.push("/")}
      />

      <GameServiceHeroCard hero={view.hero} />

      <div className="h-[600px] lg:hidden">
        <OrderChatPanel view={view} />
      </div>

      {/* Mobile: description right after chat, desktop: after detail panels */}
      <div className="lg:hidden">
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="order-2 lg:order-1 lg:flex-1">
          <OrderDetailsPanel rows={view.orderDetails} />
        </div>
        <div className="order-1 lg:order-2 lg:flex-1">
          <AccountDetailsPanel rows={view.accountDetails} chips={view.accountDetailChips} />
        </div>
      </div>

      <div className="hidden lg:block">
        <DescriptionPanel title={view.description.title} body={view.description.body} />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {leftColumn}
        <aside className="hidden lg:block lg:w-[490px] lg:shrink-0">
          <div className="sticky top-6 h-[calc(100vh-6rem)] max-h-[960px] min-h-[720px]">
            <OrderChatPanel view={view} />
          </div>
        </aside>
      </div>

      <MobileDrawer open={chatOpen} onClose={() => setChatOpen(false)}>
        <OrderChatPanel view={view} inDrawer />
      </MobileDrawer>
    </>
  );
}
