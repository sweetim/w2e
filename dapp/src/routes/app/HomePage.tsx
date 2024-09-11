import { BottomNavBar } from "@/modules"
import { Outlet } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full w-full">
        <Outlet />
      </div>
      <BottomNavBar />
    </div>
  )
}

export default HomePage
