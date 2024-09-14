import clsx from "clsx"
import dayjs from "dayjs"
import ja from "dayjs/locale/ja"
import { FC } from "react"

type ShopOperationDayInformationProps = {
  holiday: string
}

const ShopOperationDayInformation: FC<ShopOperationDayInformationProps> = ({ holiday }) => {
  const tokens = holiday.split("、").map(token => token.charAt(0))

  const days = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
    "祝",
  ]

  return (
    <div className="flex flex-row gap-1">
      {days.map(day => {
        const dateClassName = clsx(
          "p-1 rounded-full w-5 h-5 text-white flex justify-center items-center",
          {
            "bg-red-500": tokens.includes(day),
            "bg-green-500": !tokens.includes(day),
            "hidden": day === days.at(-1) && !tokens.includes(days.at(-1)!),
            "ring-offset-1 ring-2 ring-blue-500": day === dayjs(new Date()).locale(ja).format("ddd"),
          },
        )
        return (
          <div key={day} className={dateClassName}>
            <p className="text-xs">{day}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ShopOperationDayInformation
