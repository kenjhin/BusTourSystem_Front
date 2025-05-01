// LoginForm.tsx
"use client";

import { TextField, Button, Card } from "@mui/material";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

// props interface定義
interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}

const LoginForm = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onLogin,
}: LoginFormProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-8 w-full max-w-md shadow-lg rounded-2xl bg-white">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
          <MdAdminPanelSettings className="text-blue-600 text-3xl" />
          MinnanoTravel
        </h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <TextField
            label="アカウント"
            variant="outlined"
            fullWidth
            className="bg-white"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <TextField
            label="パスワード"
            type="password"
            variant="outlined"
            fullWidth
            className="bg-white"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            type="submit"
          >
            ログイン
          </Button>
        </form>
        <Link href="/register">会員登録</Link>
      </Card>
    </div>
  );
};

export default LoginForm;
