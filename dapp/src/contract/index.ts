import {
  Aptos,
  AptosConfig,
} from "@aptos-labs/ts-sdk"
import { Network } from "aptos"

export function getAptosClient() {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(aptosConfig)

  return aptos
}
