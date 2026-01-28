import axios from 'axios';

const BASE_URL = import.meta.env.VITE_OPENWEATHER_API_URL;
const GEO_URL = import.meta.env.VITE_OPENWEATHER_GEO_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appId: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    });
    return response.data;
  } catch (error) {
    console.error('현재 날씨를 호출 중 오류 발생:', error);
    throw error;
  }
};

export const getForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appId: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    });

    return response.data;
  } catch (error) {
    console.error('날씨 데이터 호출 중 오류 발생:', error);
    throw error;
  }
};

export const getCoordByLocation = async (cityname: string) => {
  try {
    // 주소를 단위로 쪼갬
    const address = cityname.replace(/-/g, ' ').split(' ');
    // 광역시, 시, 도
    const first = address[0];
    // 첫번째 행정구역이 '도'일 경우, 시/군 추출
    const second = address[1];
    // 가장 작은 행정구역 단위
    const last = address[address.length - 1];

    let query = '';

    // 1. '서울' 처럼 검색어 하나만 검색한 경우
    if (address.length === 1) {
      query = `${first}, KR`;
    }
    // 2. '도' 단위인 경우, '옥동, 경상북도' 보다 '옥동, 안동시' 검색결과가 더 정확하므로 가장 작은 행정구역 단위와 시/군으로 검색
    else if (first.endsWith('도')) {
      // 단 '전북특별자치도 전주시' 처럼 행정구역이 2개이면서 '도' 단위인 경우 중복 쿼리 방지
      if (address.length === 2) {
        query = `${last}, KR`;
      } else {
        query = `${last}, ${second}, KR`;
      }
    }
    // 3. 그 외 광역시/특별시인 경우
    else {
      query = `${last}, ${first}, KR`;
    }

    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        appId: API_KEY,
        limit: 5,
      },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('해당 위치에 대한 좌표 정보를 찾을 수 없습니다.');
    }

    return {
      lat: Number(response.data[0].lat.toFixed(4)),
      lon: Number(response.data[0].lon.toFixed(4)),
    };
  } catch (error) {
    console.error('위치 좌표 변환 중 오류 발생:', error);
    throw error;
  }
};
