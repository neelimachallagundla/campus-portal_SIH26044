import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    title: "Java Full Stack Development",
    level: "Intermediate",
    progress: 68,
    lessons: "18 / 26 lessons",
    icon: "☕",
  },
  {
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    progress: 42,
    lessons: "11 / 26 lessons",
    icon: "🧠",
  },
  {
    title: "Cloud & DevOps Fundamentals",
    level: "Beginner",
    progress: 24,
    lessons: "6 / 25 lessons",
    icon: "☁️",
  },
];

const recommendations = [
  {
    title: "Master HashMap & HashSet",
    category: "Data Structures",
    duration: "25 min",
    icon: "🧩",
  },
  {
    title: "Build Your First REST API",
    category: "Backend Development",
    duration: "40 min",
    icon: "⚡",
  },
  {
    title: "Introduction to AWS",
    category: "Cloud Computing",
    duration: "30 min",
    icon: "☁️",
  },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile overlay */}
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
        {/* Sidebar Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
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
        <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active
          />

          <SidebarItem
            icon={<BookOpen size={19} />}
            label="My Learning"
          />

          <SidebarItem
            icon={<Target size={19} />}
            label="Learning Paths"
          />

          <SidebarItem
            icon={<Brain size={19} />}
            label="AI Assistant"
          />

          <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Progress
          </p>

          <SidebarItem
            icon={<TrendingUp size={19} />}
            label="My Progress"
          />

          <SidebarItem
            icon={<Trophy size={19} />}
            label="Achievements"
          />
        </nav>

        {/* Sidebar Bottom */}
        <div className="shrink-0 border-t border-slate-100 bg-white">
          {/* AI Learning Card */}
          <div className="px-4 pt-3 pb-2">
            <div className="rounded-2xl bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={17} className="text-blue-600" />

                <span className="text-sm font-semibold text-blue-900">
                  AI Learning
                </span>
              </div>

              <p className="mb-2 text-xs leading-5 text-blue-700">
                Let LearnBridge create a personalized path for your goals.
              </p>

              <button className="text-xs font-semibold text-blue-600 transition hover:text-blue-800">
                Create a path →
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="border-t border-slate-100 px-4 py-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="relative ml-auto flex items-center gap-4">
            <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
              <Search size={17} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search courses..."
                className="ml-2 w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              B
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {/* Welcome */}
          <section className="mb-8">
            <p className="mb-1 text-sm font-medium text-blue-600">
              Tuesday, August 25
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back! 👋
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Keep learning, keep growing. Here's what your learning journey
              looks like today.
            </p>
          </section>

          {/* Stats */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Flame size={20} />}
              title="Current Streak"
              value="7 days"
              description="Keep it going!"
            />

            <StatCard
              icon={<BookOpen size={20} />}
              title="Lessons Completed"
              value="35"
              description="+5 this week"
            />

            <StatCard
              icon={<Clock3 size={20} />}
              title="Learning Time"
              value="12.5 hrs"
              description="This month"
            />

            <StatCard
              icon={<Trophy size={20} />}
              title="Achievements"
              value="8"
              description="2 new this month"
            />
          </section>

          {/* AI CTA */}
          <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-100 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-lg bg-white/15 p-2">
                    <Sparkles size={18} />
                  </div>

                  <span className="text-sm font-semibold">
                    AI-Powered Learning
                  </span>
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  What do you want to learn?
                </h2>

                <p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">
                  Tell LearnBridge your career goal and we'll help you build a
                  personalized learning path designed around your current
                  skills and goals.
                </p>
              </div>

              <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">
                Create My Learning Path
                <ArrowRight size={17} />
              </button>
            </div>
          </section>

          {/* Learning paths */}
          <section className="mb-10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Continue Learning</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pick up where you left off.
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                View all
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {learningPaths.map((path) => (
                <LearningPathCard
                  key={path.title}
                  {...path}
                />
              ))}
            </div>
          </section>

          {/* Bottom section */}
          <section className="grid gap-8 xl:grid-cols-3">
            {/* Recommendations */}
            <div className="xl:col-span-2">
              <div className="mb-5">
                <h2 className="text-xl font-bold">
                  Recommended For You
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Based on your learning activity.
                </p>
              </div>

              <div className="space-y-3">
                {recommendations.map((item) => (
                  <RecommendationCard
                    key={item.title}
                    {...item}
                  />
                ))}
              </div>
            </div>

            {/* Daily goal */}
            <div>
              <div className="mb-5">
                <h2 className="text-xl font-bold">
                  Today's Goal
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Small progress adds up.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Daily target
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      45 min
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                    67%
                  </div>
                </div>

                <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[67%] rounded-full bg-blue-600" />
                </div>

                <p className="text-sm text-slate-500">
                  30 minutes completed. Just 15 more to reach today's goal!
                </p>

                <button className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Continue Learning
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <button
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
          {icon}
        </div>

        <CheckCircle2
          size={17}
          className="text-emerald-500"
        />
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function LearningPathCard({
  title,
  level,
  progress,
  lessons,
  icon,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl">
          {icon}
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {level}
        </span>
      </div>

      <h3 className="min-h-12 font-semibold leading-6">
        {title}
      </h3>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
        <span>{lessons}</span>

        <span className="font-semibold text-blue-600">
          {progress}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">
        Continue

        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}

function RecommendationCard({
  title,
  category,
  duration,
  icon,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold">
          {title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <span>{category}</span>
          <span>•</span>
          <span>{duration}</span>
        </div>
      </div>

      <button className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-600">
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

export default Dashboard;