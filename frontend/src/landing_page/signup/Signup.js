import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API =
  process.env.REACT_APP_API_BASE_URL ||
  "https://zerodha-backend-puka.onrender.com";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API}/signup`, form);
      localStorage.setItem("trading-user", JSON.stringify(res.data.user || form));
      setMessage("Account created successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p>Open a free trading account and start exploring markets.</p>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Create account</button>
          {message && <p className="auth-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
