import { useWeatherQuery } from '@/entities/weather/model/useWeatherQuery';
import { SearchInput } from '@/features/search-input';
import { useGeolocation } from '@/shared/lib/useGeolocation';
import { CurrentWeatherWidget } from '@/widgets/current-weather';
import { ForecastWidget } from '@/widgets/forecast-list';
import { useState } from 'react';

export const WeatherPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const { location, error: geoError } = useGeolocation();

  // 선택된 위치가 있으면 선택된 위치로, 없으면 현재 위치로
  const currentLat = selectedLocation?.lat ?? location?.lat ?? null;
  const currentLon = selectedLocation?.lon ?? location?.lon ?? null;

  const { data, isLoading, isError } = useWeatherQuery(currentLat, currentLon);

  const handleSelectLocation = (lat: number, lon: number) => {
    setSelectedLocation({ lat, lon });
  };

  console.log(data);

  if (geoError)
    return (
      <div className="flex justify-center items-center w-full p-10 text-red-500">
        브라우저에서 위치 권한을 허용해주세요!
      </div>
    );

  return (
    <div className="min-h-screen grow px-60">
      <div className="flex justify-end w-full py-10">
        <SearchInput onSelectLocation={handleSelectLocation} />
      </div>

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
