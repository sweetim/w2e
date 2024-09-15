import { ProtectedRoute } from "@/modules/common"
import {
  FavoritePage,
  HomePage,
  LoginPage,
  MapsPage,
  RootPage,
  SettingsPage,
  WalletPage,
} from "@/routes"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <MapsPage />,
          },
          {
            path: "favorite",
            element: <FavoritePage />,
          },
          {
            path: "wallet",
            element: <WalletPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
])
