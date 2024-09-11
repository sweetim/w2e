import { APIProvider } from "@vis.gl/react-google-maps"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./config/router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <RouterProvider router={router} />
    </APIProvider>
  </StrictMode>,
)
