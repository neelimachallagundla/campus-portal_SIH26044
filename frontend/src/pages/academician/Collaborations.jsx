import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Handshake,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const collaborations = [
  {
    id: 1,
    title: "Industry-Academia Technology Partnership",
    organization: "Tech Innovation Labs",
    type: "Industry Partnership",
    domain: "Technology",
    mode: "Hybrid",
    location: "Chennai",
    duration: "12 Months",
    status: "Active",
    members: 14,
    deadline: "30 September 2026",
    description:
      "A long-term collaboration between academia and industry focused on technology development, student mentoring, faculty training and joint innovation initiatives.",
    eligibility:
      "Faculty members interested in industry collaboration, innovation and technology development.",
    activities: [
      "Industry Mentoring",
      "Joint Projects",
      "Faculty Training",
      "Student Innovation",
    ],
  },
  {
    id: 2,
    title: "AI Research Collaboration",
    organization: "AI Research Centre",
    type: "Research Collaboration",
    domain: "Artificial Intelligence",
    mode: "Online",
    location: "Online",
    duration: "8 Months",
    status: "Open",
    members: 9,
    deadline: "15 October 2026",
    description:
      "Collaborative research initiative connecting faculty researchers with AI experts to develop innovative machine learning and generative AI solutions.",
    eligibility:
      "Faculty members with research interests in AI, Machine Learning, NLP or Data Science.",
    activities: [
      "Joint Research",
      "Paper Publications",
      "AI Workshops",
      "Research Grants",
    ],
  },
  {
    id: 3,
    title: "Cloud Computing Academic Partnership",
    organization: "Cloud Technology Partner",
    type: "Technology Partnership",
    domain: "Cloud Computing",
    mode: "Hybrid",
    location: "Bangalore",
    duration: "10 Months",
    status: "Open",
    members: 11,
    deadline: "20 October 2026",
    description:
      "Partnership focused on cloud technology adoption in academics, faculty training, curriculum development and industry-oriented student projects.",
    eligibility:
      "Faculty members from CSE, IT, Cloud Computing and related departments.",
    activities: [
      "Cloud Training",
      "Curriculum Development",
      "Industry Projects",
      "Certifications",
    ],
  },
  {
    id: 4,
    title: "Smart Campus Innovation Program",
    organization: "Smart Technology Solutions",
    type: "Innovation Partnership",
    domain: "IoT",
    mode: "On-site",
    location: "Hyderabad",
    duration: "9 Months",
    status: "Upcoming",
    members: 7,
    deadline: "5 November 2026",
    description:
      "Collaborative innovation program for developing IoT-based smart campus solutions covering energy management, security and intelligent infrastructure.",
    eligibility:
      "Faculty members working in IoT, ECE, CSE, Embedded Systems or related areas.",
    activities: [
      "IoT Projects",
      "Smart Infrastructure",
      "Prototyping",
      "Innovation Labs",
    ],
  },
  {
    id: 5,
    title: "Cybersecurity Industry Partnership",
    organization: "Cyber Security Research Group",
    type: "Industry Partnership",
    domain: "Cybersecurity",
    mode: "Hybrid",
    location: "Hyderabad",
    duration: "6 Months",
    status: "Open",
    members: 8,
    deadline: "12 November 2026",
    description:
      "Industry-academia collaboration focused on cybersecurity awareness, research, faculty development and practical security projects.",
    eligibility:
      "Faculty members interested in Cybersecurity, Network Security and Information Security.",
    activities: [
      "Security Research",
      "Faculty Training",
      "Security Audits",
      "Industry Projects",
    ],
  },
];

