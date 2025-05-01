"use client";

import AutuModal from "@/components/Modal/AutuModal";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import {
  MdManageAccounts,
  MdOutlineDirectionsBus,
  MdGroup,
  MdOutlineAddBox,
  MdInsights,
  MdAttachMoney,
  MdDesignServices,
} from "react-icons/md";

interface MenuItem {
  title: string;
  description?: string;
  route?: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    title: "パッケージ管理",
    route: "/admin/packages",
    icon: <MdOutlineDirectionsBus size={40} />,
  },
  {
    title: "チェックイン管理",
    route: "/admin/checkin",
    icon: <MdManageAccounts size={40} />,
  },
  {
    title: "スタッフ管理",
    route: "/admin/staff",
    icon: <MdGroup size={40} />,
  },
  {
    title: "ドライバー管理",
    route: "/admin/driver",
    icon: <MdOutlineDirectionsBus size={40} />,
  },
  {
    title: "アカウント登録",
    route: "/admin/create",
    icon: <MdOutlineAddBox size={40} />,
  },
  {
    title: "全体通計",
    route: "/admin/count",
    icon: <MdInsights size={40} />,
  },
  {
    title: "予算",
    route: "/admin/count",
    icon: <MdAttachMoney size={40} />,
  },
  {
    title: "基本設計",
    route: "/admin/count",
    icon: <MdDesignServices size={40} />,
  },
];

export default function AdminMenuTab() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ backgroundColor: "#f1f5f9", minHeight: "100vh", py: 6 }}>
      <Grid container spacing={4} justifyContent="center">
        {menuItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            {item.route === "/admin/create" ? (
              <CardActionArea onClick={() => setOpen(true)}>
                <Card
                  className="hover:shadow-lg transition-all duration-300"
                  sx={{
                    height: "180px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <Box color="#1e40af">{item.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: 600, color: "#1e293b" }}
                  >
                    {item.title}
                  </Typography>
                </Card>
              </CardActionArea>
            ) : (
              <Link
                href={item.route ?? "/admin"}
                style={{ textDecoration: "none" }}
              >
                <CardActionArea>
                  <Card
                    className="hover:shadow-lg transition-all duration-300"
                    sx={{
                      height: "180px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 3,
                      p: 2,
                    }}
                  >
                    <Box color="#1e40af">{item.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ mt: 2, fontWeight: 600, color: "#1e293b" }}
                    >
                      {item.title}
                    </Typography>
                  </Card>
                </CardActionArea>
              </Link>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
