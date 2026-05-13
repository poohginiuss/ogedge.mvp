"use client";

import type { ReactNode } from "react";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Bottom-sheet style modal overlay for mobile dashboards.
 * The dimmed backdrop is a real <button> so it satisfies keyboard / a11y rules.
 */
export function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end lg:hidden">
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.8)" }}
      />
      <div className="relative w-full rounded-t-3xl border border-brand-light bg-dark-surface">
        {children}
      </div>
    </div>
  );
}
