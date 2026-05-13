import type { ReactNode } from "react";
import { Avatar } from "../atoms";

type ProfileIdentityProps = {
  avatarSrc: string;
  avatarAlt?: string;
  /** Fixed avatar size in px. Use avatarClassName for responsive sizes. */
  avatarSize?: number;
  avatarClassName?: string;
  welcomeText?: string;
  welcomeClassName?: string;
  name: string;
  nameClassName?: string;
  /** Slot rendered below the name (badges, star rating, etc.). */
  meta?: ReactNode;
  /**
   * When true, wraps welcome+name in a tight inner block (no vertical gap),
   * matching the customer profile card. Defaults to false.
   */
  groupWelcomeName?: boolean;
  className?: string;
};

export function ProfileIdentity({
  avatarSrc,
  avatarAlt = "Avatar",
  avatarSize,
  avatarClassName,
  welcomeText = "Welcome,",
  welcomeClassName = "font-body text-xs text-white lg:text-xl",
  name,
  nameClassName = "font-heading text-base font-bold text-white lg:text-[32px]",
  meta,
  groupWelcomeName = false,
  className = "flex items-center gap-4",
}: ProfileIdentityProps) {
  const welcomeName = (
    <>
      <span className={welcomeClassName}>{welcomeText}</span>
      <span className={nameClassName}>{name}</span>
    </>
  );

  return (
    <div className={className}>
      <Avatar src={avatarSrc} alt={avatarAlt} size={avatarSize} className={avatarClassName} />
      <div className="flex flex-col gap-1">
        {groupWelcomeName ? (
          <div className="flex flex-col text-white">{welcomeName}</div>
        ) : (
          welcomeName
        )}
        {meta}
      </div>
    </div>
  );
}
