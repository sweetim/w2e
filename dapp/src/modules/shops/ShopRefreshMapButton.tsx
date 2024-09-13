import { ArrowClockwise } from "@phosphor-icons/react"
import { Space } from "antd"
import {
  FC,
  useMemo,
} from "react"
import { useShopMapStore } from "./useShopMapStore"
import { isBoundEqual } from "./utils"

export type ShopRefreshMapButtonProps = {
  isLoading: boolean
}

const ShopRefreshMapButton: FC<ShopRefreshMapButtonProps> = ({ isLoading }) => {
  const currentBound = useShopMapStore((state) => state.current)
  const activeBound = useShopMapStore((state) => state.active)
  const setActiveBound = useShopMapStore((state) => state.setActiveBound)

  function onClickHandler() {
    if (!currentBound) return

    setActiveBound(currentBound)
  }

  const isBoundChanged = useMemo(() => {
    if (!currentBound) return true
    if (!activeBound) return true

    return !isBoundEqual(currentBound, activeBound)
  }, [ currentBound, activeBound ])

  const showRefreshButton = isBoundChanged || isLoading

  return (
    <>
      {showRefreshButton && (
        <div className="absolute top-0 right-0 z-50 w-full flex flex-col items-center justify-center p-2">
          <div
            className="flex justify-center p-3 rounded-full min-w-32 max-w-32 bg-blue-300 hover:bg-blue-200"
            onClick={onClickHandler}
          >
            <Space>
              <ArrowClockwise className={isLoading ? "animate-spin" : ""} size={20} weight="fill" />
              <p>{isLoading ? "loading..." : "refresh"}</p>
            </Space>
          </div>
        </div>
      )}
    </>
  )
}

export default ShopRefreshMapButton
