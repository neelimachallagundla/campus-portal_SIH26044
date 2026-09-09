import {
  Search,
  Target,
  Building2,
  Users,
  TrendingUp,
  MapPin,
  BriefcaseBusiness,
  Eye,
  Plus,
} from "lucide-react";

import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import PlacementForm from "../../components/admin/PlacementForm";

function Placements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPlacementForm, setShowPlacementForm] = useState(false);

  const placements = [
    {
      id: 1,
      student: "Rahul Kumar",
      college: "JNTU Hyderabad",
      company: "TCS",
      role: "Software Engineer",
      package: "8.5 LPA",
      location: "Hyderabad",
      status: "Placed",
    },
    {
      id: 2,
      student: "Priya Sharma",
      college: "Sathyabama Institute",
      company: "Infosys",
      role: "System Engineer",
      package: "7.2 LPA",
      location: "Bangalore",
      status: "Placed",
    },
    {
      id: 3,
      student: "Arjun Reddy",
      college: "VIT Chennai",
      company: "Accenture",
      role: "Associate Software Engineer",
      package: "6.8 LPA",
      location: "Chennai",
      status: "Placed",
    },
    {
      id: 4,
      student: "Sneha Patel",
      college: "SRM University",
      company: "Deloitte",
      role: "Analyst",
      package: "9.1 LPA",
      location: "Bangalore",
      status: "Placed",
    },
    {
      id: 5,
      student: "Kiran Kumar",
      college: "JNTU Hyderabad",
      company: "Amazon",
      role: "SDE I",
      package: "14.5 LPA",
      location: "Chennai",
      status: "Placed",
    },
    {
      id: 6,
      student: "Ananya Reddy",
      college: "VIT Chennai",
      company: "Wipro",
      role: "Project Engineer",
      package: "6.2 LPA",
      location: "Hyderabad",
      status: "Processing",
    },
  ];

  const filteredPlacements = placements.filter((placement) =>
    `${placement.student} ${placement.college} ${placement.company} ${placement.role}`
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
              Placements
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track student placements and recruitment outcomes.
            </p>
          </div>

          <button
  onClick={() => setShowPlacementForm(true)}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
>
  <Plus size={18} />
  Add Placement
</button>

        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Placements */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Placements
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  1,248
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Target size={21} />
              </div>

            </div>
          </div>

          {/* Placement Rate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Placement Rate
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  82.4%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <TrendingUp size={21} />
              </div>

            </div>
          </div>

          {/* Companies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Hiring Companies
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  94
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Building2 size={21} />
              </div>

            </div>
          </div>

          {/* Average Package */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Average Package
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  8.6 LPA
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <BriefcaseBusiness size={21} />
              </div>

            </div>
          </div>

        </div>

        {/* Placement Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Placement Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View student placement and recruitment details.
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
                placeholder="Search placements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-275">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Package
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
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

                {filteredPlacements.map((placement) => (

                  <tr
                    key={placement.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Student */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                          {placement.student.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {placement.student}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {placement.college}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Company */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                          {placement.company.charAt(0)}
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {placement.company}
                        </span>

                      </div>

                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {placement.role}
                    </td>

                    {/* Package */}
                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-600">
                        {placement.package}
                      </span>

                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">

                      <span className="flex items-center gap-1 text-sm text-slate-600">
                        <MapPin size={14} />
                        {placement.location}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          placement.status === "Placed"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {placement.status}
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
          {filteredPlacements.length === 0 && (
            <div className="px-6 py-12 text-center">

              <Target
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No placement records found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search.
              </p>

            </div>
          )}

        </div>

      </div>
      {showPlacementForm && ( <PlacementForm onClose={() => setShowPlacementForm(false)} onSubmit={(data) => { console.log("Placement form data:", data); setShowPlacementForm(false); }} /> )}
    </AdminLayout>
  );
}

export default Placements;