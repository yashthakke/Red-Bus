import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Signup.css';

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: ''
     
    }
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/store/signup', data);
     alert("Succesfully register")
    } catch (err) {
      alert('Registration error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Full Name</label>
          <input type="text" {...register('fullName')} />
        </div>

         <div>
          <label>Phone Number</label>
          <input type="tel" {...register('phone')} />
        
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email')} />
        </div>

       

        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
         
        </div>


        <button type="submit">Register</button>
      </form>
    </div>
  );
};