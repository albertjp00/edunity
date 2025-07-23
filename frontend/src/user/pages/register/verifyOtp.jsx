import React, { useState } from "react";
import './verifyotp.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState('');

  const navigate = useNavigate()

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
        const email = localStorage.getItem('otpEmail')
      const res = await axios.post('http://localhost:4000/user/verifyOtp',{
        email,
        otp
      })
      console.log(res);
      
      if(res){
        localStorage.setItem('token',res.data.result.token)
      alert("Verified and Registered!");
      console.log("Token/User:", res.data.result.token);
      navigate('/user/home')
      }
      // You can redirect to login/home here
    } catch (err) {
        console.log(err);
        
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="verify">
        <form onSubmit={handleOtpSubmit} className="formOtp">
      <h3>Enter OTP</h3>
      <div className="otp-container">
        <input
        type="text"
        maxLength="6"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      /><br />
      </div>
      
      <button type="submit" className="button">Verify OTP</button>
    </form>
    </div>
  );
};

export default VerifyOtp;
