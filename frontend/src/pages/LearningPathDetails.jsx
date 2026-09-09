import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Lock,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const pathData = {
  "java-full-stack": {
    title: "Java Full Stack Development",
    description:
      "Master Java, databases, Spring Boot, REST APIs, React, and full-stack development.",
    level: "Intermediate",
    totalLessons: 26,
    modules: [
      {
        id: "java-fundamentals",
        title: "Java Fundamentals",
        duration: 25,
        lessons: [
          "Introduction to Java",
          "Variables & Data Types",
          "Control Statements",
          "Methods & Functions",
          "Practice: Java Fundamentals",
        ],
      },
      {
        id: "oops",
        title: "Object-Oriented Programming",
        duration: 30,
        lessons: [
          "Introduction to OOP",
          "Classes & Objects",
          "Inheritance & Polymorphism",
          "Encapsulation & Abstraction",
        ],
      },
      {
        id: "collections",
        title: "Collections Framework",
        duration: 25,
        lessons: [
          "Introduction to Collections",
          "ArrayList & LinkedList",
          "HashMap & HashSet",
          "Collections Practice",
        ],
      },
      {
        id: "jdbc",
        title: "JDBC & Databases",
        duration: 20,
        lessons: [
          "Introduction to JDBC",
          "Connecting Java to MySQL",
          "Executing SQL Queries",
        ],
      },
      {
        id: "spring-boot",
        title: "Spring Boot",
        duration: 30,
        lessons: [
          "Introduction to Spring Boot",
          "Spring Boot Project Structure",
          "Dependency Injection",
          "Building REST Services",
        ],
      },
      {
        id: "rest-apis",
        title: "REST APIs",
        duration: 25,
        lessons: [
          "Introduction to REST APIs",
          "HTTP Methods",
          "Building REST Endpoints",
        ],
      },
      {
        id: "react",
        title: "React Integration",
        duration: 25,
        lessons: [
          "Introduction to React Integration",
          "Connecting React with Spring Boot",
        ],
      },
      {
        id: "full-stack-project",
        title: "Full Stack Project",
        duration: 60,
        lessons: ["Project Planning"],
      },
    ],
  },

  "data-structures": {
    title: "Data Structures & Algorithms",
    description:
      "Build strong problem-solving skills with essential data structures and algorithms.",
    level: "Intermediate",
    totalLessons: 26,
    modules: [
      {
        id: "arrays",
        title: "Arrays & Strings",
        duration: 25,
        lessons: [
          "Introduction to Arrays",
          "Array Operations",
          "Strings",
          "Array Practice",
        ],
      },
      {
        id: "linked-lists",
        title: "Linked Lists",
        duration: 25,
        lessons: [
          "Introduction to Linked Lists",
          "Singly Linked List",
          "Doubly Linked List",
          "Linked List Problems",
        ],
      },
      {
        id: "stacks-queues",
        title: "Stacks & Queues",
        duration: 25,
        lessons: [
          "Introduction to Stacks",
          "Stack Operations",
          "Queues",
        ],
      },
      {
        id: "hashing",
        title: "Hashing",
        duration: 25,
        lessons: [
          "Introduction to Hashing",
          "HashMap & HashSet",
          "Hashing Problems",
        ],
      },
      {
        id: "trees",
        title: "Trees",
        duration: 30,
        lessons: [
          "Introduction to Trees",
          "Binary Trees",
          "Binary Search Trees",
          "Tree Problems",
        ],
      },
      {
        id: "graphs",
        title: "Graphs",
        duration: 30,
        lessons: [
          "Introduction to Graphs",
          "Graph Representation",
          "BFS & DFS",
          "Graph Problems",
        ],
      },
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        duration: 30,
        lessons: [
          "Introduction to Dynamic Programming",
          "Memoization",
          "Tabulation",
          "Dynamic Programming Problems",
        ],
      },
    ],
  },

  "cloud-devops": {
    title: "Cloud & DevOps Fundamentals",
    description:
      "Learn Linux, Git, AWS, Docker, CI/CD and practical DevOps workflows.",
    level: "Beginner",
    totalLessons: 25,
    modules: [
      {
        id: "cloud-intro",
        title: "Introduction to Cloud",
        duration: 20,
        lessons: [
          "What is Cloud Computing?",
          "Cloud Service Models",
          "Cloud Deployment Models",
          "Cloud Architecture",
        ],
      },
      {
        id: "linux",
        title: "Linux Fundamentals",
        duration: 25,
        lessons: [
          "Introduction to Linux",
          "Linux Commands",
          "File Permissions",
          "Linux Practice",
        ],
      },
      {
        id: "git",
        title: "Git & GitHub",
        duration: 20,
        lessons: [
          "Introduction to Git",
          "GitHub & Remote Repositories",
          "Branches & Pull Requests",
        ],
      },
      {
        id: "aws",
        title: "AWS Fundamentals",
        duration: 30,
        lessons: [
          "Introduction to AWS",
          "EC2",
          "S3",
          "IAM",
          "AWS Practice",
        ],
      },
      {
        id: "docker",
        title: "Docker",
        duration: 25,
        lessons: [
          "Introduction to Docker",
          "Docker Images & Containers",
          "Docker Compose",
        ],
      },
      {
        id: "cicd",
        title: "CI/CD",
        duration: 25,
        lessons: [
          "Introduction to CI/CD",
          "GitHub Actions",
          "Building a CI/CD Pipeline",
        ],
      },
      {
        id: "devops-project",
        title: "DevOps Project",
        duration: 45,
        lessons: [
          "Project Planning",
          "Deployment",
          "Final Project Setup",
        ],
      },
    ],
  },
};

