import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthInitialStateType } from "../../lib/types";
import { loadUserId } from "../../lib/tauriStore";

const initialState: AuthInitialStateType = {
  userId: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser(state, action: PayloadAction<AuthInitialStateType["user"]>) {
      state.user = action.payload;
    },
    setLoginUserId(state, action: PayloadAction<AuthInitialStateType["userId"]>) {
      state.userId = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

// Initialize from storage
export const initUserFromStore = () => async (dispatch: any) => {
  const userId = await loadUserId(); // load userId only
  if (userId) dispatch(authActions.setLoginUserId(userId));
};
