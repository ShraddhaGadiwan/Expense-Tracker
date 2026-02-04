import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { collection, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";

function Transactions({ expenses, setExpenses }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // ✅ LOAD EXPENSES FROM FIREBASE ON REFRESH
  useEffect(() => {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "users", user.uid, "expenses"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setExpenses(data);
  });

  return () => unsubscribe();
}, [setExpenses]);


  // ✅ DELETE FROM FIREBASE
  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "expenses", id));

    setExpenses(expenses.filter(e => e.id !== id));
  };

  // ✅ EDIT
  const handleEditOpen = (item) => {
    setSelected(item);
    setEditAmount(item.amount);
    setEditNotes(item.notes || "");
    setOpen(true);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(
      doc(db, "users", user.uid, "expenses", selected.id),
      {
        amount: Number(editAmount),
        notes: editNotes
      }
    );

    setExpenses(
      expenses.map(e =>
        e.id === selected.id
          ? { ...e, amount: editAmount, notes: editNotes }
          : e
      )
    );

    setOpen(false);
  };

  // ================= EXPORT PDF =================
  const exportPDF = () => {
    const doc = new jsPDF();
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    doc.text("Expense Report", 14, 15);
    doc.text(`Total: ₹${total}`, 14, 25);

    let y = 40;
    expenses.forEach((e, i) => {
      doc.text(`${i + 1}. ${e.category} - ₹${e.amount}`, 14, y);
      y += 8;
    });

    doc.save("expenses.pdf");
  };

  // ================= EXPORT EXCEL =================
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(expenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "expenses.xlsx");
  };

  return (
    <div style={{ marginLeft: 240, padding: 25 }}>
      <Typography variant="h4" mb={3}>🧾 Transactions</Typography>

      <Box display="flex" gap={2} mb={3}>
        <Button variant="contained" onClick={exportPDF}>Export PDF</Button>
        <Button variant="outlined" onClick={exportExcel}>Export Excel</Button>
      </Box>

      {expenses.length === 0 ? (
        <Typography>No transactions yet.</Typography>
      ) : (
        expenses.slice().reverse().map(item => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Chip label={item.category} size="small" />
                <Typography>₹{item.amount}</Typography>
                <Typography fontSize={13}>
                  {item.date} {item.notes && `• ${item.notes}`}
                </Typography>
              </Box>

              <Box>
                <IconButton onClick={() => handleEditOpen(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Amount"
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
          <TextField
            label="Notes"
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Transactions;
