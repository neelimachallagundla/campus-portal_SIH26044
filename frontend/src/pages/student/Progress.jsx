import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    id: "java-full-stack",
    title: "Java Full Stack Development",
    level: "Intermediate",
    modules: [
      {
        id: "java-fundamentals",
        title: "Java Fundamentals",
        lessons: 5,
        duration: 25,
      },
      {
        id: "oops",
        title: "Object-Oriented Programming",
        lessons: 4,
        duration: 30,
      },
      {
        id: "collections",
        title: "Collections Framework",
        lessons: 4,
        duration: 25,
      },
      {
        id: "jdbc",
        title: "JDBC & Databases",
        lessons: 3,
        duration: 20,
      },
      {
        id: "spring-boot",
        title: "Spring Boot",
        lessons: 4,
        duration: 30,
      },
      {
        id: "rest-apis",
        title: "REST APIs",
        lessons: 3,
        duration: 25,
      },
      {
        id: "react",
        title: "React Integration",
        lessons: 2,
        duration: 25,
      },
      {
        id: "full-stack-project",
        title: "Full Stack Project",
        lessons: 1,
        duration: 60,
      },
    ],
  },

  {
    id: "data-structures",
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    modules: [
      {
        id: "arrays",
        title: "Arrays & Strings",
        lessons: 4,
        duration: 25,
      },
      {
        id: "linked-lists",
        title: "Linked Lists",
        lessons: 4,
        duration: 25,
      },
      {
        id: "stacks-queues",
        title: "Stacks & Queues",
        lessons: 3,
        duration: 25,
      },
      {
        id: "hashing",
        title: "Hashing",
        lessons: 3,
        duration: 25,
      },
      {
        id: "trees",
        title: "Trees",
        lessons: 4,
        duration: 30,
      },
      {
        id: "graphs",
        title: "Graphs",
        lessons: 4,
        duration: 30,
      },
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        lessons: 4,
        duration: 30,
      },
    ],
  },

  {
    id: "cloud-devops",
    title: "Cloud & DevOps Fundamentals",
    level: "Beginner",
    modules: [
      {
        id: "cloud-intro",
        title: "Introduction to Cloud",
        lessons: 4,
        duration: 20,
      },
      {
        id: "linux",
        title: "Linux Fundamentals",
        lessons: 4,
        duration: 25,
      },
      {
        id: "git",
        title: "Git & GitHub",
        lessons: 3,
        duration: 20,
      },
      {
        id: "aws",
        title: "AWS Fundamentals",
        lessons: 5,
        duration: 30,
      },
      {
        id: "docker",
        title: "Docker",
        lessons: 3,
        duration: 25,
      },
      {
        id: "cicd",
        title: "CI/CD",
        lessons: 3,
        duration: 25,
      },
      {
        id: "devops-project",
        title: "DevOps Project",
        lessons: 3,
        duration: 45,
      },
    ],
  },
];

function readJSON(key, fallback = null) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

/*
 * Supports both:
 *
 * learnbridgeSkillAssessment
 *
 * and the older:
 *
 * learnbridge_assessment
 */
function getAssessment() {
  const current = readJSON("learnbridgeSkillAssessment");

  if (current?.completed) {
    return current;
  }

  const old = readJSON("learnbridge_assessment");

  if (old?.completed) {
    return old;
  }

  // Support possible older nested structure
  if (old?.result?.completed) {
    return {
      ...old.result,
      completed: true,
    };
  }

  return null;
}

/*
 * Get only module-level quiz results.
 *
 * Quiz.jsx stores:
 *
 * learnbridge_quiz_${pathId}_${moduleId}
 *
 * It also stores an older path-level key:
 *
 * learnbridge_quiz_${pathId}
 *
 * We intentionally ignore the path-level key so the
 * latest module result isn't counted as another quiz.
 */
function getQuizResults() {
  const results = [];
  const seen = new Set();

  Object.keys(localStorage).forEach((key) => {
    const match = key.match(
      /^learnbridge_quiz_([^_]+)_(.+)$/
    );

    if (!match) return;

    try {
      const result = JSON.parse(
        localStorage.getItem(key)
      );

      if (!result?.completed) return;

      const pathId =
        result.pathId || match[1];

      const moduleId =
        result.moduleId || match[2];

      if (!pathId || !moduleId) return;

      const uniqueId = `${pathId}_${moduleId}`;

      if (seen.has(uniqueId)) return;

      seen.add(uniqueId);

      results.push({
        ...result,
        pathId,
        moduleId,
      });
    } catch {
      // Ignore invalid localStorage data
    }
  });

  return results;
}

