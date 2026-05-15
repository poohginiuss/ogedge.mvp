"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StarRating } from "./atoms";
import { BoosterProfileCard } from "./booster/BoosterProfileCard";
import type { BoosterOrder } from "./booster/boosterData";
import {
  boosterAvailableOrders,
  boosterCompletedOrders,
  boosterMyOrders,
  boosterProfile,
} from "./booster/boosterData";
import { PanelHeader } from "./molecules";
import {
  CompletionStats,
  DashboardPanel,
  MobileDrawer,
  OrderCard,
  OrderSection,
  ReviewList,
  ReviewsHeader,
} from "./organisms";

type BoosterView = "available-orders" | "my-orders" | "completed-orders";

type OrderSectionConfig = {
  title: string;
  orders: BoosterOrder[];
  view: BoosterView;
};

export default function BoosterDashboardContent() {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const router = useRouter();

  const sections: OrderSectionConfig[] = [
    { title: "Available Orders", orders: boosterAvailableOrders, view: "available-orders" },
    { title: "My Orders", orders: boosterMyOrders, view: "my-orders" },
    { title: "Completed Orders", orders: boosterCompletedOrders, view: "completed-orders" },
  ];

  return (
    <>
      <BoosterProfileCard />

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-2 xl:hidden">
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
                  trailing={
                    <StarRating
                      rating={boosterProfile.starRating}
                      reviewCount={`${boosterProfile.reviewCount} Reviews`}
                    />
                  }
                  className="flex w-full items-center justify-between p-4"
                />
              </div>
            </button>
          </div>

          {sections.map((section) => (
            <OrderSection
              key={section.view}
              title={section.title}
              onSeeAll={
                section.orders.length > 0
                  ? () => router.push(`/app/booster/${section.view}`)
                  : undefined
              }
            >
              {section.orders.map((order) => (
                <OrderCard key={order.id} variant="booster" order={order} />
              ))}
            </OrderSection>
          ))}
        </div>

        <div className="hidden flex-col gap-6 xl:flex xl:w-[490px] xl:shrink-0">
          <CompletionStats />
          <DashboardPanel header={<ReviewsHeader />}>
            <ReviewList />
          </DashboardPanel>
        </div>
      </div>

      <MobileDrawer open={reviewsOpen} onClose={() => setReviewsOpen(false)}>
        <DashboardPanel contentOnly header={<ReviewsHeader />}>
          <ReviewList />
        </DashboardPanel>
      </MobileDrawer>
    </>
  );
}
