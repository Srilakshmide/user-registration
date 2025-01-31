import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", company: "", age: "", dob: "", image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) formDataToSend.append(key, formData[key]);

    try {
      await axios.post("http://localhost:5000/register", formDataToSend);
      navigate("/");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <input type="date" name="dob" onChange={handleChange} />
        <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleFileChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
