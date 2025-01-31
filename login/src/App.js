import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import OTPVerification from "./components/OTPVerification";
import Dashboard from "./components/Dashboard";
import DeleteAccount from "./components/DeleteAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
