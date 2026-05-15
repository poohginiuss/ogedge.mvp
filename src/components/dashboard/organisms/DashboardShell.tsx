"use client";

import { Header } from "@/components/layout/Header";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { DashboardSidebar } from "../DashboardSidebar";
import type { NavItem } from "../dashboardData";
import { sidebarNavItems } from "../dashboardData";
import { MobileNavPanel } from "./MobileNavPanel";

type DashboardShellProps = {
  navItems?: NavItem[];
  initialActiveId?: string;
  children: ReactNode;
  mobileDrawer?: ReactNode;
  contentClassName?: string;
  /** Extra content rendered on the right side of the mobile title bar. */
  mobileHeaderRight?: ReactNode;
  /**
   * Maps nav-item IDs to URL paths. When provided, the shell uses
   * `usePathname()` to derive the active item and `router.push()`
   * to navigate — turning sidebar clicks into real page navigations.
   */
  routeMap?: Record<string, string>;
  /** @deprecated Use `routeMap` instead for URL-based navigation. */
  activeView?: string;
  /** @deprecated Use `routeMap` instead for URL-based navigation. */
  onViewChange?: (id: string) => void;
};

function resolveActiveFromPath(pathname: string, routeMap: Record<string, string>): string {
  let bestMatch = "dashboard";
  let bestLen = 0;
  for (const [id, path] of Object.entries(routeMap)) {
    if (pathname === path || pathname.startsWith(`${path}/`)) {
      if (path.length > bestLen) {
        bestLen = path.length;
        bestMatch = id;
      }
    }
  }
  return bestMatch;
}

export function DashboardShell({
  navItems,
  initialActiveId = "dashboard",
  children,
  mobileDrawer,
  contentClassName = "flex flex-col gap-6 p-6 lg:gap-8 lg:p-8 xl:p-16",
  mobileHeaderRight,
  routeMap,
  activeView,
  onViewChange,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [internalActive, setInternalActive] = useState(initialActiveId);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const items = navItems ?? sidebarNavItems;

  const resolvedActive = routeMap
    ? resolveActiveFromPath(pathname, routeMap)
    : (activeView ?? internalActive);

  const activeItem = items.find((i) => i.id === resolvedActive);

  const handleNavigate = (id: string) => {
    if (routeMap) {
      const target = routeMap[id];
      if (target) router.push(target);
    } else {
      if (activeView === undefined) setInternalActive(id);
      onViewChange?.(id);
    }
  };

  return (
    <>
      <Header />
      <DashboardSidebar activeId={resolvedActive} onNavigate={handleNavigate} navItems={navItems} />
      <main className="min-h-screen bg-dark-main lg:ml-[100px]">
        {/* Mobile page title bar */}
        <div className="flex items-center gap-3 px-6 pt-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(56,56,82,0.3)" }}
            aria-label="Open navigation"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeItem?.icon ?? "/images/dashboard/icons/nav-dashboard.svg"}
              alt=""
              className="h-5 w-5"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(72%) sepia(48%) saturate(1196%) hue-rotate(326deg) brightness(101%) contrast(101%)",
              }}
            />
          </button>
          <span className="flex-1 font-body text-lg font-bold capitalize text-white">
            {activeItem?.label ?? "Dashboard"}
          </span>
          {mobileHeaderRight}
        </div>

        <div className={contentClassName}>{children}</div>
      </main>
      {mobileDrawer}
      <MobileNavPanel
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={items}
        activeId={resolvedActive}
        onNavigate={handleNavigate}
      />
    </>
  );
}
