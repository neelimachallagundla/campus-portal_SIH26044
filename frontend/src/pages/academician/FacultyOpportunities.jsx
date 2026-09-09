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

const opportunitiesData = [
  {
    id: 1,
    title: "Faculty Industry Internship",
    organization: "Technology Industry Partner",
    type: "Internship",
    mode: "Hybrid",
    location: "Chennai",
    duration: "4 Weeks",
    status: "Open",
    deadline: "20 September 2026",
    applicants: 24,
    description:
      "An industry immersion program designed for faculty members to gain practical exposure to modern software development practices and industry workflows.",
    eligibility:
      "Faculty members from Computer Science, Information Technology, AI & Data Science or related departments.",
    skills: ["Java", "React", "SQL", "Software Development"],
  },
  {
    id: 2,
    title: "AI Faculty Development Program",
    organization: "Industry Learning Partner",
    type: "FDP",
    mode: "Online",
    location: "Bangalore",
    duration: "5 Days",
    status: "Upcoming",
    deadline: "28 September 2026",
    applicants: 41,
    description:
      "A focused faculty development program covering Artificial Intelligence, Machine Learning and practical applications of generative AI.",
    eligibility:
      "Faculty members interested in Artificial Intelligence, Machine Learning and emerging technologies.",
    skills: ["Artificial Intelligence", "Machine Learning", "GenAI", "Python"],
  },
  {
    id: 3,
    title: "Industry Research Fellowship",
    organization: "AI Research Labs",
    type: "Research",
    mode: "On-site",
    location: "Hyderabad",
    duration: "3 Months",
    status: "Open",
    deadline: "5 October 2026",
    applicants: 18,
    description:
      "Research fellowship for faculty members interested in collaborative research projects with industry experts and research teams.",
    eligibility:
      "Faculty members with research interests in AI, Data Science, Computer Vision, NLP or related fields.",
    skills: ["Research", "AI", "Data Science", "Computer Vision"],
  },
  {
    id: 4,
    title: "Cloud Computing Faculty Internship",
    organization: "Cloud Technology Partner",
    type: "Internship",
    mode: "Hybrid",
    location: "Chennai",
    duration: "6 Weeks",
    status: "Open",
    deadline: "12 October 2026",
    applicants: 15,
    description:
      "Hands-on industry internship focused on cloud infrastructure, DevOps practices, deployment and cloud-native application development.",
    eligibility:
      "Faculty members from CSE, IT, Cloud Computing or related engineering departments.",
    skills: ["AWS", "Azure", "Docker", "DevOps"],
  },
  {
    id: 5,
    title: "Cybersecurity Faculty FDP",
    organization: "Cybersecurity Industry Partner",
    type: "FDP",
    mode: "Online",
    location: "Mumbai",
    duration: "3 Days",
    status: "Upcoming",
    deadline: "18 October 2026",
    applicants: 32,
    description:
      "An intensive faculty development program covering cybersecurity fundamentals, threat detection and modern security practices.",
    eligibility:
      "Faculty members interested in Cybersecurity, Network Security and Information Security.",
    skills: ["Cybersecurity", "Network Security", "Ethical Hacking"],
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

export default function FacultyOpportunities() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  const filteredOpportunities = useMemo(() => {
    return opportunitiesData.filter((opportunity) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchText) ||
        opportunity.organization.toLowerCase().includes(searchText) ||
        opportunity.location.toLowerCase().includes(searchText) ||
        opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesType =
        typeFilter === "All" || opportunity.type === typeFilter;

      const matchesMode =
        modeFilter === "All" || opportunity.mode === modeFilter;

      return matchesSearch && matchesType && matchesMode;
    });
  }, [search, typeFilter, modeFilter]);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const handleApply = (opportunity) => {
    if (appliedOpportunities.includes(opportunity.id)) return;

    setAppliedOpportunities((prev) => [...prev, opportunity.id]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        {/* Logo */}
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
              <p className="text-xs text-slate-500">Academician Portal</p>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/academician/opportunities";

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

      {/* Main Content */}
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
              Faculty Opportunities
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Faculty Opportunities
              </h2>

              <p className="text-slate-500 mt-1">
                Explore internships, FDPs and research opportunities
                available for faculty.
              </p>
            </div>

            <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-500">Available Opportunities</p>
              <p className="text-xl font-bold text-slate-900">
                {filteredOpportunities.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search opportunities, organizations or skills..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Internship">Internship</option>
              <option value="FDP">FDP</option>
              <option value="Research">Research</option>
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

        {/* Opportunity Cards */}
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />

            <h3 className="text-lg font-semibold text-slate-900">
              No opportunities found
            </h3>

            <p className="text-slate-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredOpportunities.map((opportunity) => {
              const isApplied = appliedOpportunities.includes(
                opportunity.id
              );

              return (
                <div
                  key={opportunity.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <BriefcaseBusiness className="w-6 h-6 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {opportunity.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {opportunity.organization}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        opportunity.status === "Open"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {opportunity.status}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {opportunity.type}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {opportunity.mode}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {opportunity.location}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 className="w-4 h-4 text-slate-400" />
                      {opportunity.duration}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {opportunity.deadline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-6 mt-5 line-clamp-2">
                    {opportunity.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {opportunity.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users className="w-4 h-4" />
                      {opportunity.applicants} applicants
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedOpportunity(opportunity)
                        }
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleApply(opportunity)}
                        disabled={
                          isApplied || opportunity.status !== "Open"
                        }
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                          isApplied
                            ? "bg-green-50 text-green-700 cursor-default"
                            : opportunity.status !== "Open"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {isApplied ? "Applied" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <BriefcaseBusiness className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedOpportunity.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedOpportunity.organization}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                  {selectedOpportunity.type}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedOpportunity.mode}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedOpportunity.location}
                </span>

                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedOpportunity.status === "Open"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {selectedOpportunity.status}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  About the Opportunity
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedOpportunity.description}
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Eligibility
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedOpportunity.eligibility}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedOpportunity.duration}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">Application Deadline</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedOpportunity.deadline}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedOpportunity.location}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">Applicants</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedOpportunity.applicants}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Relevant Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleApply(selectedOpportunity);
                  setSelectedOpportunity(null);
                }}
                disabled={
                  appliedOpportunities.includes(selectedOpportunity.id) ||
                  selectedOpportunity.status !== "Open"
                }
                className={`px-5 py-2.5 rounded-xl text-sm font-medium ${
                  appliedOpportunities.includes(selectedOpportunity.id)
                    ? "bg-green-50 text-green-700"
                    : selectedOpportunity.status !== "Open"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {appliedOpportunities.includes(selectedOpportunity.id)
                  ? "Applied"
                  : selectedOpportunity.status !== "Open"
                  ? "Coming Soon"
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}