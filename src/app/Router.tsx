import React from "react";
import { HashRouter, Routes, Route, Navigate, RouteObject } from "react-router-dom";
import LoadingView from "../components/LoadingView/LoadingView";

import Home from "../pages/Home";
import Work from "../pages/Work";
import University from "../pages/University";
import Research from "../pages/Research";
import Teaching from "../pages/Teaching";
import Photos from "../pages/Photos";

const homeElement = (
    <React.Suspense fallback={<LoadingView />}>
        <Home />
    </React.Suspense>
);

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/home" replace />
    },
    {
        path: "/home",
        element: homeElement
    },
    {
        path: "/home/:articleSlug",
        element: homeElement
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
    },
    {
        path: "/photos",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Photos />
            </React.Suspense>
        )
    },
    {
        path: "*",
        element: <Navigate to="/home" replace />
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
