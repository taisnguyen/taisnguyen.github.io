import React from "react";
import { Routes, Route } from "react-router-dom";
import LoadingView from "../components/LoadingView/LoadingView";

const About = React.lazy(() => import("../pages/About"));
const Resume = React.lazy(() => import("../pages/Resume"));
const Projects = React.lazy(() => import("../pages/Projects"));
const Work = React.lazy(() => import("../pages/Work"));
const Contact = React.lazy(() => import("../pages/Contact"));

interface RouteSchema {
    path: string;
    element: React.ReactElement;
}

const routes: RouteSchema[] = [
    {
        path: "/",
        element: <About />
    },
    {
        path: "/resume",
        element: <Resume />
    },
    {
        path: "/projects",
        element: <Projects />
    },
    {
        path: "/work",
        element: <Work />
    },
    {
        path: "/contact",
        element: <Contact />
    }
];

const Router = () => {
    return (
        <Routes>
            {routes.map((route: RouteSchema) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<React.Suspense fallback={<LoadingView />}>{route.element}</React.Suspense>}
                />
            ))}
        </Routes>
    );
};

export default Router;
