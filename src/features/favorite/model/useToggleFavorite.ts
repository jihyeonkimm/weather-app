import {
  addFavorites,
  getFavorites,
  removeFavorite,
} from '@/shared/lib/favoriteStorage';
import { useEffect, useState } from 'react';

export const useToggleFavorite = (
  selectedLocation: {
    lat: number;
    lon: number;
    label: string;
  } | null,
) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedLocation) {
      setIsFavorite(false);
      return;
    }

    const favorites = getFavorites();
    const currentId = `${selectedLocation.lat}-${selectedLocation.lon}`;
    const exists = favorites.some((favorite) => favorite.id === currentId);

    setIsFavorite(exists);
  }, [selectedLocation]);

  // 즐겨찾기 추가 / 해제
  const handleToggleFavorite = () => {
    if (!selectedLocation) return;

    const currentId = `${selectedLocation.lat}-${selectedLocation.lon}`;

    if (isFavorite) {
      if (window.confirm('즐겨찾기에서 삭제하시겠습니까?')) {
        removeFavorite(currentId);
        setIsFavorite(false);
        window.dispatchEvent(new Event('favoriteUpdate'));
      }
    } else {
      const newFavorite = {
        id: currentId,
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

  return { isFavorite, handleToggleFavorite };
};
