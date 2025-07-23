import { useState } from "react";
import axios from "axios";
import './register.css'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  });


  const navigate = useNavigate()

  const [message, setMessage] = useState("");

  const validate = ()=>{

    const {name,email,password,confirmPassword} = formData

    if(!name.trim()){
      setMessage('Please fill all the fileds')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) { 
      setMessage("Please enter a valid email");
      return;
    }

    if (!password.trim() || password.length < 6) {
    setMessage("Password must be at least 6 characters");
    return;
    }

    if(!confirmPassword.trim() ||  password != confirmPassword){
      setMessage("Passwords do not match")
      return
    }

    return true

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()){
      return
    }

    try {



      localStorage.setItem('otpEmail',formData.email)

      const res = await axios.post("http://localhost:4000/user/register", formData);
      // setMessage("User registered successfully");

      if(res.data.success){
        navigate('/user/verifyOtp')
      }
    } catch (error) {
      console.error(error);
      setMessage("Registration failed");
    }
  };

 return (
  <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        className="input"
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
      />

      <input
        className="input"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
      />

      <input 
      className="input"
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      onChange={handleChange}
      
      />

      <button type="submit" className="button">Register</button>
      {message && <p className="message">{message}</p>}
    </form>
  </div>
);

};

export default Register;
