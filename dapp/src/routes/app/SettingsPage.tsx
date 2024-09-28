import { useAptosAccountInfo } from "@/hooks"
import { IdentificationBadge } from "@phosphor-icons/react"
import { useWeb3Auth } from "@web3auth/no-modal-react-hooks"
import {
  FC,
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"

const SettingsPage: FC = () => {
  const navigate = useNavigate()
  const [ profileImage, setProfileImage ] = useState("")
  const { account } = useAptosAccountInfo()

  const {
    logout,
    userInfo,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (userInfo && userInfo.profileImage) {
        setProfileImage(userInfo.profileImage)
      }
    })()
  })

  async function logoutClickHandler() {
    await logout()
    navigate("/")
  }
  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-primary">
      <div className="flex flex-col items-center justify-center gap-3">
        <img className="w-32 h-32 rounded-full" src={profileImage} />
        <div className="flex flex-row gap-2 items-center bg-zinc-300 p-2 rounded-full">
          <IdentificationBadge size={20} weight="duotone" />
          <p className="overflow-hidden truncate w-48">
            {account?.accountAddress.toString()}
          </p>
        </div>
        <div
          onClick={logoutClickHandler}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-3xl p-3 px-16 mt-10"
        >
          <p>LOGOUT</p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
