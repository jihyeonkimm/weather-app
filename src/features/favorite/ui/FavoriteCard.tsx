import { FavoriteItem } from '@/shared/lib/favoriteStorage';
import { useState } from 'react';
import CloseIcon from '@/shared/assets/icons/icon-close.svg';
import { useWeatherQuery } from '@/entities/weather/model/useWeatherQuery';

interface FavoriteCardProps {
  item: FavoriteItem;
  onEdit: (newLabel: string) => void; // 이름 수정 함수
  onRemove: () => void; // 삭제 함수
  onClick: () => void; // 날씨 상세 이동 함수
}

export const FavoriteCard = ({
  item,
  onEdit,
  onRemove,
  onClick,
}: FavoriteCardProps) => {
  const [disabledInput, setDisabledInput] = useState<boolean>(true);
  const [currentLabel, setCurrentLabel] = useState<string>(item.label);
  const { data, isLoading } = useWeatherQuery(item.lat, item.lon);

  const weather = data?.currentWeather;
  const temp = weather ? Math.round(weather.main.temp) : null;
  const maxTemp = data ? Math.round(data.dayMinMax.max) : null;
  const minTemp = data ? Math.round(data.dayMinMax.min) : null;
  const icon = weather?.weather[0].icon;
  const description = weather?.weather[0].description;

  const handleEditClick = () => {
    if (!disabledInput) {
      onEdit(currentLabel);
    }
    setDisabledInput((prev) => !prev);
  };

  return (
    <li
      className="relative rounded-md border border-gray-200 cursor-pointer hover:shadow-md duration-300"
      onClick={onClick}
    >
      <div className="w-full p-6">
        <div className="absolute top-6 right-6">
          <button
            type="button"
            className="text-[0px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <div className="w-20 h-20">
              <img src={CloseIcon} alt="close icon" />
            </div>
            삭제
          </button>
        </div>

        <div className="w-50 h-50">
          {isLoading ? (
            <div className="w-50 h-50 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={`${description} icon`}
            />
          )}
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="w-full h-25 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="relative flex items-center gap-2 w-full group">
              <input
                type="text"
                name="favorite-name"
                id={`${item.id}`}
                aria-describedby="favorite-name-tooltip"
                value={currentLabel}
                maxLength={10}
                disabled={disabledInput}
                className={`peer text-md font-bold min-w-0 focus-visible:outline-0 border-b ${disabledInput ? 'border-b-transparent' : 'border-gray-200'}`}
                onChange={(e) => setCurrentLabel(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <div
                className="absolute left-1/2 top-full mt-3 -translate-x-1/2 opacity-0 transition-opacity duration-200 invisible peer-focus:opacity-100 peer-focus:visible size-fit"
                id="favorite-name-tooltip"
                role="tooltip"
              >
                <div className="relative rounded bg-gray-500 px-3 py-2 text-[10px] text-white whitespace-nowrap">
                  최대 10자까지 입력할 수 있습니다.
                  <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-500"></div>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 px-3 h-20 text-[10px] text-gray-800 md:opacity-0 transition-opacity duration-200 group-hover:opacity-100 peer-focus:opacity-100 cursor-pointer rounded border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
              >
                {disabledInput ? '수정' : '완료'}
              </button>
            </div>
          )}

          <div className="flex justify-between items-end mt-6">
            {isLoading ? (
              <>
                <div className="w-30 h-32 bg-gray-200 animate-pulse rounded" />
                <div className="w-60 h-16 bg-gray-200 animate-pulse rounded" />
              </>
            ) : data ? (
              <>
                <p className="text-2xl font-semibold translate-y-4 text-(--text-gray)">
                  {temp}°
                </p>
                <p className="text-xs text-gray-500">
                  최고 {maxTemp}° / 최저 {minTemp}°
                </p>
              </>
            ) : (
              <p className="text-xs text-gray-500">날씨 정보 없음</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
