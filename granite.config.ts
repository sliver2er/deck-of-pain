import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "deck-of-pain",
  brand: {
    displayName: "고통의 카드팩", // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: "#3182F6", // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: "src/assets/logo/logo.png", // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
  },
  web: {
    host: "192.168.123.132",
    port: 5173,
    commands: {
      dev: "vite",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
