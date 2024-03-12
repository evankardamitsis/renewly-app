import { useRoutes} from "react-router-dom";
import React from "react";
import LoadingComponent from "../components/@common/LoadingComponent.tsx";
import DashboardLayout from "../layouts/dashboard-layout.tsx";
import {Protect} from "@clerk/clerk-react";


const NotFound = React.lazy(() => import("../pages/not-found/NotFound.tsx"));
const DashboardPage = React.lazy(() => import("../pages/dashboard/Dashboard.tsx"));
const SignInPage = React.lazy(() => import("../pages/sign-in/SignIn.tsx"));
const SignUpPage = React.lazy(() => import("../pages/sign-up/SignUp.tsx"));
const Projects = React.lazy(() => import("../pages/projects/index.tsx"));

export default function Routes() {
    return useRoutes([
        {
            path: "*",
            element: <NotFound />,
        },
        {
            path: "/sign-in",
            element: (
                <React.Suspense fallback={<LoadingComponent />}>
                    <SignInPage />
                </React.Suspense>
            )
        },
        {
            path: "/sign-up",
            element: (
                <React.Suspense fallback={<LoadingComponent />}>
                    <SignUpPage />
                </React.Suspense>
            )
        },
        {
            path: "/",
            element:(
                <Protect>
                    <DashboardLayout />
                </Protect>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <React.Suspense fallback={<LoadingComponent />}>
                            <DashboardPage />
                        </React.Suspense>
                    ),
                },
                {
                    path: "projects",
                    element: (
                        <React.Suspense fallback={<LoadingComponent />}>
                            <Projects />
                        </React.Suspense>
                    ),
                },
            ],
        },
    ]);
}
