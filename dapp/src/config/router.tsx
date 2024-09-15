import {
  FavoritePage,
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
        path: "",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <MapsPage />,
          },
          {
            path: "favorite",
            element: <FavoritePage />,
          },
        ],
      },
    ],
  },
])
