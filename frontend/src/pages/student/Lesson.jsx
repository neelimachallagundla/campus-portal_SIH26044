import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const lessonData = {
  "java-full-stack": {
    "java-fundamentals": {
      title: "Java Fundamentals",
      duration: "25 min",
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
      lessons: [
        "Introduction to JDBC",
        "Connecting Java to MySQL",
        "Executing SQL Queries",
      ],
    },

    "spring-boot": {
      title: "Spring Boot",
      duration: "30 min",
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
      lessons: [
        "Introduction to REST APIs",
        "HTTP Methods",
        "Building REST Endpoints",
      ],
    },

    react: {
      title: "React Integration",
      duration: "25 min",
      lessons: [
        "Introduction to React Integration",
        "Connecting React with Spring Boot",
      ],
    },

    "full-stack-project": {
      title: "Full Stack Project",
      duration: "60 min",
      lessons: ["Project Planning"],
    },
  },

  "data-structures": {
    arrays: {
      title: "Arrays & Strings",
      duration: "25 min",
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
      lessons: [
        "Introduction to Stacks",
        "Stack Operations",
        "Queues",
      ],
    },

    hashing: {
      title: "Hashing",
      duration: "25 min",
      lessons: [
        "Introduction to Hashing",
        "HashMap & HashSet",
        "Hashing Problems",
      ],
    },

    trees: {
      title: "Trees",
      duration: "30 min",
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
      lessons: [
        "Introduction to Git",
        "GitHub & Remote Repositories",
        "Branches & Pull Requests",
      ],
    },

    aws: {
      title: "AWS Fundamentals",
      duration: "30 min",
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
      lessons: [
        "Introduction to Docker",
        "Docker Images & Containers",
        "Docker Compose",
      ],
    },

    cicd: {
      title: "CI/CD",
      duration: "25 min",
      lessons: [
        "Introduction to CI/CD",
        "GitHub Actions",
        "Building a CI/CD Pipeline",
      ],
    },

    "devops-project": {
      title: "DevOps Project",
      duration: "45 min",
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

function getTimerStorageKey(pathId, moduleId) {
  return `learnbridge_timer_${pathId}_${moduleId}`;
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

function saveCompletedLessons(pathId, moduleId, completedLessons) {
  localStorage.setItem(
    getLessonStorageKey(pathId, moduleId),
    JSON.stringify(completedLessons)
  );

  window.dispatchEvent(new Event("learnbridge-progress"));
}

function getSavedTime(pathId, moduleId) {
  try {
    const saved = localStorage.getItem(
      getTimerStorageKey(pathId, moduleId)
    );

    return saved ? Number(saved) : 0;
  } catch {
    return 0;
  }
}

function saveTime(pathId, moduleId, seconds) {
  localStorage.setItem(
    getTimerStorageKey(pathId, moduleId),
    String(seconds)
  );

  window.dispatchEvent(new Event("learnbridge-progress"));
}

function parseMinutes(duration) {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function Lesson() {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const [searchParams] = useSearchParams();

  const moduleId =
    searchParams.get("module") || defaultModules[pathId];

  const lessonIndex = Math.max(
    0,
    Number(searchParams.get("lesson") || 0)
  );

  const moduleData = lessonData[pathId]?.[moduleId];

  const [completedLessons, setCompletedLessons] = useState(() =>
    moduleData ? getCompletedLessons(pathId, moduleId) : []
  );

  const [learningTime, setLearningTime] = useState(() =>
    moduleData ? getSavedTime(pathId, moduleId) : 0
  );

  const sessionStartRef = useRef(null);

  useEffect(() => {
    if (!moduleData) return;

    setCompletedLessons(
      getCompletedLessons(pathId, moduleId)
    );

    setLearningTime(
      getSavedTime(pathId, moduleId)
    );
  }, [pathId, moduleId]);

  /*
   * Module timer
   * ----------------
   * The timer belongs to the entire module, not an individual lesson.
   * Therefore changing lessonIndex does NOT reset the timer.
   */
  useEffect(() => {
    if (!moduleData) return;

    const requiredSeconds =
      parseMinutes(moduleData.duration) * 60;

    sessionStartRef.current = Date.now();

    const interval = setInterval(() => {
      const savedTime =
        getSavedTime(pathId, moduleId);

      const sessionSeconds = Math.floor(
        (Date.now() - sessionStartRef.current) / 1000
      );

      const totalSeconds = Math.min(
        savedTime + sessionSeconds,
        requiredSeconds
      );

      setLearningTime(totalSeconds);

      saveTime(
        pathId,
        moduleId,
        totalSeconds
      );

      if (totalSeconds >= requiredSeconds) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      const savedTime =
        getSavedTime(pathId, moduleId);

      const sessionSeconds = Math.floor(
        (Date.now() - sessionStartRef.current) / 1000
      );

      const totalSeconds = Math.min(
        savedTime + sessionSeconds,
        requiredSeconds
      );

      saveTime(
        pathId,
        moduleId,
        totalSeconds
      );

      clearInterval(interval);
    };
  }, [pathId, moduleId, moduleData]);

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

  const moduleProgress = Math.round(
    (completedLessons.length /
      moduleData.lessons.length) *
      100
  );

  const requiredSeconds =
    parseMinutes(moduleData.duration) * 60;

  const timeRequirementMet =
    learningTime >= requiredSeconds;

  const allLessonsCompleted =
    completedLessons.length ===
    moduleData.lessons.length;

  const assessmentUnlocked =
    allLessonsCompleted &&
    timeRequirementMet;

  const timeProgress = Math.min(
    Math.round(
      (learningTime / requiredSeconds) * 100
    ),
    100
  );

  const remainingSeconds = Math.max(
    requiredSeconds - learningTime,
    0
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

  const handleBack = () => {
    navigate(`/learning-paths/${pathId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Learning Path
          </button>

          <div className="flex items-center gap-5">

            {/* Small timer in header */}
            <div className="hidden items-center gap-2 sm:flex">
              <Clock3
                size={17}
                className={
                  timeRequirementMet
                    ? "text-emerald-500"
                    : "text-blue-600"
                }
              />

              <span className="text-sm font-semibold text-slate-600">
                {formatTime(learningTime)} /{" "}
                {formatTime(requiredSeconds)}
              </span>
            </div>

            <div className="text-sm font-medium text-slate-500">
              Lesson {lessonIndex + 1} of{" "}
              {moduleData.lessons.length}
            </div>

          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_300px]">

        {/* LESSON CONTENT */}
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* LESSON TITLE */}
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

          {/* VIDEO */}
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

          {/* LESSON CONTENT */}
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

            <h2>
              Why is it important?
            </h2>

            <p>
              Understanding this concept allows
              developers to write cleaner, more efficient
              and maintainable applications. It is
              commonly used in real-world software
              projects.
            </p>

            {/* KEY TAKEAWAY */}
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

            <h2>
              Example
            </h2>

            <pre className="overflow-x-auto rounded-2xl bg-slate-900 p-5 text-sm text-slate-200">
{`// Example learning exercise

public class Example {
    public static void main(String[] args) {
        System.out.println("Keep learning!");
    }
}`}
            </pre>

            <h2>
              What you should remember
            </h2>

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

          {/* COMPLETE LESSON */}
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
                      Great work. Your progress has been
                      saved.
                    </p>

                  </div>

                </div>

                <button
                  onClick={handleNextLesson}
                  disabled={
                    lessonIndex + 1 >=
                      moduleData.lessons.length &&
                    !assessmentUnlocked
                  }
                  className={`mt-4 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                    lessonIndex + 1 <
                    moduleData.lessons.length
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : assessmentUnlocked
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "cursor-not-allowed bg-slate-400"
                  }`}
                >

                  {lessonIndex + 1 <
                  moduleData.lessons.length
                    ? "Continue to Next Lesson"
                    : assessmentUnlocked
                      ? "Take Module Assessment"
                      : "Assessment Locked"}

                  {assessmentUnlocked ||
                  lessonIndex + 1 <
                    moduleData.lessons.length ? (
                    <ArrowRight size={16} />
                  ) : (
                    <Lock size={15} />
                  )}

                </button>

                {lessonIndex + 1 >=
                  moduleData.lessons.length &&
                  !assessmentUnlocked && (

                  <p className="mt-3 text-xs text-amber-700">
                    Complete the minimum learning time
                    to unlock the assessment.
                  </p>

                )}

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

        {/* RIGHT SIDEBAR */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28">

          {/* MODULE PROGRESS */}
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

          {/* MODULE TIMER
              This is the ONLY dedicated timer card.
              It stays in the sidebar for every lesson.
          */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Clock3
                  size={16}
                  className={
                    timeRequirementMet
                      ? "text-emerald-500"
                      : "text-blue-600"
                  }
                />

                <span className="text-xs font-semibold text-slate-600">
                  Learning Time
                </span>

              </div>

              <span className="text-xs font-bold text-slate-700">
                {formatTime(learningTime)}
              </span>

            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full transition-all ${
                  timeRequirementMet
                    ? "bg-emerald-500"
                    : "bg-blue-600"
                }`}
                style={{
                  width: `${timeProgress}%`,
                }}
              />

            </div>

            <div className="mt-2 flex items-center justify-between">

              <p className="text-[11px] text-slate-500">
                Required
              </p>

              <p className="text-[11px] font-semibold text-slate-600">
                {formatTime(requiredSeconds)}
              </p>

            </div>

            <p
              className={`mt-2 text-[11px] ${
                timeRequirementMet
                  ? "text-emerald-600"
                  : "text-slate-500"
              }`}
            >
              {timeRequirementMet
                ? "Minimum learning time completed"
                : `${formatTime(
                    remainingSeconds
                  )} remaining`}
            </p>

          </div>

          {/* LESSON LIST */}
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

          {/* ASSESSMENT */}
          <div
            className={`mt-6 rounded-xl border p-4 ${
              assessmentUnlocked
                ? "border-purple-100 bg-purple-50"
                : "border-slate-200 bg-slate-50"
            }`}
          >

            <div className="flex items-center gap-2">

              {assessmentUnlocked ? (

                <CheckCircle2
                  size={18}
                  className="text-purple-600"
                />

              ) : (

                <Lock
                  size={17}
                  className="text-slate-400"
                />

              )}

              <p
                className={`text-xs font-bold uppercase tracking-wide ${
                  assessmentUnlocked
                    ? "text-purple-600"
                    : "text-slate-500"
                }`}
              >
                Module Assessment
              </p>

            </div>

            {assessmentUnlocked ? (

              <>
                <p className="mt-2 text-sm text-purple-800">
                  All lessons are complete and the minimum
                  learning time has been reached.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/learning-paths/${pathId}/quiz?module=${moduleId}`
                    )
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-700"
                >
                  Take Assessment
                  <ArrowRight size={14} />
                </button>
              </>

            ) : (

              <>
                <p className="mt-2 text-sm text-slate-600">
                  Complete all lessons and reach the minimum
                  learning time to unlock the assessment.
                </p>

                <div className="mt-3 space-y-2 text-xs">

                  <div className="flex items-center justify-between">

                    <span>
                      Lessons
                    </span>

                    <span
                      className={
                        allLessonsCompleted
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-slate-500"
                      }
                    >
                      {allLessonsCompleted
                        ? "Completed"
                        : `${completedLessons.length}/${moduleData.lessons.length}`}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span>
                      Learning time
                    </span>

                    <span
                      className={
                        timeRequirementMet
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-slate-500"
                      }
                    >
                      {timeRequirementMet
                        ? "Completed"
                        : `${formatTime(
                            remainingSeconds
                          )} remaining`}
                    </span>

                  </div>

                </div>
              </>

            )}

          </div>

        </aside>

      </main>
    </div>
  );
}

export default Lesson;