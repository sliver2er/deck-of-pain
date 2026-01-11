한국어로 답하세요.
코드 생성 시 single source of truth, 의존서 제어, 싱글톤 패턴 등 클린 코드 아키텍처를 준수하세요.
yarn 쓰고 있습니다.

typescript에서 any를 절대 사용하지 마세요.
불명확한 게 있으면 무조건 유저한테 물어보고 진행하세요.
스케일이 큰 작업은 무조건 플랜을 세우고 진행하세요.
쓸모없이 주석을 많이 달지 마세요. 가독성을 해칩니다.
eslintrc.js의 린팅 스타일을 지키고, 쓸데없이 많은 로그 메세지(console.log 등)를 남기지 마세요.
직접 scripts로 무언가를 조작하고, 스크립트를 생성할 땐 항상 물어보고 진행하세요. (supabase는 웹에서 gui로 유저가 직접 관리, 조언만 하기)

토스 앱인토스 개발자센터를 공식 문서로 참조하세요.
https://developers-apps-in-toss.toss.im/tutorials
UI, 컴포넌트 표현 시 되도록 apps-in-toss 의 Toss Design System을 사용하세요.

## TDS Mobile (토스 디자인 시스템)

공식 문서: https://tossmini-docs.toss.im/tds-mobile/

### 설치
```bash
yarn add @toss/tds-mobile @toss/tds-mobile-ait @emotion/react@^11
```

### 초기 설정
**로컬 개발 환경**에서는 `TDSMobileProvider` 사용 (typography 스타일 적용됨):
```tsx
import { TDSMobileProvider } from '@toss/tds-mobile';

createRoot(document.getElementById("root")!).render(
  <TDSMobileProvider userAgent={navigator.userAgent}>
    <App />
  </TDSMobileProvider>
);
```

**앱인토스 배포 환경**에서는 `TDSMobileAITProvider` 사용:
```tsx
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';

// 앱인토스 환경에서만 동작 (deploymentId 필요)
<TDSMobileAITProvider>
  <App />
</TDSMobileAITProvider>
```

⚠️ `ThemeProvider`는 typography 스타일이 적용 안 됨! 반드시 `TDSMobileProvider` 사용.

### 주요 컴포넌트
- **Button**: `color`(primary/danger/light/dark), `variant`(fill/weak), `size`(small~xlarge)
- **Modal**: `open`/`onOpenChange`로 제어, `Modal.Overlay` + `Modal.Content` 구조
- **Toast**: `position`(top/bottom), `duration`, `leftAddon`(아이콘/Lottie)
- **TextField**: `variant`(box/line/big/hero), `.Clearable`/`.Password`/`.Button` 서브타입

### 유틸리티 훅
- **useDialog**: `openAlert()`, `openConfirm()`, `openAsyncConfirm()`
- **useToast**: 토스트 메시지 표시

### 색상
```tsx
import { colors } from '@toss/tds-colors';
// colors.blue500, colors.grey900, colors.red500 등
```
