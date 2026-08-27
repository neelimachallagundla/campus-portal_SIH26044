import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LearningPaths from "./pages/student/LearningPaths";
import LearningPathDetails from "./pages/LearningPathDetails";
import Lesson from "./pages/student/Lesson";
import Quiz from "./pages/student/Quiz";

function App() {
  return (
   <BrowserRouter>
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Student / Authenticated Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>

    {/* Admin Only Routes */}
    <Route element={<AdminRoute />}>
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
    </Route>
    <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/learning-paths" element={<LearningPaths />} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />

  <Route
    path="/learning-paths"
    element={<LearningPaths />}
  />

  <Route
    path="/learning-paths/:pathId"
    element={<LearningPathDetails />}
  />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />

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
</Route>
<Route
  path="/learning-paths/:pathId/quiz"
  element={<Quiz />}
/>
  </Routes>
</BrowserRouter>
  );
}

export default App;