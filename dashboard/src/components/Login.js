import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("trading-users") || "[]");
      const user = users.find(
        (entry) => entry.email === form.email && entry.password === form.password
      );
      if (!user) {
        throw new Error("Invalid email or password");
      }

      localStorage.setItem("trading-user", JSON.stringify(user));
      setMessage("Login successful. Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setMessage(error.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login to Zerodha Clone</h2>
        <p>Access your dashboard and trading data.</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && <p className="auth-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
