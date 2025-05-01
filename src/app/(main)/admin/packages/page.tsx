"use client";

import PackageList from "@/containers/admin/packages/PackageList";
import AdminLayout from "@/layouts/AdminLayout";
import { Typography, Box } from "@mui/material";

const AdminPackages = () => {
  return (
    <AdminLayout>
      <Box className="py-10 px-4">
        <Typography variant="h4" className="text-center font-bold mb-8">
          パッケージ管理
        </Typography>
        <PackageList />
      </Box>
    </AdminLayout>
  );
};

export default AdminPackages;
