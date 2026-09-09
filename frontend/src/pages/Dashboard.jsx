import {
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
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
  User,
  FileText,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ============================================================
   LEARNING PATHS
============================================================ */

const learningPaths = [
  {
    id: "java-fullstack",
    title: "Java Full Stack Development",
    level: "Intermediate",
    icon: "☕",
    pathId: "java-full-stack",
    modules: [
      {
        id: "java-fundamentals",
        lessons: 3,
      },
      {
        id: "oops",
        lessons: 3,
      },
      {
        id: "collections",
        lessons: 3,
      },
      {
        id: "jdbc",
        lessons: 3,
      },
      {
        id: "spring-boot",
        lessons: 3,
      },
      {
        id: "rest-apis",
        lessons: 3,
      },
      {
        id: "react",
        lessons: 3,
      },
      {
        id: "full-stack-project",
        lessons: 3,
      },
    ],
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    icon: "🧠",
    pathId: "data-structures",
    modules: [
      {
        id: "arrays",
        lessons: 4,
      },
      {
        id: "linked-lists",
        lessons: 4,
      },
      {
        id: "stacks-queues",
        lessons: 4,
      },
      {
        id: "hashing",
        lessons: 4,
      },
      {
        id: "trees",
        lessons: 4,
      },
      {
        id: "graphs",
        lessons: 4,
      },
      {
        id: "dynamic-programming",
        lessons: 4,
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Fundamentals",
    level: "Beginner",
    icon: "☁️",
    pathId: "cloud-devops",
    modules: [
      {
        id: "cloud-intro",
        lessons: 4,
      },
      {
        id: "linux",
        lessons: 4,
      },
      {
        id: "git",
        lessons: 4,
      },
      {
        id: "aws",
        lessons: 4,
      },
      {
        id: "docker",
        lessons: 4,
      },
      {
        id: "cicd",
        lessons: 4,
      },
      {
        id: "devops-project",
        lessons: 4,
      },
    ],
  },
];

/* ============================================================
   RECOMMENDATIONS
============================================================ */

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

/* ============================================================
   HELPERS
============================================================ */

function readJSON(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    if (!value) return fallback;

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/* ============================================================
   COMPLETED LESSONS
============================================================ */

function getCompletedLessons(pathId, moduleId) {
  const data = readJSON(
    `learnbridge_lessons_${pathId}_${moduleId}`,
    []
  );

  return Array.isArray(data) ? data : [];
}

/* ============================================================
   LEARNING TIME
============================================================ */

function getModuleTime(pathId, moduleId) {
  try {
    const value = localStorage.getItem(
      `learnbridge_timer_${pathId}_${moduleId}`
    );

    const seconds = Number(value || 0);

    return Number.isFinite(seconds) ? seconds : 0;
  } catch {
    return 0;
  }
}

/* ============================================================
   MODULE QUIZ
============================================================ */

function getModuleQuiz(pathId, moduleId) {
  return readJSON(
    `learnbridge_quiz_${pathId}_${moduleId}`,
    null
  );
}

/* ============================================================
   APPLICATIONS
============================================================ */

function getApplications() {
  const applications = readJSON(
    "learnbridgeApplications",
    []
  );

  return Array.isArray(applications) ? applications : [];
}

/* ============================================================
   QUIZ RESULTS
============================================================ */

function getQuizResults() {
  const results = [];

  learningPaths.forEach((path) => {
    path.modules.forEach((module) => {
      const result = getModuleQuiz(
        path.pathId,
        module.id
      );

      if (result?.completed) {
        results.push(result);
      }
    });
  });

  return results;
}

/* ============================================================
   ACHIEVEMENT COUNT
============================================================ */

function getAchievementsCount() {
  const assessment =
    readJSON("learnbridgeSkillAssessment") ||
    readJSON("learnbridge_assessment");

  const quizResults = getQuizResults();

  const completedQuizCount = quizResults.length;

  const passedQuizCount = quizResults.filter(
    (quiz) => quiz.passed
  ).length;

  let completedLessons = 0;
  let totalLessons = 0;

  learningPaths.forEach((path) => {
    path.modules.forEach((module) => {
      totalLessons += module.lessons;

      completedLessons += getCompletedLessons(
        path.pathId,
        module.id
      ).length;
    });
  });

  let count = 0;

  /* First Step */
  if (completedQuizCount >= 1) count++;

  /* Quiz Master */
  if (passedQuizCount >= 1) count++;

  /* Skill Explorer */
  if (assessment?.completed) count++;

  /* Skill Master */
  if (Number(assessment?.percentage || 0) >= 80) {
    count++;
  }

  /* Goal Getter */
  if (assessment?.completed && assessment?.goal) {
    count++;
  }

  /* Knowledge Builder */
  if (
    totalLessons > 0 &&
    completedLessons / totalLessons >= 0.25
  ) {
    count++;
  }

  /* Dedicated Learner */
  if (
    totalLessons > 0 &&
    completedLessons / totalLessons >= 0.5
  ) {
    count++;
  }

  /* Learning Champion */
  if (
    totalLessons > 0 &&
    completedLessons / totalLessons >= 0.75
  ) {
    count++;
  }

  /* Course Finisher */
  if (
    totalLessons > 0 &&
    completedLessons >= totalLessons
  ) {
    count++;
  }

  /* Assessment Champion */
  if (passedQuizCount >= 3) count++;

  /* Module Master */
  if (passedQuizCount >= 5) count++;

  /* Path Master */
  const pathMaster = learningPaths.some((path) => {
    return (
      path.modules.length > 0 &&
      path.modules.every((module) => {
        const quiz = getModuleQuiz(
          path.pathId,
          module.id
        );

        return quiz?.completed && quiz?.passed;
      })
    );
  });

  if (pathMaster) count++;

  return count;
}

/* ============================================================
   LEARNING TIME FORMAT
============================================================ */

function formatLearningTime(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) {
    return "0 hrs";
  }

  const hours = totalSeconds / 3600;

  if (hours < 1) {
    const minutes = Math.round(totalSeconds / 60);

    return `${minutes} min`;
  }

  return `${hours.toFixed(1)} hrs`;
}

/* ============================================================
   ACTIVITY DATES
============================================================ */

/*
  Lesson completion currently stores only the lesson IDs,
  while quizzes and assessments store completedAt.

  Therefore the streak is calculated from actual dated
  learning activities that currently exist.
*/

function getLearningActivityDates() {
  const dates = [];

  const assessment =
    readJSON("learnbridgeSkillAssessment") ||
    readJSON("learnbridge_assessment");

  if (assessment?.completedAt) {
    dates.push(assessment.completedAt);
  }

  const quizResults = getQuizResults();

  quizResults.forEach((quiz) => {
    if (quiz?.completedAt) {
      dates.push(quiz.completedAt);
    }
  });

  return dates
    .map((date) => new Date(date))
    .filter(
      (date) => !Number.isNaN(date.getTime())
    );
}

/* ============================================================
   CURRENT STREAK
============================================================ */

function getCurrentStreak() {
  const activityDates = getLearningActivityDates();

  if (activityDates.length === 0) {
    return 0;
  }

  const uniqueDays = new Set();

  activityDates.forEach((date) => {
    uniqueDays.add(
      date.toLocaleDateString("en-CA")
    );
  });

  const today = new Date();

  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);

    checkDate.setDate(
      today.getDate() - i
    );

    const dateKey =
      checkDate.toLocaleDateString("en-CA");

    if (uniqueDays.has(dateKey)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/* ============================================================
   DASHBOARD
============================================================ */

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [, forceRefresh] = useState(0);

  const navigate = useNavigate();

  /* ==========================================================
     LOAD PROFILE
  ========================================================== */

  const loadProfile = () => {
    try {
      const savedProfile = localStorage.getItem(
        "learnbridgeProfile"
      );

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
        return;
      }

      const authData = localStorage.getItem(
        "learnbridgeAuth"
      );

      if (authData) {
        const auth = JSON.parse(authData);

        if (auth?.user) {
          setProfile(auth.user);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );
    }
  };

  /* ==========================================================
     LOAD ASSESSMENT
  ========================================================== */

  const loadAssessment = () => {
    try {
      const newAssessment = localStorage.getItem(
        "learnbridgeSkillAssessment"
      );

      if (newAssessment) {
        const parsed = JSON.parse(newAssessment);

        if (parsed?.completed) {
          setAssessment(parsed);
          return;
        }
      }

      const oldAssessment = localStorage.getItem(
        "learnbridge_assessment"
      );

      if (!oldAssessment) {
        setAssessment(null);
        return;
      }

      const parsed = JSON.parse(oldAssessment);

      setAssessment(
        parsed.result || parsed || null
      );
    } catch (error) {
      console.error(
        "Failed to load assessment:",
        error
      );

      setAssessment(null);
    }
  };

  /* ==========================================================
     LOAD APPLICATIONS
  ========================================================== */

  const loadApplications = () => {
    setApplications(getApplications());
  };

  /* ==========================================================
     INITIAL LOAD + LIVE REFRESH
  ========================================================== */

  useEffect(() => {
    loadProfile();
    loadAssessment();
    loadApplications();

    const refreshDashboard = () => {
      loadProfile();
      loadAssessment();
      loadApplications();

      forceRefresh((value) => value + 1);
    };

    window.addEventListener(
      "learnbridge-assessment-updated",
      refreshDashboard
    );

    window.addEventListener(
      "learnbridge-profile-updated",
      refreshDashboard
    );

    window.addEventListener(
      "learnbridge-progress",
      refreshDashboard
    );

    window.addEventListener(
      "learnbridge-quiz-updated",
      refreshDashboard
    );

    window.addEventListener(
      "learnbridge-applications-updated",
      refreshDashboard
    );

    window.addEventListener(
      "storage",
      refreshDashboard
    );

    return () => {
      window.removeEventListener(
        "learnbridge-assessment-updated",
        refreshDashboard
      );

      window.removeEventListener(
        "learnbridge-profile-updated",
        refreshDashboard
      );

      window.removeEventListener(
        "learnbridge-progress",
        refreshDashboard
      );

      window.removeEventListener(
        "learnbridge-quiz-updated",
        refreshDashboard
      );

      window.removeEventListener(
        "learnbridge-applications-updated",
        refreshDashboard
      );

      window.removeEventListener(
        "storage",
        refreshDashboard
      );
    };
  }, []);

  /* ==========================================================
     USER NAME
  ========================================================== */

  const getUserName = () => {
    if (!profile) {
      return "Student";
    }

    return (
      profile.firstName ||
      profile.name ||
      profile.username ||
      "Student"
    );
  };

  /* ==========================================================
     FULL NAME
  ========================================================== */

  const getFullName = () => {
    if (!profile) {
      return "Student";
    }

    if (profile.firstName || profile.lastName) {
      return `${profile.firstName || ""} ${
        profile.lastName || ""
      }`.trim();
    }

    return (
      profile.name ||
      profile.username ||
      "Student"
    );
  };

  /* ==========================================================
     INITIALS
  ========================================================== */

  const getInitials = () => {
    const name = getFullName();

    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const goToDashboard = () => {
    closeSidebar();
    navigate("/dashboard");
  };

  const goToAssessment = () => {
    closeSidebar();
    navigate("/skill-assessment");
  };

  const goToLearningPaths = () => {
    closeSidebar();
    navigate("/learning-paths");
  };

  const goToProgress = () => {
    closeSidebar();
    navigate("/progress");
  };

  const goToAchievements = () => {
    closeSidebar();
    navigate("/achievements");
  };

  const goToProfile = () => {
    closeSidebar();
    navigate("/profile");
  };

  const goToOpportunities = () => {
    closeSidebar();
    navigate("/opportunities");
  };

  const goToApplications = () => {
    closeSidebar();
    navigate("/applications");
  };

  const goToPlacementOutcome = () => {
    closeSidebar();
    navigate("/placement-outcome");
  };

  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/");
  };

  /* ==========================================================
     PERSONALIZED PATH
  ========================================================== */

  const getRecommendedPath = () => {
    if (!assessment?.goal) {
      return learningPaths[0];
    }

    switch (assessment.goal) {
      case "java-fullstack":
      case "backend":
      case "frontend":
        return learningPaths[0];

      case "dsa":
      case "data":
        return learningPaths[1];

      case "cloud":
        return learningPaths[2];

      default:
        return learningPaths[0];
    }
  };

  const recommendedPath =
    getRecommendedPath();

  /* ==========================================================
     DYNAMIC PATH PROGRESS
  ========================================================== */

  const pathProgress = useMemo(() => {
    return learningPaths.map((path) => {
      let totalLessons = 0;
      let completedLessons = 0;
      let learningSeconds = 0;

      path.modules.forEach((module) => {
        totalLessons += module.lessons;

        completedLessons += getCompletedLessons(
          path.pathId,
          module.id
        ).length;

        learningSeconds += getModuleTime(
          path.pathId,
          module.id
        );
      });

      const progress =
        totalLessons > 0
          ? Math.min(
              100,
              Math.round(
                (completedLessons /
                  totalLessons) *
                  100
              )
            )
          : 0;

      return {
        ...path,
        progress,
        completedLessons,
        totalLessons,
        lessons: `${completedLessons} / ${totalLessons} lessons`,
        learningSeconds,
      };
    });
  }, [assessment, forceRefresh]);

  /* ==========================================================
     DASHBOARD STATS
  ========================================================== */

  const dashboardStats = useMemo(() => {
    let completedLessons = 0;
    let totalLessons = 0;
    let learningSeconds = 0;

    learningPaths.forEach((path) => {
      path.modules.forEach((module) => {
        totalLessons += module.lessons;

        completedLessons += getCompletedLessons(
          path.pathId,
          module.id
        ).length;

        learningSeconds += getModuleTime(
          path.pathId,
          module.id
        );
      });
    });

    return {
      completedLessons,
      totalLessons,
      learningSeconds,
      achievements: getAchievementsCount(),
      applications: applications.length,
      streak: getCurrentStreak(),
    };
  }, [applications, assessment, forceRefresh]);

  /* ==========================================================
     SKILL GAP COUNT
  ========================================================== */

  const skillGapCount =
    Array.isArray(assessment?.skillGaps)
      ? assessment.skillGaps.length
      : Array.isArray(assessment?.skillGap)
        ? assessment.skillGap.length
        : 0;

  /* ==========================================================
     APPLICATION SUMMARY
  ========================================================== */

  const activeApplications =
    applications.filter(
      (application) =>
        !["Selected", "Rejected"].includes(
          application.status
        )
    ).length;

  /* ==========================================================
     CURRENT DATE
  ========================================================== */

  const currentDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Sidebar Header */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={21} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Learn
              <span className="text-blue-600">
                Bridge
              </span>
            </span>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 transition hover:bg-slate-100 lg:hidden"
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
            onClick={goToDashboard}
          />

          <SidebarItem
            icon={<BookOpen size={19} />}
            label="My Learning"
            onClick={goToLearningPaths}
          />

          <SidebarItem
            icon={<Target size={19} />}
            label="Learning Paths"
            onClick={goToLearningPaths}
          />

          <SidebarItem
            icon={<Brain size={19} />}
            label="Skill Assessment"
            onClick={goToAssessment}
            highlight
          />

          <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Progress
          </p>

          <SidebarItem
            icon={<TrendingUp size={19} />}
            label="My Progress"
            onClick={goToProgress}
          />

          <SidebarItem
            icon={<Trophy size={19} />}
            label="Achievements"
            onClick={goToAchievements}
          />

          <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Career
          </p>

          <SidebarItem
            icon={
              <BriefcaseBusiness size={19} />
            }
            label="Opportunities"
            onClick={goToOpportunities}
          />

          <SidebarItem
            icon={<FileText size={19} />}
            label="My Applications"
            onClick={goToApplications}
          />

          <SidebarItem
            icon={<Trophy size={19} />}
            label="Career Outcome"
            onClick={goToPlacementOutcome}
          />

          <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <SidebarItem
            icon={<User size={19} />}
            label="Profile"
            onClick={goToProfile}
          />

        </nav>

        {/* ====================================================
            SIDEBAR BOTTOM
        ==================================================== */}

        <div className="shrink-0 border-t border-slate-100 bg-white">

          <div className="px-4 pb-2 pt-3">

            <div className="rounded-2xl bg-blue-50 p-4">

              <div className="mb-2 flex items-center gap-2">

                <Sparkles
                  size={17}
                  className="text-blue-600"
                />

                <span className="text-sm font-semibold text-blue-900">
                  AI Learning
                </span>

              </div>

              <p className="mb-3 text-xs leading-5 text-blue-700">
                {assessment
                  ? "Your personalized learning profile is ready."
                  : "Let LearnBridge create a personalized path for your goals."}
              </p>

              <button
                onClick={goToAssessment}
                className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
              >
                {assessment
                  ? "Retake Assessment →"
                  : "Take Skill Assessment →"}
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

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="lg:ml-64">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md sm:px-8">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="relative ml-auto flex items-center gap-4">

            {/* Search */}

            <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">

              <Search
                size={17}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Search courses..."
                className="ml-2 w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

            </div>

            {/* Profile */}

            <button
              type="button"
              onClick={goToProfile}
              title="Open Profile"
              aria-label="Open Profile"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:ring-4 hover:ring-blue-100"
            >
              {getInitials()}
            </button>

          </div>

        </header>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

          {/* ==================================================
              WELCOME
          ================================================== */}

          <section className="mb-8">

            <p className="mb-1 text-sm font-medium text-blue-600">
              {currentDate}
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {getUserName()}! 👋
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Keep learning, keep growing. Here's what
              your learning journey looks like today.
            </p>

          </section>

          {/* ==================================================
              STATS
          ================================================== */}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              icon={<Flame size={20} />}
              title="Current Streak"
              value={`${dashboardStats.streak} ${
                dashboardStats.streak === 1
                  ? "day"
                  : "days"
              }`}
              description={
                dashboardStats.streak > 0
                  ? "Keep it going!"
                  : "Start learning today!"
              }
            />

            <StatCard
              icon={<BookOpen size={20} />}
              title="Lessons Completed"
              value={
                dashboardStats.completedLessons
              }
              description={`${dashboardStats.totalLessons} total lessons available`}
            />

            <StatCard
              icon={<Clock3 size={20} />}
              title="Learning Time"
              value={formatLearningTime(
                dashboardStats.learningSeconds
              )}
              description="Tracked learning time"
            />

            <StatCard
              icon={<Trophy size={20} />}
              title="Achievements"
              value={dashboardStats.achievements}
              description="Unlocked achievements"
            />

          </section>

          {/* ==================================================
              PERSONALIZED ASSESSMENT
          ================================================== */}

          <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-[#08111f] via-[#172554] to-[#6d28d9] p-6 text-white shadow-xl shadow-purple-100 sm:p-8">

            {assessment ? (

              <div>

                <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

                  <div className="max-w-2xl">

                    <div className="mb-3 flex items-center gap-2">

                      <div className="rounded-lg bg-white/10 p-2 ring-1 ring-white/10">
                        <CheckCircle2 size={18} />
                      </div>

                      <span className="text-sm font-semibold text-cyan-200">
                        Assessment Completed
                      </span>

                    </div>

                    <h2 className="text-2xl font-bold sm:text-3xl">
                      Your personalized path is ready
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-200 sm:text-base">
                      Based on your assessment, you're
                      currently at{" "}
                      <span className="font-semibold text-white">
                        {assessment.level ||
                          "Beginner"}
                      </span>{" "}
                      level for your goal of{" "}
                      <span className="font-semibold text-white">
                        {assessment.goalTitle ||
                          "Software Engineer"}
                      </span>
                      .
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">

                      {assessment.percentage !==
                        undefined && (
                        <span className="rounded-full bg-white/10 px-3 py-1.5">
                          Score:{" "}
                          {assessment.percentage}%
                        </span>
                      )}

                      <span className="rounded-full bg-white/10 px-3 py-1.5">
                        {assessment.level ||
                          "Beginner"}
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1.5">
                        {skillGapCount > 0
                          ? `${skillGapCount} skill gaps`
                          : "Strong overall"}
                      </span>

                    </div>

                  </div>

                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">

                    <button
                      onClick={goToLearningPaths}
                      className="group flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#6d28d9] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      Continue Learning

                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </button>

                    <button
                      onClick={goToAssessment}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                      Retake Assessment
                    </button>

                  </div>

                </div>

                {/* Skill Summary */}

                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  <AssessmentMiniCard
                    label="Career Goal"
                    value={
                      assessment.goalTitle ||
                      "Software Engineer"
                    }
                  />

                  <AssessmentMiniCard
                    label="Current Level"
                    value={
                      assessment.level ||
                      "Beginner"
                    }
                  />

                  <AssessmentMiniCard
                    label="Areas to Strengthen"
                    value={
                      skillGapCount > 0
                        ? `${skillGapCount} areas`
                        : "Strong overall"
                    }
                  />

                </div>

              </div>

            ) : (

              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

                <div className="max-w-2xl">

                  <div className="mb-3 flex items-center gap-2">

                    <div className="rounded-lg bg-white/10 p-2 ring-1 ring-white/10">
                      <Sparkles size={18} />
                    </div>

                    <span className="text-sm font-semibold text-cyan-200">
                      AI-Powered Skill Assessment
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Find your right learning path
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-200 sm:text-base">
                    Tell LearnBridge about your career
                    goal and current skills. We'll assess
                    your level and recommend a personalized
                    learning path built around your goals.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">

                    <span className="rounded-full bg-white/10 px-3 py-1.5">
                      5–10 min
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1.5">
                      Adaptive
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1.5">
                      Personalized
                    </span>

                  </div>

                </div>

                <button
                  onClick={goToAssessment}
                  className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#6d28d9] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Take Skill Assessment

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

              </div>

            )}

          </section>

          {/* ==================================================
              RECOMMENDED PATH
          ================================================== */}

          {assessment && (
            <section className="mb-8">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Recommended For You
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Based on your skill assessment.
                  </p>

                </div>

                <button
                  onClick={goToLearningPaths}
                  className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  View all
                  <ChevronRight size={16} />
                </button>

              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                      {recommendedPath.icon}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                          Recommended
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                          {assessment.level ||
                            recommendedPath.level}
                        </span>

                      </div>

                      <h3 className="mt-2 text-lg font-bold">
                        {recommendedPath.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        A structured path aligned with
                        your career goal and current
                        skill level.
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={goToLearningPaths}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Start Learning
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>

            </section>
          )}

          {/* ==================================================
              CONTINUE LEARNING
          ================================================== */}

          <section className="mb-10">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Continue Learning
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pick up where you left off.
                </p>

              </div>

              <button
                onClick={goToLearningPaths}
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
              >
                View all
                <ChevronRight size={16} />
              </button>

            </div>

            <div className="grid gap-5 lg:grid-cols-3">

              {pathProgress.map((path) => (
                <LearningPathCard
                  key={path.id}
                  {...path}
                  onContinue={() =>
                    navigate(
                      `/learning-paths/${path.id}`
                    )
                  }
                />
              ))}

            </div>

          </section>

          {/* ==================================================
              BOTTOM SECTION
          ================================================== */}

          <section className="grid gap-8 xl:grid-cols-3">

            {/* ==================================================
                RECOMMENDATIONS
            ================================================== */}

            <div className="xl:col-span-2">

              <div className="mb-5">

                <h2 className="text-xl font-bold">
                  Recommended Lessons
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Continue building the skills you need.
                </p>

              </div>

              <div className="space-y-3">

                {recommendations.map((item) => (
                  <RecommendationCard
                    key={item.title}
                    {...item}
                    onClick={goToLearningPaths}
                  />
                ))}

              </div>

            </div>

            {/* ==================================================
                CAREER
            ================================================== */}

            <div>

              <div className="mb-5">

                <h2 className="text-xl font-bold">
                  Career
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your career journey.
                </p>

              </div>

              <div className="space-y-3">

                {/* Opportunities */}

                <CareerCard
                  icon={
                    <BriefcaseBusiness
                      size={21}
                    />
                  }
                  title="Explore Opportunities"
                  description="Find internships, training and jobs."
                  onClick={goToOpportunities}
                  badge={
                    applications.length === 0
                      ? "Explore"
                      : `${activeApplications} active`
                  }
                />

                {/* Applications */}

                <CareerCard
                  icon={<FileText size={21} />}
                  title="My Applications"
                  description="Track your submitted applications."
                  onClick={goToApplications}
                  badge={`${applications.length}`}
                />

                {/* Outcome */}

                <CareerCard
                  icon={<Trophy size={21} />}
                  title="Career Outcome"
                  description="Track interviews and placement progress."
                  onClick={goToPlacementOutcome}
                />

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

/* ============================================================
   SIDEBAR ITEM
============================================================ */

function SidebarItem({
  icon,
  label,
  active = false,
  highlight = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-blue-50 text-blue-600"
          : highlight
            ? "text-purple-600 hover:bg-purple-50"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}

      {label}

      {highlight && (
        <span className="ml-auto rounded-full bg-purple-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-purple-600">
          AI
        </span>
      )}
    </button>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

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

/* ============================================================
   ASSESSMENT MINI CARD
============================================================ */

function AssessmentMiniCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

      <p className="text-xs text-slate-300">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   LEARNING PATH CARD
============================================================ */

function LearningPathCard({
  title,
  level,
  progress,
  lessons,
  icon,
  onContinue,
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
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <button
        onClick={onContinue}
        className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600"
      >
        {progress > 0
          ? "Continue"
          : "Start Learning"}

        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />

      </button>

    </div>
  );
}

/* ============================================================
   RECOMMENDATION CARD
============================================================ */

function RecommendationCard({
  title,
  category,
  duration,
  icon,
  onClick,
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

      <button
        onClick={onClick}
        className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-600"
      >
        <ArrowRight size={17} />
      </button>

    </div>
  );
}

/* ============================================================
   CAREER CARD
============================================================ */

function CareerCard({
  icon,
  title,
  description,
  badge,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-2">

          <h3 className="truncate font-semibold text-slate-900">
            {title}
          </h3>

          {badge && (
            <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
              {badge}
            </span>
          )}

        </div>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
      />

    </button>
  );
}

export default Dashboard;