import React, { useState } from "react";
import "./Signup.css";
import logo from "../../assets/logo.webp"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../../Utils/MessageHandle";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return handleError('Name, Email and Password are required');
    } else {
      try {
        const url = "http://localhost:8080/auth/signup"
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
        const response = await fetch(url, options);
        const result = await response.json();
        const { message, success } = result;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        handleError(error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <img src={logo} alt="Taskify Logo" className="taskify-logo" />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <p>Already have an account?&nbsp;
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};