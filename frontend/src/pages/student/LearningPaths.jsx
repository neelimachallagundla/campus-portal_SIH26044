import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  Search,
  Target,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    id: "java-full-stack",
    title: "Java Full Stack Development",
    description:
      "Build strong Java fundamentals and learn backend and full-stack development step by step.",
    level: "Intermediate",
    lessons: 26,
    duration: "8 weeks",
    progress: 68,
    icon: "☕",
    category: "Development",
  },
  {
    id: "data-structures",
    title: "Data Structures & Algorithms",
    description:
      "Master problem solving, data structures and algorithms with practical coding exercises.",
    level: "Intermediate",
    lessons: 26,
    duration: "10 weeks",
    progress: 42,
    icon: "🧠",
    category: "Programming",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Fundamentals",
    description:
      "Learn cloud concepts, deployment, DevOps practices and modern infrastructure fundamentals.",
    level: "Beginner",
    lessons: 25,
    duration: "7 weeks",
    progress: 24,
    icon: "☁️",
    category: "Cloud",
  },
  {
    id: "python-ai",
    title: "Python & AI Fundamentals",
    description:
      "Learn Python programming and build a foundation for artificial intelligence and machine learning.",
    level: "Beginner",
    lessons: 24,
    duration: "8 weeks",
    progress: 0,
    icon: "🐍",
    category: "AI",
  },
  {
    id: "web-development",
    title: "Modern Web Development",
    description:
      "Learn HTML, CSS, JavaScript and React to build modern responsive web applications.",
    level: "Beginner",
    lessons: 30,
    duration: "9 weeks",
    progress: 0,
    icon: "🌐",
    category: "Development",
  },
  {
    id: "database-sql",
    title: "SQL & Database Management",
    description:
      "Understand relational databases, SQL queries, database design and data management.",
    level: "Beginner",
    lessons: 20,
    duration: "6 weeks",
    progress: 0,
    icon: "🗄️",
    category: "Database",
  },
];

function LearningPaths() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Development",
    "Programming",
    "Cloud",
    "AI",
    "Database",
  ];

  const filteredPaths = learningPaths.filter((path) => {
    const matchesSearch =
      path.title.toLowerCase().includes(search.toLowerCase()) ||
      path.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      path.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              ← Back to Dashboard
            </button>

            <h1 className="mt-1 text-xl font-bold">
              Learning Paths
            </h1>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            B
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Hero */}
        <section className="mb-8">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold text-blue-600">
              BUILD YOUR FUTURE
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose your learning path
            </h2>

            <p className="mt-3 text-slate-500">
              Follow a structured learning journey designed to help you
              develop the skills you need for your career goals.
            </p>
          </div>
        </section>

        {/* Search + Categories */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex w-full max-w-md items-center rounded-xl border border-slate-200 bg-white px-4 py-3">
              <Search size={18} className="text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search learning paths..."
                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<BookOpen size={20} />}
            title="Learning Paths"
            value={learningPaths.length}
          />

          <InfoCard
            icon={<Target size={20} />}
            title="Your Progress"
            value="44%"
          />

          <InfoCard
            icon={<Trophy size={20} />}
            title="Completed Paths"
            value="0"
          />
        </section>

        {/* Learning Paths */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">
                Explore Paths
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Choose a path and start learning.
              </p>
            </div>

            <span className="text-sm text-slate-400">
              {filteredPaths.length} paths
            </span>
          </div>

          {filteredPaths.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Search
                size={32}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold">
                No learning paths found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try another search term or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPaths.map((path) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  onOpen={() =>
                    navigate(`/learning-paths/${path.id}`)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function LearningPathCard({ path, onOpen }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-100">
      {/* Top */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl">
          {path.icon}
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {path.level}
        </span>
      </div>

      {/* Title */}
      <h3 className="min-h-14 text-lg font-bold leading-6">
        {path.title}
      </h3>

      {/* Description */}
      <p className="mt-3 min-h-16 text-sm leading-6 text-slate-500">
        {path.description}
      </p>

      {/* Meta */}
      <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <BookOpen size={14} />
          {path.lessons} lessons
        </span>

        <span className="flex items-center gap-1">
          <Clock3 size={14} />
          {path.duration}
        </span>
      </div>

      {/* Progress */}
      {path.progress > 0 ? (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Your progress
            </span>

            <span className="font-semibold text-blue-600">
              {path.progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${path.progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
          <Target size={14} />
          Not started yet
        </div>
      )}

      {/* Button */}
      <button
        onClick={onOpen}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        {path.progress > 0 ? "Continue Learning" : "Start Learning"}

        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}

export default LearningPaths;