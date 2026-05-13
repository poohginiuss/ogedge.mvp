"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardProfileCard } from "./DashboardProfileCard";
import { DashboardOrderCard } from "./DashboardOrderCard";
import { DashboardReferralCard } from "./DashboardReferralCard";
import { DashboardLoyaltyProgram } from "./DashboardLoyaltyProgram";
import { DashboardSeasonalRewards } from "./DashboardSeasonalRewards";
import { sampleOrders } from "./dashboardData";

type MobileModal = "loyalty" | "seasonal" | null;

export default function CustomerDashboardContent() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileModal, setMobileModal] = useState<MobileModal>(null);

  return (
    <>
      <Header />
      <DashboardSidebar activeId={activeNav} onNavigate={setActiveNav} />
      <main className="min-h-screen bg-dark-main lg:ml-[100px]">
        <div className="flex flex-col gap-8 p-6 lg:p-16">
          <DashboardProfileCard />

          <div className="lg:hidden">
            <DashboardReferralCard />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-1 flex-col gap-6">
              <h2 className="font-heading text-2xl font-semibold text-white lg:text-[32px]">
                Active Orders
              </h2>
              <div className="flex flex-col gap-4">
                {sampleOrders.map((order) => (
                  <DashboardOrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:w-[490px] lg:shrink-0">
              <div className="hidden lg:block">
                <DashboardReferralCard />
              </div>

              {/* Mobile: tapping opens modal; Desktop: always expanded */}
              <div
                className="cursor-pointer lg:cursor-default"
                onClick={() => {
                  if (window.innerWidth < 1024) setMobileModal("loyalty");
                }}
              >
                <DashboardLoyaltyProgram />
              </div>

              <div
                className="cursor-pointer lg:cursor-default"
                onClick={() => {
                  if (window.innerWidth < 1024) setMobileModal("seasonal");
                }}
              >
                <DashboardSeasonalRewards />
              </div>
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
            {mobileModal === "loyalty" && <DashboardLoyaltyProgram contentOnly />}
            {mobileModal === "seasonal" && <DashboardSeasonalRewards contentOnly />}
          </div>
        </div>
      )}
    </>
  );
}
