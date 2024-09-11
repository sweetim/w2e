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
  alone_flag: string
  memo: string
  pcd: string
  station_name: string
  image_url: string
  pickup_title: string
  pickup_user: string
}

export type TabelogData = {
  total: number
  data: TabelogMarker[]
}

export type UseTabelogArgs = {
  minLat: number
  maxLat: number
  minLon: number
  maxLon: number
  totalQuery?: number
  pageNumber?: number
}

export function useTabelog() {
  const [ data, setData ] = useState<TabelogData>({
    total: 0,
    data: [],
  })

  const [ args, setArgs ] = useState<UseTabelogArgs | null>()

  useEffect(() => {
    ;(async () => {
      if (!args) return

      const res = await fetch("/api/tabelog", {
        method: "POST",
        body: JSON.stringify({
          minLat: args.minLat,
          maxLat: args.maxLat,
          minLon: args.minLon,
          maxLon: args.maxLon,
          totalQuery: args?.totalQuery || 20,
          pageNumber: args?.pageNumber || 1,
        }),
      })

      setData(await res.json())
    })()
  }, [ args ])

  return {
    data,
    setArgs,
  }
}
