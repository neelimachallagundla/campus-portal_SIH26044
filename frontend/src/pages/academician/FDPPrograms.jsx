import {
  ArrowRight,
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

const fdpPrograms = [
  {
    id: 1,
    title: "Advanced Artificial Intelligence & GenAI",
    organizer: "LearnBridge AI Academy",
    category: "Artificial Intelligence",
    mode: "Online",
    location: "Online",
    duration: "5 Days",
    startDate: "21 September 2026",
    endDate: "25 September 2026",
    status: "Upcoming",
    participants: 48,
    description:
      "A comprehensive faculty development program covering Artificial Intelligence, Generative AI, prompt engineering and practical AI applications in education.",
    eligibility:
      "Faculty members from Computer Science, AI & Data Science, IT and related disciplines.",
    topics: [
      "Artificial Intelligence",
      "Generative AI",
      "Prompt Engineering",
      "AI in Education",
    ],
  },
  {
    id: 2,
    title: "Cloud Computing & DevOps",
    organizer: "Cloud Technology Partner",
    category: "Cloud & DevOps",
    mode: "Hybrid",
    location: "Chennai",
    duration: "5 Days",
    startDate: "28 September 2026",
    endDate: "2 October 2026",
    status: "Upcoming",
    participants: 36,
    description:
      "Hands-on faculty development program focused on cloud platforms, containers, CI/CD pipelines and modern DevOps practices.",
    eligibility:
      "Faculty members interested in Cloud Computing, DevOps and modern software deployment.",
    topics: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    organizer: "Data Science Research Centre",
    category: "Data Science",
    mode: "Online",
    location: "Online",
    duration: "7 Days",
    startDate: "5 October 2026",
    endDate: "11 October 2026",
    status: "Upcoming",
    participants: 62,
    description:
      "Faculty development program designed to strengthen practical knowledge in data analysis, machine learning and predictive modelling.",
    eligibility:
      "Faculty members from CSE, IT, Data Science, Mathematics and related departments.",
    topics: ["Python", "Pandas", "Machine Learning", "Data Analysis"],
  },
  {
    id: 4,
    title: "Cybersecurity & Ethical Hacking",
    organizer: "Cybersecurity Industry Partner",
    category: "Cybersecurity",
    mode: "On-site",
    location: "Hyderabad",
    duration: "3 Days",
    startDate: "12 October 2026",
    endDate: "14 October 2026",
    status: "Ongoing",
    participants: 29,
    description:
      "Practical training covering cybersecurity fundamentals, network security, threat analysis and ethical hacking concepts.",
    eligibility:
      "Faculty members from CSE, IT, Cybersecurity and related engineering disciplines.",
    topics: [
      "Network Security",
      "Ethical Hacking",
      "Threat Detection",
      "Cybersecurity",
    ],
  },
  {
    id: 5,
    title: "Modern Web Development",
    organizer: "Software Engineering Academy",
    category: "Web Development",
    mode: "Hybrid",
    location: "Bangalore",
    duration: "5 Days",
    startDate: "19 October 2026",
    endDate: "23 October 2026",
    status: "Upcoming",
    participants: 44,
    description:
      "Faculty development program covering modern frontend and backend development using React, Node.js, APIs and databases.",
    eligibility:
      "Faculty members interested in Full Stack Development and modern web technologies.",
    topics: ["React", "Node.js", "REST APIs", "SQL", "Git"],
  },
];

const sidebarItems = [
  {
    label: "Dashboard",
    icon: CalendarDays,
    path: "/academician/dashboard",
  },
  {
    label: "Students",
    icon: Users,
    path: "/academician/students",
  },
  {
    label: "Faculty Opportunities",
    icon: CalendarDays,
    path: "/academician/opportunities",
  },
  {
    label: "FDP Programs",
    icon: CalendarDays,
    path: "/academician/fdp-programs",
  },
  {
    label: "Research Projects",
    icon: CalendarDays,
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

export default function FDPPrograms() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [registeredPrograms, setRegisteredPrograms] = useState([]);

  const filteredPrograms = useMemo(() => {
    return fdpPrograms.filter((program) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        program.title.toLowerCase().includes(searchText) ||
        program.organizer.toLowerCase().includes(searchText) ||
        program.category.toLowerCase().includes(searchText) ||
        program.topics.some((topic) =>
          topic.toLowerCase().includes(searchText)
        );

      const matchesCategory =
        categoryFilter === "All" ||
        program.category === categoryFilter;

      const matchesMode =
        modeFilter === "All" || program.mode === modeFilter;

      return matchesSearch && matchesCategory && matchesMode;
    });
  }, [search, categoryFilter, modeFilter]);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const handleRegister = (program) => {
    if (registeredPrograms.includes(program.id)) return;

    setRegisteredPrograms((prev) => [...prev, program.id]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => navigate("/academician/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-white" />
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.path === "/academician/fdp-programs";

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

        {/* Logout */}
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

      {/* MAIN */}
      <main className="ml-64 min-h-screen p-6 md:p-8">
        {/* Header */}
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
              FDP Programs
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                FDP Programs
              </h2>

              <p className="text-slate-500 mt-1">
                Discover faculty development programs and enhance
                your professional skills.
              </p>
            </div>

            <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-500">
                Available Programs
              </p>

              <p className="text-xl font-bold text-slate-900">
                {filteredPrograms.length}
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search FDP programs, topics or organizers..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Cloud & DevOps">
                Cloud & DevOps
              </option>
              <option value="Data Science">
                Data Science
              </option>
              <option value="Cybersecurity">
                Cybersecurity
              </option>
              <option value="Web Development">
                Web Development
              </option>
            </select>

            {/* Mode */}
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

        {/* PROGRAM CARDS */}
        {filteredPrograms.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />

            <h3 className="text-lg font-semibold text-slate-900">
              No FDP programs found
            </h3>

            <p className="text-slate-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredPrograms.map((program) => {
              const isRegistered = registeredPrograms.includes(
                program.id
              );

              return (
                <div
                  key={program.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <CalendarDays className="w-6 h-6 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {program.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {program.organizer}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        program.status === "Ongoing"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {program.category}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {program.mode}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {program.location}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 className="w-4 h-4 text-slate-400" />
                      {program.duration}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {program.startDate}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-6 mt-5 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {program.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users className="w-4 h-4" />
                      {program.participants} participants
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedProgram(program)
                        }
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleRegister(program)}
                        disabled={isRegistered}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                          isRegistered
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {isRegistered ? "Registered" : "Register"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* DETAILS MODAL */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedProgram.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedProgram.organizer}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                  {selectedProgram.category}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedProgram.mode}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedProgram.location}
                </span>

                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedProgram.status === "Ongoing"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {selectedProgram.status}
                </span>
              </div>

              {/* About */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  About the Program
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedProgram.description}
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Eligibility
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedProgram.eligibility}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Duration
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProgram.duration}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Start Date
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProgram.startDate}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    End Date
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProgram.endDate}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Participants
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedProgram.participants}
                  </p>
                </div>
              </div>

              {/* Topics */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Program Topics
                </h4>

                <div className="space-y-2">
                  {selectedProgram.topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleRegister(selectedProgram);
                  setSelectedProgram(null);
                }}
                disabled={registeredPrograms.includes(
                  selectedProgram.id
                )}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium ${
                  registeredPrograms.includes(selectedProgram.id)
                    ? "bg-green-50 text-green-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {registeredPrograms.includes(selectedProgram.id)
                  ? "Registered"
                  : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}