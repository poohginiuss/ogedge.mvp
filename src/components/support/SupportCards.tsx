import { ArrowRightIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

const CARD_GRADIENT =
  "linear-gradient(97deg, rgba(56, 56, 82, 0.5) 0.7%, rgba(35, 35, 48, 0.5) 50.4%, rgba(23, 25, 31, 0.5) 100%)";

export function SupportCards() {
  return (
    <section className="w-full bg-dark-main">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-12 lg:px-20 lg:py-16">
        <div className="flex flex-col gap-4">
          {/* Need Help? - Ticket card */}
          <div
            className="relative rounded-3xl border border-[#2d2d42] p-6 lg:p-8"
            style={{ backgroundImage: CARD_GRADIENT }}
          >
            <div className="absolute right-6 top-6 rounded-lg bg-[rgba(45,194,39,0.2)] px-2 py-1 lg:right-8 lg:top-7">
              <span className="font-body text-sm font-semibold uppercase text-[#34a853]">
                open 24/7
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/support/support-lg.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <h3 className="font-body text-xl font-semibold text-white">
                      Need Help?
                    </h3>
                  </div>
                  <p className="pl-12 font-body text-base font-normal leading-6 text-white">
                    Submit a ticket and we will respond in no time.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#17191f] px-4 py-4 lg:ml-12 lg:flex lg:items-center lg:justify-between lg:px-6">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-body text-base font-bold leading-7 text-[#ff975d] lg:text-lg">
                      Expected response time: 10 minutes
                    </p>
                    <p className="font-body text-sm font-normal leading-6 text-white lg:text-base">
                      We guarantee a response withing 24 hours, regarding any
                      issue.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full cursor-pointer rounded-3xl border-2 border-[#ff975d] bg-gradient-to-r from-[#ff5c00] to-[#a32d05] px-8 py-4 font-body text-base font-bold uppercase text-white shadow-[0px_4px_32px_rgba(255,92,0,0.4)] transition-opacity hover:opacity-90 lg:mt-0 lg:w-auto"
                  >
                    Open Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Chat with Us */}
            <div
              className="flex flex-col justify-between gap-8 rounded-3xl border border-[#2d2d42] p-6 lg:p-8"
              style={{ backgroundImage: CARD_GRADIENT }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/support/chat.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <h3 className="font-body text-xl font-semibold text-white">
                      Chat with Us
                    </h3>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-2xl bg-[rgba(45,194,39,0.2)] px-2 py-1 text-[#34a853]">
                    <span className="text-[4px]">●</span>
                    <span className="font-body text-xs font-normal">
                      Online
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2 pl-12">
                  <p className="font-body text-base font-normal leading-6 text-white">
                    Chat with our sales & support team 24/7 for quick answers on
                    product features, pricing and more.
                  </p>
                  <p className="font-body text-xs font-normal leading-[18px] text-white">
                    Open between 8 AM and 12 PM EST Time,
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex size-[50px] cursor-pointer items-center justify-center rounded-2xl border border-[#383852] transition-colors hover:border-[#ff975d]/60 hover:bg-white/5"
                >
                  <Image
                    src="/images/support/discord.svg"
                    alt="Discord"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  type="button"
                  className="flex size-[50px] cursor-pointer items-center justify-center rounded-2xl border border-[#383852] transition-colors hover:border-[#ff975d]/60 hover:bg-white/5"
                >
                  <Image
                    src="/images/support/whatsapp.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  type="button"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-[#ff975d] px-4 py-3 transition-all hover:bg-[#ff975d]/10 hover:shadow-[0_0_16px_rgba(255,92,0,0.25)]"
                >
                  <Image
                    src="/images/support/send.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="font-body text-base font-bold uppercase tracking-[0.32px] text-white">
                    Live Chat
                  </span>
                </button>
              </div>
            </div>

            {/* Looking for a Job? */}
            <div
              className="flex flex-col justify-between gap-8 rounded-3xl border border-[#2d2d42] p-6 lg:p-8"
              style={{ backgroundImage: CARD_GRADIENT }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/support/job-search.svg"
                    alt=""
                    width={32}
                    height={32}
                  />
                  <h3 className="font-body text-xl font-semibold text-white">
                    Looking for a Job?
                  </h3>
                </div>
                <p className="pl-12 font-body text-base font-normal leading-6 text-white">
                  Apply now!
                </p>
              </div>

              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
              >
                Apply
                <ArrowRightIcon size={20} />
              </Link>
            </div>

            {/* Affiliate Program */}
            <div
              className="flex flex-col justify-between gap-8 rounded-3xl border border-[#2d2d42] p-6 lg:p-8"
              style={{ backgroundImage: CARD_GRADIENT }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-4">
                  <Image
                    src="/images/support/affiliate.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="shrink-0"
                  />
                  <h3 className="font-body text-xl font-semibold text-white">
                    Apply to the Affiliate Program
                  </h3>
                </div>
                <p className="pl-12 font-body text-base font-normal leading-6 text-white">
                  Earn up to 20% commission on every order your audience places
                </p>
              </div>

              <Link
                href="#affiliate"
                className="inline-flex items-center gap-2 font-body text-base font-bold uppercase tracking-[0.32px] text-white transition-colors hover:text-brand-light"
              >
                Apply
                <ArrowRightIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
