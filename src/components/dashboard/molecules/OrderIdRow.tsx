import { CopyButton } from "../atoms";

type OrderIdRowProps = {
  orderId: string;
  onCopy?: () => void;
  idClassName?: string;
  className?: string;
};

export function OrderIdRow({
  orderId,
  onCopy,
  idClassName = "font-body text-base text-white",
  className = "flex items-center gap-2",
}: OrderIdRowProps) {
  return (
    <div className={className}>
      <span className={idClassName}>{orderId}</span>
      <CopyButton ariaLabel="Copy order ID" onCopy={onCopy} />
    </div>
  );
}
