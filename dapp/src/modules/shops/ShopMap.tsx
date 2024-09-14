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
import { useShopMapStore } from "./useShopMapStore"

const DEFAULT_MAP_DATA = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 18,
}

export type ShopMapMarker = {
  lat: number
  lng: number
  isSelected: boolean
}

export type ShopMapProps = {
  markers: ShopMapMarker[]
  markerClickHandler: (index: number) => void
}

const ShopMap: FC<ShopMapProps> = ({ markers, markerClickHandler }) => {
  const [ isCenter, setIsCenter ] = useState(false)
  const map = useMap()
  const { latitude, longitude } = useGeolocation({
    enableHighAccuracy: true,
  })

  const setCurrentBound = useShopMapStore((state) => state.setCurrentBound)

  function boundChangeHandler(event: MapCameraChangedEvent) {
    if (!event.map.getBounds()) return

    setCurrentBound({
      ne_lon: event.map.getBounds()!.getNorthEast().lng(),
      ne_lat: event.map.getBounds()!.getNorthEast().lat(),
      sw_lon: event.map.getBounds()!.getSouthWest().lng(),
      sw_lat: event.map.getBounds()!.getSouthWest().lat(),
    })
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

        {markers.map((item, index) => (
          <AdvancedMarker
            key={`${item.lat}-${item.lng}`}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => markerClickHandler(index)}
          >
            <Pin
              background={"#fb7185"}
              borderColor={"#fff"}
              glyphColor={"#e11d48"}
              scale={item.isSelected ? 1.5 : 1}
            />
          </AdvancedMarker>
        ))}
      </Map>
    </>
  )
}

export default ShopMap
