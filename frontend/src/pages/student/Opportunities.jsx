import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  GraduationCap,
  MapPin,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

/* ============================================================
   OPPORTUNITIES
============================================================ */

const opportunities = [
  {
    id: "intern-java-001",
    type: "Internship",
    title: "Java Backend Development Intern",
    company: "TechNova Solutions",
    location: "Hyderabad, India",
    mode: "Hybrid",
    duration: "3 Months",
    skills: ["Java", "Spring Boot", "SQL", "REST APIs"],
    description:
      "Work on backend services and REST APIs while gaining experience with Java and Spring Boot.",
    eligibility: "Students with Java fundamentals",
    matchGoals: ["java-fullstack", "backend"],
  },

  {
    id: "intern-frontend-001",
    type: "Internship",
    title: "Frontend Developer Intern",
    company: "WebCraft Technologies",
    location: "Remote",
    mode: "Remote",
    duration: "3 Months",
    skills: ["JavaScript", "React", "HTML & CSS", "Git & GitHub"],
    description:
      "Build responsive interfaces and reusable React components for production applications.",
    eligibility:
      "Students with basic JavaScript and React knowledge",
    matchGoals: ["frontend", "java-fullstack"],
  },

  {
    id: "intern-cloud-001",
    type: "Internship",
    title: "Cloud & DevOps Intern",
    company: "CloudSphere",
    location: "Bengaluru, India",
    mode: "Hybrid",
    duration: "6 Months",
    skills: ["AWS", "Docker", "Linux", "CI/CD"],
    description:
      "Learn cloud deployment, containers and CI/CD while working with an engineering team.",
    eligibility:
      "Students interested in cloud technologies",
    matchGoals: ["cloud"],
  },

  {
    id: "training-java-001",
    type: "Training",
    title: "Java Full Stack Career Program",
    company: "LearnBridge Academy",
    location: "Online",
    mode: "Online",
    duration: "12 Weeks",
    skills: [
      "Java",
      "Spring Boot",
      "SQL",
      "React",
      "REST APIs",
    ],
    description:
      "A structured training program covering backend, frontend and full-stack project development.",
    eligibility:
      "Beginner to intermediate students",
    matchGoals: [
      "java-fullstack",
      "backend",
      "frontend",
    ],
  },

  {
    id: "training-dsa-001",
    type: "Training",
    title: "DSA & Software Engineering Program",
    company: "CodeForge",
    location: "Online",
    mode: "Online",
    duration: "10 Weeks",
    skills: [
      "Data Structures",
      "Algorithms",
      "Java",
      "Problem Solving",
    ],
    description:
      "Build strong algorithmic foundations and prepare for software engineering interviews.",
    eligibility:
      "Students preparing for software roles",
    matchGoals: ["dsa", "data"],
  },

  {
    id: "training-cloud-001",
    type: "Training",
    title: "AWS & DevOps Bootcamp",
    company: "Cloud Academy",
    location: "Online",
    mode: "Online",
    duration: "8 Weeks",
    skills: [
      "AWS",
      "Linux",
      "Docker",
      "Git & GitHub",
      "CI/CD",
    ],
    description:
      "Hands-on training in AWS, Linux, containers and continuous deployment.",
    eligibility:
      "Students interested in DevOps",
    matchGoals: ["cloud"],
  },

  {
    id: "job-java-001",
    type: "Job",
    title: "Junior Java Developer",
    company: "InnovateLabs",
    location: "Chennai, India",
    mode: "On-site",
    duration: "Full Time",
    skills: [
      "Java",
      "Spring Boot",
      "SQL",
      "REST APIs",
    ],
    description:
      "Entry-level software engineering opportunity focused on Java backend development.",
    eligibility: "0–1 years experience",
    matchGoals: ["java-fullstack", "backend"],
  },

  {
    id: "job-software-001",
    type: "Job",
    title: "Graduate Software Engineer",
    company: "NextGen Systems",
    location: "Pune, India",
    mode: "Hybrid",
    duration: "Full Time",
    skills: [
      "Java",
      "Python",
      "Data Structures",
      "Git & GitHub",
    ],
    description:
      "Graduate software engineering role involving problem solving and application development.",
    eligibility:
      "Fresh graduates and final-year students",
    matchGoals: [
      "dsa",
      "data",
      "java-fullstack",
    ],
  },

  {
    id: "job-cloud-001",
    type: "Job",
    title: "Cloud Support Engineer",
    company: "InfraScale",
    location: "Bengaluru, India",
    mode: "Hybrid",
    duration: "Full Time",
    skills: [
      "AWS",
      "Linux",
      "Docker",
      "Git & GitHub",
    ],
    description:
      "Support cloud infrastructure and deployment workflows in a growing engineering team.",
    eligibility:
      "Entry-level cloud candidates",
    matchGoals: ["cloud"],
  },
];

