import React, { useState, useEffect } from "react";
import './verify-otp.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassVerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isExpired, setIsExpired] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsExpired(true);
    }
  }, [timer]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('forgotEmail');

    try {
      const res = await axios.post('http://localhost:4000/user/verify-otp', {
        email,
        otp
      });

      if (res.data.success) {
        toast.success("Verified");
        navigate('/user/resetPassword');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const resendOtp = async () => {
    const email = localStorage.getItem('forgotEmail');
    try {
      const res = await axios.post('http://localhost:4000/user/forgot-password', { email });
      if (res.data.success) {
        toast.success("OTP resent!");
        setTimer(60);
        setIsExpired(false);
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="verify">
      <form onSubmit={handleOtpSubmit} className="formOtp">
        <h3>Enter OTP</h3>
        <div className="otp-container">
          <input
            className="inputs"
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={isExpired}
          />
        </div>

        <p className="timer">
          {isExpired ? (
            <span className="expired-text">OTP expired</span>
          ) : (
            <span>Expires in: {timer} sec</span>
          )}
        </p>

        <button type="submit" className="button" disabled={isExpired}>
          Verify OTP
        </button>

        {isExpired && (
          <button type="button" className="button resend" onClick={resendOtp}>
            Resend OTP
          </button>
        )}
      </form>
    </div>
  );
};

export default ForgotPassVerifyOtp;
