import { Navigate } from "react-router-dom";

// Dashboard
import Home from "../pages/Home/index";

// Adverts
import AdvertDetail from "../pages/Adverts";
import Search from "../pages/Adverts/search";

// Post
import Post from '../pages/Post/index'
import PostAttributes from '../pages/Post/Sell'

// Profile
import ProfileInfo from "../pages/Profile";
import ProfileView from "../pages/Profile/profileView";
import MyAdsView from "../pages/Profile/MyAdsList";
import MyFavoriteView from "../pages/Profile/MyFavoriteList";
import AdvertEdit from "../pages/Post/Edit";

 const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
    { path: "/item/:title/:itemId", component: <AdvertDetail /> },
    { path: "/item/search", component: <Search /> },
]; 

const authProtectedRoutes = [
    { path: "/post", component: <Post /> },
    { path: "/post/attributes", component: <PostAttributes /> },
    { path: "/post/edit/:advertId", component: <AdvertEdit /> },
    { path: "/editProfile/info", component: <ProfileInfo /> },
    { path: "/profile/", component: <ProfileView /> },
    { path: "/profile/:userId", component: <ProfileView /> },
    { path: "/profile/myads", component: <MyAdsView /> },
    { path: "/profile/myfavorite", component: <MyFavoriteView /> },
]

export { publicRoutes, authProtectedRoutes };
