"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 md:px-12 lg:px-0 lg:py-16">
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-3xl font-bold text-white lg:text-[36px]">
              Tell us about <span className="text-brand-main">Yourself</span>
            </h2>
            <p className="max-w-[394px] font-body text-base leading-6 text-white">
              These details will help us to give you booster status faster
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-16 lg:flex-row">
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
                      placeholder="Enter your nickname"
                      className="h-14 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-base text-white placeholder:text-white/50 focus:border-brand-light focus:outline-none"
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
                      placeholder="Enter your Discord"
                      className="h-14 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-base text-white placeholder:text-white/50 focus:border-brand-light focus:outline-none"
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
                    placeholder="Start typing..."
                    className="h-14 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-sm text-white placeholder:text-white/80 focus:border-brand-light focus:outline-none"
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
                    placeholder="Start typing..."
                    rows={6}
                    className="resize-none rounded-2xl border border-dark-border bg-black/70 px-[18px] py-4 font-body text-sm text-white placeholder:text-white/80 focus:border-brand-light focus:outline-none"
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
                      placeholder={platform.placeholder}
                      className="h-14 flex-1 rounded-2xl border border-dark-border bg-black/70 px-[18px] font-body text-base text-white placeholder:text-white focus:border-brand-light focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={
                  <Image
                    src="/images/affiliate/icon-arrow.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="rotate-90"
                  />
                }
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
