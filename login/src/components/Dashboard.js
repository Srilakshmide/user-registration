import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  return (
    <div>
      <h2>Welcome, {email}</h2>
      <button onClick={() => navigate("/delete-account", { state: { email } })}>Delete Account</button>
    </div>
  );
}

export default Dashboard;
