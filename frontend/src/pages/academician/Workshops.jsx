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
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const workshopsData = [
  {
    id: 1,
    title: "Full Stack Development Workshop",
    organizer: "Software Engineering Academy",
    category: "Web Development",
    mode: "Hybrid",
    location: "Chennai",
    duration: "2 Days",
    date: "September 18–19, 2026",
    status: "Upcoming",
    participants: 45,
    description:
      "A practical workshop covering modern full-stack application development with frontend, backend, APIs, authentication, and deployment.",
    eligibility: "Faculty members and final-year students",
    topics: [
      "React Development",
      "REST APIs",
      "Backend Architecture",
      "Authentication",
      "Deployment",
    ],
  },
  {
    id: 2,
    title: "AI Tools for Education",
    organizer: "AI Research Centre",
    category: "Artificial Intelligence",
    mode: "Online",
    location: "Online",
    duration: "1 Day",
    date: "September 22, 2026",
    status: "Open",
    participants: 68,
    description:
      "Explore practical AI tools that can help educators create learning content, assessments, personalized learning experiences, and academic resources.",
    eligibility: "Faculty and academic professionals",
    topics: [
      "Generative AI",
      "AI-Assisted Teaching",
      "Prompt Engineering",
      "Assessment Automation",
      "Responsible AI",
    ],
  },
  {
    id: 3,
    title: "Advanced SQL & Database Optimization",
    organizer: "Data Systems Lab",
    category: "Databases",
    mode: "On-site",
    location: "Bangalore",
    duration: "2 Days",
    date: "September 25–26, 2026",
    status: "Open",
    participants: 32,
    description:
      "Hands-on database workshop focused on advanced SQL, query optimization, indexing, transactions, and database performance tuning.",
    eligibility: "Faculty members with database fundamentals",
    topics: [
      "Advanced SQL",
      "Query Optimization",
      "Indexing",
      "Transactions",
      "Performance Tuning",
    ],
  },
  {
    id: 4,
    title: "DevOps & CI/CD Hands-on Workshop",
    organizer: "Cloud Technology Partner",
    category: "Cloud & DevOps",
    mode: "Hybrid",
    location: "Hyderabad",
    duration: "2 Days",
    date: "October 3–4, 2026",
    status: "Upcoming",
    participants: 40,
    description:
      "A hands-on introduction to DevOps practices, CI/CD pipelines, containerization, cloud deployment, and monitoring.",
    eligibility: "Faculty and technical trainers",
    topics: [
      "Git & GitHub",
      "CI/CD",
      "Docker",
      "Cloud Deployment",
      "Monitoring",
    ],
  },
  {
    id: 5,
    title: "Cybersecurity Awareness Workshop",
    organizer: "Cyber Security Group",
    category: "Cybersecurity",
    mode: "Online",
    location: "Online",
    duration: "1 Day",
    date: "September 10, 2026",
    status: "Ongoing",
    participants: 54,
    description:
      "Learn practical cybersecurity awareness techniques, common attack patterns, secure practices, and strategies for protecting academic systems.",
    eligibility: "Faculty, staff, and academic administrators",
    topics: [
      "Phishing Awareness",
      "Password Security",
      "Data Protection",
      "Social Engineering",
      "Incident Response",
    ],
  },
];

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/academician/dashboard",
    icon: BriefcaseBusiness,
  },
  {
    label: "Students",
    path: "/academician/students",
    icon: Users,
  },
  {
    label: "Faculty Opportunities",
    path: "/academician/opportunities",
    icon: ChevronRight,
  },
  {
    label: "FDP Programs",
    path: "/academician/fdp-programs",
    icon: CalendarDays,
  },
  {
    label: "Research Projects",
    path: "/academician/research",
    icon: Wrench,
  },
  {
    label: "Collaborations",
    path: "/academician/collaborations",
    icon: Users,
  },
  {
    label: "Workshops",
    path: "/academician/workshops",
    icon: Wrench,
  },
  {
    label: "Messages",
    path: "/academician/messages",
    icon: BriefcaseBusiness,
  },
];

