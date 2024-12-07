import { createBrowserRouter, Outlet } from "react-router-dom";
import Signin from "../pages/AuthLayout/Signin";
import Home from "../pages/HomeLayout/Home";
import Signup from "../pages/AuthLayout/Signup";
import Tasks from "../pages/HomeLayout/Tasks";
import Chats from "../pages/HomeLayout/Chats";
import VideoCall from "../pages/HomeLayout/VideoCall";
import HomeLayout from "../layout/HomeLayout";
import CreateProject from "../pages/HomeLayout/CreateProject";
import JoinProject from "../pages/HomeLayout/JoinProject";
import Upload_your_profile_picture from "../pages/AuthLayout/Upload_your_profile_picture";
import Enter_your_name from "../pages/AuthLayout/Enter_your_name";
import Additional_info from "../pages/AuthLayout/Additional_info";
import ProjectLayout from "../layout/ProjectLayout";
import About from "../pages/HomeLayout/About";
import AdditionalProjectInfo from "../pages/HomeLayout/AdditionalProjectInfo";
import InviteMembers from "../pages/ProjectLayout/InviteMembers";
import ProjectsDashboard from "../pages/ProjectLayout/ProjectsDashboard";
import MyTasks from "../pages/ProjectLayout/MyTasks";



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
        path: 'about',
        element: <About />,
      },
      {
        path: "create-project",
        element: <CreateProject />,
      },
      {
        path:"additional-project-info",
        element:<AdditionalProjectInfo />
      },
      {
        path: "join-project",
        element: <JoinProject />,
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
      {
        path: "upload-profile-picture",
        element: <Upload_your_profile_picture />,
      },
      {
        path: "enter-your-name",
        element: <Enter_your_name />,
      },
      { 
        path: "additional-info",
        element: <Additional_info />,
      },
    ],
  },
  {
    path:"/projects",
    element: <ProjectLayout />,
    children: [
      {
        path: "",
        element: <ProjectsDashboard />
      },
      {
        path: "tasks",
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Tasks />
          },
          {
            path: "my-tasks",
            element: <MyTasks />,
          },
        ]
      },
     
      {
        path: "chats",
        element: <Chats />,
      },
      {
        path: "video-call",
        element: <VideoCall />,
      },
      {
        path: 'invite-members',
        element: <InviteMembers />,
      },
    ]
  },
  
  
]);

export default router;
