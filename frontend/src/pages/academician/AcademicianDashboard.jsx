import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  LogOut,
  MessageSquare,
  Microscope,
  Presentation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AcademicianDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  // Get academician name from profile
  const getAcademicianName = () => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("learnbridgeAcademicianProfile") || "{}"
      );

      return profile?.name || "Academician";
    } catch {
      return "Academician";
    }
  };

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "A";

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

  const academicianName = getAcademicianName();
  const initials = getInitials(academicianName);

  const stats = [
    {
      title: "Faculty Opportunities",
      value: "24",
      icon: BriefcaseBusiness,
    },
    {
      title: "FDP Programs",
      value: "12",
      icon: GraduationCap,
    },
    {
      title: "Collaborations",
      value: "8",
      icon: Handshake,
    },
    {
      title: "Research Projects",
      value: "5",
      icon: Microscope,
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

            {/* LearnBridge Icon */}
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <GraduationCap
                size={22}
                className="text-white"
              />
            </div>

            {/* LearnBridge Name */}
            <div>
              <h1 className="text-xl font-bold text-blue-600">
                LearnBridge
              </h1>

              <p className="text-xs text-slate-500 mt-0.5">
                Academician Portal
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/academician/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <BookOpen size={19} />
            Dashboard
          </button>

          {/* Students */}
          <button
            onClick={() => navigate("/academician/students")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <GraduationCap size={19} />
            Students
          </button>

          {/* Faculty Opportunities */}
          <button
            onClick={() => navigate("/academician/opportunities")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <BriefcaseBusiness size={19} />
            Faculty Opportunities
          </button>

          {/* FDP Programs */}
          <button
            onClick={() => navigate("/academician/fdp-programs")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <GraduationCap size={19} />
            FDP Programs
          </button>

          {/* Research Projects */}
          <button
            onClick={() => navigate("/academician/research")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Microscope size={19} />
            Research Projects
          </button>

          {/* Collaborations */}
          <button
            onClick={() => navigate("/academician/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Handshake size={19} />
            Collaborations
          </button>

          {/* Workshops */}
          <button
            onClick={() => navigate("/academician/workshops")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Presentation size={19} />
            Workshops
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate("/academician/messages")}
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

          {/* Welcome */}
          <div>
            <p className="text-sm text-blue-600 font-medium">
              Academician Portal
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Welcome back! 👋
            </h2>

            <p className="text-slate-500 mt-2">
              Explore industry opportunities and build meaningful
              academia-industry collaborations.
            </p>
          </div>

          {/* =====================================================
              PROFILE INITIALS
          ===================================================== */}
          <button
            onClick={() => navigate("/academician/profile")}
            className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm hover:bg-blue-700 hover:shadow-md transition"
            title={`${academicianName}'s Profile`}
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
            OPPORTUNITIES + COLLABORATIONS
        ===================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Recommended Opportunities */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Recommended Opportunities
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Industry opportunities relevant to your profile.
                </p>
              </div>

            </div>

            <div className="space-y-4">

              {/* Opportunity 1 */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex justify-between">

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Faculty Industry Internship
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Technology Industry Partner
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 h-fit">
                    Open
                  </span>

                </div>
              </div>

              {/* Opportunity 2 */}
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex justify-between">

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      AI Faculty Development Program
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Industry Learning Partner
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 h-fit">
                    Upcoming
                  </span>

                </div>
              </div>

            </div>

          </section>

          {/* Active Collaborations */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-slate-900">
              Active Collaborations
            </h3>

            <p className="text-sm text-slate-500 mt-1 mb-5">
              Your current academia-industry activities.
            </p>

            <div className="space-y-4">

              {/* Collaboration 1 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">

                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Microscope size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    AI Research Collaboration
                  </h4>

                  <p className="text-sm text-slate-500">
                    Industry Research Partner
                  </p>
                </div>

              </div>

              {/* Collaboration 2 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">

                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Presentation size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Industry Guest Lecture
                  </h4>

                  <p className="text-sm text-slate-500">
                    Scheduled collaboration
                  </p>
                </div>

              </div>

            </div>

          </section>

        </div>

      </main>
    </div>
  );
}

export default AcademicianDashboard;