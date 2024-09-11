import { XMLParser } from "fast-xml-parser"

type TabelogMarkers = {
  markers: {
    srchinfo: TabelogSearchInfo
    marker: TabelogMarker[]
  }
}

type TabelogSearchInfo = {
  cnt: string
  nextpg: string
  prevpg: string
}

type TabelogMarker = {
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

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
})

export default async function handler(request: Request) {
  const {
    minLat,
    maxLat,
    minLon,
    maxLon,
    totalQuery = 100,
    pageNumber = 1,
  } = await request.json()

  const tabelogUrl =
    `https://tabelog.com/xml/rstmap?maxLat=${maxLat}&minLat=${minLat}&maxLon=${maxLon}&minLon=${minLon}&SrtT=rt&lst=${totalQuery}&pg=${pageNumber}`

  const data = await fetch(tabelogUrl)
    .then(res => res.text())
    .then(res => xmlParser.parse(res) as TabelogMarkers)
    .then(res => ({
      total: res.markers.srchinfo.cnt,
      data: res.markers.marker,
    }))

  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export const config = {
  runtime: "edge",
}
