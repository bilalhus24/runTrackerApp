import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
        });
      // Save token and role
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
  
      // Debugging to check role
      console.log(response.data);
  
      // Redirect based on role
      switch (response.data.role) {
        case "ROLE_ADMIN":
          navigate("/Admin");
          break;
        case "ROLE_USER":
          navigate("/User");
          break;
        case "ROLE_GUEST":
          navigate("/Guest");
          break;
        default:
          throw new Error("");
      }
    } catch (error) {
      setMessage("Login incorrect or email unverified. Please try again.");
    }
  };
  

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
