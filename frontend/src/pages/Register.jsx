import React, { useState } from "react";
import { registerApi } from "../services/userService.js";
import { Input } from "../components/common/Input.jsx";
import { Button } from "../components/common/Button.jsx";
import { Card } from "../components/common/Card.jsx";

export const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
    role: "Developer",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await registerApi(formData);
      setSuccess("Account registered successfully! Redirecting to login...");
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Join your team on TaskFlow</p>

        {error && <div className="error-alert">{error}</div>}
        {success && <div className="success-alert">{success}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <Input
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
          <div className="input-group">
            <label className="input-label">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Designer">Designer</option>
              <option value="Tester">Tester</option>
            </select>
          </div>
          <div className="input-group">
            <label
              className="checkbox-label"
              style={{
                display: "flex",
                gap: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
              Register as System Administrator
            </label>
          </div>
          <Button type="submit" disabled={loading} fullWidth className="mt-16">
            {loading ? "Registering..." : "Register Account"}
          </Button>
        </form>

        <div className="auth-footer mt-16">
          <span>Already have an account? </span>
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToLogin}
          >
            Sign In here
          </button>
        </div>
      </Card>
    </div>
  );
};
