import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cloud,
  Database,
  Layers,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

const careerGoals = [
  {
    id: "java-fullstack",
    title: "Java Full Stack Developer",
    description:
      "Build scalable backend systems and modern web applications.",
    icon: Code2,
    pathId: "java-full-stack",
    requiredSkills: [
      "Java",
      "OOP",
      "SQL",
      "Data Structures",
      "Spring Boot",
      "REST APIs",
      "React",
      "Git & GitHub",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description:
      "Create modern, responsive and interactive web applications.",
    icon: Layers,
    pathId: "java-full-stack",
    requiredSkills: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Git & GitHub",
      "REST APIs",
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    description:
      "Design APIs, databases and scalable backend applications.",
    icon: Database,
    pathId: "java-full-stack",
    requiredSkills: [
      "Java",
      "OOP",
      "SQL",
      "Spring Boot",
      "REST APIs",
      "Data Structures",
      "Git & GitHub",
    ],
  },
  {
    id: "data",
    title: "Data & AI",
    description:
      "Work with data analysis, machine learning and intelligent systems.",
    icon: Brain,
    pathId: "data-structures",
    requiredSkills: [
      "Python",
      "SQL",
      "Data Structures",
      "Git & GitHub",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Build, deploy and operate reliable cloud-native applications.",
    icon: Cloud,
    pathId: "cloud-devops",
    requiredSkills: [
      "Linux",
      "Git & GitHub",
      "AWS",
      "Docker",
      "CI/CD",
      "REST APIs",
    ],
  },
  {
    id: "dsa",
    title: "Software Engineer",
    description:
      "Strengthen problem solving and algorithmic thinking for software roles.",
    icon: Code2,
    pathId: "data-structures",
    requiredSkills: [
      "Data Structures",
      "Algorithms",
      "Java",
      "Python",
      "Git & GitHub",
    ],
  },
];

const skillOptions = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "SQL",
  "Data Structures",
  "Algorithms",
  "HTML & CSS",
  "Git & GitHub",
  "REST APIs",
  "Spring Boot",
  "AWS",
  "Docker",
  "Linux",
  "CI/CD",
  "OOP",
];

const questions = [
  {
    question: "Which JavaScript method creates a new array from existing elements?",
    options: ["map()", "push()", "pop()", "shift()"],
    answer: "map()",
    skill: "JavaScript",
  },
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Graph"],
    answer: "Stack",
    skill: "Data Structures",
  },
  {
    question: "Which SQL clause is used to filter rows?",
    options: ["ORDER BY", "GROUP BY", "WHERE", "JOIN"],
    answer: "WHERE",
    skill: "SQL",
  },
  {
    question: "What is the main purpose of a REST API?",
    options: [
      "Design UI screens",
      "Enable communication between applications",
      "Store images",
      "Compile Java programs",
    ],
    answer: "Enable communication between applications",
    skill: "REST APIs",
  },
  {
    question: "Which OOP concept allows the same method to behave differently?",
    options: [
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction",
    ],
    answer: "Polymorphism",
    skill: "OOP",
  },
  {
    question: "Which AWS service provides virtual servers?",
    options: ["S3", "EC2", "RDS", "Lambda"],
    answer: "EC2",
    skill: "AWS",
  },
  {
    question: "Which React hook is commonly used to manage component state?",
    options: ["useState", "useRoute", "usePage", "useServer"],
    answer: "useState",
    skill: "React",
  },
  {
    question: "Which Git command downloads a repository for the first time?",
    options: ["git push", "git commit", "git clone", "git merge"],
    answer: "git clone",
    skill: "Git & GitHub",
  },
];

const experienceLevels = [
  {
    id: "beginner",
    title: "Beginner",
    description: "I am starting my journey.",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "I know the fundamentals.",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "I can build projects independently.",
  },
];

function getSkillLevel(score) {
  if (score >= 75) return "Advanced";
  if (score >= 50) return "Intermediate";
  return "Beginner";
}

function getSkillScore(skill, percentage) {
  const relatedQuestions = questions.filter(
    (question) => question.skill === skill
  );

  if (relatedQuestions.length > 0) {
    const correct = relatedQuestions.filter(
      (question) => question.__correct
    ).length;

    return Math.round((correct / relatedQuestions.length) * 100);
  }

  return percentage;
}

