"use client";

import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function JobsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-dark-main">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 pb-0 pt-10 md:px-12 lg:flex-row lg:items-start lg:px-0 lg:pb-0 lg:pt-[120px]">
        {/* Left: text + CTA */}
        <div className="z-10 flex flex-col pb-7 items-center text-center lg:w-[704px] lg:items-start lg:text-left">
          <p className="font-body text-[24px] font-light leading-[40px] text-[#d9d9d9] md:text-[32px]">
            Earn with us today! Now hiring
          </p>
          <h1 className="mt-1 font-heading text-[36px] font-bold leading-[1.1] text-[#ff5c00] md:text-[52px] lg:text-[64px] lg:leading-[70px]">
            Boosters, Content Creators &amp; Support
          </h1>
          <p className="mt-4 font-body text-[18px] font-medium leading-[32px] text-[#d9d9d9] md:text-[24px]">
            Join in minutes, get verified, and start earning.
          </p>
          <div className="mt-4">
            <Button
              href="#apply"
              variant="secondary"
              size="lg"
              icon={<ArrowRightIcon size={20} />}
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Right: character + glow */}
        <div className="relative mt-10 -mb-22 h-[340px] w-[400px] md:h-[500px] md:w-[600px] lg:absolute lg:-top-[30px] lg:right-0 lg:mb-0 lg:mt-0 lg:h-[652px] lg:w-[756px]">
          <div
            className="absolute left-1/2 top-1/3 h-[301px] w-[341px] -translate-x-1/2 rounded-full bg-[#ff5c00] opacity-80 blur-[107px]"
            aria-hidden="true"
          />
          <Image
            src="/images/jobs/hero-character.png"
            alt="OGEdge Booster Character"
            fill
            priority
            className="object-contain object-bottom -translate-y-22"
          />
          {/* Bottom fade so character blends into section below */}
          <div
            className="absolute bottom-18 -left-10 -right-10 z-10 h-[200px] lg:bottom-37.5"
            style={{
              background:
                "linear-gradient(to top, var(--dark-main), transparent)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
