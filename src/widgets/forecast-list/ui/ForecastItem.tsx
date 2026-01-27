import { ForecastItemData } from '@/entities/weather/model/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface ForecastItemProps {
  data: ForecastItemData;
  isLast?: boolean;
}

export const ForecastItem = ({ data, isLast }: ForecastItemProps) => {
  const { dt_txt, main, weather } = data;
  const { icon, description } = weather[0];
  const formattedDate = dayjs(dt_txt).format('M월 D일 H시');

  return (
    <div
      className={`flex justify-between items-center py-6 ${!isLast ? 'border-b border-gray-200' : ''}`}
    >
      <div className="flex justify-between items-center gap-40">
        <p className="w-90 text-left text-sm text-(--text-gray)">
          {formattedDate}
        </p>
        <div className="w-30 h-30">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={`${description} icon`}
          />
        </div>
      </div>
      <p className="font-bold">{Math.trunc(main.temp)}°</p>
    </div>
  );
};
