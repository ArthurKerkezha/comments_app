import { createBrowserRouter, Navigate } from "react-router-dom";

import { CommentDetails, Comments, ErrorPage } from "../pages";
import RootLayout from "../RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Comments />,
        children: [
          {
            path: "/:id",
            element: <Comments />,
          },
        ],
      },
      {
        path: "/comments/:commentId",
        element: <CommentDetails />,
      },
      {
        path: "*",
        element: <Navigate replace to="/" />,
      },
    ],
  },
]);
