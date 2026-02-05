import { useState } from "react";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center",
  minHeight: "100vh",
  padding: 16
}}>

      <Card
        style={{
          padding: 34,
          width: "100%",
          maxWidth: 380,
          borderRadius: 16,
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Create Account ✨
        </Typography>

        <Typography fontSize={14} color="text.secondary" mb={2}>
          Join ManageXpense to track your spending
        </Typography>

        {error && (
          <Typography color="error" fontSize={14} mb={1}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.3,
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            ":hover": { backgroundColor: "#115293" }
          }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Card>
    </div>
  );
}

export default Signup;