/* ============================================================
   CAREER READINESS REQUIREMENTS
============================================================ */

const readinessRequirements = {
  "java-fullstack": [
    "Complete Skill Assessment",
    "Build Java fundamentals",
    "Complete OOP and Collections",
    "Learn JDBC & Databases",
    "Learn Spring Boot",
    "Build REST APIs",
    "Complete React fundamentals",
    "Build a full-stack project",
  ],

  frontend: [
    "Complete Skill Assessment",
    "Learn HTML & CSS",
    "Strengthen JavaScript",
    "Learn React",
    "Learn Git & GitHub",
    "Build frontend projects",
  ],

  backend: [
    "Complete Skill Assessment",
    "Strengthen Java",
    "Learn OOP",
    "Learn SQL",
    "Learn Spring Boot",
    "Build REST APIs",
  ],

  data: [
    "Complete Skill Assessment",
    "Strengthen Python",
    "Learn SQL",
    "Strengthen Data Structures",
    "Practice problem solving",
  ],

  cloud: [
    "Complete Skill Assessment",
    "Learn Linux",
    "Learn Git & GitHub",
    "Learn AWS",
    "Learn Docker",
    "Learn CI/CD",
  ],

  dsa: [
    "Complete Skill Assessment",
    "Learn Arrays & Linked Lists",
    "Learn Stacks & Queues",
    "Learn Hashing",
    "Learn Trees & Graphs",
    "Practice Dynamic Programming",
  ],
};

/* ============================================================
   PATH MAPPING
============================================================ */

const goalToPath = {
  "java-fullstack": "java-full-stack",
  frontend: "java-full-stack",
  backend: "java-full-stack",
  data: "data-structures",
  dsa: "data-structures",
  cloud: "cloud-devops",
};

/* ============================================================
   GET ASSESSMENT
============================================================ */

function getAssessment() {
  try {
    const newAssessment = localStorage.getItem(
      "learnbridgeSkillAssessment"
    );

    if (newAssessment) {
      const parsed = JSON.parse(newAssessment);

      if (parsed?.completed) {
        return parsed;
      }
    }

    const oldAssessment = localStorage.getItem(
      "learnbridge_assessment"
    );

    if (!oldAssessment) {
      return null;
    }

    const parsed = JSON.parse(oldAssessment);

    if (parsed?.result) {
      return parsed.result;
    }

    if (parsed?.completed) {
      return parsed;
    }

    return null;
  } catch (error) {
    console.error(
      "Failed to load assessment:",
      error
    );

    return null;
  }
}

/* ============================================================
   GET QUIZ RESULTS
============================================================ */

