import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const existingUsers = JSON.parse(localStorage.getItem("trading-users") || "[]");
      if (existingUsers.find((user) => user.email === form.email)) {
        throw new Error("User already exists");
      }

      const newUser = { ...form, id: Date.now() };
      localStorage.setItem("trading-users", JSON.stringify([...existingUsers, newUser]));
      localStorage.setItem("trading-user", JSON.stringify(newUser));
      setMessage("Signup successful. Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setMessage(error.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign up for Zerodha Clone</h2>
        <p>Create an account to access the trading dashboard.</p>
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Create account"}
          </button>
          {message && <p className="auth-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
