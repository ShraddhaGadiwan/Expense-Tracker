import { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import SavingsGoal from "../components/SavingsGoal";
import MonthlyBudget from "../components/MonthlyBudget";

export default function FinancialGoals({ income, expenses, budgets, setBudgets }) {
  return (
    <div style={{ marginLeft: 240, padding: 25 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🎯 Financial Goals & Budget
      </Typography>

      <Grid container spacing={3}>
        {/* Monthly Budget Limits */}
        <Grid item xs={12} md={6}>
          <MonthlyBudget expenses={expenses} budgets={budgets} setBudgets={setBudgets} />
        </Grid>

        {/* Savings Goal */}
        <Grid item xs={12} md={6}>
          <SavingsGoal income={income} expenses={expenses} />
        </Grid>
      </Grid>
    </div>
  );
}
