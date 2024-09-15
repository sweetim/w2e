import { useAptosAccountInfo } from "@/hooks"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Button,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
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
    <div className="w-full text-center mt-20 bg-primary">
      <Space direction="vertical" size="large" align="center">
        <Avatar size={128} src={profileImage} />
        <Paragraph
          style={{ width: 300 }}
          ellipsis
          copyable
          className="font-bold"
        >
          {account?.accountAddress.toString()}
        </Paragraph>
        <Button type="primary" size="large" onClick={logoutClickHandler}>
          LOGOUT
        </Button>
      </Space>
    </div>
  )
}

export default SettingsPage
