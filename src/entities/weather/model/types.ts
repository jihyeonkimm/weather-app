interface Weather {
  icon: string;
  description: string;
}

interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface CurrentWeatherData {
  id: number;
  name: string;
  main: Main;
  weather: Weather[];
}

export interface ForecastItemData {
  dt: number;
  dt_txt: string;
  main: Main;
  weather: Weather[];
}
