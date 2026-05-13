"use client";

import { useState } from "react";
import { DashboardProfileCard } from "./DashboardProfileCard";
import { DashboardReferralCard } from "./DashboardReferralCard";
import { sampleOrders } from "./dashboardData";
import {
  DashboardPanel,
  DashboardShell,
  LoyaltyHeader,
  LoyaltyTierList,
  MobileDrawer,
  OrderCard,
  OrderSection,
  SeasonalHeader,
  SeasonalTierList,
} from "./organisms";

type MobileModal = "loyalty" | "seasonal" | null;

const SEASONAL_GRADIENT =
  "linear-gradient(180deg, rgba(255,151,93,0.1) 0%, rgba(255,92,0,0.1) 50%, rgba(163,45,5,0.1) 100%)";
const SEASONAL_HEADER_BORDER = { borderBottom: "1px solid rgba(255,255,255,0.1)" };

export default function CustomerDashboardContent() {
  const [mobileModal, setMobileModal] = useState<MobileModal>(null);

  const openOnMobile = (modal: Exclude<MobileModal, null>) => () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileModal(modal);
    }
  };

  return (
    <DashboardShell
      contentClassName="flex flex-col gap-8 p-6 lg:p-16"
      mobileDrawer={
        <MobileDrawer open={mobileModal !== null} onClose={() => setMobileModal(null)}>
          {mobileModal === "loyalty" && (
            <DashboardPanel contentOnly header={<LoyaltyHeader />}>
              <LoyaltyTierList />
            </DashboardPanel>
          )}
          {mobileModal === "seasonal" && (
            <DashboardPanel
              contentOnly
              header={<SeasonalHeader />}
              headerBorderClassName=""
              headerBorderStyle={SEASONAL_HEADER_BORDER}
            >
              <SeasonalTierList />
            </DashboardPanel>
          )}
        </MobileDrawer>
      }
    >
      <DashboardProfileCard />

      <div className="lg:hidden">
        <DashboardReferralCard />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <OrderSection
          title="Active Orders"
          titleClassName="font-heading text-2xl font-semibold text-white lg:text-[32px]"
          className="flex flex-1 flex-col gap-6"
        >
          {sampleOrders.map((order) => (
            <OrderCard key={order.id} variant="customer" order={order} />
          ))}
        </OrderSection>

        <div className="flex flex-col gap-6 lg:w-[490px] lg:shrink-0">
          <div className="hidden lg:block">
            <DashboardReferralCard />
          </div>

          <button
            type="button"
            onClick={openOnMobile("loyalty")}
            className="block w-full text-left lg:cursor-default"
          >
            <DashboardPanel header={<LoyaltyHeader />} hideBodyOnMobile>
              <LoyaltyTierList />
            </DashboardPanel>
          </button>

          <button
            type="button"
            onClick={openOnMobile("seasonal")}
            className="block w-full text-left lg:cursor-default"
          >
            <DashboardPanel
              header={<SeasonalHeader />}
              hideBodyOnMobile
              className="overflow-hidden rounded-3xl border border-brand-light"
              style={{ background: SEASONAL_GRADIENT }}
              headerBorderClassName=""
              headerBorderStyle={SEASONAL_HEADER_BORDER}
            >
              <SeasonalTierList />
            </DashboardPanel>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
