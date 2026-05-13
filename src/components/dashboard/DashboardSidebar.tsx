import type { NavItem } from "./dashboardData";
import { sidebarNavItems } from "./dashboardData";
import { SidebarNavItem } from "./molecules";

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
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={item.id === activeId}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>
      <SidebarNavItem icon="/images/dashboard/icons/nav-logout.svg" label="Log out" />
    </nav>
  );
}
