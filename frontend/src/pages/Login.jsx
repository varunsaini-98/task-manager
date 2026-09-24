import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Input } from "../components/common/Input.jsx";
import { Button } from "../components/common/Button.jsx";
import { Card } from "../components/common/Card.jsx";

export const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h2 className="auth-title">Welcome to TaskFlow</h2>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" disabled={loading} fullWidth className="mt-16">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="auth-footer mt-16">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToRegister}
          >
            Register here
          </button>
        </div>
      </Card>
    </div>
  );
};
