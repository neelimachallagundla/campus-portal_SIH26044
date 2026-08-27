import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const lessonData = {
  "java-full-stack": {
    "java-fundamentals": {
      title: "Java Fundamentals",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Java",
        "Variables & Data Types",
        "Control Statements",
        "Methods & Functions",
        "Practice: Java Fundamentals",
      ],
    },

    oops: {
      title: "Object-Oriented Programming",
      duration: "30 min",
      minimumTime: 35,
      lessons: [
        "Introduction to OOP",
        "Classes & Objects",
        "Inheritance & Polymorphism",
        "Encapsulation & Abstraction",
      ],
    },

    collections: {
      title: "Collections Framework",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Collections",
        "ArrayList & LinkedList",
        "HashMap & HashSet",
        "Collections Practice",
      ],
    },

    jdbc: {
      title: "JDBC & Databases",
      duration: "20 min",
      minimumTime: 25,
      lessons: [
        "Introduction to JDBC",
        "Connecting Java to MySQL",
        "Executing SQL Queries",
      ],
    },

    "spring-boot": {
      title: "Spring Boot",
      duration: "30 min",
      minimumTime: 40,
      lessons: [
        "Introduction to Spring Boot",
        "Spring Boot Project Structure",
        "Dependency Injection",
        "Building REST Services",
      ],
    },

    "rest-apis": {
      title: "REST APIs",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to REST APIs",
        "HTTP Methods",
        "Building REST Endpoints",
      ],
    },

    react: {
      title: "React Integration",
      duration: "25 min",
      minimumTime: 25,
      lessons: [
        "Introduction to React Integration",
        "Connecting React with Spring Boot",
      ],
    },

    "full-stack-project": {
      title: "Full Stack Project",
      duration: "60 min",
      minimumTime: 60,
      lessons: ["Project Planning"],
    },
  },

  "data-structures": {
    arrays: {
      title: "Arrays & Strings",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Arrays",
        "Array Operations",
        "Strings",
        "Array Practice",
      ],
    },

    "linked-lists": {
      title: "Linked Lists",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Linked Lists",
        "Singly Linked List",
        "Doubly Linked List",
        "Linked List Problems",
      ],
    },

    "stacks-queues": {
      title: "Stacks & Queues",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Stacks",
        "Stack Operations",
        "Queues",
      ],
    },

    hashing: {
      title: "Hashing",
      duration: "25 min",
      minimumTime: 25,
      lessons: [
        "Introduction to Hashing",
        "HashMap & HashSet",
        "Hashing Problems",
      ],
    },

    trees: {
      title: "Trees",
      duration: "30 min",
      minimumTime: 35,
      lessons: [
        "Introduction to Trees",
        "Binary Trees",
        "Binary Search Trees",
        "Tree Problems",
      ],
    },

    graphs: {
      title: "Graphs",
      duration: "30 min",
      minimumTime: 35,
      lessons: [
        "Introduction to Graphs",
        "Graph Representation",
        "BFS & DFS",
        "Graph Problems",
      ],
    },

    "dynamic-programming": {
      title: "Dynamic Programming",
      duration: "30 min",
      minimumTime: 40,
      lessons: [
        "Introduction to Dynamic Programming",
        "Memoization",
        "Tabulation",
        "Dynamic Programming Problems",
      ],
    },
  },

  "cloud-devops": {
    "cloud-intro": {
      title: "Introduction to Cloud",
      duration: "20 min",
      minimumTime: 25,
      lessons: [
        "What is Cloud Computing?",
        "Cloud Service Models",
        "Cloud Deployment Models",
        "Cloud Architecture",
      ],
    },

    linux: {
      title: "Linux Fundamentals",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Linux",
        "Linux Commands",
        "File Permissions",
        "Linux Practice",
      ],
    },

    git: {
      title: "Git & GitHub",
      duration: "20 min",
      minimumTime: 25,
      lessons: [
        "Introduction to Git",
        "GitHub & Remote Repositories",
        "Branches & Pull Requests",
      ],
    },

    aws: {
      title: "AWS Fundamentals",
      duration: "30 min",
      minimumTime: 35,
      lessons: [
        "Introduction to AWS",
        "EC2",
        "S3",
        "IAM",
        "AWS Practice",
      ],
    },

    docker: {
      title: "Docker",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to Docker",
        "Docker Images & Containers",
        "Docker Compose",
      ],
    },

    cicd: {
      title: "CI/CD",
      duration: "25 min",
      minimumTime: 30,
      lessons: [
        "Introduction to CI/CD",
        "GitHub Actions",
        "Building a CI/CD Pipeline",
      ],
    },

    "devops-project": {
      title: "DevOps Project",
      duration: "45 min",
      minimumTime: 45,
      lessons: [
        "Project Planning",
        "Deployment",
        "Final Project Setup",
      ],
    },
  },
};

