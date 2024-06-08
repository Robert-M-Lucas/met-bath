import {createBrowserRouter} from "react-router-dom";
import _404Page from "./pages/404/404.tsx";
import IndexPage from "./pages/index/IndexPage.tsx";
import UserProfile from "./pages/user_profile/UserProfile.tsx";

// ? Routing - see https://reactrouter.com/en/main

export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
        errorElement: <_404Page/>
    },
    {
        path: "/user/:id",
        element: <UserProfile />,
        errorElement: <_404Page/>
    },
]);