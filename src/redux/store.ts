import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSLice";
import { authReducer } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth:authReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
