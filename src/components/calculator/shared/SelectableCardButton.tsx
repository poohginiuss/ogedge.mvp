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
      className={`relative overflow-clip rounded-2xl p-3 text-left transition-all ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        background: "#132934",
        border: selected ? "1px solid #ffa384" : "1px solid #383852",
        boxShadow: selected ? "0 4px 16px rgba(250,70,9,0.32)" : undefined,
        backdropFilter: selected ? "blur(3px)" : undefined,
      }}
    >
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

      {card.image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.image}
          alt=""
          className="pointer-events-none absolute -top-3 bottom-[-12px] right-0 h-[calc(100%+24px)] w-auto max-w-[187px] object-contain object-right"
        />
      )}

      {selected && !locked && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/icons/services/platform-check.svg"
          alt=""
          className="absolute right-[11px] top-[11px] h-4 w-4"
        />
      )}

      {locked && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/icons/services/lock.svg"
          alt=""
          className="absolute right-[11px] top-[11px] h-4 w-4"
        />
      )}
    </button>
  );
}
