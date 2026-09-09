import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Handshake,
  LogOut,
  MessageSquare,
  Plus,
  Users,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrganizationDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const getOrganizationName = () => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("learnbridgeOrganizationProfile") || "{}"
      );

      return profile?.name || "TechNova Solutions";
    } catch {
      return "TechNova Solutions";
    }
  };

  const getInitials = (name) => {
    if (!name) return "O";

    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const organizationName = getOrganizationName();
  const initials = getInitials(organizationName);

  const stats = [
    {
      title: "Active Opportunities",
      value: "18",
      icon: BriefcaseBusiness,
    },
    {
      title: "Internship Positions",
      value: "32",
      icon: Users,
    },
    {
      title: "Applications Received",
      value: "146",
      icon: FileText,
    },
    {
      title: "Collaborations",
      value: "7",
      icon: Handshake,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          FIXED SIDEBAR
      ===================================================== */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">

        {/* Logo */}
        <div className="p-6 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <Building2
                size={22}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-600">
                LearnBridge
              </h1>

              <p className="text-xs text-slate-500 mt-0.5">
                Organization Portal
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/organization/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <Building2 size={19} />
            Dashboard
          </button>

          {/* Post Opportunities */}
          <button
            onClick={() => navigate("/organization/opportunities")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <BriefcaseBusiness size={19} />
            Post Opportunities
          </button>

          {/* Internships */}
          <button
            onClick={() => navigate("/organization/internships")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Users size={19} />
            Internships
          </button>

          {/* Applications */}
          <button
            onClick={() => navigate("/organization/applications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <FileText size={19} />
            Applications
          </button>

          {/* Collaborations */}
          <button
            onClick={() => navigate("/organization/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Handshake size={19} />
            Collaborations
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate("/organization/messages")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <MessageSquare size={19} />
            Messages
          </button>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="ml-64 min-h-screen p-6 md:p-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">

          <div>
            <p className="text-sm text-blue-600 font-medium">
              Organization Portal
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Welcome back! 👋
            </h2>

            <p className="text-slate-500 mt-2">
              Connect with talented students and build meaningful
              academic partnerships.
            </p>
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/organization/profile")}
            className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm hover:bg-blue-700 hover:shadow-md transition"
            title={`${organizationName}'s Profile`}
          >
            {initials}
          </button>

        </div>

        {/* =====================================================
            STATS
        ===================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {stat.value}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Icon size={22} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Manage your organization's activities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <button
              onClick={() => navigate("/organization/opportunities")}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Plus size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Post Opportunity
                </p>

                <p className="text-sm text-slate-500">
                  Find skilled candidates
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/organization/applications")}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Review Applications
                </p>

                <p className="text-sm text-slate-500">
                  View candidate applications
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/organization/collaborations")}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Handshake size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Start Collaboration
                </p>

                <p className="text-sm text-slate-500">
                  Partner with academics
                </p>
              </div>
            </button>

          </div>
        </section>

        {/* =====================================================
            OPPORTUNITIES + APPLICATIONS
        ===================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Active Opportunities */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Active Opportunities
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Your currently active opportunities.
                </p>
              </div>

              <button
                onClick={() => navigate("/organization/opportunities")}
                className="text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                View All
              </button>

            </div>

            <div className="space-y-4">

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between">

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Software Development Intern
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Full Stack Development
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                    Active
                  </span>

                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                  <span>10 Positions</span>
                  <span>•</span>
                  <span>32 Applications</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between">

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      AI Research Internship
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Artificial Intelligence
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                    Active
                  </span>

                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                  <span>5 Positions</span>
                  <span>•</span>
                  <span>18 Applications</span>
                </div>
              </div>

            </div>
          </section>

          {/* Recent Applications */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Recent Applications
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Latest student applications.
                </p>
              </div>

              <button
                onClick={() => navigate("/organization/applications")}
                className="text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                View All
              </button>

            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">

                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  RK
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">
                    Rahul Kumar
                  </h4>

                  <p className="text-sm text-slate-500">
                    Software Development Intern
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-600">
                  Pending
                </span>

              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">

                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  PS
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">
                    Priya Sharma
                  </h4>

                  <p className="text-sm text-slate-500">
                    AI Research Internship
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                  Shortlisted
                </span>

              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">

                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  AR
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">
                    Arjun Reddy
                  </h4>

                  <p className="text-sm text-slate-500">
                    Software Development Intern
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-600">
                  Pending
                </span>

              </div>

            </div>
          </section>

        </div>

      </main>
    </div>
  );
}

export default OrganizationDashboard;