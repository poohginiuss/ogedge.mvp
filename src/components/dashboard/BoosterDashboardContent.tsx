"use client";

import { useState } from "react";
import { BoosterProfileCard } from "./BoosterProfileCard";
import { StarRating } from "./atoms";
import {
  boosterAvailableOrders,
  boosterCompletedOrders,
  boosterMyOrders,
  boosterSidebarNavItems,
} from "./boosterData";
import { PanelHeader } from "./molecules";
import {
  CompletionStats,
  DashboardPanel,
  DashboardShell,
  MobileDrawer,
  OrderCard,
  OrderSection,
  ReviewList,
  ReviewsHeader,
} from "./organisms";

export default function BoosterDashboardContent() {
  const [reviewsOpen, setReviewsOpen] = useState(false);

  return (
    <DashboardShell
      navItems={boosterSidebarNavItems}
      contentClassName="flex flex-col gap-6 p-6 lg:gap-8 lg:p-16"
      mobileDrawer={
        <MobileDrawer open={reviewsOpen} onClose={() => setReviewsOpen(false)}>
          <DashboardPanel contentOnly header={<ReviewsHeader />}>
            <ReviewList />
          </DashboardPanel>
        </MobileDrawer>
      }
    >
      <BoosterProfileCard />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left column */}
        <div className="flex flex-1 flex-col gap-8">
          {/* Mobile: completion + reviews trigger */}
          <div className="flex flex-col gap-2 lg:hidden">
            <CompletionStats />
            <button
              type="button"
              onClick={() => setReviewsOpen(true)}
              className="block w-full text-left"
            >
              <div className="overflow-hidden rounded-3xl border-b border-dark-border bg-dark-surface">
                <PanelHeader
                  title="Reviews"
                  subtitle="Latest reviews"
                  titleClassName="font-body text-lg font-bold text-white"
                  trailing={<StarRating rating={4.9} reviewCount="10k Reviews" />}
                  className="flex w-full items-center justify-between p-4"
                />
              </div>
            </button>
          </div>

          <OrderSection title="Available Orders" onSeeAll={() => {}}>
            {boosterAvailableOrders.map((order) => (
              <OrderCard key={order.id} variant="booster" order={order} />
            ))}
          </OrderSection>
          <OrderSection title="My Orders" onSeeAll={() => {}}>
            {boosterMyOrders.map((order) => (
              <OrderCard key={order.id} variant="booster" order={order} />
            ))}
          </OrderSection>
          <OrderSection title="Completed Orders" onSeeAll={() => {}}>
            {boosterCompletedOrders.map((order) => (
              <OrderCard key={order.id} variant="booster" order={order} />
            ))}
          </OrderSection>
        </div>

        {/* Right sidebar (desktop only) */}
        <div className="hidden flex-col gap-6 lg:flex lg:w-[490px] lg:shrink-0">
          <CompletionStats />
          <DashboardPanel header={<ReviewsHeader />}>
            <ReviewList />
          </DashboardPanel>
        </div>
      </div>
    </DashboardShell>
  );
}
