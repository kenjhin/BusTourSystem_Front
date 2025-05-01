"use client";

import Buttons from "@/components/Common/Buttons";
import SearchBar from "@/components/Common/SearchBar";
import PackageTable from "@/containers/admin/packages/sub/PackageTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PackageData } from "@/data/package/package";
import { getPackageList } from "@/services/packagesService";
import { Box, Typography, Paper, Grid } from "@mui/material";

const PackageList = () => {
  const router = useRouter();
  const [packageData, setPackageData] = useState<PackageData[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackageList();
      setPackageData(data);
    };
    fetchPackages();
  }, []);

  return (
    <Box className="space-y-6">
      {/* 상단 필터 & 버튼 */}
      <Paper
        elevation={2}
        className="p-6 rounded-lg bg-white shadow-sm border border-gray-200"
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <SearchBar
              onSearch={(value) => console.log("検索語:", value)}
              onFilterChange={(value) => console.log("フィルター:", value)}
              isCreatePage={true}
            />
          </Grid>
          <Grid item xs={12} md={4} className="flex justify-end">
            <Link href="/admin/packages/create" passHref>
              <Buttons
                onCreateClick={() => router.push("/admin/packages/create")}
                isCreatePage={true}
                title="新規登録"
              />
            </Link>
          </Grid>
        </Grid>
      </Paper>

      {/* 패키지 테이블 */}
      <Paper elevation={2} className="p-4 rounded-lg shadow-sm bg-white">
        <Typography variant="h6" gutterBottom className="font-semibold mb-2">
          登録パッケージ一覧
        </Typography>
        <PackageTable packages={packageData} />
      </Paper>
    </Box>
  );
};

export default PackageList;
