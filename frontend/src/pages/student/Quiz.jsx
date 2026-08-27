import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const quizData = {
  "java-full-stack": {
    course: "Java Full Stack Development",
    module: "JDBC & Databases",
    passingScore: 70,
    questions: [
      {
        question: "What does JDBC stand for?",
        options: [
          "Java Database Connectivity",
          "Java Data Communication",
          "Java Database Controller",
          "Java Data Connection",
        ],
        answer: 0,
      },
      {
        question: "Which interface is commonly used to execute SQL queries in JDBC?",
        options: [
          "Connection",
          "Statement",
          "ResultSet",
          "Driver",
        ],
        answer: 1,
      },
      {
        question: "Which method is used to establish a JDBC connection?",
        options: [
          "DriverManager.getConnection()",
          "Connection.create()",
          "JDBC.connect()",
          "Driver.connectDatabase()",
        ],
        answer: 0,
      },
      {
        question: "What does ResultSet represent?",
        options: [
          "A database connection",
          "A SQL statement",
          "The result of a database query",
          "A database driver",
        ],
        answer: 2,
      },
      {
        question: "Which object is used to close a JDBC connection?",
        options: [
          "connection.close()",
          "connection.stop()",
          "connection.disconnect()",
          "connection.end()",
        ],
        answer: 0,
      },
    ],
  },

  "data-structures": {
    course: "Data Structures & Algorithms",
    module: "Hashing",
    passingScore: 70,
    questions: [
      {
        question: "What is the average time complexity of HashMap lookup?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
      },
      {
        question: "Which data structure stores key-value pairs?",
        options: [
          "Array",
          "HashMap",
          "Stack",
          "Queue",
        ],
        answer: 1,
      },
      {
        question: "Which collection stores only unique elements?",
        options: [
          "ArrayList",
          "HashMap",
          "HashSet",
          "LinkedList",
        ],
        answer: 2,
      },
      {
        question: "What is a hash function used for?",
        options: [
          "Sorting data",
          "Mapping keys to positions",
          "Deleting data",
          "Creating arrays",
        ],
        answer: 1,
      },
      {
        question: "What happens when two keys produce the same hash position?",
        options: [
          "The program always crashes",
          "Collision occurs",
          "The key is deleted",
          "The table is cleared",
        ],
        answer: 1,
      },
    ],
  },

  "cloud-devops": {
    course: "Cloud & DevOps Fundamentals",
    module: "Git & GitHub",
    passingScore: 70,
    questions: [
      {
        question: "What is Git?",
        options: [
          "A programming language",
          "A version control system",
          "A database",
          "A cloud provider",
        ],
        answer: 1,
      },
      {
        question: "Which command creates a new Git repository?",
        options: [
          "git start",
          "git create",
          "git init",
          "git new",
        ],
        answer: 2,
      },
      {
        question: "Which command sends local commits to a remote repository?",
        options: [
          "git send",
          "git push",
          "git upload",
          "git commit",
        ],
        answer: 1,
      },
      {
        question: "Which command downloads changes from a remote repository?",
        options: [
          "git pull",
          "git download",
          "git receive",
          "git sync",
        ],
        answer: 0,
      },
      {
        question: "What is GitHub primarily used for?",
        options: [
          "Hosting and collaborating on Git repositories",
          "Running Java programs",
          "Creating databases",
          "Designing websites",
        ],
        answer: 0,
      },
    ],
  },
};

function Quiz() {
  const navigate = useNavigate();
  const { pathId } = useParams();

  const quiz = quizData[pathId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Assessment not found
          </h1>

          <button
            onClick={() => navigate("/learning-paths")}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Learning Paths
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  const handleSelect = (answerIndex) => {
    if (submitted) return;

    setSelectedAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;

    quiz.questions.forEach((item, index) => {
      if (selectedAnswers[index] === item.answer) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    );

    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore >= quiz.passingScore) {
      localStorage.setItem(
        `learnbridge_quiz_${pathId}`,
        JSON.stringify({
          completed: true,
          score: calculatedScore,
          passed: true,
        })
      );
    } else {
      localStorage.setItem(
        `learnbridge_quiz_${pathId}`,
        JSON.stringify({
          completed: true,
          score: calculatedScore,
          passed: false,
        })
      );
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (submitted) {
    const passed = score >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-8">
            <button
              onClick={() =>
                navigate(`/learning-paths/${pathId}`)
              }
              className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={18} />
              Back to Learning Path
            </button>
          </div>
        </header>

        <main className="mx-auto flex max-w-3xl items-center justify-center px-5 py-16 sm:px-8">
          <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            {passed ? (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                  <Trophy
                    size={38}
                    className="text-emerald-600"
                  />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Milestone Achieved
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                  Excellent work!
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-slate-500">
                  You passed the {quiz.module} assessment and
                  unlocked the next stage of your learning path.
                </p>

                <div className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">
                      {score}%
                    </p>
                    <p className="text-xs text-slate-500">
                      Score
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-left">
                  <div className="flex gap-3">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="font-semibold text-emerald-900">
                        Next module unlocked
                      </p>

                      <p className="mt-1 text-sm text-emerald-700">
                        Continue your learning journey and keep
                        building your skills.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/learning-paths/${pathId}`)
                  }
                  className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue Learning
                </button>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
                  <RotateCcw
                    size={36}
                    className="text-amber-600"
                  />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Keep Practicing
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                  Almost there!
                </h1>

                <p className="mt-3 text-slate-500">
                  You need at least {quiz.passingScore}% to pass
                  this assessment.
                </p>

                <div className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">
                      {score}%
                    </p>
                    <p className="text-xs text-slate-500">
                      Score
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRetry}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <RotateCcw size={17} />
                  Retake Assessment
                </button>

                <button
                  onClick={() =>
                    navigate(`/learning-paths/${pathId}`)
                  }
                  className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to Course
                </button>
              </>
            )}
          </section>
        </main>
      </div>
    );
  }

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
            Back to Course
          </button>

          <span className="text-sm font-medium text-slate-500">
            {quiz.module} Assessment
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        {/* Header */}
        <section className="rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-7 text-white shadow-sm sm:p-9">
          <p className="text-sm font-medium text-blue-100">
            Module Assessment
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {quiz.module}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
            Test your understanding before moving to the next
            stage of your learning path.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
              {quiz.questions.length} Questions
            </span>

            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
              Passing Score: {quiz.passingScore}%
            </span>
          </div>
        </section>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Question {currentQuestion + 1} of{" "}
              {quiz.questions.length}
            </span>

            <span className="text-slate-500">
              {Math.round(
                ((currentQuestion + 1) /
                  quiz.questions.length) *
                  100
              )}
              %
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    quiz.questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
              {currentQuestion + 1}
            </div>

            <h2 className="text-xl font-bold leading-8">
              {question.question}
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {question.options.map((option, index) => {
              const isSelected =
                selectedAnswer === index;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(index)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                      isSelected
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>

                  <span className="text-sm font-medium">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestion ===
            quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === undefined}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={selectedAnswer === undefined}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next Question
              </button>
            )}
          </div>
        </section>

        {/* Tip */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          <Lock size={17} className="shrink-0 text-slate-400" />
          Pass this assessment with {quiz.passingScore}% or more
          to unlock the next learning stage.
        </div>
      </main>
    </div>
  );
}

export default Quiz;