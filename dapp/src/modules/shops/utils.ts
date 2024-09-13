import { MapBound } from "./useShopMapStore"

const FLOAT_EPISOLON = 1e-6

export function isBoundEqual(a: MapBound, b: MapBound) {
  return Math.abs(a.ne_lat - b.ne_lat) < FLOAT_EPISOLON
    && Math.abs(a.ne_lon - b.ne_lon) < FLOAT_EPISOLON
    && Math.abs(a.sw_lat - b.sw_lat) < FLOAT_EPISOLON
    && Math.abs(a.sw_lon - b.sw_lon) < FLOAT_EPISOLON
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe("isBoundEqual", () => {
    it("should return true", () => {
      const a: MapBound = {
        ne_lat: 35.62930741655891,
        ne_lon: 139.7742581466896,
        sw_lat: 35.62552266064525,
        sw_lon: 139.77656484644905,
      }
      const b: MapBound = {
        ne_lat: 35.62930741655891,
        ne_lon: 139.7742581466896,
        sw_lat: 35.62552266064525,
        sw_lon: 139.77656484644905,
      }

      expect(isBoundEqual(a, b)).toBe(true)
    })

    it("should return false", () => {
      const a: MapBound = {
        ne_lat: 35.62930741655891,
        ne_lon: 139.7742581466896,
        sw_lat: 35.62552266064525,
        sw_lon: 139.77656484644905,
      }
      const b: MapBound = {
        ne_lat: 35.62930741655891,
        ne_lon: 139.77656484644905,
        sw_lat: 35.62552266064525,
        sw_lon: 139.7742581466896,
      }

      expect(isBoundEqual(a, b)).toBe(false)
    })
  })
}
