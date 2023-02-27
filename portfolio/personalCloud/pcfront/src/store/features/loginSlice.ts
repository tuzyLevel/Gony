import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

export interface loginState {
  userId: string;
}

const initialState: loginState = {
  userId: "logout",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = "logout";
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
