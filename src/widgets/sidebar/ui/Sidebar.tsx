import { FavoriteCard } from '@/features/favorite';
import {
  FavoriteItem,
  getFavorites,
  removeFavorite,
  updateFavoriteLabel,
} from '@/shared/lib/favoriteStorage';
import { useEffect, useState } from 'react';
import ArrowIcon from '@/shared/assets/icons/icon-arrow.svg';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelectLocation: (lat: number, lon: number, label: string) => void;
}

export const Sidebar = ({
  isOpen,
  setIsOpen,
  onSelectLocation,
}: SidebarProps) => {
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);

  const handleRemove = (id: string) => {
    const confirmed = window.confirm('삭제하시겠습니까?');

    if (confirmed) {
      removeFavorite(id);
      setFavoriteList(getFavorites());
    }
  };

  const handleEdit = (id: string, newLabel: string) => {
    if (!newLabel.trim()) {
      alert('장소 이름은 1글자 이상 입력해주세요.');
      setFavoriteList(getFavorites());
      return;
    }

    updateFavoriteLabel(id, newLabel);
    setFavoriteList(getFavorites());
    window.dispatchEvent(new Event('favoriteUpdate'));
  };

  useEffect(() => {
    const favorites = getFavorites();
    setFavoriteList(favorites);
  }, []);

  return (
    <>
      {/* 모바일 오버레이 배경 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 토글 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-50 z-30 bg-white border border-l-0 border-gray-200 rounded-r-md px-8 py-10 shadow-md transition-all duration-300 cursor-pointer ${isOpen ? 'left-200' : 'left-0'}`}
        aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
      >
        <div
          className={`w-16 h-16 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <img src={ArrowIcon} alt="arrow icon" />
        </div>
      </button>

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 min-h-screen h-full w-200 border-r border-gray-200 px-10 py-20 z-20 overflow-auto bg-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-xs text-gray-700">즐겨찾기</h2>
        <ul className="flex flex-col gap-10 mt-10">
          {favoriteList.length > 0 ? (
            favoriteList.map((favorite: FavoriteItem, index: number) => (
              <FavoriteCard
                key={`${favorite.id}-${index}`}
                item={favorite}
                onEdit={(newLabel: string) => {
                  handleEdit(favorite.id, newLabel);
                }}
                onRemove={() => {
                  handleRemove(favorite.id);
                }}
                onClick={() => {
                  onSelectLocation(favorite.lat, favorite.lon, favorite.label);
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              />
            ))
          ) : (
            <p className="mt-10 text-xs text-gray-400">
              등록된 즐겨찾기가 없습니다.
            </p>
          )}
        </ul>
      </aside>
    </>
  );
};
