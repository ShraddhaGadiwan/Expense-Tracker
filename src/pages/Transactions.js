import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
    <Box sx={{ ml: { xs: 0, md: "240px" }, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📊 Transactions Analytics
      </Typography>

      <Card sx={{ borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography fontWeight="bold" mb={2}>
            Category Spending Overview
          </Typography>

          {totalExpenses === 0 ? (
            <Typography color="text.secondary" mt={2}>
              No transactions yet. Add expenses to see analytics.
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ name, value }) => `${name}: ₹${value}`}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip formatter={(value) => `₹${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
