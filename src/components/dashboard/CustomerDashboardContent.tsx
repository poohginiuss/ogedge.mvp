"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActiveOrdersTable } from "./ActiveOrdersTable";
import { CompletedOrdersTable } from "./CompletedOrdersTable";
import { DashboardProfileCard } from "./DashboardProfileCard";
import { DashboardReferralCard } from "./DashboardReferralCard";
import { sampleCompletedTableOrders, sampleTableOrders } from "./activeOrdersData";
import type { Order, OrderStatus } from "./dashboardData";
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
type CustomerView = "dashboard" | "active-orders" | "completed-orders" | "support";

const SEASONAL_GRADIENT =
  "linear-gradient(180deg, rgba(255,151,93,0.1) 0%, rgba(255,92,0,0.1) 50%, rgba(163,45,5,0.1) 100%)";
const SEASONAL_HEADER_BORDER = { borderBottom: "1px solid rgba(255,255,255,0.1)" };

const COMPLETED_STATUSES = new Set<OrderStatus>(["complete"]);

const isCompleted = (o: Order) => o.statuses.some((s) => COMPLETED_STATUSES.has(s));
const isActive = (o: Order) => !isCompleted(o);

export default function CustomerDashboardContent() {
  const [mobileModal, setMobileModal] = useState<MobileModal>(null);
  const [activeView, setActiveView] = useState<CustomerView>("dashboard");
  const router = useRouter();

  const openOnMobile = (modal: Exclude<MobileModal, null>) => () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileModal(modal);
    }
  };

  const handleNewOrder = () => router.push("/");
  const handleSupport = () => setActiveView("support");

  const activeOrders = sampleOrders.filter(isActive);
  const completedOrders = sampleOrders.filter(isCompleted);

  const profileCard = (
    <DashboardProfileCard onNewOrder={handleNewOrder} onSupport={handleSupport} />
  );

  let viewContent: React.ReactNode;
  if (activeView === "active-orders") {
    viewContent = (
      <ActiveOrdersTable orders={sampleTableOrders} onPurchaseBoost={handleNewOrder} />
    );
  } else if (activeView === "completed-orders") {
    viewContent = (
      <CompletedOrdersTable orders={sampleCompletedTableOrders} onPurchaseBoost={handleNewOrder} />
    );
  } else if (activeView === "support") {
    viewContent = (
      <>
        {profileCard}
        <SupportPanel
          title="Customer Support"
          description="Need help with an order, payment or account? Open a ticket and our team will get back to you within a few hours."
          email="support@ogedge.com"
        />
      </>
    );
  } else {
    viewContent = (
      <>
        {profileCard}

        <div className="lg:hidden">
          <DashboardReferralCard />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <OrderSection
            title="Active Orders"
            titleClassName="font-heading text-2xl font-semibold text-white lg:text-[32px]"
            className="flex flex-1 flex-col gap-6"
            onSeeAll={activeOrders.length > 0 ? () => setActiveView("active-orders") : undefined}
          >
            {activeOrders.map((order) => (
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
      </>
    );
  }

  return (
    <DashboardShell
      contentClassName="flex flex-col gap-8 p-6 lg:p-16"
      activeView={activeView}
      onViewChange={(id) => setActiveView(id as CustomerView)}
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
