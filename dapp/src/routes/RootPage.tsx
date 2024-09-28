import { FC } from "react"
import { Outlet } from "react-router-dom"

const RootPage: FC = () => {
  return (
    <div className="w-full h-[100dvh] bg-primary">
      <Outlet />
    </div>
  )
}

export default RootPage
