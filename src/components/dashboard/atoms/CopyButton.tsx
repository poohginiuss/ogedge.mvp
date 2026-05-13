type CopyButtonProps = {
  onCopy?: () => void;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** Icon URL override (defaults to the standard copy icon). */
  icon?: string;
  /** Tailwind size classes for the icon. */
  iconClassName?: string;
  className?: string;
};

export function CopyButton({
  onCopy,
  ariaLabel = "Copy",
  icon = "/images/dashboard/icons/copy-icon.svg",
  iconClassName = "h-4 w-4 opacity-70",
  className = "",
}: CopyButtonProps) {
  return (
    <button type="button" onClick={onCopy} aria-label={ariaLabel} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className={iconClassName} />
    </button>
  );
}
