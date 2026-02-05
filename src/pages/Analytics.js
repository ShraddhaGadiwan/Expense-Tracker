import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"];

export default function Analytics({ expenses = [], budgets = {} }) {

  const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

  const data = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
    return { name: cat, value: total };
  });

  const totalExpenses = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div style={{ marginLeft: 240, padding: 25 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📊 Expense Analytics
      </Typography>

      {/* Pie Chart Section */}
      <Card sx={{ borderRadius: 3, mb: 3, p: 2 }}>
        <CardContent>
          <Typography fontWeight="bold" mb={2}>
            Category Spending Overview
          </Typography>

          {totalExpenses > 0 ? (
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => {
                  const percent = totalExpenses
                    ? ((entry.value / totalExpenses) * 100).toFixed(1)
                    : 0;
                  return `${entry.name}: ₹${entry.value} (${percent}%)`;
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          ) : (
            <Typography color="text.secondary">
              Add expenses to display chart.
            </Typography>
          )}

          {/* Insights */}
          <Box mt={2}>
            {data.map((cat) => {
              const spent = cat.value;
              const percent = totalExpenses
                ? ((spent / totalExpenses) * 100).toFixed(1)
                : 0;

              const budgetLimit = budgets?.[cat.name] || 0;
              const overBudget = budgetLimit > 0 && spent > budgetLimit;

              return (
                <Typography
                  key={cat.name}
                  color={overBudget ? "error.main" : "text.primary"}
                  sx={{ mt: 1 }}
                >
                  {cat.name}: ₹{spent} ({percent}%)
                  {overBudget ? " ⚠ Over Budget!" : ""}
                </Typography>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card sx={{ borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography fontWeight="bold">💡 Spending Suggestions</Typography>

          <Typography mt={1} color="text.secondary">
            {totalExpenses > 0
              ? totalExpenses > Object.values(budgets || {}).reduce((a, b) => a + b, 0)
                ? "⚠ You have exceeded your total budget!"
                : "Your spending is within limits."
              : "Add expenses to see analytics."}
          </Typography>

        </CardContent>
      </Card>

    </div>
  );
}
