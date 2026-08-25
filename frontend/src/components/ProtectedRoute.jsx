import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const auth = JSON.parse(localStorage.getItem("learnbridgeAuth"));

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;