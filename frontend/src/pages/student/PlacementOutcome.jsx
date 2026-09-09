import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Target,
  Trophy,
  UserRound,
  XCircle,
  Sparkles,
  Brain,
  TrendingUp,
  Clock3,
  FileText,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    id: "java-fullstack",
    pathId: "java-full-stack",
    title: "Java Full Stack Development",
    modules: [
      "java-fundamentals",
      "oops",
      "collections",
      "jdbc",
      "spring-boot",
      "rest-apis",
      "react",
      "full-stack-project",
    ],
    lessonsPerModule: 3,
  },
  {
    id: "dsa",
    pathId: "data-structures",
    title: "Data Structures & Algorithms",
    modules: [
      "arrays",
      "linked-lists",
      "stacks-queues",
      "hashing",
      "trees",
      "graphs",
      "dynamic-programming",
    ],
    lessonsPerModule: 4,
  },
  {
    id: "cloud",
    pathId: "cloud-devops",
    title: "Cloud & DevOps Fundamentals",
    modules: [
      "cloud-intro",
      "linux",
      "git",
      "aws",
      "docker",
      "cicd",
      "devops-project",
    ],
    lessonsPerModule: 4,
  },
];

function readJSON(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getAssessment() {
  const current = readJSON("learnbridgeSkillAssessment", null);

  if (current) {
    return current.result || current;
  }

  const old = readJSON("learnbridge_assessment", null);

  if (old) {
    return old.result || old;
  }

  return null;
}

function getCompletedLessons(pathId, moduleId) {
  const data = readJSON(
    `learnbridge_lessons_${pathId}_${moduleId}`,
    []
  );

  return Array.isArray(data) ? data : [];
}

function getQuizResults() {
  const results = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key || !key.startsWith("learnbridge_quiz_")) {
      continue;
    }

    const match = key.match(
      /^learnbridge_quiz_([^_]+)_(.+)$/
    );

    if (!match) {
      continue;
    }

    const pathId = match[1];
    const moduleId = match[2];

    // Ignore old path-level compatibility keys.
    if (!moduleId || moduleId === pathId) {
      continue;
    }

    const result = readJSON(key, null);

    if (!result || typeof result !== "object") {
      continue;
    }

    results.push({
      ...result,
      pathId: result.pathId || pathId,
      moduleId: result.moduleId || moduleId,
    });
  }

  const unique = new Map();

  results.forEach((result) => {
    unique.set(
      `${result.pathId}_${result.moduleId}`,
      result
    );
  });

  return Array.from(unique.values());
}

function getApplications() {
  const applications = readJSON("learnbridgeApplications", []);

  return Array.isArray(applications) ? applications : [];
}

function formatDate(date) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toLowerCase();
}

function getApplicationStatusCounts(applications) {
  return {
    total: applications.length,

    applied: applications.filter(
      (item) => normalizeStatus(item.status) === "applied"
    ).length,

    underReview: applications.filter(
      (item) => normalizeStatus(item.status) === "under review"
    ).length,

    shortlisted: applications.filter(
      (item) => normalizeStatus(item.status) === "shortlisted"
    ).length,

    interview: applications.filter((item) => {
      const status = normalizeStatus(item.status);

      return (
        status === "interview" ||
        status === "interview scheduled" ||
        status === "interviewing"
      );
    }).length,

    selected: applications.filter((item) => {
      const status = normalizeStatus(item.status);

      return (
        status === "selected" ||
        status === "placed" ||
        status === "offer received"
      );
    }).length,

    rejected: applications.filter(
      (item) => normalizeStatus(item.status) === "rejected"
    ).length,
  };
}

function getLearningMetrics() {
  let totalLessons = 0;
  let completedLessons = 0;
  let totalModules = 0;

  learningPaths.forEach((path) => {
    totalModules += path.modules.length;

    path.modules.forEach((moduleId) => {
      totalLessons += path.lessonsPerModule;

      const completed = getCompletedLessons(
        path.pathId,
        moduleId
      );

      completedLessons += Math.min(
        completed.length,
        path.lessonsPerModule
      );
    });
  });

  const lessonPercentage =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return {
    totalLessons,
    completedLessons,
    totalModules,
    lessonPercentage,
  };
}

function getStageClass(status) {
  if (status === "completed") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (status === "current") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }

  return "bg-slate-100 text-slate-500 border-slate-200";
}

