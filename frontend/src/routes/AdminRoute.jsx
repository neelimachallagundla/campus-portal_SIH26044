import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const authData = localStorage.getItem("learnbridgeAuth");

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const auth = JSON.parse(authData);

    if (!auth.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (auth.user?.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("learnbridgeAuth");
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;