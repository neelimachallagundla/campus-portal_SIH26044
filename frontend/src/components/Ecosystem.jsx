import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "Students",
    description:
      "Assess skills, discover gaps, learn, apply for opportunities, and build a verified career portfolio.",
    route: "/signup",
  },
  {
    title: "Industry",
    description:
      "Define skill requirements, post opportunities, and discover candidates who match your needs.",
    route: "/login",
  },
  {
    title: "Academicians",
    description:
      "Explore faculty internships, FDPs, industrial training, and research collaboration opportunities.",
    route: "/login",
  },
  {
    title: "Institutions",
    description:
      "Monitor student skills, internship participation, placement readiness, and industry demand.",
    route: "/login",
  },
];

function Ecosystem() {
  const navigate = useNavigate();

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
            <button
              key={role.title}
              type="button"
              onClick={() => navigate(role.route)}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:border-blue-700 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-white">
                {role.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {role.description}
              </p>
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Ecosystem;