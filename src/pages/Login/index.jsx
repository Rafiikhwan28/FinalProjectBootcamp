import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import "./Login.css"; // Tambahkan file CSS eksternal

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const payload = {
      email: email, // Penyesuaian sesuai API
      password: password,
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        const token = res.data.token; // Sesuai dengan struktur respons API
        const userDetails = res.data.data; // Detail user lainnya
        const userRole = res.data.data.role; // Role pengguna (admin/user)

        console.log("ress",res)
        console.log("token",token)
        // Simpan token dan data user di localStorage
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_details", JSON.stringify(userDetails));

        setSuccess(true);
        setError("");

        // Redirect berdasarkan role
        if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div className="login-page">
      <Navbar />
      {success && <p className="success-message">Login successful</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Email"
            onChange={handleChangeEmail}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
            className="login-input"
          />
          <Button variant="contained" color="success" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;