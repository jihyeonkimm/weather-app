import { ForecastItemData } from '@/entities/weather/model/types';
import { ForecastItem } from './ForecastItem';

interface ForecastWidgetProps {
  data: ForecastItemData[];
  dayMinMax: { min: number; max: number };
}

export const ForecastWidget = ({ data, dayMinMax }: ForecastWidgetProps) => {
  const maxTemp = Math.round(dayMinMax.max);
  const minTemp = Math.round(dayMinMax.min);

  return (
    <div>
      <div className="flex justify-center items-center gap-10">
        <p>최고 : {maxTemp}°</p>
        <p>최저 : {minTemp}°</p>
      </div>
      <div className="rounded-3xl p-20 mt-30 border border-gray-200 drop-shadow-md bg-white">
        {data.map((item: ForecastItemData, index: number) => (
          <ForecastItem
            key={item.dt}
            data={item}
            isLast={index === data.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
