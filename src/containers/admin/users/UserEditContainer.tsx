import React from "react";

interface UserEditContainerProps {
  userId: string;
}

// 목데이터 예시
const mockUser = {
  id: "1",
  name: "山田 太郎",
  email: "taro.yamada@example.com",
  company: "株式会社サンプル",
};

const UserEditContainer: React.FC<UserEditContainerProps> = ({ userId }) => {
  // 실제로는 userId로 fetch 등 처리
  const user = mockUser;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">ユーザー情報編集</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">氏名</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            defaultValue={user.name}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">メールアドレス</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            defaultValue={user.email}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">会社名</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            defaultValue={user.company}
          />
        </div>
        <div className="pt-4 border-t border-gray-200">
          <label className="block text-gray-700 mb-1">新しいパスワード</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="新しいパスワードを入力"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">パスワード確認</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="もう一度入力してください"
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            保存
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditContainer;
