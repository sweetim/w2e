import {
  HomePage,
  MapsPage,
  RootPage,
} from "@/routes"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "app",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <MapsPage />,
          },
        ],
      },
    ],
  },
])
