# 고통의 카드팩 💪

트럼프 카드 52장을 이용한 맨몸운동 앱

## 개요

트럼프 카드를 뽑아 문양에 따라 운동을 수행하는 재미있는 홈트레이닝 앱입니다.

| 문양 | 운동 |
|------|------|
| ♠ 스페이드 | 스쿼트 |
| ♣ 클로버 | 싯업 |
| ♥ 하트 | 버피 |
| ♦ 다이아몬드 | 푸쉬업 |

카드에 적힌 숫자만큼 운동을 수행하고, 52장을 모두 소진하면 완료!

## 기술 스택

- React 19 + TypeScript + Vite
- @apps-in-toss/web-framework
- @toss/tds-mobile (Toss Design System)

## 시작하기

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 배포 (토스 앱인토스)
yarn deploy
```

## 프로젝트 구조

```
src/
├── pages/           # 페이지 컴포넌트
│   ├── LandingPage.tsx
│   └── WorkoutPage.tsx
├── components/      # 재사용 컴포넌트
│   ├── CardContainer.tsx
│   ├── RestTimer.tsx
│   └── ProgressIndicator.tsx
├── hooks/           # 커스텀 훅
│   ├── useDeck.ts
│   ├── useTimer.ts
│   └── useWorkoutSession.ts
├── types/           # 타입 정의
├── constants/       # 상수
└── utils/           # 유틸리티 함수
```

## 난이도

| 난이도 | 쉬는시간 | J,Q,K,A |
|--------|----------|---------|
| 입문 | 20초 | 10 |
| 초급 | 15초 | 10 |
| 중급 | 8초 | 10 |
| 고급 | 3초 | 10 |
| 하드코어 | 0초 | 11,12,13,14 |

## 문서

- [온보딩 가이드](./docs/ONBOARDING.md) - 다음 개발자를 위한 상세 가이드
- [구현 계획서](./docs/IMPLEMENTATION_PLAN.md) - Phase별 구현 진행 현황
