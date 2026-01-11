# 고통의 카드팩 - 개발 온보딩 가이드

## 프로젝트 개요

트럼프 카드 52장을 이용한 맨몸운동 앱. 토스 앱인토스 플랫폼에서 동작.

**핵심 컨셉:**
- 카드 문양별로 다른 운동 수행 (스페이드=스쿼트, 클로버=싯업, 하트=버피, 다이아=푸쉬업)
- 카드 숫자만큼 운동 반복
- 난이도별 쉬는 시간 차등

---

## 기술 스택

| 기술 | 버전/설명 |
|------|----------|
| React | 19 |
| TypeScript | 5.9 |
| Vite | 7.2 |
| @apps-in-toss/web-framework | 1.7.1 (토스 앱인토스) |
| @toss/tds-mobile | Toss Design System |
| @toss/tds-colors | adaptive 색상 |

**중요:** TDS 컴포넌트를 최대한 사용할 것 (`Text`, `Button`, `Modal`, `FixedBottomCTA` 등)

---

## 현재 진행 상황

### 완료된 Phase

| Phase | 내용 | 상태 |
|-------|------|------|
| 1 | 기본 구조 세팅 | ✅ 완료 |
| 2 | 핵심 로직 구현 | ✅ 완료 |
| 3 | 컴포넌트 구현 | ✅ 완료 |
| 4 | 페이지 구현 | 🔄 진행 중 (2/5) |
| 5 | 테스트 및 마무리 | ⏳ 대기 |

### 생성된 파일 목록

```
src/
├── types/
│   └── index.ts              ✅ 타입 정의 (Suit, Card, Difficulty, WorkoutStats 등)
├── constants/
│   └── index.ts              ✅ 상수 (난이도 설정, 운동 매핑, 이미지 경로 등)
├── utils/
│   └── deck.ts               ✅ 카드 덱 유틸 (createDeck, shuffleDeck, getExerciseCount)
├── hooks/
│   ├── useDeck.ts            ✅ 덱 상태 관리
│   ├── useTimer.ts           ✅ 스톱워치 + 카운트다운
│   └── useWorkoutSession.ts  ✅ 전체 세션 관리 (핵심 훅)
├── components/
│   ├── CardContainer.tsx     ✅ 트럼프 카드 UI + 운동 애니메이션
│   ├── RestTimer.tsx         ✅ 쉬는 시간 카운트다운
│   └── ProgressIndicator.tsx ✅ 진행률 표시 (n/52)
├── pages/
│   ├── LandingPage.tsx       ✅ 난이도 선택 + 시작
│   ├── WorkoutPage.tsx       ✅ 운동 진행 화면
│   ├── CompletePage.tsx      ❌ 미구현 (다음 작업)
│   └── ResultPage.tsx        ❌ 미구현
├── App.tsx                   ❌ 라우팅 미구현 (기본 Vite 템플릿 상태)
└── main.tsx                  ✅ 진입점
```

---

## 핵심 로직 이해

### useWorkoutSession 훅 (src/hooks/useWorkoutSession.ts)

전체 운동 세션을 관리하는 핵심 훅. 다음 값들을 반환:

```typescript
{
  phase: 'ready' | 'exercise' | 'rest' | 'complete',  // 현재 상태
  currentCard: Card | null,      // 현재 뽑은 카드
  currentExercise: ExerciseType, // 현재 운동 종류
  exerciseCount: number,         // 수행할 운동 횟수
  completedCards: number,        // 완료한 카드 수
  totalCards: 52,
  restTime: number,              // 남은 쉬는 시간
  stats: WorkoutStats,           // 운동 통계
  isPaused: boolean,             // 일시정지 상태
  difficulty: Difficulty,        // 선택된 난이도

  // 액션 함수들
  startSession: (difficulty) => void,  // 세션 시작
  completeExercise: () => void,        // 운동 완료
  skipRest: () => void,                // 쉬는 시간 건너뛰기
  pause: () => void,                   // 일시정지
  resume: () => void,                  // 재개
  quit: () => void,                    // 포기 (결과 화면으로)
  reset: () => void,                   // 초기화
}
```

### 운동 플로우

```
LandingPage → 난이도 선택 → startSession(difficulty)
    ↓
WorkoutPage (phase: 'exercise')
    ↓ completeExercise()
WorkoutPage (phase: 'rest') → 카운트다운 또는 skipRest()
    ↓ 자동 또는 수동
WorkoutPage (phase: 'exercise') → 반복...
    ↓ 52장 완료 시 (phase: 'complete')
CompletePage → "축하해요!" + "통계 보기" 버튼
    ↓
ResultPage → 상세 통계 표시
```

