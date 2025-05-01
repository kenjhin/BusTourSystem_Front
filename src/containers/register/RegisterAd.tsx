// components/RegisterAd.tsx
import React from "react";

const RegisterAd: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50">
      {/* 안내 제목 */}
      <h2 className="text-2xl font-semibold mb-4">もっとお得に、便利に</h2>
      {/* 안내 문구 */}
      <p className="text-gray-700">
        みんなのに登録すると、様々な特典やサービスを利用できます。ここではそのメリットをご紹介します。
      </p>
      {/* 장점 목록 */}
      <ul className="mt-4 list-disc list-inside text-gray-700">
        <li>効率的な業務環境を支援</li>
        <li>最適な管理者のモード</li>
        <li>現場でも使えるように</li>
      </ul>
    </div>
  );
};

export default RegisterAd;
