import { APIProvider } from "@vis.gl/react-google-maps"
import { Web3AuthProvider } from "@web3auth/modal-react-hooks"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { web3AuthProviderContextConfig } from "./config"
import { router } from "./config/router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3AuthProvider config={web3AuthProviderContextConfig}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
        <RouterProvider router={router} />
      </APIProvider>
    </Web3AuthProvider>
  </StrictMode>,
)
