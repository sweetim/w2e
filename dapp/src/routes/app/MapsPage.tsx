import { useTabelog } from "@/hooks/useTabelog"
import {
  FC,
  useEffect,
  useState,
} from "react"
import "swiper/css"
import "swiper/css/pagination"
import {
  Swiper,
  SwiperClass,
  SwiperSlide,
} from "swiper/react"

import {
  ShopCard,
  ShopMap,
  useShopMapStore,
} from "@/modules"
import { ShopMapMarker } from "@/modules/shops/ShopMap"
import "./MapsPage.css"

const MapsPage: FC = () => {
  const [ markers, setMarkers ] = useState<ShopMapMarker[]>([])
  const { data, setArgs, isLoading } = useTabelog()
  const [ swiper, setSwiper ] = useState<SwiperClass | null>(null)

  const activeBound = useShopMapStore((state) => state.active)

  useEffect(() => {
    if (!activeBound) return

    setArgs(activeBound)
  }, [ activeBound ])

  useEffect(() => {
    if (!swiper) return

    setMarkers(
      data.map((item, i) => ({
        data: item,
        isSelected: i === 0,
      })),
    )

    swiper.slideTo(0)
  }, [ data ])

  function swiperIndexChangeHandler(swiper: SwiperClass) {
    setMarkers(prev =>
      prev.map((item, i) => ({
        ...item,
        isSelected: i === swiper.realIndex,
      }))
    )
  }

  function markerClickHandler(index: number) {
    if (!swiper) return

    swiper.slideTo(index)
  }

  return (
    <div className="w-full h-full relative">
      <ShopMap
        isDataLoading={isLoading}
        markers={markers}
        markerClickHandler={markerClickHandler}
      />
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        centeredSlides={true}
        className="absolute bottom-3 left-0 w-full h-36"
        onRealIndexChange={swiperIndexChangeHandler}
        onSwiper={setSwiper}
      >
        {data.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <ShopCard {...item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default MapsPage
