"use client";

import AdminMenuList from "./AdminMenuList";
import { Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <div className="w-full p-6">
      {/* ヘッダー */}
      <div className="mb-8">
        <Typography variant="h4" className="font-bold text-gray-800">
          管理者ダッシュボード
        </Typography>
        <Typography variant="subtitle1" className="text-gray-500 mt-2">
          システム管理メニュー
        </Typography>
      </div>

      {/* メニューリスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminMenuList />
      </div>
    </div>
  );
};

export default AdminDashboard;
