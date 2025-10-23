import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <BrowserRouter>
          <ToastProvider placement="top-center" />
          <App />
        </BrowserRouter>
      </HeroUIProvider>
    </Provider>
  </StrictMode>
);
