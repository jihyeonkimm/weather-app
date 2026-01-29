import { CurrentWeatherData } from '@/entities/weather/model/types';

interface CurrentWeatherWidgetProps {
  data: CurrentWeatherData;
}

export const CurrentWeatherWidget = ({ data }: CurrentWeatherWidgetProps) => {
  const { name, main, weather } = data;
  const { icon, description } = weather[0];

  const temp = Math.round(main.temp);

  return (
    <div className="flex flex-col items-center">
      <div className="w-90 h-90 drop-shadow-lg">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={`${description} icon`}
        />
      </div>
      <p className="mb-10 text-sm text-(--text-gray)">{name}</p>
      <h1 className="text-5xl font-bold mb-4">{temp}°</h1>
      <p className="font-medium">{description}</p>
    </div>
  );
};
