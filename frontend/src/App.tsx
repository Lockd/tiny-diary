import React from "react";
import CalendarPage from "./Pages/Calendar/CalendarPage";
import EditDiaryPage from "./Pages/EditDiary/EditDiaryPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import MainContent from "./Layout/MainContent/MainContent";
import MainPage from "./Pages/MainPage/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainContent />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/:year/:month",
          element: <CalendarPage />,
        },
        {
          path: "/:year/:month/:day",
          element: <EditDiaryPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
