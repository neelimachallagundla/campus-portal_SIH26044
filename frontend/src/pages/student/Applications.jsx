import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  MapPin,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const loadApplications = () => {
    try {
      const saved = localStorage.getItem("learnbridgeApplications");
      const parsed = saved ? JSON.parse(saved) : [];

      setApplications(Array.isArray(parsed) ? parsed : []);
    } catch {
      setApplications([]);
    }
  };

  useEffect(() => {
    loadApplications();

    const handleUpdate = () => loadApplications();

    window.addEventListener(
      "learnbridge-applications-updated",
      handleUpdate
    );
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(
        "learnbridge-applications-updated",
        handleUpdate
      );
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const getStatus = (application) => {
    return application.status || "Applied";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Selected":
      case "Shortlisted":
        return CheckCircle2;

      case "Rejected":
        return XCircle;

      case "Under Review":
        return Clock3;

      default:
        return FileText;
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const status = getStatus(application);

      const matchesFilter =
        filter === "All" ||
        (filter === "Applied" && status === "Applied") ||
        (filter === "Under Review" && status === "Under Review") ||
        (filter === "Shortlisted" &&
          (status === "Shortlisted" || status === "Selected")) ||
        (filter === "Rejected" && status === "Rejected");

      const searchText = search.toLowerCase();

      const matchesSearch =
        !search ||
        application.title?.toLowerCase().includes(searchText) ||
        application.company?.toLowerCase().includes(searchText) ||
        application.organization?.toLowerCase().includes(searchText) ||
        application.location?.toLowerCase().includes(searchText) ||
        application.type?.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [applications, search, filter]);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      applied: applications.filter(
        (item) => getStatus(item) === "Applied"
      ).length,
      review: applications.filter(
        (item) => getStatus(item) === "Under Review"
      ).length,
      shortlisted: applications.filter((item) =>
        ["Shortlisted", "Selected"].includes(getStatus(item))
      ).length,
    };
  }, [applications]);

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleWithdraw = (application) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmed) return;

    const updated = applications.filter(
      (item) =>
        item.id !== application.id &&
        !(
          item.title === application.title &&
          item.company === application.company
        )
    );

    setApplications(updated);

    localStorage.setItem(
      "learnbridgeApplications",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("learnbridge-applications-updated")
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={18} />
            </div>

            <span className="hidden font-bold sm:block">
              LearnBridge
            </span>
          </div>

          <button
            onClick={() => navigate("/opportunities")}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Find Opportunities
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-8 rounded-3xl bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 p-6 text-white shadow-lg sm:p-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur">
              <FileText size={16} />
              Career Applications
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              My Applications
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Track the internships, training programs, and job
              opportunities you've applied for through LearnBridge.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Applications"
            value={stats.total}
            icon={FileText}
          />

          <StatCard
            label="Applied"
            value={stats.applied}
            icon={Clock3}
          />

          <StatCard
            label="Under Review"
            value={stats.review}
            icon={Clock3}
          />

          <StatCard
            label="Shortlisted"
            value={stats.shortlisted}
            icon={CheckCircle2}
          />
        </section>

        {/* Search + filters */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applications..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "All",
                "Applied",
                "Under Review",
                "Shortlisted",
                "Rejected",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    filter === item
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        {filteredApplications.length === 0 ? (
          <EmptyState
            hasApplications={applications.length > 0}
            onBrowse={() => navigate("/opportunities")}
          />
        ) : (
          <section className="space-y-4">
            {filteredApplications.map((application, index) => {
              const status = getStatus(application);
              const StatusIcon = getStatusIcon(status);

              return (
                <article
                  key={
                    application.id ||
                    `${application.title}-${application.company}-${index}`
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Main information */}
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Building2 size={23} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-900">
                            {application.title ||
                              application.name ||
                              "Opportunity"}
                          </h2>

                          <StatusBadge status={status} />
                        </div>

                        <p className="mt-1 font-medium text-slate-600">
                          {application.company ||
                            application.organization ||
                            "Organization"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                          {application.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin size={15} />
                              {application.location}
                            </span>
                          )}

                          {application.type && (
                            <span className="flex items-center gap-1.5">
                              <BriefcaseBusiness size={15} />
                              {application.type}
                            </span>
                          )}

                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            Applied{" "}
                            {formatDate(
                              application.appliedAt ||
                                application.appliedDate ||
                                application.date
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      {application.url && (
                        <a
                          href={application.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          View
                          <ExternalLink size={15} />
                        </a>
                      )}

                      {status === "Applied" && (
                        <button
                          onClick={() => handleWithdraw(application)}
                          className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Additional information */}
                  {(application.deadline ||
                    application.description ||
                    application.skills?.length > 0) && (
                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        {application.deadline && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Application Deadline
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {formatDate(application.deadline)}
                            </p>
                          </div>
                        )}

                        {application.skills?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Relevant Skills
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {application.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {application.description && (
                        <p className="mt-4 text-sm leading-6 text-slate-500">
                          {application.description}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}

        {/* Bottom CTA */}
        <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">
          <h2 className="text-lg font-bold text-slate-900">
            Looking for more opportunities?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Explore internships, training programs, and job opportunities
            matched to your skills and career goals.
          </p>

          <button
            onClick={() => navigate("/opportunities")}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Opportunities
            <ExternalLink size={16} />
          </button>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Applied: "bg-blue-50 text-blue-700 border-blue-100",
    "Under Review": "bg-amber-50 text-amber-700 border-amber-100",
    Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Selected: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Rejected: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function EmptyState({ hasApplications, onBrowse }) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <FileText size={28} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        {hasApplications
          ? "No matching applications"
          : "No applications yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasApplications
          ? "Try changing your search or application status filter."
          : "Once you apply for an opportunity, your applications will appear here so you can track them."}
      </p>

      <button
        onClick={onBrowse}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Browse Opportunities
        <ExternalLink size={16} />
      </button>
    </section>
  );
}

export default Applications;