"use client";

import RegisterAd from "@/containers/register/RegisterAd";
import RegisterForm from "@/containers/register/RegisterForm";
import RegistrationForm from "@/containers/register/RegistrationForm";

// registerpage最上位

const registerPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 전체 컨테이너 높이를 Rakuten처럼 calc(100vh - 50px)로 지정 */}
      <div className="flex w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden h-[calc(100vh-50px)]">
        {/* 왼쪽 영역: 폼 영역 (내용이 넘치면 세로 스크롤 발생) */}
        <div className="w-1/2 p-8 overflow-y-auto">
          <h1 className="text-4xl font-bold text-center mb-6">会員登録</h1>
          <RegistrationForm />
        </div>
        {/* 오른쪽 영역: 안내 문구 영역 (내용이 넘치면 세로 스크롤 발생) */}
        <div className="w-1/2 p-8 bg-gray-50 overflow-y-auto">
          <RegisterAd />
        </div>
      </div>
    </div>
  );
};

export default registerPage;