function getModuleQuiz(pathId, moduleId) {
  return readJSON(
    `learnbridge_quiz_${pathId}_${moduleId}`
  );
}

function getModuleProgress(pathId, module) {
  const lessons = readJSON(
    `learnbridge_lessons_${pathId}_${module.id}`,
    []
  );

  const completedLessons = Array.isArray(lessons)
    ? lessons.length
    : 0;

  const learningTime = Number(
    localStorage.getItem(
      `learnbridge_timer_${pathId}_${module.id}`
    ) || 0
  );

  const requiredSeconds =
    module.duration * 60;

  const timeProgress =
    requiredSeconds > 0
      ? Math.min(
          (learningTime / requiredSeconds) * 100,
          100
        )
      : 0;

  const lessonProgress =
    module.lessons > 0
      ? Math.min(
          (completedLessons / module.lessons) * 100,
          100
        )
      : 0;

  return {
    completedLessons,
    totalLessons: module.lessons,
    learningTime,
    requiredSeconds,
    lessonProgress,
    timeProgress,
  };
}

function getPathProgress(path) {
  let completedLessons = 0;
  let totalLessons = 0;
  let learningTime = 0;
  let requiredTime = 0;

  path.modules.forEach((module) => {
    const progress = getModuleProgress(
      path.id,
      module
    );

    completedLessons +=
      progress.completedLessons;

    totalLessons += module.lessons;

    learningTime +=
      progress.learningTime;

    requiredTime +=
      progress.requiredSeconds;
  });

  const lessonProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0;

  const timeProgress =
    requiredTime > 0
      ? Math.round(
          Math.min(
            (learningTime / requiredTime) * 100,
            100
          )
        )
      : 0;

  return {
    ...path,
    completedLessons,
    totalLessons,
    learningTime,
    requiredTime,
    lessonProgress,
    timeProgress,
    progress: lessonProgress,
  };
}

function formatHours(seconds) {
  if (!seconds || seconds <= 0) {
    return "0h";
  }

  const hours = seconds / 3600;

  if (hours < 1) {
    return `${Math.max(
      1,
      Math.round(seconds / 60)
    )}m`;
  }

  return `${hours.toFixed(1)}h`;
}

function getCareerReadiness(
  assessment,
  overallProgress,
  quizResults
) {
  if (!assessment?.completed) {
    return {
      percentage: 0,
      label: "Assessment Required",
    };
  }

  const assessmentScore = Number(
    assessment.percentage || 0
  );

  const passedQuizzes =
    quizResults.filter(
      (quiz) => quiz.passed
    ).length;

  const completedQuizzes =
    quizResults.length;

  const quizProgress =
    completedQuizzes > 0
      ? Math.min(
          100,
          (passedQuizzes / completedQuizzes) *
            100
        )
      : 0;

  /*
   * Career readiness:
   *
   * 40% Skill Assessment
   * 30% Learning Progress
   * 30% Module Assessments
   */
  const readiness = Math.round(
    assessmentScore * 0.4 +
      overallProgress * 0.3 +
      quizProgress * 0.3
  );

  let label = "Getting Started";

  if (readiness >= 85) {
    label = "Career Ready";
  } else if (readiness >= 70) {
    label = "Almost Ready";
  } else if (readiness >= 50) {
    label = "Developing";
  }

  return {
    percentage: Math.min(100, readiness),
    label,
  };
}

