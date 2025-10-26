import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { authActions } from "./redux/slices/authSlice.ts";
import { loadAuthData, } from "./lib/tauriStore.ts";
import { request } from "./lib/utils.ts";
async function bootstrap() {
  try {
    const authData = await loadAuthData();

    if (authData.userId) {
      store.dispatch(authActions.setLoginUserId(authData.userId));
    }
    if (authData.token) {
      request.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authData.token}`;
    }
  } catch (err) {
    console.error("Failed to preload auth data:", err);
  }

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
}

// 🚀 Run the bootstrap
bootstrap();
