// LoginContainer.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

import { useDispatch } from "react-redux"; // Redux의 dispatch hook
import { setCredentials } from "../../store/slices/authSlice"; // authSlice에서 액션 import

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  // Reduxライブラリ
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      // Accesss Token : user -> encode ->  JWT
      //
      // Id Token :

      // Login>Redux
      const { token, role } = response.data;

      // JWt ライブラリ DECODE　デコード -> Store

      dispatch(setCredentials({ token }));

      //TODO :: dispatch(setUserInfo) >>

      // 이게 액션임 dispatch(setCredentials({ token, role }))이런 형태로 사용하는 문법인거임그냥
      // 굳이 표현하자면 상태를 변경하는 기능적인 부분에서 만 봤을때는 dispathch 가 UseState와 같은 느낌이라고 비유가 될듯

      // // TODO:ローカルストレージに格納せずに、reduxのstoreにdisfatchする
      // localStorage.setItem("token", token);
      // localStorage.setItem("role", role);

      // 権限についた「ページング」
      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(
        "ログインに失敗しました。アカウントまたはパスワードを確認してください。"
      );
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin} // ログイン要請の関数
    />
  );
};

export default LoginContainer;

//

//
