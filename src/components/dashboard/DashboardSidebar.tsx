import type { NavItem } from "./dashboardData";
import { sidebarNavItems } from "./dashboardData";

type DashboardSidebarProps = {
  activeId: string;
  onNavigate: (id: string) => void;
  navItems?: NavItem[];
};

export function DashboardSidebar({ activeId, onNavigate, navItems }: DashboardSidebarProps) {
  const items = navItems ?? sidebarNavItems;
  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-[100px] flex-col items-center justify-between border-r border-dark-border bg-dark-main pb-8 pt-35 lg:flex">
      <div className="flex flex-col gap-12">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt="" className="h-8 w-8" />
              <span
                className="max-w-[75px] text-center font-body text-xs font-semibold uppercase leading-tight"
                style={{ color: active ? "var(--brand-light)" : "var(--dark-muted)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <button type="button" className="flex flex-col items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/nav-logout.svg" alt="" className="h-8 w-8" />
        <span className="font-body text-xs font-semibold uppercase text-dark-muted">Log out</span>
      </button>
    </nav>
  );
}
