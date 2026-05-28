"use client";

import type { NavItem } from "../dashboardData";

type MobileNavPanelProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
};

export function MobileNavPanel({
  open,
  onClose,
  navItems,
  activeId,
  onNavigate,
}: MobileNavPanelProps) {
  if (!open) return null;

  const handlePick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      {/* Dimmed backdrop */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.8)" }}
      />

      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-6 top-[88px] z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition-opacity hover:opacity-80 active:scale-95"
        style={{ background: "#232330" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/nav-close.svg" alt="" className="h-5 w-5" />
      </button>

      {/* Nav panel */}
      <div
        className="absolute left-6 right-6 top-[152px] flex flex-col rounded-3xl bg-dark-main px-6 py-8"
        style={{ border: "1px solid var(--dark-border)" }}
      >
        {navItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePick(item.id)}
              className="flex cursor-pointer items-center gap-2 rounded-2xl p-4 transition-all hover:bg-white/5 active:scale-[0.98]"
              style={isActive ? { background: "#232330" } : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                className="h-5 w-5"
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(72%) sepia(48%) saturate(1196%) hue-rotate(326deg) brightness(101%) contrast(101%)"
                    : "brightness(0) invert(1)",
                }}
              />
              <span
                className="font-body text-base font-medium"
                style={{ color: isActive ? "var(--brand-light)" : "#ffffff" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="mx-4 my-1 border-t border-dark-border" />

        {/* Log Out */}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-2xl p-4 transition-all hover:bg-white/5 hover:text-[#ff975d] active:scale-[0.98]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/nav-logout.svg" alt="" className="h-5 w-5" style={{ filter: "brightness(0) saturate(100%) invert(28%) sepia(67%) saturate(5713%) hue-rotate(355deg) brightness(91%) contrast(97%)" }} />
          <span className="font-body text-base font-medium text-[#c2272d]">Logout</span>
        </button>
      </div>
    </div>
  );
}
