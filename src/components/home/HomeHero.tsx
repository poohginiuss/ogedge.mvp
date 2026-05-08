import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(55,61,80,0.7) 0%, rgba(55,61,80,0.7) 50%, rgba(23,25,31,0.7) 100%), linear-gradient(180deg, rgba(17,17,17,0) 79%, rgb(17,17,17) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pt-[200px] pb-[280px] md:pb-[320px]">
        <h1 className="max-w-[1019px] text-center font-heading text-3xl font-black leading-tight tracking-[-0.96px] text-white md:text-4xl lg:text-[48px] lg:leading-[1.2]">
          OGEdge your competitive edge, <span className="text-brand-light">delivered</span>
        </h1>

        <p className="mt-4 max-w-[655px] text-center font-body text-lg text-white md:text-xl lg:text-2xl">
          Two decades of dominance. Providing elite coaching, boosting, and leveling since 2006
        </p>

        <div className="mt-1 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/star.svg" alt="" className="h-9 w-9 -mr-1" loading="eager" />
          <span className="font-body text-lg font-bold text-brand-light md:text-xl mr-2.5">
            4.9 Star Rating
          </span>
          <span className="font-body text-lg font-medium text-white md:text-xl">10k Reviews</span>
        </div>

        <Link
          href="#games"
          className="mt-10 inline-flex items-center justify-center rounded-3xl border-2 border-brand-light px-8 py-6 font-body text-lg font-bold uppercase tracking-[0.4px] text-white md:text-xl"
          style={{
            background: "linear-gradient(90deg, #ff5c00 0%, #a32d05 100%)",
            boxShadow: "0 4px 32px rgba(255,92,0,0.7)",
          }}
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
}
