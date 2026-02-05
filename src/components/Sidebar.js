import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  useMediaQuery
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PieChartIcon from "@mui/icons-material/PieChart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SavingsIcon from "@mui/icons-material/EmojiEvents";
import MenuIcon from "@mui/icons-material/Menu";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 220;

export default function Sidebar() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Add Expense", icon: <AddCircleIcon />, path: "/add" },
    { text: "Transactions", icon: <ReceiptIcon />, path: "/transactions" },
    { text: "Analytics", icon: <PieChartIcon />, path: "/analytics" },
    { text: "Financial Goals", icon: <SavingsIcon />, path: "/financial-goals" },
    { text: "Financial Coach", icon: <SupportAgentIcon />, path: "/financial-coach" }
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 15, left: 15, zIndex: 1400, color: "#1e3c72" }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #1e3c72, #2a5298)",
            color: "#fff"
          }
        }}
      >
        <Box textAlign="center" py={3}>
          <Typography variant="h6" fontWeight="bold">
            💳 Expense Tracker
          </Typography>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setOpen(false)}
              sx={{
                color: "#fff",
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                transition: "0.25s",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.25)",
                  transform: "translateX(4px)"
                }
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 38 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
