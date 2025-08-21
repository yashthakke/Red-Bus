import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { OtpVerification } from '../OtpVerification';
import './Signup.css';

export const Signup = () => {
  const [email, setEmail] = useState(null);

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
     
      await axios.post('http://localhost:3000/store/signup', data);

      alert('Successfully registered. Check your email for OTP.');
      setEmail(data.email);
    } catch (err) {
      alert('Registration error: ' + (err.response?.data?.Message || err.message));
    }
  };

  return (
    <div className="signup-container">
      {!email ? (
        <>

        {/* Step Progress Bar */}
<div className="progress-container">
  <div className={`step ${!email ? "active" : "completed"}`}>
    1. Signup
  </div>
  <div className={`step ${email ? "active" : ""}`}>
    2. Verify OTP
  </div>
</div>

          <h2>Signup</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && <span className="error">{errors.fullName.message}</span>}
            </div>

            <div>
              <label>Phone Number</label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit phone number'
                  }
                })}
              />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <button type="submit">Register</button>
          </form>
        </>
      ) : (
        // ✅ When email is set, show OTP Verification component
        <OtpVerification email={email} />
      )}
    </div>
  );
};
