import { AuthAdapter } from "@web3auth/auth-adapter"
import {
  CustomChainConfig,
  IWeb3AuthCoreOptions,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { CommonPrivateKeyProvider } from "@web3auth/base-provider"
import { Web3AuthContextConfig } from "@web3auth/no-modal-react-hooks"

const chainConfig: CustomChainConfig = {
  chainNamespace: "other",
  chainId: "0x2",
  rpcTarget: "https://grpc.testnet.aptoslabs.com",
  displayName: "Aptos Testnet",
  blockExplorerUrl: "https://explorer.aptoslabs.com/?network=testnet",
  ticker: "APT",
  tickerName: "Aptos",
}

const privateKeyProvider = new CommonPrivateKeyProvider({
  config: { chainConfig },
})

const web3AuthOptions: IWeb3AuthCoreOptions = {
  clientId: import.meta.env.VITE_WEB3_AUTH_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  sessionTime: 60 * 60 * 24 * 7,
  privateKeyProvider,
  uiConfig: {
    appName: "w2eat",
  },
}

const authAdapter = new AuthAdapter()

export const web3AuthProviderContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [ authAdapter ],
}
