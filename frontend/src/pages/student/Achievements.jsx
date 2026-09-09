import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  Lock,
  Medal,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    id: "java-full-stack",
    modules: [
      { id: "java-fundamentals", lessons: 5 },
      { id: "oops", lessons: 4 },
      { id: "collections", lessons: 4 },
      { id: "jdbc", lessons: 3 },
      { id: "spring-boot", lessons: 4 },
      { id: "rest-apis", lessons: 3 },
      { id: "react", lessons: 2 },
      { id: "full-stack-project", lessons: 1 },
    ],
  },
  {
    id: "data-structures",
    modules: [
      { id: "arrays", lessons: 4 },
      { id: "linked-lists", lessons: 4 },
      { id: "stacks-queues", lessons: 3 },
      { id: "hashing", lessons: 3 },
      { id: "trees", lessons: 4 },
      { id: "graphs", lessons: 4 },
      { id: "dynamic-programming", lessons: 4 },
    ],
  },
  {
    id: "cloud-devops",
    modules: [
      { id: "cloud-intro", lessons: 4 },
      { id: "linux", lessons: 4 },
      { id: "git", lessons: 3 },
      { id: "aws", lessons: 5 },
      { id: "docker", lessons: 3 },
      { id: "cicd", lessons: 3 },
      { id: "devops-project", lessons: 3 },
    ],
  },
];

