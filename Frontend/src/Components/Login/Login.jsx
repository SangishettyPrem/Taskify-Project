import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.webp"
import { handleError, handleSuccess } from "../../Utils/MessageHandle";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return handleError('Email and Password are required');
    } else {
      try {
        const url = "http://localhost:8080/auth/login"
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
        const response = await fetch(url, options);
        const result = await response.json();
        const { message, name, email, jwtToken, success } = result;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate('/home');
          }, 1000);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', name);
        } else {
          handleError(message);
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Taskify Logo" className="taskify-logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit" className="login-button">Login</button>
        <p>Does't have an account ?&nbsp;
          <Link to="/signup" className="signup-link">Signup</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};
