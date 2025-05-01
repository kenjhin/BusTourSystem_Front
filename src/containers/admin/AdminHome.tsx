"use client";

import AdminMenuTab from "./adminMenu/AdminMenuTab";
import { Typography } from "@mui/material";

const AdminHome = () => {
  return (
    <div className="w-full px-4 py-10">
      {/* 대시보드 제목 */}
      <Typography variant="h4" className="text-center font-bold mb-8">
        管理者メニュー
      </Typography>

      {/* 관리자 메뉴 */}
      <AdminMenuTab />
    </div>
  );
};

export default AdminHome;
