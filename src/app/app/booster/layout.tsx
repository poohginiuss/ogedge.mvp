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
  support: "/app/booster/support",
};

export default function BoosterDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <DashboardShell
      navItems={boosterSidebarNavItems}
      routeMap={BOOSTER_ROUTE_MAP}
      contentClassName="flex flex-col gap-6 p-6 lg:gap-8 lg:p-8 xl:p-16"
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
