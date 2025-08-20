import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const CompLogin = () => {
  const usenavigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [islocked, setIsLocked] = useState(false)
  const [lockmessage, setLockMessage] = useState(" ")

  const validation = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email address"
      }
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters"
      }
    }
  };

  const submitdata = async (data) => {
    if (islocked) {
      setTimeout(()=>{
        alert("🔒 You're temporarily locked out. Please wait before trying again.");

      },2000)
      
    }
    try {
      const response = await axios.post('http://localhost:3000/comp/complogin', data);

      const { token, status, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("authType", role || "company"); 
      }

      if (status === 'pending') {
        alert("⏳ Your account is pending approval by admin.");
      } else if (status === 'rejected') {
        alert("❌ Your account has been rejected by admin.");
      } else if (status === 'approved') {
        alert("🎉 Login successful!");
        usenavigate("/cmphome");
      } else {
        alert("⚠️ Unknown account status. Please contact support.");
      }

    } catch (err) {
      console.error("❌ Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Please try again.");

      if (msg?.includes("locked")) {
  setIsLocked(true);
  setLockMessage("🔒 Account locked. Try again in 15 minutes.");

  setTimeout(() => {
    setIsLocked(false);
    setLockMessage("");
  }, 900000); 
} else {
  alert(msg || "Login failed. Please try again.");
}
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitdata)}>
        <label>Email</label>
        <input type="email" {...register("email", validation.email)} />
        <p>{errors.email?.message}</p>

        <label>Password</label>
        <input type="password" {...register("password", validation.password)} />
        <p>{errors.password?.message}</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
