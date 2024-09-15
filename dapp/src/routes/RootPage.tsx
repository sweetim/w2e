import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  FC,
  useEffect,
} from "react"
import { Outlet } from "react-router-dom"

const RootPage: FC = () => {
  const {
    initModal,
    web3Auth,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      try {
        if (web3Auth) {
          await initModal()
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [ web3Auth ])

  return (
    <div className="w-full h-[100dvh]">
      <Outlet />
    </div>
  )
}

export default RootPage
