import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

export default function MonthlyBudget({ expenses }) {
  const [budgets, setBudgets] = useState({});
  const [tempBudgets, setTempBudgets] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  // Load budgets from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("budgets")) || {};
    setBudgets(saved);
    setTempBudgets(saved);
  }, []);

  // Save budgets
  const handleSaveBudget = (cat) => {
    const updatedBudgets = { ...tempBudgets };
    setBudgets(updatedBudgets);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    checkAlert(cat, updatedBudgets[cat]);
  };

  // Calculate spent per category
  const spentPerCategory = {};
  categories.forEach((cat) => {
    spentPerCategory[cat] =
      expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + Number(e.amount || 0), 0) || 0;
  });

  // Check if spending exceeds budget and trigger alert
  const checkAlert = (cat, budget) => {
    const spent = spentPerCategory[cat] || 0;
    if (budget > 0 && spent > budget) {
      setAlertMsg(`⚠ ${cat} spending exceeded the budget!`);
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Card sx={{ mt: 3, borderRadius: 3, padding: 2 }}>
        <CardContent>
          <Typography fontWeight="bold" variant="h6">
            📊 Monthly Budget Limits
          </Typography>

          <Box mt={2} display="flex" flexDirection="column" gap={3}>
            {categories.map((cat) => {
              const spent = spentPerCategory[cat];
              const budget = Number(tempBudgets[cat] || 0);
              const progress =
                budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
              const overBudget = budget > 0 && spent > budget;

              return (
                <Box key={cat}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight="bold">
                      {cat} {overBudget && "⚠"}
                    </Typography>
                    <Typography
                      fontSize={14}
                      color={overBudget ? "error.main" : "text.secondary"}
                    >
                      {budget > 0 ? `${progress.toFixed(1)}% used` : "-"}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mt: 1,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          progress < 70
                            ? "#4caf50"
                            : progress < 100
                            ? "#ffb74d"
                            : "#f44336",
                      },
                    }}
                  />

                  <Box display="flex" gap={1} mt={1}>
                    <TextField
                      type="number"
                      size="small"
                      placeholder="Set budget"
                      value={tempBudgets[cat] || ""}
                      onChange={(e) =>
                        setTempBudgets({
                          ...tempBudgets,
                          [cat]: e.target.value,
                        })
                      }
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveBudget(cat)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
