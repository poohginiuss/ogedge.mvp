"use client";

import { useState } from "react";

type CopyButtonProps = {
  onCopy?: () => void;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** Icon URL override (defaults to the standard copy icon). */
  icon?: string;
  /** Tailwind size classes for the icon. */
  iconClassName?: string;
  className?: string;
};

export function CopyButton({
  onCopy,
  ariaLabel = "Copy",
  icon = "/images/dashboard/icons/copy-icon.svg",
  iconClassName = "h-4 w-4 opacity-70",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative inline-flex">
      <button type="button" onClick={handleCopy} aria-label={ariaLabel} className={`cursor-pointer transition-opacity hover:opacity-70 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className={iconClassName} />
      </button>
      {copied && (
        <span className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 font-body text-xs font-medium text-white" style={{ background: "#383852" }}>
          Copied
        </span>
      )}
    </div>
  );
}
