"use client";

import { Button } from "@/components/ui/Button";

export function ContactMethods() {
  return (
    <div className="flex flex-col gap-4">
      {/* Chat with Us */}
      <div
        className="flex flex-col gap-6 rounded-3xl p-8"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-xl font-medium leading-[30px] text-white">Chat with Us</h3>
          <p className="font-body text-base leading-6 text-white">
            Chat with our sales & support team 24/7 for quick answers on product features, pricing
            and more.
          </p>
        </div>
        <Button variant="secondary" size="sm" className="h-14 w-full">
          Chat Now
        </Button>
      </div>

      {/* Email Us */}
      <div
        className="flex flex-col gap-6 rounded-3xl p-8"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-xl font-medium leading-[30px] text-white">Email Us</h3>
          <p className="font-body text-base leading-6 text-white">
            Please contact us on our support email if you have further questions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText("support@ogedge.com")}
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2"
          style={{ background: "rgba(23,25,31,0.3)" }}
        >
          <div className="flex flex-1 flex-col items-start gap-0.5">
            <span className="font-body text-sm leading-5 text-text-secondary">Email:</span>
            <span className="font-body text-base leading-6 text-white">support@ogedge.com</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/contact/copy.svg"
            alt="Copy"
            className="h-6 w-6 opacity-70"
            loading="lazy"
          />
        </button>
      </div>

      {/* Other Support */}
      <div
        className="flex flex-col gap-6 rounded-3xl p-8"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-xl font-medium leading-[30px] text-white">Other Support</h3>
          <p className="font-body text-base leading-6 text-white">
            You can use one of the alternative methods below to contact our team.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href="#whatsapp"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-2xl border border-dark-border transition-colors hover:border-brand-light"
            aria-label="WhatsApp"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/contact/whatsapp.svg"
              alt=""
              className="h-6 w-6"
              loading="lazy"
            />
          </a>
          <a
            href="#discord"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-2xl border border-dark-border transition-colors hover:border-brand-light"
            aria-label="Discord"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/contact/discord.svg"
              alt=""
              className="h-5 w-6"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
