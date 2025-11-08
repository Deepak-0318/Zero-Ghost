import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/deals" replace />;
  }

  return children;
}