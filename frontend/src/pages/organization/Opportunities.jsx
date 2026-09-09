import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Edit3,
  FileText,
  Handshake,
  LogOut,
  MessageSquare,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialOpportunities = [
  {
    id: 1,
    title: "Software Development Intern",
    type: "Internship",
    domain: "Full Stack Development",
    description:
      "Work on real-world web applications using modern frontend and backend technologies.",
    skills: ["React", "Node.js", "JavaScript", "SQL"],
    positions: 10,
    duration: "6 Months",
    location: "Hyderabad",
    status: "Active",
    applications: 32,
  },
  {
    id: 2,
    title: "AI Research Internship",
    type: "Internship",
    domain: "Artificial Intelligence",
    description:
      "Join our research team and work on machine learning and AI-based projects.",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    positions: 5,
    duration: "3 Months",
    location: "Bangalore",
    status: "Active",
    applications: 18,
  },
  {
    id: 3,
    title: "Cloud & DevOps Trainee",
    type: "Training",
    domain: "Cloud Computing",
    description:
      "Hands-on training opportunity focused on cloud infrastructure and DevOps practices.",
    skills: ["AWS", "Docker", "Linux", "Git"],
    positions: 8,
    duration: "4 Months",
    location: "Remote",
    status: "Draft",
    applications: 0,
  },
];

const emptyForm = {
  title: "",
  type: "Internship",
  domain: "",
  description: "",
  skills: "",
  positions: "",
  duration: "",
  location: "",
};

function OrganizationOpportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const getOrganizationName = () => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("learnbridgeOrganizationProfile") || "{}"
      );

      return profile?.name || "TechNova Solutions";
    } catch {
      return "TechNova Solutions";
    }
  };

  const getInitials = (name) => {
    if (!name) return "O";

    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] + words[words.length - 1][0]
    ).toUpperCase();
  };

  const organizationName = getOrganizationName();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (opportunity) => {
    setEditingId(opportunity.id);

    setForm({
      title: opportunity.title,
      type: opportunity.type,
      domain: opportunity.domain,
      description: opportunity.description,
      skills: opportunity.skills.join(", "),
      positions: opportunity.positions,
      duration: opportunity.duration,
      location: opportunity.location,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.domain || !form.description) {
      return;
    }

    const opportunityData = {
      title: form.title,
      type: form.type,
      domain: form.domain,
      description: form.description,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      positions: Number(form.positions) || 0,
      duration: form.duration,
      location: form.location,
    };

    if (editingId) {
      setOpportunities((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...opportunityData,
              }
            : item
        )
      );
    } else {
      setOpportunities((prev) => [
        {
          id: Date.now(),
          ...opportunityData,
          status: "Active",
          applications: 0,
        },
        ...prev,
      ]);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const deleteOpportunity = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmed) return;

    setOpportunities((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setOpportunities((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Closed"
                  : "Active",
            }
          : item
      )
    );
  };

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.domain.toLowerCase().includes(search.toLowerCase()) ||
      item.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">

        {/* Logo */}
        <div className="p-6 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-600">
                LearnBridge
              </h1>

              <p className="text-xs text-slate-500 mt-0.5">
                Organization Portal
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          <button
            onClick={() =>
              navigate("/organization/dashboard")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Building2 size={19} />
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/organization/opportunities")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <BriefcaseBusiness size={19} />
            Post Opportunities
          </button>

          <button
            onClick={() =>
              navigate("/organization/internships")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Users size={19} />
            Internships
          </button>

          <button
            onClick={() =>
              navigate("/organization/applications")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <FileText size={19} />
            Applications
          </button>

          <button
            onClick={() =>
              navigate("/organization/collaborations")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Handshake size={19} />
            Collaborations
          </button>

          <button
            onClick={() =>
              navigate("/organization/messages")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <MessageSquare size={19} />
            Messages
          </button>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="ml-64 min-h-screen p-6 md:p-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-5 mb-8">

          <div>
            <p className="text-sm text-blue-600 font-medium">
              Organization Portal
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Opportunities
            </h2>

            <p className="text-slate-500 mt-2">
              Create and manage opportunities for talented students.
            </p>
          </div>

          {/* Profile */}
          <button
            onClick={() =>
              navigate("/organization/profile")
            }
            className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm hover:bg-blue-700 transition shrink-0"
            title="Organization Profile"
          >
            {getInitials(organizationName)}
          </button>

        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
            <CheckCircle2 size={20} />
            Opportunity saved successfully.
          </div>
        )}

        {/* =====================================================
            ACTION BAR
        ===================================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative flex-1">
              <BriefcaseBusiness
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search opportunities, domains or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Opportunities</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Add */}
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
            >
              <Plus size={19} />
              Post Opportunity
            </button>

          </div>

        </section>

        {/* =====================================================
            OPPORTUNITY CARDS
        ===================================================== */}
        <div className="space-y-5">

          {filteredOpportunities.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <BriefcaseBusiness
                size={40}
                className="mx-auto text-slate-300"
              />

              <h3 className="text-lg font-semibold text-slate-900 mt-4">
                No opportunities found
              </h3>

              <p className="text-slate-500 mt-2">
                Try changing your search or create a new opportunity.
              </p>
            </div>
          ) : (
            filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >

                {/* Card Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                  <div>
                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-xl font-bold text-slate-900">
                        {opportunity.title}
                      </h3>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          opportunity.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : opportunity.status === "Draft"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {opportunity.status}
                      </span>

                    </div>

                    <p className="text-sm text-blue-600 font-medium mt-2">
                      {opportunity.domain}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        toggleStatus(opportunity.id)
                      }
                      className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      {opportunity.status === "Active"
                        ? "Close"
                        : "Activate"}
                    </button>

                    <button
                      onClick={() =>
                        openEditModal(opportunity)
                      }
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>

                    <button
                      onClick={() =>
                        deleteOpportunity(opportunity.id)
                      }
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

                {/* Description */}
                <p className="text-slate-600 mt-4 leading-6">
                  {opportunity.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">

                  <div>
                    <p className="text-xs text-slate-500">
                      Type
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {opportunity.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Positions
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {opportunity.positions}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Duration
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {opportunity.duration || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Applications
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {opportunity.applications}
                    </p>
                  </div>

                </div>

                {/* Location */}
                <div className="mt-4 text-sm text-slate-500">
                  📍 {opportunity.location || "Location not specified"}
                </div>

              </div>
            ))
          )}

        </div>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-100 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingId
                    ? "Edit Opportunity"
                    : "Post New Opportunity"}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Provide details about the opportunity.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} className="text-slate-500" />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Opportunity Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Software Development Intern"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Type + Domain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Opportunity Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Internship</option>
                    <option>Job</option>
                    <option>Training</option>
                    <option>Research</option>
                    <option>Faculty Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Domain
                  </label>

                  <input
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    placeholder="e.g. Artificial Intelligence"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the opportunity..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Required Skills
                </label>

                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, SQL, Java"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-slate-400 mt-1">
                  Separate skills using commas.
                </p>
              </div>

              {/* Positions + Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Positions
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="positions"
                    value={form.positions}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration
                  </label>

                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="6 Months"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Hyderabad / Remote"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
                >
                  {editingId
                    ? "Save Changes"
                    : "Post Opportunity"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default OrganizationOpportunities;