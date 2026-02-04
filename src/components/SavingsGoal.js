import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, LinearProgress, TextField, Button } from "@mui/material";

export default function SavingsGoal({ expenses }) {
  const [goal, setGoal] = useState(0);       // Stored goal
  const [tempGoal, setTempGoal] = useState(""); // Input before saving

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  // Load saved goal from localStorage on mount
  useEffect(() => {
    const savedGoal = Number(localStorage.getItem("savingsGoal")) || 0;
    setGoal(savedGoal);
    setTempGoal(savedGoal);
  }, []);

  // Save goal
  const handleSaveGoal = () => {
    const numGoal = Number(tempGoal);
    if (numGoal <= 0) {
      alert("Please enter a valid goal!");
      return;
    }
    setGoal(numGoal);
    localStorage.setItem("savingsGoal", numGoal);
  };

  const remaining = Math.max(goal - totalExpenses, 0);
  const progress = goal === 0 ? 0 : Math.min((totalExpenses / goal) * 100, 100);

  // Smart message
  let message = "Set a savings goal to track your progress!";
  if (goal > 0) {
    if (remaining === 0) message = "🎉 Congratulations! Goal achieved!";
    else if (progress > 80) message = "⚠ Almost at your goal, careful with spending!";
    else message = "Keep going, you are on track!";
  }

  return (
    <Card sx={{ mt: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">💰 Monthly Savings Goal</Typography>

        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <TextField
            type="number"
            label="Enter Goal Amount"
            size="small"
            value={tempGoal}
            onChange={(e) => setTempGoal(e.target.value)}
          />
          <Button variant="contained" onClick={handleSaveGoal}>Save</Button>
        </Box>

        {goal > 0 && (
          <Box mt={3}>
            <Typography>Total Goal: ₹{goal}</Typography>
            <Typography>Remaining: ₹{remaining}</Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 5, mt: 1 }}
            />
            <Typography mt={1} color={remaining === 0 ? "green" : "text.secondary"}>
              {message}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
