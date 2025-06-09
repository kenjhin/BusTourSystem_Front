import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    company?: string;
    id: string;
  };
  onLogout?: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onClose,
  user,
  onLogout,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-6 z-50 border border-gray-200"
      style={{ minWidth: 220 }}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}
        tabIndex={-1}
      >
        ×
      </button>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
          {user.name.charAt(0)}
        </div>
        <div className="text-sm text-gray-600 font-medium">
          {user.company || "株式会社サンプル"}
        </div>
        <div className="text-base font-semibold">{user.name}</div>
        <div className="text-gray-500 text-sm">{user.email}</div>
        <button
          className="mt-2 text-sm text-gray-700 hover:underline focus:outline-none bg-transparent p-0"
          onClick={() => {
            router.push(`/admin/users/${user.id}/edit`);
            onClose();
          }}
        >
          ユーザー情報編集
        </button>
        {onLogout && (
          <button
            className="mt-2 text-sm text-gray-700 hover:underline focus:outline-none bg-transparent p-0"
            onClick={onLogout}
          >
            ログアウト
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
