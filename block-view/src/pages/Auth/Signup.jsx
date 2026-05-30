import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const result = signup(form.name, form.email, form.password);
    if (result.success) navigate("/login");
    else setError(result.message);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required />
          <button type="submit">Create Account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;