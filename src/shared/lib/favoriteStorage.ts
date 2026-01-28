export interface FavoriteItem {
  id: string;
  label: string;
  lat: number;
  lon: number;
}

const STORAGE_KEY = 'weather-favorite';

export const getFavorites = (): FavoriteItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addFavorites = (item: FavoriteItem) => {
  const favorites = getFavorites();

  if (favorites.length >= 6) {
    alert('즐겨찾기는 최대 6개까지만 등록 가능합니다.');
    return false;
  }

  const isExist = favorites.some((favorite) => favorite.id === item.id);
  if (isExist) {
    alert('이미 즐겨찾기에 등록된 지역입니다.');
    return false;
  }

  const newFavorites = [...favorites, item];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  window.dispatchEvent(new Event('favoriteUpdate'));
  return true;
};

export const removeFavorite = (id: string) => {
  const favorites = getFavorites();
  const filtered = favorites.filter((favorite) => favorite.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('favoriteUpdate'));
};

export const updateFavoriteLabel = (id: string, newLabel: string) => {
  const favorites = getFavorites();
  const updated = favorites.map((favorite) =>
    favorite.id === id ? { ...favorite, label: newLabel } : favorite,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