const sidebarItems = [
  {
    label: "Dashboard",
    icon: Building2,
    path: "/academician/dashboard",
  },
  {
    label: "Students",
    icon: Users,
    path: "/academician/students",
  },
  {
    label: "Faculty Opportunities",
    icon: Handshake,
    path: "/academician/opportunities",
  },
  {
    label: "FDP Programs",
    icon: CalendarDays,
    path: "/academician/fdp-programs",
  },
  {
    label: "Research Projects",
    icon: Building2,
    path: "/academician/research",
  },
  {
    label: "Collaborations",
    icon: Handshake,
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

export default function Collaborations() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [selectedCollaboration, setSelectedCollaboration] =
    useState(null);
  const [joinedCollaborations, setJoinedCollaborations] =
    useState([]);

  const filteredCollaborations = useMemo(() => {
    return collaborations.filter((collaboration) => {
      const text = search.toLowerCase();

      const matchesSearch =
        collaboration.title.toLowerCase().includes(text) ||
        collaboration.organization.toLowerCase().includes(text) ||
        collaboration.domain.toLowerCase().includes(text) ||
        collaboration.activities.some((activity) =>
          activity.toLowerCase().includes(text)
        );

      const matchesType =
        typeFilter === "All" ||
        collaboration.type === typeFilter;

      const matchesDomain =
        domainFilter === "All" ||
        collaboration.domain === domainFilter;

      return matchesSearch && matchesType && matchesDomain;
    });
  }, [search, typeFilter, domainFilter]);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const handleJoin = (collaboration) => {
    if (joinedCollaborations.includes(collaboration.id)) return;

    setJoinedCollaborations((prev) => [
      ...prev,
      collaboration.id,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => navigate("/academician/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-white" />
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
            const active =
              item.path === "/academician/collaborations";

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

      {/* MAIN */}
      <main className="ml-64 min-h-screen p-6 md:p-8">
        {/* HEADER */}
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
              Collaborations
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Collaborations
              </h2>

              <p className="text-slate-500 mt-1">
                Connect with industry and research organizations
                for academic collaboration.
              </p>
            </div>

            <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-500">
                Available Collaborations
              </p>

              <p className="text-xl font-bold text-slate-900">
                {filteredCollaborations.length}
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collaborations, organizations or activities..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Industry Partnership">
                Industry Partnership
              </option>
              <option value="Research Collaboration">
                Research Collaboration
              </option>
              <option value="Technology Partnership">
                Technology Partnership
              </option>
              <option value="Innovation Partnership">
                Innovation Partnership
              </option>
            </select>

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Domains</option>
              <option value="Technology">Technology</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Cloud Computing">
                Cloud Computing
              </option>
              <option value="IoT">IoT</option>
              <option value="Cybersecurity">
                Cybersecurity
              </option>
            </select>
          </div>
        </div>

        {/* CARDS */}
        {filteredCollaborations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />

            <h3 className="text-lg font-semibold text-slate-900">
              No collaborations found
            </h3>

            <p className="text-slate-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredCollaborations.map((collaboration) => {
              const joined = joinedCollaborations.includes(
                collaboration.id
              );

              return (
                <div
                  key={collaboration.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Handshake className="w-6 h-6 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {collaboration.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {collaboration.organization}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        collaboration.status === "Open"
                          ? "bg-green-50 text-green-700"
                          : collaboration.status === "Active"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {collaboration.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {collaboration.type}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      {collaboration.domain}
                    </span>

                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {collaboration.location}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 className="w-4 h-4 text-slate-400" />
                      {collaboration.duration}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {collaboration.deadline}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-6 mt-5 line-clamp-2">
                    {collaboration.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {collaboration.activities.map((activity) => (
                      <span
                        key={activity}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users className="w-4 h-4" />
                      {collaboration.members} members
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedCollaboration(collaboration)
                        }
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleJoin(collaboration)}
                        disabled={
                          joined ||
                          collaboration.status === "Upcoming"
                        }
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                          joined
                            ? "bg-green-50 text-green-700"
                            : collaboration.status === "Upcoming"
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {joined ? "Joined" : "Join"}
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
      {selectedCollaboration && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Handshake className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedCollaboration.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedCollaboration.organization}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCollaboration(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                  {selectedCollaboration.type}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedCollaboration.domain}
                </span>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                  {selectedCollaboration.mode}
                </span>

                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedCollaboration.status === "Open"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {selectedCollaboration.status}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  About the Collaboration
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedCollaboration.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Eligibility
                </h4>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedCollaboration.eligibility}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Duration
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedCollaboration.duration}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Deadline
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedCollaboration.deadline}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedCollaboration.location}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Members
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    {selectedCollaboration.members}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Collaboration Activities
                </h4>

                <div className="space-y-2">
                  {selectedCollaboration.activities.map(
                    (activity) => (
                      <div
                        key={activity}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        {activity}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCollaboration(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleJoin(selectedCollaboration);
                  setSelectedCollaboration(null);
                }}
                disabled={
                  joinedCollaborations.includes(
                    selectedCollaboration.id
                  ) ||
                  selectedCollaboration.status === "Upcoming"
                }
                className={`px-5 py-2.5 rounded-xl text-sm font-medium ${
                  joinedCollaborations.includes(
                    selectedCollaboration.id
                  )
                    ? "bg-green-50 text-green-700"
                    : selectedCollaboration.status === "Upcoming"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {joinedCollaborations.includes(
                  selectedCollaboration.id
                )
                  ? "Joined"
                  : selectedCollaboration.status === "Upcoming"
                  ? "Coming Soon"
                  : "Join Collaboration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}