# 고통의 카드팩 - 구현 계획서

## 개요
트럼프 카드 52장을 이용한 맨몸운동 앱. 카드 문양별로 다른 운동을 수행하고, 숫자만큼 반복.

## 기술 스택
- React 19 + TypeScript + Vite
- @apps-in-toss/web-framework
- @toss/tds-mobile (Toss Design System)
- yarn

---

## Phase 진행 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| 1 | 기본 구조 세팅 | ✅ 완료 |
| 2 | 핵심 로직 구현 | ✅ 완료 |
| 3 | 컴포넌트 구현 | ✅ 완료 |
| 4 | 페이지 구현 | ⏳ 대기 |
| 5 | 테스트 및 마무리 | ⏳ 대기 |

---

## 핵심 규칙

### 운동 매핑
| 문양 | 운동 | 이미지 |
|------|------|--------|
| ♠ 스페이드 | 스쿼트 | squat_up.png, squat_down.png |
| ♣ 클로버 | 싯업 | situp_up.png, situp_down.png |
| ♥ 하트 | 버피 | burpee_up.png, burpee_down.png |
| ♦ 다이아 | 푸쉬업 | pushup_up.png, pushup_down.png |

### 난이도 설정
| 난이도 | 쉬는시간 | J,Q,K,A |
|--------|----------|---------|
| 입문 | 20초 | 10 |
| 초급 | 15초 | 10 |
| 중급 | 8초 | 10 |
| 고급 | 3초 | 10 |
| 하드코어 | 0초 | 11,12,13,14 |

### 운동 플로우 규칙
- **운동 완료:** 사용자가 '완료' 버튼 클릭 시 다음 카드로
- **포기 처리:** 결과 화면으로 이동 (부분 통계 표시)
- **일시정지:** 지원함 (일시정지 버튼으로 운동 중단 가능)

---

# Phase 1: 기본 구조 세팅

## 목표
프로젝트의 디렉토리 구조, 타입 정의, 상수 정의

## 체크리스트

- [x] 1.1 디렉토리 구조 생성
- [x] 1.2 타입 정의 (src/types/index.ts)
- [x] 1.3 상수 정의 (src/constants/index.ts)
- [x] 1.4 TypeScript 타입 체크 통과

### 1.1 디렉토리 구조
```
src/
├── pages/           # 페이지 컴포넌트
├── components/      # 재사용 컴포넌트
├── hooks/           # 커스텀 훅
├── types/           # 타입 정의
├── constants/       # 상수
└── utils/           # 유틸리티 함수
```

### 1.2 타입 정의 (src/types/index.ts)
- Suit: 카드 문양 타입
- CardValue: 카드 값 (1-13)
- Card: 트럼프 카드 인터페이스
- ExerciseType: 운동 종류
- Difficulty: 난이도
- SessionPhase: 세션 상태
- WorkoutStats: 운동 통계
- DifficultyConfig: 난이도 설정

### 1.3 상수 정의 (src/constants/index.ts)
- DIFFICULTY_CONFIG: 난이도별 설정
- SUIT_TO_EXERCISE: 문양 → 운동 매핑
- EXERCISE_NAME: 운동별 한글 이름
- EXERCISE_IMAGES: 운동별 이미지 경로
- CARD_DISPLAY: 카드 표시값
- SUIT_SYMBOL: 문양 심볼
- SUIT_COLOR: 문양 색상

### Phase 1 완료 기록 (2025-01-12)

**생성된 파일:**
| 파일 | 설명 |
|------|------|
| `src/types/index.ts` | Suit, Card, ExerciseType, Difficulty, WorkoutStats 등 타입 정의 |
| `src/constants/index.ts` | 난이도 설정, 운동 매핑, 이미지 경로 등 상수 정의 |

**생성된 디렉토리:**
```
src/
├── pages/        (빈 폴더)
├── components/   (빈 폴더)
├── hooks/        (빈 폴더)
├── types/        ✅ index.ts 생성됨
├── constants/    ✅ index.ts 생성됨
└── utils/        (빈 폴더)
```

**검증:** TypeScript 타입 체크 통과 (`yarn tsc --noEmit`)

---

# Phase 2: 핵심 로직 구현

## 체크리스트

- [x] 2.1 카드 덱 유틸리티 (utils/deck.ts)
- [x] 2.2 useDeck 훅 (hooks/useDeck.ts)
- [x] 2.3 useTimer 훅 (hooks/useTimer.ts)
- [x] 2.4 useWorkoutSession 훅 (hooks/useWorkoutSession.ts)

### 2.1 카드 덱 유틸리티
- createDeck(): 52장 카드 생성
- shuffleDeck(): Fisher-Yates 셔플
- getExerciseCount(): 난이도에 따른 운동 횟수 계산

### 2.2 useDeck 훅
- deck: 현재 덱 상태
- drawCard(): 카드 뽑기
- remainingCount: 남은 카드 수
- reset(): 덱 초기화