### 난이도 설정 (src/constants/index.ts)

```typescript
DIFFICULTY_CONFIG = {
  beginner: { name: '입문', restTime: 20, faceCardValue: 10, isHardcore: false },
  easy:     { name: '초급', restTime: 15, faceCardValue: 10, isHardcore: false },
  medium:   { name: '중급', restTime: 8,  faceCardValue: 10, isHardcore: false },
  hard:     { name: '고급', restTime: 3,  faceCardValue: 10, isHardcore: false },
  hardcore: { name: '하드코어', restTime: 0, faceCardValue: 0, isHardcore: true },
}
```

- 입문~고급: J,Q,K,A = 10회
- 하드코어: J=11, Q=12, K=13, A=14회

---

## 다음 작업 (여기서부터 시작)

### 1. CompletePage.tsx 구현 (Phase 4.3)

**위치:** `src/pages/CompletePage.tsx`

**요구사항:**
- 축하 이모지/애니메이션 (예: 🎉)
- "수고하셨습니다!" 메시지
- "통계 보기" 버튼 → ResultPage로 이동
- "홈으로" 버튼 → LandingPage로 이동

**Props:**
```typescript
interface CompletePageProps {
  onViewStats: () => void;  // 통계 보기 클릭
  onGoHome: () => void;     // 홈으로 클릭
}
```

**TDS 사용:** `Text`, `Button`

---

### 2. ResultPage.tsx 구현 (Phase 4.4)

**위치:** `src/pages/ResultPage.tsx`

**요구사항:**
- 운동별 총 횟수 표시 (스쿼트 XX회, 푸쉬업 XX회...)
- 총 운동 시간
- 총 쉬는 시간
- 완료한 카드 수 (n/52)
- "다시하기" 버튼 → LandingPage로
- "홈으로" 버튼 → LandingPage로

**Props:**
```typescript
interface ResultPageProps {
  stats: WorkoutStats;      // src/types/index.ts 참조
  onRestart: () => void;    // 다시하기
  onGoHome: () => void;     // 홈으로
}
```

**WorkoutStats 타입:**
```typescript
interface WorkoutStats {
  squat: number;
  situp: number;
  burpee: number;
  pushup: number;
  totalExerciseTime: number;  // 초
  totalRestTime: number;      // 초
  completedCards: number;
}
```

**TDS 사용:** `Text`, `Button`

---

### 3. App.tsx 라우팅 구현 (Phase 4.5)

**위치:** `src/App.tsx`

**요구사항:**
- 페이지 간 전환 로직 구현
- useWorkoutSession 훅 사용
- 상태에 따른 페이지 렌더링

**구현 패턴:**
```typescript
function App() {
  const session = useWorkoutSession();
  const [page, setPage] = useState<'landing' | 'workout' | 'complete' | 'result'>('landing');

  // phase가 'complete'가 되면 CompletePage로 전환
  // 등등...
}
```

---

### 4. Phase 5: 테스트 및 마무리

- `yarn dev`로 전체 플로우 테스트
- 각 난이도별 쉬는 시간 확인
- 하드코어 모드 J,Q,K,A 숫자 확인
- 52장 완료 시 결과 화면 전환 확인
- 운동 애니메이션 정상 작동 확인
- 린트/타입 체크 통과 확인

---

## 개발 명령어

```bash
# 개발 서버
yarn dev

# 린트 검사
yarn lint

# 타입 체크
yarn tsc --noEmit

# 빌드
yarn build

# 배포 (토스)
yarn deploy
```

---

## 주의사항

1. **TDS 사용 필수:** 가능한 모든 UI에 `@toss/tds-mobile` 컴포넌트 사용
2. **any 타입 금지:** TypeScript strict 모드
3. **린트 통과 필수:** 작업 후 `yarn lint` 실행
4. **한국어 사용:** 앱 내 모든 텍스트는 한국어

---

## 참고 문서

- [구현 계획서](./IMPLEMENTATION_PLAN.md) - Phase별 상세 내용
- [TDS 문서](https://tossmini-docs.toss.im/tds-mobile/components/) - 컴포넌트 가이드
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/tutorials)

---

## 이미지 에셋 위치

```
assets/icons/
├── squat_up.png, squat_down.png     # 스쿼트
├── situp_up.png, situp_down.png     # 싯업
├── burpee_up.png, burpee_down.png   # 버피
└── pushup_up.png, pushup_down.png   # 푸쉬업
```

CardContainer에서 1초 간격으로 up/down 이미지를 번갈아 표시함.
