import { TabelogMarker } from "@/hooks/useTabelog"
import { useGeolocation } from "@uidotdev/usehooks"
import {
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps"
import {
  FC,
  useEffect,
  useState,
} from "react"
import {
  match,
  P,
} from "ts-pattern"
import ShopRefreshMapButton from "./ShopRefreshMapButton"
import { useShopMapStore } from "./useShopMapStore"

const DEFAULT_MAP_DATA = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 18,
}

export type ShopMapMarker = {
  data: TabelogMarker
  isSelected: boolean
}

export type ShopMapProps = {
  isDataLoading: boolean
  markers: ShopMapMarker[]
  markerClickHandler: (index: number) => void
}

const ShopMap: FC<ShopMapProps> = ({ isDataLoading, markers, markerClickHandler }) => {
  const [ isFirstRender, setIsFirstRender ] = useState(true)
  const [ isCenter, setIsCenter ] = useState(false)
  const map = useMap()
  const { latitude, longitude, loading: isLocationLoading } = useGeolocation({
    enableHighAccuracy: true,
  })

  const setCurrentBound = useShopMapStore((state) => state.setCurrentBound)
  const setActiveBound = useShopMapStore((state) => state.setActiveBound)

  function boundChangeHandler(event: MapCameraChangedEvent) {
    if (!event.map.getBounds()) return

    const bound = {
      ne_lon: event.map.getBounds()!.getNorthEast().lng(),
      ne_lat: event.map.getBounds()!.getNorthEast().lat(),
      sw_lon: event.map.getBounds()!.getSouthWest().lng(),
      sw_lat: event.map.getBounds()!.getSouthWest().lat(),
    }

    setCurrentBound(bound)

    if (isFirstRender) {
      setActiveBound(bound)
      setIsFirstRender(false)
    }
  }

  useEffect(() => {
    if (!map) return
    if (!latitude) return
    if (!longitude) return
    if (isCenter) return

    map.setCenter({ lat: latitude, lng: longitude })

    setIsCenter(true)
  }, [ isCenter, map, latitude, longitude ])

  return (
    <>
      <style>
        {`.gm-style div {
            border: none !important;
          }`}
      </style>
      {isLocationLoading
        ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-primary">
            <img src="/loading.gif" alt="loading" />
            <p className="text-zinc-500">locating...</p>
          </div>
        )
        : (
          <>
            <ShopRefreshMapButton isLoading={isDataLoading} />
            <Map
              className="h-full w-full"
              mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
              defaultCenter={{
                lat: DEFAULT_MAP_DATA.center.lat,
                lng: DEFAULT_MAP_DATA.center.lng,
              }}
              defaultZoom={DEFAULT_MAP_DATA.zoom}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              clickableIcons={false}
              onBoundsChanged={boundChangeHandler}
            >
              {match([ latitude, longitude ])
                .with([ P.number, P.number ], ([ lat, lng ]) => (
                  <AdvancedMarker
                    position={{
                      lat,
                      lng,
                    }}
                  >
                    <div className="pulsating-circle" />
                  </AdvancedMarker>
                ))
                .otherwise(() => null)}

              {markers.map((item, index) => {
                const [ backgroundColor, glyphColor ] = match([ item.isSelected, Number(item.data.score) ])
                  .with([ true, P.any ], () => [ "#0ea5e9", "#7dd3fc" ])
                  .with([ false, P.number.gte(3.5) ], () => [ "#fb7185", "#e11d48" ])
                  .with([ false, P.number.gte(3.3) ], () => [ "#fda4af", "#fb7185" ])
                  .otherwise(() => [ "#9ca3af", "#6b7280" ])

                return (
                  <AdvancedMarker
                    key={`${item.data.id}`}
                    position={{
                      lat: Number(item.data.lat),
                      lng: Number(item.data.lng),
                    }}
                    onClick={() => markerClickHandler(index)}
                  >
                    <Pin
                      background={backgroundColor}
                      borderColor={"#FFF"}
                      glyphColor={glyphColor}
                      scale={item.isSelected ? 1.5 : 1}
                    />
                  </AdvancedMarker>
                )
              })}
            </Map>
          </>
        )}
    </>
  )
}

export default ShopMap
