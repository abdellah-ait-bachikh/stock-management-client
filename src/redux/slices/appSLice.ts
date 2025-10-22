import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { appInitialStateType } from "../../lib/types";
const initialTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";

const initialState: appInitialStateType = {
  isAsideOpen: false,
  theme: initialTheme,
};

const appSLice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAsideOpen(
      state,
      action: PayloadAction<appInitialStateType["isAsideOpen"]>
    ) {
      state.isAsideOpen = action.payload;
    },
    setTheme(state, action: PayloadAction<appInitialStateType["theme"]>) {
      state.theme = action.payload;
    },
  },
});

export const appActions = appSLice.actions;
export const appReducer = appSLice.reducer;
