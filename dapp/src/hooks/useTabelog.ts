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
  totalQuery?: number
  pageNumber?: number
}

export function useTabelog(args?: UseTabelogArgs) {
  const [ data, setData ] = useState<TabelogData>({
    total: 0,
    data: [],
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/tabelog", {
        method: "POST",
        body: JSON.stringify({
          maxLat: 35.629858216204205,
          minLat: 35.626806028826195,
          maxLon: 139.74581054105752,
          minLon: 139.74033883466714,
          totalQuery: args?.totalQuery || 20,
          pageNumber: args?.pageNumber || 1,
        }),
      })

      setData(await res.json())
    })()
  }, [])

  return {
    data,
  }
}
