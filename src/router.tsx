import {createBrowserRouter} from "react-router-dom";
import _404Page from "./pages/404/404.tsx";
// import {SampleSidebar} from "./pages/samples/sidebar/SampleSidebar.tsx";
// import {SampleSidebarHeader} from "./pages/samples/sidebar_header/SampleSidebarHeader.tsx";
// import {SampleModal} from "./pages/samples/modal/SampleModal.tsx";
// import GraphDashboard from "./pages/dashboard/DashboardPage.tsx";
// import {TestFirestorePage} from "./pages/test firestore/TestFirestore.tsx";

// ? Routing - see https://reactrouter.com/en/main

export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
        errorElement: <_404Page/>
    },
]);