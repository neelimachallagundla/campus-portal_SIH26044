function Hero() {
  const skills = [
    { name: "Java", score: 92, color: "bg-emerald-500" },
    { name: "SQL", score: 84, color: "bg-cyan-500" },
    { name: "React", score: 61, color: "bg-blue-500" },
    { name: "Cloud", score: 48, color: "bg-amber-500" },
  ];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid min-h-162.5 max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">

        {/* Left */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-widest text-blue-600">
            ACADEMIA × INDUSTRY
          </p>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Bridge the gap between{" "}
            <span className="text-blue-600">learning</span> and industry.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Assess your skills, discover your gaps, build industry-ready
            capabilities, and connect with the right opportunities — all in
            one ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Assess Your Skills
            </button>

            <button className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-600">
              Explore Opportunities
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>✓ Skill Assessment</span>
            <span>✓ Career Guidance</span>
            <span>✓ Industry Matching</span>
          </div>
        </div>

        {/* Career Readiness Card */}
        <div className="mx-auto w-full max-w-lg">
          <div className="rounded-3xl bg-slate-950 p-8 shadow-2xl">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-400">
                  CAREER READINESS
                </p>

                <p className="mt-3 text-5xl font-bold text-white">
                  78%
                </p>
              </div>

              <div className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                Good Progress
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Your current profile is aligned with your target career.
            </p>

            <div className="mt-8 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-white">
                      {skill.name}
                    </span>

                    <span className="text-slate-400">
                      {skill.score}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${skill.color}`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-blue-900/50 bg-blue-950/40 p-4">
              <p className="text-sm font-semibold text-white">
                ⚠ 2 skill gaps identified
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Improve React and Cloud to increase your career readiness.
              </p>

              <button className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300">
                View Career Path →
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;