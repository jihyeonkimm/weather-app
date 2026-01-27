import { getTodayMinMaxTemp } from '@/entities/weather/model/processWeather';
import { getCurrentWeather, getForecast } from '@/shared/api';
import { useGeolocation } from '@/shared/lib/useGeolocation';
import { CurrentWeatherWidget } from '@/widgets/current-weather';
import { ForecastWidget } from '@/widgets/forecast-list';

import { useEffect, useState } from 'react';

export const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState(null);
  const { location, error: geoError } = useGeolocation();

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const [current, forecast] = await Promise.all([
          getCurrentWeather(lat, lon),
          getForecast(lat, lon),
        ]);
        setCurrentWeather(current);
        setForecastData(forecast);
        console.log('현재 날씨 데이터:', current);
        console.log('예보 데이터:', forecast);
      } catch (error: any) {
        setError(error.message || '날씨 데이터를 가져오는 데 실패했습니다.');
      }
    };

    if (location) {
      fetchWeather(location.lat, location.lon);
      console.log('위치 정보:', location);
    }
    if (!location) {
      console.log('위치 정보를 가져올 수 없습니다.', geoError);
    }
  }, [location]);

  if (geoError)
    return (
      <div className="p-10 text-red-500 font-bold">
        위치 권한 오류: {geoError}
      </div>
    );

  const dayMinMax = forecastData
    ? getTodayMinMaxTemp(forecastData.list)
    : { min: 0, max: 0 };

  return (
    <div className="min-h-screen grow px-60">
      <div className="text-center py-30">
        {currentWeather && <CurrentWeatherWidget data={currentWeather} />}
        {forecastData && (
          <ForecastWidget data={forecastData.list} dayMinMax={dayMinMax} />
        )}
      </div>
    </div>
  );
};
