"use client";

import { Header } from "@/components/layout/Header";
import type { ReactNode } from "react";
import { useState } from "react";
import { DashboardSidebar } from "../DashboardSidebar";
import type { NavItem } from "../dashboardData";

type DashboardShellProps = {
  navItems?: NavItem[];
  initialActiveId?: string;
  children: ReactNode;
  /** Optional bottom-sheet drawer rendered as fixed overlay on mobile. */
  mobileDrawer?: ReactNode;
  /** Override content wrapper classes (padding, gap). */
  contentClassName?: string;
};

export function DashboardShell({
  navItems,
  initialActiveId = "dashboard",
  children,
  mobileDrawer,
  contentClassName = "flex flex-col gap-6 p-6 lg:gap-8 lg:p-16",
}: DashboardShellProps) {
  const [activeNav, setActiveNav] = useState(initialActiveId);
  return (
    <>
      <Header />
      <DashboardSidebar activeId={activeNav} onNavigate={setActiveNav} navItems={navItems} />
      <main className="min-h-screen bg-dark-main lg:ml-[100px]">
        <div className={contentClassName}>{children}</div>
      </main>
      {mobileDrawer}
    </>
  );
}
