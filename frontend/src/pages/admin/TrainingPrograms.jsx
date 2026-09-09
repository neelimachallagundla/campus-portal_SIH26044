import {
  Search,
  BookOpen,
  Users,
  GraduationCap,
  Clock,
  Building2,
  Eye,
  Plus,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import TrainingProgramForm from "../../components/admin/TrainingProgramForm";

function TrainingPrograms() {
  const [searchTerm, setSearchTerm] = useState("");
const [showTrainingProgramForm, setShowTrainingProgramForm] = useState(false);



  const trainingPrograms = [
    {
      id: 1,
      name: "Java Full Stack Development",
      provider: "LearnBridge",
      category: "Full Stack",
      duration: "12 Weeks",
      students: 156,
      completion: "84%",
      status: "Active",
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      provider: "LearnBridge",
      category: "Programming",
      duration: "10 Weeks",
      students: 214,
      completion: "78%",
      status: "Active",
    },
    {
      id: 3,
      name: "Cloud & DevOps Fundamentals",
      provider: "AWS Academy",
      category: "Cloud",
      duration: "8 Weeks",
      students: 128,
      completion: "71%",
      status: "Active",
    },
    {
      id: 4,
      name: "Python for Data Science",
      provider: "LearnBridge",
      category: "Data Science",
      duration: "10 Weeks",
      students: 182,
      completion: "82%",
      status: "Active",
    },
    {
      id: 5,
      name: "React & Modern Frontend",
      provider: "Tech Academy",
      category: "Frontend",
      duration: "6 Weeks",
      students: 96,
      completion: "89%",
      status: "Active",
    },
    {
      id: 6,
      name: "AI & Machine Learning",
      provider: "LearnBridge",
      category: "Artificial Intelligence",
      duration: "14 Weeks",
      students: 143,
      completion: "65%",
      status: "Upcoming",
    },
  ];

  const filteredPrograms = trainingPrograms.filter((program) =>
    `${program.name} ${program.provider} ${program.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Training Programs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage training programs and monitor student participation.
            </p>
          </div>

          
<button
  onClick={() => setShowTrainingProgramForm(true)}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
>
  <Plus size={18} />
  Add Training Program
</button>


        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Programs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Programs
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  42
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpen size={21} />
              </div>

            </div>
          </div>

          {/* Active Programs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Active Programs
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  31
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={21} />
              </div>

            </div>
          </div>

          {/* Enrolled Students */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Enrolled Students
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  3,842
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={21} />
              </div>

            </div>
          </div>

          {/* Completion Rate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Avg. Completion
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  79.3%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <GraduationCap size={21} />
              </div>

            </div>
          </div>

        </div>

        {/* Programs Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Training Programs
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View and manage available training programs.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-262.5">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Program
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Provider
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Students
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Completion
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

                {filteredPrograms.map((program) => (

                  <tr
                    key={program.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Program */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <BookOpen size={19} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {program.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Program #{program.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Provider */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <Building2
                          size={16}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {program.provider}
                        </span>

                      </div>

                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                        {program.category}
                      </span>

                    </td>

                    {/* Duration */}
                    <td className="px-6 py-4">

                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={15} />
                        {program.duration}
                      </span>

                    </td>

                    {/* Students */}
                    <td className="px-6 py-4">

                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Users size={15} />
                        {program.students}
                      </span>

                    </td>

                    {/* Completion */}
                    <td className="px-6 py-4">

                      <div className="w-28">

                        <div className="mb-1 flex justify-between">
                          <span className="text-xs font-semibold text-slate-600">
                            {program.completion}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: program.completion,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          program.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {program.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">

                      <button
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        <Eye size={16} />
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <div className="px-6 py-12 text-center">

              <BookOpen
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No training programs found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search.
              </p>

            </div>
          )}

        </div>

      </div>
      {showTrainingProgramForm && ( <TrainingProgramForm onClose={() => setShowTrainingProgramForm(false)} onSubmit={(data) => { console.log("Training program data:", data); setShowTrainingProgramForm(false); }} /> )}
    </AdminLayout>
  );
}

export default TrainingPrograms;