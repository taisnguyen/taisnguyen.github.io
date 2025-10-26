import React from "react";
import { HashRouter, Routes, Route, Navigate, RouteObject } from "react-router-dom";
import LoadingView from "../components/LoadingView/LoadingView";

// const Home = React.lazy(() => import("../pages/Home"));
// const Work = React.lazy(() => import("../pages/Work"));
// const University = React.lazy(() => import("../pages/University"));
// const Research = React.lazy(() => import("../pages/Research"));
// const Teaching = React.lazy(() => import("../pages/Teaching"));
import Home from "../pages/Home";
import Work from "../pages/Work";
import University from "../pages/University";
import Research from "../pages/Research";
import Teaching from "../pages/Teaching";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Home />
            </React.Suspense>
        )
    },
    {
        path: "/work_experience",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Work />
            </React.Suspense>
        )
    },
    {
        path: "/university_activities",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <University />
            </React.Suspense>
        )
    },
    {
        path: "/research",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Research />
            </React.Suspense>
        )
    },
    {
        path: "/teaching",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Teaching />
            </React.Suspense>
        )
    }
];

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </HashRouter>
    );
};

export default Router;