function readJSON(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function getAssessment() {
  const current = readJSON("learnbridgeSkillAssessment");

  if (current && current.completed) {
    return current;
  }

  const old = readJSON("learnbridge_assessment");

  if (!old) {
    return null;
  }

  if (old.completed) {
    return old;
  }

  if (old.result && old.result.completed) {
    return {
      ...old.result,
      completed: true,
    };
  }

  return null;
}

function getQuizResults() {
  const results = [];

  try {
    const keys = Object.keys(window.localStorage);

    keys.forEach((key) => {
      if (!key.startsWith("learnbridge_quiz_")) {
        return;
      }

      const parts = key.split("_");

      if (parts.length < 4) {
        return;
      }

      const pathId = parts[2];
      const moduleId = parts.slice(3).join("_");

      const result = readJSON(key);

      if (!result || !result.completed) {
        return;
      }

      results.push({
        ...result,
        pathId: result.pathId || pathId,
        moduleId: result.moduleId || moduleId,
      });
    });
  } catch {
    return [];
  }

  return results;
}

function getCompletedLessons() {
  let completed = 0;

  learningPaths.forEach((path) => {
    path.modules.forEach((module) => {
      const lessons = readJSON(
        `learnbridge_lessons_${path.id}_${module.id}`,
        []
      );

      if (Array.isArray(lessons)) {
        completed += lessons.length;
      }
    });
  });

  return completed;
}

function getTotalLessons() {
  let total = 0;

  learningPaths.forEach((path) => {
    path.modules.forEach((module) => {
      total += Number(module.lessons) || 0;
    });
  });

  return total;
}

function Achievements() {
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const refresh = () => {
      setRefreshKey((previous) => previous + 1);
    };

    const events = [
      "learnbridge-progress",
      "learnbridge-quiz-updated",
      "learnbridge-assessment-updated",
      "learnbridge-profile-updated",
      "storage",
    ];

    events.forEach((event) => {
      window.addEventListener(event, refresh);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, refresh);
      });
    };
  }, []);

  const assessment = useMemo(() => {
    return getAssessment();
  }, [refreshKey]);

  const quizResults = useMemo(() => {
    return getQuizResults();
  }, [refreshKey]);

  const completedLessons = useMemo(() => {
    return getCompletedLessons();
  }, [refreshKey]);

  const totalLessons = useMemo(() => {
    return getTotalLessons();
  }, []);

  const passedQuizzes = useMemo(() => {
    return quizResults.filter((quiz) => quiz && quiz.passed).length;
  }, [quizResults]);

  const assessmentScore = Number(
    assessment?.percentage ??
      assessment?.score ??
      0
  );

  const learningProgress =
    totalLessons > 0
      ? Math.min(
          100,
          Math.round(
            (completedLessons / totalLessons) * 100
          )
        )
      : 0;

  const achievements = useMemo(() => {
    return [
      {
        id: "first-step",
        title: "First Step",
        description:
          "Complete your first module assessment.",
        category: "Learning",
        icon: BookOpen,
        requirement:
          "Complete 1 module assessment",
        unlocked: quizResults.length >= 1,
      },

      {
        id: "quiz-master",
        title: "Quiz Master",
        description:
          "Pass your first module assessment.",
        category: "Performance",
        icon: Trophy,
        requirement:
          "Pass 1 module assessment",
        unlocked: passedQuizzes >= 1,
      },

      {
        id: "skill-explorer",
        title: "Skill Explorer",
        description:
          "Complete your LearnBridge skill assessment.",
        category: "Skills",
        icon: Target,
        requirement:
          "Complete skill assessment",
        unlocked: Boolean(assessment?.completed),
      },

      {
        id: "skill-master",
        title: "Skill Master",
        description:
          "Achieve 80% or higher in your skill assessment.",
        category: "Skills",
        icon: Award,
        requirement:
          "Score 80%+ in skill assessment",
        unlocked: assessmentScore >= 80,
      },

      {
        id: "goal-getter",
        title: "Goal Getter",
        description:
          "Set a career goal through your skill assessment.",
        category: "Skills",
        icon: Target,
        requirement:
          "Complete assessment with career goal",
        unlocked: Boolean(
          assessment?.completed &&
            assessment?.goal
        ),
      },

      {
        id: "knowledge-builder",
        title: "Knowledge Builder",
        description:
          "Complete at least 25% of the available lessons.",
        category: "Learning",
        icon: BookOpen,
        requirement:
          "Complete 25% of all lessons",
        unlocked: learningProgress >= 25,
      },

      {
        id: "dedicated-learner",
        title: "Dedicated Learner",
        description:
          "Complete at least half of the available lessons.",
        category: "Consistency",
        icon: Flame,
        requirement:
          "Complete 50% of all lessons",
        unlocked: learningProgress >= 50,
      },

      {
        id: "learning-champion",
        title: "Learning Champion",
        description:
          "Complete 75% of all available lessons.",
        category: "Learning",
        icon: Medal,
        requirement:
          "Complete 75% of all lessons",
        unlocked: learningProgress >= 75,
      },

      {
        id: "course-finisher",
        title: "Course Finisher",
        description:
          "Complete every lesson across the available learning paths.",
        category: "Learning",
        icon: CheckCircle2,
        requirement:
          "Complete 100% of lessons",
        unlocked: learningProgress >= 100,
      },

      {
        id: "assessment-champion",
        title: "Assessment Champion",
        description:
          "Pass at least three module assessments.",
        category: "Performance",
        icon: Zap,
        requirement:
          "Pass 3 module assessments",
        unlocked: passedQuizzes >= 3,
      },

      {
        id: "module-master",
        title: "Module Master",
        description:
          "Pass five or more module assessments.",
        category: "Performance",
        icon: Trophy,
        requirement:
          "Pass 5 module assessments",
        unlocked: passedQuizzes >= 5,
      },

      {
        id: "path-master",
        title: "Path Master",
        description:
          "Complete all module assessments in a learning path.",
        category: "Performance",
        icon: Award,
        requirement:
          "Pass every module assessment in one path",
        unlocked: learningPaths.some((path) => {
          const pathQuizzes = quizResults.filter(
            (quiz) => quiz.pathId === path.id
          );

          return (
            pathQuizzes.length ===
              path.modules.length &&
            pathQuizzes.every(
              (quiz) => quiz.passed
            )
          );
        }),
      },
    ];
  }, [
    assessment,
    assessmentScore,
    learningProgress,
    passedQuizzes,
    quizResults,
  ]);

  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked
  ).length;

  const totalAchievements = achievements.length;

  const achievementProgress =
    totalAchievements > 0
      ? Math.round(
          (unlockedCount / totalAchievements) * 100
        )
      : 0;

  const filteredAchievements =
    achievements.filter((achievement) => {
      if (filter === "All") {
        return true;
      }

      return achievement.category === filter;
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2">
            <Trophy
              size={20}
              className="text-amber-500"
            />
            <span className="font-bold">
              Achievements
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

              <p className="text-sm font-semibold text-blue-100">
                YOUR MILESTONES
              </p>

              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Keep earning your achievements.
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Every lesson, assessment and
                learning milestone moves you
                closer to your career goals.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100">
                  Achievements
                </span>

                <span className="text-3xl font-bold">
                  {unlockedCount}/{totalAchievements}
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{
                    width: `${achievementProgress}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-blue-100">
                {achievementProgress}% unlocked
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <Trophy
                size={21}
                className="text-amber-500"
              />

              <span className="text-xs font-semibold text-slate-400">
                UNLOCKED
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold">
              {unlockedCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              achievements earned
            </p>
          </div>

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
              {learningProgress}% completed
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <CheckCircle2
                size={21}
                className="text-emerald-600"
              />

              <span className="text-xs font-semibold text-slate-400">
                PASSED
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold">
              {passedQuizzes}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              module assessments
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <Award
                size={21}
                className="text-purple-600"
              />

              <span className="text-xs font-semibold text-slate-400">
                SKILL SCORE
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold">
              {assessment?.completed
                ? `${assessmentScore}%`
                : "--"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {assessment?.completed
                ? assessment.level || "Assessed"
                : "Assessment pending"}
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="mt-8">
          <div className="flex flex-wrap gap-3">
            {[
              "All",
              "Learning",
              "Skills",
              "Consistency",
              "Performance",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map(
              (achievement) => {
                const Icon = achievement.icon;

                return (
                  <div
                    key={achievement.id}
                    className={`relative overflow-hidden rounded-3xl border p-6 shadow-sm transition ${
                      achievement.unlocked
                        ? "border-amber-200 bg-white hover:-translate-y-1 hover:shadow-md"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        achievement.unlocked
                          ? "bg-amber-50"
                          : "bg-slate-200"
                      }`}
                    >
                      {achievement.unlocked ? (
                        <Icon
                          size={27}
                          className="text-amber-500"
                        />
                      ) : (
                        <Lock
                          size={24}
                          className="text-slate-400"
                        />
                      )}
                    </div>

                    <div className="absolute right-5 top-5">
                      {achievement.unlocked ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold text-slate-500">
                          LOCKED
                        </span>
                      )}
                    </div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-wide text-blue-600">
                      {achievement.category}
                    </p>

                    <h3
                      className={`mt-2 text-xl font-bold ${
                        achievement.unlocked
                          ? "text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      {achievement.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {achievement.description}
                    </p>

                    <div className="mt-5 rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Requirement
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-600">
                        {achievement.requirement}
                      </p>
                    </div>

                    {achievement.unlocked && (
                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={15} />
                        Achievement unlocked
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <Trophy
                size={40}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-lg font-bold">
                No achievements found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try selecting another category.
              </p>
            </div>
          )}
        </section>

        {/* MOTIVATION */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white">
                <Zap
                  size={23}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Keep going
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  {unlockedCount === 0
                    ? "Complete your first lesson or assessment to unlock your first achievement."
                    : unlockedCount <
                      totalAchievements
                    ? "You are making progress. Keep learning to unlock more achievements."
                    : "Amazing work! You have unlocked every available achievement."}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/learning-paths")
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Continue Learning
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Achievements;