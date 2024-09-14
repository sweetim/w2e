import {
  useEffect,
  useState,
} from "react"

export type TabelogMarker = {
  id: string
  holiday: string
  lat: string
  lng: string
  rsturl: string
  rstname: string
  rstcat: string
  score: string
  image_url: string
}

export type TabelogData = TabelogMarker[]

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
  const [ data, setData ] = useState<TabelogData>([])

  const [ args, setArgs ] = useState<UseTabelogArgs | null>()

  useEffect(() => {
    ;(async () => {
      if (!args) return

      setIsLoading(true)

      const res = await fetch("/api/tabelog", {
        method: "POST",
        body: JSON.stringify({
          totalQuery: 30,
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
