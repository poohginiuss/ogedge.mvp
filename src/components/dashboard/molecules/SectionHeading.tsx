type SectionHeadingProps = {
  title: string;
  /** When provided, renders a trailing button. */
  onSeeAll?: () => void;
  seeAllLabel?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  title,
  onSeeAll,
  seeAllLabel = "See All",
  className = "flex items-center justify-between",
  titleClassName = "font-heading text-base font-medium text-white lg:text-[32px] lg:font-semibold",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className={titleClassName}>{title}</h2>
      {onSeeAll && (
        <button type="button" onClick={onSeeAll} className="flex items-center gap-2">
          <span className="font-body text-base font-bold uppercase tracking-wide text-white">
            {seeAllLabel}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dashboard/icons/arrow-right-duotone.svg"
            alt=""
            className="h-6 w-6 rotate-90"
          />
        </button>
      )}
    </div>
  );
}
