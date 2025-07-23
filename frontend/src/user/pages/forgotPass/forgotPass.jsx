// src/pages/ForgotPassword.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './forgotPass.css'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/user/forgot-password', { email })
      if (res.data.success) {
        toast.success('OTP sent to your email')

        setSubmitted(true)
        localStorage.setItem('forgotEmail',email)
        navigate('/user/verify-otp')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    //   toast.error(err.response.data.message)
    }
  }

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input className='input-email'
            type="text"
            name='email'
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <p>Check your email for a reset link.</p>
      )}
    </div>
  )
}

export default ForgotPassword
