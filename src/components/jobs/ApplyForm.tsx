"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

const ICON = "/images/jobs/icons";

const gameOptions = [
  "Valorant",
  "League of Legends",
  "CS2",
  "Overwatch 2",
  "Apex Legends",
  "Fortnite",
  "Rocket League",
  "Other",
];

const positionOptions = ["Booster", "Content Creator", "Support Agent", "Other"];

function FormInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="font-body text-[16px] font-medium leading-[24px] text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-[18px] py-4 font-body text-[16px] leading-[24px] text-white placeholder:text-[14px] placeholder:text-[rgba(255,255,255,0.8)] focus:border-[#ff975d] focus:outline-none"
      />
    </div>
  );
}

function FormSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="font-body text-[16px] font-medium leading-[24px] text-white">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] py-[18px] pl-[18px] pr-10 font-body text-[14px] leading-[20px] text-[rgba(255,255,255,0.8)] focus:border-[#ff975d] focus:outline-none"
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <Image
          src={`${ICON}/dropdown-arrow.svg`}
          alt=""
          width={20}
          height={20}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-180"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function ApplyForm() {
  const [fullName, setFullName] = useState("");
  const [discord, setDiscord] = useState("");
  const [email, setEmail] = useState("");
  const [game, setGame] = useState("");
  const [position, setPosition] = useState("");
  const [about, setAbout] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <section id="apply" className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-0">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background image + dark overlay */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/jobs/apply-bg.png"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)]" />
          </div>

          {/* Content */}
          <div className="relative flex flex-col gap-10 px-8 py-12 lg:flex-row lg:items-center lg:gap-16 lg:px-[80px] lg:py-[60px]">
            {/* Left: info */}
            <div className="flex flex-col gap-10 lg:w-[394px] lg:shrink-0">
              <div className="flex flex-col gap-4">
                <h2 className="font-body text-[24px] font-semibold leading-[24px] text-white">
                  Applying For A Position
                </h2>
                <p className="font-body text-[16px] font-normal leading-[24px] text-white">
                  You may apply for a position and we will respond if we feel you would be needed.
                  No updates or responses will be provided unless accepted. Applications are reviewed
                  only when additional or replacement boosters are needed. If selected, you will be
                  contacted back via the email used on the application with directions to follow.
                  Review the details found in support to carefully to limit the time needed for
                  questions once accepted.
                </p>
                <p className="font-body text-[16px] font-normal leading-[24px] text-white">
                  Whether you&apos;d like a product quote, technical consultation, or general
                  information, our team is ready to assist.
                </p>
              </div>

              {/* T&C checkbox */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-[#d4d4d4] bg-[#f7f7f7] accent-[#ff5c00]"
                />
                <span className="font-body text-[16px] font-medium leading-[20px] text-white">
                  By clicking the button below, you agree to our{" "}
                  <span className="underline">Terms of Service</span> and acknowledge our{" "}
                  <span className="underline">Global Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Right: form */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Row: Full Name + Discord */}
              <div className="flex flex-col gap-4 md:flex-row">
                <FormInput
                  label="Full Name*"
                  placeholder="Lorem Ipsum"
                  value={fullName}
                  onChange={setFullName}
                />
                <FormInput
                  label="Discord*"
                  placeholder="Lorem Ipsum"
                  value={discord}
                  onChange={setDiscord}
                />
              </div>

              {/* Email */}
              <FormInput
                label="Email Address*"
                placeholder="Start typing..."
                type="email"
                value={email}
                onChange={setEmail}
              />

              {/* Row: Game + Position */}
              <div className="flex flex-col gap-4 md:flex-row">
                <FormSelect
                  label="Game Applying for*"
                  options={gameOptions}
                  value={game}
                  onChange={setGame}
                />
                <FormSelect
                  label="Position Applying for*"
                  options={positionOptions}
                  value={position}
                  onChange={setPosition}
                />
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-[16px] font-medium leading-[24px] text-white">
                  Tell us about yourself*
                </label>
                <textarea
                  rows={5}
                  placeholder="Start typing..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="resize-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-[18px] font-body text-[14px] leading-[20px] text-white placeholder:text-[rgba(255,255,255,0.8)] focus:border-[#ff975d] focus:outline-none"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <Button variant="secondary" size="sm" className="w-[256px]">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
