# 고통의 카드팩 - 개발 온보딩 가이드

## 프로젝트 개요

트럼프 카드 52장을 이용한 맨몸운동 앱. 토스 앱인토스 플랫폼에서 동작.

**핵심 컨셉:**

- 카드 문양별로 다른 운동 수행 (스페이드=스쿼트, 클로버=싯업, 하트=버피, 다이아=푸쉬업)
- 카드 숫자만큼 운동 반복
- 난이도별 쉬는 시간 차등

---

## 기술 스택

| 기술                        | 버전/설명             |
| --------------------------- | --------------------- |
| React                       | 19                    |
| TypeScript                  | 5.9                   |
| Vite                        | 7.2                   |
| @apps-in-toss/web-framework | 1.7.1 (토스 앱인토스) |
| @toss/tds-mobile            | Toss Design System    |
| @toss/tds-colors            | adaptive 색상         |
| @emotion/react              | 11 (TDS 의존성)       |

---

## 현재 진행 상황

### Phase 현황

| Phase | 내용             | 상태       |
| ----- | ---------------- | ---------- |
| 1     | 기본 구조 세팅   | ✅ 완료    |
| 2     | 핵심 로직 구현   | ✅ 완료    |
| 3     | 컴포넌트 구현    | ✅ 완료    |
| 4     | 페이지 구현      | ✅ 완료    |
| 5     | 테스트 및 마무리 | 🔄 진행 중 |

### 생성된 파일 목록

```
src/
├── assets/                   ✅ 이미지 에셋 (icons/, logo/)
├── types/
│   └── index.ts              ✅ 타입 정의
├── constants/
│   └── index.ts              ✅ 상수 (이미지 import 방식)
├── utils/
│   └── deck.ts               ✅ 카드 덱 유틸
├── hooks/
│   ├── useDeck.ts            ✅ 덱 상태 관리
│   ├── useTimer.ts           ✅ 스톱워치 + 카운트다운
│   └── useWorkoutSession.ts  ✅ 전체 세션 관리 (핵심 훅)
├── components/
│   ├── CardContainer.tsx     ✅ 트럼프 카드 UI + 운동 애니메이션
│   ├── RestTimer.tsx         ✅ 쉬는 시간 카운트다운
│   └── ProgressIndicator.tsx ✅ 진행률 표시 (n/52)
├── pages/
│   ├── LandingPage.tsx       ✅ 앱 소개 + 시작하기
│   ├── DifficultySelectPage.tsx ✅ 난이도 선택 (NEW)
│   ├── WorkoutPage.tsx       ✅ 운동 진행 화면
│   ├── CompletePage.tsx      ✅ 축하 화면
│   └── ResultPage.tsx        ✅ 상세 통계 화면
├── App.tsx                   ✅ 페이지 라우팅
├── main.tsx                  ✅ 진입점 (ThemeProvider)
└── index.css                 ✅ 기본 스타일
```

---

## 페이지 플로우 (업데이트됨)

```
LandingPage (앱 소개)
    ↓ 시작하기 버튼
DifficultySelectPage (난이도 선택)
    ↓ 난이도 선택 후 운동 시작
WorkoutPage (phase: 'exercise')
    ↓ completeExercise()
WorkoutPage (phase: 'rest') → 카운트다운
    ↓ 자동 또는 skipRest()
WorkoutPage (phase: 'exercise') → 반복...
    ↓ 52장 완료 시 (phase: 'complete')
CompletePage → "고생 많았어요!" + 버튼들
    ↓ 통계 보기
ResultPage → 상세 통계 표시
```

---

## TDS 사용 시 주의사항 (중요!)

### 1. ThemeProvider 필수

```tsx
// main.tsx
import { ThemeProvider } from "@toss/tds-mobile";

<ThemeProvider>
  <App />
</ThemeProvider>;
```

### 2. Button variant/color 제한

```tsx
// variant: 'fill' | 'weak' 만 지원 (outline, plain 없음!)
// color: 'primary' | 'danger' | 'light' | 'dark'

// ✅ 올바른 사용
<Button variant="fill" color="primary">확인</Button>
<Button variant="weak" color="primary">취소</Button>

// ❌ 잘못된 사용 (에러 발생)
<Button variant="outline" color="light">버튼</Button>
<Button variant="plain" color="light">버튼</Button>
```

### 3. adaptive 색상

```tsx
import { adaptive } from "@toss/tds-colors";

// ✅ 올바른 사용
backgroundColor: adaptive.background; // 흰색/다크모드 자동 대응
backgroundColor: adaptive.grey50;

// ❌ 잘못된 사용 (존재하지 않음)
backgroundColor: adaptive.white; // 없음!
```

### 4. Typography

```tsx
// 사용 가능: t1~t7, st1~st13
<Text typography="t1">가장 큰 제목 (30px)</Text>
<Text typography="t6">본문 (15px)</Text>
<Text typography="t7">작은 텍스트 (13px)</Text>
```

### 5. FixedBottomCTA 사용법

```tsx
// ❌ .Single 없음
<FixedBottomCTA.Single>버튼</FixedBottomCTA.Single>

// ✅ 직접 사용 또는 일반 Button 사용
<FixedBottomCTA>버튼</FixedBottomCTA>

// 또는 직접 스타일링
<div style={{ position: 'fixed', bottom: 0, ... }}>
  <Button display="block">버튼</Button>
</div>
```

---

## 이미지 에셋

**위치:** `src/assets/` (기존 `assets/`에서 이동됨)

```
src/assets/
├── icons/
│   ├── squat_up.png, squat_down.png
│   ├── situp_up.png, situp_down.png
│   ├── burpee_up.png, burpee_down.png
│   └── pushup_up.png, pushup_down.png
└── logo/
    └── logo.png
```

**import 방식 (Vite):**

```tsx
// constants/index.ts
import squatUp from "../assets/icons/squat_up.png";
export const EXERCISE_IMAGES = {
  squat: { up: squatUp, down: squatDown },
  // ...
};
```

---

## 다음 작업 (Phase 5)

### 남은 작업

1. **UI 스타일 정리** - 현재 일부 깨진 UI 수정 필요
2. **전체 플로우 테스트** - 토스 앱에서 실제 테스트
3. **버그 수정** - 발견되는 이슈 해결
4. **최종 검수**

### 테스트 체크리스트

- [ ] LandingPage → DifficultySelectPage 전환
- [ ] 난이도 선택 후 운동 시작
- [ ] 운동 완료 → 쉬는 시간 → 다음 카드 전환
- [ ] 52장 완료 시 CompletePage 표시
- [ ] 통계 보기 → ResultPage 표시
- [ ] 포기 버튼 동작
- [ ] 홈으로/다시하기 버튼 동작

---

## 개발 명령어

```bash
yarn dev          # 개발 서버
yarn lint         # 린트 검사
yarn tsc --noEmit # 타입 체크
yarn build        # 빌드
yarn deploy       # 배포 (토스)
```

---

## 참고 문서

- [TDS Typography](https://tossmini-docs.toss.im/tds-mobile/foundation/typography/)
- [TDS 시작하기](https://tossmini-docs.toss.im/tds-mobile/start/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/tutorials)
