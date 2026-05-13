type NotificationDotProps = {
  className?: string;
};

/**
 * Small red status dot. Purely visual; consumers position it
 * (e.g. via `absolute right-2.5 top-2.5` on top of an IconButton).
 */
export function NotificationDot({ className = "" }: NotificationDotProps) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none h-2 w-2 rounded-full bg-brand-main ${className}`}
    />
  );
}
