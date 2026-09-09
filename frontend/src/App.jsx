import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

// Public
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Student
import Dashboard from "./pages/Dashboard";
import LearningPaths from "./pages/student/LearningPaths";
import LearningPathDetails from "./pages/LearningPathDetails";
import Lesson from "./pages/student/Lesson";
import Quiz from "./pages/student/Quiz";
import SkillAssessment from "./pages/SkillAssessment";
import Progress from "./pages/student/Progress";
import Achievements from "./pages/student/Achievements";
import Profile from "./pages/student/Profile";
import Opportunities from "./pages/student/Opportunities";
import Applications from "./pages/student/Applications";
import PlacementOutcome from "./pages/student/PlacementOutcome";

// Academician
import AcademicianDashboard from "./pages/academician/AcademicianDashboard";
import AcademicianStudents from "./pages/academician/Students";
import FacultyOpportunities from "./pages/academician/FacultyOpportunities";
import FDPPrograms from "./pages/academician/FDPPrograms";
import ResearchProjects from "./pages/academician/ResearchProjects";
import Collaborations from "./pages/academician/Collaborations";
import Workshops from "./pages/academician/Workshops";
import Messages from "./pages/academician/Messages";
import AcademicianProfile from "./pages/academician/Profile";

// Organization
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import OrganizationOpportunities from "./pages/organization/Opportunities";
import OrganizationInternships from "./pages/organization/Internships";
import OrganizationApplications from "./pages/organization/Applications";
import OrganizationCollaborations from "./pages/organization/Collaborations";
import OrganizationMessages from "./pages/organization/Messages";
import OrganizationProfile from "./pages/organization/Profile";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Companies from "./pages/admin/Companies";
import Internships from "./pages/admin/Internships";
import Placements from "./pages/admin/Placements";
import TrainingPrograms from "./pages/admin/TrainingPrograms";
import Skills from "./pages/admin/Skills";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC ROUTES
        ===================================================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* =====================================================
            STUDENT ROUTES
        ===================================================== */}

        <Route
  element={
    <ProtectedRoute allowedRoles={["student"]} />
  }
>
  <Route
    path="/dashboard"
    element={<Dashboard />}
  />

  <Route
    path="/learning-paths"
    element={<LearningPaths />}
  />

  <Route
    path="/learning-paths/:pathId"
    element={<LearningPathDetails />}
  />

  <Route
    path="/learning-paths/:pathId/lessons"
    element={<Lesson />}
  />

  <Route
    path="/learning-paths/:pathId/quiz"
    element={<Quiz />}
  />

  <Route
    path="/skill-assessment"
    element={<SkillAssessment />}
  />

  <Route
    path="/progress"
    element={<Progress />}
  />

  <Route
    path="/achievements"
    element={<Achievements />}
  />

  <Route
    path="/profile"
    element={<Profile />}
  />

  <Route
    path="/opportunities"
    element={<Opportunities />}
  />

  <Route
    path="/applications"
    element={<Applications />}
  />

  <Route
    path="/placement-outcome"
    element={<PlacementOutcome />}
  />
</Route>


        {/* =====================================================
            ACADEMICIAN ROUTES
        ===================================================== */}

       <Route
  path="/academician/dashboard"
  element={<AcademicianDashboard />}
/>

<Route
  path="/academician/students"
  element={<AcademicianStudents />}
/>

<Route
  path="/academician/opportunities"
  element={<FacultyOpportunities />}
/>

<Route
  path="/academician/fdp-programs"
  element={<FDPPrograms />}
/>

<Route
  path="/academician/research"
  element={<ResearchProjects />}
/>

<Route
  path="/academician/collaborations"
  element={<Collaborations />}
/>

<Route
  path="/academician/workshops"
  element={<Workshops />}
/>
<Route path="/academician/profile" element={<AcademicianProfile />} />
<Route
  path="/academician/messages"
  element={<Messages />}
/>
        {/* ==================== ORGANIZATION ROUTES ==================== */}

<Route element={<ProtectedRoute allowedRoles={["organization"]} />}>

  {/* Organization Dashboard */}
  <Route
    path="/organization/dashboard"
    element={<OrganizationDashboard />}
  />

  {/* Post Opportunities */}
  <Route
    path="/organization/opportunities"
    element={<OrganizationOpportunities />}
  />

  {/* Internships */}
  <Route
    path="/organization/internships"
    element={<OrganizationInternships />}
  />

  {/* Applications */}
  <Route
    path="/organization/applications"
    element={<OrganizationApplications />}
  />

  {/* Collaborations */}
  <Route
    path="/organization/collaborations"
    element={<OrganizationCollaborations />}
  />

  {/* Messages */}
  <Route
    path="/organization/messages"
    element={<OrganizationMessages />}
  />

  {/* Profile */}
  <Route
    path="/organization/profile"
    element={<OrganizationProfile />}
  />

</Route>
        {/* =====================================================
            ADMIN ROUTES
        ===================================================== */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]} />
          }
        >

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          {/* Students */}
          <Route
            path="/admin/students"
            element={<Students />}
          />

          {/* Companies */}
          <Route
            path="/admin/companies"
            element={<Companies />}
          />

          {/* Internships */}
          <Route
            path="/admin/internships"
            element={<Internships />}
          />

          {/* Placements */}
          <Route
            path="/admin/placements"
            element={<Placements />}
          />

          {/* Training Programs */}
          <Route
            path="/admin/training"
            element={<TrainingPrograms />}
          />

          {/* Skills */}
          <Route
            path="/admin/skills"
            element={<Skills />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;