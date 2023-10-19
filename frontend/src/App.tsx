import React from "react";
import CalendarPage from "./Pages/Calendar/CalendarPage";
import EditDiaryPage from "./Pages/EditDiary/EditDiaryPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import MainContent from "./Layout/MainContent/MainContent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainContent />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/:year/:month/:day",
          element: <EditDiaryPage />,
        },
        {
          path: "/",
          element: <CalendarPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
