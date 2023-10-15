import React from "react";
import Calendar from "./Pages/Calendar/Calendar";
import EditDiary from "./Pages/Diary/EditDiary";
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
          element: <EditDiary />,
        },
        {
          path: "/",
          element: <Calendar />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