function PlacementOutcome() {
  const navigate = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setRefreshKey((value) => value + 1);
    };

    window.addEventListener(
      "learnbridge-progress",
      refresh
    );

    window.addEventListener(
      "learnbridge-quiz-updated",
      refresh
    );

    window.addEventListener(
      "learnbridge-assessment-updated",
      refresh
    );

    window.addEventListener(
      "learnbridge-applications-updated",
      refresh
    );

    window.addEventListener(
      "learnbridge-profile-updated",
      refresh
    );

    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(
        "learnbridge-progress",
        refresh
      );

      window.removeEventListener(
        "learnbridge-quiz-updated",
        refresh
      );

      window.removeEventListener(
        "learnbridge-assessment-updated",
        refresh
      );

      window.removeEventListener(
        "learnbridge-applications-updated",
        refresh
      );

      window.removeEventListener(
        "learnbridge-profile-updated",
        refresh
      );

      window.removeEventListener("storage", refresh);
    };
  }, []);

  const assessment = useMemo(
    () => getAssessment(),
    [refreshKey]
  );

  const quizResults = useMemo(
    () => getQuizResults(),
    [refreshKey]
  );

  const applications = useMemo(
    () => getApplications(),
    [refreshKey]
  );

  const learning = useMemo(
    () => getLearningMetrics(),
    [refreshKey]
  );

  const applicationStats = useMemo(
    () => getApplicationStatusCounts(applications),
    [applications]
  );

  const assessmentPercentage = Number(
    assessment?.percentage ??
      (assessment?.totalQuestions
        ? (Number(assessment?.score || 0) /
            Number(assessment.totalQuestions)) *
          100
        : 0)
  );

  const passedQuizzes = quizResults.filter(
    (quiz) => quiz.passed
  ).length;

  const totalQuizAttempts = quizResults.length;

  const quizPassPercentage =
    totalQuizAttempts > 0
      ? Math.round(
          (passedQuizzes / totalQuizAttempts) * 100
        )
      : 0;

  const readinessScore = useMemo(() => {
    const score =
      assessmentPercentage * 0.4 +
      learning.lessonPercentage * 0.3 +
      quizPassPercentage * 0.3;

    return Math.round(Math.min(100, Math.max(0, score)));
  }, [
    assessmentPercentage,
    learning.lessonPercentage,
    quizPassPercentage,
  ]);

  const readinessInfo = useMemo(() => {
    if (readinessScore >= 80) {
      return {
        label: "Placement Ready",
        description:
          "Your preparation is strong. Focus on applications, interviews, and company-specific preparation.",
        icon: Trophy,
      };
    }

    if (readinessScore >= 60) {
      return {
        label: "Almost Ready",
        description:
          "You are close to placement readiness. Strengthen your weaker areas and start applying consistently.",
        icon: TrendingUp,
      };
    }

    if (readinessScore >= 40) {
      return {
        label: "Building Skills",
        description:
          "You have made progress. Continue your learning path and complete more module assessments.",
        icon: BookOpen,
      };
    }

    return {
      label: "Getting Started",
      description:
        "Complete your skill assessment and begin your recommended learning path to start your placement journey.",
      icon: Target,
    };
  }, [readinessScore]);

  const targetCareer =
    assessment?.goalTitle ||
    assessment?.goal ||
    "Software Engineer";

  const selectedPath =
    learningPaths.find(
      (path) =>
        path.pathId ===
        assessment?.recommendedPath?.pathId
    ) || null;

  const nextStep = useMemo(() => {
    if (!assessment?.completed) {
      return {
        title: "Complete your Skill Assessment",
        description:
          "Find your current skill level and get a personalized career learning path.",
        button: "Take Skill Assessment",
        action: () => navigate("/skill-assessment"),
        icon: Brain,
      };
    }

    if (learning.lessonPercentage < 50) {
      return {
        title: "Continue your Learning Path",
        description:
          "Build the core technical skills required for your target career.",
        button: "Continue Learning",
        action: () =>
          navigate(
            selectedPath
              ? `/learning-paths/${selectedPath.id}`
              : "/learning-paths"
          ),
        icon: BookOpen,
      };
    }

    if (
      totalQuizAttempts === 0 ||
      quizPassPercentage < 60
    ) {
      return {
        title: "Complete your Module Assessments",
        description:
          "Passing more module assessments will improve your placement readiness.",
        button: "View Learning Paths",
        action: () => navigate("/learning-paths"),
        icon: Award,
      };
    }

    if (applicationStats.total === 0) {
      return {
        title: "Start applying to opportunities",
        description:
          "Your preparation is strong enough to start exploring internships and job opportunities.",
        button: "Explore Opportunities",
        action: () => navigate("/opportunities"),
        icon: BriefcaseBusiness,
      };
    }

    if (
      applicationStats.shortlisted > 0 ||
      applicationStats.interview > 0
    ) {
      return {
        title: "Prepare for your interviews",
        description:
          "You have active placement opportunities. Focus on interview preparation and company research.",
        button: "View Applications",
        action: () => navigate("/applications"),
        icon: UserRound,
      };
    }

    return {
      title: "Keep applying consistently",
      description:
        "Continue applying to relevant opportunities while strengthening your technical profile.",
      button: "View Opportunities",
      action: () => navigate("/opportunities"),
      icon: BriefcaseBusiness,
    };
  }, [
    assessment,
    learning.lessonPercentage,
    totalQuizAttempts,
    quizPassPercentage,
    applicationStats,
    selectedPath,
    navigate,
  ]);

  const journey = useMemo(() => {
    const assessmentDone = Boolean(
      assessment?.completed
    );

    const learningDone =
      learning.lessonPercentage >= 80;

    const assessmentsDone =
      totalQuizAttempts > 0 &&
      quizPassPercentage >= 60;

    const applicationsDone =
      applicationStats.total > 0;

    const interviewDone =
      applicationStats.interview > 0 ||
      applicationStats.shortlisted > 0;

    const placementDone =
      applicationStats.selected > 0;

    let currentStage = 0;

    if (assessmentDone) currentStage = 1;
    if (learningDone) currentStage = 2;
    if (assessmentsDone) currentStage = 3;
    if (applicationsDone) currentStage = 4;
    if (interviewDone) currentStage = 5;
    if (placementDone) currentStage = 6;

    return [
      {
        title: "Skill Assessment",
        description: assessmentDone
          ? `${Math.round(assessmentPercentage)}% assessment score`
          : "Not completed",
        done: assessmentDone,
      },
      {
        title: "Learning",
        description: `${learning.lessonPercentage}% lessons completed`,
        done: learningDone,
      },
      {
        title: "Module Assessments",
        description:
          totalQuizAttempts > 0
            ? `${passedQuizzes}/${totalQuizAttempts} passed`
            : "No assessments completed",
        done: assessmentsDone,
      },
      {
        title: "Applications",
        description:
          applicationsDone
            ? `${applicationStats.total} application${
                applicationStats.total !== 1
                  ? "s"
                  : ""
              }`
            : "No applications yet",
        done: applicationsDone,
      },
      {
        title: "Interview",
        description:
          interviewDone
            ? "Shortlisted / interview stage"
            : "Not reached yet",
        done: interviewDone,
      },
      {
        title: "Placement",
        description:
          placementDone
            ? "Selected / placed"
            : "Outcome pending",
        done: placementDone,
      },
    ].map((stage, index) => ({
      ...stage,
      status:
        stage.done
          ? "completed"
          : index === currentStage
          ? "current"
          : "upcoming",
    }));
  }, [
    assessment,
    assessmentPercentage,
    learning.lessonPercentage,
    totalQuizAttempts,
    passedQuizzes,
    quizPassPercentage,
    applicationStats,
  ]);

  const readinessItems = [
    {
      title: "Skill Assessment",
      value: Math.round(assessmentPercentage),
      description: assessment?.completed
        ? `${assessment?.level || "Assessed"} level`
        : "Complete assessment",
      icon: Brain,
    },
    {
      title: "Learning Progress",
      value: learning.lessonPercentage,
      description: `${learning.completedLessons}/${learning.totalLessons} lessons`,
      icon: BookOpen,
    },
    {
      title: "Module Assessments",
      value: quizPassPercentage,
      description:
        totalQuizAttempts > 0
          ? `${passedQuizzes}/${totalQuizAttempts} passed`
          : "No quizzes completed",
      icon: Award,
    },
    {
      title: "Career Applications",
      value:
        applicationStats.total > 0
          ? Math.min(
              100,
              applicationStats.total * 20
            )
          : 0,
      description:
        applicationStats.total > 0
          ? `${applicationStats.total} application${
              applicationStats.total !== 1
                ? "s"
                : ""
            }`
          : "Start applying",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <UserRound size={17} />
              Profile
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 p-6 text-white shadow-xl sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur">
                <Sparkles size={15} />
                Career Outcome
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your Placement Journey
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Track your career readiness, learning progress,
                assessments, and placement applications from one
                place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xs text-blue-200">
                    Target Career
                  </p>
                  <p className="mt-1 font-semibold">
                    {targetCareer}
                  </p>
                </div>

                {selectedPath && (
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-xs text-blue-200">
                      Recommended Path
                    </p>
                    <p className="mt-1 font-semibold">
                      {selectedPath.title}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-10 border-white/20 bg-white/10 shadow-2xl">
                <div className="text-center">
                  <p className="text-5xl font-bold">
                    {readinessScore}
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    / 100
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="font-bold">
                  {readinessInfo.label}
                </p>
                <p className="mt-1 max-w-xs text-xs text-blue-200">
                  {readinessInfo.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Readiness cards */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Readiness Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your placement readiness is calculated from your
              assessment, learning, and module performance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {readinessItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Icon size={20} />
                    </div>

                    <span className="text-2xl font-bold text-slate-900">
                      {item.value}%
                    </span>
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Placement Journey */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              Placement Journey
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Follow your progress from assessment to placement.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {journey.map((stage, index) => (
              <div key={stage.title} className="relative">
                <div
                  className={`rounded-2xl border p-4 ${getStageClass(
                    stage.status
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
                      {stage.done ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        index + 1
                      )}
                    </span>

                    {index < journey.length - 1 && (
                      <ChevronRight
                        size={16}
                        className="hidden lg:block"
                      />
                    )}
                  </div>

                  <h3 className="mt-4 text-sm font-bold">
                    {stage.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 opacity-80">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application summary */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <BriefcaseBusiness size={21} />
              </div>

              <div>
                <h2 className="font-bold">
                  Placement Applications
                </h2>
                <p className="text-xs text-slate-500">
                  Current application activity
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {applicationStats.total}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs text-blue-600">
                  Under Review
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {applicationStats.underReview}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-600">
                  Shortlisted
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {applicationStats.shortlisted}
                </p>
              </div>

              <div className="rounded-xl bg-violet-50 p-4">
                <p className="text-xs text-violet-600">
                  Selected
                </p>
                <p className="mt-1 text-2xl font-bold text-violet-700">
                  {applicationStats.selected}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/applications")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View My Applications
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Recent Applications
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your latest placement activity
                </p>
              </div>

              <FileText
                size={21}
                className="text-slate-400"
              />
            </div>

            {applications.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                <BriefcaseBusiness
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-semibold text-slate-700">
                  No applications yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Explore opportunities and start your placement
                  journey.
                </p>

                <button
                  onClick={() =>
                    navigate("/opportunities")
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Explore Opportunities
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {applications
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(
                        b.appliedAt ||
                          b.createdAt ||
                          0
                      ) -
                      new Date(
                        a.appliedAt ||
                          a.createdAt ||
                          0
                      )
                  )
                  .slice(0, 4)
                  .map((application, index) => {
                    const status = normalizeStatus(
                      application.status
                    );

                    const statusClass =
                      status === "shortlisted"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : status === "under review"
                        ? "bg-blue-100 text-blue-700"
                        : status === "selected" ||
                          status === "placed"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-slate-100 text-slate-700";

                    return (
                      <div
                        key={
                          application.id ||
                          `${application.company}-${index}`
                        }
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {application.title ||
                              application.role ||
                              application.position ||
                              "Opportunity"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {application.company ||
                              "Company"}
                          </p>

                          <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock3 size={12} />
                            {formatDate(
                              application.appliedAt ||
                                application.createdAt
                            )}
                          </div>
                        </div>

                        <span
                          className={`ml-3 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${statusClass}`}
                        >
                          {application.status ||
                            "Applied"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>

        {/* Next step */}
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <nextStep.icon size={23} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Recommended Next Step
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {nextStep.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  {nextStep.description}
                </p>
              </div>
            </div>

            <button
              onClick={nextStep.action}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              {nextStep.button}
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* Empty assessment warning */}
        {!assessment?.completed && (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <Target className="mt-0.5 shrink-0 text-amber-600" size={20} />

              <div>
                <h3 className="font-bold text-amber-900">
                  Your readiness score is waiting for your
                  assessment
                </h3>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Complete the Skill Assessment to identify your
                  strengths, skill gaps, career goal, and recommended
                  learning path.
                </p>

                <button
                  onClick={() =>
                    navigate("/skill-assessment")
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900"
                >
                  Take Skill Assessment
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PlacementOutcome;