type SidebarNavItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

/*
 * Why this component is so deliberately plain:
 *
 * The previous version accepted a `className` prop with a default of
 * `"flex flex-col items-center gap-3"` and then composed it with a
 * hard-coded suffix:
 *
 *   className={`${className} transition-opacity hover:opacity-80`}
 *
 * Editing that template literal during dev caused Next.js to surface a
 * hydration mismatch — Webpack's server and client bundles updated on
 * different reload ticks, so the SSR HTML and the hydrated React tree
 * ended up with two different class strings (see the `(stale) Webpack`
 * tag in the error overlay). Nobody passes a custom `className` to this
 * component anyway, so we now inline a single static literal for the
 * button class. No props in, no template literals, no fallback chain.
 * Result: server and client always produce the exact same DOM.
 *
 * The `active` filter is similarly inlined rather than referenced via
 * `var(--icon-tint-brand-light)` because the CSS variable lookup itself
 * happens at paint time, which is fine — but inlining keeps this
 * particular component zero-dependency on external CSS for the diff
 * React compares during hydration.
 */
const ACTIVE_ICON_FILTER =
  "brightness(0) saturate(100%) invert(72%) sepia(48%) saturate(1196%) hue-rotate(326deg) brightness(101%) contrast(101%)";

export function SidebarNavItem({ icon, label, active = false, onClick }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-3 transition-opacity hover:opacity-80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        className="h-8 w-8"
        style={active ? { filter: ACTIVE_ICON_FILTER } : undefined}
      />
      <span
        className="max-w-[75px] text-center font-body text-xs font-semibold uppercase leading-tight"
        style={{ color: active ? "var(--brand-light)" : "var(--dark-muted)" }}
      >
        {label}
      </span>
    </button>
  );
}
