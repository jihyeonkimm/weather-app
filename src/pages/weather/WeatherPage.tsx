import { useWeatherQuery } from '@/entities/weather/model/useWeatherQuery';
import { FavoriteButton } from '@/features/favorite';
import { SearchInput } from '@/features/search-input';
import {
  addFavorites,
  getFavorites,
  removeFavorite,
} from '@/shared/lib/favoriteStorage';
import { useGeolocation } from '@/shared/lib/useGeolocation';
import { CurrentWeatherWidget } from '@/widgets/current-weather';
import { ForecastWidget } from '@/widgets/forecast-list';
import { useEffect, useState } from 'react';

interface WeatherPageProps {
  selectedLocation: { lat: number; lon: number; label: string } | null;
  onSelectLocation: (lat: number, lon: number, label: string) => void;
}

export const WeatherPage = ({
  selectedLocation,
  onSelectLocation,
}: WeatherPageProps) => {
  const { location, error: geoError } = useGeolocation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 선택된 위치가 있으면 선택된 위치로, 없으면 현재 위치로
  const currentLat = selectedLocation?.lat ?? location?.lat ?? null;
  const currentLon = selectedLocation?.lon ?? location?.lon ?? null;

  const { data, isLoading, isError } = useWeatherQuery(currentLat, currentLon);

  useEffect(() => {
    if (!selectedLocation) {
      setIsFavorite(false);
      return;
    }

    const favorites = getFavorites();
    const currentId = `${selectedLocation.lat}-${selectedLocation.lon}`;
    const exists = favorites.some((fav) => fav.id === currentId);

    setIsFavorite(exists);
  }, [selectedLocation]);

  // 즐겨찾기 추가 / 해제
  const handleToggleFavorite = () => {
    if (!selectedLocation) return;

    const currentId = `${selectedLocation.lat}-${selectedLocation.lon}`;

    if (isFavorite) {
      if (window.confirm('즐겨찾기에서 해제하시겠습니까?')) {
        removeFavorite(currentId);
        setIsFavorite(false);
        window.dispatchEvent(new Event('favoriteUpdate'));
      }
    } else {
      const newFavorite = {
        id: `${selectedLocation.lat}-${selectedLocation.lon}`,
        label: selectedLocation.label,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
      };

      const confirmed = window.confirm('즐겨찾기에 추가하시겠습니까?');
      if (confirmed) {
        const success = addFavorites(newFavorite);
        if (success) {
          setIsFavorite(true);
        }
      }
    }
  };

  if (geoError)
    return (
      <div className="flex justify-center items-center w-full p-10 text-red-500">
        브라우저에서 위치 권한을 허용해주세요!
      </div>
    );

  return (
    <div className="min-h-screen grow md:px-60 px-20">
      <div className="absolute top-0 md:right-60 right-20 flex justify-end md:gap-6 gap-4 w-full py-10">
        {selectedLocation && (
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={handleToggleFavorite}
          />
        )}
        <SearchInput onSelectLocation={onSelectLocation} />
      </div>

      <div className="flex flex-col justify-center items-center min-h-screen">
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