function buildSkillGap(selectedGoal, answers, percentage, selectedSkills) {
  if (!selectedGoal) return [];

  return selectedGoal.requiredSkills.map((skill) => {
    const relatedQuestions = questions.filter(
      (question) => question.skill === skill
    );

    let score = percentage;

    if (relatedQuestions.length > 0) {
      const answeredCorrectly = relatedQuestions.filter(
        (question) => answers[questions.indexOf(question)] === question.answer
      ).length;

      score = Math.round(
        (answeredCorrectly / relatedQuestions.length) * 100
      );
    } else if (selectedSkills.includes(skill)) {
      score = 75;
    } else {
      score = 25;
    }

    let level = "Beginner";

    if (score >= 75) level = "Advanced";
    else if (score >= 50) level = "Intermediate";

    return {
      skill,
      score,
      level,
      gap: Math.max(0, 100 - score),
    };
  });
}

function SkillAssessment() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [answers, setAnswers] = useState({});

  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);

  const selectedGoal = useMemo(
    () => careerGoals.find((item) => item.id === goal),
    [goal]
  );

  const toggleSkill = (skill) => {
    setSkills((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill]
    );
  };

  const handleAnswer = (index, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [index]: answer,
    }));
  };

  const canContinueStep1 = goal && experience;
  const canContinueStep2 = skills.length > 0;

  const handleSubmit = () => {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      }
    });

    const percentage = Math.round(
      (correctAnswers / questions.length) * 100
    );

    const level = getSkillLevel(percentage);

    const skillGap = buildSkillGap(
      selectedGoal,
      answers,
      percentage,
      skills
    );

    const weakSkills = skillGap
      .filter((item) => item.score < 75)
      .sort((a, b) => b.gap - a.gap);

    const strongSkills = skillGap
      .filter((item) => item.score >= 75)
      .sort((a, b) => b.score - a.score);

    const assessmentData = {
      completed: true,
      completedAt: new Date().toISOString(),

      goal,
      goalTitle: selectedGoal?.title || "Software Engineer",

      experience,

      skills,

      score: correctAnswers,
      totalQuestions: questions.length,
      percentage,
      level,

      levelDescription:
        level === "Advanced"
          ? "You have a strong technical foundation and can focus on advanced projects."
          : level === "Intermediate"
          ? "You have a good foundation. Strengthening your skill gaps will improve your readiness."
          : "You are building your foundation. Start with the recommended learning path and strengthen core skills.",

      skillGap,
      weakSkills,
      strongSkills,

      recommendedPath: {
        pathId: selectedGoal?.pathId,
        title:
          selectedGoal?.pathId === "java-full-stack"
            ? "Java Full Stack Development"
            : selectedGoal?.pathId === "data-structures"
            ? "Data Structures & Algorithms"
            : "Cloud & DevOps Fundamentals",
      },
    };

    setResult(assessmentData);
    setCompleted(true);

    localStorage.setItem(
      "learnbridgeSkillAssessment",
      JSON.stringify(assessmentData)
    );

    // Keep compatibility with the older prototype key.
    localStorage.setItem(
      "learnbridge_assessment",
      JSON.stringify(assessmentData)
    );

    window.dispatchEvent(
      new Event("learnbridge-assessment-updated")
    );
  };

  if (completed && result) {
    const recommendedPath = result.recommendedPath;

    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-slate-600 hover:text-blue-600 font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-10">
          {/* Result Hero */}
          <section className="bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 md:p-10 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Assessment Completed
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mt-5">
                  Your Skill Profile
                </h1>

                <p className="text-blue-100 mt-3 max-w-2xl">
                  We analyzed your current skills against your target career
                  and identified the areas that will have the biggest impact
                  on your career readiness.
                </p>
              </div>

              <div className="bg-white/15 rounded-3xl p-6 text-center min-w-45">
                <p className="text-blue-100 text-sm">
                  Assessment Score
                </p>

                <p className="text-5xl font-bold mt-2">
                  {result.percentage}%
                </p>

                <p className="mt-2 font-semibold">
                  {result.level}
                </p>
              </div>
            </div>
          </section>

          {/* Career Goal */}
          <section className="mt-8 bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Target Career
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {result.goalTitle}
                </h2>

                <p className="text-slate-500 mt-2">
                  {result.levelDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Skill Gap */}
          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Your Skill Gap
              </h2>

              <p className="text-slate-500 mt-1">
                These skills are compared against your selected career path.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              {result.skillGap.map((item) => (
                <div
                  key={item.skill}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {item.skill}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.level}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.score >= 75
                          ? "bg-emerald-100 text-emerald-700"
                          : item.score >= 50
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.score}%
                    </span>
                  </div>

                  <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.score >= 75
                          ? "bg-emerald-500"
                          : item.score >= 50
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${item.score}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Current level</span>

                    <span>
                      {item.gap > 0
                        ? `${item.gap}% improvement needed`
                        : "Career ready"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths + Weaknesses */}
          <section className="grid lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Your Strengths
                  </h2>

                  <p className="text-sm text-slate-500">
                    Skills you are already performing well in.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {result.strongSkills.length > 0 ? (
                  result.strongSkills.map((item) => (
                    <div
                      key={item.skill}
                      className="flex items-center justify-between p-3 rounded-xl bg-emerald-50"
                    >
                      <span className="font-medium text-slate-800">
                        {item.skill}
                      </span>

                      <span className="text-emerald-700 font-semibold">
                        {item.score}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    Keep learning — your strengths will appear as your
                    assessment scores improve.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Priority Skills
                  </h2>

                  <p className="text-sm text-slate-500">
                    Focus on these skills first.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {result.weakSkills.length > 0 ? (
                  result.weakSkills.slice(0, 5).map((item) => (
                    <div
                      key={item.skill}
                      className="flex items-center justify-between p-3 rounded-xl bg-orange-50"
                    >
                      <span className="font-medium text-slate-800">
                        {item.skill}
                      </span>

                      <span className="text-orange-700 font-semibold">
                        {item.gap}% gap
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-emerald-600 font-medium">
                    Excellent! No major skill gaps detected.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Recommended Path */}
          <section className="mt-8 bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-blue-600 font-semibold">
                    Recommended Learning Path
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    {recommendedPath.title}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Start learning the skills that will close your biggest
                    career gaps.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/learning-paths/${recommendedPath.pathId}`
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* Actions */}
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            <button
              onClick={() => navigate("/learning-paths")}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-blue-300 transition"
            >
              <BookOpen className="w-6 h-6 text-blue-600" />

              <h3 className="font-bold text-slate-900 mt-4">
                Explore Learning Paths
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Browse all available career paths.
              </p>
            </button>

            <button
              onClick={() => navigate("/progress")}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-blue-300 transition"
            >
              <TrendingUp className="w-6 h-6 text-blue-600" />

              <h3 className="font-bold text-slate-900 mt-4">
                View Progress
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Track your learning journey.
              </p>
            </button>

            <button
              onClick={() => navigate("/achievements")}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-blue-300 transition"
            >
              <Award className="w-6 h-6 text-blue-600" />

              <h3 className="font-bold text-slate-900 mt-4">
                View Achievements
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                See your earned achievements.
              </p>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
          >
            ← Dashboard
          </button>

          <span className="text-sm font-medium text-slate-500">
            Step {step} of 3
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-slate-700">
              Assessment Progress
            </span>

            <span className="text-slate-500">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{
                width: `${(step / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <section>
            <div className="mb-8">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Target className="w-7 h-7 text-blue-600" />
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mt-5">
                Define your career goal
              </h1>

              <p className="text-slate-500 mt-2">
                This helps LearnBridge understand which skills you need to
                become career-ready.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {careerGoals.map((item) => {
                const Icon = item.icon;
                const selected = goal === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className={`text-left bg-white rounded-3xl border-2 p-6 transition ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>

                      {selected && (
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mt-5">
                      {item.title}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Current experience
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mt-5">
                {experienceLevels.map((item) => {
                  const selected = experience === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setExperience(item.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition ${
                        selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          {item.title}
                        </span>

                        {selected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                disabled={!canContinueStep1}
                onClick={() => setStep(2)}
                className={`px-7 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                  canContinueStep1
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <section>
            <div className="mb-8">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Code2 className="w-7 h-7 text-indigo-600" />
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mt-5">
                Select your current skills
              </h1>

              <p className="text-slate-500 mt-2">
                Select everything you already have some experience with.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-7">
              <div className="flex flex-wrap gap-3">
                {skillOptions.map((skill) => {
                  const selected = skills.includes(skill);

                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-3 rounded-xl border font-medium transition ${
                        selected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {selected && "✓ "}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold"
              >
                Back
              </button>

              <button
                disabled={!canContinueStep2}
                onClick={() => setStep(3)}
                className={`px-7 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                  canContinueStep2
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Start Assessment
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <section>
            <div className="mb-8">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-violet-600" />
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mt-5">
                Technical Skill Assessment
              </h1>

              <p className="text-slate-500 mt-2">
                Answer the questions to help us identify your current level.
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h2 className="font-bold text-slate-900 text-lg">
                        {item.question}
                      </h2>

                      <div className="grid md:grid-cols-2 gap-3 mt-5">
                        {item.options.map((option) => {
                          const selected = answers[index] === option;

                          return (
                            <button
                              key={option}
                              onClick={() =>
                                handleAnswer(index, option)
                              }
                              className={`text-left p-4 rounded-xl border-2 transition ${
                                selected
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:border-blue-300 text-slate-700"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold"
              >
                Back
              </button>

              <button
                disabled={
                  Object.keys(answers).length !== questions.length
                }
                onClick={handleSubmit}
                className={`px-7 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                  Object.keys(answers).length === questions.length
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Generate My Skill Report
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default SkillAssessment;