type SidebarNavItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function SidebarNavItem({
  icon,
  label,
  active = false,
  onClick,
  className = "flex flex-col items-center gap-3",
}: SidebarNavItemProps) {
  return (
    <button type="button" onClick={onClick} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="h-8 w-8" />
      <span
        className="max-w-[75px] text-center font-body text-xs font-semibold uppercase leading-tight"
        style={{ color: active ? "var(--brand-light)" : "var(--dark-muted)" }}
      >
        {label}
      </span>
    </button>
  );
}
