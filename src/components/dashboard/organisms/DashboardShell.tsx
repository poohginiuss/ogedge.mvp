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
  /**
   * Controlled active sidebar item id. When provided, the shell becomes
   * fully controlled and `onViewChange` must be supplied to update state.
   */
  activeView?: string;
  /** Called when the user picks a sidebar item. */
  onViewChange?: (id: string) => void;
};

export function DashboardShell({
  navItems,
  initialActiveId = "dashboard",
  children,
  mobileDrawer,
  contentClassName = "flex flex-col gap-6 p-6 lg:gap-8 lg:p-16",
  activeView,
  onViewChange,
}: DashboardShellProps) {
  const [internalActive, setInternalActive] = useState(initialActiveId);
  const resolvedActive = activeView ?? internalActive;
  const handleNavigate = (id: string) => {
    if (activeView === undefined) setInternalActive(id);
    onViewChange?.(id);
  };
  return (
    <>
      <Header />
      <DashboardSidebar activeId={resolvedActive} onNavigate={handleNavigate} navItems={navItems} />
      <main className="min-h-screen bg-dark-main lg:ml-[100px]">
        <div className={contentClassName}>{children}</div>
      </main>
      {mobileDrawer}
    </>
  );
}