function getLessonStorageKey(pathId, moduleId) {
  return `learnbridge_lessons_${pathId}_${moduleId}`;
}

function getTimerStorageKey(pathId, moduleId) {
  return `learnbridge_timer_${pathId}_${moduleId}`;
}

function getQuizStorageKey(pathId) {
  return `learnbridge_quiz_${pathId}`;
}

function getCompletedLessons(pathId, moduleId) {
  try {
    const saved = localStorage.getItem(
      getLessonStorageKey(pathId, moduleId)
    );

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getLearningTime(pathId, moduleId) {
  try {
    const saved = localStorage.getItem(
      getTimerStorageKey(pathId, moduleId)
    );

    return saved ? Number(saved) : 0;
  } catch {
    return 0;
  }
}

function getQuizResult(pathId) {
  try {
    const saved = localStorage.getItem(getQuizStorageKey(pathId));

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${hours}h`;
}

function ModuleCard({
  module,
  index,
  progress,
  timeSpent,
  unlocked,
  quizResult,
  onContinue,
}) {
  const completed = progress === 100;

  const timeProgress = Math.min(
    100,
    Math.round((timeSpent / (module.duration * 60)) * 100)
  );

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition ${
        unlocked
          ? "border-slate-200 hover:border-blue-200 hover:shadow-md"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              completed
                ? "bg-emerald-100 text-emerald-600"
                : unlocked
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {completed ? (
              <CheckCircle2 size={22} />
            ) : unlocked ? (
              <BookOpen size={22} />
            ) : (
              <Lock size={20} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Module {index + 1}
                </p>

                <h3 className="text-lg font-bold text-slate-900">
                  {module.title}
                </h3>

                <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={15} />
                    {module.lessons.length} lessons
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={15} />
                    {module.duration} min
                  </span>
                </div>
              </div>

              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  completed
                    ? "bg-emerald-100 text-emerald-700"
                    : unlocked
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {completed
                  ? "Completed"
                  : unlocked
                  ? "Unlocked"
                  : "Locked"}
              </div>
            </div>

            {unlocked && (
              <div className="mt-5 space-y-3">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Lesson progress
                    </span>

                    <span className="font-semibold text-slate-700">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Learning time
                    </span>

                    <span className="font-semibold text-slate-700">
                      {formatTime(timeSpent)} / {module.duration} min
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${timeProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-sm text-slate-500">
                    {getCompletedLessons(
                      window.__learnbridgePathId || "",
                      module.id
                    ).length}{" "}
                    / {module.lessons.length} lessons completed
                  </span>

                  {quizResult?.completed && completed && (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        quizResult.passed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      Quiz: {quizResult.score}%
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onContinue(module)}
                  className="mt-2 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {completed ? "Review Module" : "Continue Learning"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {!unlocked && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Lock size={15} />
                Complete the previous module to unlock this module.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LearningPathDetails() {
  const { pathId } = useParams();
  const navigate = useNavigate();

  const path = pathData[pathId];

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setRefreshKey((value) => value + 1);
    };

    window.addEventListener("learnbridge-progress", refresh);
    window.addEventListener("learnbridge-quiz-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("learnbridge-progress", refresh);
      window.removeEventListener("learnbridge-quiz-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    window.__learnbridgePathId = pathId;

    return () => {
      delete window.__learnbridgePathId;
    };
  }, [pathId]);

  if (!path) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Learning path not found
          </h1>

          <button
            onClick={() => navigate("/learning-paths")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Learning Paths
          </button>
        </div>
      </div>
    );
  }

  const moduleStats = useMemo(() => {
    return path.modules.map((module) => {
      const completedLessons = getCompletedLessons(
        pathId,
        module.id
      );

      const timeSpent = getLearningTime(pathId, module.id);

      const progress =
        module.lessons.length > 0
          ? Math.round(
              (completedLessons.length / module.lessons.length) * 100
            )
          : 0;

      const lessonsComplete =
        completedLessons.length >= module.lessons.length;

      const timeComplete =
        timeSpent >= module.duration * 60;

      const complete = lessonsComplete && timeComplete;

      return {
        ...module,
        completedLessons,
        timeSpent,
        progress,
        lessonsComplete,
        timeComplete,
        complete,
      };
    });
  }, [path, pathId, refreshKey]);

  const modules = moduleStats.map((module, index) => {
    const unlocked =
      index === 0 || moduleStats[index - 1]?.complete === true;

    return {
      ...module,
      unlocked,
    };
  });

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedLessons = modules.reduce(
    (sum, module) => sum + module.completedLessons.length,
    0
  );

  const totalTime = modules.reduce(
    (sum, module) => sum + module.timeSpent,
    0
  );

  const totalRequiredTime = modules.reduce(
    (sum, module) => sum + module.duration * 60,
    0
  );

  const overallProgress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const firstIncompleteModule =
    modules.find((module) => !module.complete) || modules[modules.length - 1];

  const currentModuleIndex = modules.findIndex(
    (module) => module.id === firstIncompleteModule?.id
  );

  const currentModule = firstIncompleteModule;

  const quizResult = getQuizResult(pathId);

  const pathCompleted = modules.every((module) => module.complete);

  const continueLearning = (module) => {
    const incompleteIndex = module.lessons.findIndex(
      (_, index) => !module.completedLessons.includes(index)
    );

    const lessonIndex =
      incompleteIndex === -1
        ? module.lessons.length - 1
        : incompleteIndex;

    navigate(
      `/learning-paths/${pathId}/lessons?module=${module.id}&lesson=${lessonIndex}`
    );
  };

  const openQuiz = (module) => {
    navigate(
      `/learning-paths/${pathId}/quiz?module=${module.id}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/learning-paths")}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Learning Paths
          </button>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {path.level}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {path.modules.length} Modules
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {path.title}
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                {path.description}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 lg:min-w-57.5">
              <p className="text-sm font-medium text-slate-500">
                Overall progress
              </p>

              <div className="mt-1 flex items-end justify-between">
                <span className="text-3xl font-bold text-slate-900">
                  {overallProgress}%
                </span>

                <span className="pb-1 text-sm text-slate-500">
                  {completedLessons}/{totalLessons} lessons
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <BookOpen size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Lessons</p>
                <p className="text-xl font-bold text-slate-900">
                  {completedLessons}/{totalLessons}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Clock3 size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Learning time</p>
                <p className="text-xl font-bold text-slate-900">
                  {formatTime(totalTime)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Completed modules</p>
                <p className="text-xl font-bold text-slate-900">
                  {modules.filter((module) => module.complete).length}/
                  {modules.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                <Trophy size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Quiz status</p>
                <p className="text-xl font-bold text-slate-900">
                  {quizResult?.completed
                    ? `${quizResult.score}%`
                    : "Not attempted"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Continue */}
        {!pathCompleted && currentModule && (
          <section className="mt-8 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-100">
                  Continue your journey
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {currentModule.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                  You have completed{" "}
                  {currentModule.completedLessons.length} of{" "}
                  {currentModule.lessons.length} lessons in this module.
                </p>
              </div>

              <button
                type="button"
                onClick={() => continueLearning(currentModule)}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                <PlayCircle size={19} />
                Continue Learning
              </button>
            </div>
          </section>
        )}

        {/* Completed */}
        {pathCompleted && (
          <section className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Trophy size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-emerald-900">
                  Learning path completed! 🎉
                </h2>

                <p className="mt-1 text-emerald-700">
                  You have completed every module and met the required
                  learning time.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Modules */}
        <section className="mt-8">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Course curriculum
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Learning Modules
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete modules in sequence to unlock the next stage.
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                progress={module.progress}
                timeSpent={module.timeSpent}
                unlocked={module.unlocked}
                quizResult={
                  index === currentModuleIndex ? quizResult : null
                }
                onContinue={continueLearning}
              />
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="mt-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                  <Trophy size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Module Assessments
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    Finish all lessons and the required learning time in a
                    module to unlock its assessment.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {modules.map((module) => {
                  const assessmentUnlocked = module.complete;

                  return (
                    <button
                      key={module.id}
                      type="button"
                      disabled={!assessmentUnlocked}
                      onClick={() => openQuiz(module)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        assessmentUnlocked
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "cursor-not-allowed bg-slate-100 text-slate-400"
                      }`}
                    >
                      {assessmentUnlocked ? (
                        <Trophy size={16} />
                      ) : (
                        <Lock size={15} />
                      )}

                      {module.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => navigate("/learning-paths")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            All Learning Paths
          </button>

          {!pathCompleted && currentModule && (
            <button
              type="button"
              onClick={() => continueLearning(currentModule)}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Continue
              <ChevronRight size={17} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}