// src/store/slices/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// [중요] jwt-decode 3.x 버전은 default export가 존재하므로,
//       이런 식으로 import 가능:
import jwt_decode from "jwt-decode";

// 실제 유저 데이터 타입 정의 (토큰 해독 결과와 맞춰주세요)
interface User {
  email: string;
  role: string;
}

// 유저 슬라이스 상태 구조 정의
interface UserState {
  user: User | null;
  loading: boolean;
}

// 초기 상태 설정
const initialState: UserState = {
  user: null,
  loading: false,
};

// JWT 토큰의 페이로드 구조 정의
// (백엔드가 토큰에 넣어둔 payload 스키마에 맞춰 작성)
interface JwtPayload {
  email: string;
  role: string;
}

// 토큰 디코딩용 헬퍼 함수
function decodeJwt<T>(token: string): T {
  // jwt_decode(3.x)는 default export 이므로 바로 호출 가능
  return jwt_decode<T>(token);
}

// fetchUser thunk: auth slice에 저장된 token을 가져와 디코딩하여 user 정보를 설정
export const fetchUser = createAsyncThunk<
  User | null,
  void,
  { state: RootState }
>("user/fetchUser", async (_, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  if (!token) {
    return null;
  }

  try {
    const decoded = decodeJwt<JwtPayload>(token);
    const userData: User = {
      email: decoded.email,
      role: decoded.role,
    };

    console.log("fetchUser: Decoded token:", decoded);
    return userData;
  } catch (error) {
    console.error("fetchUser: Token decoding error:", error);
    return rejectWithValue(null);
  }
});

// WBS

// userSlice 생성
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // (로그아웃 등은 authSlice에서 관리하신다면 여기서 제외)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

// WBS
// WBS format 《フォーマット》　日付　・　<開始日>と<終了日>
// 予定<開始日>と<終了日>
// 実施<開始日>と<終了日>
//  >> User側 >>17まで
// 見積 >>
// 項目ごとに、何をしようか書かないといけない
