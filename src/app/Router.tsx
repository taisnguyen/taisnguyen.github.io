import React from "react";
import { HashRouter, Routes, Route, RouteObject } from "react-router-dom";
import LoadingView from "../components/LoadingView/LoadingView";

const About = React.lazy(() => import("../pages/About"));
const Resume = React.lazy(() => import("../pages/Resume"));
const Projects = React.lazy(() => import("../pages/Projects"));
const Work = React.lazy(() => import("../pages/Work"));
const Contact = React.lazy(() => import("../pages/Contact"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <About />
            </React.Suspense>
        )
    },
    {
        path: "/resume",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Resume />
            </React.Suspense>
        )
    },
    {
        path: "/projects",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Projects />
            </React.Suspense>
        )
    },
    {
        path: "/work",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Work />
            </React.Suspense>
        )
    },
    {
        path: "/contact",
        element: (
            <React.Suspense fallback={<LoadingView />}>
                <Contact />
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
