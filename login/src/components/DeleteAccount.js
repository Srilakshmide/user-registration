import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function DeleteAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:5000/delete-account", { email });
      alert("Account deleted successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to delete account!");
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete your account?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/dashboard")}>Cancel</button>
    </div>
  );
}

export default DeleteAccount;
