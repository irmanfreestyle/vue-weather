const location = localStorage.getItem('location-list') || '[]'
const locationList = JSON.parse(location)

export default locationList
