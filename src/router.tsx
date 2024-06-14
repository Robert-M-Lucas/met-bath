import {createBrowserRouter} from "react-router-dom";
import _404Page from "./pages/404/404.tsx";
import IndexPage from "./pages/index/IndexPage.tsx";
import { BusinessCardPage } from "./pages/business_card/BusinessCardPage.tsx";
import { UserProfilePage } from "./pages/user_profile/UserProfilePage.tsx";
import { FakeUserProfilePage } from "./pages/user_profile/FakeUserProfilePage.tsx";
import { YouPage } from "./pages/you/YouPage.tsx";
import { OthersPage } from "./pages/others/OthersPage.tsx";
import { PreferencesPage } from "./pages/preferences/PreferencesPage.tsx";
import { SearchPage } from "./pages/search/SearchPage.tsx";

// ? Routing - see https://reactrouter.com/en/main

export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
        errorElement: <_404Page/>
    },
    {
        path: "/you",
        element: <YouPage />,
        errorElement: <_404Page/>
    },
    {
        path: "/others",
        element: <OthersPage />,
        errorElement: <_404Page/>
    },
    {
        path: "/preferences",
        element: <PreferencesPage />,
        errorElement: <_404Page/>
    },
    {
        path: "/fakeuser/:id",
        element: <FakeUserProfilePage />,
        errorElement: <_404Page/>
    },
    {
        path: "/uid/:id",
        element: <UserProfilePage username_mode={false}/>,
        errorElement: <_404Page/>
    },
    {
        path: "/user/:id",
        element: <UserProfilePage username_mode={true}/>,
        errorElement: <_404Page/>
    },
    {
        path: "/uid/:id/card",
        element: <BusinessCardPage username_mode={false} />,
        errorElement: <_404Page/>
    },
    {
        path: "/user/:id/card",
        element: <BusinessCardPage username_mode={true} />,
        errorElement: <_404Page/>
    },
    {
        path: "/search/:s",
        element: <SearchPage/>,
        errorElement: <_404Page/>
    },
]);