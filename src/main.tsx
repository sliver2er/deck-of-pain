import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TDSMobileProvider } from "@toss/tds-mobile";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TDSMobileProvider userAgent={navigator.userAgent}>
      <App />
    </TDSMobileProvider>
  </StrictMode>
);
