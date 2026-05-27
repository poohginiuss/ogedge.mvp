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
  /** When provided, avatar becomes clickable. */
  onAvatarClick?: () => void;
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
  onAvatarClick,
  className = "flex items-center gap-4",
}: ProfileIdentityProps) {
  const welcomeName = (
    <>
      <span className={welcomeClassName}>{welcomeText}</span>
      <span className={nameClassName}>{name}</span>
    </>
  );

  const avatar = <Avatar src={avatarSrc} alt={avatarAlt} size={avatarSize} className={avatarClassName} />;

  return (
    <div className={className}>
      {onAvatarClick ? (
        <button type="button" onClick={onAvatarClick} className="cursor-pointer rounded-full ring-2 ring-transparent transition-all hover:ring-[#ff975d] hover:shadow-[0_0_12px_rgba(255,92,0,0.3)] active:scale-95">
          {avatar}
        </button>
      ) : avatar}
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
