import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit } = useForm({ defaultValues: { email: "" } });
  const naviagate =   useNavigate()

  const submitdata = async (data) => {
    try {
      const login = await axios.post('http://localhost:3000/store/login', data);
      alert("Successfully logged in");
      naviagate("/Redbus")
    } catch (error) {
      alert('Login error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit(submitdata)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />

        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};