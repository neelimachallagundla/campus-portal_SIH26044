import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock3,
  Trophy,
  XCircle,
} from "lucide-react";

const quizData = {
  "java-full-stack": {
    course: "Java Full Stack Development",
    modules: {
      "java-fundamentals": {
        title: "Java Fundamentals",
        questions: [
          {
            question: "Which keyword is used to define a class in Java?",
            options: ["function", "class", "define", "struct"],
            answer: "class",
          },
          {
            question: "Which method is the entry point of a Java program?",
            options: ["start()", "run()", "main()", "init()"],
            answer: "main()",
          },
          {
            question: "Which of these is a primitive data type in Java?",
            options: ["String", "Integer", "int", "ArrayList"],
            answer: "int",
          },
          {
            question: "Which symbol is used to end a Java statement?",
            options: [":", ".", ";", ","],
            answer: ";",
          },
          {
            question: "Which keyword creates an object in Java?",
            options: ["create", "new", "object", "make"],
            answer: "new",
          },
        ],
      },

      oops: {
        title: "Object-Oriented Programming",
        questions: [
          {
            question: "Which concept allows a class to acquire properties of another class?",
            options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"],
            answer: "Inheritance",
          },
          {
            question: "Which concept hides internal implementation details?",
            options: ["Abstraction", "Inheritance", "Compilation", "Overloading"],
            answer: "Abstraction",
          },
          {
            question: "Which concept means one interface can have multiple implementations?",
            options: ["Inheritance", "Polymorphism", "Encapsulation", "Composition"],
            answer: "Polymorphism",
          },
          {
            question: "Which access modifier provides the most restricted access?",
            options: ["public", "protected", "private", "default"],
            answer: "private",
          },
        ],
      },

      collections: {
        title: "Java Collections",
        questions: [
          {
            question: "Which collection does not allow duplicate elements?",
            options: ["List", "Set", "ArrayList", "LinkedList"],
            answer: "Set",
          },
          {
            question: "Which collection stores key-value pairs?",
            options: ["List", "Set", "Map", "Queue"],
            answer: "Map",
          },
          {
            question: "Which interface is implemented by ArrayList?",
            options: ["Set", "Map", "List", "Queue"],
            answer: "List",
          },
          {
            question: "Which collection generally provides fast random access?",
            options: ["ArrayList", "LinkedList", "HashSet", "TreeSet"],
            answer: "ArrayList",
          },
        ],
      },

      jdbc: {
        title: "JDBC & Databases",
        questions: [
          {
            question: "What does JDBC stand for?",
            options: [
              "Java Database Connectivity",
              "Java Data Control",
              "Java Database Compiler",
              "Java Development Connection",
            ],
            answer: "Java Database Connectivity",
          },
          {
            question: "Which object is used to execute SQL queries?",
            options: ["Connection", "Statement", "Driver", "ResultSet"],
            answer: "Statement",
          },
          {
            question: "Which interface represents the connection to a database?",
            options: ["Connection", "ResultSet", "Statement", "Driver"],
            answer: "Connection",
          },
        ],
      },

      "spring-boot": {
        title: "Spring Boot",
        questions: [
          {
            question: "Spring Boot is primarily used to build what?",
            options: [
              "Web applications",
              "Operating systems",
              "Device drivers",
              "Compilers",
            ],
            answer: "Web applications",
          },
          {
            question: "Which annotation is commonly used for a Spring Boot application?",
            options: [
              "@SpringBootApplication",
              "@JavaApplication",
              "@BootApplication",
              "@SpringStart",
            ],
            answer: "@SpringBootApplication",
          },
          {
            question: "Which tool is commonly used to manage Spring Boot dependencies?",
            options: ["Maven", "Photoshop", "Docker only", "GitHub"],
            answer: "Maven",
          },
        ],
      },

      "rest-apis": {
        title: "REST APIs",
        questions: [
          {
            question: "Which HTTP method is normally used to retrieve data?",
            options: ["POST", "GET", "DELETE", "PATCH"],
            answer: "GET",
          },
          {
            question: "Which HTTP method is commonly used to create a resource?",
            options: ["GET", "POST", "DELETE", "HEAD"],
            answer: "POST",
          },
          {
            question: "What format is commonly used for REST API data exchange?",
            options: ["JSON", "EXE", "DLL", "BAT"],
            answer: "JSON",
          },
        ],
      },

      react: {
        title: "React Fundamentals",
        questions: [
          {
            question: "Which hook is used to manage state in a React component?",
            options: ["useState", "useRoute", "usePage", "useData"],
            answer: "useState",
          },
          {
            question: "React applications are primarily built using what?",
            options: ["Components", "Tables", "Databases", "Servers"],
            answer: "Components",
          },
        ],
      },

      "full-stack-project": {
        title: "Full Stack Project",
        questions: [
          {
            question: "Which layer is responsible for storing application data?",
            options: ["Database", "UI", "Router", "Browser"],
            answer: "Database",
          },
          {
            question: "Which technology can be used to build a REST backend in Java?",
            options: ["Spring Boot", "Photoshop", "Figma", "Excel"],
            answer: "Spring Boot",
          },
          {
            question: "Which technology can be used to build the frontend?",
            options: ["React", "MySQL", "JDBC", "Maven"],
            answer: "React",
          },
        ],
      },
    },
  },

  "data-structures": {
    course: "Data Structures & Algorithms",
    modules: {
      arrays: {
        title: "Arrays",
        questions: [
          {
            question: "What is the index of the first element in a Java array?",
            options: ["0", "1", "-1", "Depends"],
            answer: "0",
          },
          {
            question: "Which data structure stores elements in contiguous memory?",
            options: ["Array", "Tree", "Graph", "HashMap"],
            answer: "Array",
          },
          {
            question: "What is the average access time of an array element by index?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            answer: "O(1)",
          },
          {
            question: "Which operation generally requires shifting elements in an array?",
            options: ["Insertion", "Access", "Reading", "Indexing"],
            answer: "Insertion",
          },
        ],
      },

      "linked-lists": {
        title: "Linked Lists",
        questions: [
          {
            question: "A linked list node normally contains data and what?",
            options: ["Pointer/reference", "SQL query", "Class", "Thread"],
            answer: "Pointer/reference",
          },
          {
            question: "Which linked list allows traversal in both directions?",
            options: ["Singly", "Doubly", "Circular singly", "Static"],
            answer: "Doubly",
          },
          {
            question: "What is the typical insertion complexity at the beginning of a linked list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            answer: "O(1)",
          },
          {
            question: "Which node marks the end of a typical singly linked list?",
            options: ["NULL", "ROOT", "TOP", "HEAD"],
            answer: "NULL",
          },
        ],
      },

      "stacks-queues": {
        title: "Stacks & Queues",
        questions: [
          {
            question: "Which principle does a stack follow?",
            options: ["FIFO", "LIFO", "Random", "Priority only"],
            answer: "LIFO",
          },
          {
            question: "Which principle does a queue follow?",
            options: ["LIFO", "FIFO", "Random", "Reverse"],
            answer: "FIFO",
          },
          {
            question: "Which operation removes an item from a stack?",
            options: ["Push", "Pop", "Enqueue", "Insert"],
            answer: "Pop",
          },
        ],
      },

      hashing: {
        title: "Hashing",
        questions: [
          {
            question: "What is the main purpose of hashing?",
            options: [
              "Fast data lookup",
              "Sorting only",
              "Rendering UI",
              "Compiling code",
            ],
            answer: "Fast data lookup",
          },
          {
            question: "What happens when two keys produce the same hash index?",
            options: ["Collision", "Overflow", "Recursion", "Compilation"],
            answer: "Collision",
          },
          {
            question: "Which data structure commonly uses hashing?",
            options: ["HashMap", "Stack", "Queue", "Array only"],
            answer: "HashMap",
          },
        ],
      },

      trees: {
        title: "Trees",
        questions: [
          {
            question: "Which node is at the top of a tree?",
            options: ["Leaf", "Root", "Child", "Parent"],
            answer: "Root",
          },
          {
            question: "A binary tree node can have at most how many children?",
            options: ["1", "2", "3", "Unlimited"],
            answer: "2",
          },
          {
            question: "Which traversal visits Root, Left, Right?",
            options: ["Inorder", "Preorder", "Postorder", "Level only"],
            answer: "Preorder",
          },
          {
            question: "Which traversal visits Left, Root, Right?",
            options: ["Inorder", "Preorder", "Postorder", "BFS"],
            answer: "Inorder",
          },
        ],
      },

      graphs: {
        title: "Graphs",
        questions: [
          {
            question: "A graph consists primarily of what?",
            options: [
              "Vertices and edges",
              "Rows and columns",
              "Keys and values",
              "Stacks and queues",
            ],
            answer: "Vertices and edges",
          },
          {
            question: "Which algorithm is commonly used for BFS?",
            options: ["Queue", "Stack", "Heap only", "Recursion only"],
            answer: "Queue",
          },
          {
            question: "Which algorithm is commonly used for DFS?",
            options: ["Queue", "Stack", "HashMap", "Array only"],
            answer: "Stack",
          },
          {
            question: "What does BFS stand for?",
            options: [
              "Breadth First Search",
              "Binary First Search",
              "Basic File Search",
              "Breadth File Structure",
            ],
            answer: "Breadth First Search",
          },
        ],
      },

      "dynamic-programming": {
        title: "Dynamic Programming",
        questions: [
          {
            question: "Dynamic programming is useful when a problem has what?",
            options: [
              "Overlapping subproblems",
              "Only one solution",
              "No recursion",
              "No repeated work",
            ],
            answer: "Overlapping subproblems",
          },
          {
            question: "What technique stores previously calculated results?",
            options: ["Memoization", "Compilation", "Hash collision", "Parsing"],
            answer: "Memoization",
          },
          {
            question: "Which is a common dynamic programming problem?",
            options: [
              "0/1 Knapsack",
              "Hello World",
              "Binary printing",
              "Variable declaration",
            ],
            answer: "0/1 Knapsack",
          },
          {
            question: "What is the main goal of DP?",
            options: [
              "Avoid repeated computation",
              "Increase repeated computation",
              "Remove all loops",
              "Avoid data structures",
            ],
            answer: "Avoid repeated computation",
          },
        ],
      },
    },
  },

  "cloud-devops": {
    course: "Cloud & DevOps Fundamentals",
    modules: {
      "cloud-intro": {
        title: "Cloud Computing Introduction",
        questions: [
          {
            question: "Cloud computing provides computing resources over what?",
            options: ["Internet", "Bluetooth", "USB", "BIOS"],
            answer: "Internet",
          },
          {
            question: "Which is an example of cloud infrastructure?",
            options: ["AWS", "Notepad", "Keyboard", "BIOS"],
            answer: "AWS",
          },
          {
            question: "What does IaaS stand for?",
            options: [
              "Infrastructure as a Service",
              "Internet as a System",
              "Infrastructure and Software",
              "Internal Application Service",
            ],
            answer: "Infrastructure as a Service",
          },
          {
            question: "Which is a benefit of cloud computing?",
            options: [
              "Scalability",
              "No networking",
              "No storage",
              "No security",
            ],
            answer: "Scalability",
          },
        ],
      },

      linux: {
        title: "Linux Fundamentals",
        questions: [
          {
            question: "Which command lists files in Linux?",
            options: ["ls", "list", "show", "files"],
            answer: "ls",
          },
          {
            question: "Which command displays the current directory?",
            options: ["pwd", "dirpath", "where", "cd"],
            answer: "pwd",
          },
          {
            question: "Which command changes directories?",
            options: ["cd", "mvdir", "change", "goto"],
            answer: "cd",
          },
          {
            question: "Which command creates a directory?",
            options: ["mkdir", "newdir", "createdir", "folder"],
            answer: "mkdir",
          },
        ],
      },

      git: {
        title: "Git & GitHub",
        questions: [
          {
            question: "Which command copies a remote Git repository?",
            options: ["git clone", "git copy", "git pullall", "git remote"],
            answer: "git clone",
          },
          {
            question: "Which command records changes in Git?",
            options: ["git commit", "git save", "git record", "git pushonly"],
            answer: "git commit",
          },
          {
            question: "Which command sends local commits to a remote repository?",
            options: ["git push", "git send", "git upload", "git commit"],
            answer: "git push",
          },
        ],
      },

      aws: {
        title: "AWS Fundamentals",
        questions: [
          {
            question: "What is Amazon EC2 used for?",
            options: [
              "Virtual servers",
              "Email only",
              "Database queries only",
              "Image editing",
            ],
            answer: "Virtual servers",
          },
          {
            question: "What is Amazon S3 primarily used for?",
            options: [
              "Object storage",
              "Virtual machines",
              "DNS only",
              "Code compilation",
            ],
            answer: "Object storage",
          },
          {
            question: "Which AWS service provides managed relational databases?",
            options: ["RDS", "S3", "EC2", "Lambda"],
            answer: "RDS",
          },
          {
            question: "Which AWS service provides serverless functions?",
            options: ["Lambda", "EC2", "S3", "RDS"],
            answer: "Lambda",
          },
          {
            question: "Which AWS service is commonly used for DNS?",
            options: ["Route 53", "S3", "EC2", "CloudFront"],
            answer: "Route 53",
          },
        ],
      },

      docker: {
        title: "Docker",
        questions: [
          {
            question: "Docker is primarily used for what?",
            options: [
              "Containerization",
              "Database normalization",
              "UI design",
              "Code formatting",
            ],
            answer: "Containerization",
          },
          {
            question: "What is a Docker image?",
            options: [
              "Template used to create containers",
              "Running process only",
              "Database",
              "Git branch",
            ],
            answer: "Template used to create containers",
          },
          {
            question: "Which command starts a Docker container?",
            options: ["docker run", "docker startapp", "docker execute", "docker launch"],
            answer: "docker run",
          },
        ],
      },

      cicd: {
        title: "CI/CD",
        questions: [
          {
            question: "What does CI stand for?",
            options: [
              "Continuous Integration",
              "Code Installation",
              "Cloud Integration",
              "Continuous Internet",
            ],
            answer: "Continuous Integration",
          },
          {
            question: "What does CD commonly stand for?",
            options: [
              "Continuous Delivery",
              "Code Database",
              "Cloud Deployment only",
              "Continuous Debugging",
            ],
            answer: "Continuous Delivery",
          },
          {
            question: "What is a key benefit of CI/CD?",
            options: [
              "Automated software delivery",
              "Manual testing only",
              "Removing version control",
              "Avoiding deployments",
            ],
            answer: "Automated software delivery",
          },
        ],
      },

      "devops-project": {
        title: "DevOps Project",
        questions: [
          {
            question: "Which tool can be used for containerization?",
            options: ["Docker", "Excel", "Figma", "Photoshop"],
            answer: "Docker",
          },
          {
            question: "Which tool can automate CI/CD pipelines?",
            options: ["GitHub Actions", "Notepad", "Chrome", "PowerPoint"],
            answer: "GitHub Actions",
          },
          {
            question: "What is the main objective of DevOps?",
            options: [
              "Improve collaboration and delivery",
              "Remove automation",
              "Avoid deployment",
              "Separate development and operations",
            ],
            answer: "Improve collaboration and delivery",
          },
        ],
      },
    },
  },
};