function Progress() {
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] =
    useState(0);

  useEffect(() => {
    const refresh = () => {
      setRefreshKey(
        (previous) => previous + 1
      );
    };

    const events = [
      "learnbridge-progress",
      "learnbridge-quiz-updated",
      "learnbridge-assessment-updated",
      "learnbridge-applications-updated",
      "learnbridge-profile-updated",
      "storage",
    ];

    events.forEach((event) => {
      window.addEventListener(event, refresh);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(
          event,
          refresh
        );
      });
    };
  }, []);

  /*
   * PATH PROGRESS
   */
  const pathProgress = useMemo(() => {
    return learningPaths.map(getPathProgress);
  }, [refreshKey]);

  /*
   * ALL MODULE QUIZZES
   */
  const quizResults = useMemo(() => {
    return getQuizResults();
  }, [refreshKey]);

  /*
   * ASSESSMENT
   */
  const assessment = useMemo(() => {
    return getAssessment();
  }, [refreshKey]);

  /*
   * TOTAL LESSONS
   */
  const totalLessons =
    pathProgress.reduce(
      (sum, path) =>
        sum + path.totalLessons,
      0
    );

  const completedLessons =
    pathProgress.reduce(
      (sum, path) =>
        sum + path.completedLessons,
      0
    );

  /*
   * TOTAL LEARNING TIME
   */
  const totalLearningTime =
    pathProgress.reduce(
      (sum, path) =>
        sum + path.learningTime,
      0
    );

  /*
   * OVERALL LEARNING PROGRESS
   */
  const overallProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) *
            100
        )
      : 0;

  /*
   * QUIZ STATISTICS
   */
  const quizzesCompleted =
    quizResults.length;

  const quizzesPassed =
    quizResults.filter(
      (quiz) => quiz.passed
    ).length;

  const quizScores =
    quizResults
      .map((quiz) => Number(quiz.score))
      .filter(
        (score) =>
          Number.isFinite(score)
      );

  const averageQuizScore =
    quizScores.length > 0
      ? Math.round(
          quizScores.reduce(
            (sum, score) =>
              sum + score,
            0
          ) / quizScores.length
        )
      : 0;

  /*
   * ASSESSMENT STATUS
   */
  const assessmentCompleted =
    Boolean(assessment?.completed);

  /*
   * CAREER READINESS
   */
  const careerReadiness =
    useMemo(
      () =>
        getCareerReadiness(
          assessment,
          overallProgress,
          quizResults
        ),
      [
        assessment,
        overallProgress,
        quizResults,
      ]
    );

  /*
   * ACTIVE PATH
   *
   * Prefer the assessment's recommended
   * path if available.
   */
  const recommendedPathId =
    assessment?.recommendedPath?.pathId;

  const activePath =
    recommendedPathId
      ? pathProgress.find(
          (path) =>
            path.id === recommendedPathId
        ) ||
        [...pathProgress].sort(
          (a, b) =>
            b.progress - a.progress
        )[0]
      : [...pathProgress].sort(
          (a, b) =>
            b.progress - a.progress
        )[0];

  /*
   * STREAK
   *
   * Prototype value until backend activity
   * tracking is implemented.
   */
  const streak =
    completedLessons > 0 ||
    quizzesCompleted > 0
      ? 1
      : 0;

  /*
   * MODULE COUNTS
   */
  const totalModules =
    learningPaths.reduce(
      (sum, path) =>
        sum + path.modules.length,
      0
    );

  const passedModules =
    quizResults.filter(
      (quiz) => quiz.passed
    ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2">
            <BarChart3
              size={20}
              className="text-blue-600"
            />

            <span className="font-bold">
              My Progress
            </span>
          </div>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg">

          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">

            <div>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Trophy size={25} />
              </div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Keep building your skills.
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Track your lessons, module
                assessments, learning time and
                career readiness across your
                LearnBridge journey.
              </p>

            </div>

            {/* OVERALL PROGRESS */}
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">

              <div className="flex items-center justify-between">

                <span className="text-sm text-blue-100">
                  Overall Progress
                </span>

                <span className="text-3xl font-bold">
                  {overallProgress}%
                </span>

              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20">

                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-xs text-blue-100">
                {completedLessons} of{" "}
                {totalLessons} lessons completed
              </p>

            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {/* LESSONS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <BookOpen
                size={21}
                className="text-blue-600"
              />

              <span className="text-xs font-semibold text-slate-400">
                LESSONS
              </span>

            </div>

            <p className="mt-4 text-2xl font-bold">
              {completedLessons}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              of {totalLessons} completed
            </p>

          </div>

          {/* LEARNING TIME */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <Clock3
                size={21}
                className="text-indigo-600"
              />

              <span className="text-xs font-semibold text-slate-400">
                LEARNING TIME
              </span>

            </div>

            <p className="mt-4 text-2xl font-bold">
              {formatHours(
                totalLearningTime
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              total tracked time
            </p>

          </div>

          {/* QUIZZES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <Target
                size={21}
                className="text-purple-600"
              />

              <span className="text-xs font-semibold text-slate-400">
                MODULE QUIZZES
              </span>

            </div>

            <p className="mt-4 text-2xl font-bold">
              {quizzesCompleted}
              <span className="text-base font-medium text-slate-400">
                /{totalModules}
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {quizzesPassed} passed
            </p>

          </div>

          {/* QUIZ AVERAGE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <Award
                size={21}
                className="text-amber-500"
              />

              <span className="text-xs font-semibold text-slate-400">
                QUIZ AVG
              </span>

            </div>

            <p className="mt-4 text-2xl font-bold">
              {averageQuizScore}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              average score
            </p>

          </div>

          {/* CAREER READINESS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <Flame
                size={21}
                className="text-orange-500"
              />

              <span className="text-xs font-semibold text-slate-400">
                READINESS
              </span>

            </div>

            <p className="mt-4 text-2xl font-bold">
              {careerReadiness.percentage}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {careerReadiness.label}
            </p>

          </div>

        </section>

        {/* CAREER READINESS */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex-1">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                  <Target
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    Career Readiness
                  </p>

                  <h2 className="text-xl font-bold text-slate-900">
                    {careerReadiness.label}
                  </h2>
                </div>

              </div>

              <p className="mt-3 text-sm text-slate-600">
                {assessmentCompleted
                  ? `Your current career readiness is ${careerReadiness.percentage}%. Keep completing lessons and module assessments to improve your readiness.`
                  : "Complete your skill assessment to start tracking your career readiness."}
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{
                    width: `${careerReadiness.percentage}%`,
                  }}
                />

              </div>

            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">

              {!assessmentCompleted && (
                <button
                  onClick={() =>
                    navigate(
                      "/skill-assessment"
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Take Assessment
                  <ArrowRight size={17} />
                </button>
              )}

              <button
                onClick={() =>
                  navigate(
                    "/opportunities"
                  )
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
              >
                Career Opportunities
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </section>

        {/* ACTIVE PATH */}
        {activePath &&
          activePath.progress > 0 && (
            <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    Continue Learning
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {activePath.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    You&apos;re currently at{" "}
                    {activePath.progress}%.
                    Continue where you left off.
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/learning-paths/${activePath.id}`
                    )
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue Learning
                </button>

              </div>

            </section>
          )}

        {/* LEARNING PATHS */}
        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              Learning Path Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track lesson completion and
              individual module assessments.
            </p>

          </div>

          <div className="grid gap-5 lg:grid-cols-3">

            {pathProgress.map((path) => {

              const pathQuizResults =
                quizResults.filter(
                  (quiz) =>
                    quiz.pathId === path.id
                );

              const passedPathQuizzes =
                pathQuizResults.filter(
                  (quiz) =>
                    quiz.passed
                ).length;

              return (
                <div
                  key={path.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  {/* PATH HEADER */}
                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {path.level}
                      </span>

                      <h3 className="mt-4 text-lg font-bold">
                        {path.title}
                      </h3>

                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-600">
                      {path.progress}%
                    </div>

                  </div>

                  {/* COURSE PROGRESS */}
                  <div className="mt-6">

                    <div className="mb-2 flex items-center justify-between text-xs">

                      <span className="font-medium text-slate-500">
                        Course Progress
                      </span>

                      <span className="font-bold text-slate-700">
                        {path.completedLessons}/
                        {path.totalLessons}
                      </span>

                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-700"
                        style={{
                          width: `${path.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* MODULE STATUS */}
                  <div className="mt-6 space-y-3">

                    {path.modules.map(
                      (module) => {

                        const moduleProgress =
                          getModuleProgress(
                            path.id,
                            module
                          );

                        const quiz =
                          getModuleQuiz(
                            path.id,
                            module.id
                          );

                        const lessonComplete =
                          moduleProgress.lessonProgress >=
                          100;

                        return (
                          <div
                            key={module.id}
                            className="rounded-xl bg-slate-50 px-3 py-3"
                          >

                            <div className="flex items-center justify-between gap-3">

                              <div className="min-w-0">

                                <p className="truncate text-xs font-semibold text-slate-700">
                                  {module.title}
                                </p>

                                <p className="mt-1 text-[11px] text-slate-400">
                                  {
                                    moduleProgress.completedLessons
                                  }
                                  /
                                  {
                                    moduleProgress.totalLessons
                                  }{" "}
                                  lessons
                                </p>

                              </div>

                              <span
                                className={`shrink-0 text-xs font-bold ${
                                  lessonComplete
                                    ? "text-emerald-600"
                                    : "text-blue-600"
                                }`}
                              >
                                {Math.round(
                                  moduleProgress.lessonProgress
                                )}
                                %
                              </span>

                            </div>

                            {/* MODULE QUIZ STATUS */}
                            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2">

                              <div className="flex items-center gap-2">

                                {quiz?.passed ? (
                                  <CheckCircle2
                                    size={14}
                                    className="text-emerald-500"
                                  />
                                ) : (
                                  <Target
                                    size={14}
                                    className="text-slate-400"
                                  />
                                )}

                                <span className="text-[11px] font-medium text-slate-500">
                                  Assessment
                                </span>

                              </div>

                              {quiz?.completed ? (
                                <span
                                  className={`text-[11px] font-bold ${
                                    quiz.passed
                                      ? "text-emerald-600"
                                      : "text-red-500"
                                  }`}
                                >
                                  {quiz.score}%
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-400">
                                  Not attempted
                                </span>
                              )}

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                  {/* PATH QUIZ SUMMARY */}
                  <div className="mt-5 rounded-2xl bg-blue-50 p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-xs font-semibold text-slate-600">
                        Module Assessments
                      </span>

                      <span className="text-sm font-bold text-blue-600">
                        {pathQuizResults.length}/
                        {path.modules.length}
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {passedPathQuizzes} passed
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/learning-paths/${path.id}`
                      )
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  >
                    View Learning Path
                    <ArrowRight size={17} />
                  </button>

                </div>
              );
            })}

          </div>

        </section>

        {/* ASSESSMENT */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Award
                  size={21}
                  className="text-purple-600"
                />

                <h2 className="text-xl font-bold">
                  Skill Assessment
                </h2>

              </div>

              {assessmentCompleted ? (

                <p className="mt-2 text-sm text-slate-500">
                  Your latest assessment score
                  is{" "}
                  <span className="font-bold text-blue-600">
                    {assessment.percentage}%
                  </span>{" "}
                  with a{" "}
                  <span className="font-bold text-purple-600">
                    {assessment.level}
                  </span>{" "}
                  skill level.
                </p>

              ) : (

                <p className="mt-2 text-sm text-slate-500">
                  Take your skill assessment to
                  discover your current level and
                  career direction.
                </p>

              )}

            </div>

            <button
              onClick={() =>
                navigate(
                  "/skill-assessment"
                )
              }
              className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              {assessmentCompleted
                ? "Retake Assessment"
                : "Take Assessment"}
            </button>

          </div>

          {assessmentCompleted && (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Career Goal
                </p>

                <p className="mt-2 text-sm font-bold text-slate-800">
                  {assessment.goalTitle ||
                    "Software Engineer"}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Experience
                </p>

                <p className="mt-2 text-sm font-bold capitalize text-slate-800">
                  {assessment.experience ||
                    "Not specified"}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Technical Score
                </p>

                <p className="mt-2 text-sm font-bold text-slate-800">
                  {assessment.score}/
                  {assessment.totalQuestions}
                </p>

              </div>

            </div>
          )}

        </section>

        {/* BOTTOM ACTIONS */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">

          {/* ACHIEVEMENTS */}
          <button
            onClick={() =>
              navigate("/achievements")
            }
            className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-200"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                <Trophy
                  size={23}
                  className="text-amber-500"
                />
              </div>

              <div className="flex-1">

                <h3 className="font-bold">
                  View Achievements
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Track your milestones and
                  achievements.
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-300 transition group-hover:text-amber-500"
              />

            </div>

          </button>

          {/* LEARNING */}
          <button
            onClick={() =>
              navigate(
                "/learning-paths"
              )
            }
            className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <BookOpen
                  size={23}
                  className="text-blue-600"
                />
              </div>

              <div className="flex-1">

                <h3 className="font-bold">
                  Explore Learning Paths
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Continue learning and build
                  technical skills.
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-300 transition group-hover:text-blue-500"
              />

            </div>

          </button>

          {/* OPPORTUNITIES */}
          <button
            onClick={() =>
              navigate(
                "/opportunities"
              )
            }
            className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-200"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <Target
                  size={23}
                  className="text-emerald-600"
                />
              </div>

              <div className="flex-1">

                <h3 className="font-bold">
                  Career Opportunities
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Find internships, training and
                  entry-level jobs.
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-300 transition group-hover:text-emerald-500"
              />

            </div>

          </button>

        </section>

      </main>
    </div>
  );
}

export default Progress;