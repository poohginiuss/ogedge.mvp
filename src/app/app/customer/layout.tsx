"use client";

import { DashboardShell } from "@/components/dashboard/organisms";
import { MobileDrawer } from "@/components/dashboard/organisms";
import type { ReactNode } from "react";

const CUSTOMER_ROUTE_MAP: Record<string, string> = {
  dashboard: "/app/customer",
  "active-orders": "/app/customer/active-orders",
  "completed-orders": "/app/customer/completed-orders",
  support: "/app/customer/support",
};

export default function CustomerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      routeMap={CUSTOMER_ROUTE_MAP}
      contentClassName="flex flex-col gap-8 p-6 lg:p-8 xl:p-16"
    >
      {children}
    </DashboardShell>
  );
}
