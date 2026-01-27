import { useWeatherQuery } from '@/entities/weather/model/useWeatherQuery';
import { useGeolocation } from '@/shared/lib/useGeolocation';
import { CurrentWeatherWidget } from '@/widgets/current-weather';
import { ForecastWidget } from '@/widgets/forecast-list';

export const WeatherPage = () => {
  const { location, error: geoError } = useGeolocation();
  const { data, isLoading, isError } = useWeatherQuery(
    location?.lat ?? null,
    location?.lon ?? null,
  );

  if (geoError)
    return (
      <div className="flex justify-center items-center w-full p-10 text-red-500">
        브라우저에서 위치 권한을 허용해주세요!
      </div>
    );

  return (
    <div className="min-h-screen grow px-60">
      <div className="flex flex-col justify-center items-center h-full">
        {isLoading && (
          <div className="flex flex-col justify-center items-center gap-10">
            <p className="text-4xl">⏳</p>
            <p>날씨 정보를 가져오는 중입니다.</p>
          </div>
        )}

        {isError && !isLoading && (
          <div className="flex flex-col justify-center items-center gap-10">
            <p className="text-4xl">⚠️</p>
            <p>데이터를 불러올 수 없습니다.</p>
          </div>
        )}

        {data && (
          <div className="w-full py-40">
            <CurrentWeatherWidget data={data.currentWeather} />
            <ForecastWidget
              data={data.forecastData}
              dayMinMax={data.dayMinMax}
            />
          </div>
        )}
      </div>
    </div>
  );
};
