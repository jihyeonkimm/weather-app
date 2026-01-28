# Weather App

React와 TypeScript, OpenWeatherMap API를 사용한 날씨 앱입니다.
FSD(Feature-Sliced Design) 아키텍처를 기반으로 구현되었으며, 현재 위치 기반 날씨 조회와 한국 행정구역 검색, 즐겨찾기 기능을 제공합니다.

## ✨ 프로젝트 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일이 있는지 확인하세요.

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
- 현재 날씨 정보 표시 (온도, 날씨 설명, 아이콘)
- 5일간의 3시간 간격 날씨 예보
- 5일간 예보 중 당일 날짜에 해당하는 예보에서 최고/최저기온 추출

### 🔍 한국 행정구역 검색

- 1,000개 이상의 시/구/동 데이터 기반 실시간 검색
- OpenWeatherMap Geocoding API를 통한 좌표 변환
- 드롭다운 UI로 검색 결과 선택

### ⭐ 즐겨찾기 관리

- 최대 6개 지역 즐겨찾기 등록
- LocalStorage 기반 저장
- 실시간 날씨 정보가 포함된 즐겨찾기 카드
- 즐겨찾기 이름 수정 (최대 10자)

## 기술적 의사 결정 및 이유

### 한국 지역 검색 최적화

**문제:**

- OpenWeatherMap API가 한국 주소 구조를 정확히 인식하지 못함

**해결 방법:**

- "경상북도 안동시 옥동" → "옥동, 안동시, KR" 형식으로 변환
- 단일 검색어는 "서울" → "서울, KR" 형식 사용
- Geocoding API의 한국 주소 인식률 대폭 향상

---

**Built with ❤️ by Jihyeon Kim**
