import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[600px] md:h-[720px] lg:h-[858px] w-full">
        <Image
          src="/images/hero-valorant-bg.png"
          alt="Valorant Boosting"
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(17,17,17,0) 79%, rgb(17,17,17) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="flex max-w-[568px] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[36px]">
              Valorant Boosting
            </h1>
            <p className="font-body text-base text-white md:text-xl lg:text-2xl lg:leading-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
