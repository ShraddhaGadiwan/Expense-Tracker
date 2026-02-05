import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  LinearProgress,
  Button,
  TextField
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PsychologyIcon from "@mui/icons-material/Psychology";


export default function Dashboard({ income = 0, setIncome, expenses = [] }) {
  const [editMode, setEditMode] = useState(false);
  const [tempIncome, setTempIncome] = useState(income || 0);

  // Sync income if updated
  useEffect(() => {
    setTempIncome(income || 0);
  }, [income]);

  // Safe total expenses
  const totalExpenses = useMemo(() => {
    return (expenses || []).reduce(
      (sum, e) => sum + Number(e?.amount || 0),
      0
    );
  }, [expenses]);

  // Safe balance
  const safeIncome = Number(income || 0);
  const balance = safeIncome - totalExpenses;

  // Save income
  const handleSaveIncome = () => {
    const newIncome = Number(tempIncome || 0);
    setIncome(newIncome);
    localStorage.setItem("income", newIncome);
    setEditMode(false);
  };

  // Financial health score
  const healthScore = useMemo(() => {
    if (!safeIncome || safeIncome === 0) return 0;
    const ratio = totalExpenses / safeIncome;
    return Math.max(0, Math.round(100 - ratio * 100));
  }, [safeIncome, totalExpenses]);

  // Personality logic
  const personality =
    totalExpenses < safeIncome * 0.5
      ? "Saver 🟢"
      : totalExpenses < safeIncome * 0.8
      ? "Balanced 🟡"
      : "Big Spender 🔴";

  // Smart suggestion
  let suggestion = "Add income to start tracking";
  if (safeIncome > 0) {
    if (totalExpenses > safeIncome)
      suggestion = "⚠ You spent more than your income!";
    else if (totalExpenses > safeIncome * 0.7)
      suggestion = "Try reducing shopping & food expenses.";
    else suggestion = "Great job! Your spending is under control.";
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
    <div style={{ marginLeft: 240, padding: 25 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        💳 Financial Overview
      </Typography>

      <Grid container spacing={3}>
        {/* TOTAL BALANCE */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: "#f7f9fc" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <AccountBalanceWalletIcon color="primary" />
                <Typography>Total Balance</Typography>
              </Box>
              <Typography variant="h5" fontWeight="bold" mt={1}>
                ₹{balance || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* MONTHLY INCOME */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, background: "#f1fdf7" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <TrendingUpIcon color="success" />
                  <Typography>Monthly Income</Typography>
                </Box>

                {!editMode && (
                  <Button size="small" onClick={(dashboard) => setEditMode(true)}>
                    Edit
                  </Button>
                )}
              </Box>

              {editMode || safeIncome === 0 ? (
                <Box mt={1} display="flex" gap={1}>
                  <TextField
                    type="number"
                    size="small"
                    placeholder="Enter income"
                    value={tempIncome}
                    onChange={(e) => setTempIncome(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleSaveIncome}>
                    Save
                  </Button>
                </Box>
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
              <Box display="flex" alignItems="center" gap={1}>
                <TrendingDownIcon color="error" />
                <Typography>Monthly Expenses</Typography>
              </Box>

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
              <Box display="flex" alignItems="center" gap={1}>
                <PsychologyIcon color="primary" />
                <Typography fontWeight="bold">
                  Financial Health Score
                </Typography>
              </Box>

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
    </div>
  
  </Box>);
}
