import { ActionButton, IconButton, NotificationDot } from "../atoms";

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
  onChat,
  canClaim = false,
  onClaim,
  className = "flex items-center gap-2",
}: OrderActionGroupProps) {
  return (
    <div className={className}>
      <IconButton
        icon="/images/dashboard/icons/notification.svg"
        iconClassName="h-6 w-6"
        variant="ghost"
        aria-label="Notifications"
        onClick={onNotification}
        overlay={
          hasNotification ? <NotificationDot className="absolute right-2.5 top-2.5" /> : null
        }
      />
      <ActionButton icon="/images/dashboard/icons/open-view.svg" onClick={onView}>
        View
      </ActionButton>
      <ActionButton icon="/images/dashboard/icons/chat-icon.svg" onClick={onChat}>
        Chat
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
