/**
 * Card for the "Boosting" calculator category (ImageTopCardCalculator).
 * Three visual variants driven by data:
 *   1. Has `image`  → image fills top 100px, title/desc/price below.
 *                     Selected checkmark is absolute at top-right corner.
 *   2. No `image`   → full padding box, title/desc/price.
 *                     Selected checkmark is inline next to the title.
 *   3. Locked       → content at 50 % opacity, lock icon centred (32 × 31 px).
 *
 * Matches Figma nodes 837:10791 (desktop 4-col) & 1335:6489 (mobile 2-col).
 */

export type ImageTopCard = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  locks?: string[];
};

type ImageTopCardButtonProps = {
  card: ImageTopCard;
  selected: boolean;
  locked: boolean;
  onClick: () => void;
};

export function ImageTopCardButton({
  card,
  selected,
  locked,
  onClick,
}: ImageTopCardButtonProps) {
  const hasImage = !!card.image;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={onClick}
      className={`relative flex w-full flex-col overflow-hidden rounded-2xl text-left transition-all ${
        locked ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{
        background: "#132934",
        border: selected ? "1px solid #ffa384" : "1px solid #383852",
        boxShadow: selected ? "0 4px 16px rgba(250,70,9,0.32)" : undefined,
        backdropFilter: selected ? "blur(3px)" : undefined,
        minHeight: hasImage ? 216 : undefined,
      }}
    >
      {/* ── Image section (only when card.image is set) ── */}
      {hasImage && (
        <div
          className={`relative h-[100px] w-full shrink-0 overflow-hidden rounded-lg ${locked ? "opacity-50" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt=""
            className="absolute left-0 w-full object-cover"
            style={{ top: "-4.08%", height: "103.7%" }}
          />
        </div>
      )}

      {/* ── Text + price section ── */}
      <div
        className={`flex flex-1 flex-col items-start justify-between p-3 ${locked ? "opacity-50" : ""}`}
      >
        <div className="flex flex-col gap-0.5 w-full">
          {/* Title row — checkmark inline when no image, absolute when has image */}
          <div
            className={`flex w-full items-start ${
              selected && !locked && !hasImage ? "justify-between gap-2" : ""
            }`}
          >
            <span className="flex-1 font-body text-base font-semibold leading-normal text-white min-w-0">
              {card.name}
            </span>
            {/* Inline check (no-image cards) */}
            {selected && !locked && !hasImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/icons/services/platform-check.svg"
                alt=""
                className="mt-0.5 h-4 w-4 shrink-0"
              />
            )}
          </div>
          {card.description && (
            <span className="font-body text-xs font-normal leading-normal text-white/90">
              {card.description}
            </span>
          )}
        </div>
        <p
          className="mt-1 font-heading text-base font-semibold leading-normal"
          style={{ color: selected ? "#fa4609" : "#1aad19" }}
        >
          ${card.price.toFixed(2)}
        </p>
      </div>

      {/* ── Absolute checkmark (image cards only) ── */}
      {selected && !locked && hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/icons/services/platform-check.svg"
          alt=""
          className="absolute right-[11px] top-[11px] z-10 h-4 w-4"
        />
      )}

      {/* ── Lock icon — always centred, 32 × 31 px ── */}
      {locked && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/icons/services/lock.svg"
          alt=""
          className="absolute left-1/2 top-1/2 z-10 h-[31px] w-8 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </button>
  );
}
