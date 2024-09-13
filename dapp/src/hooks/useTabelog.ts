import {
  useEffect,
  useState,
} from "react"

export type TabelogMarker = {
  id: string
  holiday: string
  icon: string
  selected_icon: string
  lat: string
  lng: string
  rsturl: string
  rvwlst_url: string
  rstname: string
  rstcat: string
  rvwcnt: string
  score: string
  lunch_score: string
  dinner_score: string
  price_range2: string
  price_range1: string
  family_flag?: string
  friends_flag?: string
  alone_flag?: string
  memo: string
  pcd: string
  station_name: string
  image_url: string
  pickup_title: string
  pickup_user: string
  vac?: string
}

export type TabelogData = {
  total: number
  data: TabelogMarker[]
}

export type UseTabelogArgs = {
  sw_lat: number
  ne_lat: number
  sw_lon: number
  ne_lon: number
  totalQuery?: number
  pageNumber?: number
}

export function useTabelog() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ data, setData ] = useState<TabelogData>({
    total: 0,
    data: [],
  })

  const [ args, setArgs ] = useState<UseTabelogArgs | null>()

  useEffect(() => {
    ;(async () => {
      if (!args) return

      setIsLoading(true)

      const res = await fetch("/api/tabelog", {
        method: "POST",
        body: JSON.stringify({
          totalQuery: 20,
          pageNumber: 1,
          ...args,
        }),
      })

      setData(await res.json())
      setIsLoading(false)
    })()
  }, [ args ])

  return {
    data,
    isLoading,
    setArgs,
  }
}
