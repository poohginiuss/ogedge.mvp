"use client";

import { useState } from "react";
import Image from "next/image";

const platforms = [
  {
    icon: "/images/affiliate/icon-twitch.svg",
    placeholder: "twitch.tv/",
    name: "twitch",
  },
  {
    icon: "/images/affiliate/icon-youtube.svg",
    placeholder: "youtube.com/",
    name: "youtube",
  },
  {
    icon: "/images/affiliate/icon-twitter.svg",
    placeholder: "x.com/",
    name: "twitter",
  },
  {
    icon: "/images/affiliate/icon-tiktok.svg",
    placeholder: "tiktok.com/",
    name: "tiktok",
  },
  {
    icon: "/images/affiliate/icon-instagram.svg",
    placeholder: "instagram.com/",
    name: "instagram",
  },
];

export function AffiliateApplyForm() {
  const [form, setForm] = useState({
    nickname: "",
    discord: "",
    email: "",
    about: "",
    twitch: "",
    youtube: "",
    twitter: "",
    tiktok: "",
    instagram: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isFormReady =
    form.nickname.trim() !== "" &&
    form.discord.trim() !== "" &&
    form.email.trim() !== "" &&
    form.about.trim() !== "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (isFormReady) setSubmitted(true);
  };

  return (
    <section id="apply" className="relative w-full overflow-hidden">
      {/* Background image + dark overlay */}
      <div className="absolute inset-0 rounded-none">
        <Image
          src="/images/affiliate/apply-bg.png"
          alt=""
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:px-12 xl:px-0 xl:py-16">
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-3xl font-bold text-white xl:text-[36px]">
              Tell us about <span className="text-brand-main">Yourself</span>
            </h2>
            <p className="max-w-[394px] font-body text-base leading-6 text-white">
              These details will help us to give you booster status faster
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-16 xl:flex-row">
              {/* Left column: About fields */}
              <div className="flex flex-1 flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-body text-base font-medium text-white">
                      Nickname*
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      value={form.nickname}
                      onChange={handleChange}
                      disabled={submitted}
                      placeholder="Enter your nickname"
                      className="h-14 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-base text-white placeholder:text-white/50 focus:border-brand-light focus:outline-none disabled:opacity-60"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="font-body text-base font-medium text-white">
                      Discord*
                    </label>
                    <input
                      type="text"
                      name="discord"
                      value={form.discord}
                      onChange={handleChange}
                      disabled={submitted}
                      placeholder="Enter your Discord"
                      className="h-14 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-base text-white placeholder:text-white/50 focus:border-brand-light focus:outline-none disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-base font-medium text-white">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="Start typing..."
                    className="h-14 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-sm text-white placeholder:text-white/80 focus:border-brand-light focus:outline-none disabled:opacity-60"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-base font-medium text-white">
                    Tell us about yourself*
                  </label>
                  <textarea
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="Start typing..."
                    rows={6}
                    className="resize-none rounded-2xl border border-dark-border bg-black/70 px-[18px] py-4 font-body text-sm text-white placeholder:text-white/80 focus:border-brand-light focus:outline-none disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Right column: Platforms */}
              <div className="flex flex-1 flex-col gap-4">
                <p className="font-body text-base font-medium text-white">
                  Your Platforms
                </p>
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-dark-border bg-black/70">
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={31}
                        height={31}
                      />
                    </div>
                    <input
                      type="text"
                      name={platform.name}
                      value={form[platform.name as keyof typeof form]}
                      onChange={handleChange}
                      disabled={submitted}
                      placeholder={platform.placeholder}
                      className="h-14 flex-1 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-base text-white placeholder:text-white focus:border-brand-light focus:outline-none disabled:opacity-60"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit — 3 states: inactive, ready, submitted */}
            <div className="flex justify-center">
              {submitted ? (
                <button
                  type="button"
                  disabled
                  className="flex w-full max-w-[400px] cursor-default items-center justify-center gap-[11px] rounded-3xl px-8 py-6 font-body text-xl font-bold uppercase tracking-[0.4px] text-white"
                  style={{
                    background: "#34a853",
                    border: "2px solid #34a853",
                    boxShadow: "0 4px 12px rgba(52,168,83,0.3)",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <Image
                    src="/images/jobs/icons/check-all.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  Application Submitted
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!isFormReady}
                  onClick={handleSubmit}
                  className={`flex w-full max-w-[400px] cursor-pointer items-center justify-center gap-2 rounded-3xl px-8 py-6 font-body text-xl font-bold uppercase tracking-[0.4px] text-white transition-all ${
                    isFormReady
                      ? "hover:shadow-[0_4px_32px_rgba(255,92,0,0.55)] active:scale-[0.97]"
                      : "cursor-not-allowed opacity-50"
                  }`}
                  style={{
                    backgroundImage: isFormReady
                      ? "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)"
                      : "linear-gradient(90deg, rgba(255,92,0,0.4) 0%, rgba(163,45,5,0.4) 100%)",
                    border: "2px solid #ff975d",
                    boxShadow: isFormReady
                      ? "0 4px 24px rgba(255,92,0,0.35)"
                      : "none",
                  }}
                >
                  Submit Application
                  <Image
                    src="/images/affiliate/icon-arrow.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="rotate-90"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
