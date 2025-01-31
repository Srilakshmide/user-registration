import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/verify-otp", { email, otp });
      navigate("/dashboard", { state: { email } });
    } catch (error) {
      alert("OTP verification failed!");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleVerifyOTP}>
        <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default OTPVerification;
