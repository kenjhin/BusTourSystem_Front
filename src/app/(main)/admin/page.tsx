"use client";

import AlertWindow from "@/components/Common/AlertWindow";
import AdminHome from "@/containers/admin/AdminHome";
import AdminLayout from "@/layouts/AdminLayout";

import type { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const router = useRouter();
  const hasAlerted = useRef(false);
  const allowedRoles = ["MASTER", "ADMIN", "GUIDE"];

  const [alertOpen, setAlertOpen] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.user);

  const handleAlertClose = () => {
    setAlertOpen(false);
    router.push("/login");
  };

  return (
    <AdminLayout>
      {/* ✅ 여백 제거, 꽉 차게 */}
      <AdminHome />

      {/* Alert 창 */}
      <AlertWindow
        open={alertOpen}
        onClose={handleAlertClose}
        title="Access Denied"
        message="あなたは、管理者ではありません。"
      />
    </AdminLayout>
  );
};

export default AdminPage;
