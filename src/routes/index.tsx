import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import Home from "../pages/index";

 const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" /> },
]; 

export { publicRoutes };