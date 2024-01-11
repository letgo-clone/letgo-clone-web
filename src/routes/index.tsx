import { Navigate } from "react-router-dom";

// Dashboard
import Home from "../pages/Home";

// Adverts
import AdvertDetail from "../pages/Adverts/Detail";
import Search from "../pages/Adverts/Search";
import AdvertEdit from "../pages/Adverts/Edit";
import SellCategory from '../pages/Adverts/SellCategory'
import PostAttributes from '../pages/Adverts/Sell'

// Profile
import ProfileInfo from "../pages/Profile";
import ProfileView from "../pages/Profile/profileView";
import MyAdsView from "../pages/Profile/MyAdsList";
import MyFavoriteView from "../pages/Profile/MyFavoriteList";


 const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
    { path: "/item/:title/:itemId", component: <AdvertDetail /> },
    { path: "/search", component: <Search /> },
]; 

const authProtectedRoutes = [
    { path: "/post", component: <SellCategory /> },
    { path: "/post/attributes", component: <PostAttributes /> },
    { path: "/post/edit/:advertId", component: <AdvertEdit /> },
    { path: "/editProfile/info", component: <ProfileInfo /> },
    { path: "/profile/", component: <ProfileView /> },
    { path: "/profile/:userId", component: <ProfileView /> },
    { path: "/profile/myads", component: <MyAdsView /> },
    { path: "/profile/myfavorite", component: <MyFavoriteView /> },
]

export { publicRoutes, authProtectedRoutes };
