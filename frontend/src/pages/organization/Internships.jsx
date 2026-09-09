import {
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  Edit3,
  FileText,
  Handshake,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialInternships = [
  {
    id: 1,
    title: "Full Stack Development Internship",
    domain: "Software Development",
    skills: ["React", "Node.js", "JavaScript", "SQL"],
    positions: 10,
    applications: 32,
    duration: "6 Months",
    startDate: "15 Oct 2026",
    location: "Hyderabad",
    stipend: "₹20,000/month",
    status: "Active",
  },
  {
    id: 2,
    title: "AI & Machine Learning Internship",
    domain: "Artificial Intelligence",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    positions: 5,
    applications: 18,
    duration: "3 Months",
    startDate: "01 Nov 2026",
    location: "Bangalore",
    stipend: "₹25,000/month",
    status: "Active",
  },
  {
    id: 3,
    title: "Cloud & DevOps Internship",
    domain: "Cloud Computing",
    skills: ["AWS", "Docker", "Linux", "Git"],
    positions: 8,
    applications: 12,
    duration: "4 Months",
    startDate: "10 Dec 2026",
    location: "Remote",
    stipend: "₹18,000/month",
    status: "Draft",
  },
];

const emptyForm = {
  title: "",
  domain: "",
  skills: "",
  positions: "",
  duration: "",
  startDate: "",
  location: "",
  stipend: "",
};

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
  if (!name) return "TN";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
}

export default function OrganizationInternships() {
  const navigate = useNavigate();

  const [internships, setInternships] = useState(initialInternships);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const organizationName = getOrganizationName();
  const initials = getInitials(organizationName);

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(search.toLowerCase()) ||
      internship.domain.toLowerCase().includes(search.toLowerCase()) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesFilter =
      filter === "All" || internship.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (internship) => {
    setEditingId(internship.id);

    setForm({
      title: internship.title,
      domain: internship.domain,
      skills: internship.skills.join(", "),
      positions: internship.positions,
      duration: internship.duration,
      startDate: internship.startDate,
      location: internship.location,
      stipend: internship.stipend,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.domain || !form.positions) {
      setMessage("Please fill all required fields.");
      return;
    }

    const data = {
      title: form.title,
      domain: form.domain,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      positions: Number(form.positions),
      duration: form.duration,
      startDate: form.startDate,
      location: form.location,
      stipend: form.stipend,
    };

    if (editingId) {
      setInternships((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...data } : item
        )
      );
      setMessage("Internship updated successfully.");
    } else {
      setInternships((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          applications: 0,
          status: "Draft",
        },
      ]);

      setMessage("Internship created successfully.");
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);

    setTimeout(() => setMessage(""), 2500);
  };

  const toggleStatus = (id) => {
    setInternships((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Closed" : "Active",
            }
          : item
      )
    );
  };

  const deleteInternship = (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) {
      return;
    }

    setInternships((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <FileText size={19} />
            Internships
          </button>

          <button
            onClick={() => navigate("/organization/applications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
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

      {/* Main */}
      <main className="md:ml-64 min-h-screen p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Internships
            </h2>
            <p className="text-slate-500 mt-1">
              Manage internship programs and hiring positions.
            </p>
          </div>

          <button
            onClick={() => navigate("/organization/profile")}
            className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-sm"
          >
            {initials}
          </button>
        </div>

        {message && (
          <div className="mb-5 rounded-xl bg-blue-50 text-blue-700 px-4 py-3">
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Total Internships</p>
            <p className="text-3xl font-bold mt-2">{internships.length}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Open Positions</p>
            <p className="text-3xl font-bold mt-2">
              {internships
                .filter((item) => item.status === "Active")
                .reduce((sum, item) => sum + Number(item.positions), 0)}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Applications</p>
            <p className="text-3xl font-bold mt-2">
              {internships.reduce(
                (sum, item) => sum + item.applications,
                0
              )}
            </p>
          </div>
        </div>

        {/* Search / Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search internships, domains or skills..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              {["All", "Active", "Draft", "Closed"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button
                onClick={openAddModal}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Add Internship
              </button>
            </div>
          </div>
        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white border border-slate-200 rounded-2xl p-6"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {internship.title}
                  </h3>
                  <p className="text-blue-600 text-sm mt-1">
                    {internship.domain}
                  </p>
                </div>

                <span
                  className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${
                    internship.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : internship.status === "Draft"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {internship.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                <div>
                  <p className="text-slate-400">Positions</p>
                  <p className="font-semibold text-slate-800">
                    {internship.positions}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Applications</p>
                  <p className="font-semibold text-slate-800">
                    {internship.applications}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Duration</p>
                  <p className="font-semibold text-slate-800">
                    {internship.duration}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Start Date</p>
                  <p className="font-semibold text-slate-800">
                    {internship.startDate}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Location</p>
                  <p className="font-semibold text-slate-800">
                    {internship.location}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Stipend</p>
                  <p className="font-semibold text-slate-800">
                    {internship.stipend}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => openEditModal(internship)}
                  className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 flex items-center gap-2 text-sm"
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                <button
                  onClick={() => toggleStatus(internship.id)}
                  className="px-3 py-2 rounded-lg bg-green-50 text-green-700 flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 size={16} />
                  {internship.status === "Active" ? "Close" : "Activate"}
                </button>

                <button
                  onClick={() => navigate("/organization/applications")}
                  className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-2 text-sm"
                >
                  <Users size={16} />
                  Applicants
                </button>

                <button
                  onClick={() => deleteInternship(internship.id)}
                  className="px-3 py-2 rounded-lg bg-red-50 text-red-600 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No internships found.
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">
                {editingId ? "Edit Internship" : "Add Internship"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Internship Title *</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full mt-1 border rounded-xl px-4 py-3"
                  placeholder="e.g. Software Development Internship"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Domain *</label>
                <input
                  value={form.domain}
                  onChange={(e) =>
                    setForm({ ...form, domain: e.target.value })
                  }
                  className="w-full mt-1 border rounded-xl px-4 py-3"
                  placeholder="e.g. Software Development"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Skills
                </label>
                <input
                  value={form.skills}
                  onChange={(e) =>
                    setForm({ ...form, skills: e.target.value })
                  }
                  className="w-full mt-1 border rounded-xl px-4 py-3"
                  placeholder="React, Node.js, SQL"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  value={form.positions}
                  onChange={(e) =>
                    setForm({ ...form, positions: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3"
                  placeholder="Number of positions"
                />

                <input
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3"
                  placeholder="Duration e.g. 6 Months"
                />

                <input
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3"
                  placeholder="Start Date"
                />

                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3"
                  placeholder="Location"
                />

                <input
                  value={form.stipend}
                  onChange={(e) =>
                    setForm({ ...form, stipend: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 md:col-span-2"
                  placeholder="Stipend e.g. ₹20,000/month"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
              >
                {editingId ? "Update Internship" : "Create Internship"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}