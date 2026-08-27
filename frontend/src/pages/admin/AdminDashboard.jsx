import {
  Building2,
  GraduationCap,
  LogOut,
  Menu,
  Users,
  BriefcaseBusiness,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/analytics/powerbi"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await response.json();

        setAnalytics(data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError("Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={21} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Learn<span className="text-blue-600">Bridge</span>
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Administration
          </p>

          <button className="mb-1 flex w-full items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-medium text-blue-600">
            <Building2 size={19} />
            Analytics
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Users size={19} />
            Students
          </button>

          <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <BriefcaseBusiness size={19} />
            Companies
          </button>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              LearnBridge Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor students, companies, placements and career statistics.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Users size={21} />}
              title="Total Students"
              value={
                loading
                  ? "..."
                  : analytics?.summary?.total_students ?? 0
              }
            />

            <StatCard
              icon={<BriefcaseBusiness size={21} />}
              title="Total Companies"
              value={
                loading
                  ? "..."
                  : analytics?.summary?.total_companies ?? 0
              }
            />

            <StatCard
              icon={<BriefcaseBusiness size={21} />}
              title="Total Internships"
              value={
                loading
                  ? "..."
                  : analytics?.summary?.total_internships ?? 0
              }
            />

            <StatCard
              icon={<GraduationCap size={21} />}
              title="Total Placements"
              value={
                loading
                  ? "..."
                  : analytics?.summary?.total_placements ?? 0
              }
            />
          </div>

          {/* Analytics */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">
                Career & Placement Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Real-time analytics fetched from the LearnBridge database.
              </p>
            </div>

            <div className="flex min-h-125 items-center justify-center rounded-2xl bg-slate-50">
              {loading ? (
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading analytics...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center">
                  <Building2
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-semibold text-slate-700">
                    Analytics unavailable
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Please make sure the backend is running.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Building2
                    size={40}
                    className="mx-auto text-blue-400"
                  />

                  <h3 className="mt-4 font-semibold text-slate-700">
                    Analytics Connected
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Live data is being received from the backend.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <p className="mt-1 text-3xl font-bold">
        {Number(value).toLocaleString()}
      </p>
    </div>
  );
}

export default AdminDashboard;