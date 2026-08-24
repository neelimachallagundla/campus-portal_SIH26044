const roles = [
  {
    title: "Students",
    description:
      "Assess skills, discover gaps, learn, apply for opportunities, and build a verified career portfolio.",
  },
  {
    title: "Industry",
    description:
      "Define skill requirements, post opportunities, and discover candidates who match your needs.",
  },
  {
    title: "Academicians",
    description:
      "Explore faculty internships, FDPs, industrial training, and research collaboration opportunities.",
  },
  {
    title: "Institutions",
    description:
      "Monitor student skills, internship participation, placement readiness, and industry demand.",
  },
];

function Ecosystem() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-sm font-bold tracking-widest text-cyan-400">
          ONE CONNECTED ECOSYSTEM
        </p>

        <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
          Built for every side of the academia-industry bridge.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-xl font-bold text-white">
                {role.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Ecosystem;