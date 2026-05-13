"use client";

import { useState } from "react";
import { BoosterProfileCard } from "./BoosterProfileCard";
import { StarRating } from "./atoms";
import type { BoosterOrder } from "./boosterData";
import {
  boosterAvailableOrders,
  boosterCompletedOrders,
  boosterMyOrders,
  boosterProfile,
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

type BoosterView = "dashboard" | "available-orders" | "my-orders" | "completed-orders" | "support";

type OrderSectionConfig = {
  title: string;
  orders: BoosterOrder[];
  view: BoosterView;
  emptyLabel: string;
};

export default function BoosterDashboardContent() {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [activeView, setActiveView] = useState<BoosterView>("dashboard");

  const sections: OrderSectionConfig[] = [
    {
      title: "Available Orders",
      orders: boosterAvailableOrders,
      view: "available-orders",
      emptyLabel: "No available orders right now. Check back soon.",
    },
    {
      title: "My Orders",
      orders: boosterMyOrders,
      view: "my-orders",
      emptyLabel: "You haven\u2019t claimed any orders yet.",
    },
    {
      title: "Completed Orders",
      orders: boosterCompletedOrders,
      view: "completed-orders",
      emptyLabel: "No completed orders yet.",
    },
  ];

  const focusedSection = sections.find((s) => s.view === activeView);

  let viewContent: React.ReactNode;
  if (activeView === "support") {
    viewContent = (
      <>
        <BoosterProfileCard />
        <SupportPanel
          title="Booster Support"
          description="Need help with an order, payout or your account? Reach out and our booster team will get back to you within a few hours."
          email="boosters@ogedge.com"
        />
      </>
    );
  } else if (focusedSection) {
    viewContent = (
      <>
        <BoosterProfileCard />
        <OrderSection
          title={focusedSection.title}
          titleClassName="font-heading text-2xl font-semibold text-white lg:text-[32px]"
          className="flex flex-col gap-6"
        >
          {focusedSection.orders.length === 0 ? (
            <EmptyOrdersState label={focusedSection.emptyLabel} />
          ) : (
            focusedSection.orders.map((order) => (
              <OrderCard key={order.id} variant="booster" order={order} />
            ))
          )}
        </OrderSection>
      </>
    );
  } else {
    viewContent = (
      <>
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
                onSeeAll={section.orders.length > 0 ? () => setActiveView(section.view) : undefined}
              >
                {section.orders.map((order) => (
                  <OrderCard key={order.id} variant="booster" order={order} />
                ))}
              </OrderSection>
            ))}
          </div>

          {/* Right sidebar (desktop only) */}
          <div className="hidden flex-col gap-6 lg:flex lg:w-[490px] lg:shrink-0">
            <CompletionStats />
            <DashboardPanel header={<ReviewsHeader />}>
              <ReviewList />
            </DashboardPanel>
          </div>
        </div>
      </>
    );
  }

  return (
    <DashboardShell
      navItems={boosterSidebarNavItems}
      contentClassName="flex flex-col gap-6 p-6 lg:gap-8 lg:p-16"
      activeView={activeView}
      onViewChange={(id) => setActiveView(id as BoosterView)}
      mobileDrawer={
        <MobileDrawer open={reviewsOpen} onClose={() => setReviewsOpen(false)}>
          <DashboardPanel contentOnly header={<ReviewsHeader />}>
            <ReviewList />
          </DashboardPanel>
        </MobileDrawer>
      }
    >
      {viewContent}
    </DashboardShell>
  );
}

function EmptyOrdersState({ label }: { label: string }) {
  return (
    <div className="rounded-3xl bg-dark-surface px-6 py-10 text-center font-body text-base text-white/70 lg:p-12">
      {label}
    </div>
  );
}

function SupportPanel({
  title,
  description,
  email,
}: {
  title: string;
  description: string;
  email: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-dark-surface p-6 lg:p-8">
      <h2 className="font-heading text-2xl font-semibold text-white lg:text-[32px]">{title}</h2>
      <p className="font-body text-sm text-white/80 lg:text-base">{description}</p>
      <a
        href={`mailto:${email}`}
        className="inline-flex w-fit items-center gap-2 rounded-2xl bg-brand-main px-6 py-3 font-body text-base font-bold uppercase text-white transition-opacity hover:opacity-90"
      >
        {email}
      </a>
    </div>
  );
}
