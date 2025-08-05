import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import api from '../../../api/axios'
import { jwtDecode} from 'jwt-decode';




const Login = () => {

  const navigate = useNavigate()
  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("UI", value);

    try {
      const response = await axios.post('http://localhost:4000/user/login', value);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log("Login successful:", response.data);
        toast.success('Logged in with Google!');

        navigate('/user/home');
      }

    } catch (error) {
      console.error("Error logging in:", error);

      const message = error.response?.data?.message || "Something went wrong";

      if (error.response?.status === 403) {
        toast.warning(message); // "Your account is blocked"
      } else {
        toast.error(message);
      }
    }
  };

  
    const handleSuccess = async (credentialResponse) => {
      try {
        console.log(credentialResponse);
        
        const decoded = jwtDecode(credentialResponse.credential);
console.log('Google user:', decoded);

        // Send to your backend
        const response = await api.post('/user/googleLogin', {
          token: credentialResponse.credential,
        });

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          // redirect or toast
          navigate('/user/home')
        }

      } catch (err) {
        console.error('Login failed', err);
      }
    }
  

  useEffect(() => {
    console.log('useEffect');

    let token = localStorage.getItem('token')
    if (token) {
      navigate('/user/home')
    }
  }, [])

  return (
    <div className='login'>
      <div className="login-container">
        <h2>User Login</h2>

        <form onSubmit={onSubmitHandler} className='login-form'>
          <input
            className='inputs'
            type='text'
            name='email'
            placeholder='Enter email'
            value={value.email}
            onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
          />

          <input
            className='inputs'
            type='password'
            name='password'
            placeholder='Enter Password'
            value={value.password}
            onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
          />

          <div className="button-container">
            <button type='submit' className='btn'>Login</button>
          </div>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Google Login Failed')}
          />
        </form>

        {/* ✅ Links below the form */}
        <div className="login-links">
          <p>
            <Link to="/user/forgotPassword" className='link'>Forgot Password?</Link>
          </p>
          <p>
            Don’t have an account?{' '}
            <Link to="/instructor/register" className='link'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )

}

export default Login
