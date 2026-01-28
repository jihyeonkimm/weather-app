import { useEffect, useState } from 'react';

interface Location {
  lat: number;
  lon: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const errorHandler = (err: GeolocationPositionError) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError('사용자가 위치 정보 제공을 거부했습니다.');
          break;
        case err.POSITION_UNAVAILABLE:
          setError('위치 정보를 사용할 수 없습니다.');
          break;
        case err.TIMEOUT:
          setError('위치 정보를 가져오는 데 시간이 초과되었습니다.');
          break;
        default:
          setError('알 수 없는 오류가 발생했습니다.');
          break;
      }
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return { location, error };
};
