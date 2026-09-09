import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "AI-Based Student Performance Prediction",
    organization: "AI Research Labs",
    domain: "Artificial Intelligence",
    mode: "Hybrid",
    location: "Chennai",
    duration: "6 Months",
    status: "Open",
    deadline: "30 September 2026",
    researchers: 8,
    description:
      "Collaborative research project focused on developing machine learning models to predict student performance and identify learning gaps.",
    eligibility:
      "Faculty members with experience in AI, Machine Learning, Data Science or Educational Technology.",
    skills: ["Python", "Machine Learning", "Data Science", "AI"],
  },
  {
    id: 2,
    title: "Smart Campus IoT Research",
    organization: "Smart Technology Institute",
    domain: "IoT",
    mode: "On-site",
    location: "Bangalore",
    duration: "8 Months",
    status: "Open",
    deadline: "10 October 2026",
    researchers: 6,
    description:
      "Research collaboration focused on IoT-based solutions for smart campuses, energy monitoring and intelligent infrastructure.",
    eligibility:
      "Faculty members from CSE, ECE, IT, IoT or related engineering disciplines.",
    skills: ["IoT", "Embedded Systems", "Cloud", "Sensors"],
  },
  {
    id: 3,
    title: "Natural Language Processing Research",
    organization: "Language Intelligence Centre",
    domain: "NLP",
    mode: "Online",
    location: "Online",
    duration: "5 Months",
    status: "Open",
    deadline: "18 October 2026",
    researchers: 10,
    description:
      "Research initiative exploring NLP techniques for educational content analysis, multilingual learning and intelligent tutoring systems.",
    eligibility:
      "Faculty members with research interests in NLP, AI, linguistics or computational methods.",
    skills: ["NLP", "Python", "Deep Learning", "LLMs"],
  },
  {
    id: 4,
    title: "Cybersecurity Threat Detection",
    organization: "Cyber Security Research Centre",
    domain: "Cybersecurity",
    mode: "Hybrid",
    location: "Hyderabad",
    duration: "7 Months",
    status: "Upcoming",
    deadline: "25 October 2026",
    researchers: 5,
    description:
      "Industry-academia research project focused on detecting cyber threats using machine learning and behavioural analysis.",
    eligibility:
      "Faculty members working in Cybersecurity, Network Security, AI or Information Security.",
    skills: ["Cybersecurity", "Network Security", "ML", "Threat Detection"],
  },
  {
    id: 5,
    title: "Cloud-Native Education Platform",
    organization: "Cloud Technology Partner",
    domain: "Cloud Computing",
    mode: "Hybrid",
    location: "Chennai",
    duration: "6 Months",
    status: "Upcoming",
    deadline: "5 November 2026",
    researchers: 7,
    description:
      "Collaborative research project for designing scalable cloud-native platforms to support digital learning environments.",
    eligibility:
      "Faculty members with experience in Cloud Computing, DevOps, Distributed Systems or Web Technologies.",
    skills: ["AWS", "Azure", "Docker", "Kubernetes"],
  },
];

const sidebarItems = [
  {
    label: "Dashboard",
    icon: BriefcaseBusiness,
    path: "/academician/dashboard",
  },
  {
    label: "Students",
    icon: Users,
    path: "/academician/students",
  },
  {
    label: "Faculty Opportunities",
    icon: BriefcaseBusiness,
    path: "/academician/opportunities",
  },
  {
    label: "FDP Programs",
    icon: CalendarDays,
    path: "/academician/fdp-programs",
  },
  {
    label: "Research Projects",
    icon: BriefcaseBusiness,
    path: "/academician/research",
  },
  {
    label: "Collaborations",
    icon: Users,
    path: "/academician/collaborations",
  },
  {
    label: "Workshops",
    icon: CalendarDays,
    path: "/academician/workshops",
  },
  {
    label: "Messages",
    icon: Users,
    path: "/academician/messages",
  },
];

export default function ResearchProjects() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [joinedProjects, setJoinedProjects] = useState([]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const text = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(text) ||
        project.organization.toLowerCase().includes(text) ||
        project.domain.toLowerCase().includes(text) ||
        project.skills.some((skill) =>
          skill.toLowerCase().includes(text)
        );

      const matchesDomain =
        domainFilter === "All" ||
        project.domain === domainFilter;

      const matchesMode =
        modeFilter === "All" ||
        project.mode === modeFilter;

      return matchesSearch && matchesDomain && matchesMode;
    });
  }, [search, domainFilter, modeFilter]);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const handleJoin = (project) => {
    if (joinedProjects.includes(project.id)) return;

    setJoinedProjects((prev) => [...prev, project.id]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => navigate("/academician/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <BriefcaseBusiness className="w-5 h-5 text-white" />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold text-slate-900">
                LearnBridge
              </h1>
              <p className="text-xs text-slate-500">
                Academician Portal
              </p>
            </div>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/academician/research";

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>

                {active && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen p-6 md:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <button
              onClick={() => navigate("/academician/dashboard")}
              className="hover:text-blue-600"
            >
              Dashboard
            </button>

            <ChevronRight className="w-4 h-4" />

            <span className="text-slate-900">
              Research Projects
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Research Projects
              </h2>

              <p className="text-slate-500 mt-1">
                Explore industry research projects and academic
                collaboration opportunities.
              </p>
            </div>

            <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-500">
                Available Projects
              </p>

              <p className="text-xl font-bold text-slate-900">
                {filteredProjects.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search research projects, organizations or skills..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Domains</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="IoT">IoT</option>
              <option value="NLP">NLP</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Cloud Computing">
                Cloud Computing
              </option>
            </select>

            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Modes</option>
              <option value="Online">Online</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />

            <h3 className="text-lg font-semibold text-slate-900">
              No research projects found
            </h3>

            <p className="text-slate-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredProjects.map((project) => {
              const joined = joinedProjects.includes(project.id);

              return (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <BriefcaseBusiness className="w-6 h-6 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {project.organization}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        project.status === "Open"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {project.domain}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {project.mode}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 className="w-4 h-4 text-slate-400" />
                      {project.duration}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {project.deadline}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-6 mt-5 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users className="w-4 h-4" />
                      {project.researchers} researchers
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleJoin(project)}
                        disabled={joined || project.status !== "Open"}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                          joined
                            ? "bg-green-50 text-green-700"
                            : project.status !== "Open"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {joined ? "Joined" : "Join Project"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <BriefcaseBusiness className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedProject.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedProject.organization}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                  {selectedProject.domain}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedProject.mode}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedProject.location}
                </span>

                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedProject.status === "Open"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {selectedProject.status}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  About the Research
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Eligibility
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedProject.eligibility}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Duration
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProject.duration}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Application Deadline
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProject.deadline}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProject.location}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Researchers
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProject.researchers}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Required Skills
                </h4>

                <div className="space-y-2">
                  {selectedProject.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleJoin(selectedProject);
                  setSelectedProject(null);
                }}
                disabled={
                  joinedProjects.includes(selectedProject.id) ||
                  selectedProject.status !== "Open"
                }
                className={`px-5 py-2.5 rounded-xl text-sm font-medium ${
                  joinedProjects.includes(selectedProject.id)
                    ? "bg-green-50 text-green-700"
                    : selectedProject.status !== "Open"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {joinedProjects.includes(selectedProject.id)
                  ? "Joined"
                  : selectedProject.status !== "Open"
                  ? "Coming Soon"
                  : "Join Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}