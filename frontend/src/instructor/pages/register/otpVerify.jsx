import React, { useEffect, useState } from "react";
import './otpVerify.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OtpVerify = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [timer,setTimer] = useState(60)

  const navigate = useNavigate()

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
        const email = localStorage.getItem('emailInstructor')
        console.log("instructor email in otp veriifcation",email);
        
      const res = await axios.post('http://localhost:4000/instructor/verifyOtp',{
        email,
        otp
      })
      console.log(res);
      
      if(res){
        localStorage.setItem('instructor',res.data.result.token)
      alert("Verified and Registered!");
      console.log("Token/instructor:", res.data.result.token);
      navigate('/instructor/home')
      }
      // You can redirect to login/home here
    } catch (err) {
        console.log(err);
        
      toast.error('OTP verification failed')
    }

    
  }

  const handleResendOtp = async (e)=>{
    
    e.preventDefault();

    try {
        const email = localStorage.getItem('emailInstructor')
        console.log("instructor email in otp veriifcation",email);
        
      const res = await axios.post('http://localhost:4000/instructor/resendOtp',{
        email,
        
        
      })
      if(res){
        setTimer(60)
      }
    } catch (err) {
        console.log(err);
        
      toast.error('OTP verification failed')
    }

  }
  
useEffect(() => {

    if(localStorage.getItem('instructor')){
        navigate('/instructor/home')
    }

    if(timer === 0) return;

  const countdown = setInterval(() => {
    setTimer((prevTimer) => {
      if (prevTimer <= 1) {
        clearInterval(countdown);
        return 0;
      }
      return prevTimer - 1;
    });
  }, 1000);

  return () => clearInterval(countdown); 
}, [timer]);

  return (
    <div className="verify">
        <form onSubmit={handleOtpSubmit} className="formOtp">
      <h3>Enter OTP</h3>
      <div className="otp-container">
        <input className="inputs"
        type="text"
        maxLength="6"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      /><br />
      </div>

      
      
      <button type="submit" className="button">Verify OTP</button>

      <div className="timer-resend">
        {timer > 0 ? (
          <p>Resend OTP in {timer}s</p>
        ) : (
          <button type="button" onClick={handleResendOtp} className="btn">
            Resend OTP
          </button>
        )}
      </div>
    </form>

    
    </div>
  );
};

export default OtpVerify;
