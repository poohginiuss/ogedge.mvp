type BulletListProps = {
  title: string;
  items: string[];
};

export function BulletList({ title, items }: BulletListProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-body text-base font-medium text-white">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/services/check.svg"
              alt=""
              loading="lazy"
              className="mt-0.5 h-[18px] w-[18px] shrink-0"
            />
            <span className="font-body text-sm text-white/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
