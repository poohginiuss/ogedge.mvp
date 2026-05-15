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
        className="absolute right-6 top-[88px] z-10 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: "#232330" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dashboard/icons/nav-close.svg" alt="" className="h-5 w-5" />
      </button>

      {/* Nav panel */}
      <div
        className="absolute left-6 right-6 top-[152px] flex flex-col rounded-3xl px-6 py-8"
        style={{ background: "#17191f" }}
      >
        {navItems.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePick(item.id)}
              className="flex items-center gap-2 rounded-2xl p-4 transition-colors"
              style={isActive ? { background: "#232330" } : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                className="h-4 w-4"
                style={
                  isActive
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(72%) sepia(48%) saturate(1196%) hue-rotate(326deg) brightness(101%) contrast(101%)",
                      }
                    : { opacity: 0.7 }
                }
              />
              <span
                className="font-body text-base font-medium"
                style={{ color: isActive ? "#ff5c00" : "#fff" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Log Out */}
        <button type="button" className="flex items-center gap-2 rounded-2xl p-4 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/icons/nav-logout.svg" alt="" className="h-4 w-4 opacity-70" />
          <span className="font-body text-base font-medium text-white">Log Out</span>
        </button>
      </div>
    </div>
  );
}
