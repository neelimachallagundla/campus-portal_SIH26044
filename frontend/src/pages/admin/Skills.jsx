import {
  Search,
  Wrench,
  Users,
  TrendingUp,
  Building2,
  Eye,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import SkillForm from "../../components/admin/SkillForm";



function Skills() {
  const [search, setSearch] = useState("");
  const [showSkillForm, setShowSkillForm] = useState(false);

  const skills = [
    {
      name: "Java",
      category: "Programming",
      students: 1248,
      companies: 86,
      demand: "High",
      status: "Active",
    },
    {
      name: "Python",
      category: "Programming",
      students: 1432,
      companies: 94,
      demand: "High",
      status: "Active",
    },
    {
      name: "React.js",
      category: "Frontend",
      students: 986,
      companies: 72,
      demand: "High",
      status: "Active",
    },
    {
      name: "SQL",
      category: "Database",
      students: 1567,
      companies: 108,
      demand: "High",
      status: "Active",
    },
    {
      name: "AWS",
      category: "Cloud",
      students: 742,
      companies: 63,
      demand: "High",
      status: "Active",
    },
    {
      name: "Spring Boot",
      category: "Backend",
      students: 634,
      companies: 51,
      demand: "Medium",
      status: "Active",
    },
    {
      name: "Machine Learning",
      category: "Artificial Intelligence",
      students: 518,
      companies: 47,
      demand: "High",
      status: "Active",
    },
    {
      name: "Docker",
      category: "DevOps",
      students: 421,
      companies: 39,
      demand: "Medium",
      status: "Active",
    },
  ];

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Skills
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage skills, demand and student skill development
            </p>
          </div>

          <button onClick={() => setShowSkillForm(true)} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700" > <Plus size={18} /> Add Skill </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Wrench size={21} />
              </div>
            </div>

            <p className="text-sm text-slate-500">Total Skills</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">86</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="text-sm text-slate-500">Active Skills</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">78</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={21} />
              </div>
            </div>

            <p className="text-sm text-slate-500">Students Learning</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">8,542</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <TrendingUp size={21} />
              </div>
            </div>

            <p className="text-sm text-slate-500">High Demand Skills</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">32</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search skills or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredSkills.length}
            </span>{" "}
            skills
          </div>
        </div>

        {/* Skills Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Skill
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Students
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Companies
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Demand
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredSkills.map((skill) => (
                  <tr
                    key={skill.name}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Wrench size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {skill.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Technical Skill
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {skill.category}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Users size={16} className="text-slate-400" />
                        {skill.students.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Building2 size={16} className="text-slate-400" />
                        {skill.companies}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          skill.demand === "High"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {skill.demand}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={13} />
                        {skill.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSkills.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No skills found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
{showSkillForm && (
  <SkillForm
    onClose={() => setShowSkillForm(false)}
    onSubmit={(data) => {
      console.log("Skill form data:", data);
      setShowSkillForm(false);
    }}
  />
)}


    </AdminLayout>
  );
}

export default Skills;