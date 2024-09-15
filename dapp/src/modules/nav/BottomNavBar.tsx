import {
  BookmarksSimple,
  Icon,
  MapTrifold,
  UserCircleGear,
  Wallet,
} from "@phosphor-icons/react"
import clsx from "clsx"
import { FC } from "react"
import {
  Link,
  useLocation,
} from "react-router-dom"
import { match } from "ts-pattern"

type NavBarItem = {
  to: string
  icon: Icon
}

const navBarItems: NavBarItem[] = [
  {
    to: "/",
    icon: MapTrifold,
  },
  {
    to: "/favorite",
    icon: BookmarksSimple,
  },
  {
    to: "/app/wallet",
    icon: Wallet,
  },
  {
    to: "/app/settings",
    icon: UserCircleGear,
  },
]

const BottomNavBar: FC = () => {
  const location = useLocation()
  const currentToRoute = location.pathname
    .split("/", 3)
    .join("/")

  return (
    <div className="w-full h-12 border-none z-50">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navBarItems.map((item, index) => {
          const isPathMatching = currentToRoute === item.to

          const spanClassName = clsx(
            "text-sm text-gray-500 group-hover:text-[#1677FF]",
            {
              "text-[#1677FF]": isPathMatching,
            },
          )

          const navIconColor = match(isPathMatching)
            .with(true, () => "#1677FF")
            .otherwise(() => "#6b7280")

          const NavIcon = item.icon

          return (
            <Link
              to={item.to}
              className="inline-flex flex-col items-center justify-center px-5 group"
              key={index}
            >
              <NavIcon
                size={32}
                color={navIconColor}
                weight="fill"
                className="group-hover:fill-[#1677FF]"
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavBar
