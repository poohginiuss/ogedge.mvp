import { ActionButton, IconButton } from "../atoms";

type OrderActionGroupProps = {
  hasNotification?: boolean;
  onNotification?: () => void;
  onView?: () => void;
  onChat?: () => void;
  /** Render the Claim button at the end of the group. */
  canClaim?: boolean;
  onClaim?: () => void;
  className?: string;
};

export function OrderActionGroup({
  hasNotification = false,
  onNotification,
  onView,
  canClaim = false,
  onClaim,
  className = "flex shrink-0 items-center gap-2",
}: OrderActionGroupProps) {
  return (
    <div className={className}>
      <div className="relative">
        <IconButton
          icon="/images/dashboard/icons/notification.svg"
          iconClassName="h-6 w-6"
          variant="ghost"
          aria-label="Notifications"
          onClick={onNotification}
        />
        {hasNotification && (
          <span className="absolute right-2.5 top-2.5 size-2.5 animate-pulse rounded-full bg-[#ff975d]" />
        )}
      </div>
      <ActionButton icon="/images/dashboard/icons/open-view.svg" onClick={onView}>
        View Order
      </ActionButton>
      {canClaim && (
        <ActionButton
          icon="/images/dashboard/icons/claim-icon.svg"
          variant="outline"
          onClick={onClaim}
        >
          Claim
        </ActionButton>
      )}
    </div>
  );
}
