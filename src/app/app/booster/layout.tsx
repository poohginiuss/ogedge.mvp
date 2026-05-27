"use client";

import { boosterSidebarNavItems } from "@/components/dashboard/booster/boosterData";
import { ActionMenuButton } from "@/components/dashboard/orderTableShared";
import { DashboardShell } from "@/components/dashboard/organisms";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const BOOSTER_ROUTE_MAP: Record<string, string> = {
  dashboard: "/app/booster",
  "available-orders": "/app/booster/available-orders",
  "my-orders": "/app/booster/my-orders",
  "completed-orders": "/app/booster/completed-orders",
  payouts: "/app/booster/payouts",
  rules: "/app/booster/rules",
  profile: "/app/booster/profile",
  support: "/app/booster/support",
  notification: "/app/booster/notification",
};

export default function BoosterDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <DashboardShell
      navItems={boosterSidebarNavItems}
      routeMap={BOOSTER_ROUTE_MAP}
      contentClassName="flex min-h-[calc(100vh-120px)] flex-col gap-6 p-6 lg:gap-8 lg:px-8 lg:py-6 xl:px-16 xl:py-8"
      mobileHeaderRight={
        <ActionMenuButton
          items={[
            {
              label: "Support",
              icon: "/images/dashboard/icons/support-icon.svg",
              onClick: () => router.push("/app/booster/support"),
            },
          ]}
        />
      }
    >
      {children}
    </DashboardShell>
  );
}
