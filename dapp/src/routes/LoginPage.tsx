import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()

  const {
    isConnected,
    connect,
  } = useWeb3Auth()

  useEffect(() => {
    if (isConnected) {
      navigate("/app")
    }
  }, [ isConnected ])

  async function loginClickHandler() {
    await connect()
    navigate("/app")
  }

  return (
    <div className="flex flex-col h-full w-full bg-primary">
      <div className="flex flex-col justify-center items-center h-full w-full relative">
        <img src="/logo.png" alt="logo" className="w-32" />
        <div className="flex flex-col text-center">
          <h1 className="text-2xl text-black font-bold">w2eat</h1>
          <p className="text-zinc-500">where to eat</p>
          <p className="text-zinc-500">a dapp for finding restaurants</p>
        </div>
        <div
          onClick={loginClickHandler}
          className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl text-white rounded-3xl p-3 px-16 mt-10"
        >
          <p>LOGIN</p>
        </div>
      </div>
      <div className="flex justify-center items-center relative">
        <img src="/fruits-bg.png" alt="fruits-bg" />
        <p className="text-xs absolute bottom-1 bg-[#f4f4e9] p-1 px-2 rounded-full">
          v{__APP_VERSION__}
        </p>
      </div>
    </div>
  )
}

export default LoginPage
