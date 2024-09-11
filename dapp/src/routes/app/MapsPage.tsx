import { GOOGLE_MAP_STYLE } from "@/config"
import { useTabelog } from "@/hooks/useTabelog"
import { useGeolocation } from "@uidotdev/usehooks"
import {
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps"
import { FC } from "react"

const DEFAULT_MAP_DATA = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 18,
}

const MapsPage: FC = () => {
  const { latitude, longitude } = useGeolocation()

  const { data, setArgs } = useTabelog()
  console.log(data)
  function boundChangeHandler(event: MapCameraChangedEvent) {
    if (!event.map.getBounds()) return

    setArgs({
      minLat: event.map.getBounds()!.getNorthEast().lat(),
      maxLat: event.map.getBounds()!.getSouthWest().lat(),
      minLon: event.map.getBounds()!.getNorthEast().lng(),
      maxLon: event.map.getBounds()!.getSouthWest().lng(),
    })
  }

  return (
    <div className="w-full h-full">
      <Map
        className="h-full w-full"
        defaultCenter={DEFAULT_MAP_DATA.center}
        center={{
          lat: latitude || DEFAULT_MAP_DATA.center.lat,
          lng: longitude || DEFAULT_MAP_DATA.center.lng,
        }}
        defaultZoom={DEFAULT_MAP_DATA.zoom}
        styles={GOOGLE_MAP_STYLE}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onBoundsChanged={boundChangeHandler}
      />
    </div>
  )
}

export default MapsPage
