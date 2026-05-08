import Image from "next/image";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
};

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative flex h-[300px] w-full items-center justify-center overflow-hidden md:h-[400px]">
      <Image src={backgroundImage} alt="" fill sizes="100vw" className="object-cover" priority />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(23,25,31,0.6) 60%, rgba(23,25,31,1) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <h1 className="font-heading text-3xl font-bold text-white md:text-[40px] md:leading-[45px]">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-[600px] font-body text-base text-white/80 md:text-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