### 2.3 useTimer 훅
- time: 현재 시간
- start/stop/reset: 제어 함수
- isRunning: 실행 상태

### 2.4 useWorkoutSession 훅
- 전체 운동 세션 상태 관리
- 현재 카드, 페이즈, 통계 통합

### Phase 2 완료 기록 (2025-01-12)

**생성된 파일:**
| 파일 | 설명 |
|------|------|
| `src/utils/deck.ts` | createDeck, shuffleDeck, getExerciseCount 함수 |
| `src/hooks/useDeck.ts` | 카드 덱 상태 관리 훅 |
| `src/hooks/useTimer.ts` | useStopwatch, useCountdown 훅 |
| `src/hooks/useWorkoutSession.ts` | 전체 세션 관리 훅 (일시정지, 포기 포함) |

**주요 기능:**
- Fisher-Yates 셔플 알고리즘
- 난이도별 J,Q,K,A 숫자 계산
- 일시정지/재개 기능
- 포기 시 부분 통계 유지
- 쉬는 시간 카운트다운 + 자동 다음 카드

**검증:** TypeScript 타입 체크 통과, ESLint 린트 통과

**수정 사항 (린트 오류 해결):**
- `useTimer.ts`: ref 업데이트를 useEffect 안으로 이동
- `useWorkoutSession.ts`: useCountdown 대신 직접 interval 관리로 변경 (effect 내 setState 문제 해결)

---

# Phase 3: 컴포넌트 구현

## 체크리스트

- [x] 3.1 CardContainer 컴포넌트
- [x] 3.2 RestTimer 컴포넌트
- [x] 3.3 ProgressIndicator 컴포넌트

### 3.1 CardContainer 디자인
```
┌─────────────────────────────┐
│ ♠                         ♠ │
│ 7                         7 │
│                             │
│         ┌─────────┐         │
│         │  운동   │         │
│         │  이미지 │         │
│         │ (반복)  │         │
│         └─────────┘         │
│                             │
│ 7                         7 │
│ ♠                         ♠ │
└─────────────────────────────┘
```
- 카드 테두리: 둥근 모서리, 흰 배경
- 가장자리 (좌상단, 우하단): 문양 + 숫자
- 중앙: 운동 이미지 (1초 간격 up/down 반복)
- 문양 색상: 스페이드/클로버 = 검정, 하트/다이아 = 빨강

### 3.2 RestTimer
- 원형 프로그레스 바
- 남은 시간 표시
- 자동 완료 콜백

### 3.3 ProgressIndicator
- 진행 상황 (n/52)
- 현재 운동 정보

### Phase 3 완료 기록 (2025-01-12)

**생성된 파일:**
| 파일 | 설명 |
|------|------|
| `src/components/CardContainer.tsx` | 트럼프 카드 UI + 운동 애니메이션 (1초 간격 up/down) |
| `src/components/RestTimer.tsx` | 원형 프로그레스 바 + 카운트다운 + 건너뛰기 버튼 |
| `src/components/ProgressIndicator.tsx` | 진행률 표시 (n/52 + 프로그레스 바) |

**검증:** TypeScript 타입 체크 통과, ESLint 린트 통과

---

# Phase 4: 페이지 구현

## 체크리스트

- [ ] 4.1 LandingPage
- [ ] 4.2 WorkoutPage
- [ ] 4.3 CompletePage (축하 화면)
- [ ] 4.4 ResultPage (상세 통계)
- [ ] 4.5 App.tsx 라우팅

### 4.1 LandingPage
- 앱 로고/이모지
- 앱 제목 및 설명
- 난이도 선택 버튼 (5개)
- 시작하기 CTA

### 4.2 WorkoutPage
- 상단: ProgressIndicator
- 중앙: CardContainer / RestTimer
- 하단: 운동 이름 + 남은 횟수
- 일시정지/포기 기능

### 4.3 CompletePage (축하 화면)
- 축하 이모지/애니메이션
- "수고하셨습니다!" 메시지
- "통계 보기" 버튼 → ResultPage로 이동
- "홈으로" 버튼 → LandingPage로 이동

### 4.4 ResultPage (상세 통계)
- 운동별 총 횟수
- 총 운동 시간
- 총 쉬는 시간
- 다시하기/홈으로 버튼

---

# Phase 5: 테스트 및 마무리

## 체크리스트

- [ ] 5.1 전체 플로우 테스트
- [ ] 5.2 스타일 조정
- [ ] 5.3 버그 수정
- [ ] 5.4 최종 검수

### 검증 항목
- 랜딩 → 난이도 선택 → 운동 → 결과 플로우
- 각 난이도별 쉬는 시간 확인
- 하드코어 모드 J,Q,K,A 숫자 확인
- 52장 모두 소진 시 결과 화면 전환
- 운동 애니메이션 정상 작동
