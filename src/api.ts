import axios from 'axios'
const API_KEY = process.env.VUE_APP_API_KEY
interface apiType {
  searchByCity: any,
  searchById: any,
  searchByCoord: any
}

const openWeatherApi: apiType = {
  searchByCity (cityName) {
    return new Promise((resolve, reject) => {
      try {
        const URI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        axios.get(URI).then(response => {
          resolve(response)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  searchById (id) {
    return new Promise((resolve, reject) => {
      try {
        const URI = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}`
        axios.get(URI).then(response => {
          resolve(response)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  searchByCoord (lat, lon) {
    return new Promise((resolve, reject) => {
      try {
        const URI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${API_KEY}`
        axios.get(URI).then(response => {
          resolve(response)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default openWeatherApi
