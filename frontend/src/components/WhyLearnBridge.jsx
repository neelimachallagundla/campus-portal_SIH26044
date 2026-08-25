const features = [
  {
    number: "01",
    title: "Assess",
    description:
      "Understand your strengths and identify the skills you need next.",
  },
  {
    number: "02",
    title: "Upskill",
    description:
      "Get personalized learning recommendations based on your career goal.",
  },
  {
    number: "03",
    title: "Match",
    description:
      "Discover opportunities ranked by explainable skill compatibility.",
  },
];

function WhyLearnBridge() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-sm font-bold tracking-widest text-blue-600">
          WHY LEARNBRIDGE
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Turn skill gaps into career opportunities.
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          One platform that aligns student capability with real industry
          requirements.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-2xl border border-slate-200 bg-white p-7"
            >
              <span className="text-sm font-bold text-blue-600">
                {feature.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyLearnBridge;