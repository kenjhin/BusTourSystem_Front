"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCheckInList } from "@/services/checkInService";
import Buttons from "@/components/Common/Buttons";
import SearchBar from "@/components/Common/SearchBar";
import CheckInTable from "./sub/CheckInTable";
import InputBox from "@/components/Common/InputBox";
import CSVModal from "@/components/Modal/CSVModal";
import ExcelModal from "@/components/Modal/ExcelModal";
import { CheckInData } from "@/data/checkin/checkIn";

import { Box, Typography, Paper, Grid, Divider, Button } from "@mui/material";

interface CheckInListProps {
  id?: string;
}

const CheckInList: React.FC<CheckInListProps> = ({ id }) => {
  const [checkinData, setCheckinData] = useState<CheckInData[]>([]);
  const [isCSVModalOpen, setCSVModalOpen] = useState(false);
  const [isExcelModalOpen, setExcelModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCheckInList(id).then(setCheckinData);
  }, [id]);

  const packageInfo =
    id && checkinData.length > 0
      ? {
          packageName: checkinData[0].packageName,
          departureDate: checkinData[0].departureDate,
          staffName: checkinData[0].staffName,
        }
      : null;

  return (
    <Box className="space-y-6">
      {/* 상단 검색 및 정보 카드 */}
      <Paper
        elevation={2}
        className="p-6 rounded-lg bg-white shadow-sm border border-gray-200"
      >
        <Typography variant="h6" className="mb-4 font-semibold">
          チェックイン情報
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <InputBox
              label="パッケージ名"
              value={packageInfo?.packageName ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InputBox
              label="出発予定"
              value={packageInfo?.departureDate ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InputBox label="担当者" value={packageInfo?.staffName ?? ""} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SearchBar
              label="顧客名"
              onSearch={(value) => console.log("検索語:", value)}
              isCreatePage={true}
            />
          </Grid>
        </Grid>

        <Box className="flex justify-between items-center mt-6">
          <Buttons
            isCreatePage={true}
            onCreateClick={() =>
              router.push(
                id ? `/admin/checkin/create/${id}` : "/admin/checkin/create"
              )
            }
            title="新規登録"
          />

          <Box className="space-x-2">
            <Button
              variant="outlined"
              onClick={() => setExcelModalOpen(true)}
              sx={{ bgcolor: "#f3f4f6" }}
            >
              Excel管理
            </Button>
            <Button
              variant="outlined"
              onClick={() => setCSVModalOpen(true)}
              sx={{ bgcolor: "#f3f4f6" }}
            >
              CSV管理
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 체크인 테이블 */}
      <Paper elevation={2} className="p-4 rounded-lg shadow-sm bg-white">
        <Typography variant="h6" gutterBottom className="font-semibold mb-2">
          顧客チェックイン一覧
        </Typography>
        <CheckInTable checkinList={checkinData} />
      </Paper>

      {/* Modal */}
      <ExcelModal
        isOpen={isExcelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
      <CSVModal
        isOpen={isCSVModalOpen}
        onClose={() => setCSVModalOpen(false)}
      />
    </Box>
  );
};

export default CheckInList;
