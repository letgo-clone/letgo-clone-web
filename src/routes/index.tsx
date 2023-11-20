import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import Home from "../pages/Home/index";

// Adverts
import AdvertDetail from "../pages/Adverts";

 const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
    { path: "/item/:itemId", component: <AdvertDetail /> }
]; 

export { publicRoutes };
