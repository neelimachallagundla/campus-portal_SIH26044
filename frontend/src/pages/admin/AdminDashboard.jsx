import {
  Building2,
  GraduationCap,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

import { useEffect, useState } from "react";

import PowerBIReport from "../../components/PowerBIReport";
import AdminLayout from "../../components/admin/AdminLayout";


function AdminDashboard() {

  // =========================================================
  // ANALYTICS STATE
  // =========================================================

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // POWER BI STATE
  // =========================================================

  const [powerBIReport, setPowerBIReport] = useState(null);
  const [powerBILoading, setPowerBILoading] = useState(true);
  const [powerBIError, setPowerBIError] = useState("");

  // =========================================================
  // EXISTING ANALYTICS API
  // =========================================================

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

  // =========================================================
  // POWER BI EMBED CONFIG
  // =========================================================

  useEffect(() => {

    const fetchPowerBI = async () => {

      try {

        setPowerBILoading(true);
        setPowerBIError("");

        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/powerbi/embed-config"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch Power BI configuration"
          );
        }

        const data = await response.json();

        console.log(
          "Power BI configuration received:",
          data
        );

        setPowerBIReport(data);

      } catch (err) {

        console.error("Power BI fetch error:", err);

        setPowerBIError(
          "Unable to load Power BI analytics."
        );

      } finally {

        setPowerBILoading(false);

      }

    };

    fetchPowerBI();

  }, []);

  // =========================================================
  // PAGE
  // =========================================================

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
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor students, companies, placements and career statistics.
          </p>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}

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

        {/* =================================================
            POWER BI ANALYTICS
        ================================================= */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              Career & Placement Analytics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Real-time analytics fetched from the LearnBridge database.
            </p>

          </div>

          {/* Power BI Loading */}

          {powerBILoading && (

            <div className="flex min-h-125 items-center justify-center rounded-2xl bg-slate-50">

              <div className="text-center">

                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading analytics...
                </p>

              </div>

            </div>

          )}

          {/* Power BI Error */}

          {!powerBILoading && powerBIError && (

            <div className="flex min-h-125 items-center justify-center rounded-2xl bg-slate-50">

              <div className="text-center">

                <Building2
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-semibold text-slate-700">
                  Analytics unavailable
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {powerBIError}
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  Please make sure the Power BI backend endpoint is running.
                </p>

              </div>

            </div>

          )}

          {/* Power BI Report */}

          {!powerBILoading &&
            !powerBIError &&
            powerBIReport && (
              <PowerBIReport report={powerBIReport} />
            )}

        </div>

      </div>

    </AdminLayout>
  );
}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({ icon, title, value }) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold">
        {value === "..."
          ? "..."
          : Number(value).toLocaleString()}
      </p>

    </div>

  );
}

export default AdminDashboard;