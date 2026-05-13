"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "./DashboardSidebar";
import { BoosterProfileCard } from "./BoosterProfileCard";
import { BoosterOrderCard } from "./BoosterOrderCard";
import { BoosterCompletionRate } from "./BoosterCompletionRate";
import { BoosterReviews } from "./BoosterReviews";
import {
  boosterSidebarNavItems,
  boosterAvailableOrders,
  boosterMyOrders,
  boosterCompletedOrders,
} from "./boosterData";

type MobileModal = "reviews" | null;

type OrderSectionProps = {
  title: string;
  orders: typeof boosterAvailableOrders;
};

function OrderSection({ title, orders }: OrderSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-base font-medium text-white lg:text-[32px] lg:font-semibold">
          {title}
        </h2>
        <button type="button" className="flex items-center gap-2">
          <span className="font-body text-base font-bold uppercase tracking-wide text-white">
            See All
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/arrow-right-duotone.svg"
            alt=""
            className="h-6 w-6 rotate-90"
          />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <BoosterOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default function BoosterDashboardContent() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileModal, setMobileModal] = useState<MobileModal>(null);

  return (
    <>
      <Header />
      <DashboardSidebar activeId={activeNav} onNavigate={setActiveNav} navItems={boosterSidebarNavItems} />
      <main className="min-h-screen bg-dark-main lg:ml-[100px]">
        <div className="flex flex-col gap-6 p-6 lg:gap-8 lg:p-16">
          <BoosterProfileCard />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: order sections */}
            <div className="flex flex-1 flex-col gap-8">
              {/* Mobile: completion rate + reviews header */}
              <div className="flex flex-col gap-2 lg:hidden">
                <BoosterCompletionRate />
                <div
                  className="cursor-pointer"
                  onClick={() => setMobileModal("reviews")}
                >
                  <div className="overflow-hidden rounded-3xl border-b border-dark-border bg-dark-surface p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="font-body text-lg font-bold text-white">Reviews</p>
                        <p className="font-body text-sm text-white">Latest reviews</p>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/images/dashboard/icons/star-rating.svg" alt="" className="h-3.5 w-[15px]" />
                          <span
                            className="font-body text-xl font-bold"
                            style={{ color: "#ff975d", textShadow: "0px 0px 10px rgba(255,92,0,0.4)" }}
                          >
                            4.9
                          </span>
                        </div>
                        <span className="font-body text-base font-medium text-white">10k Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <OrderSection title="Available Orders" orders={boosterAvailableOrders} />
              <OrderSection title="My Orders" orders={boosterMyOrders} />
              <OrderSection title="Completed Orders" orders={boosterCompletedOrders} />
            </div>

            {/* Right sidebar: completion rate + reviews (desktop only) */}
            <div className="hidden flex-col gap-6 lg:flex lg:w-[490px] lg:shrink-0">
              <BoosterCompletionRate />
              <BoosterReviews />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Modal Overlay */}
      {mobileModal && (
        <div className="fixed inset-0 z-[60] flex items-end lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.8)" }}
            onClick={() => setMobileModal(null)}
          />
          <div className="relative w-full rounded-t-3xl border border-brand-light bg-dark-surface">
            {mobileModal === "reviews" && <BoosterReviews contentOnly />}
          </div>
        </div>
      )}
    </>
  );
}
