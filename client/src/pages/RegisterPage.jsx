import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/config";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      const user = res.data?.user || res.data;
      if (!user) throw new Error("Invalid response");
      localStorage.setItem("user", JSON.stringify(user));
      // redirect
      if (user.role === "vendor") navigate("/dashboard");
      else navigate("/deals");
    } catch (err) {
      console.error("Register error", err?.response || err?.message);
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create account</h2>

        {error && <div className="alert alert-error" style={{ marginBottom: 12 }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" placeholder="you@school.edu" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Choose a password" value={form.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>

          <div style={{ marginTop: 12, textAlign: "center" }}>
            <span className="muted">Already have an account? </span>
            <Link to="/login" className="accent-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}