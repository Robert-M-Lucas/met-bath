import {createBrowserRouter} from "react-router-dom";
import _404Page from "./pages/404/404.tsx";
import IndexPage from "./pages/index/IndexPage.tsx";
import UserProfilePage from "./pages/user_profile/UserProfilePage.tsx";
import { BusinessCardPage } from "./pages/business_card/BusinessCardPage.tsx";

// ? Routing - see https://reactrouter.com/en/main

export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
        errorElement: <_404Page/>
    },
    {
        path: "/user/:id",
        element: <UserProfilePage />,
        errorElement: <_404Page/>
    },
    {
        path: "/user/:id/card",
        element: <BusinessCardPage />,
        errorElement: <_404Page/>
    },
]);