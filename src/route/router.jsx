import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/AuthLayout/Signin";
import Home from "../pages/HomeLayout/Home";
import Signup from "../pages/AuthLayout/Signup";
import Tasks from "../pages/HomeLayout/Tasks";
import Chats from "../pages/HomeLayout/Chats";
import VideoCall from "../pages/HomeLayout/VideoCall";
import HomeLayout from "../layout/HomeLayout";
import CreateProject from "../pages/HomeLayout/CreateProject";
import JoinProject from "../pages/HomeLayout/JoinProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "create-project",
        element: <CreateProject />,
      },
      {
        path: "join-project",
        element: <JoinProject />, 
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "chats",
        element: <Chats />,
      },
      {
        path: "video-call",
        element: <VideoCall />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "sign-in",
        element: <Signin />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
