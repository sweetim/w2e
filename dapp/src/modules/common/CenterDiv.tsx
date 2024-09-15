import clsx from "clsx"
import {
  FC,
  ReactElement,
} from "react"

type CenterDivProps = {
  className?: string
  children?: ReactElement | ReactElement[]
}

const CenterDiv: FC<CenterDivProps> = ({ children, className }) => {
  const divClassName = clsx(
    "flex flex-col items-center justify-center w-full h-full",
    className,
  )

  return (
    <div className={divClassName}>
      {children}
    </div>
  )
}

export default CenterDiv
