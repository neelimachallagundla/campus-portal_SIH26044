import {
  Search,
  CalendarDays,
  Building2,
  Users,
  Clock,
  MapPin,
  Eye,
  Plus,
} from "lucide-react";

import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import InternshipForm from "../../components/admin/InternshipForm";

function Internships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInternshipForm, setShowInternshipForm] = useState(false);

  const internships = [
    {
      id: 1,
      role: "Software Development Intern",
      company: "TCS",
      location: "Hyderabad",
      duration: "6 Months",
      applicants: 124,
      openings: 10,
      status: "Open",
    },
    {
      id: 2,
      role: "Frontend Developer Intern",
      company: "Infosys",
      location: "Bangalore",
      duration: "3 Months",
      applicants: 98,
      openings: 8,
      status: "Open",
    },
    {
      id: 3,
      role: "Data Analyst Intern",
      company: "Deloitte",
      location: "Chennai",
      duration: "6 Months",
      applicants: 76,
      openings: 5,
      status: "Open",
    },
    {
      id: 4,
      role: "Cloud Engineering Intern",
      company: "Accenture",
      location: "Hyderabad",
      duration: "6 Months",
      applicants: 143,
      openings: 12,
      status: "Open",
    },
    {
      id: 5,
      role: "AI/ML Intern",
      company: "Amazon",
      location: "Chennai",
      duration: "6 Months",
      applicants: 187,
      openings: 6,
      status: "Closing Soon",
    },
    {
      id: 6,
      role: "Java Backend Intern",
      company: "Wipro",
      location: "Pune",
      duration: "3 Months",
      applicants: 65,
      openings: 7,
      status: "Closed",
    },
  ];

  const filteredInternships = internships.filter((internship) =>
    `${internship.role} ${internship.company} ${internship.location}`
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
              Internships
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage internship opportunities and student applications.
            </p>
          </div>

          <button
  onClick={() => setShowInternshipForm(true)}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
>
  <Plus size={18} />
  Add Internship
</button>

        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Internships */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Internships
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  246
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={21} />
              </div>

            </div>
          </div>

          {/* Active Opportunities */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Active Opportunities
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  184
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Clock size={21} />
              </div>

            </div>
          </div>

          {/* Total Applicants */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Applicants
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  4,832
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={21} />
              </div>

            </div>
          </div>

          {/* Companies Hiring */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Companies Hiring
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  76
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Building2 size={21} />
              </div>

            </div>
          </div>

        </div>

        {/* Internship Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Internship Opportunities
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View and manage available internship positions.
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
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="min-w-250 w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Position
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Applicants
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Openings
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

                {filteredInternships.map((internship) => (

                  <tr
                    key={internship.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Position */}
                    <td className="px-6 py-4">

                      <div>
                        <p className="font-semibold text-slate-900">
                          {internship.role}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={13} />
                          {internship.location}
                        </div>
                      </div>

                    </td>

                    {/* Company */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                          {internship.company.charAt(0)}
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {internship.company}
                        </span>

                      </div>

                    </td>

                    {/* Duration */}
                    <td className="px-6 py-4">

                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={15} />
                        {internship.duration}
                      </span>

                    </td>

                    {/* Applicants */}
                    <td className="px-6 py-4">

                      <span className="text-sm font-semibold text-slate-700">
                        {internship.applicants}
                      </span>

                    </td>

                    {/* Openings */}
                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
                        {internship.openings}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          internship.status === "Open"
                            ? "bg-green-50 text-green-600"
                            : internship.status === "Closing Soon"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {internship.status}
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
          {filteredInternships.length === 0 && (
            <div className="px-6 py-12 text-center">

              <CalendarDays
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No internships found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search.
              </p>

            </div>
          )}

        </div>

      </div>
      {showInternshipForm && (
  <InternshipForm
    onClose={() => setShowInternshipForm(false)}
    onSubmit={(data) => {
      console.log("Internship form data:", data);
      setShowInternshipForm(false);
    }}
  />
)}
    </AdminLayout>
  );
}

export default Internships;