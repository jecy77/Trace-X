# 프론트엔드 API 연동 가이드

## 📁 생성/수정된 파일

### 생성된 파일
1. **`src/types/api.ts`** - API 요청/응답 타입 정의
2. **`src/services/api.ts`** - API 서비스 함수

### 수정된 파일
1. **`src/pages/adhoc/index.tsx`** - 수동 탐지 페이지 (기본 스코어링 + 심층 분석)
2. **`src/pages/adhoc/style.ts`** - 스타일 추가

## 🎯 구현된 기능

### 1. 기본 스코어링
- 주소 입력 후 "분석하기" 버튼 클릭
- 빠른 응답 (1-2초)
- 기본 룰만 평가 (B-201, B-202 제외)

### 2. 심층 분석
- 기본 스코어링 완료 후 "심층 분석" 버튼 표시
- 느린 응답 (5-30초)
- 모든 룰 평가 (B-201, B-202 포함)

### 3. 결과 표시
- 리스크 스코어 (0-100점)
- 리스크 레벨 (low/medium/high/critical)
- 리스크 태그
- 발동된 룰 목록
- 설명
- 기본 vs 심층 분석 비교

## 🔧 API 서비스

### `analyzeAddress()` - 기본 스코어링
```typescript
import { analyzeAddress } from "@/services/api";

const result = await analyzeAddress({
  address: "0xABC123...",
  chain: "ethereum",
  transactions: [], // 백엔드에서 가져와야 함
});
```

### `analyzeAddressAdvanced()` - 심층 분석
```typescript
import { analyzeAddressAdvanced } from "@/services/api";

const result = await analyzeAddressAdvanced({
  address: "0xABC123...",
  chain: "ethereum",
  transactions: [], // 백엔드에서 3홉 데이터 가져와야 함
});
```

## ⚙️ 환경 변수 설정

`.env` 파일 생성:
```env
VITE_API_BASE_URL=http://localhost:5000
```

## 📋 사용 방법

1. **프론트엔드 실행**
   ```bash
   npm run dev
   ```

2. **백엔드 API 서버 실행**
   ```bash
   cd ../Cryptocurrency-Graphs-of-graphs
   python3 api/app.py
   ```

3. **브라우저에서 접속**
   - 프론트엔드: `http://localhost:5173` (Vite 기본 포트)
   - `/adhoc` 페이지 접속

4. **주소 분석**
   - 주소 입력
   - "분석하기" 버튼 클릭
   - 기본 스코어링 결과 확인
   - "심층 분석" 버튼 클릭 (선택사항)

## ⚠️ TODO (백엔드 연동 필요)

현재 프론트엔드는 API 호출만 구현되어 있습니다. 다음 작업이 필요합니다:

1. **주소의 거래 히스토리 가져오기**
   - 백엔드 API에서 주소의 거래 히스토리를 가져와야 함
   - `transactions` 배열을 채워야 함

2. **3홉 거래 데이터 가져오기**
   - 심층 분석 시 3홉까지 거래 데이터 필요
   - 백엔드에서 제공해야 함

3. **체인 선택 기능**
   - 현재는 "ethereum"으로 하드코딩
   - 사용자가 체인을 선택할 수 있도록 UI 추가 필요

## 🔗 API 엔드포인트

### 기본 스코어링
```
POST http://localhost:5000/api/analyze/address
```

### 심층 분석
```
POST http://localhost:5000/api/analyze/address/advanced
```

### 헬스 체크
```
GET http://localhost:5000/health
```

## 📚 관련 문서

- 백엔드 API 문서: `../Cryptocurrency-Graphs-of-graphs/docs/API_DOCUMENTATION.md`
- 사용자 시나리오: `../Cryptocurrency-Graphs-of-graphs/docs/USER_SCENARIOS.md`
