const milestones = [
  {
    year: "2006",
    description:
      "Vivamus augue justo, gravida sit amet pellentesque malesuada, fermentum et turpis. Sed nec porta sem, quis fermentum lectus. Proin non rhoncus orci, non consequat ante. Duis tortor odio, euismod eget libero sed, rutrum finibus mi.",
  },
  {
    year: "2010",
    description:
      "Etiam lacinia interdum nibh, nec feugiat turpis. Integer non libero scelerisque, mattis libero in, convallis risus. Mauris quis orci varius, ultrices nunc eu, cursus lectus. Praesent nec imperdiet felis, quis mattis nisi. Aliquam imperdiet sapien sed elit sagittis, in aliquet erat pretium. Donec sollicitudin nibh sed leo egestas fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    year: "2014",
    description:
      "Suspendisse porta purus massa, at pulvinar sem imperdiet in. Ut nec est vitae nunc commodo posuere ut elementum odio. Suspendisse dapibus mi metus, eget porta purus vehicula a. Etiam commodo, quam nec volutpat scelerisque, nibh nisi mollis nibh, non imperdiet sem nisi at elit. Suspendisse eu molestie neque, id ultrices diam. Donec a lorem at orci tempor mollis vel eget diam. Nulla sit amet ante diam. In sagittis diam quis posuere lacinia. Mauris gravida, risus sed euismod consectetur, nibh eros lacinia nulla, sit amet mattis quam est non risus.",
  },
  {
    year: "2020",
    description:
      "Etiam commodo, quam nec volutpat scelerisque, nibh nisi mollis nibh, non imperdiet sem nisi at elit. Suspendisse eu molestie neque, id ultrices diam. Donec a lorem at orci tempor mollis vel eget diam. Nulla sit amet ante diam. In sagittis diam quis posuere lacinia. Mauris gravida, risus sed euismod consectetur, nibh eros lacinia nulla, sit amet mattis quam est non risus.",
  },
];

export function WhoWeAre() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-bold text-white md:text-[32px] md:leading-8">
          Who We Are
        </h2>
        <p className="font-body text-base leading-6 text-white/80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante ex, aliquam vitae diam
          at, maximus ultrices lorem. Fusce quis vehicula dolor. Cras non maximus leo. Vivamus augue
          justo, gravida sit amet pellentesque malesuada, fermentum et turpis. Sed nec porta sem,
          quis fermentum lectus. Proin non rhoncus orci, non consequat ante. Duis tortor odio,
          euismod eget libero sed, rutrum finibus mi. Etiam lacinia interdum nibh, nec feugiat
          turpis. Integer non libero scelerisque, mattis libero in, convallis risus. Mauris quis
          orci varius, ultrices nunc eu, cursus lectus. Praesent nec imperdiet felis, quis mattis
          nisi. Aliquam imperdiet sapien sed elit sagittis, in aliquet erat pretium. Donec
          sollicitudin nibh sed leo egestas fermentum. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos.
        </p>
      </div>

      {/* Timeline */}
      <div
        className="rounded-3xl p-6"
        style={{
          background:
            "linear-gradient(153deg, rgba(56,56,82,0.3) 0%, rgba(43,45,77,0.3) 50%, rgba(13,15,21,0.3) 100%)",
          border: "1px solid var(--dark-border)",
        }}
      >
        <div className="flex flex-col gap-6">
          {milestones.map((m) => (
            <div key={m.year} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-1 w-1 rounded-full bg-brand-main" />
                <span className="font-heading text-lg font-bold leading-7 text-white">
                  {m.year}
                </span>
              </div>
              <p className="pl-4 font-body text-base leading-6 text-white/80">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