function Workshops() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [mode, setMode] = useState("All Modes");
  const [status, setStatus] = useState("All Status");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [registered, setRegistered] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const filteredWorkshops = useMemo(() => {
    return workshopsData.filter((workshop) => {
      const searchMatch =
        workshop.title.toLowerCase().includes(search.toLowerCase()) ||
        workshop.organizer.toLowerCase().includes(search.toLowerCase()) ||
        workshop.category.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All Categories" || workshop.category === category;

      const modeMatch = mode === "All Modes" || workshop.mode === mode;

      const statusMatch =
        status === "All Status" || workshop.status === status;

      return searchMatch && categoryMatch && modeMatch && statusMatch;
    });
  }, [search, category, mode, status]);

  const handleRegister = (id) => {
    setRegistered((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    "All Categories",
    ...new Set(workshopsData.map((item) => item.category)),
  ];

  const modes = ["All Modes", "Online", "On-site", "Hybrid"];

  const statuses = ["All Status", "Open", "Upcoming", "Ongoing"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">LearnBridge</h1>
          <p className="text-sm text-slate-500 mt-1">Academician Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/academician/workshops";

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <ArrowRight size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>Academician</span>
              <ChevronRight size={16} />
              <span className="text-slate-900">Workshops</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Workshops
                </h2>
                <p className="text-slate-500 mt-1">
                  Discover and participate in skill-building workshops.
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
                <Wrench size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {filteredWorkshops.length} Workshops
                </span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search workshops..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {modes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Workshop Cards */}
          {filteredWorkshops.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <Wrench
                size={42}
                className="mx-auto text-slate-300 mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-900">
                No workshops found
              </h3>
              <p className="text-slate-500 mt-1">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredWorkshops.map((workshop) => {
                const isRegistered = registered.includes(workshop.id);

                return (
                  <div
                    key={workshop.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <Wrench size={22} className="text-blue-600" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">
                            {workshop.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {workshop.organizer}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          workshop.status === "Open"
                            ? "bg-emerald-50 text-emerald-700"
                            : workshop.status === "Ongoing"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {workshop.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
                        {workshop.category}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
                        {workshop.mode}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                      {workshop.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={16} className="text-blue-600" />
                        <span>{workshop.date}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock3 size={16} className="text-blue-600" />
                        <span>{workshop.duration}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-blue-600" />
                        <span>{workshop.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-blue-600" />
                        <span>{workshop.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setSelectedWorkshop(workshop)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                      >
                        View Details
                        <ChevronRight size={17} />
                      </button>

                      <button
                        onClick={() => handleRegister(workshop.id)}
                        disabled={workshop.status === "Ongoing"}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold ${
                          workshop.status === "Ongoing"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : isRegistered
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <CheckCircle2 size={17} />
                            Registered
                          </>
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    {selectedWorkshop.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                    {selectedWorkshop.mode}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedWorkshop.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedWorkshop.organizer}
                </p>
              </div>

              <button
                onClick={() => setSelectedWorkshop(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-slate-600 leading-relaxed">
                {selectedWorkshop.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedWorkshop.date}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedWorkshop.duration}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedWorkshop.location}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">Eligibility</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedWorkshop.eligibility}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <h4 className="font-bold text-slate-900 mb-3">
                  Workshop Topics
                </h4>

                <div className="flex flex-wrap gap-2">
                  {selectedWorkshop.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {selectedWorkshop.participants} Participants
                    </p>
                    <p className="text-xs text-slate-500">
                      Currently registered
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedWorkshop.status === "Open"
                      ? "bg-emerald-50 text-emerald-700"
                      : selectedWorkshop.status === "Ongoing"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {selectedWorkshop.status}
                </span>
              </div>

              <button
                onClick={() => {
                  handleRegister(selectedWorkshop.id);
                  if (selectedWorkshop.status !== "Ongoing") {
                    setSelectedWorkshop(null);
                  }
                }}
                disabled={selectedWorkshop.status === "Ongoing"}
                className={`w-full mt-6 py-3 rounded-xl font-semibold ${
                  selectedWorkshop.status === "Ongoing"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : registered.includes(selectedWorkshop.id)
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {registered.includes(selectedWorkshop.id)
                  ? "Successfully Registered"
                  : selectedWorkshop.status === "Ongoing"
                  ? "Registration Closed"
                  : "Register for Workshop"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workshops;