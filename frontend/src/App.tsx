import React from "react";
import Calendar from "./Pages/Calendar/Calendar";
import EditDiary from "./Pages/Diary/EditDiary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Calendar />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:year/:month/:day",
      element: <EditDiary />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
