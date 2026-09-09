import {
  Search,
  Building2,
  MapPin,
  Users,
  BriefcaseBusiness,
  Plus,
  Eye,
} from "lucide-react";

import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import CompanyForm from "../../components/admin/CompanyForm";

function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const companies = [
    {
      id: 1,
      name: "TCS",
      location: "Hyderabad",
      industry: "IT Services",
      employees: "5000+",
      openings: 24,
      status: "Active",
    },
    {
      id: 2,
      name: "Infosys",
      location: "Bangalore",
      industry: "IT Services",
      employees: "5000+",
      openings: 18,
      status: "Active",
    },
    {
      id: 3,
      name: "Wipro",
      location: "Chennai",
      industry: "Technology",
      employees: "5000+",
      openings: 15,
      status: "Active",
    },
    {
      id: 4,
      name: "Accenture",
      location: "Hyderabad",
      industry: "Consulting & Technology",
      employees: "5000+",
      openings: 31,
      status: "Active",
    },
    {
      id: 5,
      name: "Deloitte",
      location: "Bangalore",
      industry: "Consulting",
      employees: "5000+",
      openings: 12,
      status: "Active",
    },
    {
      id: 6,
      name: "Amazon",
      location: "Chennai",
      industry: "E-Commerce & Technology",
      employees: "5000+",
      openings: 27,
      status: "Active",
    },
  ];

  const filteredCompanies = companies.filter((company) =>
    `${company.name} ${company.location} ${company.industry}`
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
              Companies
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage companies and their recruitment information.
            </p>
          </div>

          <button
            onClick={() => setShowCompanyForm(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Company
          </button>


        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Companies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Companies
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  128
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 size={21} />
              </div>

            </div>

          </div>

          {/* Active Companies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Active Companies
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  112
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <BriefcaseBusiness size={21} />
              </div>

            </div>

          </div>

          {/* Hiring Companies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Currently Hiring
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  76
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={21} />
              </div>

            </div>

          </div>

          {/* Job Openings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Job Openings
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  342
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <BriefcaseBusiness size={21} />
              </div>

            </div>

          </div>

        </div>

        {/* Companies Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Registered Companies
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View and manage company information.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="min-w-225 w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Company
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Industry
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Employees
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

                {filteredCompanies.map((company) => (

                  <tr
                    key={company.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Company */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                          {company.name.charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {company.name}
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={13} />
                            {company.location}
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* Industry */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {company.industry}
                    </td>

                    {/* Employees */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {company.employees}
                    </td>

                    {/* Openings */}
                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
                        {company.openings}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                        {company.status}
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
          {filteredCompanies.length === 0 && (
            <div className="px-6 py-12 text-center">

              <Building2
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No companies found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search.
              </p>

            </div>
          )}

        </div>

      </div>
      {showCompanyForm && ( <CompanyForm onClose={() => setShowCompanyForm(false)} onSubmit={(data) => { console.log("Company form data:", data); setShowCompanyForm(false); }} /> )}

    </AdminLayout>
  );
}

export default Companies;