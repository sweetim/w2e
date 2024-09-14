import { TabelogMarker } from "@/hooks/useTabelog"
import { BookmarkSimple } from "@phosphor-icons/react"
import { Space } from "antd"
import { FC } from "react"
import ShopOperationDayInformation from "./ShopOperationDayInformation"
import StarsRating from "./StarsRating"

const ShopCard: FC<TabelogMarker> = (item) => {
  function cardClickHandler() {
    window.open(
      `https://tabelog.com${item.rsturl}`,
      "_blank",
    )
  }

  return (
    <div
      onClick={cardClickHandler}
      className="bg-blue-100 h-full rounded-3xl p-3"
    >
      <Space direction="vertical" className="w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-base font-black line-clamp-1 mr-5">
            {item.rstname}
          </h1>

          <BookmarkSimple
            // onClick={bookmarkClickHandler}
            size={20}
            color="#d4d4d8"
            weight="fill"
            // color={props.isBookmark ? "#f0a9a7" : "#aaa"}
            // weight={props.isBookmark ? "fill" : "duotone"}
          />
        </div>
        <div className="flex flex-row">
          <img
            src={item.image_url}
            className="rounded-xl w-24 h-24 object-cover"
          />
          <div className="flex flex-col w-full px-2 py-1 gap-2">
            <div className="flex justify-between w-full">
              <StarsRating score={Number(item.score)} />
              <p className="text-base font-bold">{item.score}</p>
            </div>
            <p className="line-clamp-1">{item.rstcat}</p>

            <ShopOperationDayInformation holiday={item.holiday} />
          </div>
        </div>
      </Space>
    </div>
  )
}

export default ShopCard
