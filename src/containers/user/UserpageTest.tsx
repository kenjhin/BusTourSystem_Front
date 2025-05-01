"use client";

import React, { useState, useEffect } from "react";
import { Typography, Button, Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const UserPageTest = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featuredDestinations = [
    {
      title: "湯布院",
      image:
        "https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-04/yufuin-onsen-guide_5.jpg?itok=yscuXltH",
      description: "天国ような温泉の観光地を見学しよう！",
      price: "29,000円",
    },
    {
      title: "日田",
      image:
        "https://trvis.r10s.com/d/strg/ctrl/26/fb6accb7b88163291a9689f0a0700d8ff91c4ec3.47.9.26.3.jpg",
      description: "かまど地獄で不思議な経験ができる！！",
      price: "89,000円",
    },
    {
      title: "熊本",
      image:
        "https://trvis.r10s.com/d/strg/ctrl/26/a58c5937bb26dcb2c1ade9ea3e4f954e5856cae5.47.9.26.3.jpg",
      description: "阿蘇山を見ながら忘れない思い出を作る。",
      price: "60,000円",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === featuredDestinations.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* 관리자 진입 버튼 */}
      {user === null && (
        <Box sx={{ p: 2 }}>
          <Link
            href="/admin"
            className="flex items-center w-fit font-semibold border px-4 py-2 rounded-full shadow-md text-white bg-gray-800 hover:bg-gray-700"
          >
            <FaUserShield className="size-5 mr-1" />
            管理者ページ
          </Link>
        </Box>
      )}

      {/* 슬라이더 이미지 영역 */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "600px",
          overflow: "hidden",
        }}
      >
        {featuredDestinations.map((dest, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <img
              src={dest.image}
              alt={dest.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* 텍스트 오버레이 */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "white",
                textAlign: "center",
                px: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "32px", md: "48px" },
                  fontWeight: "bold",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                  mb: 2,
                }}
              >
                {dest.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                  mb: 4,
                  textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
                }}
              >
                {dest.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  backgroundColor: "#fbbf24", // amber-400 느낌
                  color: "#1f2937", // gray-800
                  fontWeight: "bold",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  "&:hover": { backgroundColor: "#f59e0b" }, // amber-500
                }}
              >
                詳細を見る
              </Button>
            </Box>
          </Box>
        ))}

        {/* 슬라이더 화살표 */}
        <IconButton
          sx={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.6)",
            "&:hover": { backgroundColor: "white" },
          }}
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? featuredDestinations.length - 1 : prev - 1
            )
          }
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.6)",
            "&:hover": { backgroundColor: "white" },
          }}
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === featuredDestinations.length - 1 ? 0 : prev + 1
            )
          }
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserPageTest;
