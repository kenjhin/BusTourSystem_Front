"use client";

import TopNavList from "./NaviList/TopNavList";
import Logo from "./Logo/Logo";
import { IconType } from "react-icons";
import { useState } from "react";
import ProfileModal from "@/components/Modal/ProfileModal";

interface TopBarProps {
  title: string;
  icon: IconType;
}

const TopBar: React.FC<TopBarProps> = ({ title, icon }) => {
  const [open, setOpen] = useState(false);
  // 테스트용 유저 정보 (실제 구현 시 store/redux 등에서 가져오면 됨)
  const user = { name: "관리자", email: "admin@example.com" };

  return (
    <div className="w-full bg-white-800 text-black flex items-center justify-between px-6 py-4 border-b border-gray-300">
      <Logo icon={icon} title={title} />
      <div className="flex items-center space-x-6">
        <TopNavList />
        <button
          className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-gray-100 border border-gray-200"
          onClick={() => setOpen(true)}
        >
          <span className="font-medium">{user.name}</span>
          <span className="text-gray-400 text-sm">{user.email}</span>
        </button>
      </div>
      <ProfileModal open={open} onClose={() => setOpen(false)} user={user} />
    </div>
  );
};

export default TopBar;
