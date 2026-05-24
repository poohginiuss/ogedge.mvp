"use client";

import { DashboardShell } from "@/components/dashboard/organisms";
import { MobileDrawer } from "@/components/dashboard/organisms";
import type { ReactNode } from "react";

const CUSTOMER_ROUTE_MAP: Record<string, string> = {
  dashboard: "/app/customer",
  "active-orders": "/app/customer/active-orders",
  "completed-orders": "/app/customer/completed-orders",
  rules: "/app/customer/rules",
  profile: "/app/customer/profile",
  rewards: "/app/customer/rewards",
  support: "/app/customer/support",
  notification: "/app/customer/notification",
};

export default function CustomerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      routeMap={CUSTOMER_ROUTE_MAP}
      contentClassName="flex flex-col gap-8 p-6 lg:px-8 lg:py-6 xl:px-16 xl:py-8"
    >
      {children}
    </DashboardShell>
  );
}