function Quiz() {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const [searchParams] = useSearchParams();

  const moduleId = searchParams.get("module");

  const path = quizData[pathId];

  const moduleQuiz = useMemo(() => {
    if (!path || !moduleId) return null;
    return path.modules[moduleId] || null;
  }, [path, moduleId]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  if (!path) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900">
            Learning path not found
          </h1>

          <button
            onClick={() => navigate("/learning-paths")}
            className="mt-6 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold"
          >
            Back to Learning Paths
          </button>
        </div>
      </div>
    );
  }

  if (!moduleQuiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-slate-900">
            Module assessment unavailable
          </h1>

          <p className="text-slate-500 mt-3">
            This module does not have an assessment configured yet.
          </p>

          <button
            onClick={() => navigate(`/learning-paths/${pathId}`)}
            className="mt-6 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold"
          >
            Back to Learning Path
          </button>
        </div>
      </div>
    );
  }

  const quiz = {
    ...moduleQuiz,
    course: path.course,
    moduleId,
  };

  const allAnswered =
    Object.keys(selectedAnswers).length === quiz.questions.length;

  const handleSelect = (questionIndex, answer) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;

    let correctAnswers = 0;

    quiz.questions.forEach((item, index) => {
      if (selectedAnswers[index] === item.answer) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    );

    const passingScore = 70;
    const passed = calculatedScore >= passingScore;

    const quizResult = {
      completed: true,
      course: quiz.course,
      module: quiz.title,
      moduleId,
      pathId,
      score: calculatedScore,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      passingScore,
      passed,
      completedAt: new Date().toISOString(),
    };

    setScore(calculatedScore);
    setSubmitted(true);

    localStorage.setItem(
      `learnbridge_quiz_${pathId}_${moduleId}`,
      JSON.stringify(quizResult)
    );

    // Keep the old path-level key as well for compatibility
    // with the current Progress/Achievements prototype.
    localStorage.setItem(
      `learnbridge_quiz_${pathId}`,
      JSON.stringify(quizResult)
    );

    window.dispatchEvent(new Event("learnbridge-quiz-updated"));
    window.dispatchEvent(new Event("learnbridge-progress"));
  };

  const handleBackToPath = () => {
    navigate(`/learning-paths/${pathId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToPath}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learning Path
          </button>

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Clock3 className="w-4 h-4" />
            Module Assessment
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                {quiz.course}
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                {quiz.title} Assessment
              </h1>

              <p className="text-blue-100 mt-3">
                Test your understanding of this module before moving forward.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 min-w-37.5">
              <p className="text-blue-100 text-sm">Questions</p>
              <p className="text-2xl font-bold">
                {quiz.questions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Result */}
        {submitted && (
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="text-center">
              {score >= 70 ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <Trophy className="w-8 h-8 text-emerald-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mt-4">
                    Assessment Passed 🎉
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Great work! You can continue to the next module.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mt-4">
                    Keep Practicing
                  </h2>

                  <p className="text-slate-500 mt-2">
                    You need at least 70% to pass this assessment.
                  </p>
                </>
              )}

              <div className="mt-6 inline-flex items-center gap-3 bg-slate-100 rounded-2xl px-6 py-4">
                <span className="text-slate-500">Your Score</span>
                <span
                  className={`text-3xl font-bold ${
                    score >= 70
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {score}%
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleBackToPath}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Back to Learning Path
                </button>

                {score < 70 && (
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setSubmitted(false);
                      setScore(null);
                    }}
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Retake Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Questions */}
        {!submitted && (
          <div className="mt-8 space-y-6">
            {quiz.questions.map((item, index) => {
              const selected = selectedAnswers[index];

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-slate-900 leading-relaxed">
                        {item.question}
                      </h2>

                      <div className="mt-5 space-y-3">
                        {item.options.map((option) => {
                          const isSelected = selected === option;

                          return (
                            <button
                              key={option}
                              onClick={() =>
                                handleSelect(index, option)
                              }
                              className={`w-full text-left rounded-2xl border p-4 transition flex items-center gap-3 ${
                                isSelected
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              {isSelected ? (
                                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                              )}

                              <span className="font-medium">
                                {option}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Submit */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">
                  {Object.keys(selectedAnswers).length} /{" "}
                  {quiz.questions.length} answered
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Answer all questions before submitting.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`px-7 py-3 rounded-xl font-semibold transition ${
                  allAnswered
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Submit Assessment
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Quiz;