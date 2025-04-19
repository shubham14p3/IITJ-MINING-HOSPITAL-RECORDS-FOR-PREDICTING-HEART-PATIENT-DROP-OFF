import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  TextField,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../ui/Footer";
import logo from "../Design-of-New-Logo-of-IITJ-2.png";

function Home() {
  const [step, setStep] = useState(0); // 0: Login, 1: Welcome Screen
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    const validCredentials = [
      { id: "g23ai2087", password: "g23ai2087" },
      { id: "g23ai2028", password: "g23ai2028" },
      { id: "g23ai2126", password: "g23ai2126" },
      { id: "g23ai2094", password: "g23ai2094" },
      { id: "g23ai2018", password: "g23ai2018" },
      { id: "g23ai2117", password: "g23ai2117" },
      { id: "admin", password: "admin" },
      { id: "", password: "" }, // Allow empty credentials
    ];

    const isValid = validCredentials.some(
      (cred) => cred.id === loginId && cred.password === loginPassword
    );

    if (isValid) {
      setStep(1);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleNext = () => {
    // navigate("/data-analysis"); // Navigate to the data analysis component
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(45deg, #ff9a9e, #fad0c4, #ffd1ff)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          paddingTop: 4,
          paddingBottom: 4,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Login Screen */}
        {step === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "1rem",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                boxShadow: 8,
                overflow: "hidden",
                width: "100%",
                maxWidth: "400px",
                padding: 4,
                textAlign: "center",
              }}
            >
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <img src={logo} alt="IITJ Logo" width="80" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Login
              </Typography>
              <TextField
                label="Login ID"
                variant="outlined"
                fullWidth
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Invalid Login ID or Password
                </Alert>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Card>
          </Box>
        )}

        {/* Welcome Screen */}
        {step === 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "1rem",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 4,
                boxShadow: 8,
                overflow: "hidden",
                width: "100%",
                maxWidth: "1200px",
                height: "auto",
                boxSizing: "border-box",
              }}
            >
              {/* Left Side */}
              <Box
                sx={{
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  flex: 1,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      display: "inline-block",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={logo} alt="IITJ Logo" width="80" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
                    Indian Institute of Technology Jodhpur
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Date: {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Project Report on
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                  MINING HOSPITAL RECORDS FOR PREDICTING PATIENT DROP-OFF
                  </Typography>
                </Box>
              </Box>

              {/* Right Side */}
              <Box
                sx={{
                  flex: 2,
                  p: 6,
                  backgroundColor: "#f0f4c3",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  Welcome to <br />
                  MINING HOSPITAL RECORDS FOR PREDICTING PATIENT DROP-OFF
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 4, display: "block", marginLeft: "auto", marginRight: "auto" }}
                >
                  Start
                </Button>
              </Box>
            </Card>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default Home;
