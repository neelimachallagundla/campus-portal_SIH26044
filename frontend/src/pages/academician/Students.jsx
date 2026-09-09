import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  LogOut,
  MessageSquare,
  Microscope,
  Presentation,
  Search,
  SlidersHorizontal,
  UserRound,
  X,
  Mail,
  MapPin,
  Award,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Students() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [readiness, setReadiness] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const students = [
    {
      id: 1,
      name: "Rahul Kumar",
      rollNo: "21CS101",
      email: "rahul.kumar@college.edu",
      department: "Computer Science",
      year: "3rd Year",
      location: "Chennai",
      skills: ["Java", "SQL", "React", "Spring Boot"],
      readiness: 82,
      placementStatus: "Eligible",
      progress: 78,
      projects: 3,
    },
    {
      id: 2,
      name: "Priya Sharma",
      rollNo: "21AI115",
      email: "priya.sharma@college.edu",
      department: "AI & Data Science",
      year: "3rd Year",
      location: "Bangalore",
      skills: ["Python", "Machine Learning", "SQL", "Power BI"],
      readiness: 91,
      placementStatus: "Eligible",
      progress: 92,
      projects: 4,
    },
    {
      id: 3,
      name: "Arjun Reddy",
      rollNo: "22CS089",
      email: "arjun.reddy@college.edu",
      department: "Computer Science",
      year: "2nd Year",
      location: "Hyderabad",
      skills: ["React", "JavaScript", "Node.js", "MongoDB"],
      readiness: 76,
      placementStatus: "Preparing",
      progress: 71,
      projects: 2,
    },
    {
      id: 4,
      name: "Sneha Patel",
      rollNo: "21IT134",
      email: "sneha.patel@college.edu",
      department: "Information Technology",
      year: "3rd Year",
      location: "Mumbai",
      skills: ["Python", "AWS", "Docker", "DevOps"],
      readiness: 88,
      placementStatus: "Eligible",
      progress: 85,
      projects: 3,
    },
    {
      id: 5,
      name: "Karthik Rao",
      rollNo: "23CS047",
      email: "karthik.rao@college.edu",
      department: "Computer Science",
      year: "2nd Year",
      location: "Chennai",
      skills: ["C", "Java", "DSA", "Git"],
      readiness: 64,
      placementStatus: "Preparing",
      progress: 59,
      projects: 1,
    },
    {
      id: 6,
      name: "Ananya Singh",
      rollNo: "21DS126",
      email: "ananya.singh@college.edu",
      department: "Data Science",
      year: "3rd Year",
      location: "Delhi",
      skills: ["Python", "Data Science", "Machine Learning", "SQL"],
      readiness: 94,
      placementStatus: "Eligible",
      progress: 95,
      projects: 5,
    },
  ];

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.rollNo.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesDepartment =
      department === "All" || student.department === department;

    const matchesYear =
      year === "All" || student.year === year;

    const matchesReadiness =
      readiness === "All" ||
      (readiness === "High" && student.readiness >= 85) ||
      (readiness === "Medium" &&
        student.readiness >= 70 &&
        student.readiness < 85) ||
      (readiness === "Low" && student.readiness < 70);

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesYear &&
      matchesReadiness
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          FIXED SIDEBAR
      ===================================================== */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">

        {/* Logo */}
        <div className="p-6 border-b border-slate-200 shrink-0">
          <h1 className="text-2xl font-bold text-blue-600">
            LearnBridge
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Academician Portal
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/academician/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <BookOpen size={19} />
            Dashboard
          </button>

          {/* Students */}
          <button
            onClick={() => navigate("/academician/students")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <GraduationCap size={19} />
            Students
          </button>

          {/* Faculty Opportunities */}
          <button
            onClick={() => navigate("/academician/opportunities")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <BriefcaseBusiness size={19} />
            Faculty Opportunities
          </button>

          {/* FDP Programs */}
          <button
            onClick={() => navigate("/academician/fdp-programs")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <GraduationCap size={19} />
            FDP Programs
          </button>

          {/* Research Projects */}
          <button
            onClick={() => navigate("/academician/research")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Microscope size={19} />
            Research Projects
          </button>

          {/* Collaborations */}
          <button
            onClick={() => navigate("/academician/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Handshake size={19} />
            Collaborations
          </button>

          {/* Workshops */}
          <button
            onClick={() => navigate("/academician/workshops")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Presentation size={19} />
            Workshops
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate("/academician/messages")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <MessageSquare size={19} />
            Messages
          </button>

        </nav>

        {/* =====================================================
            LOGOUT — ALWAYS AT BOTTOM
        ===================================================== */}
        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
          ml-64 = space for fixed sidebar
      ===================================================== */}
      <main className="ml-64 min-h-screen p-6 md:p-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-blue-600 font-medium">
            Academician Portal
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Students
          </h2>

          <p className="text-slate-500 mt-2">
            Search, filter and explore student profiles, skills and
            placement readiness.
          </p>
        </div>


        {/* =====================================================
            SEARCH & FILTERS
        ===================================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">

          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal
              size={18}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-slate-900">
              Search & Filters
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {/* Search */}
            <div className="relative xl:col-span-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search name, roll no or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Department */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="AI & Data Science">
                AI & Data Science
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Data Science">
                Data Science
              </option>
            </select>

            {/* Year */}
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            {/* Readiness */}
            <select
              value={readiness}
              onChange={(e) => setReadiness(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="All">
                All Readiness Levels
              </option>
              <option value="High">
                High — 85%+
              </option>
              <option value="Medium">
                Medium — 70–84%
              </option>
              <option value="Low">
                Low — Below 70%
              </option>
            </select>

          </div>
        </div>


        {/* =====================================================
            RESULTS HEADER
        ===================================================== */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Student Directory
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {filteredStudents.length} students found
            </p>
          </div>

        </div>


        {/* =====================================================
            STUDENT CARDS
        ===================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-slate-200 rounded-2xl p-6"
            >

              {/* Student Header */}
              <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <UserRound size={23} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">
                      {student.name}
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      {student.rollNo} • {student.department}
                    </p>
                  </div>

                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    student.placementStatus === "Eligible"
                      ? "bg-green-50 text-green-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {student.placementStatus}
                </span>

              </div>


              {/* Student Information */}
              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">
                    Year
                  </p>

                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {student.year}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">
                    Readiness
                  </p>

                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {student.readiness}%
                  </p>
                </div>

              </div>


              {/* Skills */}
              <div className="mt-5">

                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2">

                  {student.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>


              {/* Progress */}
              <div className="mt-5">

                <div className="flex justify-between mb-2">

                  <span className="text-xs text-slate-500">
                    Learning Progress
                  </span>

                  <span className="text-xs font-medium text-slate-700">
                    {student.progress}%
                  </span>

                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${student.progress}%`,
                    }}
                  />

                </div>

              </div>


              {/* View Profile */}
              <button
                onClick={() => setSelectedStudent(student)}
                className="w-full mt-6 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
              >
                View Student Profile
              </button>

            </div>
          ))}

        </div>


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}
        {filteredStudents.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">

            <UserRound
              size={38}
              className="mx-auto text-slate-300"
            />

            <h3 className="text-lg font-bold text-slate-900 mt-4">
              No students found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Try changing your search or filters.
            </p>

          </div>
        )}


      </main>


      {/* =====================================================
          STUDENT PROFILE MODAL
      ===================================================== */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <UserRound size={27} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedStudent.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedStudent.rollNo}
                  </p>
                </div>

              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X size={19} />
              </button>

            </div>


            {/* Modal Content */}
            <div className="p-6">

              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">

                  <GraduationCap
                    size={19}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Department
                    </p>

                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {selectedStudent.department}
                    </p>
                  </div>

                </div>


                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">

                  <Award
                    size={19}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Academic Year
                    </p>

                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {selectedStudent.year}
                    </p>
                  </div>

                </div>


                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">

                  <Mail
                    size={19}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Email
                    </p>

                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {selectedStudent.email}
                    </p>
                  </div>

                </div>


                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">

                  <MapPin
                    size={19}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {selectedStudent.location}
                    </p>
                  </div>

                </div>

              </div>


              {/* Skills */}
              <div className="mt-6">

                <h4 className="font-bold text-slate-900 mb-3">
                  Skills
                </h4>

                <div className="flex flex-wrap gap-2">

                  {selectedStudent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>


              {/* Readiness */}
              <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">

                  <Target
                    size={18}
                    className="text-blue-600"
                  />

                  <h4 className="font-bold text-slate-900">
                    Placement Readiness
                  </h4>

                </div>

                <div className="bg-slate-50 rounded-xl p-4">

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-slate-500">
                      Overall Readiness
                    </span>

                    <span className="font-bold text-slate-900">
                      {selectedStudent.readiness}%
                    </span>

                  </div>

                  <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">

                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${selectedStudent.readiness}%`,
                      }}
                    />

                  </div>

                </div>

              </div>


              {/* Learning */}
              <div className="grid grid-cols-2 gap-4 mt-5">

                <div className="p-4 border border-slate-200 rounded-xl">

                  <p className="text-xs text-slate-500">
                    Learning Progress
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedStudent.progress}%
                  </p>

                </div>

                <div className="p-4 border border-slate-200 rounded-xl">

                  <p className="text-xs text-slate-500">
                    Projects
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedStudent.projects}
                  </p>

                </div>

              </div>


              {/* Actions */}
              <div className="flex gap-3 mt-7">

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Contact Student
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Students;