function getQuizResults() {
  const results = [];
  const seen = new Set();

  Object.keys(localStorage).forEach((key) => {
    /*
      Only use module-level quiz keys.

      Example:
      learnbridge_quiz_java-full-stack_jdbc

      Ignore the old path-level key:
      learnbridge_quiz_java-full-stack
    */

    if (!key.startsWith("learnbridge_quiz_")) {
      return;
    }

    const parts = key
      .replace("learnbridge_quiz_", "")
      .split("_");

    if (parts.length < 2) {
      return;
    }

    try {
      const raw = localStorage.getItem(key);

      if (!raw) {
        return;
      }

      const value = JSON.parse(raw);

      if (!value?.completed) {
        return;
      }

      const uniqueId = `${value.pathId || parts[0]}_${
        value.moduleId || parts.slice(1).join("_")
      }`;

      if (seen.has(uniqueId)) {
        return;
      }

      seen.add(uniqueId);

      results.push(value);
    } catch {
      // Ignore invalid localStorage entries
    }
  });

  return results;
}

/* ============================================================
   GET LEARNING READINESS
============================================================ */

function getLearningReadiness(assessment) {
  if (!assessment?.completed) {
    return {
      percentage: 0,
      label: "Assessment Required",
      assessmentScore: 0,
      quizScore: 0,
      passedQuizzes: 0,
      totalQuizzes: 0,
    };
  }

  const quizzes = getQuizResults();

  const passedQuizzes = quizzes.filter(
    (item) => item.passed
  ).length;

  /*
    Assessment contributes 60%.

    Quiz contribution:
    - Maximum 40%
    - Each passed module contributes 8%
    - Five passed module assessments = full 40%
  */

  const assessmentScore = Math.min(
    100,
    Number(assessment.percentage) || 0
  );

  const quizScore = Math.min(
    40,
    passedQuizzes * 8
  );

  const percentage = Math.round(
    assessmentScore * 0.6 + quizScore
  );

  let label = "Getting Started";

  if (percentage >= 85) {
    label = "Career Ready";
  } else if (percentage >= 70) {
    label = "Almost Ready";
  } else if (percentage >= 40) {
    label = "Developing";
  }

  return {
    percentage,
    label,
    assessmentScore,
    quizScore,
    passedQuizzes,
    totalQuizzes: quizzes.length,
  };
}

/* ============================================================
   NORMALIZE SKILL
============================================================ */

function normalizeSkill(skill) {
  return String(skill || "")
    .trim()
    .toLowerCase();
}

/* ============================================================
   OPPORTUNITIES PAGE
============================================================ */

