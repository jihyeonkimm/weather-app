import dayjs from 'dayjs';
import { ForecastItemData } from './types';

// 5 day / 3 hour forecast data에서 현재 날짜에 해당하는 데이터를 추출해서 최저 기온과 최고 기온을 계산한다.
export const getTodayMinMaxTemp = (data: ForecastItemData[]) => {
  if (!data || data.length === 0) {
    return { min: 0, max: 0 };
  }

  // 1. 오늘 날짜
  const today = dayjs().format('YYYY-MM-DD');

  // 2. dt_txt에 오늘 날짜인 데이터만 필터링한다.
  const todayData = data.filter((item) => item.dt_txt.startsWith(today));

  // 3. 필터링 된 데이터 중에서 최저기온과 최고기온을 뽑아낸다.
  const maxs = todayData.map((item) => item.main.temp_max);
  const mins = todayData.map((item) => item.main.temp_min);

  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
  };
};
