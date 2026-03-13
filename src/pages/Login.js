import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", formData);

      // Save token & user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Welcome Back 👋</h2>
      <p className="form-subtitle">Login to continue your journey</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"                     // ✅ added name
          value={formData.email}           // ✅ bind value
          onChange={handleChange}          // ✅ update state
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"                  // ✅ added name
          value={formData.password}        // ✅ bind value
          onChange={handleChange}          // ✅ update state
          placeholder="Password"
          required
        />
        <button type="submit" className="btn-primary">Login</button>
      </form>

      <div className="divider">OR</div>

      <p onClick={() => navigate('/register')} className="form-link">
        Don't have an account? <span>Register</span>
      </p>
    </div>
  );
};

export default Login;
