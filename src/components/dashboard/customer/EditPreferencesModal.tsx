"use client";

import { CloseIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ALL_GAMES = [
  "All Games",
  "Apex Legends",
  "Call of Duty: Black Ops Cold War",
  "Call of Duty: Modern Warfare",
  "Destiny 2",
  "DOTA2",
  "Escape From Tarkov",
  "EverQuest",
  "FIFA 21",
  "Final Fantasy XIV",
  "Fortnite",
  "Genshin Impact",
  "Guild Wars 2",
  "League of Legends",
  "LoL: Wild Rift",
  "Overwatch",
  "Teamfight Tactics",
  "Valorant",
  "World of Warcraft",
];

const TIMEZONES = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00 (PST)",
  "UTC-07:00 (MST)",
  "UTC-06:00 (CST)",
  "UTC-05:00 (EST)",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00 (GMT)",
  "UTC+01:00 (CET)",
  "UTC+02:00 (EET)",
  "UTC+03:00 (MSK)",
  "UTC+04:00",
  "UTC+05:00",
  "UTC+05:30 (IST)",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00 (JST)",
  "UTC+10:00 (AEST)",
  "UTC+11:00",
  "UTC+12:00",
];

type EditPreferencesModalProps = {
  open: boolean;
  onClose: () => void;
};

function GameCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-2 px-4 py-2.5 transition-colors lg:px-6 lg:py-3"
      style={{
        background: checked ? "rgba(255,92,0,0.2)" : "transparent",
      }}
    >
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border"
        style={{
          background: "#feece6",
          borderColor: "#fa4609",
        }}
      >
        {checked && (
          <div
            className="h-3 w-3 rounded-[3px]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgb(255, 151, 93) 2%, rgb(163, 45, 5) 102%)",
            }}
          />
        )}
      </div>
      <span
        className={`font-body text-base leading-6 ${checked ? "font-bold text-brand-main" : "font-normal text-white"}`}
      >
        {label}
      </span>
    </button>
  );
}

function TimezoneSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-dark-border px-4 lg:h-14 lg:rounded-2xl"
        style={{ background: "rgba(0,0,0,0.7)" }}
      >
        <span
          className="font-body text-sm"
          style={{ color: value ? "#fff" : "rgba(255,255,255,0.8)" }}
        >
          {value || "Select"}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/chevron-down.svg"
          alt=""
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+4px)] z-50 max-h-[200px] w-full overflow-auto rounded-2xl border border-dark-border py-1"
          style={{ background: "#232330" }}
        >
          {TIMEZONES.map((tz) => (
            <button
              key={tz}
              type="button"
              onClick={() => {
                onChange(tz);
                setOpen(false);
              }}
              className="flex w-full px-4 py-2 text-left font-body text-sm text-white transition-colors hover:bg-white/10"
            >
              {tz}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function EditPreferencesModal({ open, onClose }: EditPreferencesModalProps) {
  const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set());
  const [nickname, setNickname] = useState("");
  const [timezone, setTimezone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleGame = (game: string) => {
    setSelectedGames((prev) => {
      const next = new Set(prev);
      if (game === "All Games") {
        if (next.has("All Games")) {
          next.clear();
        } else {
          ALL_GAMES.forEach((g) => next.add(g));
        }
      } else {
        if (next.has(game)) {
          next.delete(game);
          next.delete("All Games");
        } else {
          next.add(game);
          if (ALL_GAMES.slice(1).every((g) => next.has(g))) {
            next.add("All Games");
          }
        }
      }
      return next;
    });
  };

  const handleSave = () => {
    onClose();
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />

      {/* Modal — scrollable on mobile */}
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-[640px] flex-col gap-4 overflow-auto rounded-3xl p-5 backdrop-blur-[8px] lg:gap-6 lg:p-8"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(56,56,82,0.8) 0%, rgba(35,35,48,0.8) 50%, rgba(23,25,31,0.8) 100%)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="font-body text-lg font-semibold text-white lg:text-2xl">
              Edit Preferences and Settings
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 transition-colors hover:text-white"
            >
              <CloseIcon size={20} />
            </button>
          </div>
          <p className="font-body text-sm text-white lg:text-lg">Edit information</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Game Preferences */}
          <div className="flex flex-col gap-3">
            <label className="font-body text-sm font-medium leading-5 text-white lg:text-base">
              Game Preferences
            </label>
            <div
              className="max-h-[180px] overflow-auto rounded-2xl border border-dark-border py-2 lg:max-h-[352px] lg:rounded-3xl lg:py-4"
              style={{
                background: "rgba(23,25,31,0.5)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              {ALL_GAMES.map((game) => (
                <GameCheckbox
                  key={game}
                  label={game}
                  checked={selectedGames.has(game)}
                  onChange={() => toggleGame(game)}
                />
              ))}
            </div>
          </div>

          {/* Nickname + Timezone row */}
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="font-body text-sm font-medium leading-5 text-white lg:text-base">
                Nickname
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Start typing..."
                className="h-11 rounded-xl border border-dark-border px-4 font-body text-sm text-white placeholder:text-white/80 focus:border-brand-light focus:outline-none lg:h-14 lg:rounded-2xl"
                style={{ background: "rgba(0,0,0,0.7)" }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="font-body text-sm font-medium leading-5 text-white lg:text-base">
                Timezone
              </label>
              <TimezoneSelect value={timezone} onChange={setTimezone} />
            </div>
          </div>

          {/* About me */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium leading-5 text-white lg:text-base">
              About me
            </label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Start typing..."
              className="h-[100px] resize-none rounded-xl border border-dark-border p-3 font-body text-sm text-white placeholder:text-white/80 focus:border-brand-light focus:outline-none lg:h-[140px] lg:rounded-2xl lg:p-4"
              style={{ background: "rgba(0,0,0,0.7)" }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 lg:gap-6">
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 items-center justify-center rounded-2xl border border-brand-light px-6 py-4 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-colors hover:bg-brand-light/10 lg:rounded-3xl lg:px-8 lg:py-6 lg:text-base"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex flex-1 items-center justify-center rounded-2xl border border-brand-light px-6 py-4 font-body text-sm font-bold uppercase tracking-[0.32px] text-white transition-opacity hover:opacity-85 lg:rounded-3xl lg:px-8 lg:py-6 lg:text-base"
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