function Opportunities() {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(
    getAssessment()
  );

  const [quizVersion, setQuizVersion] =
    useState(0);

  const [filter, setFilter] = useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [applied, setApplied] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "learnbridgeApplications"
        ) || "[]"
      );
    } catch {
      return [];
    }
  });

  /* ==========================================================
     REFRESH DATA
  ========================================================== */

  useEffect(() => {
    const refreshData = () => {
      setAssessment(getAssessment());

      setApplied(() => {
        try {
          return JSON.parse(
            localStorage.getItem(
              "learnbridgeApplications"
            ) || "[]"
          );
        } catch {
          return [];
        }
      });

      setQuizVersion((previous) => previous + 1);
    };

    window.addEventListener(
      "learnbridge-assessment-updated",
      refreshData
    );

    window.addEventListener(
      "learnbridge-quiz-updated",
      refreshData
    );

    window.addEventListener(
      "learnbridge-progress",
      refreshData
    );

    window.addEventListener(
      "learnbridge-applications-updated",
      refreshData
    );

    window.addEventListener(
      "storage",
      refreshData
    );

    return () => {
      window.removeEventListener(
        "learnbridge-assessment-updated",
        refreshData
      );

      window.removeEventListener(
        "learnbridge-quiz-updated",
        refreshData
      );

      window.removeEventListener(
        "learnbridge-progress",
        refreshData
      );

      window.removeEventListener(
        "learnbridge-applications-updated",
        refreshData
      );

      window.removeEventListener(
        "storage",
        refreshData
      );
    };
  }, []);

  /* ==========================================================
     CAREER READINESS
  ========================================================== */

  const readiness = useMemo(
    () => getLearningReadiness(assessment),
    [assessment, quizVersion]
  );

  /* ==========================================================
     RECOMMENDED OPPORTUNITIES
  ========================================================== */

  const recommendedOpportunities = useMemo(() => {
    return opportunities
      .map((item) => {
        let match = 0;

        /* -----------------------------------------------
           CAREER GOAL MATCH
        ------------------------------------------------ */

        if (
          assessment?.goal &&
          item.matchGoals.includes(
            assessment.goal
          )
        ) {
          match += 50;
        }

        /* -----------------------------------------------
           SKILL MATCH
        ------------------------------------------------ */

        const studentSkills =
          Array.isArray(assessment?.skills)
            ? assessment.skills.map(normalizeSkill)
            : [];

        item.skills.forEach((skill) => {
          if (
            studentSkills.includes(
              normalizeSkill(skill)
            )
          ) {
            match += 10;
          }
        });

        /* -----------------------------------------------
           READINESS BONUS
        ------------------------------------------------ */

        if (
          assessment?.completed &&
          readiness.percentage >= 70
        ) {
          match += 5;
        }

        return {
          ...item,
          match: Math.min(99, match),
        };
      })
      .sort(
        (a, b) =>
          b.match - a.match
      );
  }, [
    assessment,
    readiness.percentage,
  ]);

  /* ==========================================================
     FILTER OPPORTUNITIES
  ========================================================== */

  const filteredOpportunities = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return recommendedOpportunities.filter(
      (item) => {
        const matchesFilter =
          filter === "All" ||
          item.type === filter;

        const matchesSearch =
          !search ||
          item.title
            .toLowerCase()
            .includes(search) ||
          item.company
            .toLowerCase()
            .includes(search) ||
          item.location
            .toLowerCase()
            .includes(search) ||
          item.skills.some((skill) =>
            skill
              .toLowerCase()
              .includes(search)
          );

        return (
          matchesFilter &&
          matchesSearch
        );
      }
    );
  }, [
    recommendedOpportunities,
    filter,
    searchTerm,
  ]);

  /* ==========================================================
     CHECK APPLICATION
  ========================================================== */

  const isApplied = (opportunityId) => {
    return applied.some(
      (application) =>
        application.opportunityId ===
        opportunityId
    );
  };

  /* ==========================================================
     APPLY
  ========================================================== */

  const handleApply = (opportunity) => {
    if (isApplied(opportunity.id)) {
      navigate("/applications");
      return;
    }

    const application = {
      id: `application-${Date.now()}`,
      opportunityId: opportunity.id,
      opportunityTitle:
        opportunity.title,
      company: opportunity.company,
      type: opportunity.type,
      location: opportunity.location,
      mode: opportunity.mode,
      status: "Applied",
      appliedAt:
        new Date().toISOString(),
    };

    const updated = [
      ...applied,
      application,
    ];

    setApplied(updated);

    localStorage.setItem(
      "learnbridgeApplications",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event(
        "learnbridge-applications-updated"
      )
    );

    navigate("/applications");
  };

  /* ==========================================================
     REQUIREMENTS
  ========================================================== */

  const requirements =
    readinessRequirements[
      assessment?.goal
    ] ||
    readinessRequirements[
      "java-fullstack"
    ];

  const completedRequirements =
    requirements.filter(
      (requirement, index) => {
        if (!assessment?.completed) {
          return false;
        }

        /*
          Assessment is always the first completed
          requirement.
        */

        if (index === 0) {
          return true;
        }

        /*
          Gradually unlock requirements based
          on actual readiness.
        */

        const threshold = Math.min(
          100,
          20 + index * 10
        );

        return (
          readiness.percentage >=
          threshold
        );
      }
    ).length;

  const requirementPercentage =
    Math.round(
      (completedRequirements /
        requirements.length) *
        100
    );

  /* ==========================================================
     RECOMMENDED PATH
  ========================================================== */

  const recommendedPath =
    assessment?.recommendedPath?.pathId ||
    goalToPath[assessment?.goal] ||
    "java-full-stack";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            ← Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/applications")
            }
            className="flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600"
          >
            <BriefcaseBusiness className="h-5 w-5" />

            My Applications

            {applied.length > 0 && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600">
                {applied.length}
              </span>
            )}
          </button>

        </div>

      </header>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="rounded-3xl bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl md:p-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">

                <Sparkles className="h-4 w-4" />

                Personalized Career Opportunities

              </div>

              <h1 className="mt-5 text-3xl font-bold md:text-4xl">
                Build Your Career
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Discover training programs,
                internships and entry-level
                opportunities matched to your
                career goal and current skills.
              </p>

              {assessment?.goalTitle && (
                <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">

                  <Target className="h-5 w-5" />

                  <span>
                    Target:
                    <strong className="ml-1">
                      {assessment.goalTitle}
                    </strong>
                  </span>

                </div>
              )}

            </div>

            {/* Readiness */}

            <div className="min-w-52.5 rounded-3xl bg-white/15 p-6 backdrop-blur">

              <div className="flex items-center gap-3">

                <Award className="h-7 w-7" />

                <div>

                  <p className="text-sm text-blue-100">
                    Career Readiness
                  </p>

                  <p className="text-3xl font-bold">
                    {readiness.percentage}%
                  </p>

                </div>

              </div>

              <p className="mt-3 text-sm text-blue-100">
                {readiness.label}
              </p>

            </div>

          </div>

        </section>

        {/* ====================================================
            READINESS
        ==================================================== */}

        <section className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Readiness Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Career Readiness
                </h2>

                <p className="mt-1 text-slate-500">
                  Keep improving your skills to
                  unlock better opportunities.
                </p>

              </div>

              <GraduationCap className="h-7 w-7 text-blue-600" />

            </div>

            {/* Overall Progress */}

            <div className="mt-6">

              <div className="mb-2 flex justify-between text-sm">

                <span className="font-medium text-slate-700">
                  Overall readiness
                </span>

                <span className="font-semibold text-blue-600">
                  {readiness.percentage}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${readiness.percentage}%`,
                  }}
                />

              </div>

            </div>

            {/* Readiness Breakdown */}

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <div className="rounded-2xl bg-blue-50 p-4">

                <p className="text-xs font-medium text-blue-600">
                  Assessment
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {readiness.assessmentScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-violet-50 p-4">

                <p className="text-xs font-medium text-violet-600">
                  Module Assessments
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {readiness.passedQuizzes}
                </p>

              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">

                <p className="text-xs font-medium text-emerald-600">
                  Requirements
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {requirementPercentage}%
                </p>

              </div>

            </div>

            {/* Requirements */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              {requirements.map(
                (requirement, index) => {
                  const complete =
                    index <
                    completedRequirements;

                  return (
                    <div
                      key={requirement}
                      className={`flex items-center gap-3 rounded-xl p-3 ${
                        complete
                          ? "bg-emerald-50"
                          : "bg-slate-50"
                      }`}
                    >

                      <CheckCircle2
                        className={`h-5 w-5 ${
                          complete
                            ? "text-emerald-600"
                            : "text-slate-300"
                        }`}
                      />

                      <span
                        className={`text-sm font-medium ${
                          complete
                            ? "text-emerald-800"
                            : "text-slate-600"
                        }`}
                      >
                        {requirement}
                      </span>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* Next Step */}

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

              <Target className="h-6 w-6 text-blue-600" />

            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Your Next Step
            </h2>

            {!assessment?.completed ? (
              <>
                <p className="mt-2 text-slate-500">
                  Complete your skill assessment
                  to receive personalized
                  opportunity recommendations.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/skill-assessment"
                    )
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Take Assessment
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            ) : readiness.percentage < 70 ? (
              <>
                <p className="mt-2 text-slate-500">
                  Strengthen your priority
                  skills before applying to
                  competitive opportunities.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/learning-paths/${recommendedPath}`
                    )
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue Learning
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <p className="mt-2 text-slate-500">
                  Your profile is looking strong.
                  Start applying to matching
                  opportunities.
                </p>

                <button
                  onClick={() =>
                    document
                      .getElementById(
                        "opportunities"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Explore Opportunities
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

          </div>

        </section>

        {/* ====================================================
            SEARCH / FILTER
        ==================================================== */}

        <section
          id="opportunities"
          className="mt-10"
        >

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Recommended Opportunities
              </h2>

              <p className="mt-1 text-slate-500">
                Based on your career goal and
                current skill profile.
              </p>

            </div>

            {/* Search */}

            <div className="relative w-full lg:w-80">

              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search opportunities..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Filters */}

          <div className="mt-6 flex flex-wrap gap-3">

            {[
              "All",
              "Training",
              "Internship",
              "Job",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                className={`rounded-xl px-5 py-2.5 font-medium transition ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* ==================================================
              OPPORTUNITY CARDS
          ================================================== */}

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredOpportunities.map(
              (opportunity) => (
                <div
                  key={opportunity.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="p-6">

                    {/* Type + Match */}

                    <div className="flex items-start justify-between gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          opportunity.type ===
                          "Job"
                            ? "bg-emerald-100 text-emerald-700"
                            : opportunity.type ===
                              "Internship"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-violet-100 text-violet-700"
                        }`}
                      >
                        {opportunity.type}
                      </span>

                      {assessment?.completed &&
                        opportunity.match >
                          0 && (
                          <span className="text-sm font-bold text-blue-600">
                            {opportunity.match}%
                            match
                          </span>
                        )}

                    </div>

                    {/* Title */}

                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      {opportunity.title}
                    </h3>

                    {/* Company */}

                    <div className="mt-3 flex items-center gap-2 text-slate-600">

                      <Building2 className="h-4 w-4" />

                      <span>
                        {opportunity.company}
                      </span>

                    </div>

                    {/* Location */}

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                      <MapPin className="h-4 w-4" />

                      <span>
                        {opportunity.location}
                      </span>

                    </div>

                    {/* Duration */}

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                      <Clock3 className="h-4 w-4" />

                      <span>
                        {opportunity.duration}{" "}
                        · {opportunity.mode}
                      </span>

                    </div>

                    {/* Description */}

                    <p className="mt-5 text-sm leading-relaxed text-slate-500">
                      {opportunity.description}
                    </p>

                    {/* Skills */}

                    <div className="mt-5 flex flex-wrap gap-2">

                      {opportunity.skills.map(
                        (skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                    {/* Eligibility */}

                    <div className="mt-6 border-t border-slate-100 pt-5">

                      <p className="text-xs text-slate-400">
                        Eligibility
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {opportunity.eligibility}
                      </p>

                    </div>

                    {/* Apply */}

                    <button
                      onClick={() =>
                        handleApply(
                          opportunity
                        )
                      }
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                        isApplied(
                          opportunity.id
                        )
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >

                      {isApplied(
                        opportunity.id
                      ) ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" />

                          Applied

                          <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Apply Now

                          <ExternalLink className="h-5 w-5" />
                        </>
                      )}

                    </button>

                  </div>

                </div>
              )
            )}

          </div>

          {/* Empty */}

          {filteredOpportunities.length ===
            0 && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center">

              <Search className="mx-auto h-10 w-10 text-slate-300" />

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No opportunities found
              </h3>

              <p className="mt-2 text-slate-500">
                Try another search term or
                category.
              </p>

            </div>
          )}

        </section>

        {/* ====================================================
            BOTTOM CTA
        ==================================================== */}

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">

                <Code2 className="h-6 w-6 text-blue-600" />

              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  Need to improve your skills
                  first?
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Continue your personalized
                  learning journey before
                  applying.
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/learning-paths"
                )
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Explore Learning Paths

              <ArrowRight className="h-5 w-5" />

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Opportunities;