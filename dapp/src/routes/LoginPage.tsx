import { WALLET_ADAPTERS } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/no-modal-react-hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()

  const {
    isConnected,
    connectTo,
  } = useWeb3Auth()

  useEffect(() => {
    if (isConnected) {
      navigate("/app")
    }
  }, [ isConnected ])

  async function loginClickHandler() {
    await connectTo(
      WALLET_ADAPTERS.AUTH,
      {
        loginProvider: "google",
      },
    )

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
          className="bg-zinc-800 hover:bg-zinc-600 text-white rounded-3xl p-3 px-4 mt-10"
        >
          <div className="flex flex-row gap-3 items-center">
            <img src="/google-logo.png" alt="google-logo" className="w-6" />
            <p>Sign in with Google</p>
          </div>
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
