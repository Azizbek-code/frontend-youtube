import { createBrowserRouter } from "react-router-dom";
import AppWrapperLayout from "../layouts/AppwrapperLayout";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import WatchVideo from "../components/WatchVideo";
import UploadVide from "../components/uploadVideo";
import ShortsPage from "../pages/ShortsPage";
import ProfilePage from "../pages/ProfilePage";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapperLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "watch", 
            element: <WatchVideo />,
          },
          {
            path: "shorts",
            element:<ShortsPage/>
          },
          {
            path: "profile",
            element: <ProfilePage/>
          }
        ],
        
      },
      {
        path: 'upload/videos',
        element: <UploadVide/>
      }
    ],
  },
]);
