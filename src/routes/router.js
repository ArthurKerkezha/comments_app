import { createBrowserRouter, Navigate } from "react-router-dom";

import { CommentDetails, CommentsList, ErrorPage } from "../pages";
import RootLayout from "../RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CommentsList />,
        children: [
          {
            path: "/:id",
            element: <CommentsList />,
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
