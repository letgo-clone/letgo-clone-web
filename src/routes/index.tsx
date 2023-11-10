import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import Dashboard from "../pages/index";

 const publicRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
]; 

export { publicRoutes };
