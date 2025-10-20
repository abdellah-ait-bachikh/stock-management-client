import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { appInitialStateType } from "../../lib/types";

const initialState: appInitialStateType = {
  isAsideOpen: false,
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
  },
});

export const appActions = appSLice.actions ;
export const appReducer = appSLice.reducer;
