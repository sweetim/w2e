import {
  CustomChainConfig,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { CommonPrivateKeyProvider } from "@web3auth/base-provider"
import { Web3AuthOptions } from "@web3auth/modal"
import { Web3AuthContextConfig } from "@web3auth/modal-react-hooks"

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

const web3AuthOptions: Web3AuthOptions = {
  clientId: import.meta.env.VITE_WEB3_AUTH_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    appName: "w2eat",
  },
}

export const web3AuthProviderContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
}
