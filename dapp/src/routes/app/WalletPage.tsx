import { getAptosClient } from "@/contract"
import { useCoinsData } from "@/hooks"
import { useAptosAccountInfo } from "@/hooks/useAptosAccountInfo"

import {
  FC,
  useEffect,
} from "react"
import {
  match,
  P,
} from "ts-pattern"

const aptosClient = getAptosClient()

const WalletPage: FC = () => {
  const { accountAddress } = useAptosAccountInfo()
  const { coinsData } = useCoinsData()

  useEffect(() => {
    ;(async () => {
      if (!accountAddress) return

      const amount = coinsData?.filter(item => item.symbol === "APT")[0].amount || 0

      if (amount < 1e-2) {
        await aptosClient.fundAccount({
          accountAddress,
          amount: Math.pow(10, 8),
        })
        console.log("funded")
      }
    })()
  }, [ coinsData ])

  return (
    <div className="flex flex-col h-full w-full bg-primary">
      <div className="flex flex-col h-full w-full gap-2">
        <h1 className="p-2">
          <strong>Tokens</strong>
        </h1>
        <div className="w-full h-full overflow-auto">
          {match(coinsData)
            .with(P.array(P.any), (data) => {
              return data.map((item) => (
                <div className="flex flex-row items-center gap-3 p-2 hover:bg-zinc-200">
                  <img src={item.iconUri} alt={`${item.symbol} icon`} className="w-8 h-8 rounded-full" />
                  <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-col">
                      <h2 className="text-lg font-bold">{item.symbol}</h2>
                      <p className="text-sm text-zinc-600">{item.name}</p>
                    </div>
                    <p className="text-xl font-bold">{item.amount?.toString()}</p>
                  </div>
                </div>
              ))
            })
            .otherwise(() => null)}
        </div>
      </div>
    </div>
  )
}

export default WalletPage
