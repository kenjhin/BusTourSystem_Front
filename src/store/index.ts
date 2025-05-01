"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";

// npm install redux-persist
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// persist設定
// TIP::結局、ごれもLocalStorageを利用することで　Stroeの状態をLoacalStorageに保存する、
const persistConfig = {
  key: "root", // 로컬 스토리지에서 이 Redux persist의 데이터를 식별하기 위한 이름 혹은 키 ("root"로 지정)
  storage, // 어떤 스토리지를 사용할지 결정 > 로컬 스토리지 사용
  whitelist: ["auth"], // 스토어의 어떤 슬라이스를 영속화 할지? 인증정보(토큰)인 > auth slice만 영속화,
};
// >> persistConfig의 객체생성

// 여러 slice들을 하나로 합치기 위해 combineReducers 사용
// 리덕스 퍼시스트가 전체 상태를 저장할수 있게 하기위해 하나로 합침.
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// persistReducer: Redux Persist가 rootReducer에 대해 적용되도록 함
// auth에도 적용이 되고 user에도 적용이 됌 , 왜? 루트리듀서에서 컴바인으로 묶었으니까.
const persistedReducer = persistReducer(persistConfig, rootReducer);
// 여튼 persistedReducer 생성>

// Redux Store 設定
// TIP::configureStoreは、Redux Toolkitで提供する関数, 色んな sliceを登録して一つStoreを生成する。
export const store = configureStore({
  reducer: persistedReducer,
  // getDefaultMiddleware는 인자로 전달받아 호출해야 합니다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist가 내부적으로 사용하는 액션의 non-serializable 값을 무시합니다.
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REGISTER",
        ],
      },
    }),
});

// TIP :: "Reducer" 현재 상태와 액션을 받아서 새로운 상태를 반환하는 순수 함수? 퓨어 펑션
// 순수 함수 > 같은 입력이 들어오면 항상 같은 값을 출력하고 외부 상태나 부수 효과가 없어야함.
// 要約 > 현재 상태와 요청을 받아서 새로운 상태를 만들어주는 레시피 > 리듀서

// Persistor 생성: 스토어 상태를 로컬 스토리지에 저장 및 복원 관리
export const persistor = persistStore(store);

// 루트 상태 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;

// 디스패치 타입 내보내기
export type AppDispatch = typeof store.dispatch;
