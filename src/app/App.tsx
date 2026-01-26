import { getWeather } from '@/shared/api'
import { useGeolocation } from '@/shared/lib/useGeolocation'
import { useEffect, useState } from 'react'

function App() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [error, setError] = useState(null)
  const { location, error: geoError } = useGeolocation()

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await getWeather(lat, lon)
        setWeatherData(response)
        console.log('날씨 데이터:', response)
      } catch (error: any) {
        setError(error.message || '날씨 데이터를 가져오는 데 실패했습니다.')
      }
    }

    if (location) {
      fetchWeather(location.lat, location.lon)
      console.log('위치 정보:', location)
    }
    if (!location) {
      console.log('위치 정보를 가져올 수 없습니다.', geoError)
    }
  }, [location])

  if (geoError)
    return (
      <div className="p-10 text-red-500 font-bold">
        위치 권한 오류: {geoError}
      </div>
    )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Weather App</h1>
        {error && <p className="text-red-500">에러: {error}</p>}
        {weatherData && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p>지역: {weatherData.city.name}</p>
            <p>현재 기온: {weatherData.list[0].main.temp}°C</p>
            <p>최저 기온 : {weatherData.list[0].main.temp_min}</p>
            <p>최고 기온 : {weatherData.list[0].main.temp_max}</p>
            <p>날씨 상태: {weatherData.list[0].weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
