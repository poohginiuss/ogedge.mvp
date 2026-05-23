"use client";

import { affiliateNavItems } from "@/components/dashboard/affiliate/affiliateData";
import { DashboardShell } from "@/components/dashboard/organisms";
import type { ReactNode } from "react";

const AFFILIATE_ROUTE_MAP: Record<string, string> = {
  dashboard: "/app/affiliate",
  payouts: "/app/affiliate/payouts",
  support: "/app/affiliate/support",
};

export default function AffiliateDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      navItems={affiliateNavItems}
      routeMap={AFFILIATE_ROUTE_MAP}
      contentClassName="flex flex-col gap-8 p-6 lg:p-8 xl:p-16"
    >
      {children}
    </DashboardShell>
  );
}
