import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {

    const usenavigate =  useNavigate()

  const {register,handleSubmit  ,  formState:{errors} }  =   useForm()

  const validation = {
      email: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email address"
      }
    },password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters"
      }
    },
  }

const submitdata = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/admin/login', data);
    const { token, role } = response.data;

      if (token) {      
     
        localStorage.setItem("token", token);
        localStorage.setItem("authType", role || "company"); 
      }
    console.log("✅ Booking Saved:", response.data);
    alert("🎉 Login successful");
    usenavigate("/adminHome");
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    alert("Login failed: " + (error.response?.data?.Message || "Unknown error"));
  }
};
  return (
    <div>
        
        <form onSubmit={handleSubmit(submitdata)}>


             <label>Email</label>
        <input type="email" {...register("email", validation.email)} />
        <p>{errors.email?.message}</p>

         {/* Password */}
        <label>Password</label>
        <input type="password" {...register("password", validation.password)} />
        <p>{errors.password?.message}</p>
                <button type="submit">Login</button>


        </form>
    </div>
  )
}
