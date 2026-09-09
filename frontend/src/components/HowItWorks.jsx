import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Assess",
    description: "Measure technical and soft skills.",
    route: "/skill-assessment",
  },
  {
    number: "02",
    title: "Analyze",
    description: "Reveal your strengths and skill gaps.",
    route: "/skill-assessment",
  },
  {
    number: "03",
    title: "Upskill",
    description: "Follow a personalized learning path.",
    route: "/learning-paths",
  },
  {
    number: "04",
    title: "Match",
    description: "Find relevant roles and programs.",
    route: "/opportunities",
  },
  {
    number: "05",
    title: "Launch",
    description: "Apply, track and showcase your progress.",
    route: "/opportunities",
  },
];

function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          From learning to launch — in five steps.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">

          {steps.map((step) => (
            <button
              key={step.number}
              type="button"
              onClick={() => navigate(step.route)}
              className="rounded-2xl bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-sm font-bold text-blue-600">
                {step.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;