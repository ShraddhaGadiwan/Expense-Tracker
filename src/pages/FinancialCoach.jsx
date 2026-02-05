import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Divider,
  useMediaQuery
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";

export default function FinancialCoach({ income, expenses }) {

  const isMobile = useMediaQuery("(max-width:900px)");

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [expenses]
  );

  const savings = income - totalExpenses;

  const spendingRate = income > 0 
    ? Math.round((totalExpenses / income) * 100) 
    : 0;

  const healthScore = income === 0
    ? 0
    : Math.max(0, Math.round(100 - spendingRate));

  let coachMood = "Neutral";
  let coachMessage = "";
  let investmentTip = "";

  if (income === 0) {
    coachMood = "Warning";
    coachMessage = "Add income so I can guide your financial planning.";
  } else if (totalExpenses > income) {
    coachMood = "Critical";
    coachMessage = "You are overspending. Reduce unnecessary costs urgently.";
    investmentTip = "Avoid investing now. Focus on saving first.";
  } else if (spendingRate > 80) {
    coachMood = "Alert";
    coachMessage = "Spending is very high. Try saving at least 20%.";
    investmentTip = "Start small SIP investments only.";
  } else if (spendingRate > 60) {
    coachMood = "Balanced";
    coachMessage = "You are financially stable. Improve savings further.";
    investmentTip = "Consider mutual funds or recurring deposits.";
  } else {
    coachMood = "Excellent";
    coachMessage = "Great financial discipline. You are ready to grow wealth.";
    investmentTip = "You can explore stocks, SIPs, and long-term investments.";
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 3 },
        marginLeft: { xs: 0, md: "220px" }, // sidebar space only on desktop
        transition: "0.3s"
      }}
    >

      <Typography variant="h4" fontWeight="bold" mb={3}>
        🧠 Financial Coach
      </Typography>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <PsychologyIcon color="primary" />
            <Typography fontWeight="bold">
              Financial Health Score
            </Typography>
          </Box>

          <Typography variant="h3" fontWeight="bold" mt={1}>
            {healthScore}/100
          </Typography>

          <LinearProgress
            variant="determinate"
            value={healthScore}
            sx={{ mt: 1, height: 8, borderRadius: 5 }}
          />

          <Typography mt={1} color="text.secondary">
            Spending Rate: {spendingRate}%
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight="bold">🤖 AI Financial Coach</Typography>

          <Chip
            label={coachMood}
            sx={{ mt: 1 }}
            color={
              coachMood === "Critical" ? "error" :
              coachMood === "Alert" ? "warning" :
              coachMood === "Excellent" ? "success" :
              "primary"
            }
          />

          <Divider sx={{ my: 2 }} />

          <Typography color="text.secondary">
            {coachMessage}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight="bold">
            📈 Personalized Investment Guidance
          </Typography>

          <Typography mt={1}>💰 Monthly Savings: ₹{savings}</Typography>
          <Typography>🎯 Suggested Savings Goal: ₹{Math.round(income * 0.25)}</Typography>
          <Typography>📊 Investment Tip: {investmentTip}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight="bold">
            🗓 Smart Monthly Action Plan
          </Typography>

          <Typography mt={1}>✅ Reduce unnecessary expenses</Typography>
          <Typography>✅ Save at least ₹{Math.round(income * 0.2)}</Typography>
          <Typography>✅ Avoid impulse purchases</Typography>
          <Typography>✅ Track spending weekly</Typography>
          <Typography>✅ Start or increase investment SIP</Typography>
        </CardContent>
      </Card>

    </Box>
  );
}
