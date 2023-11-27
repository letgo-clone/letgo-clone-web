import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import Home from "../pages/Home/index";

// Adverts
import AdvertDetail from "../pages/Adverts";
import Search from "../pages/Adverts/search";

// Post
import Post from '../pages/Post/index'
import PostAttributes from '../pages/Post/attributes'

 const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
    { path: "/item/:itemId", component: <AdvertDetail /> },
    { path: "/item/search", component: <Search /> },
    { path: "/post", component: <Post /> },
    { path: "/post/attributes", component: <PostAttributes /> },
]; 

export { publicRoutes };
