import {
  Search,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

function Students() {

  const students = [
    {
      id: 1,
      name: "Rahul Kumar",
      college: "JNTU Hyderabad",
      course: "CSE",
      skills: "Java, SQL, React",
      progress: 78,
    },
    {
      id: 2,
      name: "Priya Sharma",
      college: "Sathyabama Institute",
      course: "CSE",
      skills: "Python, SQL, AWS",
      progress: 84,
    },
    {
      id: 3,
      name: "Arjun Reddy",
      college: "VIT Chennai",
      course: "IT",
      skills: "Java, Spring Boot",
      progress: 65,
    },
    {
      id: 4,
      name: "Sneha Patel",
      college: "SRM University",
      course: "CSE",
      skills: "Python, React",
      progress: 91,
    },
  ];

  return (
    <AdminLayout>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* =================================================
            TITLE
        ================================================= */}

        <div className="mb-8">

          <p className="text-sm font-medium text-blue-600">
            LearnBridge Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Students
          </h1>

          <p className="mt-2 text-slate-500">
            Manage students, skills and learning progress.
          </p>

        </div>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            icon={<Users size={21} />}
            title="Total Students"
            value="1,250"
          />

          <SummaryCard
            icon={<GraduationCap size={21} />}
            title="Active Students"
            value="1,084"
          />

          <SummaryCard
            icon={<BookOpen size={21} />}
            title="Learning Programs"
            value="12"
          />

          <SummaryCard
            icon={<TrendingUp size={21} />}
            title="Avg. Progress"
            value="72%"
          />

        </div>

        {/* =================================================
            STUDENT DIRECTORY
        ================================================= */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white">

          {/* Header */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Student Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View student information and learning progress.
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
                placeholder="Search students..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-225">

              <thead className="bg-slate-50">

                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">

                  <th className="px-6 py-4">
                    Student
                  </th>

                  <th className="px-6 py-4">
                    College
                  </th>

                  <th className="px-6 py-4">
                    Course
                  </th>

                  <th className="px-6 py-4">
                    Skills
                  </th>

                  <th className="px-6 py-4">
                    Progress
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {students.map((student) => (

                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Student */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {student.name.charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold">
                            {student.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            Student ID: STU-{student.id}00{student.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* College */}

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {student.college}
                    </td>

                    {/* Course */}

                    <td className="px-6 py-5">

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {student.course}
                      </span>

                    </td>

                    {/* Skills */}

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {student.skills}
                    </td>

                    {/* Progress */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${student.progress}%`,
                            }}
                          />

                        </div>

                        <span className="text-sm font-semibold">
                          {student.progress}%
                        </span>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}


// =========================================================
// SUMMARY CARD
// =========================================================

function SummaryCard({ icon, title, value }) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold">
        {value}
      </p>

    </div>

  );
}

export default Students;