import { getCurrentWeather, getForecast } from '@/shared/api';
import { useGeolocation } from '@/shared/lib/useGeolocation';
import { useEffect, useState } from 'react';

interface WeatherItemProps {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

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

  return (
    <div className="min-h-screen grow px-60">
      <div className="text-center py-30">
        {/* {error && <p className="text-red-500">에러: {error}</p>} */}
        {currentWeather && (
          <div className="flex flex-col items-center">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p className="text-sm">{currentWeather.name}</p>
            <h1 className="text-5xl font-bold mb-4">
              {Math.trunc(currentWeather.main.temp)}
            </h1>
            <p>{currentWeather.weather[0].description}</p>
          </div>
        )}
        {forecastData && (
          <div className="mt-4 p-4">
            <div className="flex justify-center items-center gap-10">
              <p>최저 : {Math.trunc(forecastData.list[0].main.temp_min)}</p>
              <p>최고 : {Math.trunc(forecastData.list[0].main.temp_max)}</p>
            </div>

            <div>
              {forecastData.list.map(
                (weather: WeatherItemProps, index: number) => (
                  <div
                    key={`${weather.dt}-${index}`}
                    className="flex justify-between items-center"
                  >
                    <p>{weather.dt_txt}</p>
                    <p>{weather.main.temp}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
