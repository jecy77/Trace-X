# 백엔드 연동 가이드

## ✅ 완료된 것

### 1. 백엔드 API 서비스 구현

**파일**: `src/services/backend.ts`

#### 주요 함수:

##### `analyzeAddressViaBackend()`

백엔드를 통한 리스크 스코어링 (권장)

```typescript
import { analyzeAddressViaBackend } from "@/services/backend";

const result = await analyzeAddressViaBackend({
  address: "0x...",
  chain_id: 1, // 1: Ethereum, 56: BSC, 137: Polygon
  max_hops: 1, // optional, default: 3
  max_addresses_per_direction: 10, // optional
  analysis_type: "basic", // "basic" | "advanced"
});
```

##### `getFundFlow()`

주소의 펀드 플로우 가져오기 (그래프 데이터)

```typescript
import { getFundFlow } from "@/services/backend";

const graphData = await getFundFlow("0x...", 1);
```

##### `getMultihopGraphData()`

Multi-hop 그래프 데이터 가져오기 (리스크 스코어링 없이)

```typescript
import { getMultihopGraphData } from "@/services/backend";

const graphData = await getMultihopGraphData("0x...", 1, 3);
```

---

### 2. Adhoc 페이지 수정

**파일**: `src/pages/adhoc/index.tsx`

#### 변경 사항:

1. ✅ **백엔드 API 사용**

   - `analyzeAddressViaBackend()` 사용
   - 백엔드가 Etherscan에서 거래 데이터를 자동 수집

2. ✅ **체인 선택 기능**

   - Ethereum (chain_id: 1)
   - BSC (chain_id: 56)
   - Polygon (chain_id: 137)

3. ✅ **1-hop vs 3-hop 분석**
   - 기본 분석: 1-hop (빠름)
   - 심층 분석: 3-hop (느림, 더 정확)

#### 사용 플로우:

```
사용자 입력
  ↓
체인 선택 (Ethereum/BSC/Polygon)
  ↓
주소 입력 (0x...)
  ↓
"분석하기" 클릭 → 1-hop 기본 분석
  ↓
결과 표시
  ↓
"심층 분석 (3-hop)" 클릭 → 3-hop 심층 분석
  ↓
추가 결과 표시
```

---

## 🔌 백엔드 API 엔드포인트

### 1. `/api/analysis/risk-scoring` (POST)

**설명**: Multi-hop 데이터 수집 + 리스크 스코어링

**요청**:

```json
{
  "address": "0x...",
  "chain_id": 1,
  "max_hops": 3,
  "analysis_type": "basic" | "advanced"
}
```

**응답**:

```json
{
  "data": {
    "target_address": "0x...",
    "risk_score": 85,
    "risk_level": "high",
    "fired_rules": [...],
    "risk_tags": [...],
    "explanation": "..."
  }
}
```

---

### 2. `/api/analysis/fund-flow` (GET)

**설명**: 주소의 펀드 플로우 가져오기

**요청**:

```
GET /api/analysis/fund-flow?address=0x...&chain_id=1
```

**응답**:

```json
{
  "data": {
    "nodes": [...],
    "edges": [...]
  }
}
```

---

### 3. `/api/analysis/scoring` (POST)

**설명**: Multi-hop 그래프 데이터만 가져오기 (리스크 스코어링 없이)

**요청**:

```json
{
  "address": "0x...",
  "chain_id": 1,
  "max_hops": 3
}
```

**응답**:

```json
{
  "data": {
    "nodes": [...],
    "edges": [...]
  }
}
```

---

## 🛠️ 환경 설정

### 프론트엔드 환경 변수

`.env` 파일 생성:

```bash
VITE_BACKEND_API_URL=http://localhost:8888
```

---

## 🧪 테스트 방법

### 1. 로컬 테스트

#### 1) 백엔드 실행

```bash
cd 100end
export ETHERSCAN_API_KEY=your_key
python3 main.py
```

#### 2) 프론트엔드 실행

```bash
cd frontend
npm run dev
```

#### 3) 브라우저에서 테스트

1. `http://localhost:5173` 접속
2. "Adhoc Analysis" 메뉴 클릭
3. 체인 선택: Ethereum
4. 주소 입력: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
5. "분석하기" 클릭
6. 결과 확인
7. "심층 분석 (3-hop)" 클릭
8. 추가 결과 확인

---

### 2. API 직접 테스트

```bash
curl -X POST http://localhost:8888/api/analysis/risk-scoring \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "chain_id": 1,
    "max_hops": 1,
    "analysis_type": "basic"
  }'
```

---

## 🎯 데이터 플로우

```
[프론트엔드]
  사용자가 주소 입력 + 체인 선택
    ↓
  analyzeAddressViaBackend({
    address: "0x...",
    chain_id: 1,
    max_hops: 1,
    analysis_type: "basic"
  })
    ↓
  POST /api/analysis/risk-scoring

[백엔드]
  1. Etherscan API로 주소의 거래 내역 조회
  2. Multi-hop 그래프 데이터 생성
  3. 리스크 스코어링 API 호출
    ↓
  POST http://localhost:5001/api/analyze/address

[리스크 스코어링 API]
  1. 거래 분석
  2. 룰 평가
  3. 스코어 계산
    ↓
  결과 반환

[백엔드 → 프론트엔드]
  {
    "data": {
      "risk_score": 85,
      "risk_level": "high",
      ...
    }
  }
```

---

## 🔧 트러블슈팅

### 1. 백엔드 연결 실패

**증상**: `Failed to fetch transactions: ...`

**해결**:

```bash
# 백엔드가 실행 중인지 확인
curl http://localhost:8888/api/dashboard/summary

# CORS 에러라면 백엔드의 CORS 설정 확인
# 100end/src/app.py 파일에서
# CORS(app, origins=["http://localhost:5173", ...])
```

---

### 2. Etherscan API 에러

**증상**: `Scoring analysis failed: ...`

**해결**:

```bash
# 백엔드에서 API 키 확인
echo $ETHERSCAN_API_KEY

# 설정되지 않았다면
export ETHERSCAN_API_KEY=your_key_here
python3 main.py
```

---

### 3. 리스크 스코어링 API 연결 실패

**증상**: 백엔드에서 `Risk scoring API call failed`

**해결**:

```bash
# 리스크 스코어링 API 실행
cd Cryptocurrency-Graphs-of-graphs
source venv/bin/activate
python run_server.py

# 확인
curl http://localhost:5001/health
```

---

## 📋 체크리스트

- [x] 백엔드 API 스펙 확인
- [x] 백엔드 API 서비스 함수 작성
- [x] adhoc 페이지에 거래 히스토리 가져오기 연동
- [x] 체인 선택 UI 추가
- [x] 심층 분석 시 3홉 데이터 가져오기
- [x] 에러 처리 개선
- [x] 로딩 상태 개선

---

## 💡 추가 개선 사항 (선택)

- [ ] 거래 내역 캐싱 (동일 주소 재분석 시 빠름)
- [ ] 분석 진행 상태 표시 (프로그레스 바)
- [ ] 거래 그래프 시각화 (D3.js)
- [ ] 분석 히스토리 저장 (LocalStorage)
- [ ] 체인별 지원 토큰 목록 표시

---

## 참고 문서

- [통합 가이드](../INTEGRATION_GUIDE.md)
- [백엔드 API 문서](../100end/README.md)
- [리스크 스코어링 API 문서](../Cryptocurrency-Graphs-of-graphs/README.md)
