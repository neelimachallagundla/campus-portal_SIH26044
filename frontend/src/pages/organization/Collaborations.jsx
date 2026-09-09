import {
  Building2,
  BriefcaseBusiness,
  CalendarDays,
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

const initialCollaborations = [
  {
    id: 1,
    title: "Industry-Academia AI Research Program",
    institution: "LearnBridge Institute of Technology",
    area: "Artificial Intelligence",
    type: "Research",
    startDate: "01 Oct 2026",
    endDate: "31 Mar 2027",
    members: 12,
    status: "Active",
    description:
      "Joint research program focused on practical AI and machine learning applications.",
  },
  {
    id: 2,
    title: "Full Stack Skill Development Program",
    institution: "LearnBridge Institute of Technology",
    area: "Software Development",
    type: "Training",
    startDate: "15 Oct 2026",
    endDate: "15 Jan 2027",
    members: 25,
    status: "Active",
    description:
      "Industry-led training program for final-year engineering students.",
  },
  {
    id: 3,
    title: "Campus Innovation Partnership",
    institution: "LearnBridge Institute of Technology",
    area: "Innovation",
    type: "Partnership",
    startDate: "01 Nov 2026",
    endDate: "30 Apr 2027",
    members: 8,
    status: "Pending",
    description:
      "Collaboration for student innovation and startup development.",
  },
];

const emptyForm = {
  title: "",
  institution: "",
  area: "",
  type: "Research",
  startDate: "",
  endDate: "",
  members: "",
  description: "",
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
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export default function OrganizationCollaborations() {
  const navigate = useNavigate();

  const [collaborations, setCollaborations] =
    useState(initialCollaborations);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const organizationName = getOrganizationName();

  const filtered = collaborations.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.institution.toLowerCase().includes(search.toLowerCase()) ||
      item.area.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      institution: item.institution,
      area: item.area,
      type: item.type,
      startDate: item.startDate,
      endDate: item.endDate,
      members: item.members,
      description: item.description,
    });
    setShowModal(true);
  };

  const saveCollaboration = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      members: Number(form.members) || 0,
    };

    if (editingId) {
      setCollaborations((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...data } : item
        )
      );
    } else {
      setCollaborations((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          status: "Pending",
        },
      ]);
    }

    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const deleteCollaboration = (id) => {
    if (!window.confirm("Delete this collaboration?")) return;

    setCollaborations((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setCollaborations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active" ? "Closed" : "Active",
            }
          : item
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Users size={19} />
            Applications
          </button>

          <button
            onClick={() => navigate("/organization/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
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
              Collaborations
            </h2>
            <p className="text-slate-500 mt-1">
              Manage academic and industry collaborations.
            </p>
          </div>

          <button
            onClick={() => navigate("/organization/profile")}
            className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold"
          >
            {getInitials(organizationName)}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-bold mt-2">
              {collaborations.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Active</p>
            <p className="text-3xl font-bold mt-2">
              {collaborations.filter(
                (item) => item.status === "Active"
              ).length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Participants</p>
            <p className="text-3xl font-bold mt-2">
              {collaborations.reduce(
                (sum, item) => sum + item.members,
                0
              )}
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collaborations..."
                className="w-full pl-11 pr-4 py-3 border rounded-xl"
              />
            </div>

            <div className="flex gap-2">
              {["All", "Active", "Pending", "Closed"].map((item) => (
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
              ))}

              <button
                onClick={openAdd}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                New
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-2xl p-6"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-blue-600 text-sm mt-1">
                    {item.institution}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                    item.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs">
                  {item.area}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs">
                  {item.type}
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="flex gap-2">
                  <CalendarDays size={18} className="text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="text-sm font-medium">
                      {item.startDate} - {item.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Users size={18} className="text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-400">Members</p>
                    <p className="text-sm font-medium">
                      {item.members}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => openEdit(item)}
                  className="px-3 py-2 bg-slate-100 rounded-lg flex items-center gap-2 text-sm"
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                <button
                  onClick={() => toggleStatus(item.id)}
                  className="px-3 py-2 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 size={16} />
                  {item.status === "Active"
                    ? "Close"
                    : "Activate"}
                </button>

                <button
                  onClick={() => deleteCollaboration(item.id)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">
                {editingId
                  ? "Edit Collaboration"
                  : "Create Collaboration"}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={saveCollaboration} className="p-6 space-y-4">
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Collaboration title"
                className="w-full border rounded-xl px-4 py-3"
                required
              />

              <input
                value={form.institution}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
                placeholder="Institution / College"
                className="w-full border rounded-xl px-4 py-3"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={form.area}
                  onChange={(e) =>
                    setForm({ ...form, area: e.target.value })
                  }
                  placeholder="Area"
                  className="border rounded-xl px-4 py-3"
                />

                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3"
                >
                  <option>Research</option>
                  <option>Training</option>
                  <option>Partnership</option>
                  <option>Internship</option>
                </select>

                <input
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  placeholder="Start date"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                  placeholder="End date"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  value={form.members}
                  onChange={(e) =>
                    setForm({ ...form, members: e.target.value })
                  }
                  placeholder="Members"
                  className="border rounded-xl px-4 py-3 md:col-span-2"
                />
              </div>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                rows={4}
                className="w-full border rounded-xl px-4 py-3"
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
                {editingId ? "Update" : "Create Collaboration"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}