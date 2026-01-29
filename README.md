# Weather App

React와 TypeScript, OpenWeatherMap API를 사용한 날씨 앱입니다.
FSD(Feature-Sliced Design) 아키텍처를 기반으로 구현되었으며, 현재 위치 기반 날씨 조회와 한국 행정구역 검색, 즐겨찾기 기능을 제공합니다.

## ✨ 프로젝트 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 추가해주세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🛠 기술 스택

### Core

- **React**
- **TypeScript**
- **Vite**

### State Management & Data Fetching

- **@tanstack/react-query** 서버 상태 관리 및 캐싱
- **Axios** HTTP 클라이언트

### Styling

- **Tailwind CSS** CSS 프레임워크

### Utilities

- **Day.js** 날짜/시간 포매팅

### Architecture

- **FSD (Feature-Sliced Design)**

## 주요 기능 설명

### 🌍 위치 기반 날씨 조회

- navigator.geolocation을 사용한 현재 위치 자동 감지
- OpenWeatherMap API를 사용한 날씨 데이터 연동
- 현재 날씨(Current Weather), 5일간의 3시간 간격 날씨 예보(5 day / 3 hour forecast) 데이터 사용
- 5일간 예보 중 당일 날짜에 해당하는 예보만 추출하여 그 중 최저/최고기온을 각각 비교해서 추출

### 🔍 한국 행정구역 검색

- OpenWeatherMap Geocoding API를 통한 좌표 변환
- 한국 주소 검색 최적화
- 드롭다운 UI로 검색 결과 선택

### ⭐ 즐겨찾기 관리

- 최대 6개 지역 즐겨찾기 등록
- LocalStorage 기반 저장
- 실시간 날씨 정보가 포함된 즐겨찾기 카드
- 카드 선택 시 해당 지역 날짜 정보 노출
- 즐겨찾기 이름 수정 (최대 10자)

## 기술적 의사 결정 및 이유

### FSD 아키텍처 사용

- Entities: 날씨 데이터 모델 및 데이터 정제 로직(최저/최고 기온 추출)
- Features: 검색 및 즐겨찾기 등 사용자의 상호작용이 발생하는 기능 개발
- Widgets: Entity, Feature와 관련된 기능이 포함된 UI 구성
- Shared: API 통신, 로컬스토리지 저장, 현재 위치 감지 등 프로젝트 전반에서 사용되는 로직과 아이콘 등 공통 디자인 에셋 관리

### Tanstack Query를 사용한 서버 상태 관리

- 라이브러리에서 제공하는 data, IsLoading, IsError 상태를 사용해 선언적 코드 작성
- 검색했던 지역이나 즐겨찾기 목록에서 불필요한 API 요청 없이 캐시된 데이터를 보여주도록 해서 사용자 경험 최적화

### 한국 지역 검색 최적화

**문제:**

- OpenWeatherMap API가 한국 주소 구조를 정확히 인식하지 못함. 특히 전체 주소를 검색할 경우 정확한 결과가 나오지 않음

**해결 방법:**

- 테스트 결과 영문주소 형식으로 검색 + 전체 주소 입력보다 가장 작은 행정구역과 가장 큰 행정구역을 같이 검색했을 때 정확도가 높은 것을 확인
- 단일 검색어는 "서울" → "서울, KR" 형식 사용
- "울산시 남구 옥동" → "옥동, 울산시, KR" 형식으로 변환
- "경상북도 예천군 덕신리", "경상북도 울진군 덕신리" 처럼 가장 큰 행정구역과 작은 행정구역이 모두 중복되는 경우, 두번째 큰 행정구역을 사용해서 검색하도록 쿼리를 변환함
- Geocoding API의 한국 주소 인식률 대폭 향상

### 데이터 가공을 통한 당일의 최저/최고 기온 산출

**문제:**

- OpenWeatherMap의 5 day / 3 hour forecast data는 '당일'의 최저, 최고 기온 데이터를 직접적으로 제공하지 않음

**해결 방법:**

- 전체 예보 리스트 중 당일에 해당하는 날짜(day.js 사용)와 일치하는 데이터 추출
- 추출된 데이터 중 최저, 최고기온을 비교하여 실제 당일의 최저, 최고 기온 추출
