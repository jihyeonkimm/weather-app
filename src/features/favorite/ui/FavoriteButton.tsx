import BookmarkIcon from '@/shared/assets/icons/icon-bookmark.svg';
import BookmarkFillIcon from '@/shared/assets/icons/icon-bookmark-fill.svg';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export const FavoriteButton = ({
  isFavorite,
  onClick,
}: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 md:px-10 px-6 py-6 rounded-md bg-blue-500 text-xs text-white font-semibold cursor-pointer"
    >
      <span className="block w-20 h-20 translate-y-1">
        <img
          src={isFavorite ? BookmarkFillIcon : BookmarkIcon}
          alt="bookmark icon"
        />
      </span>
      {isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
    </button>
  );
};
