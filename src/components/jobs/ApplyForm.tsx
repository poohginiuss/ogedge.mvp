"use client";

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
  disabled,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="font-body text-[16px] font-medium leading-[24px] text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-[18px] py-4 font-body text-[16px] leading-[24px] text-white placeholder:text-[14px] placeholder:text-[rgba(255,255,255,0.8)] focus:border-[#ff975d] focus:outline-none disabled:opacity-60"
      />
    </div>
  );
}

function FormSelect({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="font-body text-[16px] font-medium leading-[24px] text-white">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full cursor-pointer appearance-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] py-[18px] pl-[18px] pr-10 font-body text-[14px] leading-[20px] text-[rgba(255,255,255,0.8)] transition-colors hover:border-[#ff975d] focus:border-[#ff975d] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
  const [submitted, setSubmitted] = useState(false);

  const isFormReady =
    fullName.trim() !== "" &&
    discord.trim() !== "" &&
    email.trim() !== "" &&
    game !== "" &&
    position !== "" &&
    about.trim() !== "" &&
    agreeTerms;

  const handleSubmit = () => {
    if (isFormReady) setSubmitted(true);
  };

  return (
    <section id="apply" className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] lg:px-0 xl:px-0">
        {/* No rounding / x-padding on mobile; rounded + padded on lg+ */}
        <div className="relative overflow-hidden lg:rounded-3xl">
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
          <div className="relative flex flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:px-[80px] lg:py-[60px]">
            {/* Left: info */}
            <div className="flex flex-col gap-6 lg:w-[394px] lg:shrink-0 lg:gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="font-body text-[20px] font-bold leading-[30px] text-white lg:text-[24px] lg:font-semibold lg:leading-[24px]">
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

              {/* T&C checkbox — hidden on mobile (shown below form on mobile) */}
              <label className="hidden cursor-pointer items-start gap-3 lg:flex">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={submitted}
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
              {/* Row: Full Name + Discord — stacked on mobile */}
              <div className="flex flex-col gap-6 md:flex-row md:gap-4">
                <FormInput
                  label="Full name*"
                  placeholder="Lorem Ipsum"
                  value={fullName}
                  onChange={setFullName}
                  disabled={submitted}
                />
                <FormInput
                  label="Discord*"
                  placeholder="Lorem Ipsum"
                  value={discord}
                  onChange={setDiscord}
                  disabled={submitted}
                />
              </div>

              {/* Email */}
              <FormInput
                label="Email Address*"
                placeholder="Start typing..."
                type="email"
                value={email}
                onChange={setEmail}
                disabled={submitted}
              />

              {/* Row: Game + Position — stacked on mobile */}
              <div className="flex flex-col gap-6 md:flex-row md:gap-4">
                <FormSelect
                  label="Game Applying for*"
                  options={gameOptions}
                  value={game}
                  onChange={setGame}
                  disabled={submitted}
                />
                <FormSelect
                  label="Position Applying for*"
                  options={positionOptions}
                  value={position}
                  onChange={setPosition}
                  disabled={submitted}
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
                  disabled={submitted}
                  className="resize-none rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-[18px] font-body text-[14px] leading-[20px] text-white placeholder:text-[rgba(255,255,255,0.8)] focus:border-[#ff975d] focus:outline-none disabled:opacity-60"
                />
              </div>

              {/* T&C checkbox — mobile only (below form, above submit) */}
              <label className="flex cursor-pointer items-start gap-3 lg:hidden">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={submitted}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-[#d4d4d4] bg-[#f7f7f7] accent-[#ff5c00]"
                />
                <span className="font-body text-[16px] font-medium leading-[20px] text-white">
                  By clicking the button below, you agree to our{" "}
                  <span className="underline">Terms of Service</span> and acknowledge our{" "}
                  <span className="underline">Global Privacy Policy</span>.
                </span>
              </label>

              {/* Submit — 3 states: inactive, ready, submitted */}
              {submitted ? (
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-default items-center justify-center gap-[11px] rounded-[16px] px-8 py-5 font-body text-[16px] font-bold uppercase tracking-[0.32px] text-white"
                  style={{
                    background: "#34a853",
                    boxShadow: "0 4px 12px rgba(255,92,0,0.3)",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <Image
                    src={`${ICON}/check-all.svg`}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  Application Submitted
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!isFormReady}
                  onClick={handleSubmit}
                  className={`w-full cursor-pointer rounded-[16px] px-8 py-5 font-body text-[16px] font-bold uppercase tracking-[0.32px] text-white transition-all ${
                    isFormReady
                      ? "border border-[#ff975d] shadow-[0_4px_12px_rgba(255,92,0,0.3)] hover:shadow-[0_4px_20px_rgba(255,92,0,0.5)] active:scale-[0.97]"
                      : "cursor-not-allowed border border-[#383852] opacity-50"
                  }`}
                  style={{
                    backgroundImage: isFormReady
                      ? "linear-gradient(109deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)"
                      : "linear-gradient(109deg, rgba(56,56,82,0.3) 0%, rgba(43,45,77,0.3) 50%, rgba(13,15,21,0.3) 100%)",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
