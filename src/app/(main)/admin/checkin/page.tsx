"use client";

import CheckInList from "@/containers/admin/checkin/CheckInList";
import AdminLayout from "@/layouts/AdminLayout";
import { Box, Typography } from "@mui/material";

const AdminCheckin = () => {
  return (
    <AdminLayout>
      <Box className="py-10 px-4">
        <Typography variant="h4" className="text-center font-bold mb-8">
          チェックインリスト
        </Typography>
        <CheckInList />
      </Box>
    </AdminLayout>
  );
};

export default AdminCheckin;
