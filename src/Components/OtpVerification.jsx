import React, { useState } from 'react';
import axios from 'axios';
import '../assets/OtpVerification.css';


export const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    try {
      await axios.post('http://localhost:3000/store/verifyotp', { email, otp });
      alert('OTP verified successfully');
    } catch (err) {
      alert('Verification failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleResend = async () => {
    try {
      await axios.post('http://localhost:3000/store/resendotp', { email });
      alert('New OTP sent to your email');
    } catch (err) {
      alert('Resend failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="otp-container">
  <h2>Verify OTP</h2>
  <p>Email: <strong>{email}</strong></p>
  <input
    type="text"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    placeholder="Enter OTP"
  />
  <div className="otp-buttons">
    <button className="verify-btn" onClick={handleVerify}>Verify</button>
    <button className="resend-btn" onClick={handleResend}>Resend OTP</button>
  </div>
</div>

  );
};