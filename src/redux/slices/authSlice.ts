import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthInitialStateType } from "../../lib/types";

const storedUser = localStorage.getItem("currentUser");
const initialState: AuthInitialStateType = {
  user: storedUser ? JSON.parse(storedUser) : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoginUser(state, action: PayloadAction<AuthInitialStateType["user"]>) {
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
