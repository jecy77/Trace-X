# 프론트엔드 웹 데모 실행 가이드

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
cd /Users/yelim/Desktop/파란학기/frontend
npm install
```

### 2. 환경 변수 설정 (선택사항)

`.env` 파일을 생성하여 백엔드 API URL 설정:

```bash
# .env 파일 생성
VITE_BACKEND_API_URL=http://localhost:5000
```

기본값은 `http://localhost:5000`입니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` (또는 표시된 포트)로 접속합니다.

---

## 🔧 백엔드 API 서버 실행

프론트엔드가 백엔드 API를 호출하므로, 백엔드 서버도 함께 실행해야 합니다.

### 백엔드 서버 실행

```bash
# 새 터미널 창에서
cd /Users/yelim/Desktop/파란학기/Cryptocurrency-Graphs-of-graphs
python3 api/app.py
```

백엔드 서버는 `http://localhost:5000`에서 실행됩니다.

---

## 📋 전체 실행 순서

### 터미널 1: 백엔드 서버

```bash
cd /Users/yelim/Desktop/파란학기/Cryptocurrency-Graphs-of-graphs
python3 api/app.py
```

예상 출력:

```
======================================================================
🚀 AML Risk Engine API 서버 시작
======================================================================

📍 엔드포인트:
   POST http://localhost:5000/api/score/transaction
   POST http://localhost:5000/api/analyze/address
      - analysis_type: 'basic' (기본 스코어링, 빠름, 기본값)
      - analysis_type: 'advanced' (심층 분석, 느림)
   GET  http://localhost:5000/health

📚 API 문서:
   GET  http://localhost:5000/api-docs

 * Running on http://0.0.0.0:5000
```

### 터미널 2: 프론트엔드 개발 서버

```bash
cd /Users/yelim/Desktop/파란학기/frontend
npm install  # 처음 실행 시에만
npm run dev
```

예상 출력:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 브라우저에서 접속

1. `http://localhost:5173` 접속
2. 수동 탐지 (Adhoc) 페이지로 이동
3. 주소 입력 및 분석 테스트

---

## 🧪 테스트 방법

### 1. 데모 데이터로 테스트

현재 프론트엔드는 `transactions: []` 빈 배열로 전송하므로, 백엔드에서 실제 분석이 수행되지 않습니다.

**임시 해결책**: 백엔드에서 데모 데이터를 사용하도록 수정하거나, 프론트엔드에서 데모 데이터를 전송하도록 수정할 수 있습니다.

### 2. 실제 주소로 테스트

백엔드 API가 실제 거래 히스토리를 가져올 수 있다면:

1. 주소 입력 (예: `0x...`)
2. 체인 선택 (현재는 하드코딩된 "ethereum")
3. "분석" 버튼 클릭
4. 결과 확인

---

## ⚠️ 문제 해결

### 포트 충돌

**문제**: 포트가 이미 사용 중입니다.

**해결**:

- 백엔드: `api/app.py`에서 포트 변경 (기본값: 5000)
- 프론트엔드: `vite.config.ts`에서 포트 변경 (기본값: 5173)

### CORS 오류

**문제**: 브라우저 콘솔에 CORS 오류가 표시됩니다.

**해결**: 백엔드에서 CORS가 활성화되어 있는지 확인 (`api/app.py`에 `CORS(app)` 포함되어 있어야 함)

### API 연결 실패

**문제**: 프론트엔드에서 백엔드 API를 호출할 수 없습니다.

**해결**:

1. 백엔드 서버가 실행 중인지 확인
2. `src/services/api.ts`의 `API_BASE_URL` 확인
3. 네트워크 탭에서 실제 요청 URL 확인

---

## 📝 현재 상태

### ✅ 작동하는 것

- 프론트엔드 UI 렌더링
- 주소 입력 및 버튼 클릭
- API 서비스 함수 호출

### ❌ 아직 작동하지 않는 것

- **백엔드 API 연동**: `transactions: []` 빈 배열로 전송
- **체인 선택**: 하드코딩된 "ethereum"
- **실제 거래 히스토리**: 백엔드에서 가져오지 않음

---

## 🔄 다음 단계

1. **백엔드 API 연동**

   - 주소의 거래 히스토리를 가져오는 API 호출
   - `src/pages/adhoc/index.tsx` 수정

2. **체인 선택 기능**

   - UI에 체인 선택 드롭다운 추가
   - 선택한 체인을 API 요청에 포함

3. **데모 데이터 활용**
   - 백엔드에서 데모 데이터 사용하도록 수정
   - 또는 프론트엔드에서 데모 데이터 전송

---

## 📚 관련 문서

- `BACKEND_INTEGRATION.md`: 백엔드 연동 가이드
- `../Cryptocurrency-Graphs-of-graphs/docs/API_DOCUMENTATION.md`: API 문서
- `../Cryptocurrency-Graphs-of-graphs/demo/README.md`: 데모 데이터 가이드
