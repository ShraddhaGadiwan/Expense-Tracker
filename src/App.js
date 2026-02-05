import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, useMediaQuery } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PieChartIcon from "@mui/icons-material/PieChart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SavingsIcon from "@mui/icons-material/EmojiEvents";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");

  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Add Expense", icon: <AddCircleIcon />, path: "/add" },
    { text: "Transactions", icon: <ReceiptIcon />, path: "/transactions" },
    { text: "Analytics", icon: <PieChartIcon />, path: "/analytics" },
    { text: "Financial Goals", icon: <SavingsIcon />, path: "/financial-goals" },
    { text: "Financial Coach", icon: <SupportAgentIcon />, path: "/financial-coach" }
  ];

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={!isMobile}
      sx={{
        "& .MuiDrawer-paper": {
          width: 220,
          background: "#111827",
          color: "#fff"
        }
      }}
    >
      <Box textAlign="center" py={3}>
        <Typography fontWeight="bold">
          💳 Expense Tracker
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: "#fff",
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              backgroundColor: location.pathname === item.path ? "rgba(59,130,246,0.25)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(59,130,246,0.35)"
              }
            }}
          >
            <ListItemIcon sx={{ color: "#60a5fa" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
