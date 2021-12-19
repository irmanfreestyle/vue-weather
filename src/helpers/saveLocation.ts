import locationList from '@/helpers/getLocationList'

export default function saveLocation (location, reorder) {
  const payload = {
    id: location.id,
    lat: location.coord.lat,
    lon: location.coord.lon,
    name: `${location.name}, ${location.sys.country}`
  }
  const locationExistIndex = locationList.findIndex(item => item.id === payload.id)

  if (locationExistIndex < 0) {
    locationList.unshift(payload)
    localStorage.setItem('location-list', JSON.stringify(locationList))
  } else {
    if (reorder) {
      locationList.splice(locationExistIndex, 1)
      locationList.unshift(payload)
      localStorage.setItem('location-list', JSON.stringify(locationList))
    }
  }
}
