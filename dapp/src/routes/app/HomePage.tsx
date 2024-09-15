import { BottomNavBar } from "@/modules"
import { Outlet } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="flex flex-col h-full w-full bg-primary">
      <div className="h-full">
        <Outlet />
      </div>
      <div>
        <BottomNavBar />
      </div>
    </div>
  )
}

export default HomePage
