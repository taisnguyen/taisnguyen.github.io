import React from "react";
import { HashRouter, Routes, Route, Navigate, RouteObject } from "react-router-dom";
import LoadingView from "../components/LoadingView/LoadingView";

const About = React.lazy(() => import("../pages/About"));
const Work = React.lazy(() => import("../pages/Work"));
const University = React.lazy(() => import("../pages/University"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/about_me" />
    },
    {
        path: "/about_me",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <About />
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
