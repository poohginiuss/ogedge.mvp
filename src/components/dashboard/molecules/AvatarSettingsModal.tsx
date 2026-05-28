"use client";

import { CloseIcon } from "@/components/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type AvatarSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  currentAvatar: string;
};

export function AvatarSettingsModal({ open, onClose, currentAvatar }: AvatarSettingsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setPreview(null);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleRemove = () => {
    setPreview(null);
  };

  const handleSave = () => {
    onClose();
  };

  if (!mounted || !open) return null;

  const avatarSrc = preview || currentAvatar;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />

      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-[640px] flex-col gap-6 overflow-auto rounded-3xl p-5 backdrop-blur-[8px] lg:p-8"
        style={{
          backgroundImage:
            "linear-gradient(125deg, rgba(56,56,82,0.8) 0%, rgba(35,35,48,0.8) 50%, rgba(23,25,31,0.8) 100%)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="font-body text-lg font-semibold text-white lg:text-2xl">
              Avatar settings
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-white/60 transition-colors hover:text-[#ff975d] active:scale-95"
            >
              <CloseIcon size={20} />
            </button>
          </div>
          <p className="font-body text-sm text-white lg:text-lg">
            Please upload your new profile image here.
          </p>
        </div>

        {/* Avatar preview */}
        <div className="flex justify-center">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarSrc}
              alt="Avatar preview"
              className="h-[120px] w-[120px] rounded-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-[-15px] flex cursor-pointer items-center rounded-full border-4 border-dark-surface bg-dark-border p-1 transition-colors hover:bg-[#FF975D]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard/icons/trash-icon.svg"
                alt="Remove"
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>

        {/* Drop zone */}
        <div
          className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border px-4 py-8 transition-colors ${dragOver ? "border-brand-light bg-brand-light/10" : "border-dark-border"}`}
          style={{ background: dragOver ? undefined : "rgba(0,0,0,0.7)" }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <p className="font-body text-sm text-white/80">
            Drag & drop or{" "}
            <span className="font-medium text-[#4285f4] underline">Choose image</span> to upload
          </p>
          <p className="font-body text-xs text-white/80">10MB max file size</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 lg:gap-6">
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl border border-brand-light px-6 py-4 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-all hover:bg-brand-light/10 hover:shadow-[0_0_16px_rgba(255,92,0,0.15)] active:scale-[0.97] lg:rounded-3xl lg:px-8 lg:py-6 lg:text-base"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl border border-brand-light px-6 py-4 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(255,92,0,0.5)] active:scale-[0.97] lg:rounded-3xl lg:px-8 lg:py-6 lg:text-base"
            style={{
              backgroundImage: "linear-gradient(to right, #ff5c00, #a32d05)",
              boxShadow: "0 4px 12px rgba(255,92,0,0.4)",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
