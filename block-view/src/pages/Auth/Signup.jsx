import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    localStorage.setItem("blockview_user", JSON.stringify(form));

    alert("Account created!");
    navigate("/login");
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Create Account</button>

        </form>

      </div>

    </div>
  );
};

export default Signup;