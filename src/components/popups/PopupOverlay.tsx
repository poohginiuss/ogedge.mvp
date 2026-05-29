"use client";

import Image from "next/image";
import { useEffect } from "react";

interface PopupOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  maxHeightClassName?: string;
  paddingClassName?: string;
}

export function PopupOverlay({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-[460px] lg:max-w-[650px]",
  maxHeightClassName = "max-h-[94vh]",
  paddingClassName = "p-5 lg:p-10",
}: PopupOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overscroll-none" onTouchMove={(e) => e.stopPropagation()}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className={`relative w-[90%] ${maxWidth} ${maxHeightClassName} overflow-y-auto overscroll-contain rounded-[20px] backdrop-blur-[8px] ${paddingClassName}`}
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(56, 56, 82, 0.8) 0%, rgba(35, 35, 48, 0.8) 50%, rgba(23, 25, 31, 0.8) 100%)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Close"
        >
          <Image
            src="/images/popups/close-icon.svg"
            alt=""
            width={18}
            height={20}
            className="h-[20px] w-[17.778px]"
          />
        </button>
        {children}
      </div>
    </div>
  );
}
