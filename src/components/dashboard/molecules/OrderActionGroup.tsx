import { ChatIcon } from "../orderTableShared";
import { ActionButton } from "../atoms";

type OrderActionGroupProps = {
  chatActive?: boolean;
  onView?: () => void;
  onChat?: () => void;
  canClaim?: boolean;
  onClaim?: () => void;
  className?: string;
};

export function OrderActionGroup({
  chatActive = false,
  onView,
  canClaim = false,
  onClaim,
  className = "flex shrink-0 items-center gap-2",
}: OrderActionGroupProps) {
  return (
    <div className={className}>
      <ChatIcon active={chatActive} />
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
