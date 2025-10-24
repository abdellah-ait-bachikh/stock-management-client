import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthInitialStateType } from "../../lib/types";
import { loadUser } from "../../lib/tauriStore";

// const storedUser = localStorage.getItem("currentUser");
const initialState: AuthInitialStateType = {
  user:  null,
  // user: storedUser ? JSON.parse(storedUser) : null,
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
// Async initializer for the user
export const initUserFromStore = () => async (dispatch: any) => {
  const user = await loadUser();
  if (user) dispatch(authActions.setLoginUser(user));
};