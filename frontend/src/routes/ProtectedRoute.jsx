import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const authData = localStorage.getItem("learnbridgeAuth");

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const auth = JSON.parse(authData);

    if (!auth.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("learnbridgeAuth");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;