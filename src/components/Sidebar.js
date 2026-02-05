import { useState } from "react";
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

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PieChartIcon from "@mui/icons-material/PieChart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SavingsIcon from "@mui/icons-material/EmojiEvents";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);

  // Hide sidebar on auth pages
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

  const drawerContent = (
    <Box>
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
                  ? "rgba(255,255,255,0.18)"
                  : "transparent",
              transition: "0.25s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.28)",
                transform: "translateX(6px)"
              }
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 12, left: 12, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              width: 220,
              background: "linear-gradient(180deg, #1e3c72, #2a5298)",
              color: "#fff",
              borderRight: "none"
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 220,
              background: "linear-gradient(180deg, #1e3c72, #2a5298)",
              color: "#fff"
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
