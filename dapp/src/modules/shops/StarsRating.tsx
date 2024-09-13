import {
  Star,
  StarHalf,
} from "@phosphor-icons/react"
import { FC } from "react"

type StarsRatingProps = {
  score: number
}

const StarsRating: FC<StarsRatingProps> = ({ score }) => {
  return (
    <div className="flex flex-row items-center">
      {Array.from({ length: 5 }).fill(null).map((_, i) => {
        const quotient = Math.floor(score)
        const remainder = score % 1

        if (quotient > i) return <Star key={i} size={20} weight="fill" color="#FDD017" />
        if ((quotient === i) && remainder >= 0.5) return <StarHalf key={i} size={20} color="#FDD017" weight="fill" />
        return <Star key={i} size={20} weight="fill" color="#aaa" />
      })}
    </div>
  )
}

export default StarsRating
