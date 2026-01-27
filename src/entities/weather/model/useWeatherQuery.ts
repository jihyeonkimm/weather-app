import { getCurrentWeather, getForecast } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { getTodayMinMaxTemp } from './processWeather';

export const useWeatherQuery = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ['weather', lat, lon],

    queryFn: async () => {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(lat!, lon!),
        getForecast(lat!, lon!),
      ]);
      console.log('현재 날씨', current);
      console.log('예보 데이터', forecast);
      return { current, forecast };
    },

    enabled: !!lat && !!lon,

    select: (data) => ({
      currentWeather: data.current,
      forecastData: data.forecast.list,
      dayMinMax: getTodayMinMaxTemp(data.forecast.list),
    }),
  });
};
