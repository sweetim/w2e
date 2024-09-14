import { XMLParser } from "fast-xml-parser"
import {
  match,
  P,
} from "ts-pattern"

type TabelogMarkers = {
  markers: {
    srchinfo: TabelogSearchInfo
    marker: TabelogMarker | TabelogMarker[]
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
    sw_lat,
    sw_lon,
    ne_lat,
    ne_lon,
    totalQuery = 100,
    pageNumber = 1,
  } = await request.json()

  const tabelogUrl =
    `https://tabelog.com/xml/rstmap?maxLat=${ne_lat}&minLat=${sw_lat}&maxLon=${ne_lon}&minLon=${sw_lon}&SrtT=rt&lst=${totalQuery}&pg=${pageNumber}`

  const data = await fetch(tabelogUrl)
    .then(res => res.text())
    .then(res => xmlParser.parse(res) as TabelogMarkers)
    .then(res =>
      match(res.markers.marker)
        .with(P.array(P.any), (res) => res)
        .with(P.nullish, () => [])
        .otherwise((res) => [ res ])
    )

  return new Response(
    JSON.stringify(data.map(item => ({
      id: item.id,
      holiday: item.holiday,
      lat: item.lat,
      lng: item.lng,
      rsturl: item.rsturl,
      rstname: item.rstname,
      rstcat: item.rstcat,
      score: item.score,
      image_url: item.image_url,
    }))),
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
