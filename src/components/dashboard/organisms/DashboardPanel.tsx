import type { CSSProperties, ReactNode } from "react";

type DashboardPanelProps = {
  header: ReactNode;
  children?: ReactNode;
  /**
   * Omits the outer chrome (border + bg). Use when rendering the panel
   * content inside a MobileDrawer.
   */
  contentOnly?: boolean;
  /** Hide the body on mobile (header stays visible for tap-to-open UX). */
  hideBodyOnMobile?: boolean;
  /** Outer container className override. */
  className?: string;
  style?: CSSProperties;
  /** Class for the line separating header and body. */
  headerBorderClassName?: string;
  headerBorderStyle?: CSSProperties;
};

export function DashboardPanel({
  header,
  children,
  contentOnly = false,
  hideBodyOnMobile = false,
  className = "overflow-hidden rounded-3xl border border-brand-light bg-dark-surface",
  style,
  headerBorderClassName = "border-b border-dark-border",
  headerBorderStyle,
}: DashboardPanelProps) {
  const headerWithBorder = (
    <div className={headerBorderClassName} style={headerBorderStyle}>
      {header}
    </div>
  );

  if (contentOnly) {
    return (
      <>
        {headerWithBorder}
        {children}
      </>
    );
  }

  return (
    <div className={className} style={style}>
      {headerWithBorder}
      {children && <div className={hideBodyOnMobile ? "hidden lg:block" : ""}>{children}</div>}
    </div>
  );
}
