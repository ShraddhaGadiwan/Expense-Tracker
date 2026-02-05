import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import SavingsGoal from "../components/SavingsGoal";
import MonthlyBudget from "../components/MonthlyBudget";

export default function FinancialGoals({ income, expenses = [], budgets = {}, setBudgets }) {
  return (
    <Box sx={{ ml: { xs: 0, md: "240px" }, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🎯 Financial Goals & Budget
      </Typography>

      <Grid container spacing={3}>
        {/* Monthly Budget Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={1}>
                📅 Monthly Budget Limits
              </Typography>
              <MonthlyBudget
                expenses={expenses}
                budgets={budgets}
                setBudgets={setBudgets}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Savings Goal Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={1}>
                💰 Savings Goal Tracker
              </Typography>
              <SavingsGoal
                income={income}
                expenses={expenses}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
