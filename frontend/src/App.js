import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin";
import UserDashboard from "./pages/User";
import GuestDashboard from "./pages/Guest";
import ProtectedRoute from "./ProtectedRoute";
import Tables from "./pages/Tables";
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/Admin"
          element={
            <ProtectedRoute roleRequired="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/User"
          element={
            <ProtectedRoute roleRequired="ROLE_USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Guest"
          element={
            <ProtectedRoute roleRequired="ROLE_GUEST">
              <GuestDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </Router>
  );
}

export default App;
