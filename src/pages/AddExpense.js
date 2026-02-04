import { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem, Paper } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";



const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

function AddExpense({ expenses, setExpenses }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.amount || !formData.category || !formData.date) {
    alert("Enter amount, category, and date");
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    alert("User not logged in");
    return;
  }

  const newExpense = {
    amount: Number(formData.amount),
    category: formData.category,
    date: formData.date,
    notes: formData.notes,
    createdAt: new Date()
  };

  try {
    // 🔥 SAVE TO FIRESTORE
    await addDoc(
      collection(db, "users", user.uid, "expenses"),
      newExpense
    );

    // ✅ KEEP EXISTING LOCAL STATE LOGIC
    setExpenses([
      ...expenses,
      { ...newExpense, id: Date.now() }
    ]);

    setFormData({ amount: "", category: "", date: "", notes: "" });
    alert("Expense added successfully!");

  } catch (error) {
    console.error(error);
    alert("Failed to save expense");
  }
};


  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Add Expense</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Amount" name="amount" type="number"
          value={formData.amount} onChange={handleChange} margin="normal" required />
        <TextField fullWidth select label="Category" name="category"
          value={formData.category} onChange={handleChange} margin="normal" required>
          {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </TextField>
        <TextField fullWidth type="date" name="date" value={formData.date}
          onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Notes" name="notes"
          value={formData.notes} onChange={handleChange} margin="normal" />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Save Expense</Button>
      </Box>
    </Paper>
  );
}

export default AddExpense;
