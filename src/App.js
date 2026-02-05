import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import FinancialGoals from "./pages/FinancialGoals";
import FinancialCoach from "./pages/FinancialCoach";
import Sidebar from "./components/Sidebar";

function Layout() {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [income, setIncome] = useState(() => {
    return Number(localStorage.getItem("income")) || 0;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {!hideSidebar && <Sidebar />}

      <div
        style={{
          flexGrow: 1,
          padding: "16px",
          width: "100%",
          overflowX: "hidden"
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard income={income} setIncome={setIncome} expenses={expenses} />} />
          <Route path="/add" element={<AddExpense expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/transactions" element={<Transactions expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/analytics" element={<Analytics expenses={expenses} />} />
          <Route path="/financial-goals" element={<FinancialGoals income={income} expenses={expenses} />} />
          <Route path="/financial-coach" element={<FinancialCoach income={income} expenses={expenses} />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}




export default function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* MAIN APP */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}
