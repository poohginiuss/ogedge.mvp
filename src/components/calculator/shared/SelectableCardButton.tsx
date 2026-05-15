export type SelectableCard = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  /** IDs of other cards that become locked when this card is selected */
  locks?: string[];
};

type SelectableCardButtonProps = {
  card: SelectableCard;
  selected: boolean;
  locked: boolean;
  onClick: () => void;
};

export function SelectableCardButton({
  card,
  selected,
  locked,
  onClick,
}: SelectableCardButtonProps) {
  return (
    <button
      type="button"
      disabled={locked}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-3 text-left transition-all ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        background: "#132934",
        border: selected ? "1px solid #ffa384" : "1px solid #383852",
        boxShadow: selected ? "0 4px 16px rgba(250,70,9,0.32)" : undefined,
        backdropFilter: selected ? "blur(3px)" : undefined,
      }}
    >
      {/* Right-side weapon image — overflows top/bottom per Figma */}
      {card.image && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 w-[187px] overflow-hidden"
          style={{ top: -12, bottom: -12 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      {/* Text content — left side */}
      <div className={locked ? "opacity-50" : undefined}>
        <div className="flex flex-col gap-0.5">
          <span className="font-body text-base font-semibold text-white">{card.name}</span>
          {card.description && (
            <span className="max-w-[190px] font-body text-xs font-normal text-white/90">
              {card.description}
            </span>
          )}
        </div>
        <p
          className="mt-1 font-heading text-base font-semibold"
          style={{ color: selected ? "#fa4609" : "#1aad19" }}
        >
          ${card.price.toFixed(2)}
        </p>
      </div>

      {/* Orange checkmark — selected */}
      {selected && !locked && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/icons/services/platform-check.svg"
          alt=""
          className="absolute right-[11px] top-[11px] h-4 w-4"
        />
      )}

      {/* Lock icon */}
      {locked && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/icons/services/lock.svg"
          alt=""
          className="absolute right-[11px] top-[11px] h-4 w-4"
        />
      )}
    </button>
  );
}
