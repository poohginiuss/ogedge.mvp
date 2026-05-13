type AvatarProps = {
  src: string;
  alt?: string;
  /** Fixed size in px (sets width and height via inline style). */
  size?: number;
  /** Pass responsive Tailwind sizing here, e.g. "h-16 w-16 lg:h-[90px] lg:w-[90px]". */
  className?: string;
};

export function Avatar({ src, alt = "", size, className = "" }: AvatarProps) {
  const inline = size != null ? { width: size, height: size } : undefined;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={inline}
    />
  );
}
