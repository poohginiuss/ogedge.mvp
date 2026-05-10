import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-dark-main">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/images/404/gamepad.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 44%",
          backgroundSize: "min(900px, 78vw)",
        }}
      />
      {/* Logo */}
      <Link href="/" className="z-10 mt-8">
        <Image
          src="/images/logos/logo-white.png"
          alt="OGEdge"
          width={180}
          height={58}
          unoptimized
          priority
          className="h-[58px] w-auto"
        />
      </Link>

      {/* Center content */}
      <div className="relative z-10 mt-[300px] flex flex-col items-center px-6">
        {/* 404 text */}
        <div className="relative">
          <Image
            src="/images/404/404-text.png"
            alt="404"
            width={476}
            height={180}
            unoptimized
            priority
            className="h-auto w-[220px] md:w-[320px] lg:w-[280px]"
          />
        </div>

        {/* Description */}
        <div className="mt-6 max-w-[466px] text-center font-body text-base leading-[30px] text-[#aaa] md:text-xl">
          <p>Unfortunately the page you&apos;re looking for is not here.</p>
          <p>
            You might like to try going back to the{" "}
            <Link
              href="/"
              className="text-white underline underline-offset-2 hover:text-brand-light"
            >
              homepage
            </Link>
            .
          </p>
        </div>

        {/* Go Back button */}
        <div className="mt-6">
          <Button href="/" variant="primary" size="xs">
            Go Back
          </Button>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="z-10 mt-auto pb-8 pt-16 text-center font-body text-sm leading-5 text-[#999]">
        <p>OGEdge © 2006-2026 All Rights Reserved</p>
        <p>All trademarks and logos belong to their respective owners.</p>
        <p>OGEdge is not endorsed by or affiliated with any game publisher.</p>
      </div>
    </div>
  );
}
