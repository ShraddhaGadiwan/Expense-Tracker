import { useState } from "react";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }

    setLoading(false);
  };

  return (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  }}>
    <Card sx={{
      p: 4,
      width: 380,
      borderRadius: 4,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      textAlign: "center"
    }}>
      
      <Typography variant="h4" fontWeight="bold" mb={1}>
        💸 ManageXpense
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Track your expenses smartly
      </Typography>

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
          py: 1.2,
          borderRadius: 2,
          fontWeight: "bold",
          background: "linear-gradient(to right, #667eea, #764ba2)"
        }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Typography mt={2} variant="body2">
        Don’t have an account?{" "}
        <Link to="/signup" style={{ fontWeight: "bold", color: "#667eea" }}>
          Sign Up
        </Link>
      </Typography>

    </Card>
  </div>
);

}

export default Login;
