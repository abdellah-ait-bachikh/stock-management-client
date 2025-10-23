import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthInitialStateType } from "../../lib/types";

const initialState: AuthInitialStateType = {
 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
  
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
