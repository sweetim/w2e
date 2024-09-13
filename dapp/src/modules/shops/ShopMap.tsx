import { GOOGLE_MAP_STYLE } from "@/config"
import { useGeolocation } from "@uidotdev/usehooks"
import {
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps"
import { FC } from "react"
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
  const { latitude, longitude } = useGeolocation()

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

  return (
    <>
      <Map
        className="h-full w-full"
        defaultCenter={{
          lat: latitude || DEFAULT_MAP_DATA.center.lat,
          lng: longitude || DEFAULT_MAP_DATA.center.lng,
        }}
        mapId={"8e0a97af9386fef"}
        defaultZoom={DEFAULT_MAP_DATA.zoom}
        styles={GOOGLE_MAP_STYLE}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onBoundsChanged={boundChangeHandler}
      >
        {markers.map((item, index) => (
          <AdvancedMarker
            key={`${item.lat}-${item.lng}`}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => markerClickHandler(index)}
          >
            <Pin
              background={item.isSelected ? "#006425" : "#fff"}
              borderColor={"#006425"}
              glyphColor={"#60d98f"}
              scale={item.isSelected ? 1.5 : 1}
            />
          </AdvancedMarker>
        ))}
      </Map>
    </>
  )
}

export default ShopMap
