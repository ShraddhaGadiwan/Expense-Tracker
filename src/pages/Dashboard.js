import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Button,
  TextField
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Box as MUIBox } from "@mui/material";

export default function Dashboard({ income = 0, setIncome, expenses = [] }) {
  const [editMode, setEditMode] = useState(false);
  const [tempIncome, setTempIncome] = useState(income || 0);

  useEffect(() => {
    setTempIncome(income || 0);
  }, [income]);

  const totalExpenses = useMemo(() => {
    return (expenses || []).reduce(
      (sum, e) => sum + Number(e?.amount || 0),
      0
    );
  }, [expenses]);

  const safeIncome = Number(income || 0);
  const balance = safeIncome - totalExpenses;

  const handleSaveIncome = () => {
    const newIncome = Number(tempIncome || 0);
    setIncome(newIncome);
    localStorage.setItem("income", newIncome);
    setEditMode(false);
  };

  const healthScore = useMemo(() => {
    if (!safeIncome) return 0;
    const ratio = totalExpenses / safeIncome;
    return Math.max(0, Math.round(100 - ratio * 100));
  }, [safeIncome, totalExpenses]);

  const personality =
    totalExpenses < safeIncome * 0.5
      ? "Saver 🟢"
      : totalExpenses < safeIncome * 0.8
      ? "Balanced 🟡"
      : "Big Spender 🔴";

  let suggestion = "Add income to start tracking";
  if (safeIncome > 0) {
    if (totalExpenses > safeIncome)
      suggestion = "⚠ You spent more than your income!";
    else if (totalExpenses > safeIncome * 0.7)
      suggestion = "Try reducing shopping & food expenses.";
    else suggestion = "Great job! Your spending is under control.";
  }

  return (
    <MUIBox sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
      
      <Typography variant="h4" fontWeight="bold" mb={3}>
        💳 Financial Overview
      </Typography>

      <Grid container spacing={3}>
        {/* BALANCE */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: "#f7f9fc" }}>
            <CardContent>
              <MUIBox display="flex" alignItems="center" gap={1}>
                <AccountBalanceWalletIcon color="primary" />
                <Typography>Total Balance</Typography>
              </MUIBox>
              <Typography variant="h5" fontWeight="bold" mt={1}>
                ₹{balance || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* INCOME */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: "#f1fdf7" }}>
            <CardContent>
              <MUIBox display="flex" justifyContent="space-between">
                <MUIBox display="flex" alignItems="center" gap={1}>
                  <TrendingUpIcon color="success" />
                  <Typography>Monthly Income</Typography>
                </MUIBox>

                {!editMode && (
                  <Button size="small" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                )}
              </MUIBox>

              {editMode || safeIncome === 0 ? (
                <MUIBox mt={1} display="flex" gap={1}>
                  <TextField
                    type="number"
                    size="small"
                    placeholder="Enter income"
                    value={tempIncome}
                    onChange={(e) => setTempIncome(e.target.value)}
                    fullWidth
                  />
                  <Button variant="contained" onClick={handleSaveIncome}>
                    Save
                  </Button>
                </MUIBox>
              ) : (
                <Typography variant="h5" fontWeight="bold" mt={1}>
                  ₹{safeIncome}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* EXPENSES */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: "#fff5f5" }}>
            <CardContent>
              <MUIBox display="flex" alignItems="center" gap={1}>
                <TrendingDownIcon color="error" />
                <Typography>Monthly Expenses</Typography>
              </MUIBox>

              <Typography variant="h5" fontWeight="bold" mt={1}>
                ₹{totalExpenses || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* HEALTH SCORE */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <MUIBox display="flex" alignItems="center" gap={1}>
                <PsychologyIcon color="primary" />
                <Typography fontWeight="bold">
                  Financial Health Score
                </Typography>
              </MUIBox>

              <Typography variant="h4" fontWeight="bold" mt={1}>
                {healthScore}/100
              </Typography>

              <LinearProgress
                variant="determinate"
                value={healthScore}
                sx={{ mt: 1, height: 8, borderRadius: 5 }}
              />

              <Typography mt={1} color="text.secondary">
                {healthScore > 75
                  ? "Excellent money control"
                  : healthScore > 50
                  ? "Moderate spending habits"
                  : "Needs better spending control"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* PERSONALITY */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight="bold">
                Spending Personality
              </Typography>

              <Chip
                label={personality}
                color="primary"
                sx={{ mt: 1, fontSize: 16 }}
              />

              <Typography mt={1} color="text.secondary">
                {personality.includes("Saver")
                  ? "You save well — great discipline!"
                  : personality.includes("Balanced")
                  ? "You manage money responsibly"
                  : "Try controlling unnecessary expenses"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SMART COACH */}
      <Card sx={{ mt: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight="bold">
            💬 Smart Budget Coach
          </Typography>

          <Typography mt={1} color="text.secondary">
            {suggestion}
          </Typography>
        </CardContent>
      </Card>

    </MUIBox>
  );
}