const defaultModules = {
  "java-full-stack": "jdbc",
  "data-structures": "hashing",
  "cloud-devops": "git",
};

function getLessonStorageKey(pathId, moduleId) {
  return `learnbridge_lessons_${pathId}_${moduleId}`;
}

function getTimeStorageKey(pathId, moduleId) {
  return `learnbridge_time_${pathId}_${moduleId}`;
}

function getCompletedLessons(pathId, moduleId) {
  try {
    const saved = localStorage.getItem(
      getLessonStorageKey(pathId, moduleId)
    );

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function getLearningTime(pathId, moduleId) {
  try {
    const saved = localStorage.getItem(
      getTimeStorageKey(pathId, moduleId)
    );

    return saved ? Number(saved) : 0;
  } catch {
    return 0;
  }
}

function saveCompletedLessons(
  pathId,
  moduleId,
  completedLessons
) {
  localStorage.setItem(
    getLessonStorageKey(pathId, moduleId),
    JSON.stringify(completedLessons)
  );

  window.dispatchEvent(
    new Event("learnbridge-progress")
  );
}

function saveLearningTime(pathId, moduleId, seconds) {
  localStorage.setItem(
    getTimeStorageKey(pathId, moduleId),
    String(seconds)
  );

  window.dispatchEvent(
    new Event("learnbridge-progress")
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function Lesson() {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const [searchParams] = useSearchParams();

  const moduleId =
    searchParams.get("module") ||
    defaultModules[pathId];

  const lessonIndex = Math.max(
    0,
    Number(searchParams.get("lesson") || 0)
  );

  const moduleData =
    lessonData[pathId]?.[moduleId];

  const [completedLessons, setCompletedLessons] =
    useState(() =>
      moduleData
        ? getCompletedLessons(pathId, moduleId)
        : []
    );

  const [learningSeconds, setLearningSeconds] =
    useState(() =>
      moduleData
        ? getLearningTime(pathId, moduleId)
        : 0
    );

  const [isActive, setIsActive] = useState(
    !document.hidden
  );

  useEffect(() => {
    if (!moduleData) return;

    setCompletedLessons(
      getCompletedLessons(pathId, moduleId)
    );

    setLearningSeconds(
      getLearningTime(pathId, moduleId)
    );
  }, [pathId, moduleId, moduleData]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  useEffect(() => {
    if (!moduleData || !isActive) return;

    const timer = setInterval(() => {
      setLearningSeconds((previous) => {
        const updated = previous + 1;

        saveLearningTime(
          pathId,
          moduleId,
          updated
        );

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pathId, moduleId, moduleData, isActive]);

  if (!moduleData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Lesson not found
          </h1>

          <button
            onClick={() =>
              navigate(`/learning-paths/${pathId}`)
            }
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Learning Path
          </button>
        </div>
      </div>
    );
  }

  const currentLesson =
    moduleData.lessons[lessonIndex];

  const isCompleted =
    completedLessons.includes(lessonIndex);

  const isLocked =
    lessonIndex > 0 &&
    !completedLessons.includes(lessonIndex - 1);

  const allLessonsCompleted =
    completedLessons.length ===
    moduleData.lessons.length;

  const requiredSeconds =
    moduleData.minimumTime * 60;

  const minimumTimeCompleted =
    learningSeconds >= requiredSeconds;

  const assessmentUnlocked =
    allLessonsCompleted &&
    minimumTimeCompleted;

  const timeProgress = Math.min(
    100,
    Math.round(
      (learningSeconds / requiredSeconds) * 100
    )
  );

  const moduleProgress = Math.round(
    (completedLessons.length /
      moduleData.lessons.length) *
      100
  );

  const remainingSeconds = Math.max(
    0,
    requiredSeconds - learningSeconds
  );

  const handleComplete = () => {
    if (isLocked) return;

    if (!completedLessons.includes(lessonIndex)) {
      const updated = [
        ...completedLessons,
        lessonIndex,
      ].sort((a, b) => a - b);

      setCompletedLessons(updated);

      saveCompletedLessons(
        pathId,
        moduleId,
        updated
      );
    }
  };

  const handleNextLesson = () => {
    const nextLesson = lessonIndex + 1;

    if (
      nextLesson <
      moduleData.lessons.length
    ) {
      navigate(
        `/learning-paths/${pathId}/lessons?module=${moduleId}&lesson=${nextLesson}`
      );

      return;
    }

    if (assessmentUnlocked) {
      navigate(
        `/learning-paths/${pathId}/quiz?module=${moduleId}`
      );
    }
  };

  const handleAssessment = () => {
    if (!assessmentUnlocked) return;

    navigate(
      `/learning-paths/${pathId}/quiz?module=${moduleId}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() =>
              navigate(`/learning-paths/${pathId}`)
            }
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Learning Path
          </button>

          <div className="flex items-center gap-4">
            <div
              className={`hidden items-center gap-2 text-sm font-medium sm:flex ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-400"
              }`}
            >
              <Clock3 size={16} />

              {formatTime(learningSeconds)}
            </div>

            <div className="text-sm font-medium text-slate-500">
              Lesson {lessonIndex + 1} of{" "}
              {moduleData.lessons.length}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_300px]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {moduleData.title}
              </span>

              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock3 size={14} />
                {moduleData.duration}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {currentLesson}
            </h1>

            <p className="mt-3 text-slate-500">
              Learn the fundamentals and understand how
              this concept is used in real-world software
              development.
            </p>
          </div>

          <div className="mb-8 flex aspect-video items-center justify-center rounded-2xl bg-slate-900">
            <div className="text-center text-white">
              <PlayCircle
                size={54}
                strokeWidth={1.5}
                className="mx-auto mb-3 text-blue-400"
              />

              <p className="font-semibold">
                Lesson Video
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Video content can be added here
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>
              What is {currentLesson}?
            </h2>

            <p>
              {currentLesson} is an important concept
              that every developer should understand.
              It helps build a strong foundation and
              prepares you for practical software
              development.
            </p>

            <h2>Why is it important?</h2>

            <p>
              Understanding this concept allows
              developers to write cleaner, more efficient
              and maintainable applications. It is
              commonly used in real-world software
              projects.
            </p>

            <div className="my-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <Lightbulb
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="font-semibold text-blue-900">
                    Key takeaway
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Focus on understanding the concept
                    first. Once you understand the
                    fundamentals, practice applying them
                    through small coding problems.
                  </p>
                </div>
              </div>
            </div>

            <h2>Example</h2>

            <pre className="overflow-x-auto rounded-2xl bg-slate-900 p-5 text-sm text-slate-200">
{`public class Example {
    public static void main(String[] args) {
        System.out.println("Keep learning!");
    }
}`}
            </pre>

            <h2>What you should remember</h2>

            <ul>
              <li>
                Understand the core concept.
              </li>
              <li>
                Practice with small examples.
              </li>
              <li>
                Apply the concept to real problems.
              </li>
              <li>
                Review your mistakes and improve.
              </li>
            </ul>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">
            {isLocked ? (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <div className="flex items-center gap-3">
                  <Lock
                    size={23}
                    className="text-amber-600"
                  />

                  <div>
                    <p className="font-semibold text-amber-900">
                      Lesson locked
                    </p>

                    <p className="mt-1 text-sm text-amber-700">
                      Complete the previous lesson to
                      unlock this lesson.
                    </p>
                  </div>
                </div>
              </div>
            ) : isCompleted ? (
              <div className="rounded-2xl bg-emerald-50 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={24}
                    className="text-emerald-600"
                  />

                  <div>
                    <p className="font-semibold text-emerald-900">
                      Lesson completed!
                    </p>

                    <p className="mt-1 text-sm text-emerald-700">
                      Your progress has been saved.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextLesson}
                  disabled={
                    lessonIndex + 1 ===
                      moduleData.lessons.length &&
                    !assessmentUnlocked
                  }
                  className={`mt-4 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                    lessonIndex + 1 ===
                      moduleData.lessons.length &&
                    !assessmentUnlocked
                      ? "cursor-not-allowed bg-slate-400"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {lessonIndex + 1 <
                  moduleData.lessons.length
                    ? "Continue to Next Lesson"
                    : assessmentUnlocked
                      ? "Take Module Assessment"
                      : "Complete Learning Time"}

                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <CheckCircle2 size={18} />
                Mark Lesson as Complete
              </button>
            )}
          </div>
        </article>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28">
          <h2 className="font-bold">
            Module Progress
          </h2>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${moduleProgress}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completedLessons.length} of{" "}
            {moduleData.lessons.length} lessons completed
          </p>

          <div className="mt-6 space-y-2">
            {moduleData.lessons.map(
              (lessonTitle, index) => {
                const completed =
                  completedLessons.includes(index);

                const current =
                  index === lessonIndex;

                const locked =
                  index > 0 &&
                  !completedLessons.includes(
                    index - 1
                  );

                return (
                  <button
                    key={lessonTitle}
                    disabled={locked}
                    onClick={() => {
                      if (!locked) {
                        navigate(
                          `/learning-paths/${pathId}/lessons?module=${moduleId}&lesson=${index}`
                        );
                      }
                    }}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                      current
                        ? "bg-blue-50 text-blue-700"
                        : locked
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completed ? (
                        <CheckCircle2
                          size={18}
                          className="text-emerald-500"
                        />
                      ) : locked ? (
                        <Lock
                          size={17}
                          className="text-slate-400"
                        />
                      ) : (
                        <div
                          className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border text-[10px] font-bold ${
                            current
                              ? "border-blue-500 text-blue-600"
                              : "border-slate-300 text-slate-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <span className="text-sm font-medium">
                      {lessonTitle}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                Learning Time
              </p>

              <Clock3
                size={16}
                className="text-blue-600"
              />
            </div>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-xl font-bold text-blue-950">
                {formatTime(learningSeconds)}
              </p>

              <p className="text-xs text-blue-600">
                {moduleData.minimumTime} min required
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${timeProgress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-blue-700">
              {minimumTimeCompleted
                ? "Minimum learning time completed."
                : `${Math.ceil(
                    remainingSeconds / 60
                  )} min remaining`}
            </p>

            {!isActive && (
              <p className="mt-2 text-xs font-medium text-amber-600">
                Learning timer paused
              </p>
            )}
          </div>

          {allLessonsCompleted && (
            <div
              className={`mt-6 rounded-xl border p-4 ${
                assessmentUnlocked
                  ? "border-purple-100 bg-purple-50"
                  : "border-amber-100 bg-amber-50"
              }`}
            >
              {assessmentUnlocked ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-wide text-purple-600">
                    Assessment Unlocked
                  </p>

                  <p className="mt-1 text-sm text-purple-800">
                    You completed all lessons and the
                    required learning time.
                  </p>

                  <button
                    onClick={handleAssessment}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-700"
                  >
                    Take Assessment
                    <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
                    Assessment Locked
                  </p>

                  <p className="mt-1 text-sm text-amber-800">
                    Complete the minimum learning time
                    before taking the assessment.
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-amber-100">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-500"
                      style={{
                        width: `${timeProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-amber-700">
                    {Math.ceil(
                      remainingSeconds / 60
                    )}{" "}
                    min remaining
                  </p>

                  <button
                    disabled
                    className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-300 px-3 py-2 text-xs font-semibold text-slate-500"
                  >
                    <Lock size={14} />
                    Assessment Locked
                  </button>
                </>
              )}
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default Lesson;