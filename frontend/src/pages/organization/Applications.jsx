import {
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Handshake,
  LogOut,
  MessageSquare,
  Search,
  UserCheck,
  UserX,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialApplications = [
  {
    id: 1,
    student: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    rollNo: "21CSE001",
    internship: "Full Stack Development Internship",
    skills: ["React", "Node.js", "JavaScript"],
    appliedOn: "05 Sep 2026",
    status: "Pending",
    readiness: 88,
  },
  {
    id: 2,
    student: "Priya Sharma",
    email: "priya.sharma@example.com",
    rollNo: "21CSE014",
    internship: "AI & Machine Learning Internship",
    skills: ["Python", "ML", "TensorFlow"],
    appliedOn: "06 Sep 2026",
    status: "Shortlisted",
    readiness: 94,
  },
  {
    id: 3,
    student: "Arjun Reddy",
    email: "arjun.reddy@example.com",
    rollNo: "21CSE021",
    internship: "Full Stack Development Internship",
    skills: ["Java", "React", "SQL"],
    appliedOn: "06 Sep 2026",
    status: "Pending",
    readiness: 79,
  },
  {
    id: 4,
    student: "Sneha Patel",
    email: "sneha.patel@example.com",
    rollNo: "21CSE032",
    internship: "AI & Machine Learning Internship",
    skills: ["Python", "Machine Learning"],
    appliedOn: "07 Sep 2026",
    status: "Rejected",
    readiness: 62,
  },
];

function getOrganizationName() {
  try {
    const profile = JSON.parse(
      localStorage.getItem("learnbridgeOrganizationProfile") || "{}"
    );
    return profile?.name || "TechNova Solutions";
  } catch {
    return "TechNova Solutions";
  }
}

function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0][0] + words[words.length - 1][0]
  ).toUpperCase();
}

export default function OrganizationApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const organizationName = getOrganizationName();

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.student
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.internship
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || application.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [applications, search, filter]);

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id
          ? { ...application, status }
          : application
      )
    );

    setSelected(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const counts = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "Pending").length,
    shortlisted: applications.filter(
      (a) => a.status === "Shortlisted"
    ).length,
    rejected: applications.filter(
      (a) => a.status === "Rejected"
    ).length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Building2 className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="font-bold text-slate-900">LearnBridge</h1>
            <p className="text-xs text-slate-500">Organization Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => navigate("/organization/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Building2 size={19} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/organization/opportunities")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <BriefcaseBusiness size={19} />
            Post Opportunities
          </button>

          <button
            onClick={() => navigate("/organization/internships")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <FileText size={19} />
            Internships
          </button>

          <button
            onClick={() => navigate("/organization/applications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <Users size={19} />
            Applications
          </button>

          <button
            onClick={() => navigate("/organization/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Handshake size={19} />
            Collaborations
          </button>

          <button
            onClick={() => navigate("/organization/messages")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <MessageSquare size={19} />
            Messages
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Applications
            </h2>
            <p className="text-slate-500 mt-1">
              Review and manage student applications.
            </p>
          </div>

          <button
            onClick={() => navigate("/organization/profile")}
            className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold"
          >
            {getInitials(organizationName)}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-bold mt-2">{counts.total}</p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-3xl font-bold mt-2">{counts.pending}</p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Shortlisted</p>
            <p className="text-3xl font-bold mt-2">
              {counts.shortlisted}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Rejected</p>
            <p className="text-3xl font-bold mt-2">{counts.rejected}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white border rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, email or internship..."
                className="w-full pl-11 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              {["All", "Pending", "Shortlisted", "Rejected"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2.5 rounded-xl text-sm ${
                      filter === item
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Student
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Internship
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Skills
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Readiness
                  </th>
                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {application.student}
                      </p>
                      <p className="text-xs text-slate-500">
                        {application.rollNo}
                      </p>
                      <p className="text-xs text-slate-500">
                        {application.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {application.internship}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-1 flex-wrap max-w-45">
                        {application.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-bold text-blue-600">
                        {application.readiness}%
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          application.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : application.status === "Shortlisted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelected(application)}
                        className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              No applications found.
            </div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold">
                  {selected.student}
                </h3>
                <p className="text-sm text-slate-500">
                  {selected.rollNo}
                </p>
              </div>

              <button onClick={() => setSelected(null)}>
                <XCircle />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">{selected.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Applied For</p>
                <p className="font-medium">{selected.internship}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">
                  Skill Readiness
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {selected.readiness}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    updateStatus(selected.id, "Shortlisted")
                  }
                  className="py-3 rounded-xl bg-green-600 text-white flex justify-center items-center gap-2"
                >
                  <UserCheck size={18} />
                  Shortlist
                </button>

                <button
                  onClick={() =>
                    updateStatus(selected.id, "Rejected")
                  }
                  className="py-3 rounded-xl bg-red-600 text-white flex justify-center items-center gap-2"
                >
                  <UserX size={18} />
                  Reject
                </button>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="w-full py-3 bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}