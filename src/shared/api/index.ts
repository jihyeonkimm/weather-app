import axios from 'axios'

const BASE_URL = import.meta.env.VITE_OPENWEATHER_API_URL
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appId: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    return response.data
  } catch (error) {
    console.error('날씨 데이터 호출 중 오류 발생:', error)
    throw error
  }
}
