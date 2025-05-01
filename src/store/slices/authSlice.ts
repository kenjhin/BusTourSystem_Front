// features/auth/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  // role: string | null;
}

const initialState: AuthState = {
  token: null,
  // role: null,
};
// アースauth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인 성공 시 토큰과 권한 정보를 저장하는 액션1
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      // state.role = action.payload.role;
    },
    // 로그아웃 시 상태를 초기화하는 액션2
    credentials: (state) => {
      state.token = null;

      // state.role = null;
    },
  },
});

// 액션과 리듀서 내보내기
export const { setCredentials, credentials } = authSlice.actions;

export default authSlice.reducer;
