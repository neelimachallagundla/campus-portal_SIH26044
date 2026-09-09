import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const authData = localStorage.getItem("learnbridgeAuth");

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const auth = JSON.parse(authData);

    if (!auth.isAuthenticated || !auth.user) {
      return <Navigate to="/login" replace />;
    }

    // If roles are specified, check whether the user has permission.
    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(auth.user.role)
    ) {
      // Send user back to their correct dashboard.
      switch (auth.user.role) {
        case "admin":
          return <Navigate to="/admin/dashboard" replace />;

        case "academician":
          return <Navigate to="/academician/dashboard" replace />;

        case "organization":
          return <Navigate to="/organization/dashboard" replace />;

        case "student":
        default:
          return <Navigate to="/dashboard" replace />;
      }
    }

    return <Outlet />;

  } catch (error) {
    localStorage.removeItem("learnbridgeAuth");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
